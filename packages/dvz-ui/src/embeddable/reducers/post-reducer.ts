import { Config } from '@/conf';
import { createSlice } from '@reduxjs/toolkit';
import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import * as Immutable from 'immutable';

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
    before?: Date;
    perPage?: number;
    page?: number;
    locale?: string;
    after?: Date;
}

export const postsApi = createApi({
    reducerPath: "postsApi",
    baseQuery: fetchBaseQuery({ baseUrl: Config.REACT_APP_WP_API  }),
    refetchOnMountOrArgChange: true,
    endpoints: (builder) => ({
        getCustomPosts: builder.query({
            query: (args: GetCustomPostsQueryArgs) => {
                const { postType, taxonomy, category, before, perPage, page, locale, after } = args;
                const url = `${postType}`;
                const queryParams = new URLSearchParams();
                if (taxonomy && category) queryParams.append(taxonomy, category);
                if (before) queryParams.append("before", before.toISOString());
                if (perPage) queryParams.append("per_page", perPage.toString());
                if (page) queryParams.append("page", page.toString());
                if (locale) queryParams.append("locale", locale);
                if (after) queryParams.append("after", after.toISOString());
                console.log("queryParams", queryParams.toString());
                console.log("url", url);
                return {
                    url: `${url}?${queryParams.toString()}`,
                    method: "GET",

                }
            },

            transformResponse: (response: any) => Immutable.fromJS(response)
        }),
    }),
});

export const { useGetCustomPostsQuery } = postsApi;

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