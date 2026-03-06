> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# AgreeAndDownload Component

## Purpose
An embeddable React component that shows a download trigger (link or button) and, on click, opens a Semantic UI modal containing a WordPress post's agreement text. The user must click "Agree" to initiate the file download; clicking "Cancel" dismisses the modal without downloading.

## Props / Attributes
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `data-post-type` | string | — | WordPress post type to fetch the agreement post from |
| `data-download-style` | string | — | Display style of the trigger: `"link"` or `"button"` |
| `data-post-slug` | string | — | Slug of the WordPress post containing the agreement text |
| `data-post-id` | string/number | — | ID of the WordPress post containing the agreement text |
| `data-media-id` | string/number | — | WordPress media ID of the file to download |
| `data-text` | string | — | Label shown on the download trigger |
| `data-agree` | string | `"Agree"` | Label for the modal's confirm button |
| `data-cancel` | string | `"Cancel"` | Label for the modal's cancel/dismiss button |
| `intl.locale` | string | — | Active locale, injected by the `react-intl` provider |

## Usage Example
```jsx
import AgreeAndDownload from './embeddable/agree-and-download';

<AgreeAndDownload
  data-post-type="posts"
  data-download-style="button"
  data-post-slug="terms-and-conditions"
  data-post-id={42}
  data-media-id={101}
  data-text="Download Report"
  data-agree="I Agree"
  data-cancel="Cancel"
  intl={{ locale: 'en' }}
/>
```

The component uses `MediaProvider` / `MediaConsumer` from `@devgateway/wp-react-lib` to resolve the media URL and `PostProvider` / `PostConsumer` to load the agreement post content.

## Related
- WordPress Block: `agree-and-download` (`data-viz-wordpress/…/blocks/agree-and-download`)
