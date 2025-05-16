import { Search, Segment, Input } from "semantic-ui-react";
import React from "react";
import clsx from "clsx";
import {
    useKeyOnly,
    useValueAndKey,
} from 'semantic-ui-react/src/lib/classNameBuilders';
import { partitionHTMLProps, htmlInputAttrs, } from 'semantic-ui-react/src/lib/htmlPropsUtils';
import getUnhandledProps from 'semantic-ui-react/src/lib/getUnhandledProps';
import { injectIntl, useIntl } from "react-intl";
import { utils } from "@devgateway/wp-react-lib";


const boldSearchTerm = (text, searchTerm) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<strong>$1</strong>');
}
  

const ResultRenderer = injectIntl(({
    title,
    slug,
    parent_link,
    extract,
    link,
    searchTerm,
    metadata,
    bread_crumbs = [],
    intl: { locale }
}) => {
    let target = parent_link ? utils.replaceLink(parent_link, locale) + `#${slug}` : utils.replaceLink(link, locale);
    // @ts-ignore
    target = metadata?.redirect_url ? metadata?.redirect_url + `#${slug}` : target


    const boldedTitle = boldSearchTerm(String(title), searchTerm);
    const boldedExtract = boldSearchTerm(extract, searchTerm);

    return (
        <div className="search-results-wrapper searching-results" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className={"has-standard-12-font-size"} onClick={() => document.location.href = target}>
                <h5 className="breadcrumbs-search"
                    dangerouslySetInnerHTML={{ __html: Array.isArray(bread_crumbs) && bread_crumbs.length > 0 ? boldSearchTerm(bread_crumbs.join(' / '), searchTerm) : '' }}
                />
                <div className={"has-standard-14-font-size"}><h4 className="search-title" dangerouslySetInnerHTML={{ __html: boldedTitle }} /></div>
                <div className='has-standard-12-font-size search-content'
                    dangerouslySetInnerHTML={{ __html: utils.replaceHTMLinks(boldedExtract, locale) }} />
            </div>
        </div>
    )
})

const CustomSearch = (props) => {
    const { results, onSearchChange, value, showNoResults, onResultSelect, loading, placeholder, perPage, total, searchTerm } = props;
    const intl = useIntl()
    const [searchClasses, setSearchClasses] = React.useState('');
    const [focus, setFocus] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const augmentedResults = results && results.length > 0
        ? [{
            isHeader: true, headerText: intl.formatMessage({
                id: 'search.results.summary',
                defaultMessage: '{count} of {} Results'
            }, {
                count: total < perPage ? total : perPage, total: total
            })
        }, ...results]
        : [];


    const renderHeader = () => {
        const { perPage, total } = props;

        const classes = clsx(
            'results header',
            total === 1 && 'single'
        );

        return (
            <Segment basic textAlign="left" className={classes}>
                {intl.formatMessage({
                    id: 'search.results.summary',
                    defaultMessage: '{count} of {} Results'
                }, {
                    count: total < perPage ? total : perPage, total: total
                })}
            </Segment>
        );
    };

    const renderResults = (res) => {

        if (res.isHeader) {
            return renderHeader();
        }

        console.log("res", res);

        return (
            <React.Fragment>
                <ResultRenderer {...res} searchTerm={searchTerm} />
            </React.Fragment>
        );
    };

    const renderSearchInput = (htmlInputProps?: any) => {
        // Assuming there is an existing renderSearchInput logic
        return <Input icon="search" placeholder={placeholder} {...htmlInputProps} />;
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
        open && 'active',
        size,
        searchClasses,
        useKeyOnly(category, 'category'),
        useKeyOnly(focus, 'focus'),
        useKeyOnly(fluid, 'fluid'),
        useKeyOnly(loading, 'loading'),
        useValueAndKey(aligned, 'aligned'),
        'search',
        className
    );


    const unhandled = getUnhandledProps(Search, props);
    const [htmlInputProps, rest] = partitionHTMLProps(unhandled, {
        htmlProps: htmlInputAttrs,
    });

    console.log("classes", classes);


    return (
        <>

            <Search
                {...rest}
                className={classes}
                onBlur={handleBlur}
                size="mini"
                aligned
                placeholder={placeholder}
                onFocus={handleFocus}
                onMouseDown={handleMouseDown}
                resultRenderer={(res) => renderResults(res)}
                onSearchChange={onSearchChange}
                results={augmentedResults}
                input={renderSearchInput()}
                value={value}
                showNoResults={showNoResults}
                onResultSelect={onResultSelect}
                loading={loading}
                header={renderHeader()}

            >
            </Search>
        </>

    );
};

export default CustomSearch;
