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
import { injectIntl, useIntl } from "react-intl";
import { utils } from "@devgateway/wp-react-lib";


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

const ResultRenderer = injectIntl(({
    ID,
    title,
    slug,
    parent_title,
    parent_slug,
    parent_link,
    extract,
    type,
    link,
    terms,
    subtype,
    bread_crumbs = [],
    intl: { locale }
}) => {

    


    const target = parent_link ? utils.replaceLink(parent_link, locale) + `#${slug}` : utils.replaceLink(link, locale)
    // target = metadata?.redirect_url ? redirect_url + `#${slug}` : target


    return (
        <div className="search-results-wrapper searching-results" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className={"has-standard-12-font-size"} onClick={e => document.location.href = target}>
                <h5 className="breadcrumbs-search">{Array.isArray(bread_crumbs) && bread_crumbs.length > 0 ? bread_crumbs.join(' / ') : ''}</h5>
                <div className={"has-standard-14-font-size"}><h4 className="search-title">{String(title)}</h4></div>
                <div className='search-content'
                    dangerouslySetInnerHTML={{ __html: utils.replaceHTMLinks(extract, locale) }} />
            </div>
        </div>
    )
})

const CustomSearch = (props) => {
    const { results, resultRenderer, onSearchChange, value, showNoResults, onResultSelect, loading, placeholder, perPage, total } = props;
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
        console.log('res', res);

        if (res.isHeader) {
            return renderHeader();
        }

        return (
            <React.Fragment>
                <ResultRenderer {...res} />
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
        useKeyOnly(focus, 'focus'),
        useKeyOnly(fluid, 'fluid'),
        useKeyOnly(loading, 'loading'),
        useValueAndKey(aligned, 'aligned'),
        'search',
        className
    );


    const unhandled = getUnhandledProps(Search, props);
    const ElementType = getComponentType(Search, props);
    const [htmlInputProps, rest] = partitionHTMLProps(unhandled, {
        htmlProps: htmlInputAttrs,
    });


    return (
        <>

            <Search
                {...rest}
                as={Input}
                className={classes}
                onBlur={handleBlur}
                size="mini"
                aligned="left"
                placeholder={placeholder}
                onFocus={handleFocus}
                onMouseDown={handleMouseDown}
                resultRenderer={(res) => renderResults(res)}
                onSearchChange={onSearchChange}
                results={augmentedResults}
                input={renderSearchInput(htmlInputProps)}
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
