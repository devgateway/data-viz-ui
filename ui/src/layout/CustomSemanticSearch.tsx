import { Search, Segment, Input } from "semantic-ui-react";
import React from "react";
import clsx from "clsx";
import {
    getUnhandledProps,
    partitionHTMLProps,
    htmlInputAttrs,
    useKeyOnly,
    useValueAndKey,
    getComponentType
} from 'semantic-ui-react/dist/commonjs/lib'

// type SearchProps = typeof Search;

// type ExtendedSearchProps = SearchProps & React.HTMLProps<HTMLInputElement>;

// interface CustomSearchProps extends ExtendedSearchProps {
//     resultRenderer : React.ComponentType<any> | React.ReactNode | JSX.Element;
//     onSearchChange : (event: React.SyntheticEvent, data: any) => void;
//     value : string;
//     showNoResults : boolean;
//     onResultSelect : (event: React.SyntheticEvent, data: any) => void;
//     loading : boolean;
//     perPage : number;
//     total : number;
// }

const CustomSearch = (props) => {
    const { results, resultRenderer, onSearchChange, value, showNoResults, onResultSelect, loading } = props;
    const [searchClasses, setSearchClasses] = React.useState('');
    const [focus, setFocus] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const renderHeader = () => {
        const { perPage, total } = props;

        const classes = clsx(
            'results header',
            total === 1 && 'single'
        );

        return (
            <Segment color="blue" textAlign="left" className={classes}>
                <span>{total < perPage ? total : perPage} of {total} Results</span>
            </Segment>
        );
    };

    const renderResults = () => {
        return (
            <React.Fragment>
                {renderHeader()}
                {results.map((result, index) => (
                    <Search.Result key={index} {...result} />
                ))}
            </React.Fragment>
        );
    };

    const renderSearchInput = (htmlInputProps) => {
        // Assuming there is an existing renderSearchInput logic
        return <Input {...htmlInputProps} />;
    };

    const handleBlur = (e, data) => {
        setFocus(false);
        if (props.onBlur) {
            props.onBlur(e, data);
        }
    };

    const handleFocus = (e, data) => {
        setFocus(true);
        if (props.onFocus) {
            props.onFocus(e, data);
        }
    };

    const handleMouseDown = (e) => {
        setOpen(true);
        if (props.onMouseDown) {
            props.onMouseDown(e);
        }
    };

    const { aligned, category, className, fluid, size, searchTextHandler } = props;


    const classes = clsx(
        'ui',
        open && 'active visible',
        size,
        searchClasses,
        useKeyOnly(category, 'category'),
        useKeyOnly(fluid, 'fluid'),
        useKeyOnly(loading, 'loading'),
        useValueAndKey(aligned, 'aligned'),
        'search',
        className
    );


    const unhandled = getUnhandledProps(Search, props);
    // const ElementType = getComponentType(Search, props);
    const [htmlInputProps, rest] = partitionHTMLProps(unhandled, {
        htmlProps: htmlInputAttrs,
    });

    return (
        <>
            <Search
                {...rest}
                className={classes}
                onBlur={handleBlur}
                size="tiny"
                onFocus={handleFocus}
                onMouseDown={handleMouseDown}
                resultRenderer={resultRenderer}
                onSearchChange={onSearchChange}
                results={results}
                value={value}
                showNoResults={showNoResults}
                onResultSelect={onResultSelect}
                loading={loading}

            />
        </>

    );
};

export default CustomSearch;
