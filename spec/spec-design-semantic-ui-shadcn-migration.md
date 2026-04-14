---
title: Migration from Semantic UI React to Custom shadcn/ui Registry (SSR-Compatible)
version: 1.1
date_created: 2026-04-07
last_updated: 2026-04-07
owner: DevGateway Data-Viz Team
tags: [design, component-library, tailwind, shadcn, typescript, migration, ssr]
---

# Introduction

This specification defines the requirements and component mapping for migrating `packages/dvz-ui` away from `semantic-ui-react` — an unmaintained library — to a custom shadcn/ui component registry. The replacement components must preserve the visual appearance and behaviour of Semantic UI while being implemented as TypeScript + Tailwind CSS components that are tree-shakeable, fully server-side rendering (SSR) compatible, and accessible.

SSR compatibility is a first-class requirement. All replacement components MUST render correctly in a Node.js / Edge Runtime environment (Next.js App Router RSC, React Router v7 loader output) without referencing browser-only globals (`window`, `document`, `navigator`, `localStorage`) at module evaluation time or during server rendering. Interactive behaviour that inherently requires the browser (e.g., focus management, scroll, portal mounting) MUST be isolated behind `'use client'` directives or deferred via `useEffect`/`useLayoutEffect`. The custom registry is published to a private shadcn registry endpoint consumable via `npx shadcn add`.

---

## 1. Purpose & Scope

**Purpose**: Replace all `semantic-ui-react` imports across `packages/dvz-ui/src` with an equivalent set of TypeScript + Tailwind CSS components that:

- Match the Semantic UI visual design language (blue accent colour, rounded segments, flat buttons, icon-adjacent text patterns).
- Are fully typed (no `any` in public props).
- Are accessible (ARIA attributes, keyboard navigation) via Radix UI primitives where appropriate.
- Ship in a custom shadcn registry consumable by `npx shadcn add <component>`.
- Are SSR-safe (no `window`/`document` access at module scope).

**Scope**: All files in `packages/dvz-ui/src/` that import from `semantic-ui-react`. The audit identified **64 files** across `embeddable/` and `layout/` directories using **24 unique components plus 3 TypeScript type imports**. SSR compatibility applies to all replacement components and is tested against Next.js App Router (RSC) and React Router v7 loader environments.

**Out of scope**: The `wp-react-lib` package (separate migration tracked in `spec-tool-wp-react-lib-typed-api.md`), Superset SDK integration, D3 rendering internals.

**Intended Audience**: Frontend engineers implementing the custom shadcn registry and engineers performing the per-file component replacement in `dvz-ui`.

---

## 2. Definitions

| Term | Definition |
|------|------------|
| **SUI** | Semantic UI React — the library being replaced (`semantic-ui-react` npm package). |
| **shadcn/ui** | A collection of copy-paste React components built on Radix UI primitives and Tailwind CSS. Components are owned by the consuming project, not installed as a package dependency. |
| **Custom Registry** | A private shadcn-compatible JSON endpoint that allows `npx shadcn add <url>/<component>` to install project-specific components. |
| **Radix UI** | A headless, accessible React component library (`@radix-ui/*`) that provides interaction primitives (Dialog, Tooltip, Accordion, etc.) without styling. |
| **Tailwind CSS** | A utility-first CSS framework. Used to implement Semantic UI-matching visual styles in replacement components. |
| **Lucide React** | The icon library used by the shadcn/ui ecosystem. Replaces the Semantic UI icon font. |
| **SemanticWIDTHS** | A SUI TypeScript type for grid column counts (`1 \| 2 \| ... \| 16`). Replaced by a local type alias. |
| **Container** | SUI's max-width centering wrapper. The most-used SUI component in dvz-ui (47 files). |
| **Segment** | SUI's bordered, padded content panel. Used in 16 files. |
| **Grid** | SUI's 16-column CSS grid system. Used in 16 files. |
| **DVZ** | DevGateway Data Viz — the product namespace for this monorepo. |
| **SSR** | Server-Side Rendering — components are rendered to HTML on the server (Node.js or Edge Runtime) before being sent to the browser. |
| **RSC** | React Server Component — a React 18+ component that runs exclusively on the server. Cannot use hooks, browser APIs, or `'use client'` features. |
| **`'use client'`** | A Next.js / React directive that marks a component module boundary where client-only code begins. Components with this directive are excluded from RSC bundles and are hydrated in the browser. |
| **Hydration** | The process of attaching React event listeners to server-rendered HTML in the browser. Hydration errors occur when server-rendered HTML does not match what React renders on the client. |
| **Portal** | A React `ReactDOM.createPortal()` call that mounts a component outside its DOM parent (e.g., modals mounting to `document.body`). Portals are browser-only and require `'use client'`. |
| **`useEffect`** | A React hook that runs only after the component mounts in the browser. Used to safely access browser APIs that are not available on the server. |
| **`useIsomorphicLayoutEffect`** | A pattern that uses `useLayoutEffect` in the browser and `useEffect` on the server, avoiding SSR warnings. |

---

## 3. Requirements, Constraints & Guidelines

### Migration Requirements

- **REQ-001**: Every SUI component import in `packages/dvz-ui/src/` MUST be replaced with an equivalent component from the custom registry. Zero `import ... from 'semantic-ui-react'` statements must remain after migration.
- **REQ-002**: Replacement components MUST be written in TypeScript (`.tsx`). No `.jsx` files may be introduced.
- **REQ-003**: Replacement components MUST use Tailwind CSS utility classes for all styling. No inline `style` objects (except for dynamic values such as chart colours or background images) and no SUI CSS class names (`ui container`, `ui segment`, etc.).
- **REQ-004**: `semantic-ui-css` (the SUI stylesheet currently imported globally) MUST be removed from the application entry point after all component replacements are complete.
- **REQ-005**: The `SemanticWIDTHS` TypeScript type (currently imported from `semantic-ui-react` in 3 files) MUST be replaced with a locally defined type alias `type ColSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16`.
- **REQ-006**: All components that currently use the SUI Icon component MUST use Lucide React icons as the replacement icon system. Icon name mapping must be documented (see Section 4.3).
- **REQ-007**: The `Flag` component (used in `layout/Header.jsx` for language/country flags) MUST be replaced with a custom `Flag` component that renders flag images from the existing WP plugin path or uses emoji flag characters as a fallback.
- **REQ-008**: Interactive components (Dropdown, Modal, Accordion, Popup/Tooltip) MUST use Radix UI primitives internally to retain accessibility and keyboard navigation behaviour.
- **REQ-009**: The complex `Dropdown` used in filter components (`filter/index.tsx`, `PostsFilterDropdown.tsx`) supports multi-select, single-select, text search, checkboxes, and radio buttons. Its replacement MUST support all of these modes via a single `Combobox` component.
- **REQ-010**: The `Search` component (used in `layout/CustomSemanticSearch.tsx`) renders a custom results list with a header showing result count. Its replacement MUST accept a `resultRenderer` prop and a `total`/`perPage` prop pair for the results header.
- **REQ-011**: Replacement components MUST be published to the private DVZ shadcn registry so they are installable via `npx shadcn add <registry-url>/<component-name>`.
- **REQ-012**: `semantic-ui-react` and `semantic-ui-css` MUST be removed from `package.json` `dependencies` after migration is complete.

