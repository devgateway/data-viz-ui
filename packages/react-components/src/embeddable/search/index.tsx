import React from 'react'
import { Form, useInRouterContext } from 'react-router'

export type SearchWidth = 'sm' | 'normal' | 'lg'

export interface SearchProps {
  editing?: boolean
  'data-placeholder'?: string
  'data-button-color'?: string
  'data-width'?: SearchWidth
  'data-redirect-url'?: string
  [key: string]: unknown
}

const WIDTH_CLASSES: Record<SearchWidth, string> = {
  sm: 'max-w-sm',
  normal: 'max-w-lg',
  lg: 'max-w-2xl',
}

const DEFAULT_PLACEHOLDER = 'Search datasets, questionnaires, reports'
const DEFAULT_BUTTON_COLOR = '#fdb714'

const Search = (props: SearchProps) => {
  const {
    "data-placeholder" : placeholder = DEFAULT_PLACEHOLDER,
    "data-button-color" : buttonColor = DEFAULT_BUTTON_COLOR,
    "data-width" : width = 'normal',
    "data-redirect-url" : redirectUrl = '',
  } = props;

  const editing = props.editing ?? false
  // Use React Router's <Form> when inside a router (client-side navigation);
  // fall back to a plain <form> when mounted in an isolated root (e.g.
  // EmbeddedGateway's createRoot) that has no router context.
  const inRouter = useInRouterContext()
  const FormTag = inRouter ? Form : 'form'

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (editing || !redirectUrl) {
      e.preventDefault()
    }
  }

  return (
    <FormTag method="get" action={redirectUrl} onSubmit={handleSubmit} className={`flex gap-2 ${WIDTH_CLASSES[width]}`}>
      <div className="relative flex-1">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.4" />
          <line x1="10.5" y1="10.5" x2="14" y2="14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        <input
          type="search"
          name="q"
          placeholder={placeholder}
          className="w-full pl-9 pr-4 py-2.5 text-sm border-0 rounded focus:outline-none focus:ring-2 focus:ring-white/50 bg-white text-foreground placeholder:text-muted-foreground"
        />
      </div>
      <button
        type="submit"
        style={{ backgroundColor: buttonColor }}
        className="px-5 py-2.5 text-foreground text-sm font-semibold rounded hover:brightness-95 transition-[filter] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        Search
      </button>
    </FormTag>
  )
}

export default Search
