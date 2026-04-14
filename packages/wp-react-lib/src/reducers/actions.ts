import {
    CLEAN_PAGE_DATA,
    LOAD_CUSTOM_POSTS_BY_TAXONOMY,
    LOAD_CUSTOM_POSTS_BY_TAXONOMY_DONE,
    LOAD_CUSTOM_POSTS_BY_TAXONOMY_ERROR,
    LOAD_MEDIA,
    LOAD_MEDIA_DONE,
    LOAD_MEDIA_ERROR,
    LOAD_MENU,
    LOAD_MENU_DONE,
    LOAD_MENU_ERROR,
    LOAD_PAGES,
    LOAD_PAGES_DONE,
    LOAD_PAGES_ERROR,
    LOAD_POSTS,
    LOAD_POSTS_DONE,
    LOAD_POSTS_ERROR,
    LOAD_SEARCH,
    LOAD_SEARCH_DONE,
    LOAD_SEARCH_ERROR,
    LOAD_SETTINGS,
    LOAD_SETTINGS_DONE,
    LOAD_SETTINGS_ERROR,
    LOAD_TAXONOMY,
    LOAD_TAXONOMY_DONE,
    LOAD_TAXONOMY_ERROR,
    LOAD_CATEGORIES,
    LOAD_CATEGORIES_DONE,
    LOAD_CATEGORIES_ERROR,
} from './constants';

import * as wp from '../api';

type AnyDispatch = (action: Record<string, unknown>) => void;
type Thunk = (dispatch: AnyDispatch, _getState: () => unknown) => void;

// used to transform categories to id
export const loadTaxonomy = ({ taxonomy, locale = 'en' }: { taxonomy: string; locale?: string }): Thunk =>
    (dispatch, _getState) => {
        dispatch({ type: LOAD_TAXONOMY });
        wp.getTaxonomy({ name: taxonomy, locale }).then(response => {
            const { data, meta } = response;
            dispatch({ type: LOAD_TAXONOMY_DONE, data: data as unknown, meta: meta as unknown, taxonomy });
        }).catch(() => {
            dispatch({ type: LOAD_TAXONOMY_ERROR, taxonomy });
        });
    };

export const getPostByTaxonomy = ({
    wpType,
    taxonomy,
    category,
    categoryId,
    page,
    perPage,
    locale = 'en',
}: {
    wpType: string;
    taxonomy: string;
    category: string;
    categoryId: string;
    page?: number;
    perPage?: number;
    locale?: string;
}): Thunk => (dispatch, _getState) => {
    const payLoad = { wpType, taxonomy, category };
    dispatch({ type: LOAD_CUSTOM_POSTS_BY_TAXONOMY, ...payLoad });
    wp.getPostsByTypeAndTaxonomy({ type: wpType, category: taxonomy, value: categoryId, locale, page, perPage })
        .then(response => {
            const { data, meta } = response;
            dispatch({ type: LOAD_CUSTOM_POSTS_BY_TAXONOMY_DONE, data: data as unknown, meta: meta as unknown, ...payLoad });
        })
        .catch((error: unknown) => {
            dispatch({ type: LOAD_CUSTOM_POSTS_BY_TAXONOMY_ERROR, error, ...payLoad });
        });
};

