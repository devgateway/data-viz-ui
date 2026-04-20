import React, { useEffect, useMemo, useState } from "react";
import {
    Container
} from "semantic-ui-react";
import { toBoolean, toNumber } from '@/utils/data';
import { useAppDispatch } from "@/redux/hooks";
import { useSelector } from "react-redux";
import CategoricalFilter from "./CategoricalFilter";
import YearFilter from "./YearFilter";
import { injectIntl, useIntl, WrappedComponentProps } from "react-intl";

interface PostsFilterProps extends  WrappedComponentProps {
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
    "data-default-values"?: string;
    "data-wordpress-source-type"?: string;
    "data-wordpress-source"?: string;
    editing?: boolean;
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
        "data-categories": categories = "[]",
        "data-is-country-filter": isCountryFilter,
        "data-is-year-filter": isYearFilter,
        "data-type": type,
        "data-sort-first-by": sortFirstBy,
        "data-default-values": defaultValues = "[]",
        "data-wordpress-source-type": wordpressSourceType,
        "data-wordpress-source": wordpressSource,
        editing = false
    } = props;

    const dispatch = useAppDispatch();
    const { locale } = useIntl();
    const filters: any = useSelector((state: any) => state.getIn(["data", "posts", group]));
    const postsFilters = filters || {};
    const isMultiSelectFilter = filterType === "multi-select";
    const [resetKey, setResetKey] = useState(0);

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
    let defaultValuesArray = parse(defaultValues);
    if (!defaultValuesArray) {
        defaultValuesArray = [];
    }
    if (typeof defaultValuesArray === 'string') {
        defaultValuesArray = defaultValuesArray.split(',').map(Number);
    }
    if (typeof defaultValuesArray === 'number') {
        defaultValuesArray = [defaultValuesArray];
    }
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

    const [yearOptions, setYearOptions] = useState<any>([]);
    const [yearFilterLoading, setYearFilterLoading] = useState<boolean>(false);

    // Helper function to normalize filter values
    const normalizeFilterValue = (value: any, isMulti: boolean): any => {
        if (isMulti) {
            return Array.isArray(value) ? value : (value !== null && value !== undefined ? [value] : []);
        }
        return value || undefined;
    };

    // Memoize normalized filter values to prevent unnecessary re-renders
    const normalizedCountryFilter = useMemo(
        () => normalizeFilterValue(postsFilters.countryFilter, isMultiSelectFilter),
        [postsFilters.countryFilter, isMultiSelectFilter]
    );
    const normalizedCategoryFilter = useMemo(
        () => normalizeFilterValue(postsFilters.categoryFilter, isMultiSelectFilter),
        [postsFilters.categoryFilter, isMultiSelectFilter]
    );
    const normalizedYearFilter = useMemo(
        () => isYearFilterValue ? normalizeFilterValue(postsFilters.yearFilter, isMultiSelectFilter) : undefined,
        [postsFilters.yearFilter, isMultiSelectFilter, isYearFilterValue]
    );

    const categoriesArray = useMemo(
        () => categories ? categories.split(',') : [],
        [categories]
    );


    const handleYearChange = (value: any) => {
        dispatch({
            type: "SET_POSTS_FILTER",
            group,
            ...postsFilters,
            isYearFilter: isYearFilterValue,
            yearFilter: isYearFilterValue ? value : null,
            isCountryFilter: isCountryFilterValue,
            categoryFilter: postsFilters.categoryFilter,
            countryFilter: postsFilters.countryFilter,
            sortFirstBy: sortFirstByValue,
        });
    }

    const handleCategoryChange = (value: string) => {
        dispatch({
            type: "SET_POSTS_FILTER",
            group,
            ...postsFilters,
            // Preserve both filters so they can work together
            categoryFilter: isCountryFilterValue ? postsFilters.categoryFilter : value,
            countryFilter: isCountryFilterValue ? value : postsFilters.countryFilter,
            isYearFilter: postsFilters.isYearFilter,
            yearFilter: postsFilters.yearFilter,
            isCountryFilter: postsFilters.isCountryFilter,
            sortFirstBy: isCountryFilterValue ? sortFirstByValue : postsFilters.sortFirstBy,
            countryCategory: isCountryFilterValue ? taxonomy : postsFilters.countryCategory,
            categoryCategory: isCountryFilterValue ? postsFilters.categoryCategory : value,
            categoryTaxonomy: isCountryFilterValue ? postsFilters.categoryTaxonomy : taxonomy,
            countryTaxonomy: isCountryFilterValue ? taxonomy : postsFilters.countryTaxonomy
        });
    }


    useEffect(() => {
        const hasDefaultValues = defaultValuesArray.length > 0;
        const defaultValue = isMultiSelectFilter ? defaultValuesArray : defaultValuesArray[0];

        const categoryFilter = !isCountryFilterValue
            ? (hasDefaultValues
                ? defaultValue
                : (isMultiSelectFilter ? categoriesArray.map(Number) : postsFilters.categoryFilter))
            : postsFilters.categoryFilter;

        const countryFilter = isCountryFilterValue
            ? (hasDefaultValues
                ? defaultValue
                : (isMultiSelectFilter ? categoriesArray.map(Number) : postsFilters.countryFilter))
            : postsFilters.countryFilter;

        const yearFilter = isYearFilterValue ?
            (isMultiSelectFilter ? yearOptions.length > 0 ? yearOptions.map((year: any) => year.value) : [] : postsFilters.yearFilter)
            : postsFilters.yearFilter;

        dispatch({
            type: "SET_INITIAL_POSTS_FILTER",
            group,
            categoryFilter,
            countryFilter,
            isYearFilter: isYearFilterValue,
            isCountryFilter: isCountryFilterValue,
            sortFirstBy: sortFirstByValue,
            yearFilter: isYearFilterValue ? yearFilter : null,
            categoryCategory: !isCountryFilterValue ? postsFilters.categoryCategory : null,
            categoryTaxonomy: !isCountryFilterValue ? taxonomy : null,
            countryCategory: isCountryFilterValue ? taxonomy : null,
            countryTaxonomy: isCountryFilterValue ? taxonomy : null,
            page: 1
        });

    }, []);

    useEffect(() => {
        if (isYearFilterValue && !yearFilterLoading) {


            const yearFilter = isYearFilterValue ?
                (isMultiSelectFilter ? yearOptions.length > 0 ? yearOptions.map((year: any) => year.value) : [] : postsFilters.yearFilter)
                : postsFilters.yearFilter;

            dispatch({
                type: "SET_INITIAL_POSTS_FILTER",
                group,
                ...postsFilters,
                isYearFilter: isYearFilterValue,
                yearFilter: isYearFilterValue ? yearFilter : null,
            });
        }

    }, [yearFilterLoading]);


    return (
        <Container fluid className="filter post-filter">
            {isYearFilterValue && (
                <YearFilter
                    // key={`year-filter-${group}`}
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
                    alphabeticalSort={alphabeticalSortValue}
                    ascOrder={ascOrderValue}
                    options={yearOptions}
                    value={normalizedYearFilter}
                    yearOptions={yearOptions}
                    setYearOptions={setYearOptions}
                    yearFilterLoading={yearFilterLoading}
                    setYearFilterLoading={setYearFilterLoading}
                    onChange={(_e, value) => {
                        handleYearChange(value as any);
                    }}
                    resetKey={resetKey}
                    wpApiBase={wordpressSource ?? undefined}
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
                        value={isCountryFilterValue ? normalizedCountryFilter : normalizedCategoryFilter}
                        onChange={(_e, value) => {
                            handleCategoryChange(value as any);
                        }}
                        categories={categoriesArray}
                        resetKey={resetKey}
                        wpApiBase={wordpressSource ?? undefined}
                        locale={locale}
                    />

                )
            }
        </Container>


    );
}

export default injectIntl(React.memo(PostsFilter));
