import React from 'react'
import { skipToken } from '@reduxjs/toolkit/query/react'
import { useGetDatasetDetailQuery, useGetDatasetResourcesQuery } from '../shared/api'
import type { DatasetFile } from '../shared/types'
import DatasetFiles from '../dataset-files/DatasetFiles'
import DatasetDoi from '../dataset-doi/DatasetDoi'
import DatasetCitation, { CitationFormatTabs } from '../dataset-citation/DatasetCitation'
import DatasetMetadata from '../dataset-metadata/DatasetMetadata'
import { joinApiUrl } from '../shared/url'

export interface DatasetPageProps {
  apiUrl?: string
  'data-api-url'?: string
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
    }
    const mapped = ctMap[file.contentType]
    if (mapped) return mapped
  }
  const parts = file.name.split('.')
  return parts.length > 1 ? parts[parts.length - 1].toUpperCase() : ''
}

const FormatBadge = ({ ext }: { ext: string }) => {
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

const PageSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-8">
    <div className="flex items-baseline gap-3 mb-3">
      <h2 className="text-sm font-semibold text-foreground">{title}</h2>
      <span className="h-px flex-1 bg-border" />
    </div>
    <div className="border border-border rounded overflow-hidden">
      {children}
    </div>
  </section>
)

const SidebarCard = ({ title, children, headerActions }: {
  title: string
  children: React.ReactNode
  headerActions?: React.ReactNode
}) => (
  <div className="border border-border rounded p-4">
    <div className="flex items-center justify-between mb-2">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{title}</p>
      {headerActions}
    </div>
    {children}
  </div>
)

