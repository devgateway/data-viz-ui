import React from 'react'

export interface Theme {
  id: string
  title: string
  description: string
  countries?: number
  datasets?: number
  active: boolean
  url?: string
}

export interface ThemeCardProps {
  theme: Theme
  onSelect?: (id: string) => void
}

const ThemeCard = (props: ThemeCardProps) => {
  const { id, title, description, countries, datasets, active, url } = props.theme

  if (!active) {
    return (
      <div
        className="border border-border rounded p-4 opacity-50 bg-muted cursor-default h-full flex flex-col"
        aria-label={`${title} — coming soon`}
      >
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-sm font-semibold text-foreground leading-tight">{title}</h3>
          <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground bg-white border border-border px-2 py-0.5 rounded-full">Coming soon</span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
      </div>
    )
  }

  const className = "group text-left border border-border rounded p-4 hover:border-primary hover:shadow-sm transition-all focus-visible:outline-2 focus-visible:outline-primary bg-white h-full flex flex-col"
  const onClick = () => props.onSelect?.(id)
  const content = (
    <>
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="text-sm font-semibold text-foreground leading-tight group-hover:text-primary transition-colors">{title}</h3>
        <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wide text-white bg-accent px-2 py-0.5 rounded-full">Active</span>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed mb-3">{description}</p>
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span>{countries} countries</span>
        <span>·</span>
        <span>{datasets} datasets</span>
      </div>
    </>
  )

  // A plain anchor, not a router <Link>, so the card still works when mounted
  // without any Router context (e.g. via the WordPress EmbeddedGateway).
  return url ? (
    <a href={url} onClick={onClick} className={className}>{content}</a>
  ) : (
    <button onClick={onClick} className={className}>{content}</button>
  )
}

export default ThemeCard
