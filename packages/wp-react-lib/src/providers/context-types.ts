import type { Post } from "../post-type"
import type { DgSettings, Media, SearchResult, Taxonomy, ApiError } from "../types"

export interface PostContextType {
    posts: Post[] | null
    meta: Record<string, string> | null
    locale: string | undefined
}

export interface PageContextType {
    pages: Post[] | null
    meta: Record<string, string> | null
    locale: string | undefined
}

export interface MediaContextType {
    media: Media | null
    locale: string | undefined
}

export interface SearchContextType {
    results: SearchResult[] | null
    meta: Record<string, string> | null
    locale: string | undefined
}

export interface SettingsContextType {
    data : DgSettings | null
    locale: string | undefined
}

export interface TaxonomyContextType {
    taxonomies: Taxonomy[] | null
    locale: string | undefined
}

export interface CategoriesContextType {
    categories: unknown[] | null
    meta: Record<string, string> | null
    locale: string | undefined
    loading: boolean
    error: ApiError | null | undefined
}
