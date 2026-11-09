# Git Conventions & Version Control Standards

> **Document Status**: Standard Operating Procedure  
> **Parent Navigation**: [Documentation Index](../README.md) | [Development Workflow](DEVELOPMENT_WORKFLOW.md) | [Contributing](CONTRIBUTING.md) | [Security](SECURITY.md)

---

## 1. Conventional Commits 1.0.0 Specification

This repository strictly enforces the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification for all commit messages. This ensures an automated, parseable, and human-readable git history.

### Commit Format
```text
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Approved Commit Types
| Type | Description | Example |
| :--- | :--- | :--- |
| `feat` | A new user-facing or system feature. | `feat(inbox): add agent collision indicator` |
| `fix` | A bug fix. | `fix(auth): resolve session cookie expiration bug` |
| `docs` | Documentation changes only. | `docs(architecture): update webhook sequence diagram` |
| `style` | Formatting, missing semi-colons, whitespace (no code change). | `style(chat): format chat bubble tail spacing` |
| `refactor` | Code change that neither fixes a bug nor adds a feature. | `refactor(api): separate webhook signature validation` |
| `perf` | Code change that improves execution performance. | `perf(db): add composite index on conversation lookup` |
| `test` | Adding missing tests or correcting existing tests. | `test(webhook): add HMAC invalid payload test cases` |
| `build` | Changes affecting build system or external dependencies. | `build(deps): update prisma to version 5.x` |
| `chore` | Routine maintenance, configs, or tooling updates. | `chore(lint): update eslint rules for typescript 5` |
| `revert` | Reverting a previous commit. | `revert: feat(inbox): revert unread badge animation` |

### Approved Scopes
Scopes must be lowercase, concise, and identify the module or subsystem being modified:
- `auth`: Authentication, sessions, RBAC, passwords.
- `inbox`: Shared multi-agent inbox, chat canvas, thread lists.
- `contacts`: Contact profiles, tags, custom attributes.
- `pipeline`: Kanban board, deal stages, deal values.
- `webhooks`: Meta Graph API webhook ingestion, verification, HMAC.
- `templates`: WhatsApp approved message templates, variable interpolation.
- `ui`: Shared design system components, typography, dark mode tokens.
- `db`: Database schemas, Prisma migrations, seeds.
- `queue`: BullMQ worker jobs, Redis pub/sub.
- `config`: Environment configuration, project tooling.

### Sizing & Atomicity Rules
- **Atomic Commits**: Each commit must represent a single logical change. Do not bundle unrelated changes (e.g., fixing an auth bug and restyling a button) into one commit.
- **Avoid Micro-Churn**: Avoid committing after every single line edit or typo fix. Group related changes logically before committing.
- **Imperative Mood**: Use the imperative, present tense: `"add feature"`, not `"added feature"` or `"adds feature"`.
- **Character Limit**: Keep the summary line ≤ 72 characters.

---

## 2. Branch Naming Conventions

All branch names must follow a structured, lowercase format using forward slashes:

```text
<category>/<issue-id-or-descriptor>
```

### Examples:
- `feat/WH-102-multi-agent-inbox`
- `fix/WH-204-webhook-signature-parsing`
- `docs/update-architecture-adr`
- `refactor/clean-up-contact-services`
- `test/add-template-variable-tests`

### Core Protected Branches:
- `main`: Production-ready, deployable branch. Direct pushes are disabled.
- `staging` *(Optional)*: Pre-production verification branch.

---

## 3. Pull Request (PR) Standards

1. **Title**: The PR title must mirror the Conventional Commit format of its primary contribution (e.g., `feat(contacts): add custom field support to contact profile`).
2. **PR Description**: Every pull request must include:
   - **Summary of Changes**: Bulleted list of what was changed and why.
   - **Related Issue**: Reference the tracking ticket (e.g., `Closes #123`).
   - **Testing Proof**: Commands executed, test outputs, or UI screenshots for visual changes.
   - **Documentation Impact**: Confirmation that relevant documentation (`PRD.md`, `ARCHITECTURE.md`, `DECISIONS.md`) was updated.
3. **Merge Method**: Use **Squash and Merge** for feature branches to keep the `main` branch history clean, linear, and bisectable.

---

## 4. Mandatory AI Agent Git Permission Policy

> [!CAUTION]
> **STRICT GOVERNANCE RULE FOR AUTONOMOUS AND ASSISTIVE AI AGENTS**  
> AI coding agents operating within this repository are subject to hard operational boundaries regarding Git operations.

### Mandatory Rules for AI Agents:
1. **Never Commit Automatically**: AI agents are strictly forbidden from executing `git commit` or committing changes without explicit, written user permission.
2. **Never Push Automatically**: AI agents are strictly forbidden from executing `git push` or pushing commits to remote branches without explicit, written user permission.
3. **Editing Does Not Authorize Committing**: Modifying or creating files in the workspace does **NOT** grant implicit permission to commit.
4. **Committing Does Not Authorize Pushing**: Explicit permission to create a local commit does **NOT** authorize pushing to a remote repository. Separate user approvals are required for each action.
5. **Mandatory Inspection & Summary**: Before requesting permission to commit, the AI agent must:
   - Run `git status` and inspect the diff.
   - Present a clear, file-by-file summary of changes to the user.
   - Propose a valid Conventional Commit message conforming to this standard.
6. **No Destructive Operations**: AI agents must **NEVER**:
   - Execute `git push --force` or `--force-with-lease`.
   - Rebase, rewrite, or reset shared public history.
   - Amend commits (`git commit --amend`) unless explicitly directed by the user for an un-pushed local commit.
   - Delete branches or change remote repository configuration.

---

## 5. Standard Git Workflow Commands

```bash
# 1. Ensure main branch is up-to-date
git checkout main
git pull origin main

# 2. Create feature branch
git checkout -b feat/inbox-assignment

# 3. Work on code, verify tests
pnpm test

# 4. Check modified files
git status

# 5. Stage files selectively
git add src/features/inbox/

# 6. Commit with Conventional Commit message
git commit -m "feat(inbox): add agent assignment dropdown to conversation header"

# 7. Push feature branch to origin
git push origin feat/inbox-assignment
```
