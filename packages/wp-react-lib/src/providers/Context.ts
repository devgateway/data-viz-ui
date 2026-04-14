import React from 'react'
import type { PostContextType, PageContextType, SearchContextType, SettingsContextType, TaxonomyContextType, CategoriesContextType, MediaContextType } from './context-types'
import type { ApiError } from '../types'
import type { MenuItem } from '../api/index'

export interface AppContextType {
    apiBaseUrl?: string;
    locale: string;
    changeUUID?: string;
    store?: unknown;
    getComponent?: (name: string) => unknown;
}

export interface MenuContextType {
    menu: MenuItem[] | null;
    locale: string | undefined;
    loading?: boolean;
    error?: ApiError | null;
}

export const PostContext = React.createContext<PostContextType>({
    posts: null,
    meta: null,
    locale: undefined
})
export const PageContext = React.createContext<PageContextType>({
    pages: null,
    meta: null,
    locale: undefined
})
export const TaxonomyContext = React.createContext<TaxonomyContextType>({
    taxonomies: null,
    locale: undefined
})
export const SearchContext = React.createContext<SearchContextType>({
    results: null,
    meta: null,
    locale: undefined
})
export const MenuContext = React.createContext<MenuContextType>({ menu: null, locale: undefined })
export const AppContext = React.createContext<AppContextType>({ locale: 'en' })
export const SettingsContext = React.createContext<SettingsContextType>({
    data: null,
    locale: undefined
})

export const CategoriesContext = React.createContext<CategoriesContextType>({
    categories: null,
    meta: null,
    locale: undefined,
    loading: false,
    error: undefined
})

export const MediaContext = React.createContext<MediaContextType>({
    media: null,
    locale: undefined
});

