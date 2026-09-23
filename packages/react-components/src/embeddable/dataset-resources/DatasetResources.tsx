import React from 'react'
import { joinApiUrl } from '../shared/url'
import { useJsonFetch } from '../shared/useJsonFetch'

export interface DatasetResource {
  id: string | number
  type?: string
  title: string
  url: string
}

export interface DatasetResourcesProps {
  apiUrl?: string
  'data-api-url'?: string
  [key: string]: unknown
}

const DatasetResources = (props: DatasetResourcesProps) => {
  const apiUrl = (props['data-api-url'] as string) ?? props.apiUrl

  const resources = useJsonFetch<DatasetResource[]>(apiUrl ? joinApiUrl(apiUrl, 'resources') : undefined, [])

  return (
    <ul className="divide-y divide-border border border-border rounded">
      {resources.map((resource) => (
        <li key={resource.id} className="flex items-center justify-between px-4 py-3">
          <div>
            <a href={resource.url} className="text-sm text-primary hover:text-primary-dark font-medium underline underline-offset-2">
              {resource.title}
            </a>
            {resource.type && <p className="text-xs text-muted-foreground mt-0.5">{resource.type}</p>}
          </div>
        </li>
      ))}
    </ul>
  )
}

export default DatasetResources
