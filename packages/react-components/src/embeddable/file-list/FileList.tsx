"use client"
import React from 'react'
import type { FileListItem } from '../shared/types'

export type { FileListItem } from '../shared/types'

export interface FileListProps {
  files?: FileListItem[] | string
  heading?: string
  'data-files'?: string
  'data-heading'?: string
  [key: string]: unknown
}

// The saved block gives a URI-encoded JSON string (its quotes would not survive being an
// HTML attribute); the editor preview and React callers give plain JSON or an array.
function parseFiles(value: FileListItem[] | string | undefined): FileListItem[] {
  if (Array.isArray(value)) return value
  if (!value) return []
  try {
    const parsed: unknown = JSON.parse(value.startsWith('[') ? value : decodeURIComponent(value))
    return Array.isArray(parsed) ? (parsed as FileListItem[]) : []
  } catch {
    return []
  }
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

function getFileExt(file: FileListItem): string {
  if (file.mimeType) {
    const ctMap: Record<string, string> = {
      'text/csv': 'CSV',
      'application/pdf': 'PDF',
      'application/x-stata-dta': 'DTA',
    }
    const mapped = ctMap[file.mimeType]
    if (mapped) return mapped
  }
  const parts = file.filename.split('.')
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

function FileList(props: FileListProps) {
  const files = parseFiles((props['data-files'] as string) ?? props.files)
  const heading = (props['data-heading'] as string) ?? props.heading

  if (files.length === 0) return null

  return (
    <div>
      {heading && (
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <span>{heading}</span>
          <span className="h-px flex-1 bg-border" />
        </h3>
      )}
      <div className="divide-y divide-border border border-border rounded">
        {files.map((file) => {
          const ext = getFileExt(file)
          const size = formatFileSize(file.sizeBytes)
          return (
            <div key={file.id} className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-muted transition-colors">
              <div className="flex items-center gap-3 min-w-0">
                <FileBadge ext={ext} />
                <span className="text-sm text-foreground truncate">{file.displayName || file.filename}</span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                {size && <span className="text-xs font-mono text-muted-foreground">{size}</span>}
                <a
                  href={file.url}
                  download
                  className="text-xs text-primary hover:text-primary-dark font-medium whitespace-nowrap focus-visible:outline-2 focus-visible:outline-primary rounded"
                >
                  Download {ext || 'file'}
                </a>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default FileList
