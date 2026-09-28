import React from 'react'
import { skipToken } from '@reduxjs/toolkit/query/react'
import { useGetDatasetDetailQuery } from '../shared/api'
import CopyButton from '../shared/CopyButton'

export interface DatasetCitationProps {
  apiUrl?: string
  'data-api-url'?: string
  format?: 'apa' | 'bibtex'
  onFormatChange?: (format: 'apa' | 'bibtex') => void
  hideTabs?: boolean
  [key: string]: unknown
}

const TAB_CLASS =
  'px-2 py-1 text-[10px] font-medium border border-border cursor-pointer text-muted-foreground transition-colors'

export const CitationFormatTabs = ({
  format,
  onChange,
}: {
  format: 'apa' | 'bibtex'
  onChange: (f: 'apa' | 'bibtex') => void
}) => (
  <div className="flex items-center gap-0.5 text-[10px] font-medium">
    <button
      onClick={() => onChange('apa')}
      className={`${TAB_CLASS} rounded-l border-r-0 ${format === 'apa' ? 'bg-primary text-white border-primary' : 'bg-white hover:text-foreground'}`}
    >
      APA
    </button>
    <button
      onClick={() => onChange('bibtex')}
      className={`${TAB_CLASS} rounded-r ${format === 'bibtex' ? 'bg-primary text-white border-primary' : 'bg-white hover:text-foreground'}`}
    >
      BibTeX
    </button>
  </div>
)

const DatasetCitation = (props: DatasetCitationProps) => {
  const apiUrl = (props['data-api-url'] as string) ?? props.apiUrl
  const [internalFormat, setInternalFormat] = React.useState<'apa' | 'bibtex'>('apa')

  const { data: dataset } = useGetDatasetDetailQuery(apiUrl ?? skipToken)

  if (!dataset?.citationApa && !dataset?.citationBibtex) {
    return null
  }

  const isControlled = props.format !== undefined
  const selectedCitation = isControlled ? props.format! : internalFormat
  const handleChange = isControlled ? props.onFormatChange! : setInternalFormat

  const citationText = selectedCitation === 'apa' ? dataset.citationApa : dataset.citationBibtex

  return (
    <div>
      {!props.hideTabs && (
        <div className="mb-2">
          <CitationFormatTabs format={selectedCitation} onChange={handleChange} />
        </div>
      )}
      <pre className="text-[11px] font-mono text-foreground leading-relaxed whitespace-pre-wrap bg-muted rounded p-2.5 mb-2 overflow-x-auto">
        {citationText}
      </pre>
      <CopyButton
        text={citationText ?? ''}
        label="Copy citation"
        className="text-xs cursor-pointer text-primary hover:text-primary-dark font-medium focus-visible:outline-2 focus-visible:outline-primary rounded"
      />
    </div>
  )
}

export default DatasetCitation
