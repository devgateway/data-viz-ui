import { Search, Segment } from "semantic-ui-react";
import React from "react";
import clsx from "clsx";
import * as lib from 'semantic-ui-react/dist/commonjs/lib';

const CustomSearch = (props) => {
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
        const { results } = props;
        return (
            <React.Fragment>
                {renderHeader()}
                {results && (
                    <div>
                        {results.map((result, index) => (
                            <Search.Result key={index} {...result} />
                        ))}
                    </div>
                )}
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

    const { aligned, category, className, fluid, loading, size } = props;

    const classes = clsx(
        'ui',
        open && 'active visible',
        size,
        searchClasses,
        lib.useKeyOnly(category, 'category'),
        lib.useKeyOnly(focus, 'focus'),
        lib.useKeyOnly(fluid, 'fluid'),
        lib.useKeyOnly(loading, 'loading'),
        lib.useValueAndKey(aligned, 'aligned'),
        'search',
        className
    );

    const unhandled = lib.getUnhandledProps(Search, props);
    const ElementType = lib.getElementType(Search, props);
    const [htmlInputProps, rest] = lib.partitionHTMLProps(unhandled, {
        htmlProps: lib.htmlInputAttrs,
    });

    return (
        <ElementType
            className={classes}
            onBlur={handleBlur}
            onFocus={handleFocus}
            onMouseDown={handleMouseDown}
        >
            <Search.Input {...htmlInputProps} />
            <Search.Results>{renderResults()}</Search.Results>
        </ElementType>
    );
};

export default CustomSearch;
