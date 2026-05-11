import React, { useEffect, useState } from "react";
import PostsFilterDropdown, { PostFilterDropdownProps } from "./PostsFilterDropdown";
import { Config } from "@/conf";

interface CategoricalFilterProps extends PostFilterDropdownProps {
    taxonomies?: any[] | null
    type?: string;
    categories?: any[] | null;
    wpApiBase?: string;
    locale?: string;
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
        wpApiBase,
        locale,
        ...restProps
    } = props;

    const [taxonomyOptions, setTaxonomyOptions] = useState([]);

    const getPostTypeBySlug = async () => {
        if (!taxonomy || taxonomy === "none") {
            setTaxonomyOptions([]);
            return;
        };

        const hasApiBase = wpApiBase !== undefined && wpApiBase !== null && wpApiBase !== "";
        const apiBase = hasApiBase ? wpApiBase : Config.REACT_APP_WP_API; 
        const langParam = locale ? `?lang=${locale}` : "?lang=en";
        const response: any = await fetch(apiBase + "/wp/v2/" + taxonomy + langParam);
        const data = await response.json();

        if (data) {
            const taxonomyOptions = data.map((taxonomy: any) => ({
                key: taxonomy.id,
                value: taxonomy.id,
                text: taxonomy.name
            }));
            if (categories) {
                const filteredTaxonomyOptions = taxonomyOptions.filter((option: any) => categories.indexOf(option.value.toString()) > -1);
                setTaxonomyOptions([])
                setTaxonomyOptions(filteredTaxonomyOptions);
            } else {
                setTaxonomyOptions([]);
                setTaxonomyOptions(taxonomyOptions);
            }
        }
    }

    useEffect(() => {
        let ignore = false;
        if (!ignore) {
            setTaxonomyOptions([]);
            getPostTypeBySlug();
        }
        // cleanup
        return () => {
            ignore = true;
        }
    }, [type, taxonomy, categories, wpApiBase, locale]);

    return (
        <PostsFilterDropdown
            {...restProps}
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

export default CategoricalFilter;