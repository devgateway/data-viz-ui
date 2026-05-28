import React, { useEffect, useState, useRef, useContext } from "react";
import { utils, SearchConsumer, SearchProvider, SearchContext } from "@devgateway/wp-react-lib";
import CustomSemanticSearch from "./CustomSemanticSearch";
import { createPortal } from "react-dom";
import { Icon } from "semantic-ui-react";
import { IntlProvider, injectIntl } from "react-intl";

// Utility function to highlight search terms
const boldSearchTerm = (text, searchTerm) => {
  if (!text || !searchTerm) return text || '';
  const regex = new RegExp(`(${searchTerm})`, 'gi');
  return text.replace(regex, '<strong>$1</strong>');
};

const isLocaleRootLink = (url, locale) => {
    const safeLocale = String(locale || 'en').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const localeRootPattern = new RegExp(`^/${safeLocale}/?$`);
    return localeRootPattern.test(String(url || '').trim());
};

const getRedirectUrl = (redirectUrl) => {
    if (Array.isArray(redirectUrl)) {
        return String(redirectUrl[0] || '').trim();
    }
    return String(redirectUrl || '').trim();
};


// ResultRenderer component with highlighting
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
  metadata,
  intl: { locale },
  searchTerm, // Added searchTerm prop
}) => {
  const redirect_url = metadata?.redirect_url;
  target = redirect_url ? redirect_url + `#${slug}` : target;

  const parentTarget = utils.replaceLink(parent_link, locale);
    const directTarget = utils.replaceLink(link, locale);
    const safeRedirectUrl = getRedirectUrl(redirect_url);

    let target = directTarget;
    if (parent_link && !isLocaleRootLink(parentTarget, locale)) {
        target = parentTarget + `#${slug}`;
    }
    if (safeRedirectUrl) {
        target = safeRedirectUrl + `#${slug}`;
    }

  const boldedTitle = boldSearchTerm(String(title), searchTerm);
  const boldedExtract = boldSearchTerm(extract, searchTerm);


  return (
    <div
      className="search-results-wrapper searching-results"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div
        className={"has-standard-12-font-size"}
        onClick={(e) => (document.location.href = target)}
      >
        <h5
          className="breadcrumbs-search"
          dangerouslySetInnerHTML={{
            __html:
              bread_crumbs && bread_crumbs.length > 0
                ? boldSearchTerm(bread_crumbs.join(" / "), searchTerm)
                : "",
          }}
        />
        <div className={"has-standard-14-font-size"}>
          <h4
            className="search-title"
            dangerouslySetInnerHTML={{
              __html: boldedTitle
            }}
          />
        </div>
        <div
          className="search-content"
          dangerouslySetInnerHTML={{
            __html: utils.replaceHTMLinks(boldedExtract, locale)
          }}
        />
      </div>
    </div>
  );
}
);

// FloatSearchResults component with highlighting
const FloatSearchResults = ({ results, meta, perPage, intl, searchTerm }) => {
  const total = meta ? meta["x-wp-total"] : 0;
  const totalPages = meta ? meta["x-wp-totalpages"] : 0;

  return (
    <div id="float-results-container">
      <span className="float-results-header">
        {intl.formatMessage(
          {
            id: "search.results.summary",
            defaultMessage: "{count} of {total} Results",
          },
          { count: total < perPage ? total : perPage, total: total }
        )}
      </span>
      {results.map((r) => (
        <ResultRenderer key={r.ID} {...r} searchTerm={searchTerm} />
      ))}
    </div>
  );
};

// FloatSearchInput component
const FloatSearchInput = ({
  onSearch,
  perPage,
  loading,
  results,
  meta,
  intl,
  searchTerm,
}) => {
  const total = meta ? meta["x-wp-total"] : 0;
  const totalPages = meta ? meta["x-wp-totalpages"] : 0;

  return (
    <input
      placeholder={intl.formatMessage({
        id: "search.placeholder",
        defaultMessage: "Search...",
      })}
      type={"text"}
      className={"input search"}
      name={"search"}
      value={searchTerm}
      onChange={(e) => {
        onSearch(e.target.value);
      }}
    />
  );
};