export const getPosts = ({
    slug,
    type,
    taxonomy,
    categories,
    before,
    perPage,
    page,
    fields,
    store,
    locale = 'en',
    previewNonce,
    previewId,
    search,
    after,
}: {
    slug?: string;
    type?: string;
    taxonomy?: string;
    categories?: string | string[];
    before?: Date | string;
    perPage?: number;
    page?: number;
    fields?: string[];
    store?: string;
    locale?: string;
    previewNonce?: string;
    previewId?: string;
    search?: string;
    after?: Date | string;
}): Thunk => (dispatch, _getState) => {
    dispatch({ type: LOAD_POSTS, slug: slug as unknown, taxonomy: taxonomy as unknown, categories: categories as unknown, before: before as unknown, perPage: perPage as unknown, page: page as unknown, fields: fields as unknown, store: store as unknown, locale, after: after as unknown });
    wp.getPosts({ slug, type, taxonomy, categories, before, perPage, page, fields, locale, previewNonce, previewId, search, after })
        .then(response => {
            const { data, meta } = response;
            dispatch({
                type: LOAD_POSTS_DONE,
                data: data as unknown,
                slug: slug as unknown,
                taxonomy: taxonomy as unknown,
                categories: categories as unknown,
                before: before as unknown,
                perPage: perPage as unknown,
                page: page as unknown,
                fields: fields as unknown,
                store: store as unknown,
                locale,
                previewNonce: previewNonce as unknown,
                previewId: previewId as unknown,
                after: after as unknown,
                meta: meta as unknown,
            });
        }).catch((error: unknown) => {
            dispatch({
                type: LOAD_POSTS_ERROR,
                error,
                slug: slug as unknown,
                taxonomy: taxonomy as unknown,
                categories: categories as unknown,
                before: before as unknown,
                perPage: perPage as unknown,
                page: page as unknown,
                fields: fields as unknown,
                store: store as unknown,
                locale,
                previewNonce: previewNonce as unknown,
                previewId: previewId as unknown,
                after: after as unknown,
            });
        });
};

export const clean = (params: Record<string, unknown>): Thunk => (dispatch, _getState) => {
    dispatch({ type: CLEAN_PAGE_DATA, ...params });
};

export const search = ({
    context,
    page,
    perPage,
    search: searchTerm,
    type,
    subtype,
    store,
    locale = 'en',
}: {
    context?: string;
    page?: number;
    perPage?: number;
    search?: string;
    type?: string;
    subtype?: string;
    store?: string;
    locale?: string;
}): Thunk => (dispatch, _getState) => {
    dispatch({ type: LOAD_SEARCH, store: store as unknown });
    wp.search({ context, page, perPage, search: searchTerm, type, subtype, locale })
        .then(response => {
            const { data, meta } = response;
            dispatch({ type: LOAD_SEARCH_DONE, store: store as unknown, data: data as unknown, meta: meta as unknown });
        })
        .catch(() => {
            dispatch({ type: LOAD_SEARCH_ERROR, store: store as unknown });
        });
};

export const getPages = ({
    before,
    perPage,
    page,
    fields,
    parent,
    slug,
    store,
    locale = 'en',
    previewNonce,
    previewId,
    search,
}: {
    before?: Date;
    perPage?: number;
    page?: number;
    fields?: string[];
    parent?: string;
    slug?: string;
    store?: string;
    locale?: string;
    previewNonce?: string;
    previewId?: string;
    search?: string;
}): Thunk => (dispatch, _getState) => {
    dispatch({ type: LOAD_PAGES, store: store as unknown });
    wp.getPages({ before, perPage, page, fields, parent, slug, locale, previewNonce, previewId, search })
        .then(response => {
            const { data, meta } = response;
            dispatch({
                type: LOAD_PAGES_DONE,
                data: data as unknown,
                meta: meta as unknown,
                before: before as unknown,
                perPage: perPage as unknown,
                page: page as unknown,
                fields: fields as unknown,
                parent: parent as unknown,
                slug: slug as unknown,
                store: store as unknown,
                locale,
                previewNonce: previewNonce as unknown,
                previewId: previewId as unknown,
            });
        }).catch((error: unknown) => {
            dispatch({
                type: LOAD_PAGES_ERROR,
                error,
                before: before as unknown,
                perPage: perPage as unknown,
                page: page as unknown,
                fields: fields as unknown,
                parent: parent as unknown,
                slug: slug as unknown,
                store: store as unknown,
                locale,
                previewNonce: previewNonce as unknown,
                previewId: previewId as unknown,
            });
        });
};

