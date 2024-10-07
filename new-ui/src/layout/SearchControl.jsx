import React, {useEffect, useState} from "react";
import CustomSearch from './CustomSemanticSearch.jsx'
import SearchProvider from "@devgateway/wp-react-lib/dist/providers/SearchProvider";
import SearchConsumer from "@devgateway/wp-react-lib/dist/consumers/SearchConsumer";
import {injectIntl} from "react-intl";
import {utils} from "@devgateway/wp-react-lib";
import CustomSemanticSearch from "./CustomSemanticSearch.jsx";


const resultRenderer = injectIntl(({
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
                                       metadata: {redirect_url},
                                       intl: {locale}
                                   }) => {


    let target = parent_link ? utils.replaceLink(parent_link, locale) + `#${slug}` : utils.replaceLink(link, locale)
    target = redirect_url ? redirect_url + `#${slug}` : target



    return (
        <div className={"has-standard-12-font-size"} onClick={e => document.location.href = target}>
            <h5>{bread_crumbs && bread_crumbs.length > 0 ? `${bread_crumbs.join(' / ')}` : ''} </h5>
            <div className={"has-standard-14-font-size"}><h4>{title}</h4></div>
            <div className='search-content' dangerouslySetInnerHTML={{__html: utils.replaceHTMLinks(extract, locale)}}/>
            <br/>
        </div>
    )
})

const replaceString = (content, words) => {
    const regex = RegExp(words, 'gi')
    let newHTML = content
    const instances = [...(newHTML.matchAll(regex))]
    let shift = 0
    const lengthBeforeChange = newHTML.length
    instances.forEach(instance => {
        const replacement = '<b>' + newHTML.substring(instance.index + shift, instance.index + shift + words.length) + '</b>';
        newHTML = newHTML.substring(0, instance.index + shift) + replacement + newHTML.substring(instance.index + words.length + shift);
        shift = newHTML.length - lengthBeforeChange;
    })

    return newHTML;
}

const searchTextHandler = (words) => {
    let searchedPara = document.querySelector('.results');
    const searchResultHeading = searchedPara = searchedPara = document.querySelectorAll('H5')
    const searchResult = searchedPara = searchedPara = document.querySelectorAll('.search-content')
    for (let i = 0; i < searchResult.length; i++) {
        if (searchResult[i]) {
            searchResult[i].innerHTML = replaceString(searchResult[i].textContent, words);
        }
    }

    for (let i = 0; i < searchResultHeading.length; i++) {
       if (searchResultHeading[i]) {
            searchResultHeading[i].innerHTML = replaceString(searchResultHeading[i].textContent, words);
      }
    }
}


const SearchControl = ({onSearch,perPage, loading, results, meta, locale}) => {
    const total = meta ? meta['x-wp-total'] : 0
    const totalPages = meta ? meta['x-wp-totalpages'] : 0

    const placeholder = locale === 'fr' ? 'Recherche...' : 'Search...';

    const [searchTerm, setSearchTerm] = useState('')
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            onSearch(searchTerm)
        }, 300)

        return () => clearTimeout(delayDebounceFn)
    }, [searchTerm])


    useEffect(() => searchTextHandler(searchTerm), [results])

    return (<CustomSemanticSearch
            value={searchTerm}
            loading={loading}
            placeholder={placeholder}
            onResultSelect={(e, data) => null}
            total={total}
            perPage={perPage}
            totalPages={totalPages}
            onSearchChange={(a, b) => {
                setSearchTerm(b.value)
            }}
            searchTextHandler={searchTextHandler}
            resultRenderer={resultRenderer}
            results={results}
            showNoResults={false}

        />
    )
}

const SearchComponent = injectIntl((props) => {
    const {intl} = props
    const [query, setQuery] = useState("")
    return (<SearchProvider search={query} perPage={5} locale={intl.locale}>
        <SearchConsumer>
            <SearchControl  onSearch={setQuery}  perPage={5}></SearchControl>
        </SearchConsumer>
    </SearchProvider>)
})


export default SearchComponent
