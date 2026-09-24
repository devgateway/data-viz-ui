export interface ThemeCountry {
  id: number
  value: string
}

export interface Theme {
  id: number
  value: string
  description?: string
  wordpressUrl?: string
  sortOrder?: number
  status: string
  datasetCount: number
  countries: ThemeCountry[]
}

export interface LatestDatasetItem {
  id: number
  name: string
  createdAt: string
  periodStart?: string
  periodEnd?: string
  doi?: string
  licenseName?: string
  fileCount: number
  recordCount?: number
  countries: ThemeCountry[]
}

export interface DatasetFile {
  id: string
  name: string
  type?: string
  contentType?: string
  sizeBytes?: number
  categoryValueId?: number
  categoryValueName?: string
  sortOrder?: number
  recordCount?: number
  variableCount?: number
}

export interface DatasetResource {
  id: string | number
  type?: string
  title: string
  url: string
}

export interface DatasetMetadataEntry {
  label?: string
  value: string
  sortOrder?: number
}

export interface DatasetDetail {
  id: number
  name: string
  createdAt: string
  periodStart?: string
  periodEnd?: string
  status: string
  description?: string
  doi?: string
  licenseName?: string
  licenseText?: string
  citationApa?: string
  citationBibtex?: string
  metadata: DatasetMetadataEntry[]
  files: DatasetFile[]
  resources: DatasetResource[]
}
