import React, { useEffect, useState } from "react";
import PostsFilterDropdown, { PostFilterDropdownProps } from "./PostsFilterDropdown";
import { Config } from "@/conf";

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
        ...restProps
    } = props;

    const [taxonomyOptions, setTaxonomyOptions] = useState([]);


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

    const categoriesKey = JSON.stringify(categories);
    useEffect(() => {
        let ignore = false;
        if (!ignore) {
            getPostTypeBySlug();
        }
        // cleanup
        return () => {
            ignore = true;
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type, taxonomy, categoriesKey]);

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