function FreeFileRow({ file, apiUrl }: { file: DatasetFile; apiUrl?: string }) {
  const ext = getFileExt(file)
  const label = file.displayName || file.categoryValueName || file.name
  const downloadUrl = apiUrl ? joinApiUrl(apiUrl, `files/${file.id}/download`) : '#'

  return (
    <div className="flex items-center justify-between px-4 py-3 gap-3 hover:bg-muted/50 transition-colors flex-wrap">
      <div className="flex items-center gap-3 min-w-0">
        <FormatBadge ext={ext} />
        <div>
          <span className="text-sm text-foreground">{label}</span>
          {file.language && (
            <span className="ml-2 text-xs text-muted-foreground">({file.language})</span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <span className="text-xs font-mono text-muted-foreground">{formatFileSize(file.sizeBytes)}</span>
        <a
          href={downloadUrl}
          className="text-xs font-medium px-3 py-1.5 rounded bg-white border border-border text-foreground hover:bg-muted transition-colors"
        >
          Download {ext}
        </a>
      </div>
    </div>
  )
}

function FreeFileSection({ files, apiUrl, groupByCategory }: {
  files: DatasetFile[]
  apiUrl?: string
  groupByCategory?: boolean
}) {
  if (!groupByCategory) {
    return (
      <div className="divide-y divide-border">
        {files.map((f) => <FreeFileRow key={f.id} file={f} apiUrl={apiUrl} />)}
      </div>
    )
  }

  const groups = new Map<string, DatasetFile[]>()
  for (const file of files) {
    const label = file.categoryValueName || 'Other'
    const existing = groups.get(label)
    if (existing) existing.push(file)
    else groups.set(label, [file])
  }
  const groupEntries = Array.from(groups.entries())

  return (
    <>
      {groupEntries.map(([label, groupFiles], groupIndex) => (
        <div key={label} className={groupIndex > 0 ? 'border-t border-border' : ''}>
          <div className="bg-muted px-4 py-1.5 border-b border-border">
            <p className="text-xs font-semibold text-muted-foreground">{label}</p>
          </div>
          <div className="divide-y divide-border">
            {groupFiles.map((f) => <FreeFileRow key={f.id} file={f} apiUrl={apiUrl} />)}
          </div>
        </div>
      ))}
    </>
  )
}

const DATA_FILE_TYPES = ['Data Set']
const SURVEY_FILE_TYPES = ['Survey', 'Questionnaire']
const DOC_FILE_TYPES = ['Documentation', 'Document']
const REPORT_FILE_TYPES = ['Report', 'Policy Brief']

const DatasetPage = (props: DatasetPageProps) => {
  const apiUrl = (props['data-api-url'] as string) ?? props.apiUrl
  const { data: dataset } = useGetDatasetDetailQuery(apiUrl ?? skipToken)
  const { data: resources = [] } = useGetDatasetResourcesQuery(apiUrl ?? skipToken)
  const [citationFormat, setCitationFormat] = React.useState<'apa' | 'bibtex'>('apa')

  const files = dataset?.files ?? []

  const dataFiles = files.filter((f) => DATA_FILE_TYPES.includes(f.type ?? ''))
  const surveyFiles = files.filter((f) => SURVEY_FILE_TYPES.includes(f.type ?? ''))
  const docFiles = files.filter((f) => DOC_FILE_TYPES.includes(f.type ?? ''))
  const reportFiles = files.filter((f) => REPORT_FILE_TYPES.includes(f.type ?? ''))

  const knownTypes = [...DATA_FILE_TYPES, ...SURVEY_FILE_TYPES, ...DOC_FILE_TYPES, ...REPORT_FILE_TYPES]
  const otherFiles = files.filter((f) => !knownTypes.includes(f.type ?? ''))

  return (
    <div>
      {dataset && (
        <div className="mb-6">
          <h1 className="text-xl md:text-2xl font-serif font-semibold text-foreground leading-tight mb-2">
            {dataset.name}
          </h1>
          {dataset.description && (
            <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">{dataset.description}</p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 items-start">
        <main>
          {dataFiles.length > 0 && (
            <PageSection title="Data files">
              <DatasetFiles apiUrl={apiUrl} fileTypes={DATA_FILE_TYPES} />
            </PageSection>
          )}

          {surveyFiles.length > 0 && (
            <PageSection title="Questionnaires">
              <FreeFileSection files={surveyFiles} apiUrl={apiUrl} groupByCategory />
            </PageSection>
          )}

          {docFiles.length > 0 && (
            <PageSection title="Documentation">
              <FreeFileSection files={docFiles} apiUrl={apiUrl} />
            </PageSection>
          )}

          {reportFiles.length > 0 && (
            <PageSection title="Reports and policy briefs">
              <FreeFileSection files={reportFiles} apiUrl={apiUrl} />
            </PageSection>
          )}

          {otherFiles.length > 0 && (
            <PageSection title="Files">
              <FreeFileSection files={otherFiles} apiUrl={apiUrl} groupByCategory />
            </PageSection>
          )}

          {resources.length > 0 && (
            <section className="mb-8">
              <div className="flex items-baseline gap-3 mb-3">
                <h2 className="text-sm font-semibold text-foreground">Related resources</h2>
                <span className="h-px flex-1 bg-border" />
              </div>
              <div className="border border-border rounded overflow-hidden divide-y divide-border">
                {resources.map((resource) => (
                  <div key={resource.id} className="px-4 py-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-foreground">{resource.title}</p>
                      {resource.type && (
                        <p className="text-xs text-muted-foreground">{resource.type}</p>
                      )}
                    </div>
                    <a
                      href={resource.url}
                      className="shrink-0 flex items-center gap-1 text-xs text-primary hover:text-primary-dark font-medium underline underline-offset-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 8L8 2M8 2H4M8 2V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>

        <aside className="space-y-4">
          {dataset?.doi && (
            <SidebarCard title="DOI">
              <DatasetDoi apiUrl={apiUrl} />
            </SidebarCard>
          )}

          {dataset?.licenseName && (
            <div className="border border-border rounded p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">License</p>
                <span className="text-[10px] font-mono bg-white border border-border text-muted-foreground px-1.5 py-0.5 rounded">
                  {dataset.licenseName}
                </span>
              </div>
              {dataset.licenseText && (
                <p className="text-xs text-muted-foreground leading-relaxed">{dataset.licenseText}</p>
              )}
            </div>
          )}

          {(dataset?.citationApa || dataset?.citationBibtex) && (
            <SidebarCard
              title="Recommended citation"
              headerActions={
                <CitationFormatTabs format={citationFormat} onChange={setCitationFormat} />
              }
            >
              <DatasetCitation apiUrl={apiUrl} format={citationFormat} onFormatChange={setCitationFormat} hideTabs />
            </SidebarCard>
          )}

          {(dataset?.metadata?.length ?? 0) > 0 && (
            <SidebarCard title="Metadata">
              <DatasetMetadata apiUrl={apiUrl} />
            </SidebarCard>
          )}

          {apiUrl && (
            <a
              href={joinApiUrl(apiUrl, 'download')}
              className="block text-center w-full bg-action text-white text-sm font-medium py-3 rounded hover:bg-action-dark transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action"
            >
              Download all files (.zip)
            </a>
          )}
        </aside>
      </div>
    </div>
  )
}

export default DatasetPage
