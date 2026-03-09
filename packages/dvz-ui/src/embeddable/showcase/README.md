> ⚠️ This README was automatically generated using AI based on source code analysis. Review and update as needed.

# Showcase (Contact Form)

## Purpose
An embeddable React contact form component that collects organisation, name, email, country, file attachments, and a message. Submission and reset are handled via Redux actions; validation is performed inline before dispatch.

## Props / Attributes
| Name | Type | Default | Description |
|------|------|---------|-------------|
| `organization` | `string` | `"Organization"` | Placeholder for the Organisation input. |
| `name` | `string` | `"Name"` | Placeholder for the Name input. |
| `email` | `string` | `"Email"` | Placeholder for the Email input (validated against email regex). |
| `country` | `string` | `"Country"` | Placeholder for the Country searchable dropdown. |
| `message` | `string` | `"Message"` | Placeholder for the Message textarea. |
| `submitlabel` | `string` | `"Submit"` | Label for the submit button. |
| `resetlabel` | `string` | `"Reset"` | Label for the reset button. |
| `successmessage` | `string` | `"Thanks for submitting your data"` | Inline message shown on successful submission. |
| `failuremessage` | `string` | `"Something didn't go well, please try again later"` | Inline message shown on submission failure. |
| `editing` | `boolean` | — | When `true`, both success and failure banners are shown simultaneously (editor preview mode). |
| `status` | `string` | — | Redux-injected submission status: `"OK"` or `"ERROR"`. |
| `onSubmit` | `function` | — | Redux action creator (`sendShowCaseForm`) called with form values on valid submit. |
| `onReset` | `function` | — | Redux action creator (`reset`) called when the form is reset. |

## Usage Example
The component is typically embedded as an iframe target. When mounting directly in React, wrap it with a Redux `<Provider>`:

```jsx
import ShowcaseForm from 'dvz-ui/src/embeddable/showcase';

// Inside a Redux-connected tree
<ShowcaseForm
  organization="Your Organisation"
  name="Full Name"
  email="Email Address"
  country="Country"
  submitlabel="Send"
  resetlabel="Clear"
  successmessage="Thank you!"
  failuremessage="Please try again."
/>
```

## Related
- WordPress Block: `showcase-form` (`data-viz-wordpress/…/blocks/showcase-form`)