### Modern React & TypeScript Requirements

The SUI source code (provided as reference) uses the following patterns that MUST be replaced with modern equivalents:

- **MOD-001**: SUI class components (`class DropdownInner extends Component`, `class SearchInner extends Component`, `class AccordionPanel extends Component`) MUST be replaced with **React functional components using hooks**. No class components are permitted in the registry.
- **MOD-002**: SUI's `[key: string]: any` index signature on every interface (e.g., `export interface ButtonProps extends StrictButtonProps { [key: string]: any }`) MUST NOT be used. All component prop interfaces MUST be fully typed with no index signatures. The `Strict*Props` / `*Props` split pattern from SUI is abolished — a single typed interface per component is required.
- **MOD-003**: SUI's `PropTypes` runtime validators MUST be replaced with TypeScript interface declarations only. No `Component.propTypes = {}` or `PropTypes.*` usage is permitted.
- **MOD-004**: SUI's `as?: any` polymorphic prop (used in nearly every SUI component to allow rendering as an arbitrary element) MUST be replaced with a typed polymorphic pattern using React 18's `asChild` prop (Radix UI `Slot` component) where runtime element substitution is needed. For simple cases (e.g., Button rendering as an anchor), an explicit `asChild?: boolean` prop is sufficient.
- **MOD-005**: SUI's internal `classNameBuilders.js` utilities (`getKeyOnly`, `getValueAndKey`, `getWidthProp`, etc.) — which compose CSS class strings procedurally — MUST be replaced with **`class-variance-authority` (CVA)** `cva()` definitions. All variant/compound-variant logic MUST be expressed in the `cva` config, not in imperative if/else blocks.
- **MOD-006**: SUI's `useAutoControlledValue` hook — which provides a unified controlled/uncontrolled value pattern — MUST be replaced with a local `useControllableState<T>(value, defaultValue, onChange)` hook modelled on the Radix UI pattern. All stateful components (Accordion, Dropdown/Combobox, Dialog, SearchInput) MUST support both controlled (`value` + `onChange`) and uncontrolled (`defaultValue`) usage via this hook.
- **MOD-007**: SUI's `useEventCallback` (a ref-stabilised event handler) MUST be replaced with React's built-in **`useCallback`** with stable dependencies. If ref-stabilisation is required (e.g., for animation frame callbacks), use the `useCallback` + `useRef` pattern explicitly.
- **MOD-008**: SUI's `useIsomorphicLayoutEffect` (switches between `useLayoutEffect` and `useEffect` based on environment) MUST be preserved as a local utility at `src/registry/hooks/use-isomorphic-layout-effect.ts`. All registry components that need layout-phase side effects MUST use this hook, not bare `useLayoutEffect`.
- **MOD-009**: SUI's global `eventStack` (a custom event listener registry for document-level events like click-outside, escape key) MUST be replaced by **Radix UI's built-in dismiss/outside-click handling** for components that use Radix primitives. For non-Radix components, use the `useEffect` + `addEventListener` pattern with proper cleanup in the `useEffect` return function.
- **MOD-010**: SUI's Popper.js-based positioning for `Popup` MUST be replaced with **`@floating-ui/react`** (the successor to Popper.js, used by Radix UI internally). Direct Radix `Tooltip` and `Popover` primitives handle this automatically; custom positioning scenarios MUST use `@floating-ui/react` hooks (`useFloating`, `autoUpdate`, `flip`, `shift`, `offset`).
- **MOD-011**: SUI's use of Lodash (`_.some`, `_.find`, `_.isEqual`, etc.) MUST be replaced with **native ES2022+ equivalents** (`Array.prototype.some`, `Array.prototype.find`, `structuredClone` + manual comparison, etc.). Lodash is not permitted in registry components.
- **MOD-012**: SUI's `childrenUtils.js` (`someByType`, `findByType`, `isNil`) — which inspect `children` by component type — MUST be replaced with the React 18 `Children.toArray` + `isValidElement` + type checking pattern, or preferably restructured to use **explicit named slots** (separate props like `header`, `content`, `footer`) instead of type-sniffing children.
- **MOD-013**: SUI uses `React.forwardRef` extensively. All registry components MUST expose a typed `ref` via `React.forwardRef` so that consumers can access the underlying DOM element. The forwarded `ref` type MUST be the specific DOM element type (e.g., `HTMLButtonElement`, `HTMLDivElement`), not `HTMLElement`.
- **MOD-014**: SUI's `SemanticShorthandItem<T>` pattern (which accepts `T | string | ReactNode` as a shorthand prop) MUST NOT be replicated. Props that accept content MUST be typed as either `React.ReactNode` (for JSX content) or a specific data type — not a union that conflates data and UI.
- **MOD-015**: All registry components MUST be exported as named exports. Default exports are not permitted in the registry to ensure tree-shaking and consistent import patterns.

### SSR Requirements

