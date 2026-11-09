# Contributing Guidelines & Engineering Standards

> **Document Status**: Standard Operating Procedure  
> **Parent Navigation**: [Documentation Index](../README.md) | [Development Workflow](DEVELOPMENT_WORKFLOW.md) | [Git Conventions](GIT_CONVENTIONS.md) | [Security](SECURITY.md)

---

## 1. Contributor Expectations & Code of Conduct

We are committed to building a reliable, secure, and maintainable CRM platform. Whether you are a core team developer, external open-source contributor, or an autonomous AI agent, all contributions are evaluated against the highest standards of engineering discipline:
- **Respect Boundaries**: Strictly honor module boundaries, privacy requirements, and security policies.
- **Zero-Tolerance for Shortcuts**: Do not bypass type checks, silence linter errors, or write untested critical business logic.
- **Synchronous Documentation**: Never introduce code changes without updating the relevant documentation in `.github/docs/`.

---

## 2. Code Quality & Formatting Standards

Every file committed to this repository must satisfy the automated quality pipeline:

1. **TypeScript Strictness**:
   - `strict: true` must remain enabled.
   - Prohibited: `any`, `@ts-ignore` (unless documented with an architectural justification and issue link).
   - Use explicit interfaces, type aliases, and discriminated unions for polymorphic payloads.
2. **Linting & Formatting**:
   - ESLint and Prettier must pass with **0 errors and 0 warnings**.
   - Code must be formatted automatically prior to submitting a pull request:
     ```bash
     pnpm lint:fix
     pnpm format
     ```
3. **Clean Architecture Separation**:
   - Keep controllers thin and services framework-agnostic.
   - Do not invoke database queries directly inside React server/client components. Use dedicated repository or service methods.

---

## 3. Explicit Naming Conventions

Consistency across files, identifiers, and databases is strictly enforced:

| Entity Type | Convention | Example |
| :--- | :--- | :--- |
| **Directory Names** | `kebab-case` | `src/features/chat-inbox/` |
| **Component Files** | `PascalCase.tsx` | `ChatBubble.tsx`, `DealCard.tsx` |
| **Utility / Hook Files** | `kebab-case.ts` | `use-whatsapp-stream.ts`, `e164-formatter.ts` |
| **React Components** | `PascalCase` | `function ConversationHeader() {}` |
| **Hooks** | `camelCase` (prefixed with `use`) | `useConversationTimeline` |
| **Functions & Variables** | `camelCase` | `verifyWebhookSignature()`, `activeDeal` |
| **Constants & Enums** | `UPPER_SNAKE_CASE` | `MAX_RETRY_COUNT`, `DEFAULT_PAGE_SIZE` |
| **Database Tables** | `snake_case` (plural) | `contacts`, `conversations`, `webhook_events` |
| **Database Columns** | `snake_case` | `phone_e164`, `window_expires_at` |
| **API Endpoints** | `kebab-case` | `POST /api/v1/contacts/bulk-import` |

---

## 4. Testing Requirements

No pull request modifying business logic or data schemas will be merged without accompanying automated tests:

1. **Unit Tests**:
   - Every utility, helper function, and custom hook must have corresponding unit test coverage.
   - Coverage threshold: Maintain ≥ 85% branch coverage on domain services.
2. **Integration Tests**:
   - All WhatsApp webhook ingestion endpoints must have integration tests verifying signature rejection, payload ingestion, and idempotency.
3. **Pre-PR Verification Checklist**:
   Run the full verification suite before submitting:
   ```bash
   pnpm lint
   pnpm typecheck
   pnpm test
   ```

---

## 5. Mandatory Documentation Update Protocol

To prevent documentation drift, any pull request containing the following changes **MUST** include updates to the corresponding documentation files:

| Type of Code Change | Required Documentation Update |
| :--- | :--- |
| Database schema change, new table, or migration | [`ARCHITECTURE.md`](ARCHITECTURE.md) (Update ER diagram and schema section) |
| New API endpoint, webhook handler, or external gateway | [`ARCHITECTURE.md`](ARCHITECTURE.md) & [`SECURITY.md`](SECURITY.md) |
| New UI component, color token, or layout pattern | [`DESIGN_GUIDELINES.md`](DESIGN_GUIDELINES.md) (Update the Mermaid swatch board, hex/role table, and accessibility notes) |
| New environment variable or third-party dependency | [`DEVELOPMENT_WORKFLOW.md`](DEVELOPMENT_WORKFLOW.md) (Update `.env` reference) |
| New feature, module scope, or user workflow | [`PRD.md`](PRD.md) |
| Significant technical decision, framework choice, or pivot | [`DECISIONS.md`](DECISIONS.md) (Record new `DEC-XXX` entry) |

---

## 6. Pull Request Submission & Review Process

1. **Self-Review**: Review your own diff before assigning reviewers. Confirm that no stray `console.log` statements, debugging code, or unhandled promises remain.
2. **PR Description**: Fill out the standard PR template completely:
   - What does this PR do?
   - How was it tested?
   - Visual screenshots or terminal output.
   - Link to issue/ticket.
3. **CI Checks**: Ensure all continuous integration checks pass (Lint, Typecheck, Test, Build).
4. **Code Review**: At least one peer review approval is required prior to merging. Address all reviewer comments respectfully.
5. **Merge**: Once approved and checks are green, squash and merge into `main`. Delete your feature branch post-merge.
