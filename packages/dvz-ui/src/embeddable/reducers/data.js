import * as api from './data-api';
import * as Immutable from 'immutable';
import Papa from 'papaparse';

const LOAD_DATA = 'LOAD_DATA';
const LOAD_DATA_DONE = 'LOAD_DATA_DONE';
const LOAD_DATA_ERROR = 'LOAD_DATA_ERROR';
const LOAD_CATEGORIES = 'LOAD_CATEGORIES';
const LOAD_CATEGORIES_DONE = 'LOAD_CATEGORIES_DONE';
const LOAD_CATEGORIES_ERROR = 'LOAD_CATEGORIES_ERROR';
const SET_PAGE_MODULE_PROPS = 'SET_PAGE_MODULE_PROPS';
const LOAD_PAGE_MODULE_PROPS = 'LOAD_PAGE_MODULE_PROPS';


const SET_FILTER = 'SET_FILTER';
const SET_INITIAL_FILTER = 'SET_INITIAL_FILTER';

const SET_POSTS_FILTER = 'SET_POSTS_FILTER';
const SET_INITIAL_POSTS_FILTER = 'SET_INITIAL_POSTS_FILTER';
const SET_POSTS_PAGINATION = 'SET_POSTS_PAGINATION';

const SET_APPLY = 'SET_APPLY';

const CLEAN_FILTER = 'CLEAN_FILTER';
const initialState = Immutable.Map({ mode: 'info' });

const SET_MEASURES = 'SET_MEASURES';
const CLEAN_MEASURES = 'CLEAN_MEASURES';

export const cleanMeasures = ({ app, group }) => (dispatch, getState) => {
    dispatch({ type: CLEAN_MEASURES, app, group });
};
export const setMeasures = ({ app, group, mGroup }) => (dispatch, getState) => {

    const measures = Object.keys(mGroup.measures).filter(k => mGroup.measures[k].selected);

    const newMgroup = { ...mGroup };

    newMgroup[app] = { measures: {} };
    measures.forEach(m => {
        newMgroup[app].measures[m] = {...mGroup.measures[m]}
    })
    newMgroup[app].format = mGroup.format
    dispatch({type: SET_MEASURES, app, group, measure: newMgroup})
}
export const setFilter = ({app, group, param, value, autoApply}) => (dispatch, getState) => {
    //eslint-disable-next-line

    dispatch({type: SET_FILTER, app, group, param, value, autoApply})
}
export const cleanFilter = ({app, group}) => (dispatch, getState) => {
    // First reset to initial values
    dispatch({type: CLEAN_FILTER, app, group})

    // Then trigger auto-apply for each filter parameter like the 'all' function does
    const state = getState()
    const initialGroup = state.getIn(['data', 'filters', 'initial', app, group])

    if (initialGroup) {
        const initialParams = initialGroup.entrySeq ? initialGroup.entrySeq().toArray() : Object.entries(initialGroup)

        for (const [param, initialValue] of initialParams) {
            dispatch({
                type: SET_FILTER,
                app,
                group,
                param,
                value: initialValue,
                autoApply: true
            })
        }
    }
}

export const applyFilter = ({app, group}) => (dispatch, getState) => {
    dispatch({type: SET_APPLY, app, group})
}
export const setInitialFilters = ({app, group, param, value}) => (dispatch, getState) => {
    //eslint-disable-next-line
    //debugger

    dispatch({type: SET_INITIAL_FILTER, app, group, param, value})
}

export const getCategories = (props) => (dispatch, getState) => {
    const { app, params, dvzProxyDatasetId, uniqueStorage } = props;
    dispatch({ type: LOAD_CATEGORIES, params, app, uniqueStorage, dvzProxyDatasetId });


    api.getCategories({ app, params })
        .then(data => {
            data.appliedFilters = params;
            return dispatch({
                type: LOAD_CATEGORIES_DONE,
                app,
                data,
                uniqueStorage,
                dvzProxyDatasetId
            });
        })
        .catch(error => dispatch({
            type: LOAD_CATEGORIES_ERROR,
            app,
            uniqueStorage,
            error,
            dvzProxyDatasetId
        }));
};

