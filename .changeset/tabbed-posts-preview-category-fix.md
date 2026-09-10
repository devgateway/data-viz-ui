---
"@devgateway/dvz-ui-react": patch
---

Fix TCDICORE-601: the Gutenberg block editor's live preview for Tabbed Posts (and other blocks with array attributes such as `categories`) sent array attribute values to the preview iframe as JSON-stringified arrays (e.g. `"[5,7]"`), while the published front end joins them as comma-separated strings (`"5,7"`). The mismatch produced malformed REST query parameters (`&category=[5,7]`) that WordPress could not parse, so the live preview showed incorrectly-filtered posts even though the published page rendered correctly. Array attributes are now comma-joined in `PreviewComponent.tsx` to match the front-end save format; non-array object attributes are unaffected.