export const getMenu = ({ slug, locale = 'en' }: { slug: string; locale?: string }): Thunk =>
    (dispatch, _getState) => {
        dispatch({ type: LOAD_MENU, slug });
        wp.getMenu({ name: slug, locale }).then(response => {
            const { data, meta } = response;
            dispatch({ type: LOAD_MENU_DONE, slug, data: data as unknown, meta: meta as unknown });
        }).catch((error: unknown) => {
            dispatch({ type: LOAD_MENU_ERROR, slug, error });
        });
    };

export const getSettings = ({
    locale = 'en',
    changeUUID,
}: {
    locale?: string;
    changeUUID?: string | null;
}): Thunk => (dispatch, _getState) => {
    dispatch({ type: LOAD_SETTINGS });
    wp.getSettings({ locale, changeUUID: changeUUID ?? undefined }).then(response => {
        const { data, meta } = response;
        dispatch({ type: LOAD_SETTINGS_DONE, data: data as unknown, meta: meta as unknown });
    }).catch((error: unknown) => {
        dispatch({ type: LOAD_SETTINGS_ERROR, error });
    });
};

export const getMedia = ({ id, locale = 'en' }: { id: string; locale?: string }): Thunk =>
    (dispatch, _getState) => {
        dispatch({ type: LOAD_MEDIA, id });
        wp.getMedia({ slug: id, locale }).then(response => {
            const { data, meta } = response;
            dispatch({ type: LOAD_MEDIA_DONE, data: data as unknown, meta: meta as unknown, id });
        }).catch((error: unknown) => {
            dispatch({ type: LOAD_MEDIA_ERROR, error, id });
        });
    };

export const getCategories = ({
    context = 'view',
    page = 1,
    perPage = 10,
    search,
    exclude,
    include,
    order = 'asc',
    orderby = 'name',
    hideEmpty,
    parent,
    post,
    slug,
    locale = 'en',
    store,
}: {
    context?: string;
    page?: number;
    perPage?: number;
    search?: string;
    exclude?: string;
    include?: string;
    order?: string;
    orderby?: string;
    hideEmpty?: boolean;
    parent?: string;
    post?: string;
    slug?: string;
    locale?: string;
    store?: string;
}): Thunk => (dispatch, _getState) => {
    dispatch({ type: LOAD_CATEGORIES, context, page: page as unknown, perPage: perPage as unknown, search: search as unknown, exclude: exclude as unknown, include: include as unknown, order, orderby, hideEmpty: hideEmpty as unknown, parent: parent as unknown, post: post as unknown, slug: slug as unknown, locale, store: store as unknown });
    wp.getCategories({
        context: context as 'view' | 'embed' | 'edit',
        page,
        perPage,
        search,
        exclude,
        include,
        order: order as 'asc' | 'desc',
        orderby: orderby as 'id' | 'include' | 'name' | 'slug' | 'include_slugs' | 'term_group' | 'description' | 'count',
        hideEmpty,
        parent,
        post,
        slug,
        locale,
    })
        .then(response => {
            const { data, meta } = response;
            dispatch({
                type: LOAD_CATEGORIES_DONE,
                data: data as unknown,
                meta: meta as unknown,
                context,
                page: page as unknown,
                perPage: perPage as unknown,
                search: search as unknown,
                exclude: exclude as unknown,
                include: include as unknown,
                order,
                orderby,
                hideEmpty: hideEmpty as unknown,
                parent: parent as unknown,
                post: post as unknown,
                slug: slug as unknown,
                locale,
                store: store as unknown,
            });
        })
        .catch((error: unknown) => {
            dispatch({
                type: LOAD_CATEGORIES_ERROR,
                error,
                context,
                page: page as unknown,
                perPage: perPage as unknown,
                search: search as unknown,
                exclude: exclude as unknown,
                include: include as unknown,
                order,
                orderby,
                hideEmpty: hideEmpty as unknown,
                parent: parent as unknown,
                post: post as unknown,
                slug: slug as unknown,
                locale,
                store: store as unknown,
            });
        });
};
