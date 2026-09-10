---
"@devgateway/dvz-ui-react": patch
---

Revert the PR #296 fix for TCDICORE-601, which comma-joined all array/object
attributes in `PreviewComponent.tsx` before postMessage'ing them to the
block-editor preview iframe. That change was a shared choke point used by
every embeddable block, and it broke any block whose attribute is an array of
objects (e.g. `filters`, map `legendBreaks`) by turning it into an
unparseable `"[object Object],[object Object]"` string.

`PreviewComponent.tsx` now always JSON-stringifies object/array attributes
again, restoring pre-PR-296 behavior for every block except Tabbed Posts.

The original TCDICORE-601 problem — the Tabbed Posts editor preview sending
`categories` as `"[5,7]"` instead of the front-end's comma-separated `"5,7"`
— is now fixed locally inside the Tabbed Posts embeddable component
(`tabbedposts/index.jsx`), which detects a JSON-array-shaped `categories`
string and normalizes it to the comma-separated format the REST API expects,
without changing how any other block's attributes are serialized.
