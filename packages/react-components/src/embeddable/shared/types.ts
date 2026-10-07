export interface WpSettingsLanguage {
  enable: number
  locale: string
  name: string
  translation: string
  date: string
  time: string
  flag: string
}

export interface WpSettings {
  react_ui_url: string
  react_api_url: string
  dataset_repository_url: string
  react_search_type: string
  react_menu_type: string
  languages: Record<string, WpSettingsLanguage>
  landing_page_url: string
  google_analytics_code: string
  name: string
  description: string
  site_logo: number
  site_icon: number
}

export interface Category {
  id: number
  name: string
}

export interface CategoryValue {
  id: number
  categoryId: number
  parentCategoryValueId: number | null
  value: string
  sortOrder: number
  description: string | null
  wordpressUrl: string | null
  children: CategoryValue[]
}

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
  displayName?: string | null
  language?: string | null
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

export interface FileVariableCategory {
  value: string
  frequency: number
}

export interface FileVariable {
  ordinal: number
  name: string
  label: string | null
  section: string | null
  type: 'Numeric' | 'Categorical' | 'String' | 'Date'
  validCases: number
  missingCases: number
  categories: FileVariableCategory[]
}

export interface DatasetSearchItem {
  id: number
  name: string
  description: string
  createdAt: string
  periodStart: string | null
  periodEnd: string | null
  doi: string
  licenseName: string
  fileCount: number
  recordCount: number
  themes: Array<{ id: number; value: string }>
  countries: Array<{ id: number; value: string }>
  resourceTypes: Array<{ id: number; value: string }>
  languages: Array<{ id: number; value: string }>
  formats: string[]
}

export interface DatasetSearchFacetItem {
  id: number
  value: string
  count: number
}

export interface DatasetSearchResponse {
  items: DatasetSearchItem[]
  page: number
  size: number
  totalElements: number
  facets: {
    resourceTypes: DatasetSearchFacetItem[]
    countries: DatasetSearchFacetItem[]
    languages: DatasetSearchFacetItem[]
    years: DatasetSearchFacetItem[]
  }
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
