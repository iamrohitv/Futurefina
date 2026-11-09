# System Architecture & Technical Specifications

> **Document Status**: Approved Baseline Architecture  
> **Parent Navigation**: [Documentation Index](../README.md) | [PRD](PRD.md) | [Design Guidelines](DESIGN_GUIDELINES.md) | [Security](SECURITY.md) | [Decisions](DECISIONS.md)

---

## 1. Architectural Overview & System Topology

The **Futurefina WhatsApp Bot & CRM** platform is architected as an event-driven, decoupled system combining a high-throughput webhook ingestion layer, a **Dual-Engine Conversation System** (Deterministic Flow Engine + Grounded Knowledge Base LLM), a durable background job processor, and an administrative CRM dashboard.

```mermaid
flowchart TD
    subgraph External["External Clients & Networks"]
        Customer["Customer WhatsApp Client<br/>(Gujarati / Hindi / English)"]
        MetaAPI["Meta WhatsApp Cloud API<br/>(Graph API v20.0+)"]
        AdvisorClient["Advisor & Admin Dashboard<br/>(Obsidian-Mint UI)"]
    end

    subgraph Boundary["Edge & Ingestion Boundary"]
        ReverseProxy["Reverse Proxy / TLS Terminator<br/>(Rate Limiting & Security Filters)"]
        WebhookHandler["Webhook Ingestion Service<br/>(HMAC-SHA256 Signature Validation)"]
    end

    subgraph DualEngine["Futurefina Conversation Processing Engine"]
        Router["Conversation Orchestrator & State Machine"]
        
        DeterministicEngine["Deterministic Flow Engine<br/>• 6 Service Lead Qualification Flows<br/>• Consent Capture & Verification<br/>• Regulatory Financial Disclaimers<br/>• Human Handover Dispatch"]
        
        GroundedLLM["Grounded Knowledge Base LLM<br/>• Multilingual Intent Detection<br/>• Vector / Semantic FAQ Retrieval<br/>• Bounded strictly to Approved Content<br/>• Zero Financial Hallucination Safeguard"]
    end

    subgraph DataStore["Data Persistence & Queueing"]
        RedisBus["Redis & BullMQ<br/>(Idempotency Gate, Event Streaming)"]
        FuturefinaDB[(PostgreSQL Database<br/>Leads, Consent, Pricing, Knowledge Base)]
    end

    %% Flow lines
    Customer <-->|Bidirectional Chat| MetaAPI
    MetaAPI -->|POST Webhook with HMAC| ReverseProxy
    ReverseProxy --> WebhookHandler
    WebhookHandler -->|Validate & Push Raw Payload| RedisBus
    RedisBus --> Router
    
    Router <--> DeterministicEngine
    Router <--> GroundedLLM
    
    DeterministicEngine -->|Persist Lead & Audit Log| FuturefinaDB
    GroundedLLM -.->|Read Approved FAQs| FuturefinaDB
    
    Router -->|Dispatch Outbound Messages| MetaAPI
    DeterministicEngine -->|Notify Handover| AdvisorClient
    AdvisorClient <-->|Manage Leads & Live Chat| FuturefinaDB
```

---

## 2. The Dual-Engine Conversation Architecture

