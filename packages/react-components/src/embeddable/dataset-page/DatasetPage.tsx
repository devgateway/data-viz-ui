import React from 'react'
import DatasetFiles from '../dataset-files/DatasetFiles'
import DatasetResources from '../dataset-resources/DatasetResources'
import DatasetDoi from '../dataset-doi/DatasetDoi'
import DatasetLicense from '../dataset-license/DatasetLicense'
import DatasetCitation from '../dataset-citation/DatasetCitation'
import DatasetMetadata from '../dataset-metadata/DatasetMetadata'

export interface DatasetPageProps {
  apiUrl?: string
  'data-api-url'?: string
  [key: string]: unknown
}

const SectionCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="border border-border rounded p-4">
    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">{title}</p>
    {children}
  </div>
)

const DatasetPage = (props: DatasetPageProps) => {
  const apiUrl = (props['data-api-url'] as string) ?? props.apiUrl

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 items-start">
      <main className="space-y-6">
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Data files</p>
          <DatasetFiles apiUrl={apiUrl} />
        </div>
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Resources</p>
          <DatasetResources apiUrl={apiUrl} />
        </div>
      </main>
      <aside className="space-y-4">
        <SectionCard title="DOI">
          <DatasetDoi apiUrl={apiUrl} />
        </SectionCard>
        <SectionCard title="License">
          <DatasetLicense apiUrl={apiUrl} />
        </SectionCard>
        <SectionCard title="Recommended citation">
          <DatasetCitation apiUrl={apiUrl} />
        </SectionCard>
        <SectionCard title="Metadata">
          <DatasetMetadata apiUrl={apiUrl} />
        </SectionCard>
      </aside>
    </div>
  )
}

export default DatasetPage
