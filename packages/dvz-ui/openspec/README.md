# ⚠️ Specs have moved

Component specifications have been migrated to a dedicated repository:

**`alive-dataviz-specs`** — located at `/Volumes/External/projects/alive/alive-dataviz-specs`

## What moved

| Old path (here) | New path (alive-dataviz-specs) |
|---|---|
| `changes/big-number-trend/` | `components/big-number-trend/` |
| `changes/big-number-trend-percent-number-format/` | Merged into `components/big-number-trend/` (v1.1) |
| `changes/chart-component/` | `components/chart/` |
| `changes/filter/` | `components/filter/` |

## Why

The React embeddable components and WordPress blocks are tightly coupled — a single component has code in both `data-viz-ui` and `data-viz-wordpress`. Keeping specs in only one of those repos created confusion about where specs for WP-specific behaviour belonged. The dedicated specs repo covers both layers per component.

## Do not add new specs here

Add all new specifications to the `alive-dataviz-specs` repository. See its `CONTRIBUTING.md` for the spec format and folder structure.
