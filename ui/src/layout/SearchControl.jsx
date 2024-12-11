import React, { useEffect, useState } from "react";
import * as ReactDOM from "react-dom";
import { utils, SearchProvider, SearchConsumer } from "@devgateway/wp-react-lib";
import CustomSemanticSearch from "./CustomSemanticSearch";
import { Icon } from "semantic-ui-react";
import { IntlProvider, injectIntl } from "react-intl";

const ResultRenderer = injectIntl(
  ({
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
    metadata: { redirect_url },
    intl: { locale },
  }) => {
    let target = parent_link
      ? utils.replaceLink(parent_link, locale) + `#${slug}`
      : utils.replaceLink(link, locale);
    target = redirect_url ? redirect_url + `#${slug}` : target;

    return (
      <div
        className="search-results-wrapper searching-results"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div
          className={"has-standard-12-font-size"}
          onClick={(e) => (document.location.href = target)}
        >
          <h5 className="breadcrumbs-search">
            {bread_crumbs && bread_crumbs.length > 0
              ? `${bread_crumbs.join(" / ")}`
              : ""}{" "}
          </h5>
          <div className={"has-standard-14-font-size"}>
            <h4 className="search-title">{title}</h4>
          </div>
          <div
            className="search-content"
            dangerouslySetInnerHTML={{
              __html: utils.replaceHTMLinks(extract, locale),
            }}
          />
        </div>
      </div>
    );
  }
);

const replaceString = (content, words) => {
  let regex = RegExp(words, "gi");
  let newHTML = content;
  let instances = [...newHTML.matchAll(regex)];
  let shift = 0;
  let lengthBeforeChange = newHTML.length;
  instances.forEach((instance) => {
    let replacement =
      "<b>" +
      newHTML.substring(
        instance.index + shift,
        instance.index + shift + words.length
      ) +
      "</b>";
    newHTML =
      newHTML.substring(0, instance.index + shift) +
      replacement +
      newHTML.substring(instance.index + words.length + shift);
    shift = newHTML.length - lengthBeforeChange;
  });

  return newHTML;
};

const searchTextHandler = (words) => {
  let searchedPara = document.querySelector(".results");
  let searchResultHeading =
    (searchedPara =
    searchedPara =
      document.querySelectorAll("H5"));
  let searchResult =
    (searchedPara =
    searchedPara =
      document.querySelectorAll(".search-content"));
  for (let i = 0; i < searchResult.length; i++) {
    if (searchResult[i]) {
      searchResult[i].innerHTML = replaceString(
        searchResult[i].textContent,
        words
      );
    }
  }

  for (let i = 0; i < searchResultHeading.length; i++) {
    if (searchResultHeading[i]) {
      searchResultHeading[i].innerHTML = replaceString(
        searchResultHeading[i].textContent,
        words
      );
    }
  }
};

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

  useEffect(() => searchTextHandler(searchTerm), [results]);
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
      searchTextHandler={searchTextHandler}
      resultRenderer={ResultRenderer}
      results={results}
      showNoResults={false}
      intl={intl}
    />
  );
};

const FloatSearchInput = ({
  onSearch,
  perPage,
  loading,
  results,
  meta,
  intl,
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
      onChange={(e) => {
        onSearch(e.target.value);
      }}
    />
  );
};

const FloatSearchResults = ({ results, meta, perPage, intl }) => {
  const total = meta ? meta["x-wp-total"] : 0;
  const totalPages = meta ? meta["x-wp-totalpages"] : 0;

  useEffect(() => {
    const searchWords = document.querySelector(".input.search").value;
    searchTextHandler(searchWords);
  }, [results]);

  return (
    <div>
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
        <ResultRenderer {...r} />
      ))}
    </div>
  );
};