- **SSR-001**: Every replacement component MUST be renderable in a Node.js or Edge Runtime environment without throwing errors. No component may access `window`, `document`, `navigator`, `location`, or `localStorage` at module evaluation time or during the synchronous render pass.
- **SSR-002**: Components that are purely presentational and stateless (e.g., `Container`, `Segment`, `Grid`, `GridColumn`, `GridRow`, `Heading`, `Badge`, `Alert`, `Separator`, `Image`) MUST NOT carry a `'use client'` directive. They are valid React Server Components and can be rendered in RSC trees.
- **SSR-003**: Components that require browser APIs, event listeners, or React hooks (`useState`, `useEffect`, `useRef`, `useContext` backed by a client-side provider) MUST be marked with `'use client'` at the top of their file. These components are client components and will be hydrated in the browser.
- **SSR-004**: The `'use client'` boundary MUST be placed as deep in the component tree as possible to maximise the RSC surface area. A layout wrapper (`Container`, `Segment`) MUST NOT be made a client component merely because it accepts an interactive child.
- **SSR-005**: Components that use Radix UI primitives (`Dialog`, `Tooltip`, `Popover`, `Accordion`, `DropdownMenu`, `Select`) MUST carry `'use client'` because Radix UI uses React hooks internally. Their RSC-compatible counterparts (static markup only, no interactivity) are not required — the `'use client'` boundary is the correct solution.
- **SSR-006**: The `Dialog` (Modal replacement) MUST NOT mount its portal to `document.body` during SSR. Radix UI's `Dialog` handles this correctly by default; any customisation MUST preserve this behaviour.
- **SSR-007**: The `Dimmer` and `LoadingOverlay` components MUST NOT use `useLayoutEffect` directly. They MUST use a `useIsomorphicLayoutEffect` utility (falls back to `useEffect` on the server) if layout-phase side effects are needed.
- **SSR-008**: The `Menu` component, when used as a fixed navigation bar (`fixed="top"`), accesses scroll position to apply shadow styles. This scroll listener MUST be registered inside `useEffect` (client-only) and MUST NOT run on the server.
- **SSR-009**: The `SearchInput` component opens a results popover in response to user input. The popover open/close state MUST be managed in client-side state (`useState`) and MUST NOT affect server-rendered HTML. The input itself MUST be renderable server-side with no open popover.
- **SSR-010**: The `Flag` component MUST render an `<img>` tag or an emoji character. It MUST NOT rely on `document` to detect flag image availability. Fallback to emoji MUST be declarative (prop-driven), not browser-detected.
- **SSR-011**: No replacement component may import or reference `ReactDOM.createPortal` at module scope in a file without `'use client'`. Portal usage is inherently client-only.
- **SSR-012**: Every `'use client'` component MUST accept a `children` prop where applicable so that RSC content can be passed into it as a prop (React's composition pattern for RSC + client component interop).
- **SSR-013**: The registry manifest (`registry.json`) MUST annotate each component with an `"ssr"` field indicating its SSR classification: `"server"` (no `'use client'`, safe in RSC), `"client"` (requires `'use client'`, hydrated in browser), or `"isomorphic"` (has both a server-renderable shell and a client-hydrated interactive layer).

### Visual Fidelity Requirements

- **VIS-001**: The `Container` replacement MUST produce a centred block with `max-width: 1200px` and horizontal padding of `1rem`, matching SUI's default container width.
- **VIS-002**: The `Segment` replacement MUST render with a `1px solid rgba(34,36,38,0.15)` border, `1rem` padding, and a subtle box-shadow matching SUI's segment appearance. Modifiers `placeholder`, `basic`, `vertical`, and `color` variants must be supported.
- **VIS-003**: The `Button` replacement MUST support `primary` (blue `#2185d0`), `secondary`, `positive` (green), `negative` (red), `basic`, and `size` variants matching SUI button variants.
- **VIS-004**: The `Message` replacement MUST support `positive` (green), `negative` (red), `warning` (yellow), and `info` (blue) colour variants with the SUI-matching left-coloured-border style.
- **VIS-005**: The `Menu` replacement MUST support horizontal (navbar) and vertical (sidebar) orientations, with active item highlighting using the SUI blue underline / background pattern.
- **VIS-006**: The `Label` replacement MUST render as an inline badge with rounded corners and coloured backgrounds, matching SUI's label visual.
- **VIS-007**: The `Grid` replacement MUST implement a 16-column grid where `columns` prop maps to `grid-cols-{N}` and individual `GridColumn` accepts `width` (ColSpan) and `computer`/`tablet`/`mobile` responsive width props matching SUI's responsive grid breakpoints.
- **VIS-008**: The `Loader`/`Dimmer` combination MUST be replaced by a `LoadingOverlay` component that renders a centred spinner over a dimmed (semi-transparent black) overlay, matching SUI's dimmer appearance.

### Constraints

- **CON-001**: Radix UI primitive packages (`@radix-ui/react-dialog`, `@radix-ui/react-tooltip`, `@radix-ui/react-accordion`, `@radix-ui/react-dropdown-menu`, `@radix-ui/react-select`, `@radix-ui/react-checkbox`, `@radix-ui/react-radio-group`, `@radix-ui/react-popover`, `@radix-ui/react-separator`, `@radix-ui/react-slot`) MAY be added as direct dependencies of `dvz-ui`.
- **CON-002**: `lucide-react` MUST be added as a dependency.
- **CON-003**: `@floating-ui/react` MUST be added as a dependency for any custom floating positioning not covered by Radix UI primitives.
- **CON-004**: Components MUST NOT depend on `semantic-ui-react` or `semantic-ui-css` in any form.
- **CON-005**: The custom registry components MUST be self-contained — they must not import from each other unless explicitly documented as a sub-component relationship (e.g., `Grid` may import `GridColumn`).
- **CON-006**: The global Tailwind CSS config MUST include the Semantic UI blue colour as a named design token: `sui-blue: '#2185d0'` to maintain colour consistency.
- **CON-007**: `class-variance-authority` (CVA) MUST be used for variant-based component styling to ensure type-safe prop-to-class mapping.
- **CON-008**: Lodash MUST NOT be added as a dependency of the registry. Native ES2022+ methods are the required replacement.
- **CON-009**: `PropTypes` MUST NOT be used in any registry file. TypeScript interfaces are the sole mechanism for prop documentation and validation.
- **CON-010**: No class components (`class Foo extends React.Component`) are permitted in the registry. All components MUST be functional components.

### Guidelines

- **GUD-001**: Prefer Radix UI-backed implementations for all interactive components (those with open/close state, focus management, or keyboard navigation).
- **GUD-002**: Simple layout-only SUI components (`Container`, `Grid`, `GridColumn`, `GridRow`, `Divider`) SHOULD be implemented as pure Tailwind wrappers without Radix UI.
- **GUD-003**: Existing component prop interfaces (e.g., `PostFilterDropdownProps extends DropdownProps`) MUST be preserved where `DropdownProps` is referenced — replace with an equivalent local `DropdownProps` interface.
- **GUD-004**: Components should expose a `className` prop for consumer overrides, merged using `clsx` or `cn` utility.
- **GUD-005**: Migrate one component at a time, starting with the highest-usage, simplest components (`Container`, `Segment`, `Grid`) and finishing with the most complex (`Dropdown`/`Combobox`, `Search`).

---

## 4. Interfaces & Data Contracts

### 4.1 Complete SUI Component Inventory and Replacements

| SUI Component | Files | Role | Replacement Component | Backed By |
|---|---|---|---|---|
| `Container` | 47 | Max-width centred layout wrapper | `Container` | Tailwind only |
| `Icon` | 18 | Icon rendering | Lucide React icon (per mapping) | `lucide-react` |
| `Menu` | 12 | Horizontal/vertical nav bar | `Menu` + `MenuItem` | Radix `NavigationMenu` |
| `Button` | 10 | Action button | `Button` | Radix `Slot` (cva variants) |
| `Grid` | 16 | 16-column layout grid | `Grid` | Tailwind `grid` |
| `Segment` | 16 | Bordered panel/card | `Segment` | Tailwind only |
| `Label` | 8 | Inline badge/tag | `Badge` | Tailwind only (cva) |
| `Dropdown` | 7 | Select / multi-select / searchable | `Combobox` | Radix `Popover` + `Command` |
| `Image` | 7 | Image with sizing helpers | `Image` | Tailwind only |
| `Popup` | 7 | Tooltip / popover | `Tooltip` + `Popover` | Radix `Tooltip` / `Popover` |
| `Loader` | 6 | Spinner | `Spinner` | Tailwind `animate-spin` |
| `Dimmer` | 5 | Full-overlay dimmer | `Dimmer` (wraps `Spinner`) | Tailwind only |
| `Input` | 4 | Text input | `Input` | Tailwind only |
| `Search` | 4 | Autocomplete search | `SearchInput` | Radix `Popover` + `Command` |
| `Accordion` | 3 | Collapsible sections | `Accordion` | Radix `Accordion` |
| `Message` | 3 | Alert / notification | `Alert` | Tailwind only (cva) |
| `Modal` | 2 | Dialog overlay | `Dialog` | Radix `Dialog` |
| `GridColumn` | 2 | Grid cell | `GridColumn` | Tailwind `col-span` |
| `GridRow` | 2 | Grid row wrapper | `GridRow` | Tailwind `contents` |
| `Header` | 11 | Typography heading | `Heading` | Tailwind only (cva) |
| `Checkbox` | 2 | Checkbox input | `Checkbox` | Radix `Checkbox` |
| `Radio` | 2 | Radio button | `RadioGroup` / `RadioGroupItem` | Radix `RadioGroup` |
| `Flag` | 1 | Country flag | `Flag` | Custom (img / emoji) |
| `Form` | 1 | Form wrapper | `Form` | Tailwind only |
| `TextArea` | 1 | Multi-line text input | `Textarea` | Tailwind only |
| `Divider` | 1 | Horizontal rule | `Separator` | Radix `Separator` |
| `Message` | 3 | Notification box | `Alert` | cva + Tailwind |
| `SemanticWIDTHS` | 3 | Type: 1–16 column count | `ColSpan` (local type alias) | TypeScript only |
| `DropdownProps` | 2 | Type: dropdown props interface | `ComboboxProps` (local interface) | TypeScript only |

### 4.2 Replacement Component Public Interfaces

```typescript
// ── Container ───────────────────────────────────────────────────────────────
interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: boolean;   // narrows max-width to ~700px (SUI text container)
  fluid?: boolean;  // removes max-width constraint
}

// ── Grid ────────────────────────────────────────────────────────────────────
type ColSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16;

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: ColSpan;
  stackable?: boolean;  // single column on mobile
  doubling?: boolean;   // halves column count on tablet
  divided?: boolean;    // renders column dividers
  relaxed?: boolean;    // increases column gap
}

interface GridColumnProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: ColSpan;
  computer?: ColSpan;
  tablet?: ColSpan;
  mobile?: ColSpan;
  textAlign?: 'left' | 'center' | 'right';
  verticalAlign?: 'top' | 'middle' | 'bottom';
}

// ── Segment ──────────────────────────────────────────────────────────────────
interface SegmentProps extends React.HTMLAttributes<HTMLDivElement> {
  placeholder?: boolean;   // min-height centred content
  basic?: boolean;         // no border/shadow
  vertical?: boolean;      // adds top/bottom border only
  color?: string;          // coloured top border accent (e.g. 'blue')
  textAlign?: 'left' | 'center' | 'right';
  loading?: boolean;       // shows inline spinner overlay
}

// ── Button ───────────────────────────────────────────────────────────────────
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'positive' | 'negative' | 'basic';
  size?: 'mini' | 'tiny' | 'small' | 'medium' | 'large' | 'big' | 'huge' | 'massive';
  icon?: boolean;         // icon-only button (square, no text padding)
  loading?: boolean;      // replaces label with spinner
  fluid?: boolean;        // full-width
  as?: React.ElementType; // polymorphic (e.g., 'a')
}

// ── Dropdown / Combobox ──────────────────────────────────────────────────────
interface ComboboxOption {
  key: string | number;
  text: string;
  value: string | number;
  content?: React.ReactNode;  // custom rendered content
}

interface ComboboxProps {
  options: ComboboxOption[];
  value?: string | number | Array<string | number>;
  multiple?: boolean;          // multi-select mode
  search?: boolean;            // enable text search within options
  placeholder?: string;
  disabled?: boolean;
  clearable?: boolean;
  onChange?: (value: string | number | Array<string | number>) => void;
  renderLabel?: (option: ComboboxOption) => React.ReactNode;  // for tags
  className?: string;
}

// ── Modal / Dialog ───────────────────────────────────────────────────────────
interface DialogProps {
  open?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  trigger?: React.ReactNode;
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large' | 'fullscreen';
}
// Sub-components: Dialog.Header, Dialog.Content, Dialog.Actions

// ── Popup / Tooltip ──────────────────────────────────────────────────────────
interface TooltipProps {
  content: React.ReactNode;
  trigger: React.ReactNode;   // element that triggers the tooltip on hover
  position?: 'top' | 'bottom' | 'left' | 'right';
}

interface PopoverProps {
  content: React.ReactNode;
  trigger: React.ReactNode;   // element that triggers the popover on click
  position?: 'top' | 'bottom' | 'left' | 'right';
}

// ── Icon (Lucide wrapper) ─────────────────────────────────────────────────────
interface IconProps {
  name: SuiIconName;    // mapped SUI icon name — see Section 4.3
  size?: 'mini' | 'tiny' | 'small' | 'large' | 'big' | 'huge' | 'massive';
  className?: string;
  onClick?: React.MouseEventHandler;
}

// ── Message / Alert ────────────────────────────────────────────────────────
interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'positive' | 'negative' | 'warning' | 'info';
  icon?: boolean;
  header?: React.ReactNode;
}

// ── Loader + Dimmer ────────────────────────────────────────────────────────
interface SpinnerProps {
  size?: 'small' | 'medium' | 'large';
  inline?: boolean;
}

interface DimmerProps {
  active?: boolean;
  inverted?: boolean;  // white background instead of dark
  children?: React.ReactNode;
}

// ── Menu ──────────────────────────────────────────────────────────────────
interface MenuProps extends React.HTMLAttributes<HTMLElement> {
  vertical?: boolean;
  pointing?: boolean;   // active item shows underline/left border
  secondary?: boolean;  // lighter appearance
  tabular?: boolean;    // tab-style
  fluid?: boolean;
  fixed?: 'top' | 'bottom';
}

interface MenuItemProps extends React.HTMLAttributes<HTMLAnchorElement | HTMLDivElement> {
  active?: boolean;
  as?: React.ElementType;
  href?: string;
  name?: string;
  position?: 'right'; // pushes item to the right end of the menu
}

// ── Label / Badge ──────────────────────────────────────────────────────────
interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: string;
  basic?: boolean;
  size?: 'mini' | 'tiny' | 'small' | 'large' | 'big' | 'huge' | 'massive';
  tag?: boolean;  // renders with a tag shape
}

// ── Accordion ──────────────────────────────────────────────────────────────
interface AccordionProps {
  exclusive?: boolean;  // only one panel open at a time (default true)
  fluid?: boolean;
  children: React.ReactNode;
}

interface AccordionTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  index?: number;
  onClick?: (index: number) => void;
}

interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
}

// ── SearchInput ───────────────────────────────────────────────────────────
interface SearchInputProps {
  value?: string;
  onSearchChange?: (value: string) => void;
  onResultSelect?: (result: SearchResult) => void;
  results?: SearchResult[];
  resultRenderer?: (result: SearchResult) => React.ReactNode;
  loading?: boolean;
  showNoResults?: boolean;
  placeholder?: string;
  total?: number;
  perPage?: number;
}

interface SearchResult {
  id: string | number;
  title: string;
  description?: string;
  [key: string]: unknown;
}

// ── Image ─────────────────────────────────────────────────────────────────
interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: 'mini' | 'tiny' | 'small' | 'medium' | 'large' | 'big' | 'huge' | 'massive';
  circular?: boolean;
  rounded?: boolean;
  fluid?: boolean;
  avatar?: boolean;
}

// ── Heading (replaces Header) ─────────────────────────────────────────────
interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: 'huge' | 'large' | 'medium' | 'small' | 'tiny';
  icon?: boolean;         // centres content for icon+text layout
  textAlign?: 'left' | 'center' | 'right';
  dividing?: boolean;     // adds bottom border
}

// ── Flag ──────────────────────────────────────────────────────────────────
interface FlagProps {
  name: string;   // ISO 3166-1 alpha-2 country code or locale key
  src?: string;   // explicit image URL override
}

// ── Separator (replaces Divider) ──────────────────────────────────────────
interface SeparatorProps extends React.HTMLAttributes<HTMLHRElement> {
  horizontal?: boolean;   // default true
  section?: boolean;      // adds more vertical margin
  hidden?: boolean;       // invisible but provides spacing
}

// ── Input / Textarea ──────────────────────────────────────────────────────
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: string;              // SuiIconName — renders icon inside input
  iconPosition?: 'left' | 'right';
  label?: string;             // inline label
  fluid?: boolean;
  error?: boolean;
  loading?: boolean;
}

// ── Checkbox / Radio ──────────────────────────────────────────────────────
interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: React.ReactNode;
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
}

interface RadioGroupItemProps {
  value: string;
  label?: React.ReactNode;
}
```

### 4.3 Icon Name Mapping (SUI → Lucide)

| SUI `name` | Lucide Component | Usage in dvz-ui |
|---|---|---|
| `search` | `Search` | Filter, header search |
| `arrow alternate circle left outline` | `CircleArrowLeft` | Featured tabs back button |
| `close` / `times` | `X` | Close buttons, modal dismiss |
| `world` | `Globe` | Language switcher |
| `envelope` | `Mail` | Newsletter input icon |
| `angle down` / `chevron down` | `ChevronDown` | Dropdown toggle |
| `angle up` / `chevron up` | `ChevronUp` | Dropdown toggle |
| `angle left` | `ChevronLeft` | Pagination prev |
| `angle right` | `ChevronRight` | Pagination next |
| `angle double left` | `ChevronsLeft` | Pagination first |
| `angle double right` | `ChevronsRight` | Pagination last |
| `plus` | `Plus` | Zoom in, expand |
| `minus` | `Minus` | Zoom out, collapse |
| `expand` / `expand arrows alternate` | `Expand` | Map full view |
| `download` | `Download` | Download button |
| `filter` | `Filter` | Filter reset button |
| `info circle` | `Info` | Tooltip trigger |
| `check` | `Check` | Checkbox, positive indicator |
| `warning` / `warning circle` | `AlertCircle` | Warning message |
| `times circle` | `XCircle` | Error/negative indicator |
| `check circle` | `CheckCircle` | Success indicator |

> **Note**: Any SUI icon name not listed above MUST be mapped individually during migration. Engineers MUST NOT use the SUI icon font after `semantic-ui-css` is removed.

### 4.4 Tailwind Design Tokens

The following tokens MUST be added to `tailwind.config.ts` in `dvz-ui` to replicate the Semantic UI visual language:

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        'sui-blue':     '#2185d0',
        'sui-green':    '#21ba45',
        'sui-red':      '#db2828',
        'sui-orange':   '#f2711c',
        'sui-yellow':   '#fbbd08',
        'sui-teal':     '#00b5ad',
        'sui-grey':     'rgba(34,36,38,0.15)',
        'sui-text':     'rgba(0,0,0,0.87)',
        'sui-subtext':  'rgba(0,0,0,0.6)',
      },
      maxWidth: {
        'container': '1200px',
        'text-container': '700px',
      },
      boxShadow: {
        'segment': '0 1px 2px 0 rgba(34,36,38,0.15)',
        'segment-hover': '0 2px 4px 0 rgba(34,36,38,0.12), 0 2px 10px 0 rgba(34,36,38,0.08)',
      },
    },
  },
};
```

### 4.5 Shared Hooks (`src/registry/hooks/`)

These hooks are shared across registry components and MUST be co-located in the registry rather than imported from third-party libraries.

```typescript
// use-isomorphic-layout-effect.ts
// Mirrors SUI's src/lib/hooks/useIsomorphicLayoutEffect.js
// Uses useLayoutEffect in the browser, useEffect on the server (avoids SSR warnings).
import { useEffect, useLayoutEffect } from 'react';
export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

