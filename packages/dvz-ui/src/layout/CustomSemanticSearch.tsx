import { Segment, SearchInput } from "@devgateway/ui";
import React from "react";
import clsx from "clsx";


const CustomSearch = (props) => {
    const { results, resultRenderer, onSearchChange, value, showNoResults, onResultSelect, loading } = props;
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
                    <div key={index} className="result" onClick={() => onResultSelect && onResultSelect(null, result)}>
                        {resultRenderer ? resultRenderer(result) : result.title}
                    </div>
                ))}
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

    const { aligned, category, className, fluid, size, searchTextHandler } = props;

    const classes = clsx(
        'ui',
        open && 'active visible',
        size,
        category && 'category',
        fluid && 'fluid',
        loading && 'loading',
        aligned && `${aligned} aligned`,
        'search',
        className
    );

    return (
        <SearchInput
            className={classes}
            placeholder={props.placeholder}
            onBlur={(e) => handleBlur(e, null)}
            onFocus={(e) => handleFocus(e, null)}
            onMouseDown={handleMouseDown}
            onSearchChange={onSearchChange}
            results={results}
            value={value}
            showNoResults={showNoResults}
            onResultSelect={onResultSelect}
            loading={loading}
            resultRenderer={resultRenderer}
            renderResults={results && results.length > 0 ? renderResults : undefined}
        />
    );
};

export default CustomSearch;