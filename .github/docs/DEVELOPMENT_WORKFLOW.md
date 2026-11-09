# Development Workflow & Engineering Procedures

> **Document Status**: Standard Operating Procedure  
> **Parent Navigation**: [Documentation Index](../README.md) | [Architecture](ARCHITECTURE.md) | [Git Conventions](GIT_CONVENTIONS.md) | [Contributing](CONTRIBUTING.md) | [Security](SECURITY.md)

---

## 1. Prerequisites & Tooling

Before setting up the project locally, verify that your development environment satisfies the following minimum tool versions:

| Tool | Minimum Version | Recommended Installation | Purpose |
| :--- | :--- | :--- | :--- |
| **Node.js** | `>= 20.x LTS` | `nvm` or `fnm` | Runtime for frontend and backend tooling. |
| **Package Manager** | `pnpm >= 9.x` (or `npm >= 10.x`) | `corepack enable pnpm` | Fast, deterministic dependency management. |
| **Docker Engine & Compose** | `>= 24.x` | Docker Desktop / OrbStack | Local PostgreSQL, Redis, and MinIO services. |
| **Git** | `>= 2.40` | Official Git package | Version control. |
| **Tunneling Tool** | Latest | `ngrok` or `cloudflared` | Exposing local webhook endpoint to Meta Graph API. |

---

## 2. Local Project Setup & Bootstrap

Follow this exact sequence to bootstrap your local environment:

### Step 1: Clone and Inspect
```bash
git clone https://github.com/iamrohitv/Futurefina.git
cd Futurefina
```

### Step 2: Environment Configuration
Copy the template configuration file:
```bash
cp .env.example .env.local
```
> [!CAUTION]
> Never commit `.env.local` or any file containing real Meta API secrets or private tokens. See [`SECURITY.md`](SECURITY.md).

### Step 3: Launch Local Backing Services (Docker)
Start PostgreSQL and Redis in the background:
```bash
docker compose up -d postgres redis
```

### Step 4: Install Dependencies & Run Database Migrations
```bash
# Install dependencies
pnpm install

# Run database schema migrations
pnpm db:migrate

# Seed database with development accounts and pipeline stages
pnpm db:seed
```

### Step 5: Start Development Server
```bash
pnpm dev
```
The CRM client will be available at `http://localhost:3000` (or the configured application port).

---

## 3. Environment Variables Reference

Below is the standard configuration reference for `.env.local`. All values shown are development placeholders:

```bash
# ==========================================
# Application Configuration
# ==========================================
NODE_ENV=development
APP_PORT=3000
APP_BASE_URL=http://localhost:3000

# ==========================================
# Database & Cache
# ==========================================
DATABASE_URL=postgresql://crm_user:crm_password@localhost:5432/futurefina_crm?schema=public
REDIS_URL=redis://localhost:6379

# ==========================================
# Meta WhatsApp Cloud API (Graph API)
# ==========================================
# Meta Developer App ID & App Secret (used for HMAC signature validation)
WHATSAPP_APP_ID=your_meta_app_id_here
WHATSAPP_APP_SECRET=your_meta_app_secret_here

# Meta Webhook Verification Token (custom random secret string for GET handshake)
WHATSAPP_WEBHOOK_VERIFY_TOKEN=your_random_verification_token_here

# Meta WhatsApp Business Phone Number ID & Permanent System User Access Token
WHATSAPP_PHONE_NUMBER_ID=your_meta_phone_number_id_here
WHATSAPP_ACCESS_TOKEN=your_meta_system_user_token_here
WHATSAPP_API_VERSION=v20.0

# ==========================================
# Media & Storage (S3 / Cloudflare R2 / MinIO)
# ==========================================
STORAGE_PROVIDER=local # or 's3'
S3_BUCKET_NAME=whatsapp-crm-media-dev
S3_REGION=us-east-1
S3_ENDPOINT=http://localhost:9000
S3_ACCESS_KEY=minioadmin
S3_SECRET_KEY=minioadmin

# ==========================================
# Authentication & Security
# ==========================================
JWT_SECRET=super_secret_jwt_development_key_change_in_production
SESSION_MAX_AGE_SECONDS=86400
```

---

## 4. Local Meta Webhook Tunneling Setup

To receive real inbound WhatsApp messages and delivery receipts from Meta's servers during local development, expose your local server using a secure HTTPS tunnel:

```mermaid
sequenceDiagram
    participant Meta as Meta Graph API
    participant Tunnel as ngrok / Cloudflare Tunnel
    participant LocalApp as Local Webhook Server (localhost:3000)

    Tunnel->>Tunnel: Establish public HTTPS URL (e.g. https://xyz.ngrok-free.app)
    Meta->>Tunnel: GET /api/webhooks/whatsapp?hub.mode=subscribe&hub.challenge=123
    Tunnel->>LocalApp: Proxy GET request
    LocalApp-->>Tunnel: Return hub.challenge (Verification successful)
    Tunnel-->>Meta: 200 OK with challenge
    Note over Meta,LocalApp: Webhook active! Inbound messages now stream locally.
```