In accordance with [DEC-007](DECISIONS.md#dec-007-dual-engine-conversation-architecture-deterministic-flow--grounded-llm) and strict financial services regulatory standards (AMFI ARN: 179325), conversational processing is strictly partitioned into two specialized engines:

```mermaid
flowchart TD
    InboundMsg["Incoming Inbound Message"] --> IntentCheck{"Message Intent Classification"}
    
    IntentCheck -->|Service Menu Selection / Button Click / Active Flow| Deterministic["Deterministic Flow Engine"]
    IntentCheck -->|General FAQ / About Futurefina / Free-Form Query| LLM["Grounded Knowledge Base LLM"]
    IntentCheck -->|"Talk to Human" / High Uncertainty / Escalation| Handover["Human Handover Dispatch"]
    
    subgraph DeterministicRole["Deterministic Flow Engine (Guaranteed Safe)"]
        D1["Step-by-step Lead Capture across 6 Services"]
        D2["Explicit Consent Confirmation (Enquiry vs Promo)"]
        D3["Statutory Risk Disclaimers (Market-linked risk)"]
        D4["Admin-Editable Pricing Quotes (ITR fees)"]
    end
    
    subgraph LLMRole["Grounded Knowledge Base LLM (Bounded Safe)"]
        L1["Semantic Retrieval from Approved FAQs"]
        L2["Language Translation (Gujarati / Hindi / English)"]
        L3["Safe Fallback Trigger on Missing Knowledge"]
    end

    Deterministic --> DeterministicRole
    LLM --> LLMRole
```

### 2.1 Deterministic Flow Engine
- **Role**: Executes all critical qualification funnels, legal disclaimers, data collection steps, and consent checkpoints.
- **Guarantee**: Operates strictly via deterministic finite state machines (FSM). Zero chance of hallucinating interest rates, promising guaranteed returns, or asking for unauthorized data.

### 2.2 Grounded Knowledge Base LLM
- **Role**: Understands user intent in natural language (handling mixed Gujarati-English, Hinglish, or colloquial phrasing) and provides factual answers derived exclusively from the verified Futurefina knowledge base.
- **Strict Boundary**: If the knowledge base does not contain an approved answer for a specific query, the LLM is prohibited from generating an answer and must trigger the safe fallback to a human advisor.

---

## 3. Futurefina Database Schema & Entity Relationships

The relational schema is specifically modeled for Futurefina's lead lifecycle, 6 service lines, 10 official lead statuses, and consent auditing:

```mermaid
erDiagram
    USERS ||--o{ LEADS : assigned_to
    LEADS ||--o{ CONSENT_AUDIT_LOGS : records
    LEADS ||--o{ HANDOVER_DISPATCHES : triggers
    LEADS ||--o{ LEAD_NOTES : contains
    SERVICE_CATALOG ||--o{ LEADS : categorizes
    KNOWLEDGE_BASE ||--o{ FAQ_CATEGORIES : belongs_to

    USERS {
        uuid id PK
        string email UK
        string full_name
        string role "ADMIN | ADVISOR"
        string phone_e164
        boolean is_active
    }

    LEADS {
        uuid id PK
        string lead_code UK "e.g. FF-2026-0001"
        string phone_e164 "Normalized E.164"
        string customer_name
        string preferred_language "GUJARATI | HINDI | ENGLISH"
        string service_category "MUTUAL_FUNDS | STOCKS_DEMAT | INSURANCE | LOANS | ITR | SUPPORT"
        string service_subcategory
        string customer_type "NEW | EXISTING"
        string status "NEW | QUALIFICATION_IN_PROGRESS | QUALIFIED | ASSIGNED | CONTACT_ATTEMPTED | FOLLOW_UP_REQUIRED | CONVERTED | NOT_INTERESTED | CLOSED | ESCALATED_COMPLAINT"
        jsonb captured_details "Structured answers by service"
        text enquiry_summary
        uuid assigned_user_id FK "Default: Kaushik Raval"
        timestamp next_follow_up_at
        timestamp created_at
        timestamp updated_at
    }

    CONSENT_AUDIT_LOGS {
        uuid id PK
        uuid lead_id FK
        string phone_e164
        string consent_type "ENQUIRY_RESPONSE | PROMOTIONAL_COMMUNICATION"
        boolean granted
        string consent_wording_version
        timestamp recorded_at
    }

    HANDOVER_DISPATCHES {
        uuid id PK
        uuid lead_id FK
        string urgency "NORMAL | HIGH | CRITICAL"
        string trigger_reason
        jsonb structured_payload
        string status "PENDING | ACKNOWLEDGED | RESOLVED"
        timestamp dispatched_at
    }

    LEAD_NOTES {
        uuid id PK
        uuid lead_id FK
        uuid author_id FK
        text content
        timestamp created_at
    }

    SERVICE_CATALOG {
        uuid id PK
        string category_code
        string display_name
        boolean is_active
        jsonb form_fields_schema
        jsonb indicative_pricing "e.g. ITR tier rates"
    }

    KNOWLEDGE_BASE {
        uuid id PK
        string question
        text approved_answer_en
        text approved_answer_gu
        text approved_answer_hi
        string category
        string reviewed_by
        date last_reviewed_on
        boolean is_active
    }
```

---

## 4. Webhook Ingestion & Anti-Duplicate Pipeline

Meta delivers webhooks on an *at-least-once* basis. Retried payloads or network hiccups frequently deliver duplicate events.

```mermaid
sequenceDiagram
    autonumber
    participant Meta as Meta WhatsApp Cloud API
    participant Ingest as Webhook Controller
    participant Queue as BullMQ (Redis)
    participant Worker as Background Worker
    participant DB as PostgreSQL
    participant Admin as Advisor Dashboard

    Meta->>Ingest: POST /api/webhooks/whatsapp (Body + X-Hub-Signature-256)
    Ingest->>Ingest: Constant-Time HMAC-SHA256 Verification
    alt Invalid Signature
        Ingest-->>Meta: 403 Forbidden (Halt immediately)
    else Valid Signature
        Ingest->>Queue: Enqueue Raw Event (event_id, timestamp)
        Ingest-->>Meta: 200 OK (Acknowledged in < 50ms)
    end

    Queue->>Worker: Dequeue Event Job
    Worker->>DB: Query unique whatsapp_message_id
    alt Message Already Processed
        Worker->>Worker: Log duplicate & Discard safely
    else Unique Message
        Worker->>Worker: Evaluate Intent via Dual-Engine
        Worker->>DB: Upsert Lead & Consent Record
        alt Human Handover Triggered
            Worker->>Admin: Push Real-Time Handover Alert via WebSocket
        end
        Worker->>Meta: POST Outbound WhatsApp Reply
    end
```

---

## 5. Technology Stack & Operational Infrastructure

| Layer | Technology | Role in Futurefina Platform |
| :--- | :--- | :--- |
| **Frontend Dashboard** | **Next.js (React 19, TypeScript)** | High-density admin console utilizing the **Obsidian-Mint** design system. |
| **Styling & Theme** | **Tailwind CSS + shadcn/ui** | Custom tokens for `#212227` canvas, `#2A2D34` cards, and `#13AD87` mint accents. |
| **Backend & Routing** | **Node.js (TypeScript) / Express** | Webhook endpoint, state machine routing, WebSocket hub. |
| **Primary Database** | **PostgreSQL (v15+)** | ACID transactions for lead records, consent logs, and service catalogs. |
| **Queue & Cache** | **Redis + BullMQ** | Decoupled webhook processing, rate limiting, and scheduled follow-up tasks. |
| **Knowledge Base** | **PostgreSQL pgvector / Embeddings** | Semantic similarity search for approved FAQ answering. |
| **External Messaging** | **Meta WhatsApp Cloud API (v20.0+)** | Official WhatsApp Business messaging gateway. |

**Obsidian-Mint palette reference** — exact tokens and semantic roles are maintained in [Design Guidelines §2](DESIGN_GUIDELINES.md#2-color-system--design-tokens-obsidian-mint-palette). The `#808080` swatch frame is documentation-only and is not a product token:

```mermaid
flowchart LR
    P1["Canvas"] ~~~ P2["Card"] ~~~ P3["Mint Accent"] ~~~ P4["White Action"]

    style P1 fill:#212227,stroke:#808080,stroke-width:2px,color:#FFFFFF
    style P2 fill:#2A2D34,stroke:#808080,stroke-width:2px,color:#FFFFFF
    style P3 fill:#13AD87,stroke:#808080,stroke-width:2px,color:#1A1D24
    style P4 fill:#FFFFFF,stroke:#808080,stroke-width:2px,color:#1A1D24
```

---

## 6. Scalability & Operational Resilience

1. **Webhook Spikes**: BullMQ absorbs broadcast response bursts, ensuring the HTTP listener maintains < 50ms response times.
2. **Sub-5-Second Guarantee**: Deterministic state machine responses are calculated and queued in < 200ms; LLM retrieval is cached for repeated queries.
3. **Dead Letter Queue (DLQ)**: Failed message dispatches or database write errors are quarantined in a DLQ with automated alerting to system administrators.
4. **Data Isolation**: Multi-tenant/multi-session query partitioning ensures zero cross-talk between separate customer phone sessions.