export const setData = ({ app, group, csv, store, params }) => (dispatch, getState) => {

    const filters = getState().get('data').getIn(['filters', app, group]);
    if (filters) {
        params = { ...params, ...filters.toJS() };
    } else {
        params = params || {};
    }

    const data = Papa.parse(csv, { header: true, dynamicTyping: true });

    const filtered = data.data.filter(d => {
        let filtered = false;
        Object.keys(params).forEach(k => {
            const field = k;
            const value = params[k];
            if (d[k]) {
                const filterValue = d[k].toString().trim().toLowerCase();
                filtered = value.filter(v => v && v.toString().trim().toLowerCase() == filterValue).length == 0;
            }
        });

        return !filtered;
    });

    const d2 = { ...data, data: filtered, appliedFilters: params };
    dispatch({ type: LOAD_DATA_DONE, app, group, store, data: { count: d2.data.length, itemsSize: d2.data.length, ...d2 } });
};
export const getData = ({ app, group, source, store, params }) => (dispatch, getState) => {


    let filters = getState().get('data').getIn(['filters', app, group]);

    if (params) {
        const presetFilters = Object.keys(params);
        presetFilters.forEach(k => {
            if (filters && filters.has(k)) {
                let a = params[k];
                let b = filters.get(k);
                //[A,B,C,E]
                //[C,D]
                //We should remove other options from preset filter and turn on off the matching ones
                let newB = b.filter(c => a.indexOf(c) > -1);
                filters = filters.set(k, newB);
            }
        });
    }
    if (filters) {
        params = { ...params, ...filters.toJS() };
    }

    dispatch({ type: LOAD_DATA, app, group, params, store });

    api.getData({ app, source, params })
        .then(data => {
            data.appliedFilters = params;
            return dispatch({ type: LOAD_DATA_DONE, app, group, store, data, params });
        })
        .catch(error => dispatch({ type: LOAD_DATA_ERROR, app, group, store, error }));

};

export const setPageModuleProps = ({ data }) => (dispatch, getState) => {
    dispatch({ type: SET_PAGE_MODULE_PROPS, data });
};

