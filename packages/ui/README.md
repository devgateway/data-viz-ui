# @devgateway/ui

DVZ Design System — TypeScript + Tailwind CSS component library.  
Replaces `semantic-ui-react` with accessible, SSR-safe, fully typed components.

## Stack

| Layer | Library |
|---|---|
| Styling | Tailwind CSS + `class-variance-authority` |
| Accessibility primitives | Radix UI |
| Icons | Lucide React |
| Floating UI | `@floating-ui/react` (via Radix) |
| Combobox/Search | `cmdk` |
| Polymorphism | `@radix-ui/react-slot` (`asChild` pattern) |

## Installation

```bash
pnpm add @devgateway/ui
```

Peer dependencies: `react ^18.3.1`, `react-dom ^18.3.1`.

## Usage

```tsx
import { Container, Segment, Button, Grid, GridColumn } from '@devgateway/ui';

export function Page() {
  return (
    <Container>
      <Grid columns={3} stackable>
        <GridColumn>
          <Segment>
            <Button variant="primary">Save</Button>
          </Segment>
        </GridColumn>
      </Grid>
    </Container>
  );
}
```

## Component SSR Classification

| Component | SSR | Notes |
|---|---|---|
| `Container` | ✅ server | Pure Tailwind wrapper |
| `Grid` / `GridColumn` / `GridRow` | ✅ server | Pure Tailwind grid |
| `Segment` | ✅ server | Bordered panel |
| `Button` | ✅ server | `asChild` via Radix Slot |
| `Badge` | ✅ server | Replaces `Label` |
| `Heading` | ✅ server | Replaces `Header` |
| `Alert` | ✅ server | Replaces `Message` |
| `Separator` | ✅ server | Replaces `Divider` |
| `Image` | ✅ server | |
| `Flag` | ✅ server | Emoji or `<img>` |
| `Input` / `Textarea` | ✅ server | |
| `Spinner` / `Dimmer` / `LoadingOverlay` | ✅ server | Replaces `Loader`+`Dimmer` |
| `Icon` | ✅ server | Lucide icon wrapper |
| `Checkbox` | 🔄 client | Radix Checkbox |
| `RadioGroup` | 🔄 client | Radix RadioGroup |
| `Accordion` | 🔄 client | Radix Accordion |
| `Dialog` | 🔄 client | Radix Dialog + Portal |
| `Tooltip` / `Popover` | 🔄 client | Radix primitives |
| `Menu` / `MenuItem` | 🔀 isomorphic | Shell server-safe; scroll shadow client-only |
| `Combobox` | 🔄 client | Radix Popover + cmdk |
| `SearchInput` | 🔄 client | Radix Popover + cmdk |

## Hooks

```ts
import {
  useControllableState,   // controlled/uncontrolled state
  useComposedRefs,        // merge multiple React refs
  useOutsideClick,        // click-outside handler
  useEscapeKey,           // escape key handler
  useIsomorphicLayoutEffect, // SSR-safe layout effect
} from '@devgateway/ui';
```

## Design Tokens

Extend your `tailwind.config.ts`:

```ts
// Already included in this package's config — copy to consuming project:
colors: {
  'sui-blue':    '#2185d0',
  'sui-green':   '#21ba45',
  'sui-red':     '#db2828',
  'sui-orange':  '#f2711c',
  'sui-yellow':  '#fbbd08',
  'sui-teal':    '#00b5ad',
  'sui-grey':    'rgba(34,36,38,0.15)',
  'sui-text':    'rgba(0,0,0,0.87)',
  'sui-subtext': 'rgba(0,0,0,0.6)',
},
```

## Registry

Components are also published to the DVZ shadcn registry at `registry/registry.json`.  
Each entry includes an `"ssr"` field: `"server"`, `"client"`, or `"isomorphic"`.
