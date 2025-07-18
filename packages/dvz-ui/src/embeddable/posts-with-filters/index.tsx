import React, { useState, useEffect } from 'react';
import { PostConsumer, PostProvider, CategoriesProvider, CategoriesContext, getYearRange } from "@devgateway/wp-react-lib";
import { Dropdown, Button, Icon, Pagination, Container } from 'semantic-ui-react';
import Post from './Post';
import { getStartDateAndEndDateFromYear } from './utils';
import { toBoolean, toNumber } from '@/utils/data';

interface PostsWithFiltersProps {
  editing: boolean;
  "data-component": string;
  "data-height": string;
  "data-show-header": string;
  "data-show-pagination": string;
  "data-show-posts-per-page": string;
  "data-show-filters": string;
  "data-show-date-filter": string;
  "data-show-category-filter": string;
  "data-categories": string;
  "data-start-date": string;
  "data-end-date": string;
  "data-category-placeholder": string;
  "data-show-country-filter": string;
  "data-country-category": string;
  "data-country-placeholder": string;
}

interface PostsProps {
  posts?: any[],
  meta?: any,
  showPaginationOptions: boolean,
  currentPage: number,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
  countryCategory: string,
  height: number,
}
const Posts = (props: PostsProps) => {
  const { posts, meta, showPaginationOptions, currentPage, setCurrentPage, countryCategory, height } = props;

  const countryCategoryValue = toNumber(countryCategory);
  const heightValue = height - 60;

  // the posts with the country category should appear first
  const postsWithCountryCategory = Array.isArray(posts)
    ? posts.filter((post) => post.categories.includes(countryCategoryValue))
    : [];
  const postsWithoutCountryCategory = Array.isArray(posts)
    ? posts.filter((post) => !post.categories.includes(countryCategoryValue))
    : [];
  const postsToDisplay = [...postsWithCountryCategory, ...postsWithoutCountryCategory];

  const totalPages = meta && meta['x-wp-totalpages'] ? meta['x-wp-totalpages'] : 1;
  return (
    <div>
      <div className="posts-grid">
        {postsToDisplay?.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
      {showPaginationOptions && (
        <div className="pagination-section">
          <div className="pagination-info">
            Page <span className="current-page">{currentPage}</span> of {totalPages}
          </div>

          <Pagination
            activePage={currentPage}
            totalPages={totalPages}
            onPageChange={(e, { activePage }) => setCurrentPage(activePage as number)}
            prevItem={{ content: <Icon name='angle left' />, icon: true }}
            nextItem={{ content: <Icon name='angle right' />, icon: true }}
            firstItem={null}
            lastItem={null}
          />
        </div>
      )}
    </div>

  );
};


interface FiltersProps {
  categories: any[],
  selectedCategory: any,
  setSelectedCategory: React.Dispatch<React.SetStateAction<number | null>>,
  selectedYear: number | null,
  setSelectedYear: React.Dispatch<React.SetStateAction<number | null>>,
  onResetFilters: () => void,
  showCategoryFilter: boolean,
  categoryPlaceholder: string,
  showDateFilter: boolean,
  categoriesToBeShown: any[],
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
  showCountryFilter: boolean,
  countryPlaceholder: string,
  countryCategory: string,
  selectedCountry: string | null,
  setSelectedCountry: React.Dispatch<React.SetStateAction<string | null>>,
}

const Filters = (props: FiltersProps) => {
  const {
    categories,
    selectedCategory,
    setSelectedCategory,
    selectedYear,
    setSelectedYear,
    onResetFilters,
    showCategoryFilter,
    categoryPlaceholder,
    showDateFilter,
    categoriesToBeShown,
    setCurrentPage,
    showCountryFilter,
    countryPlaceholder,
    countryCategory,
    selectedCountry,
    setSelectedCountry,
  } = props;
  const [yearOptions, setYearOptions] = useState([]);

  useEffect(() => {
    const fetchYears = async () => {
      const response = await getYearRange();
      const data = response.data;
      const yearOptions = data.map((year: any) => ({
        key: year,
        value: year,
        text: `Year ${year}`
      }));
      setYearOptions(yearOptions);
    }
    fetchYears();
    return () => {
      fetchYears();
    }
  }, []);

  const displayCategories = (categories && categoriesToBeShown) ? categories.filter((category: any) => categoriesToBeShown.includes(category.id)) : [];
  const displayCountryCategories = (categories && countryCategory) ? categories.filter((category: any) => category.parent === parseInt(countryCategory)) : [];

  return (
    <div className="filters-section">
      <div className="filter-controls">
        {showCountryFilter && (
          <Dropdown
            options={displayCountryCategories.map((category: any) => ({
              key: category.id,
              value: category.id,
              text: category.name
            }))}
            placeholder={countryPlaceholder}
            value={selectedCountry as string}
            onChange={(e, { value }) => {
              setSelectedCountry(value as string);
              setCurrentPage(1);
            }}
          />
        )}

        {showDateFilter && (
          <Dropdown
            options={yearOptions}
            placeholder="Select Year"
            value={selectedYear || ''}
            onChange={(e, { value }) => {
              setSelectedYear(value as number);
              setCurrentPage(1);
            }}
            multiple={false}
            searchable={true}
            showAllNone={false}
            closeOnSelect={true}
          />
        )}

        {showCategoryFilter && (
          <Dropdown
            options={displayCategories ? displayCategories.map((category: any) => ({
              key: category.id,
              value: category.id,
              text: category.name
            })) : []}
            placeholder={categoryPlaceholder || "All Countries"}
            value={selectedCategory}
            onChange={(e, { value }) => {
              setSelectedCategory(value as number);
              setCurrentPage(1);
            }}
            multiple={false}
            searchable={false}
            showAllNone={false}
            closeOnSelect={true}
            className="category-filter"
          />
        )}

        <Container className={`data-filters-reset ignore ${selectedCategory || selectedYear || selectedCountry ? '' : 'disabled'}`}
          onClick={onResetFilters}>
          <span>Reset Filters</span>
          <span><Icon name="undo alternate" className="custom-undo-icon" /></span>
        </Container>
      </div>
    </div>
  );
};

const PostsWithFilters = (props: PostsWithFiltersProps) => {
  const {
    "data-height": height,
    "data-show-pagination": showPagination,
    "data-show-posts-per-page": postsPerPage,
    "data-show-filters": showFilters,
    "data-show-date-filter": showDateFilter,
    "data-show-category-filter": showCategoryFilter,
    "data-categories": categoriesToBeShown,
    "data-category-placeholder": categoryPlaceholder,
    "data-show-country-filter": showCountryFilter,
    "data-country-category": countryCategory,
    "data-country-placeholder": countryPlaceholder,
  } = props;

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const heightValue = toNumber(height);
  const showPaginationValue = toBoolean(showPagination);
  const postsPerPageValue = toNumber(postsPerPage);
  const showFiltersValue = toBoolean(showFilters);
  const showDateFilterValue = toBoolean(showDateFilter);
  const showCategoryFilterValue = toBoolean(showCategoryFilter);
  const showCountryFilterValue = toBoolean(showCountryFilter);

  const handleResetFilters = () => {
    setSelectedCategory(null);
    setSelectedYear(null);
    setSelectedCountry(null);
  };


  const yearRange = selectedYear ? getStartDateAndEndDateFromYear(selectedYear) : null;
  let selectedCategoryIds: number[] = [];
  try {
    if (categoriesToBeShown) {
      if (Array.isArray(categoriesToBeShown)) {
        selectedCategoryIds = categoriesToBeShown;
      } else {
        if (typeof categoriesToBeShown === 'string') {
          const decoded = decodeURIComponent(categoriesToBeShown);
          if (decoded && decoded !== "undefined") {
            selectedCategoryIds = JSON.parse(decoded);
          }
        }
        else {
          selectedCategoryIds = categoriesToBeShown;
        }
      }
    }
  } catch (e) {
    selectedCategoryIds = [];
  }


  return (
    <Container fluid style={{ height: '100%', minHeight: heightValue + 'px' }}>
      {showFiltersValue && (
        <CategoriesProvider>
          <CategoriesContext.Consumer>
            {({ categories }) => (
              <Filters
                showCategoryFilter={showCategoryFilterValue}
                categoryPlaceholder={categoryPlaceholder}
                showDateFilter={showDateFilterValue}
                categories={categories}
                categoriesToBeShown={selectedCategoryIds}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedYear={selectedYear}
                setSelectedYear={setSelectedYear}
                onResetFilters={handleResetFilters}
                setCurrentPage={setCurrentPage}
                showCountryFilter={showCountryFilterValue}
                countryPlaceholder={countryPlaceholder}
                countryCategory={countryCategory}
                selectedCountry={selectedCountry}
                setSelectedCountry={setSelectedCountry}
              />
            )}
          </CategoriesContext.Consumer>
        </CategoriesProvider>
      )}


      <PostProvider
        perPage={postsPerPageValue || 10}
        store="posts-with-filters"
        categories={selectedCountry || selectedCategory || selectedCategoryIds.join(',')}
        after={yearRange?.startDate || null}
        before={yearRange?.endDate || null}
        page={currentPage}
      >
        <PostConsumer>
          <Posts
            showPaginationOptions={showPaginationValue}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            countryCategory={countryCategory}
            height={heightValue}
          />
        </PostConsumer>
      </PostProvider>


    </Container>
  );
};

export default PostsWithFilters;