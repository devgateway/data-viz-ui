---
title: Agree-and-Download Embeddable Component
version: 1.0
date_created: 2026-04-10
owner: DevGateway Data-Viz Team
tags: [design, dvz-ui, embeddable, wordpress, download, dialog]
---

# Introduction

The `agree-and-download` embeddable presents a WP post title and triggers a file download only after the user accepts a configurable agreement dialog.

## 1. Purpose & Scope

**Purpose**: Define the behaviour, props, and rendering contract for `agree-and-download`, which gates a media file download behind a user-acknowledgement modal.

**Scope**: `packages/dvz-ui/src/embeddable/agree-and-download/index.jsx`.

**Intended Audience**: Engineers implementing or consuming this component in WordPress block/shortcode contexts.

**Assumptions**: Mounted via `data-*` HTML attributes. WordPress REST API is available.

## 2. Definitions

| Term | Definition |
|------|------------|
| **Embeddable** | A React component mounted by the dvz-ui runtime via `data-*` HTML attributes. |
| **WP** | WordPress — the CMS whose REST API backs this component. |
| **Media** | A WordPress attachment (PDF, image, etc.) resolved via `/wp/v2/media/{id}`. |
| **Agreement dialog** | A modal requiring user confirmation before a download is initiated. |

## 3. Requirements, Constraints & Guidelines

- **REQ-001**: The component MUST fetch the WP post identified by `data-post-slug` or `data-post-id` and display its title.
- **REQ-002**: Clicking the download trigger MUST open a modal dialog before initiating any file transfer.
- **REQ-003**: If `data-media-id` is provided, the component MUST resolve the media URL and use it as the download target.
- **REQ-004**: Clicking the agree button MUST trigger the file download and close the dialog.
- **REQ-005**: Clicking the cancel button MUST close the dialog without initiating a download.
- **REQ-006**: If no resolvable resource is found, the component MUST render in a disabled state without throwing.
- **CON-001**: The component MUST NOT initiate any download before the user explicitly clicks agree.
- **CON-002**: All user-facing labels MUST be configurable via `data-*` attributes; only default values may be hardcoded.
- **GUD-001**: Use `data-download-style` to control the visual variant (`"button"` or `"link"`).

## 4. Interfaces & Data Contracts

### `data-*` Attribute Props

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `data-post-type` | `string` | — | WP post type (e.g., `"post"`, `"page"`). |
| `data-download-style` | `string` | — | Trigger style: `"button"` or `"link"`. |
| `data-post-slug` | `string` | — | WP post slug to resolve the post. |
| `data-post-id` | `string` | — | WP post ID (alternative to slug). |
| `data-media-id` | `string` | — | WP media attachment ID for the download target. |
| `data-text` | `string` | — | Label on the download trigger. |
| `data-agree` | `string` | `"Agree"` | Confirmation button label. |
| `data-cancel` | `string` | `"Cancel"` | Cancel button label. |

### Internal Component Tree

```
Component (root)
  PostProvider / PostConsumer       ← resolves WP post
    MediaProvider / MediaConsumer   ← resolves media URL
      Button (trigger)
      Dialog
        DialogHeader                ← post title
        DialogContent               ← agreement text
        DialogActions
          Button (agree)            ← download + close
          Button (cancel)           ← close only
```

## 5. Acceptance Criteria

- **AC-001**: Given `data-post-slug` and `data-media-id`, when the component mounts, the post title is visible and no download begins.
- **AC-002**: When the user clicks the trigger, the agreement dialog opens.
- **AC-003**: When the user clicks agree, the download starts and the dialog closes.
- **AC-004**: When the user clicks cancel, the dialog closes and no download occurs.
- **AC-005**: Given no resolvable post or media, when the component renders, no exception is thrown and the trigger is disabled.
- **AC-006**: Given custom `data-agree` and `data-cancel` values, those exact strings appear on the respective buttons.

## 6. Test Automation Strategy

- **Test Levels**: Unit (dialog state), Integration (WP API mock + media resolution).
- **Frameworks**: Vitest + `@testing-library/react` + msw v2.
- **Test Data Management**: Fixture mock responses for `PostProvider` and `MediaProvider`.
- **CI/CD Integration**: `pnpm --filter @devgateway/dvz-ui-react test`.
- **Coverage Requirements**: 80% line coverage.

## 7. Rationale & Context

Download-gating satisfies data-sharing agreements requiring explicit user acknowledgement before report access. Embedding the gate inside a single component avoids server-side session state and works in headless WordPress contexts.

## 8. Dependencies & External Integrations

### External Systems
- **EXT-001**: WordPress REST API — post and media resolution.

### Technology Platform Dependencies
- **PLT-001**: `@devgateway/wp-react-lib` — `PostProvider`, `PostConsumer`, `MediaProvider`, `MediaConsumer`.
- **PLT-002**: `@devgateway/ui` — `Button`, `Dialog`, `DialogContent`, `DialogHeader`, `DialogActions`.

## 9. Examples & Edge Cases

```jsx
// Standard usage
<div data-component="agree-and-download"
     data-post-slug="2025-annual-report"
     data-media-id="123"
     data-text="Download Report"
     data-agree="I Agree" data-cancel="Cancel" />

// Edge: no media ID — trigger renders disabled
<div data-component="agree-and-download" data-post-slug="missing-report" />
```

## 10. Validation Criteria

- **VAL-001**: No download request fires before agree is clicked (msw interceptor asserts zero matching requests).
- **VAL-002**: Default labels `"Agree"` and `"Cancel"` render when attributes are absent.
- **VAL-003**: TypeScript compilation succeeds with `tsc --noEmit`.

## 11. Related Specifications / Further Reading

- [spec-tool-wp-react-lib-typed-api.md](./spec-tool-wp-react-lib-typed-api.md)
- [WordPress Media REST API](https://developer.wordpress.org/rest-api/reference/media/)
