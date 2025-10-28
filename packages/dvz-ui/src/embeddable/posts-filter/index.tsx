import React, { useEffect, useRef, useState } from "react";
import {
    Container
} from "semantic-ui-react";
import { toBoolean, toNumber } from '@/utils/data';
import { getYearRange } from "@devgateway/wp-react-lib/api";
import PostsFilterDropdown from "./PostsFilterDropdown";
import type { PostFilterDropdownProps } from "./PostsFilterDropdown";
import { Config } from "@/conf";
import { useAppDispatch } from "@/redux/hooks";
import { useSelector } from "react-redux";


interface CategoricalFilterProps extends PostFilterDropdownProps {
    taxonomies?: any[] | null
    type?: string;
    categories?: any[] | null;
}

const CategoricalFilter = (props: CategoricalFilterProps) => {
    const {
        taxonomy,
        group,
        placeholder,
        allLabel,
        noneLabel,
        useSingleColumn,
        enableTextSearch,
        filterType,
        showNoDataOption,
        closeOnSelect,
        allNoneSameBehaviour,
        autoApply,
        alphabeticalSort,
        ascOrder,
        type,
        categories,
        onChange,
    } = props;

    const [taxonomyOptions, setTaxonomyOptions] = useState([]);

    // const dispatch = useAppDispatch();


    const getPostTypeBySlug = async () => {
        if (!taxonomy || taxonomy === "none") {
            setTaxonomyOptions([]);
            return;
        };

        const response: any = await fetch(Config.REACT_APP_WP_API + "/wp/v2/" + taxonomy);
        const data = await response.json();

        if (data) {
            const taxonomyOptions = data.map((taxonomy: any) => ({
                key: taxonomy.id,
                value: taxonomy.id,
                text: taxonomy.name
            }));
            if (categories) {
                const filteredTaxonomyOptions = taxonomyOptions.filter((option: any) => categories.indexOf(option.value.toString()) > -1);
                setTaxonomyOptions(filteredTaxonomyOptions);
            } else {
                setTaxonomyOptions(taxonomyOptions);
            }
        }

    }

    useEffect(() => {
        getPostTypeBySlug();
        // cleanup
        return () => {
            setTaxonomyOptions([]);
        }
    }, [type]);

    return (
        <PostsFilterDropdown
            {...props}
            group={group}
            placeholder={placeholder}
            allLabel={allLabel}
            noneLabel={noneLabel}
            useSingleColumn={useSingleColumn}
            enableTextSearch={enableTextSearch}
            filterType={filterType}
            showNoDataOption={showNoDataOption}
            closeOnSelect={closeOnSelect}
            allNoneSameBehaviour={allNoneSameBehaviour}
            autoApply={autoApply}
            alphabeticalSort={alphabeticalSort}
            ascOrder={ascOrder}
            options={taxonomyOptions}
            onChange={onChange}

        />
    )
}