export default (state = initialState, action) => {

    switch (action.type) {
        case LOAD_DATA: {
            const { store, app, group, params } = action;
            const time = Date.now();

            return state.deleteIn([...store, 'error'])
                .setIn([...store, 'loading'], true)
                .setIn([...store, 'time'], time)
                .setIn([...store, 'presetFilter'], params);

        }
        case LOAD_DATA_ERROR: {
            const { error, store, app, group } = action;
            return state
                .setIn([...store, 'loading'], false)
                .setIn([...store, 'error'], error)
                .setIn(['filters-settings', app, group, "apply"], null);
        }
        case LOAD_DATA_DONE: {
            const { data, app, group, store } = action;
            return state
                .setIn([...store, 'loading'], false)
                .deleteIn([...store, 'error'])
                .setIn([...store, 'data'], data)
                .setIn(['filters-settings', app, group, "apply"], null);
        }

        case SET_PAGE_MODULE_PROPS: {
            const { data } = action;
            return state
                .setIn(['pageModuleProps'], data);
        }
        case LOAD_CATEGORIES: {
            const { data, app, uniqueStorage, dvzProxyDatasetId } = action;
            const path = ["categories", app];
            if (uniqueStorage) {
                path.push(uniqueStorage);
            }

            if (dvzProxyDatasetId) {
                path.push(dvzProxyDatasetId);
            }

            return state.setIn([...path, "loading"], true)
                .deleteIn([...path, "error"]);
        }

        case LOAD_CATEGORIES_DONE: {
            const { data, app, uniqueStorage, dvzProxyDatasetId } = action;
            const path = ["categories", app];
            if (dvzProxyDatasetId) {
                path.push(dvzProxyDatasetId);
            }
            if (uniqueStorage) {
                path.push(uniqueStorage);
            }


            return state.setIn([...path, "loading"], false)
                .setIn([...path, "items"], Immutable.fromJS(data));
        }
        case LOAD_CATEGORIES_ERROR: {
            const { data, app, uniqueStorage, dvzProxyDatasetId } = action;
            const path = ["categories", app];
            if (uniqueStorage) {
                path.push(uniqueStorage);
            }
            if (dvzProxyDatasetId) {
                path.push(dvzProxyDatasetId);
            }

            return state.setIn([...path, "loading"], false)
                .setIn([...path, "error"], data);


        }
        case SET_APPLY: {
            const { app, group } = action;
            return state.setIn(['filters-settings', app, group, "apply"], new Date().getTime());
        }

        case SET_FILTER: {
            const now = Date.now();
            const { app, group, param, value, autoApply } = action;
            return state.setIn(['filters-settings', app, group, "autoApply"], autoApply)
                .setIn(['filters', app, group, param], value.length === 0 ? [Number.MIN_SAFE_INTEGER] : value)
                .setIn(['filters-settings', app, group, "apply"], null)
                .setIn(['filters-settings', app, group, 'lastUserFilterChange'], now);
        }

        case SET_INITIAL_FILTER: {
            const now = Date.now();
            const { app, group, param, value } = action;
            //eslint-disable-next-line

            console.log(param);
            return state.setIn(['filters', 'initial', app, group, param], value.length === 0 ? [Number.MIN_SAFE_INTEGER] : value)
                .setIn(['filters', app, group, param], value.length === 0 ? [Number.MIN_SAFE_INTEGER] : value)
                .setIn(['filters-settings', app, group, 'lastInitialFilterChange'], now);
        }

        case CLEAN_FILTER: {
            const { app, group } = action;
            const initial = state.getIn(['filters', 'initial', app, group]);
            return state.setIn(['filters', app, group], initial);
        }

        case SET_INITIAL_POSTS_FILTER: {
            const {
                group,
                sortFirstBy,
                categoryCategory,
                countryCategory,
                categoryTaxonomy,
                countryTaxonomy,
                categoryFilter,
                countryFilter,
                yearFilter
            } = action;

            const sortFirstByValue = Number(sortFirstBy);

            const next = {
                yearFilter,
                categoryFilter,
                categoryTaxonomy,
                categoryCategory,
                countryCategory,
                countryFilter,
                countryTaxonomy,
                page: undefined,
                itemsPerPage: undefined,
                sortFirstBy: sortFirstByValue,
                postTaxonomy: null,
                postCategory: null,
                postType: null
            };
            return state.setIn(['posts', group], next)
            .setIn(['posts', 'initialFilters', group], next);

        }

        case SET_POSTS_FILTER: {
            const {
                group,
                yearFilter,
                categoryFilter,
                countryFilter,
                page,
                itemsPerPage,
                sortFirstBy,
                countryCategory,
                categoryCategory,
                taxonomy,
                categoryTaxonomy,
                countryTaxonomy
            } = action;
            const previous = state.getIn(['posts', group]) || {};
            const next = {
                    yearFilter,
                    categoryFilter,
                    countryFilter,
                    page,
                    itemsPerPage,
                    sortFirstBy,
                    countryCategory,
                    // preserve or set taxonomy helpers needed by filters UI and querying
                    categoryCategory: (categoryCategory !== undefined) ? categoryCategory : previous.categoryCategory,
                    taxonomy,
                    categoryTaxonomy: (categoryTaxonomy !== undefined) ? categoryTaxonomy : previous.categoryTaxonomy,
                    countryTaxonomy: (countryTaxonomy !== undefined) ? countryTaxonomy : previous.countryTaxonomy,
                };

            let newState = state.setIn(['posts', group], next);

            const currentInitial = state.getIn(['posts', 'initialFilters', group]);
            const shouldCaptureInitial = (
                (!currentInitial) ||
                (
                    currentInitial &&
                    currentInitial.yearFilter === null &&
                    currentInitial.categoryFilter === null &&
                    currentInitial.countryFilter === null &&
                    currentInitial.categoryCategory === null
                )
            ) && (
                (Array.isArray(categoryFilter) && categoryFilter.length > 0) ||
                (Array.isArray(countryFilter) && countryFilter.length > 0)
            );

            if (shouldCaptureInitial) {
                const initialSnapshot = { ...next };
                newState = newState.setIn(['posts', 'initialFilters', group], initialSnapshot);
            }

            return newState;
        }

        case SET_POSTS_PAGINATION: {
            const { group, totalPages, totalItems } = action;
            return state.setIn(['postsPagination', group], { totalPages, totalItems });

        }

        case SET_MEASURES: {
            const { app, group, measure } = action;
            return state.setIn(['measures', app, group], measure);

        }
        case CLEAN_MEASURES: {
            const { app, group, measure } = action

                ;
            return state.deleteIn(['measures', app, group]);

        }

        default:
            return state;
    }
};