// use-controllable-state.ts
// Replaces SUI's useAutoControlledValue — supports controlled + uncontrolled usage.
// Modelled on the Radix UI useControllableState pattern.
export function useControllableState<T>(options: {
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
}): [T | undefined, (value: T) => void];

// use-composed-refs.ts
// Replaces SUI's useMergedRefs — merges multiple React refs into one callback ref.
export function useComposedRefs<T>(
  ...refs: Array<React.Ref<T> | undefined>
): React.RefCallback<T>;

// use-outside-click.ts
// Replaces SUI's eventStack click-outside handling without global event registries.
// Registers a document mousedown listener in useEffect; cleans up on unmount.
export function useOutsideClick(
  ref: React.RefObject<HTMLElement>,
  handler: (event: MouseEvent) => void,
  enabled?: boolean
): void;

// use-escape-key.ts
// Replaces SUI's eventStack escape handling.
export function useEscapeKey(handler: () => void, enabled?: boolean): void;
```

### 4.6 Custom shadcn Registry Structure

```
packages/dvz-ui/registry/
  registry.json                 # manifest listing all components with "ssr" classification
  hooks/
    use-isomorphic-layout-effect.ts
    use-controllable-state.ts
    use-composed-refs.ts
    use-outside-click.ts
    use-escape-key.ts
  components/
    container.tsx               # SSR: server
    grid.tsx                    # SSR: server
    grid-column.tsx             # SSR: server
    grid-row.tsx                # SSR: server
    segment.tsx                 # SSR: server
    button.tsx                  # SSR: server  (no interactivity in render)
    badge.tsx                   # SSR: server  (replaces Label)
    heading.tsx                 # SSR: server  (replaces Header)
    image.tsx                   # SSR: server
    alert.tsx                   # SSR: server  (replaces Message)
    separator.tsx               # SSR: server  (replaces Divider)
    flag.tsx                    # SSR: server
    input.tsx                   # SSR: server
    textarea.tsx                # SSR: server
    checkbox.tsx                # SSR: client  (Radix Checkbox, uses hooks)
    radio-group.tsx             # SSR: client  (Radix RadioGroup, uses hooks)
    accordion.tsx               # SSR: client  (Radix Accordion, uses hooks)
    dialog.tsx                  # SSR: client  (Radix Dialog + portal)
    tooltip.tsx                 # SSR: client  (Radix Tooltip, uses hooks)
    popover.tsx                 # SSR: client  (Radix Popover, uses hooks)
    menu.tsx                    # SSR: isomorphic (shell: server; scroll listener: client)
    menu-item.tsx               # SSR: server
    spinner.tsx                 # SSR: server  (pure CSS animation)
    dimmer.tsx                  # SSR: server  (visibility driven by prop, no JS portal)
    loading-overlay.tsx         # SSR: server  (Dimmer + Spinner, prop-driven)
    combobox.tsx                # SSR: client  (Radix Popover + Command, uses hooks)
    search-input.tsx            # SSR: client  (Radix Popover + Command, uses hooks)
    icon.tsx                    # SSR: server  (Lucide icon wrapper)
  types/
    col-span.ts                 # ColSpan = 1 | 2 | ... | 16
    combobox-props.ts           # ComboboxProps (replaces DropdownProps)
    icon-names.ts               # SuiIconName union type (mapped to Lucide component names)
    semantic-sizes.ts           # SuiSize = 'mini' | 'tiny' | 'small' | 'medium' | 'large' | ...