const FloatingSearchController = ({
  onSearch,
  onSetSelected,
  perPage,
  loading,
  results,
  meta,
  locale,
  intl,
}) => {
  const [showSearchInput, setShowSearchInput] = useState(false);

  const show = () => {
    onSetSelected(null);
    setShowSearchInput(true);
  };
  const hidde = (e) => {
    setShowSearchInput(false);
  };

  const addListenerToHeaderElements = () => {
    const itemWithChildren = document.getElementsByClassName("has-child-items");
    if (itemWithChildren.length > 0) {
      const itemElement = itemWithChildren[0];
      const spans = itemElement.getElementsByTagName("span");
      if (spans.length > 0) {
        spans[0].addEventListener("mouseover", hidde);
      }
    }
  };
  const removeListenerToHeaderElements = () => {
    const itemWithChildren = document.getElementsByClassName("has-child-items");
    if (itemWithChildren.length > 0) {
      const itemElement = itemWithChildren[0];
      const spans = itemElement.getElementsByTagName("span");
      if (spans.length > 0) {
        spans[0].removeEventListener("mouseover", hidde);
      }
    }
  };

  useEffect(() => {
    if (showSearchInput) {
      addListenerToHeaderElements();
      let element = document.getElementById("float-input-container");
      if (element) {
        element.style.display = "block";
      } else {
        element = document
          .getElementById("root")
          .appendChild(document.createElement("div"));
        element.setAttribute("id", "float-input-container");
        element.setAttribute("class", "input container");
        element.onmouseleave = () => {
          hidde();
        };
      }
      ReactDOM.render(
        <FloatSearchInput
          onSearch={onSearch}
          perPage={perPage}
          loading={loading}
          results={results}
          meta={meta}
          intl={intl}
        ></FloatSearchInput>,
        document.getElementById("float-input-container")
      );
    } else {
      if (document.getElementById("float-input-container")) {
        removeListenerToHeaderElements();
        const exitingElement = document.getElementById("float-input-container");
        exitingElement.style.display = "none";
        //document.getElementById("root").removeChild(document.getElementById("float-input-container"))
      }
    }
  }, [showSearchInput]);
  useEffect(() => {
    if (results && results.length > 0) {
      let element = document.getElementById("float-results-container");
      if (element) {
      }
      if (!element) {
        element = document
          .getElementById("float-input-container")
          .appendChild(document.createElement("div"));
        element.setAttribute("id", "float-results-container");
        element.setAttribute("class", "results container");
        element.setAttribute("class", "results container");
        //element.onmouseleave = () => {hidde()}
      }
      const element2 = document.getElementById("ui-float-search");
      element2.classList.add("ui-float-search-active");

      ReactDOM.render(
        <IntlProvider locale={locale}>
          <FloatSearchResults
            results={results}
            meta={meta}
            perPage={perPage}
            intl={intl}
          />
        </IntlProvider>,
        document.getElementById("float-results-container")
      );
    }
  }, [meta, results]);

  useEffect(() => {
    if (showSearchInput) {
      const element = document.getElementById("ui-float-search");
      element.classList.add("ui-float-search-active");
    } else {
      const element = document.getElementById("ui-float-search");
      element.classList.remove("ui-float-search-active");
    }
  });

  return (
    <div
      id={"ui-float-search"}
      className={"ui float-search"}
      onMouseOver={(e) => show()}
    >
      {/*{results?results.length:0}*/}
      <Icon name={"search"} size={"small"}></Icon>
    </div>
  );
};

const SearchComponent = injectIntl((props) => {
  const { intl, onSetSelected } = props;
  const [query, setQuery] = useState("");

  const [isSmallScreen, setIsSmallScreen] = useState(false); // State to track small screen
  useEffect(() => {
    // Function to update isSmallScreen state
    const updateScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 1365); // Check if width is 1365px or lower
    };

    // Initial check
    updateScreenSize();

    // Event listener for window resize
    window.addEventListener("resize", updateScreenSize);

    // Cleanup
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  const component =
    props.settings.react_search_type === "floating" || isSmallScreen ? (
      <FloatingSearchController
        onSetSelected={onSetSelected}
        onSearch={setQuery}
        perPage={5}
        {...props}
      />
    ) : (
      <SearchControl
        onSetSelected={onSetSelected}
        onSearch={setQuery}
        perPage={5}
        {...props}
      ></SearchControl>
    );
  return (
    <SearchProvider search={query} perPage={5} locale={intl.locale}>
      <SearchConsumer>{component}</SearchConsumer>
    </SearchProvider>
  );
});

export default SearchComponent;