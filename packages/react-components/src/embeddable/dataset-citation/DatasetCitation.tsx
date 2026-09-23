import React, { useId } from 'react'
import { joinApiUrl } from '../shared/url'
import { useJsonFetch } from '../shared/useJsonFetch'
import CopyButton from '../shared/CopyButton'
import type { DatasetDetail } from '../shared/types'

export interface DatasetCitationProps {
  apiUrl?: string
  'data-api-url'?: string
  [key: string]: unknown
}

const TAB_CLASS =
  'px-2 py-1 text-[10px] font-medium border border-border cursor-pointer peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary bg-white text-muted-foreground'

const DatasetCitation = (props: DatasetCitationProps) => {
  const apiUrl = (props['data-api-url'] as string) ?? props.apiUrl

  const dataset = useJsonFetch<DatasetDetail>(apiUrl ? joinApiUrl(apiUrl) : undefined, {})
  const groupId = useId()

  if (!dataset.citationApa && !dataset.citationBibtex) {
    return null
  }

  const apaId = `${groupId}-apa`
  const bibtexId = `${groupId}-bibtex`

  return (
    <div>
      <input type="radio" id={apaId} name={groupId} defaultChecked className="peer/apa sr-only" />
      <input type="radio" id={bibtexId} name={groupId} className="peer/bibtex sr-only" />

      <div className="flex items-center gap-0.5 mb-2">
        <label htmlFor={apaId} className={`rounded-l border-r-0 ${TAB_CLASS}`}>
          APA
        </label>
        <label htmlFor={bibtexId} className={`rounded-r ${TAB_CLASS}`}>
          BibTeX
        </label>
      </div>

      <div className="hidden peer-checked/apa:block">
        <pre className="text-[11px] font-mono text-foreground leading-relaxed whitespace-pre-wrap bg-muted rounded p-2.5 mb-2 overflow-x-auto">
          {dataset.citationApa}
        </pre>
        <CopyButton
          text={dataset.citationApa ?? ''}
          label="Copy citation"
          className="text-xs text-primary hover:text-primary-dark font-medium focus-visible:outline-2 focus-visible:outline-primary rounded"
        />
      </div>

      <div className="hidden peer-checked/bibtex:block">
        <pre className="text-[11px] font-mono text-foreground leading-relaxed whitespace-pre-wrap bg-muted rounded p-2.5 mb-2 overflow-x-auto">
          {dataset.citationBibtex}
        </pre>
        <CopyButton
          text={dataset.citationBibtex ?? ''}
          label="Copy citation"
          className="text-xs text-primary hover:text-primary-dark font-medium focus-visible:outline-2 focus-visible:outline-primary rounded"
        />
      </div>
    </div>
  )
}

export default DatasetCitation
