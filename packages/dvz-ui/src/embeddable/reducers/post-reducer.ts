import { Config } from '@/conf';
import { createSlice } from '@reduxjs/toolkit';
import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import * as Immutable from 'immutable';
import { getCustomPosts } from './data-api';

interface PostsState {
    posts?: any;
    group: string | null;
    postsFilters: {
        countryFilter: string | null;
        yearFilter: string | null;
        categoryFilter: string | null;
    }
}

const initialState: PostsState = {
    posts: {},
    group: null,
    postsFilters: {
        countryFilter: null,
        yearFilter: null,
        categoryFilter: null,
    }
}

interface GetCustomPostsQueryArgs {
    postType?: string;
    taxonomy?: string;
    category?: string;
    before?: Date | null;
    years?: number[];
    perPage?: number;
    page?: number;
    locale?: string;
    after?: Date | null;
    ordering?: string;
    orderingDirection?: string;
    taxonomyFilters?: Map<string, string[]>;
}

export const postsApi = createApi({
    reducerPath: "postsApi",
    baseQuery: fetchBaseQuery({ baseUrl: Config.REACT_APP_WP_API  }),
    refetchOnMountOrArgChange: true,
    endpoints: (builder) => ({
        getCustomPosts: builder.query({
            queryFn: async (args: GetCustomPostsQueryArgs) => {
                try {
                    const { postType, taxonomy, category, taxonomyFilters, before, years, perPage, page, locale, after, ordering, orderingDirection } = args;
                    //@ts-ignore
                const response = await getCustomPosts({ postType, taxonomy, category, taxonomyFilters, before, years, perPage, page, locale, after, ordering, orderingDirection });
                return { data: response };
                } catch (error) {
                    // @ts-ignore
                    return { error: error.message };
                }

            },
        }),
    }),
});

export const { useGetCustomPostsQuery, useLazyGetCustomPostsQuery } = postsApi;

const postSlice = createSlice({
    name: "postsReducer",
    initialState,
    reducers: {
        setPostsFilter: (state, action: {
            payload: PostsState,
            type: string
        }) => {
            const {group, postsFilters} = action.payload;
            state.group = group;
            state.postsFilters = {
                countryFilter: postsFilters.countryFilter,
                yearFilter: postsFilters.yearFilter,
                categoryFilter: postsFilters.categoryFilter,
            }
            return state

        },
        setInitialPostsFilter: (state, action) => {
            return state
        }
    }
});

export const { setPostsFilter, setInitialPostsFilter } = postSlice.actions;
export default postSlice.reducer;