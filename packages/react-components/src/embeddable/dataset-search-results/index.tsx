"use client"
import React, { useState, useEffect } from 'react'
import { skipToken } from '@reduxjs/toolkit/query/react'
import { useSearchDatasetsQuery } from '../shared/api'
import EmbeddableProvider from '../shared/EmbeddableProvider'
import { FILTER_CHANGE_EVENT } from '../shared/filterParams'
import { SEARCH_CHANGE_EVENT } from '../search-box'
import type { DatasetSearchItem } from '../shared/types'

let _wpSettingsCache: Record<string, string> | null = null
let _wpSettingsInflight: Promise<Record<string, string>> | null = null

function fetchWpSettings(): Promise<Record<string, string>> {
  if (_wpSettingsCache) return Promise.resolve(_wpSettingsCache)
  if (_wpSettingsInflight) return _wpSettingsInflight
  _wpSettingsInflight = fetch('/wp-json/dg/v1/settings')
    .then((r) => r.json())
    .then((data) => { _wpSettingsCache = data; return data })
    .catch(() => { _wpSettingsInflight = null; return {} })
  return _wpSettingsInflight
}

function useRepositoryUrl(propsApiUrl?: string): string {
  const [url, setUrl] = useState(() => propsApiUrl ?? _wpSettingsCache?.dataset_repository_url ?? '')
  useEffect(() => {
    if (propsApiUrl) { setUrl(propsApiUrl); return }
    if (_wpSettingsCache?.dataset_repository_url) { setUrl(_wpSettingsCache.dataset_repository_url); return }
    if (typeof window === 'undefined') return
    fetchWpSettings().then((data) => {
      if (data?.dataset_repository_url) setUrl(data.dataset_repository_url)
    })
  }, [propsApiUrl])
  return url
}

// Deterministic color assignment by hashing the type string
const BADGE_PALETTES = [
  'bg-blue-50 text-blue-800 border-blue-200',
  'bg-purple-50 text-purple-800 border-purple-200',
  'bg-orange-50 text-orange-800 border-orange-200',
  'bg-yellow-50 text-yellow-800 border-yellow-200',
  'bg-gray-100 text-gray-700 border-gray-200',
  'bg-green-50 text-green-800 border-green-200',
  'bg-red-50 text-red-800 border-red-200',
  'bg-pink-50 text-pink-800 border-pink-200',
  'bg-teal-50 text-teal-800 border-teal-200',
]

function hashString(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0
  return Math.abs(h)
}

function TypeBadge({ type }: { type: string }) {
  const cls = BADGE_PALETTES[hashString(type) % BADGE_PALETTES.length]
  return (
    <span className={`text-[10px] font-medium border rounded px-1.5 py-0.5 whitespace-nowrap ${cls}`}>
      {type}
    </span>
  )
}

function formatPeriod(item: DatasetSearchItem): string {
  const d = item.periodStart ?? item.createdAt
  if (!d) return ''
  return new Date(d).getFullYear().toString()
}

function readSearchParams(limit: number): string {
  if (typeof window === 'undefined') return `size=${limit}`
  const params = new URLSearchParams(window.location.search)
  params.set('size', String(limit))
  return params.toString()
}

function navigatePage(delta: number): void {
  const params = new URLSearchParams(window.location.search)
  const current = parseInt(params.get('page') ?? '0', 10)
  const next = Math.max(0, current + delta)
  if (next === 0) params.delete('page')
  else params.set('page', String(next))
  const qs = params.toString()
  window.history.pushState({}, '', `${window.location.pathname}${qs ? '?' + qs : ''}`)
  window.dispatchEvent(new CustomEvent(SEARCH_CHANGE_EVENT))
}

export interface DatasetSearchResultsProps {
  apiUrl?: string
  limit?: string | number
  'data-api-url'?: string
  'data-limit'?: string
  [key: string]: unknown
}

