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

function SearchFilters(props: SearchFiltersProps) {
  const title = (props['data-title'] as string) ?? props.title ?? 'Filters'
  const clearAllLabel = (props['data-clear-all-label'] as string) ?? props.clearAllLabel ?? 'Clear all'
  const childContent = (props.childContent as string) ?? ''

  const [showClear, setShowClear] = useState(() => hasActiveFilters())
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
    <aside className="w-48 shrink-0">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold text-foreground uppercase tracking-wide">{title}</p>
        {showClear && (
          <button onClick={clearAllFilters} className="text-xs text-primary hover:text-primary-dark">
            {clearAllLabel}
          </button>
        )}
      </div>
      {childContent ? (
        <div ref={innerRef} dangerouslySetInnerHTML={{ __html: childContent }} />
      ) : (
        <div ref={innerRef}>{props.children}</div>
      )}
    </aside>
  )
}

export default SearchFilters
