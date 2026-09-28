import React from 'react'
import { skipToken } from '@reduxjs/toolkit/query/react'
import { useGetDatasetDetailQuery } from '../shared/api'
import type { DatasetFile } from '../shared/types'
import { joinApiUrl } from '../shared/url'

export type { DatasetFile } from '../shared/types'

export interface DatasetFilesProps {
  apiUrl?: string
  downloadAllLabel?: string
  fileTypes?: string[]
  'data-api-url'?: string
  'data-download-all-label'?: string
  [key: string]: unknown
}

function formatFileSize(bytes?: number): string {
  if (!bytes || bytes <= 0) return ''
  const units = ['B', 'KB', 'MB', 'GB']
  let value = bytes
  let unitIndex = 0
  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024
    unitIndex += 1
  }
  return `${value.toFixed(1)} ${units[unitIndex]}`
}

function getFileExt(file: DatasetFile): string {
  if (file.contentType) {
    const ctMap: Record<string, string> = {
      'text/csv': 'CSV',
      'application/pdf': 'PDF',
      'application/x-stata-dta': 'DTA',
      'application/octet-stream': 'DTA',
    }
    const mapped = ctMap[file.contentType]
    if (mapped) return mapped
  }
  const parts = file.name.split('.')
  return parts.length > 1 ? parts[parts.length - 1].toUpperCase() : ''
}

const FileBadge = ({ ext }: { ext: string }) => {
  const cls =
    ext === 'CSV' ? 'bg-green-50 text-green-800 border-green-200'
    : ext === 'DTA' ? 'bg-blue-50 text-blue-800 border-blue-200'
    : ext === 'PDF' ? 'bg-red-50 text-red-700 border-red-200'
    : 'bg-gray-100 text-gray-700 border-gray-200'
  return (
    <span className={`shrink-0 inline-block text-[10px] font-mono font-medium px-1.5 py-0.5 rounded border ${cls}`}>
      {ext || '?'}
    </span>
  )
}

function groupFiles(files: DatasetFile[]): Array<[string, DatasetFile[]]> {
  const groups = new Map<string, DatasetFile[]>()
  for (const file of files) {
    const label = file.categoryValueName || file.type || 'Files'
    const existing = groups.get(label)
    if (existing) {
      existing.push(file)
    } else {
      groups.set(label, [file])
    }
  }
  return Array.from(groups.entries())
}

const DatasetFiles = (props: DatasetFilesProps) => {
  const apiUrl = (props['data-api-url'] as string) ?? props.apiUrl
  const downloadAllLabel = (props['data-download-all-label'] as string) ?? props.downloadAllLabel
  const fileTypes = props.fileTypes
  const { data: dataset } = useGetDatasetDetailQuery(apiUrl ?? skipToken)
  let files = dataset?.files ?? []
  if (fileTypes && fileTypes.length > 0) {
    files = files.filter((f) => fileTypes.includes(f.type ?? ''))
  }
  const groups = groupFiles(files)

  return (
    <div>
      <div className="border border-border rounded overflow-hidden">
        {groups.map(([label, groupFiles], groupIndex) => (
          <div key={label} className={groupIndex > 0 ? 'border-t border-border' : ''}>
            <div className="bg-muted px-4 py-1.5 border-b border-border">
              <p className="text-xs font-semibold text-muted-foreground">{label}</p>
            </div>
            <ul className="divide-y divide-border">
              {groupFiles.map((file) => {
                const ext = getFileExt(file)
                const isCSV = ext === 'CSV'
                const downloadUrl = apiUrl ? joinApiUrl(apiUrl, `files/${file.id}/download`) : '#'
                const variablesUrl = dataset ? `/datasets/${dataset.id}/files/${file.id}/variables` : '#'

                return (
                  <li key={file.id} className="flex items-center justify-between px-4 py-3 gap-3 flex-wrap">
                    <div className="flex items-center gap-3 min-w-0">
                      <FileBadge ext={ext} />
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap">
                        <span className="text-sm font-medium text-foreground truncate">{file.displayName || file.name}</span>
                        {file.sizeBytes != null && (
                          <span className="font-mono">{formatFileSize(file.sizeBytes)}</span>
                        )}
                        {file.recordCount != null && (
                          <>
                            <span>·</span>
                            <span>{file.recordCount.toLocaleString()} records · {file.variableCount} variables</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      {isCSV && (
                        <a href={variablesUrl} className="text-xs text-primary hover:text-primary-dark font-medium whitespace-nowrap">
                          View variables
                        </a>
                      )}
                      <a
                        href={downloadUrl}
                        className="text-xs font-medium px-3 py-1.5 rounded bg-action text-white hover:bg-action-dark transition-colors whitespace-nowrap"
                      >
                        Download {ext || 'file'}
                      </a>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>

      {downloadAllLabel && apiUrl && (
        <a
          href={joinApiUrl(apiUrl, 'download')}
          className="mt-4 block text-center w-full bg-action text-white text-sm font-medium py-3 rounded hover:bg-action-dark transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action"
        >
          {downloadAllLabel}
        </a>
      )}
    </div>
  )
}

export default DatasetFiles