function DatasetSearchResultsInner(props: DatasetSearchResultsProps) {
  const rawApiUrl = (props['data-api-url'] as string) ?? props.apiUrl
  const apiUrl = useRepositoryUrl(rawApiUrl || undefined)
  const limit = parseInt(String((props['data-limit'] as string) ?? props.limit ?? '20'), 10)

  const [searchParams, setSearchParams] = useState(() => readSearchParams(limit))

  useEffect(() => {
    const sync = () => setSearchParams(readSearchParams(limit))
    window.addEventListener(SEARCH_CHANGE_EVENT, sync)
    window.addEventListener(FILTER_CHANGE_EVENT, sync)
    window.addEventListener('popstate', sync)
    return () => {
      window.removeEventListener(SEARCH_CHANGE_EVENT, sync)
      window.removeEventListener(FILTER_CHANGE_EVENT, sync)
      window.removeEventListener('popstate', sync)
    }
  }, [limit])

  const { data, isFetching } = useSearchDatasetsQuery(
    apiUrl ? { baseUrl: apiUrl, params: searchParams } : skipToken
  )

  const items = data?.items ?? []
  const totalElements = data?.totalElements ?? 0
  const page = data?.page ?? 0
  const size = data?.size ?? limit
  const totalPages = Math.ceil(totalElements / size)

  const query = typeof window !== 'undefined'
    ? (new URLSearchParams(window.location.search).get('q') ?? '')
    : ''

  return (
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-muted-foreground">
          {isFetching ? (
            <span>Loading…</span>
          ) : (
            <>
              {totalElements} {totalElements === 1 ? 'result' : 'results'}
              {query && (
                <span> for "<strong className="text-foreground">{query}</strong>"</span>
              )}
            </>
          )}
        </p>
      </div>

      {!isFetching && items.length === 0 ? (
        <div className="border border-border rounded p-10 text-center">
          <p className="text-sm font-medium text-foreground mb-2">No results found</p>
          <p className="text-sm text-muted-foreground">
            {query
              ? `No resources match "${query}".`
              : 'No resources match the selected filters.'}
          </p>
        </div>
      ) : (
        <div className="border border-border rounded divide-y divide-border">
          {items.map((item) => (
            <div
                key={item.id}
                className="px-4 py-3.5 hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => { window.location.href = `/datasets/${item.id}` }}
              >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex items-center gap-1.5 shrink-0 flex-wrap">
                  {item.resourceTypes.map((rt) => (
                    <TypeBadge key={rt.id} type={rt.value} />
                  ))}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <p className="text-sm font-medium text-foreground leading-snug">{item.name}</p>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs font-mono text-muted-foreground">{formatPeriod(item)}</span>
                      {item.formats.map((f) => (
                        <span key={f} className="text-[10px] font-mono text-muted-foreground border border-border rounded px-1.5 py-0.5 bg-white">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    {item.themes.map((t, i) => (
                      <React.Fragment key={t.id}>
                        {i > 0 && <span className="text-[10px] text-muted-foreground">·</span>}
                        <span className="text-[10px] text-muted-foreground">{t.value}</span>
                      </React.Fragment>
                    ))}
                    {item.countries.length > 0 && (
                      <>
                        {item.themes.length > 0 && <span className="text-[10px] text-muted-foreground">·</span>}
                        <span className="text-[10px] text-muted-foreground">
                          {item.countries.map((c) => c.value).join(', ')}
                        </span>
                      </>
                    )}
                    {item.languages.length > 0 && (
                      <>
                        <span className="text-[10px] text-muted-foreground">·</span>
                        <span className="text-[10px] text-muted-foreground">
                          {item.languages.map((l) => l.value).join(', ')}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <button
            disabled={page === 0}
            onClick={() => navigatePage(-1)}
            className="text-xs text-primary disabled:text-muted-foreground disabled:cursor-not-allowed"
          >
            ← Previous
          </button>
          <span className="text-xs text-muted-foreground">
            Page {page + 1} of {totalPages}
          </span>
          <button
            disabled={page >= totalPages - 1}
            onClick={() => navigatePage(1)}
            className="text-xs text-primary disabled:text-muted-foreground disabled:cursor-not-allowed"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  )
}

const DatasetSearchResults = (props: DatasetSearchResultsProps) => (
  <EmbeddableProvider>
    <DatasetSearchResultsInner {...props} />
  </EmbeddableProvider>
)

export default DatasetSearchResults
