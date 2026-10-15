import React from 'react'
import type { LatestDatasetItem } from '../shared/types'
import { COUNTRY_MAP_BY_NAME } from '../../layout/CountryMaps'

export type { LatestDatasetItem }

export interface DatasetListItemProps {
  dataset: LatestDatasetItem
  variant?: 'list' | 'grid'
}

function CountryIcon({ countries }: { countries: LatestDatasetItem['countries'] }) {
  const first = countries[0]?.value
  const Map = first ? COUNTRY_MAP_BY_NAME[first] : undefined
  return Map ? <Map /> : null
}

function DatasetListItemGrid({ dataset }: DatasetListItemProps) {
  const href = `/datasets/${dataset.id}`
  const year = dataset.periodStart
    ? new Date(dataset.periodStart).getFullYear()
    : dataset.createdAt
    ? new Date(dataset.createdAt).getFullYear()
    : null

  return (
    <a
      href={href}
      className="group text-left border border-border rounded overflow-hidden hover:border-primary hover:shadow-sm transition-all focus-visible:outline-2 focus-visible:outline-primary bg-white block"
    >
      <div className="flex items-stretch">
        {/* Icon panel */}
        <div className="bg-muted flex items-center justify-center w-28 shrink-0 border-r border-border overflow-hidden">
          <div className="w-16 h-16 flex items-center justify-center">
            <CountryIcon countries={dataset.countries} />
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 min-w-0">
          <div className="mb-3">
            <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-tight">{dataset.name}</p>
            {year && <p className="text-xs text-muted-foreground mt-0.5">{year}</p>}
          </div>

          <dl className="space-y-1.5 text-xs mb-4">
            {[
              { label: 'Records', value: dataset.recordCount != null ? dataset.recordCount.toLocaleString() : '—' },
              { label: 'Files', value: `${dataset.fileCount} files` },
              { label: 'License', value: dataset.licenseName ?? '—' },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between gap-2">
                <dt className="text-muted-foreground">{label}</dt>
                <dd className="text-foreground font-medium">{value}</dd>
              </div>
            ))}
          </dl>

          {dataset.doi && (
            <p className="text-[10px] font-mono text-muted-foreground border-t border-border pt-2.5 truncate">
              {dataset.doi}
            </p>
          )}
        </div>
      </div>
    </a>
  )
}

function DatasetListItemRow({ dataset }: DatasetListItemProps) {
  const createdDate = dataset.createdAt?.slice(0, 10)
  const href = `/datasets/${dataset.id}`

  return (
    <div className="w-full border-b border-border last:border-b-0">
      <a
        href={href}
        className="group w-full text-left px-4 py-3.5 hover:bg-transparent transition-colors focus-visible:outline-2 focus-visible:outline-primary flex items-start sm:items-center justify-between flex-row sm:flex-row"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center shrink-0">
            <CountryIcon countries={dataset.countries} />
          </div>
          <div>
            <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{dataset.name}</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {dataset.recordCount ?? '—'} records · {dataset.fileCount} files · {dataset.licenseName ?? '—'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-8 px-4 sm:shrink-0 sm:pl-0">
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Released</p>
            <p className="text-xs font-mono text-foreground">{createdDate ?? '—'}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">DOI</p>
            <p className="text-xs font-mono text-foreground">{dataset.doi ?? '—'}</p>
          </div>
        </div>
      </a>
    </div>
  )
}

const DatasetListItem = ({ dataset, variant = 'list' }: DatasetListItemProps) =>
  variant === 'grid' ? (
    <DatasetListItemGrid dataset={dataset} />
  ) : (
    <DatasetListItemRow dataset={dataset} />
  )

export default DatasetListItem
