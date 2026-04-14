---
title: Newsletter Embeddable Component
version: 1.0
date_created: 2026-04-10
owner: DevGateway Data-Viz Team
tags: [design, dvz-ui, embeddable, newsletter, form, redux]
---

# Introduction

The `newsletter` embeddable renders an email subscription form connected to a Redux-backed newsletter subscription action. It shows success/error feedback after submission.

## 1. Purpose & Scope

**Purpose**: Define the form rendering, submission dispatch, and status feedback contract for `newsletter`.

**Scope**: `packages/dvz-ui/src/embeddable/newsletter/index.jsx`.

**Intended Audience**: Engineers embedding newsletter sign-up forms in WP pages.

## 2. Definitions

| Term | Definition |
|------|------------|
| **list** | The mailing list identifier passed in the subscription payload. |
| **tag** | An optional tag applied to the subscriber. |
| **status** | The subscription result: `"OK"`, `"ERROR"`, or `null` (pending). |

## 3. Requirements, Constraints & Guidelines

- **REQ-001**: The component MUST render an email input field and a submit button.
- **REQ-002**: Clicking submit MUST dispatch the subscription action with `{ email, list, tag }`.
- **REQ-003**: When `status === "OK"`, the component MUST render a success message (optionally in editing mode to preview).
- **REQ-004**: When `status === "ERROR"`, the component MUST render an error message.
- **REQ-005**: `email`, `list`, and `tag` MUST come from Redux-connected props.
- **CON-001**: The component MUST connect to Redux via `mapStateToProps` and `mapActionCreators`.
- **GUD-001**: The `list` identifier must match the mailing list slug configured in the backend.

## 4. Interfaces & Data Contracts

### Redux State Props

```typescript
interface NewsletterStateProps {
  email: string;
  list: string;
  tag: string;
  status: 'OK' | 'ERROR' | null;
}
```

### Submission Payload

```typescript
interface SubscriptionPayload {
  email: string;
  list: string;
  tag: string;
}
```

## 5. Acceptance Criteria

- **AC-001**: When rendered, an email input and submit button are present.
- **AC-002**: Clicking submit dispatches the subscription action with `{ email, list, tag }`.
- **AC-003**: When `status === "OK"`, a success confirmation is shown.
- **AC-004**: When `status === "ERROR"`, an error message is shown.
- **AC-005**: In `editing` mode, both success and error states are previewed simultaneously.

## 6. Test Automation Strategy

- **Test Levels**: Unit (submission dispatch, status rendering), Integration (Redux store).
- **Frameworks**: Vitest + `@testing-library/react` + Redux mock store.
- **CI/CD Integration**: `pnpm --filter @devgateway/dvz-ui-react test`.

## 7. Rationale & Context

Newsletter subscription is a common editorial requirement. Connecting to Redux allows the subscription state to be shared with other components (e.g., success banners).

## 8. Dependencies & External Integrations

### Technology Platform Dependencies
- **PLT-001**: Redux store — email, list, tag, and status state.

## 9. Examples & Edge Cases

```jsx
<div data-component="newsletter"
     data-list="main-newsletter"
     data-tag="website" />

// Edge: submit with empty email — frontend validation should prevent dispatch
```

## 10. Validation Criteria

- **VAL-001**: Submit dispatches with correct payload.
- **VAL-002**: Success/error states render correctly based on `status`.

## 11. Related Specifications / Further Reading

- [spec-tool-wp-react-lib-typed-api.md](./spec-tool-wp-react-lib-typed-api.md)
