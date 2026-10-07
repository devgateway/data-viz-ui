"use client"
import React, { useState, useEffect } from 'react'
import { skipToken } from '@reduxjs/toolkit/query/react'
import { useSearchDatasetsQuery } from '../shared/api'
import EmbeddableProvider from '../shared/EmbeddableProvider'
import { FILTER_CHANGE_EVENT } from '../shared/filterParams'
import { SEARCH_CHANGE_EVENT } from '../search-box'
import { useWpSettings } from '../shared/useWpSettings'
import type { DatasetSearchItem } from '../shared/types'

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

const PAGE_SIZE_OPTIONS = [10, 20, 50, 100]

function readSearchParams(defaultSize: number): string {
  if (typeof window === 'undefined') return `size=${defaultSize}`
  const params = new URLSearchParams(window.location.search)
  if (!params.has('size')) params.set('size', String(defaultSize))
  return params.toString()
}

function goToPage(pageIndex: number): void {
  const params = new URLSearchParams(window.location.search)
  if (pageIndex === 0) params.delete('page')
  else params.set('page', String(pageIndex))
  const qs = params.toString()
  window.history.pushState({}, '', `${window.location.pathname}${qs ? '?' + qs : ''}`)
  window.dispatchEvent(new CustomEvent(SEARCH_CHANGE_EVENT))
}

// Returns 1-indexed page numbers and '…' placeholders for gaps
function buildPageWindows(current: number, total: number): (number | '…')[] {
  const s = new Set<number>()
  s.add(1)
  if (total >= 2) s.add(2)
  if (current > 1) s.add(current - 1)
  s.add(current)
  if (current < total) s.add(current + 1)
  if (total >= 2) s.add(total - 1)
  s.add(total)

  const sorted = Array.from(s).filter((p) => p >= 1 && p <= total).sort((a, b) => a - b)
  const result: (number | '…')[] = []
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) result.push('…')
    result.push(sorted[i])
  }
  return result
}

function changePageSize(newSize: number): void {
  const params = new URLSearchParams(window.location.search)
  params.set('size', String(newSize))
  params.delete('page')
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
  const { settings } = useWpSettings()
  const apiUrl = rawApiUrl || settings?.dataset_repository_url || ''
  const defaultSize = parseInt(String((props['data-limit'] as string) ?? props.limit ?? '20'), 10)

  const [searchParams, setSearchParams] = useState(() => readSearchParams(defaultSize))

  useEffect(() => {
    const sync = () => setSearchParams(readSearchParams(defaultSize))
    window.addEventListener(SEARCH_CHANGE_EVENT, sync)
    window.addEventListener(FILTER_CHANGE_EVENT, sync)
    window.addEventListener('popstate', sync)
    return () => {
      window.removeEventListener(SEARCH_CHANGE_EVENT, sync)
      window.removeEventListener(FILTER_CHANGE_EVENT, sync)
      window.removeEventListener('popstate', sync)
    }
  }, [defaultSize])

  const { data, isFetching } = useSearchDatasetsQuery(
    apiUrl ? { baseUrl: apiUrl, params: searchParams } : skipToken
  )

  const items = data?.items ?? []
  const totalElements = data?.totalElements ?? 0
  const page = data?.page ?? 0
  const size = data?.size ?? defaultSize
  const totalPages = Math.ceil(totalElements / size)

  const currentSize = parseInt(new URLSearchParams(searchParams).get('size') ?? String(defaultSize), 10)

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
          {items.map((item) => {
            const period = formatPeriod(item)
            const tags = item.themes.length > 0 || item.countries.length > 0 || item.languages.length > 0
            return (
              <div
                key={item.id}
                className="px-4 py-3.5 hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => { window.location.href = `/datasets/${item.id}` }}
              >
                <div className="flex items-start gap-3">
                  {/* Desktop: type badges in left column */}
                  {item.resourceTypes.length > 0 && (
                    <div className="hidden sm:flex mt-0.5 items-center gap-1.5 shrink-0 flex-wrap">
                      {item.resourceTypes.map((rt) => (
                        <TypeBadge key={rt.id} type={rt.value} />
                      ))}
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    {/* Title + year + formats */}
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <p className="text-sm font-medium text-foreground leading-snug">{item.name}</p>
                      <div className="flex items-center gap-2 shrink-0">
                        {period && <span className="text-xs font-mono text-muted-foreground">{period}</span>}
                        {item.formats.map((f) => (
                          <span key={f} className="text-[10px] font-mono text-muted-foreground border border-border rounded px-1.5 py-0.5 bg-white">
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Mobile: type badges below title */}
                    {item.resourceTypes.length > 0 && (
                      <div className="flex sm:hidden flex-wrap items-center gap-1.5 mt-1.5">
                        {item.resourceTypes.map((rt) => (
                          <TypeBadge key={rt.id} type={rt.value} />
                        ))}
                      </div>
                    )}

                    {/* Description */}
                    {item.description && (
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    )}

                    {/* Themes · countries · languages */}
                    {tags && (
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
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {items.length > 0 && (
        <div className="flex items-center justify-between mt-4 gap-3 flex-wrap">
          <label className="flex items-center gap-2 text-xs text-muted-foreground">
            Results per page
            <select
              value={currentSize}
              onChange={(e) => changePageSize(Number(e.target.value))}
              className="border border-border rounded px-2 py-1 text-xs text-foreground bg-background focus:outline-none focus:ring-1 focus:ring-primary"
            >
              {PAGE_SIZE_OPTIONS.map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </label>

          {totalPages > 1 ? (
            <div className="flex items-center gap-0.5 flex-wrap">
              <button
                disabled={page === 0 || isFetching}
                onClick={() => goToPage(page - 1)}
                className="px-3 py-1.5 text-xs border border-border rounded hover:bg-muted/50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>

              {buildPageWindows(page + 1, totalPages).map((p, i) =>
                p === '…' ? (
                  <span key={`ellipsis-${i}`} className="px-2 py-1.5 text-xs text-muted-foreground select-none">…</span>
                ) : (
                  <button
                    key={p}
                    onClick={() => goToPage((p as number) - 1)}
                    disabled={isFetching}
                    className={`px-3 py-1.5 text-xs border rounded transition-colors disabled:cursor-not-allowed ${
                      p === page + 1
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'border-border text-primary hover:bg-muted/50'
                    }`}
                  >
                    {p}
                  </button>
                )
              )}

              <button
                disabled={page >= totalPages - 1 || isFetching}
                onClick={() => goToPage(page + 1)}
                className="px-3 py-1.5 text-xs border border-border rounded hover:bg-muted/50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          ) : (
            <div />
          )}
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