// FloatingSearchController component
const FloatingSearchController = ({
  onSearch,
  onSetSelected,
  perPage,
  loading,
  results,
  meta,
  locale,
  intl,
  searchTerm, // Added search from SearchConsumer
  selected, // Added selected prop to track menu selection
}) => {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const containerRef = useRef(null);

  const hide = () => {
    setShowSearchInput(false);
  };

  useEffect(() => {
    const newContainer = document.createElement("div");
    newContainer.setAttribute("id", "float-input-container");
    newContainer.setAttribute("class", "input container");
    newContainer.style.display = "none"; // Hide container by default
    const rootElement = document.getElementById("root");
    if (rootElement) {
      rootElement.appendChild(newContainer);
      containerRef.current = newContainer;
    }
    return () => {
      if (containerRef.current && containerRef.current.parentNode) {
        containerRef.current.parentNode.removeChild(containerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.display = showSearchInput ? "block" : "none";
    }
  }, [showSearchInput]);

  const show = () => {
    setShowSearchInput(true);
  };

  return (
    <>
      <div
        id="ui-float-search"
        className={`ui float-search${showSearchInput ? " ui-float-search-active" : ""}`}
        onMouseOver={show}
      >
        <Icon name="search" size="small" />
      </div>
      {containerRef.current &&
        createPortal(
          showSearchInput ? (
            <div onMouseLeave={hide}>
              <div className="float-search-container">
                <FloatSearchInput
                  onSearch={onSearch}
                  perPage={perPage}
                  loading={loading}
                  results={results}
                  meta={meta}
                  intl={intl}
                  searchTerm={searchTerm}
                />
              </div>
              {results && results.length > 0 && (
                <IntlProvider locale={locale}>
                  <FloatSearchResults
                    results={results}
                    meta={meta}
                    perPage={perPage}
                    intl={intl}
                    searchTerm={searchTerm} // Pass search term
                  />
                </IntlProvider>
              )}
            </div>
          ) : null,
          containerRef.current
        )}
    </>
  );
};

// SearchControl component
const SearchControl = ({ onSearch, perPage, loading, results, meta, intl }) => {
  const total = meta ? meta["x-wp-total"] : 0;
  const totalPages = meta ? meta["x-wp-totalpages"] : 0;
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const enhancedResultRenderer = (props) => (
    <ResultRenderer {...props} searchTerm={searchTerm} />
  );

  return (
    <CustomSemanticSearch
      value={searchTerm}
      loading={loading}
      placeholder={intl.formatMessage({
        id: "search.placeholder",
        defaultMessage: "Search...",
      })}
      onResultSelect={(e, data) => null}
      total={total}
      perPage={perPage}
      totalPages={totalPages}
      onSearchChange={(a, b) => {
        setSearchTerm(b.value);
      }}
      resultRenderer={enhancedResultRenderer} // Use wrapper to pass searchTerm
      results={results}
      showNoResults={false}
      intl={intl}
      searchTerm={searchTerm}
    />
  );
};

// Main SearchComponent
const SearchComponent = injectIntl((props) => {
  const { intl, onSetSelected } = props;
  const [query, setQuery] = useState("");
  const [isSmallScreen, setIsSmallScreen] = useState(false); // Track small screen

  useEffect(() => {
    const updateScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 1365); // Check if width is 1365px or lower
    };
    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  return (
    <SearchProvider search={query} perPage={5} locale={intl.locale}>
        <SearchComponentInner
          {...props}
          onSetSelected={onSetSelected}
          setQuery={setQuery}
          query={query}
          isSmallScreen={isSmallScreen}
          intl={intl}
        />
    </SearchProvider>
  );
});

// Inner component that uses the SearchContext
const SearchComponentInner = ({ onSetSelected, selected, setQuery, query, isSmallScreen, intl, ...props }) => {
  const searchContext = useContext(SearchContext);

  const component =
    props.settings.react_search_type === "floating" || isSmallScreen ? (
      <FloatingSearchController
        onSetSelected={onSetSelected}
        selected={selected}
        onSearch={setQuery}
        perPage={5}
        intl={intl}
        {...props}
        {...searchContext}
        searchTerm={query}
      />
    ) : (
      <SearchControl
        onSetSelected={onSetSelected}
        onSearch={setQuery}
        perPage={5}
        intl={intl}
        {...props}
        {...searchContext}
      />
    );

  return component;
};

export default SearchComponent;