interface PostsFilterProps {
    "data-alphabetical-sort": boolean | string;
    "data-asc-order": boolean | string;
    "data-group": string;
    "data-placeholder"?: string;
    "data-all-label"?: string;
    "data-none-label"?: string;
    "data-use-single-column"?: boolean | string;
    "data-enable-text-search"?: boolean | string;
    "data-filter-type"?: string;
    "data-show-no-data-option"?: boolean | string;
    "data-close-on-select"?: boolean | string;
    "data-all-none-same-behaviour"?: boolean | string;
    "data-auto-apply"?: boolean | string;
    "data-taxonomy"?: string;
    "data-categories"?: string;
    "data-is-country-filter"?: boolean | string;
    "data-is-year-filter"?: boolean | string;
    "data-selected-year"?: number | string;
    "data-type"?: string;
    "data-sort-first-by"?: string;
}
const PostsFilter = (props: PostsFilterProps) => {
    const {
        "data-alphabetical-sort": alphabeticalSort,
        "data-asc-order": ascOrder,
        "data-group": group,
        "data-placeholder": placeholder,
        "data-all-label": allLabel,
        "data-none-label": noneLabel,
        "data-use-single-column": useSingleColumn,
        "data-enable-text-search": enableTextSearch,
        "data-filter-type": filterType,
        "data-show-no-data-option": showNoDataOption,
        "data-close-on-select": closeOnSelect,
        "data-all-none-same-behaviour": allNoneSameBehaviour,
        "data-auto-apply": autoApply,
        "data-taxonomy": taxonomy,
        "data-categories": categories,
        "data-is-country-filter": isCountryFilter,
        "data-is-year-filter": isYearFilter,
        "data-type": type,
        "data-sort-first-by": sortFirstBy
    } = props;

    const dispatch = useAppDispatch();
    const filters: any = useSelector((state: any) => state.getIn(["data", "posts", group]));
    const postsFilters = filters || {};
    const isMultiSelectFilter = filterType === "multi-select";
    const resetKey = useRef(0);

    const alphabeticalSortValue = toBoolean(alphabeticalSort);
    const ascOrderValue = toBoolean(ascOrder);
    const showNoDataOptionValue = toBoolean(showNoDataOption);
    const closeOnSelectValue = toBoolean(closeOnSelect);
    const allNoneSameBehaviourValue = toBoolean(allNoneSameBehaviour);
    const autoApplyValue = toBoolean(autoApply);
    const isCountryFilterValue = toBoolean(isCountryFilter);
    const isYearFilterValue = toBoolean(isYearFilter);
    const useSingleColumnValue = toBoolean(useSingleColumn);
    const enableTextSearchValue = toBoolean(enableTextSearch);
    const sortFirstByValue = (sortFirstBy !== 'none') ? toNumber(sortFirstBy) : null;


    const [yearOptions, setYearOptions] = useState([]);
    const [selectedYear, setSelectedYear] = useState<any>(
        isMultiSelectFilter
            ? (Array.isArray(postsFilters.yearFilter) ? postsFilters.yearFilter : (postsFilters.yearFilter != null ? [postsFilters.yearFilter] : []))
            : (postsFilters.yearFilter || undefined)
    );
    const [selectedCountry, setSelectedCountry] = useState<any>(
        isMultiSelectFilter
            ? (Array.isArray(postsFilters.countryFilter) ? postsFilters.countryFilter : (postsFilters.countryFilter != null ? [postsFilters.countryFilter] : []))
            : (postsFilters.countryFilter || undefined)
    );
    const [selectedCategory, setSelectedCategory] = useState<any>(
        isMultiSelectFilter
            ? (Array.isArray(postsFilters.categoryFilter) ? postsFilters.categoryFilter : (postsFilters.categoryFilter != null ? [postsFilters.categoryFilter] : []))
            : (postsFilters.categoryFilter || undefined)
    );

    useEffect(() => {
        setSelectedYear(postsFilters.yearFilter || undefined);
        if (isMultiSelectFilter) {
            setSelectedCountry(Array.isArray(postsFilters.countryFilter) ? postsFilters.countryFilter : (postsFilters.countryFilter != null ? [postsFilters.countryFilter] : []));
            setSelectedCategory(Array.isArray(postsFilters.categoryFilter) ? postsFilters.categoryFilter : (postsFilters.categoryFilter != null ? [postsFilters.categoryFilter] : []));
        } else {
            setSelectedCountry(postsFilters.countryFilter || undefined);
            setSelectedCategory(postsFilters.categoryFilter || undefined);
        }
    }, [postsFilters, isMultiSelectFilter]);


    const handleYearChange = (value: string) => {
        dispatch({
            type: "SET_POSTS_FILTER",
            group,
            isYearFilter: isYearFilterValue,
            yearFilter: value,
            isCountryFilter: isCountryFilterValue,
            categoryFilter: postsFilters.categoryFilter,
            countryFilter: postsFilters.countryFilter,
            sortFirstBy: sortFirstByValue,
            countryCategory: taxonomy,
            categoryTaxonomy: taxonomy,
            countryTaxonomy: taxonomy
        });
    }

    const handleCategoryChange = (value: string) => {
        if (isCountryFilterValue) {
            setSelectedCountry(value);
        } else {
            setSelectedCategory(value);
        }

        dispatch({
            type: "SET_POSTS_FILTER",
            group,
            // Preserve both filters so they can work together
            categoryFilter: isCountryFilterValue ? postsFilters.categoryFilter : value,
            countryFilter: isCountryFilterValue ? value : postsFilters.countryFilter,
            yearFilter: postsFilters.yearFilter,
            isYearFilter: isYearFilterValue,
            isCountryFilter: isCountryFilterValue,
            sortFirstBy: isCountryFilterValue ? sortFirstByValue : postsFilters.sortFirstBy,
            countryCategory: isCountryFilterValue ? taxonomy : postsFilters.countryCategory,
            categoryCategory: isCountryFilterValue ? postsFilters.categoryCategory : value,
            categoryTaxonomy: isCountryFilterValue ? postsFilters.categoryTaxonomy : taxonomy,
            countryTaxonomy: isCountryFilterValue ? taxonomy : postsFilters.countryTaxonomy
        });
    }


    useEffect(() => {
        const categoryFilter = !isCountryFilterValue
            ? (isMultiSelectFilter ? categories ? categories.split(',').map(Number) : [] : postsFilters.categoryFilter)
            : postsFilters.categoryFilter;
        const countryFilter = isCountryFilterValue
            ? (isMultiSelectFilter ? categories ? categories.split(',').map(Number) : [] : postsFilters.countryFilter)
            : postsFilters.countryFilter;

        dispatch({
            type: "SET_INITIAL_POSTS_FILTER",
            group,
            categoryFilter,
            countryFilter,
            isYearFilter: isYearFilterValue,
            isCountryFilter: isCountryFilterValue,
            sortFirstBy: sortFirstByValue,
            categoryCategory: !isCountryFilterValue ? postsFilters.categoryCategory : null,
            categoryTaxonomy: !isCountryFilterValue ? taxonomy : null,
            countryCategory: isCountryFilterValue ? postsFilters.countryCategory : null,
            countryTaxonomy: isCountryFilterValue ? taxonomy : null
        })
    }, [group]);

    useEffect(() => {
        if (isYearFilterValue) {
            fetchYears();
        }

    }, [isYearFilterValue]);

    const fetchYears = async () => {
        const response: any = await getYearRange();
        const data = response.data;
        const yearOptions = data.map((year: any) => ({
            key: year,
            value: year,
            text: `Year ${year}`
        }));
        setYearOptions(yearOptions || []);
    }

    return (
        <Container fluid className="filter">
            {isYearFilterValue && (
                <PostsFilterDropdown group={group}
                    placeholder={placeholder}
                    allLabel={allLabel}
                    noneLabel={noneLabel}
                    useSingleColumn={useSingleColumnValue}
                    enableTextSearch={enableTextSearchValue}
                    filterType={filterType}
                    showNoDataOption={showNoDataOptionValue}
                    closeOnSelect={closeOnSelectValue}
                    allNoneSameBehaviour={allNoneSameBehaviourValue}
                    autoApply={autoApplyValue}
                    alphabeticalSort={alphabeticalSortValue}
                    ascOrder={ascOrderValue}
                    options={yearOptions}
                    taxonomy={taxonomy}
                    type={type}
                    value={selectedYear}
                    onChange={(_e, value) => {
                        handleYearChange(value as any);
                    }}
                    resetKey={resetKey.current}
                />
            )}
            {
                !isYearFilterValue && (
                    <CategoricalFilter
                        key={`cat-${group}`}
                        group={group}
                        placeholder={placeholder}
                        allLabel={allLabel}
                        noneLabel={noneLabel}
                        useSingleColumn={useSingleColumnValue}
                        enableTextSearch={enableTextSearchValue}
                        filterType={filterType}
                        showNoDataOption={showNoDataOptionValue}
                        closeOnSelect={closeOnSelectValue}
                        allNoneSameBehaviour={allNoneSameBehaviourValue}
                        autoApply={autoApplyValue}
                        taxonomy={taxonomy}
                        type={type}
                        value={isMultiSelectFilter
                            ? (isCountryFilterValue ? selectedCountry : selectedCategory)
                            : (isCountryFilterValue ? selectedCountry : selectedCategory)
                        }
                        onChange={(_e, value) => {
                            handleCategoryChange(value as any);
                        }}
                        categories={categories ? categories.split(',') : []}
                        resetKey={resetKey.current}
                    />

                )
            }
        </Container>


    );
}

export default PostsFilter;