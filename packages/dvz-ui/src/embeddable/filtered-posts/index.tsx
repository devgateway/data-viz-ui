import React, { useEffect, useState, useRef } from 'react';
import type { PostType } from '@devgateway/wp-react-lib';
import { Container, Grid, GridRow, Loader, SemanticWIDTHS } from 'semantic-ui-react';
import PostIntro from "../connected-templates/PostIntro";
import FilteredPostIntro from './FilteredPostsIntro';
import { injectIntl, useIntl, WrappedComponentProps } from 'react-intl';
import { resolveWpApiBase } from './utils';
import NoData from './NoData';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomPosts } from '../reducers/data-api';
import { useParams } from 'react-router';
import { toBoolean, toNumber } from '@/utils/data';

interface PostGridContentProps {
    posts: PostType[];
    numberOfColumns: number;
    sortFirstBy: number | string | null;
    countryCategory: string;
    postWidth: number;
    postHeight: number;
    wordpressSourceType?: string;
    wordpressSource?: string;
    locale: string;
}

interface NormalizedFilterValues {
    values: number[];
    isExplicitNone: boolean;
}

const PostGridContent = (props: PostGridContentProps) => {
    const { posts, numberOfColumns, sortFirstBy, countryCategory, postWidth, postHeight, locale } = props;

    const allPosts: any[] = [];

    if (countryCategory && sortFirstBy && sortFirstBy !== 'none') {
        const countryPosts = posts.filter((post: any) => post[countryCategory].includes(Number(sortFirstBy)));
        const restPosts = posts.filter((post: any) => !post[countryCategory].includes(Number(sortFirstBy)));
        allPosts.push(...countryPosts);
        allPosts.push(...restPosts);

    }
    else {
        allPosts.push(...posts);
    }

    const isInternalSource = props.wordpressSourceType === "internal" || !props.wordpressSourceType;

    return (
        <Grid className={"filtered-posts"} columns={numberOfColumns as unknown as SemanticWIDTHS}>
            <GridRow>
                {
                    allPosts.map((post) => (
                        <Grid.Column key={post.id}>
                            <div className={"filtered-posts-column"} style={{ width: postWidth, height: postHeight, overflow: 'hidden' }}>
                                {isInternalSource ? (
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
                                ) : (
                                    <FilteredPostIntro
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
                                        locale={locale}
                                    />
                                )}

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
    "data-sort-first-by": number | string;
    "data-sorting-type": string;
    "data-sorting-taxonomy": string;
    "data-wordpress-source-type"?: string;
    "data-wordpress-source"?: string;
    "data-no-data-msg"?: string;
    "data-clear-filter-msg"?: string;
    editing?: boolean;
}



const FilteredPosts = (props: FilteredPostsProps) => {
    const {
        "data-group": group,
        "data-number-of-columns": numberOfColumns,
        "data-type": type,
        "data-taxonomy": taxonomy,
        "data-categories": categories = "[]",
        "data-height": _height,
        "data-post-width": postWidth,
        "data-post-height": postHeight,
        "data-number-of-items-per-page": numberOfItemsPerPage,
        "data-enable-sorting": enableSorting,
        "data-sort-first-by": sortFirstBy,
        "data-sorting-taxonomy": sortingTaxonomy,
        "data-wordpress-source-type": wordpressSourceType,
        "data-wordpress-source": wordpressSource,
        "data-no-data-msg": noDataMsg,
        "data-clear-filter-msg": clearFilterMsg,
        editing,
    } = props;


    const dispatch = useDispatch();
    const { locale } = useIntl();


    const [loading, setLoading] = useState(false);
    // Tracks the latest getPosts() call so responses from superseded calls are discarded.
    const requestIdRef = useRef(0);

    const postsReducer: any = useSelector((state: any) => state).getIn(["data", "posts", group]);
    const [posts, setPosts] = useState<any>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const [minHeight, setMinHeight] = useState<number | undefined>(undefined);
    const enableSortingValue = toBoolean(enableSorting);

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
        type: type,
        taxonomy: (taxonomy && taxonomy !== "none") ? taxonomy : undefined,
    };


    const normalizeFilterValues = (rawValue: any): NormalizedFilterValues => {
        if (rawValue == null) {
            return { values: [], isExplicitNone: false };
        }
        const values = Array.isArray(rawValue) ? rawValue : [rawValue];
        const isExplicitNone = values.some(
            (value) => Number(value) === Number.MIN_SAFE_INTEGER
        );
        const normalizedValues = values
            .map((value) => Number(value))
            .filter((value) => Number.isFinite(value) && value !== Number.MIN_SAFE_INTEGER);

        return {
            values: normalizedValues,
            isExplicitNone
        };
    };

    const buildYearsFilter = (years: number[]) => {
        if (!years || years.length === 0) {
            return null;
        }

        const uniqueSortedYears = Array.from(new Set(years))
            .map((year) => Number(year))
            .filter((year) => Number.isFinite(year) && year > 0)
            .sort((a, b) => a - b);

        return uniqueSortedYears.length > 0 ? uniqueSortedYears : null;
    };

    const generateFilters = () => {
        const normalizedYearFilter = normalizeFilterValues(postsFilters.yearFilter);
        const years = (!normalizedYearFilter.isExplicitNone)
            ? buildYearsFilter(normalizedYearFilter.values)
            : null;
        const countryFilter = postsFilters.countryFilter ?? null;
        const categoryFilter = postsFilters.categoryFilter ?? null;

        // Prefer explicit taxonomy slugs captured by filter components; fall back to block prop taxonomy for category
        const categoryTaxonomy = postsFilters.categoryTaxonomy || ((taxonomy && taxonomy !== "none") ? taxonomy : null);
        const countryTaxonomy = postsFilters.countryTaxonomy || null;

        return {
            years,
            categoryFilter,
            categoryTaxonomy,
            countryFilter,
            countryTaxonomy,
        }
    };

    const decode = (value: string) => {
        if (editing) {
            return value;
        }
        return decodeURIComponent(value)
    }

    const parse = (value: string) => {
        try {
            return JSON.parse(decode(value))
        } catch (error) {
            // If JSON parsing fails, return the decoded value as-is
            // This handles cases where the value is a plain comma-separated string like "300,302"
            console.warn("JSON parsing failed for value:", value, "- treating as plain string. Error:", error)
            return decode(value);
        }
    }

    const extractCategories = () => {
        const categoriesArray = parse(categories);
        if (!categoriesArray) return [];
        if (typeof categoriesArray === 'string') {
            return categoriesArray.split(',').map(Number);
        }

        if (typeof categoriesArray === 'number') {
            return [categoriesArray];
        }

        return categoriesArray
    }

    const getEffectiveCategoryValues = (configIds: number[], selectedIds: number[], isExplicitNone: boolean): number[] | null => {
        if (isExplicitNone) return null;
        if (configIds.length === 0) return selectedIds.length > 0 ? selectedIds : null;
        if (selectedIds.length === 0) return configIds;

        const configSet = new Set(configIds);
        const overlap = selectedIds.filter(id => configSet.has(id));
        return overlap.length > 0 ? overlap : null;
    };

    const getPosts = async () => {
        const requestId = ++requestIdRef.current;
        if (containerRef.current) {
            setMinHeight(containerRef.current.offsetHeight);
        }
        setLoading(true);
        const filters = generateFilters();

        const configCategoryIds = normalizeFilterValues(extractCategories()).values;
        const selectedCategory = normalizeFilterValues(filters.categoryFilter);
        const effectiveCategoryValues = getEffectiveCategoryValues(
            configCategoryIds,
            selectedCategory.values,
            selectedCategory.isExplicitNone
        );
        const selectedCountry = normalizeFilterValues(filters.countryFilter);

        // Only skip fetching if user explicitly selected "none" for categories
        // If no categories are configured and none are selected, we should fetch all posts
        if (selectedCategory.isExplicitNone) {
            setPosts([]);
            setLoading(false);
            return;
        }

        if (selectedCountry.isExplicitNone) {
            setPosts([]);
            setLoading(false);
            return;
        }

        const taxonomyFilters = new Map<string, any>();

        if (filters.categoryTaxonomy && effectiveCategoryValues && effectiveCategoryValues.length > 0) {
            taxonomyFilters.set(filters.categoryTaxonomy, effectiveCategoryValues);
        }

        if (filters.countryTaxonomy && selectedCountry.values.length > 0) {
            taxonomyFilters.set(filters.countryTaxonomy, selectedCountry.values);
        }

        const categoryValues = effectiveCategoryValues ? effectiveCategoryValues.join(',') : undefined;
        const args = {
            years: filters.years || undefined,
            after: undefined,
            before: undefined,
            perPage: Number(numberOfItemsPerPage || 10),
            page: postsFilters.page || 1,
            locale: locale || "en",
            postType: type,
            taxonomy: filters.categoryTaxonomy || undefined,
            category: categoryValues || undefined,
            taxonomyFilters,
            ordering: "date",
            orderingDirection: "desc",
            wpApiBase: wordpressSource ?? undefined,
        };

        await getCustomPosts(args).then((response: any) => {
            // Discard responses from superseded requests (stale-request race condition).
            if (requestId !== requestIdRef.current) return;
            if (response) {
                let postsData: any[] | null = null;
                let metaData: any = null;

                if (response && typeof response === 'object' && 'data' in response) {
                    postsData = response.data;
                    metaData = response.meta;
                } else if (Array.isArray(response)) {
                    postsData = response;
                } else {
                    postsData = response;
                }

                setPosts(Array.isArray(postsData) ? postsData : []);

                if (metaData) {
                    const totalPages = metaData['x-wp-totalpages'] ? metaData['x-wp-totalpages'] : 1;
                    const totalItems = metaData['x-wp-total'] ? metaData['x-wp-total'] : 0;

                    if (totalPages) {
                        dispatch({
                            type: 'SET_POSTS_PAGINATION',
                            group,
                            totalPages: Number(totalPages),
                            totalItems: Number(totalItems),
                        })
                    }
                }
            } else {
                setPosts([]);
            }
        }).finally(() => {
            // Only update loading state if this is still the latest request.
            if (requestId === requestIdRef.current) {
                setLoading(false);
                setMinHeight(undefined);
            }
        });
    }


    useEffect(() => {
        if (!type) return;
        (async () => {
            await getPosts();
        })();
    }, [postsReducer, type, taxonomy, numberOfItemsPerPage, categories, sortingTaxonomy]);


    return (
        <div ref={containerRef} id={`filtered-posts-${group}`} style={minHeight !== undefined ? { minHeight, border: '1px solid #e0e0e0', borderRadius: '4px' } : undefined}>
            <Container fluid>
                {
                    loading ? (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: minHeight ?? '100%' }}>
                            <Loader active inline='centered' />
                        </div>
                    ) : !loading && posts && posts.length > 0 ? (
                        <PostGridContent
                            posts={posts}
                            postWidth={Number(postWidth)}
                            postHeight={Number(postHeight)}
                            numberOfColumns={Number(numberOfColumns)}
                            sortFirstBy={sortFirstByValue}
                            countryCategory={sortingTaxonomy}
                            wordpressSourceType={wordpressSourceType}
                            wordpressSource={wordpressSource}
                            locale={locale}
                        />
                    ) : (
                        <NoData noDataMsg={noDataMsg} clearFilterMsg={clearFilterMsg} group={group} />
                    )
                }
            </Container>
        </div>
    )
}

export default injectIntl(React.memo(FilteredPosts));