```

---

## 5. Acceptance Criteria

- **AC-001**: Given `grep -r "from 'semantic-ui-react'" packages/dvz-ui/src`, then it returns zero results after migration.
- **AC-002**: Given `grep -r "from \"semantic-ui-react\"" packages/dvz-ui/src`, then it returns zero results after migration.
- **AC-003**: Given `pnpm --filter @devgateway/dvz-ui exec tsc --noEmit --strict`, then it exits with code `0` after migration.
- **AC-004**: Given the `Container` replacement rendered with default props, then it produces a block element with `max-width: 1200px` and centred horizontal margins.
- **AC-005**: Given the `Grid` replacement with `columns={4}`, then it renders a 4-column CSS grid that collapses to a single column on mobile when `stackable` is `true`.
- **AC-006**: Given the `Combobox` with `multiple={true}` and `search={true}`, then it renders a multi-select dropdown with a text search input that filters options in real time.
- **AC-007**: Given the `Dialog` component with `open={true}`, then it renders a centred overlay modal with focus trapped inside, matching ARIA `dialog` role requirements.
- **AC-008**: Given the `Tooltip` component rendered over an element, then it appears on hover/focus with appropriate ARIA attributes (`role="tooltip"`, `aria-describedby`).
- **AC-009**: Given the `Accordion` with `exclusive={true}`, then only one panel may be open at a time; clicking an open panel title closes it.
- **AC-010**: Given the `LoadingOverlay` component with `active={true}`, then it renders a dimmed overlay with a centred spinner over its child content.
- **AC-011**: Given `grep -r "semantic-ui-css" packages/dvz-ui/src`, then it returns zero results after migration.
- **AC-012**: Given `grep -r "semantic-ui-react\|semantic-ui-css" packages/dvz-ui/package.json`, then neither package appears in `dependencies` after migration.
- **AC-013**: Given the `Icon` component with any mapped `name` value, then it renders the corresponding Lucide icon at the correct size without referencing the SUI icon font.
- **AC-014**: Given `npx shadcn add <registry-url>/container`, then the `Container` component is installed into the target project without errors.
- **AC-015**: Given the visual regression test suite runs against the migrated `dvz-ui` build, then no component differs from its SUI equivalent by more than an acceptable visual threshold.
- **AC-016**: Given `grep -rn "class .* extends.*Component\|class .* extends React.Component\|class .* extends PureComponent" packages/dvz-ui/registry`, then it returns zero results (no class components in the registry).
- **AC-017**: Given `grep -rn "PropTypes\|prop-types" packages/dvz-ui/registry`, then it returns zero results (no PropTypes in the registry).
- **AC-018**: Given `grep -rn "\[key: string\]: any" packages/dvz-ui/registry`, then it returns zero results (no untyped index signatures).
- **AC-019**: Given `grep -rn "from 'lodash'" packages/dvz-ui/registry`, then it returns zero results (no Lodash usage).
- **AC-020**: Given the `Combobox` is used with only `defaultValue` (uncontrolled), then it manages its own open/selected state internally without requiring the consumer to provide `value` or `onChange`.
- **AC-021**: Given the `Combobox` is used with `value` and `onChange` (controlled), then it does not manage internal state and reflects only the consumer-provided `value`.
- **AC-022**: Given any registry component with a forwarded `ref`, then the ref resolves to a specific typed DOM element (e.g., `HTMLButtonElement` for `Button`, `HTMLDivElement` for `Container`) and not the generic `HTMLElement`.
- **AC-023**: Given `renderToString(<Container><p>hello</p></Container>)` is called in a Node.js environment, then it produces valid HTML without throwing errors (server renderability of all `SSR: server` components).
- **AC-024**: Given a `'use client'` registry component (e.g., `Dialog`) is imported into a Next.js RSC, then it is treated as a client component boundary and its children can still be RSC content passed as props.

---

## 6. Test Automation Strategy

- **Test Levels**:
  - **Unit**: Each replacement component renders with required and optional props without errors (Vitest + React Testing Library).
  - **Unit**: Variant classes are applied correctly — assert className output for each `cva` variant combination.
  - **Accessibility**: Each interactive component meets WCAG 2.1 AA via `@axe-core/react` or `vitest-axe`.
  - **Visual Regression**: Storybook stories for each replacement component with Chromatic or Percy snapshot comparisons against reference SUI screenshots.
  - **Integration**: The migrated `dvz-ui` build compiles (`pnpm build`) and TypeScript reports zero errors.

- **Frameworks**:
  - Unit / component testing: **Vitest** + `@testing-library/react`.
  - Accessibility testing: `@axe-core/react` / `vitest-axe`.
  - Visual regression: **Storybook** with snapshot comparison.

- **Test Data Management**: Storybook stories serve as both documentation and regression baselines. One story per component variant.

- **CI/CD Integration**: Run `pnpm --filter @devgateway/dvz-ui test` and `pnpm --filter @devgateway/dvz-ui build` in GitHub Actions on every PR. Visual regression runs as a separate CI job triggered on PRs affecting `packages/dvz-ui/`.

- **Coverage Requirements**: 100% of replacement components MUST have at least one Storybook story. Unit test coverage for `registry/components/` must reach 80% line coverage.

- **Performance Testing**: Bundle size of `dvz-ui` MUST NOT increase after migration. Measure with `rollup-plugin-visualizer` before and after; removal of `semantic-ui-css` (~270 KB) should reduce the CSS bundle significantly.

---

## 7. Rationale & Context

### Why Semantic UI React Must Be Replaced

- `semantic-ui-react` has had no meaningful release since 2022 and is officially unmaintained.
- Its underlying `semantic-ui-css` stylesheet (Fomantic UI fork) is incompatible with Tailwind CSS's utility-first approach — both style systems conflict in specificity.
- SUI ships its own icon font (`icons.woff2`), adding ~130 KB of network weight for icons alone.
- SUI's TypeScript support is incomplete — many component props default to `any`.
- SUI has no Radix UI-based accessibility primitives; its keyboard navigation is partially broken in modern React.

### Why shadcn/ui + Tailwind CSS

- shadcn/ui components are owned by the consuming project — they are not a versioned package dependency that can go unmaintained.
- Tailwind CSS is already a dependency of `dvz-ui`.
- Radix UI primitives provide battle-tested accessibility (ARIA, focus management, keyboard navigation) without coupling visual style.
- `class-variance-authority` provides type-safe variant management, replacing SUI's CSS class composition.
- The custom registry pattern allows all projects in the DevGateway ecosystem to share the same design system components via `npx shadcn add`.

### Migration Order

Components should be migrated in the following order to minimise risk:

1. **Trivial layout wrappers** (no interactivity): `Container`, `Segment`, `Grid`, `GridColumn`, `GridRow`, `Separator`, `Image`, `Heading`, `Flag` — these are pure HTML + Tailwind with no state.
2. **Simple interactive leaf components**: `Button`, `Badge`, `Input`, `Textarea`, `Checkbox`, `RadioGroup`, `Alert`, `Spinner`, `Dimmer`.
3. **Mid-complexity components**: `Accordion`, `Menu`, `Tooltip`, `Popover`.
4. **High-complexity components**: `Dialog` (Modal), `SearchInput`, `Combobox` (Dropdown with multi-select, search, checkbox/radio modes).

### SemanticWIDTHS Replacement

`SemanticWIDTHS` is imported as a type only (not a runtime value) in 3 files: `filtered-posts/index.tsx`, `pagegallery/index.tsx`, `references/ReferencesList.tsx`. Replacing it with a local `ColSpan` type is a non-breaking one-line change per file.

---

## 8. Dependencies & External Integrations

### Technology Platform Dependencies

- **PLT-001**: Tailwind CSS — already a dependency of `dvz-ui`. The `tailwind.config.ts` MUST be extended with the DVZ design tokens defined in Section 4.4.
- **PLT-002**: Radix UI primitives — headless accessible components for interactive elements. Individual `@radix-ui/react-*` packages are added per component. Also requires `@radix-ui/react-slot` for the `asChild` polymorphic pattern.
- **PLT-003**: `lucide-react` — icon library replacing the SUI icon font.
- **PLT-004**: `class-variance-authority` — type-safe variant composition for component styling. Replaces SUI's procedural `classNameBuilders.js`.
- **PLT-005**: `clsx` — className merging utility (likely already present).
- **PLT-006**: `tailwind-merge` (`twMerge`) — resolves Tailwind class conflicts in the `cn` utility.
- **PLT-007**: `@floating-ui/react` — modern Popper.js successor for floating element positioning. Replaces SUI's Popper.js dependency for any custom positioning outside Radix UI primitives.
- **PLT-008**: `cmdk` — command palette / combobox primitive used by shadcn/ui for the `Combobox` and `SearchInput` components. Replaces SUI's hand-rolled dropdown search logic.
- **PLT-009**: React 18+ — required for `useId`, `useTransition`, `startTransition` and concurrent features used by Radix UI internally.

### Removed Dependencies (post-migration)

- `semantic-ui-react` — removed from `dependencies`.
- `semantic-ui-css` — removed from `dependencies`.

---

## 9. Examples & Edge Cases

```tsx
// ── Container ─────────────────────────────────────────────────────────────
// SUI (old — class-based CSS composition, untyped `as` prop):
import { Container } from 'semantic-ui-react';
<Container text>...</Container>