### Tunnel Execution Command:
```bash
# Using ngrok
ngrok http 3000

# Or using Cloudflare Tunnel
cloudflared tunnel --url http://localhost:3000
```
Then, copy the generated HTTPS forwarding URL (e.g., `https://xxxx.ngrok-free.app/api/webhooks/whatsapp`) and paste it into the **Meta App Dashboard > WhatsApp > Configuration > Callback URL**. Set the **Verify Token** to match `WHATSAPP_WEBHOOK_VERIFY_TOKEN`.

---

## 5. Feature Development Lifecycle

All development work proceeds through a structured, quality-controlled lifecycle:

```
1. Ticket/Issue Created -> 2. Feature Branch Created -> 3. Local Implementation & Tests
       ^                                                                |
       |                                                                v
6. Merge to Main (Squash) <- 5. Review & Approval <- 4. Pull Request Opened
```

1. **Ticket & Branch Creation**: Branch off `main` using naming conventions specified in [`GIT_CONVENTIONS.md`](GIT_CONVENTIONS.md) (e.g., `feat/inbox-collision-detection`).
2. **Local Implementation**: Write clean, type-safe code adhering to [`DESIGN_GUIDELINES.md`](DESIGN_GUIDELINES.md) and [`CONTRIBUTING.md`](CONTRIBUTING.md).
3. **Automated Testing**: Run unit and integration tests locally before opening a pull request.
4. **Pull Request**: Open PR with a detailed description, visual screenshots or test proof, and link to the relevant issue.
5. **Code Review**: Obtain required approvals from maintainers.
6. **Merge**: Squash and merge into `main` after all continuous integration checks pass.

---

## 6. Coding Practices & Standards

- **Strict Type Safety**: TypeScript must be configured with `strict: true`. No implicit `any` types are permitted.
- **Explicit Schema Validation**: Every API route and webhook endpoint must validate incoming request payloads using runtime schemas (e.g., `Zod`).
- **Separation of Concerns**:
  - `controllers / routes`: HTTP layer only (extract params, validate, call service, return status).
  - `services`: Pure business logic (state machines, WhatsApp API calls, database transactions).
  - `repositories / db`: Database queries and data mapping.
  - `workers`: Asynchronous queue handlers.
- **Linting & Formatting**: Clean code verified by ESLint and Prettier. Zero linter warnings permitted in CI.

---

## 7. Testing Procedures & Standards

### 7.1 Testing Pyramid
- **Unit Tests**: Focus on pure business logic, payload parsers, 24-hour window calculators, and phone number E.164 sanitizers.
- **Integration Tests**: Focus on Webhook HMAC verification, DB transaction rollbacks, and BullMQ queue processing.
- **End-to-End (E2E) Tests**: Verify complete agent user journeys (logging in, opening a conversation, drafting a reply, creating a deal).

### 7.2 Running Tests
```bash
# Run all unit and integration tests
pnpm test

# Run tests in watch mode during development
pnpm test:watch

# Generate code coverage report
pnpm test:coverage

# Run end-to-end test suite
pnpm test:e2e
```

### 7.3 Webhook Ingestion Test Suite
A dedicated test harness must mock Meta webhook payloads to guarantee that:
1. Payloads with invalid or missing HMAC signatures are rejected with `403 Forbidden`.
2. Payloads with valid signatures return `200 OK` in < 100ms.
3. Duplicate payloads with identical `whatsapp_message_id` are ingested idempotently without duplicate records.

---

## 8. Debugging & Structured Logging Standards

- **Correlation / Request IDs**: Every inbound request (HTTP or Webhook) generates a unique `x-request-id` header that is attached to all log lines and queue jobs.
- **JSON Structured Logging**: In production and staging, logs are formatted as single-line JSON objects containing:
  - `timestamp`: ISO-8601 string.
  - `level`: `INFO`, `WARN`, `ERROR`, or `DEBUG`.
  - `requestId`: Unique request trace identifier.
  - `message`: Descriptive message string.
  - `context`: Structured key-value object (never containing sensitive passwords or tokens).

---

## 9. Build & Deployment Principles

- **Containerization**: The application compiles into an optimized, multi-stage Docker image minimizing image size and attack surface.
- **Environment Isolation**: Separate environments for `development`, `staging`, and `production`. Production database migrations run as a pre-deployment migration step.
- **Zero-Downtime Deployments**: Rolling or blue-green updates to ensure that active webhook streams from Meta are not dropped during deployments.
