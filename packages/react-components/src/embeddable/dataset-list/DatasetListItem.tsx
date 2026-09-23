import React from 'react'

export interface Dataset {
  id: string
  mapSvg?: string
  surveyTitle: string
  sampleSize?: number | string
  numFiles?: number
  license?: string
  releaseDate?: string
  doi?: string
  url?: string
}

export interface DatasetListItemProps {
  dataset: Dataset
}

const DatasetListItem = (props: DatasetListItemProps) => {
  const { mapSvg, surveyTitle, sampleSize, numFiles, license, releaseDate, doi, url } = props.dataset

  const content = (
    <div className="flex items-start sm:items-center justify-between gap-3 flex-col sm:flex-row">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 flex items-center justify-center shrink-0">
          {mapSvg && <img src={mapSvg} alt="" className="w-full h-full object-contain" />}
        </div>
        <div>
          <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{surveyTitle}</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {sampleSize} adolescents · {numFiles} files · {license}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4 sm:shrink-0 pl-9 sm:pl-0">
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Released</p>
          <p className="text-xs font-mono text-foreground">{releaseDate}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">DOI</p>
          <p className="text-xs font-mono text-foreground">{doi}</p>
        </div>
      </div>
    </div>
  )

  const className = "group w-full text-left px-4 py-3.5 hover:bg-muted transition-colors focus-visible:outline-2 focus-visible:outline-primary"

  return url ? (
    <a href={url} className={className}>{content}</a>
  ) : (
    <div className={className}>{content}</div>
  )
}

export default DatasetListItem
