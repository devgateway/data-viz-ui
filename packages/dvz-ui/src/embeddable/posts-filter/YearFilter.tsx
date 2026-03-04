import React, { useEffect } from 'react';
import PostsFilterDropdown, { PostFilterDropdownProps } from './PostsFilterDropdown';
import { getYearRange } from '@devgateway/wp-react-lib';

interface YearFilterProps extends PostFilterDropdownProps {
    taxonomies?: any[] | null
    type?: string;
    yearOptions: any[] | null;
    setYearOptions: React.Dispatch<React.SetStateAction<any[]>>;
    yearFilterLoading: boolean;
    setYearFilterLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const YearFilter = (props: YearFilterProps) => {
    const {
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
        onChange,
        yearOptions,
        setYearOptions,
        yearFilterLoading,
        setYearFilterLoading,
        ...restProps
    } = props;

    const fetchYears = async () => {
        setYearFilterLoading(true);
        const response: any = await getYearRange();
        const data = response.data;
        const yearOptionsData = data.map((year: any) => ({
            key: year,
            value: year,
            text: year.toString()
        }));
        setYearFilterLoading(false);
        return yearOptionsData;
    }

    useEffect(() => {
        const fetchYearsData = async () => {
            const options = await fetchYears();
            setYearOptions(options);
        }
        fetchYearsData();
    }, []);

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
            onChange={onChange}
        />
    )
}

export default YearFilter