// Replacement (functional, typed, Tailwind, forwardRef, named export):
// container.tsx — SSR: server (no 'use client')
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const containerVariants = cva('mx-auto w-full px-4', {
  variants: {
    size: {
      default: 'max-w-[1200px]',
      text:    'max-w-[700px]',
      fluid:   'max-w-none',
    },
  },
  defaultVariants: { size: 'default' },
});

interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  text?: boolean;
  fluid?: boolean;
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, text, fluid, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(containerVariants({ size: fluid ? 'fluid' : text ? 'text' : 'default' }), className)}
      {...props}
    >
      {children}
    </div>
  ),
);
Container.displayName = 'Container';

// ── useControllableState — replaces SUI's useAutoControlledValue ────────────
// SUI's pattern (old — opaque, class-based auto-controlled state):
// getAutoControlledStateFromProps(nextProps, computedState, prevState) { ... }

// Replacement: explicit hook, works for Accordion, Combobox, Dialog, SearchInput
// use-controllable-state.ts
export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: {
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
}): [T | undefined, (next: T) => void] {
  const [uncontrolled, setUncontrolled] = React.useState<T | undefined>(defaultValue);
  const isControlled = value !== undefined;
  const state = isControlled ? value : uncontrolled;

  const setState = React.useCallback(
    (next: T) => {
      if (!isControlled) setUncontrolled(next);
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  return [state, setState];
}

// ── Accordion — replaces SUI class component with functional + Radix ─────────
// SUI (old — class component, PropTypes, eventStack, manual index tracking):
// class AccordionPanel extends Component { onClick: (e, titleProps) => ... }

// Replacement: functional, Radix primitive, useControllableState, CVA:
// accordion.tsx — SSR: client (Radix uses hooks)
'use client';
import * as RadixAccordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';

interface AccordionProps {
  type?: 'single' | 'multiple';
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  collapsible?: boolean;  // allows closing the active item (SUI exclusive=true equivalent)
  className?: string;
  children: React.ReactNode;
}

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ type = 'single', collapsible = true, className, children, ...props }, ref) => (
    <RadixAccordion.Root
      ref={ref}
      type={type as 'single'}  // narrowed per Radix API
      collapsible={collapsible}
      className={cn('w-full', className)}
      {...props}
    >
      {children}
    </RadixAccordion.Root>
  ),
);
Accordion.displayName = 'Accordion';

