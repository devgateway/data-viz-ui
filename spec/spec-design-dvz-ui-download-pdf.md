---
title: Download PDF Embeddable Component
version: 1.0
date_created: 2026-04-10
owner: DevGateway Data-Viz Team
tags: [design, dvz-ui, embeddable, download, pdf]
---

# Introduction

The `downloadPDF` embeddable provides a button that fetches a pre-generated PDF from a server endpoint and triggers a browser download.

## 1. Purpose & Scope

**Purpose**: Define the fetch, blob-handling, and download trigger contract for `downloadPDF`.

**Scope**: `packages/dvz-ui/src/embeddable/downloadPDF/index.tsx`.

**Intended Audience**: Engineers embedding PDF download actions in WP pages.

## 2. Definitions

| Term | Definition |
|------|------------|
| **PDF endpoint** | A server route at `/pdf/{url}` that returns a PDF blob. |
| **Blob URL** | A temporary `object:` URL created by `URL.createObjectURL()` for triggering anchor downloads. |

## 3. Requirements, Constraints & Guidelines

- **REQ-001**: Clicking the download button MUST fetch `/pdf/{data-url}` and trigger a browser file download.
- **REQ-002**: The button MUST display a loading indicator while the fetch is in progress.
- **REQ-003**: After the download completes, the loading state MUST be cleared and the temporary blob URL MUST be revoked.
- **REQ-004**: The downloaded file MUST be named `data-file-label`.
- **CON-001**: This component MUST NOT use `renderToString` or DOM-to-image; it fetches a server-generated PDF.
- **CON-002**: `window.URL.createObjectURL` is browser-only; this component MUST be used inside a `'use client'` boundary in SSR contexts.
- **GUD-001**: Set `data-url` to the path segment after `/pdf/` — do not include the `/pdf/` prefix.

## 4. Interfaces & Data Contracts

### `data-*` Attribute Props

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `data-height` | `string` | — | Container height. |
| `data-button-label` | `string` | `"Download PDF"` | Button label. |
| `data-file-label` | `string` | — | Downloaded file name (including `.pdf`). |
| `data-url` | `string` | — | Path segment for `/pdf/{url}` endpoint. |

### DownloadableContent Props

```typescript
interface DownloadableContentProps {
  children: React.ReactNode;
}
```

## 5. Acceptance Criteria

- **AC-001**: Given `data-url="annual-report"`, when the button is clicked, a GET request is made to `/pdf/annual-report`.
- **AC-002**: While the fetch is in progress, the button displays a loading indicator.
- **AC-003**: After the fetch completes, the file named `data-file-label` is downloaded.
- **AC-004**: The loading indicator clears after download completes.
- **AC-005**: Given `data-button-label="Get Report"`, the button renders with that label.

## 6. Test Automation Strategy

- **Test Levels**: Unit (button state), Integration (fetch mock returning PDF blob).
- **Frameworks**: Vitest + `@testing-library/react` + msw v2.
- **CI/CD Integration**: `pnpm --filter @devgateway/dvz-ui-react test`.

## 7. Rationale & Context

Serving PDFs from a dedicated `/pdf/` endpoint (rather than a direct static URL) allows server-side generation, watermarking, and access control without exposing the underlying storage path.

## 8. Dependencies & External Integrations

### External Systems
- **EXT-001**: PDF server endpoint at `/pdf/{path}` — must return `Content-Type: application/pdf`.

### Technology Platform Dependencies
- **PLT-001**: `@devgateway/ui` — `Button`, `Container`.

## 9. Examples & Edge Cases

```jsx
<div data-component="downloadPDF"
     data-url="2025-annual-report"
     data-button-label="Download Annual Report"
     data-file-label="Annual-Report-2025.pdf" />

// Edge: server returns 404 → loading clears, no file downloaded (error handling TBD)
```

## 10. Validation Criteria

- **VAL-001**: Fetch is made to the correct `/pdf/{url}` path on button click.
- **VAL-002**: Button shows loading state during fetch.
- **VAL-003**: Blob URL is revoked after download.

## 11. Related Specifications / Further Reading

- [spec-design-dvz-ui-agree-and-download.md](./spec-design-dvz-ui-agree-and-download.md)
