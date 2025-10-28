import React, { useEffect, useState } from 'react';
import type { PostType } from '@devgateway/wp-react-lib';
import { Container, Grid, GridRow, Loader, SemanticWIDTHS } from 'semantic-ui-react';
import PostIntro from "../connected-templates/PostIntro";
import { injectIntl, WrappedComponentProps } from 'react-intl';
import { getStartDateAndEndDateFromYear } from './utils';
import NoData from './NoData';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomPosts } from '../reducers/data-api';
import { useParams } from 'react-router';
import { toBoolean, toNumber } from '@/utils/data';

interface PostGridContentProps {
    posts: PostType[];
    numberOfColumns: number;
    sortFirstBy: number | null;
    countryCategory: string;
    postWidth: number;
    postHeight: number;
}

const PostGridContent = (props: PostGridContentProps) => {
    const { posts, numberOfColumns, sortFirstBy, countryCategory, postWidth, postHeight } = props;

    const allPosts: any[] = [];

    if (countryCategory && sortFirstBy) {
        const countryPosts = posts.filter((post: any) => post[countryCategory].includes(Number(sortFirstBy)));
        const restPosts = posts.filter((post: any) => !post[countryCategory].includes(Number(sortFirstBy)));
        allPosts.push(...countryPosts, ...restPosts);
    }
    else {
        allPosts.push(...posts);
    }

    return (
        <Grid columns={numberOfColumns as unknown as SemanticWIDTHS}>
            <GridRow>
                {
                    allPosts.map((post) => (
                        <Grid.Column key={post.id}>
                                <div style={{ width: postWidth, height: postHeight, overflow: 'hidden' }}>
                                    <PostIntro
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            overflow: 'hidden',
                                            margin: 0,
                                            padding: 0,
                                        }}
                                        key={post.id}
                                        as={Container}
                                        fluid
                                        post={post}
                                    />
                                </div>

                        </Grid.Column>

                    ))
                }
            </GridRow>

        </Grid>
    )
}


interface FilteredPostsProps extends WrappedComponentProps {
    "data-group": string;
    "data-number-of-columns": number | string;
    "data-type": string;
    "data-taxonomy": string;
    "data-categories": string;
    "data-height": number | string;
    "data-post-width": number | string;
    "data-post-height": number | string;
    "data-number-of-items-per-page": number | string;
    "data-enable-sorting": string | boolean;
    "data-sort-first-by": string;
    "data-sorting-type": string;
    "data-sorting-taxonomy": string;
}

const FilteredPosts = (props: FilteredPostsProps) => {
    const {
        "data-group": group,
        "data-number-of-columns": numberOfColumns,
        "data-type": type,
        "data-taxonomy": taxonomy,
        "data-categories": _categories,
        "data-height": _height,
        "data-post-width": postWidth,
        "data-post-height": postHeight,
        "data-number-of-items-per-page": numberOfItemsPerPage,
        "data-enable-sorting": enableSorting,
        "data-sort-first-by": sortFirstBy,
        "data-sorting-taxonomy": sortingTaxonomy,
    } = props;

    const dispatch = useDispatch();
    const { locale } = useParams();

    const [loading, setLoading] = useState(false);
    const reduxState: any = useSelector((state: any) => state);
    const [posts, setPosts] = useState<any>([]);
    const enableSortingValue = toBoolean(enableSorting);
    const postsReducer: any = reduxState.getIn(["data", "posts", group]);

    const sortFirstByValue = (enableSortingValue && sortFirstBy !== "none") ? toNumber(sortFirstBy) : null;

    const postsFilters = postsReducer ?? {
        yearFilter: null,
        categoryFilter: null,
        countryFilter: null,
        page: 1,
        itemsPerPage: Number(numberOfItemsPerPage),
        isYearFilter: false,
        isCountryFilter: false,
        countryCategory: null,
        countryTaxonomy: null,
        categoryCategory: null,
        categoryTaxonomy: null,
        taxonomy: (taxonomy && taxonomy !== "none") ? taxonomy : undefined,
    };

    const generateFilters = () => {
        const yearFilters = postsFilters.yearFilter ? getStartDateAndEndDateFromYear(Number(postsFilters.yearFilter)) : null;
        const countryFilter = postsFilters.countryFilter ?? null;
        const categoryFilter = postsFilters.categoryFilter ?? null;

        // Prefer explicit taxonomy slugs captured by filter components; fall back to block prop taxonomy for category
        const categoryTaxonomy = postsFilters.categoryTaxonomy || ((taxonomy && taxonomy !== "none") ? taxonomy : null);
        const countryTaxonomy = postsFilters.countryTaxonomy || null;

        return {
            before: yearFilters?.endDate || null,
            after: yearFilters?.startDate || null,
            categoryFilter,
            categoryTaxonomy,
            countryFilter,
            countryTaxonomy,
        }
    };

    const getPosts = async () => {
        const filters = generateFilters();

        // Guard: require a post type to query
        if (!type) {
            console.warn("FilteredPosts: missing post type. Configure 'type' in block settings.");
            setPosts([]);
            setLoading(false);
            return;
        }

        setLoading(true);

        const taxonomyFilters = new Map<string, any>();

        // Category taxonomy and values
        if (filters.categoryTaxonomy && filters.categoryFilter != null) {
            taxonomyFilters.set(
                filters.categoryTaxonomy,
                Array.isArray(filters.categoryFilter) ? filters.categoryFilter : [filters.categoryFilter]
            );
        }

        // Country taxonomy and values
        if (filters.countryTaxonomy && filters.countryFilter != null) {
            taxonomyFilters.set(
                filters.countryTaxonomy,
                Array.isArray(filters.countryFilter) ? filters.countryFilter : [filters.countryFilter]
            );
        }

        await getCustomPosts({
            after: filters.after,
            before: filters.before,
            perPage: Number(numberOfItemsPerPage || 10),
            page: postsFilters.page || 1,
            locale: locale || "en",
            postType: type,
            // explicit undefineds for legacy params to satisfy types
            taxonomy: undefined,
            category: undefined,
            taxonomyFilters,
        }).then((response: any) => {
            if (response) {
                const { data, meta } = response;

                setPosts(data);
                const totalPages = meta && meta['x-wp-totalpages'] ? meta['x-wp-totalpages'] : 1;
                const totalItems = meta && meta['x-wp-total'] ? meta['x-wp-total'] : 0;

                if (totalPages && totalItems) {
                    dispatch({
                        type: 'SET_POSTS_PAGINATION',
                        group,
                        totalPages: Number(totalPages),
                        totalItems: Number(totalItems),
                    })
                }
            }
        }).finally(() => {
            setLoading(false);
        });
    }

    useEffect(() => {
        getPosts();
    }, [postsReducer, type, taxonomy, numberOfItemsPerPage]);


    return (
        <Container fluid>
            {
                loading ? (
                    <Loader active inline='centered' />
                ) : !loading && posts && posts.length > 0 ? (
                    <PostGridContent
                        posts={posts}
                        postWidth={Number(postWidth)}
                        postHeight={Number(postHeight)}
                        numberOfColumns={Number(numberOfColumns)}
                        sortFirstBy={sortFirstByValue}
                        countryCategory={sortingTaxonomy} />
                ) : (
                    <NoData noDataMsg="No posts found" />
                )
            }
        </Container>
    )
}

export default injectIntl(React.memo(FilteredPosts));