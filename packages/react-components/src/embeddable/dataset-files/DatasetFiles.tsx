import React from 'react'
import { skipToken } from '@reduxjs/toolkit/query/react'
import { joinApiUrl } from '../shared/url'
import { useGetJsonQuery } from '../shared/api'

export interface DatasetFile {
  id: string
  name: string
  type?: string
  contentType?: string
  sizeBytes?: number
  categoryValueName?: string
}

export interface DatasetFilesProps {
  apiUrl?: string
  downloadAllLabel?: string
  'data-api-url'?: string
  'data-download-all-label'?: string
  [key: string]: unknown
}

function formatFileSize(bytes?: number): string {
  if (!bytes || bytes <= 0) {
    return ''
  }

  const units = ['B', 'KB', 'MB', 'GB']
  let value = bytes
  let unitIndex = 0

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024
    unitIndex += 1
  }

  return `${value.toFixed(1)} ${units[unitIndex]}`
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

  const { data } = useGetJsonQuery(apiUrl ? joinApiUrl(apiUrl, 'files') : skipToken)
  const files = (data as DatasetFile[]) ?? []
  const groups = groupFiles(files)

  return (
    <div>
      {groups.map(([label, groupFiles]) => (
        <div key={label} className="mb-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">{label}</p>
          <ul className="divide-y divide-border border border-border rounded">
            {groupFiles.map((file) => (
              <li key={file.id} className="flex items-center justify-between px-4 py-2.5 text-sm">
                <span className="text-foreground">{file.name}</span>
                <span className="text-xs text-muted-foreground font-mono">{formatFileSize(file.sizeBytes)}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {downloadAllLabel && apiUrl && (
        <a
          href={joinApiUrl(apiUrl, 'download')}
          className="block text-center w-full bg-action text-white text-sm font-medium py-3 rounded hover:bg-action-dark transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action"
        >
          {downloadAllLabel}
        </a>
      )}
    </div>
  )
}

export default DatasetFiles
