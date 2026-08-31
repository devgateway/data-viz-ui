---
"@devgateway/dvz-ui-react": patch
---

## Fix map by making positioning device-invariant and fix label zoom scaling

  - Fix mobile/tablet map centering: the SVG viewBox was still sized from
    the live DOM container width plus a per-device padding, so a saved
    data-map-position crop (captured against the desktop-sized viewBox)
    replayed off-frame on narrower viewports. viewBox now uses the same
    fixed width/height props as the projection's translate, with
  - Add missing width:100%/height:100% CSS on the map svg; without it the
    svg sized itself from the viewBox's own aspect ratio independent of
    its wrapper's height, overflowing (clipped by overflow:hidden) on
    wide screens and underfilling on mobile.
  - Remove the now-redundant DOM-measurement code (getWidth() ref/
    offsetWidth branch, deviceMapWidth) and a mobile-only +100px nudge on
    POINTS_MAP crops that was patching the same root-cause bug.
  - Raise the default admin-unit label font size from 12px to 14px.
  - Fix `resizeLabels()` zoom handler: computed newSize was being ignored
    in favor of the raw labelFontSize prop, so labels never actually
    resized on zoom. On mobile/tablet, hold the boosted label size fixed
    instead of dividing by zoom scale, so it no longer shrinks back down
    as soon as the user zooms in.