export const AccordionItem = React.forwardRef<HTMLDivElement, RadixAccordion.AccordionItemProps>(
  ({ className, ...props }, ref) => (
    <RadixAccordion.Item ref={ref} className={cn('border-b border-sui-grey', className)} {...props} />
  ),
);
AccordionItem.displayName = 'AccordionItem';

export const AccordionTrigger = React.forwardRef<HTMLButtonElement, React.HTMLAttributes<HTMLButtonElement>>(
  ({ className, children, ...props }, ref) => (
    <RadixAccordion.Header className="flex">
      <RadixAccordion.Trigger
        ref={ref}
        className={cn(
          'flex flex-1 items-center justify-between py-3 font-medium',
          'text-sui-text transition-all hover:text-sui-blue',
          '[&[data-state=open]>svg]:rotate-180',
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
      </RadixAccordion.Trigger>
    </RadixAccordion.Header>
  ),
);
AccordionTrigger.displayName = 'AccordionTrigger';

// ── Button — no class component, no PropTypes, typed polymorphic via asChild ──
// SUI (old): as?: any  — completely untyped polymorphic element
// Replacement: asChild via Radix Slot for type-safe polymorphism
// button.tsx — SSR: server
import { Slot } from '@radix-ui/react-slot';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sui-blue disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:  'bg-sui-blue text-white hover:bg-blue-700',
        secondary:'bg-gray-100 text-sui-text hover:bg-gray-200',
        positive: 'bg-sui-green text-white hover:bg-green-700',
        negative: 'bg-sui-red text-white hover:bg-red-700',
        basic:    'border border-sui-grey bg-white text-sui-text hover:bg-gray-50',
      },
      size: {
        mini:    'h-6 px-2 text-xs',
        small:   'h-7 px-3 text-sm',
        medium:  'h-9 px-4 text-sm',
        large:   'h-11 px-6 text-base',
        massive: 'h-14 px-8 text-lg',
      },
    },
    defaultVariants: { variant: 'secondary', size: 'medium' },
  },
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;  // renders children as root element (Radix Slot pattern)
  loading?: boolean;
  fluid?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, loading, fluid, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), fluid && 'w-full', className)}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading ? <Spinner size="small" className="mr-2" /> : null}
        {children}
      </Comp>
    );
  },
);
Button.displayName = 'Button';

