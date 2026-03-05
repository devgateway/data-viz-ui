> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# Newsletter Form (UI Embeddable)

## Purpose
An embeddable React component that renders a Mailchimp newsletter subscription form with an email input, submit button, and success/error feedback messages. Connects to Redux for submission state management.

## Props / Attributes
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `list` | string | — | Mailchimp list/audience ID to subscribe to |
| `tag` | string | — | Mailchimp tag (e.g. country code) applied on subscription |
| `placeholder` | string | `"enter your email address"` | Placeholder text for the email input field |
| `label` | string | `"Send"` | Text label for the submit button |
| `successmessage` | string | `"Thanks"` | Message displayed on successful subscription |
| `failuremessage` | string | `"Something didn't go well"` | Message displayed on failed subscription |
| `editing` | boolean | — | When truthy, shows both success and error messages simultaneously (editor preview) |
| `email` *(Redux)* | string | — | Current email input value (managed via Redux store) |
| `status` *(Redux)* | string | — | Subscription status: `"OK"` or `"ERROR"` |

## Usage Example
```html
<!-- Embedded via data attributes -->
<div
  class="viz-component"
  data-component="newsletter"
  data-list="abc123"
  data-tag="US"
  data-placeholder="Your email"
  data-label="Subscribe"
></div>
```

```jsx
// Direct React usage (unwrapped from Redux)
import Newsletter from 'dvz-ui/src/embeddable/newsletter';

<Newsletter
  list="abc123"
  tag="US"
  placeholder="Your email"
  label="Subscribe"
  successmessage="You're subscribed!"
  failuremessage="Please try again."
/>
```

## Related
- WordPress Block: `newsletter` (`data-viz-wordpress/.../blocks/newsletter`)
