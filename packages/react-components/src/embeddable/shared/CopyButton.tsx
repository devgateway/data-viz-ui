import React from 'react'

export interface CopyButtonProps {
  text: string
  label?: string
  className?: string
}

const DEFAULT_LABEL = 'Copy'

// No client hydration exists in this pipeline (renderToStaticMarkup only),
// so this ships its own tiny inline script instead of a React onClick handler
// (which renderToStaticMarkup silently drops). `previousElementSibling` scopes
// the listener to this exact button with no ids, so multiple instances on one
// page never collide. This works because the HTML is part of the page's
// initial server response (see renderEmbeddablesServerSide), not injected via
// innerHTML after mount - scripts in the initial parse execute normally.
const COPY_SCRIPT = `(function () {
  var btn = document.currentScript.previousElementSibling;
  if (!btn) { return; }
  btn.addEventListener('click', function () {
    navigator.clipboard.writeText(btn.getAttribute('data-copy-text')).then(function () {
      var original = btn.textContent;
      btn.textContent = '✓ Copied';
      setTimeout(function () { btn.textContent = original; }, 2000);
    });
  });
})();`

const CopyButton = ({ text, label = DEFAULT_LABEL, className }: CopyButtonProps) => {
  return (
    <>
      <button type="button" className={className} data-copy-text={text}>
        {label}
      </button>
      <script dangerouslySetInnerHTML={{ __html: COPY_SCRIPT }} />
    </>
  )
}

export default CopyButton
