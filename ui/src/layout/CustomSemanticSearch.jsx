import { Search, Segment } from "semantic-ui-react";
import React from "react";
import clsx from "clsx";
import {
    getUnhandledProps,
    partitionHTMLProps,
    htmlInputAttrs
} from 'semantic-ui-react/dist/commonjs/lib'

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
                <Search.Result key={index} {...result} />
            </React.Fragment>
        );
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

    const { aligned, category, className, fluid, size } = props;


    const classes = clsx(
        'ui',
        open && 'active visible',
        size,
        searchClasses,
        // ...category ? 'category',
        // ...focus && 'focus',
        // ...fluid && 'fluid',
        // ...loading && 'loading',
        // ...aligned && aligned,
        'search',
        className
    );


    const unhandled = getUnhandledProps(Search, props);
    // const ElementType = lib.getComponentType(Search, props);
    const [htmlInputProps, rest] = partitionHTMLProps(unhandled, {
        htmlProps: htmlInputAttrs,
    });

    return (
        <div>
            <Search
                className={classes}
                onBlur={handleBlur}
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
            {/* <Search.Results>{renderResults()}</Search.Results> */}

        </div>

    );
};

export default CustomSearch;
