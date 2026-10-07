import React, { useRef, useEffect, Suspense, useState } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { components } from '../index'
import { FILTER_CHANGE_EVENT, hasActiveFilters, clearAllFilters } from '../shared/filterParams'

export interface SearchFiltersProps {
  title?: string
  clearAllLabel?: string
  children?: React.ReactNode
  childContent?: string
  'data-title'?: string
  'data-clear-all-label'?: string
  [key: string]: unknown
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function SearchFilters(props: SearchFiltersProps) {
  const title = (props['data-title'] as string) ?? props.title ?? 'Filters'
  const clearAllLabel = (props['data-clear-all-label'] as string) ?? props.clearAllLabel ?? 'Clear all'
  const childContent = (props.childContent as string) ?? ''

  const [showClear, setShowClear] = useState(() => hasActiveFilters())
  const [open, setOpen] = useState(false)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sync = () => setShowClear(hasActiveFilters())
    window.addEventListener(FILTER_CHANGE_EVENT, sync)
    window.addEventListener('popstate', sync)
    return () => {
      window.removeEventListener(FILTER_CHANGE_EVENT, sync)
      window.removeEventListener('popstate', sync)
    }
  }, [])

  useEffect(() => {
    if (!innerRef.current) return

    const roots: Root[] = []
    const replacements: Array<{ container: HTMLElement; original: HTMLElement }> = []

    innerRef.current.querySelectorAll<HTMLElement>('.viz-component').forEach((element) => {
      const componentName = element.getAttribute('data-component')
      if (!componentName) return
      const Component = components[componentName]
      if (!Component) return

      const container = document.createElement('div')
      element.getAttributeNames().forEach((name) => {
        if (name !== 'data-component') container.setAttribute(name, element.getAttribute(name)!)
      })
      element.replaceWith(container)
      replacements.push({ container, original: element })

      const elementProps: Record<string, string> = {}
      Array.from(element.attributes).forEach((attr) => {
        if (attr.name !== 'data-component') elementProps[attr.name] = attr.value
      })

      const root = createRoot(container)
      roots.push(root)
      root.render(
        <Suspense fallback={null}>
          <Component {...elementProps} />
        </Suspense>
      )
    })

    return () => {
      roots.forEach((root) => root.unmount())
      replacements.forEach(({ container, original }) => container.replaceWith(original))
    }
  }, [childContent])

  return (
    <aside className="w-full">
      {/* Header row — always visible */}
      <div className="flex items-center justify-between py-2 md:py-0 md:mb-3 border-b border-border md:border-none">
        <p className="text-xs font-semibold text-foreground uppercase tracking-wide">{title}</p>
        <div className="flex items-center gap-3">
          {showClear && (
            <button
              onClick={clearAllFilters}
              className="text-xs text-primary hover:text-primary/80 transition-colors"
            >
              {clearAllLabel}
            </button>
          )}
          {/* Mobile-only toggle */}
          <button
            className="md:hidden p-1 -mr-1 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? 'Hide filters' : 'Show filters'}
          >
            <ChevronIcon open={open} />
          </button>
        </div>
      </div>

      {/* Filter list — toggleable on mobile, always visible on md+ */}
      <div className={`pt-3 ${open ? 'block' : 'hidden'} md:block`}>
        {childContent ? (
          <div ref={innerRef} dangerouslySetInnerHTML={{ __html: childContent }} />
        ) : (
          <div ref={innerRef}>{props.children}</div>
        )}
      </div>
    </aside>
  )
}

export default SearchFilters