// ── Combobox — replaces SUI's 900-line class-based Dropdown ──────────────────
// SUI Dropdown (old): class DropdownInner extends Component, getAutoControlledStateFromProps,
//   shouldComponentUpdate, componentDidUpdate, eventStack, lodash, manual DOM measurement.

// Replacement: functional, Radix Popover + cmdk Command, useControllableState:
// combobox.tsx — SSR: client
'use client';
import * as Popover from '@radix-ui/react-popover';
import { Command } from 'cmdk';  // or @/registry/components/command

export const Combobox = React.forwardRef<HTMLButtonElement, ComboboxProps>(
  ({ options, value, defaultValue, onChange, multiple, search, placeholder, disabled }, ref) => {
    const [open, setOpen] = React.useState(false);
    const [selected, setSelected] = useControllableState({ value, defaultValue, onChange });

    return (
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger ref={ref} disabled={disabled} asChild>
          <Button variant="basic" className="w-full justify-between" aria-expanded={open}>
            {/* render selected label(s) or placeholder */}
          </Button>
        </Popover.Trigger>
        <Popover.Content align="start" className="w-[var(--radix-popover-trigger-width)] p-0">
          <Command>
            {search && <Command.Input placeholder="Search..." />}
            <Command.List>
              {options.map((option) => (
                <Command.Item key={option.key} value={String(option.value)} onSelect={...}>
                  {option.text}
                </Command.Item>
              ))}
            </Command.List>
          </Command>
        </Popover.Content>
      </Popover.Root>
    );
  },
);
Combobox.displayName = 'Combobox';

// ── Edge case: useComposedRefs replaces SUI's useMergedRefs ─────────────────
// When a component needs to forward a ref AND use it internally:
const inputRef = React.useRef<HTMLInputElement>(null);
const composedRef = useComposedRefs(ref, inputRef); // both refs are set
<input ref={composedRef} />;

// ── Edge case: useIsomorphicLayoutEffect for menu scroll shadow ─────────────
// menu.tsx — SSR: isomorphic (shadow logic client-only, but shell is server-safe)
import { useIsomorphicLayoutEffect } from '@/registry/hooks/use-isomorphic-layout-effect';

const [scrolled, setScrolled] = React.useState(false);
useIsomorphicLayoutEffect(() => {
  const handler = () => setScrolled(window.scrollY > 0);
  window.addEventListener('scroll', handler, { passive: true });
  return () => window.removeEventListener('scroll', handler);
}, []);
// scrolled drives a shadow class — initial SSR render has scrolled=false (no shadow), correct.
```

---

## 10. Validation Criteria

- **VAL-001**: `grep -rn "semantic-ui-react\|semantic-ui-css" packages/dvz-ui/src` returns zero results.
- **VAL-002**: `grep -rn "semantic-ui-react\|semantic-ui-css" packages/dvz-ui/package.json` returns zero results.
- **VAL-003**: `pnpm --filter @devgateway/dvz-ui build` succeeds with zero TypeScript errors.
- **VAL-004**: `pnpm --filter @devgateway/dvz-ui test` — all unit and accessibility tests pass.
- **VAL-005**: CSS bundle size is reduced by at least 200 KB (removal of `semantic-ui-css`).
- **VAL-006**: JS bundle size does not increase by more than 30 KB (replacement component implementations).
- **VAL-007**: Storybook builds successfully for all components in `registry/components/`.
- **VAL-008**: Visual regression snapshots for all replacement components are approved in CI.
- **VAL-009**: `npx shadcn add <registry-url>/combobox` installs the component successfully into a blank Vite + React + Tailwind project.
- **VAL-010**: All interactive replacement components pass `@axe-core/react` accessibility checks with zero violations.
- **VAL-011**: `grep -rn "class .* extends.*Component" packages/dvz-ui/registry` returns zero results.
- **VAL-012**: `grep -rn "PropTypes\|\[key: string\]: any\|from 'lodash'" packages/dvz-ui/registry` returns zero results.
- **VAL-013**: Every component in `registry/components/` is exported as a named export (verified by TypeScript export analysis or `grep -rn "^export default" packages/dvz-ui/registry/components` returning zero results).
- **VAL-014**: Every `SSR: server` component passes `renderToString(<Component />)` in a Node.js test without throwing.
- **VAL-015**: Every `SSR: client` component file contains `'use client'` as its first non-comment line (verified by grep or lint rule).
- **VAL-016**: `registry.json` contains an `"ssr"` classification field for every registered component with a value of `"server"`, `"client"`, or `"isomorphic"`.

---

## 11. Related Specifications / Further Reading

- [spec-tool-wp-react-lib-typed-api.md](./spec-tool-wp-react-lib-typed-api.md) — WP API layer migration spec (wp-react-lib)
- [Semantic UI React Component Docs](https://react.semantic-ui.com/)
- [shadcn/ui Registry Docs](https://ui.shadcn.com/docs/registry)
- [shadcn/ui Component Source](https://ui.shadcn.com/docs/components)
- [Radix UI Primitives](https://www.radix-ui.com/primitives)
- [Lucide React Icons](https://lucide.dev/icons/)
- [class-variance-authority](https://cva.style/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [WCAG 2.1 AA Accessibility Guidelines](https://www.w3.org/TR/WCAG21/)
