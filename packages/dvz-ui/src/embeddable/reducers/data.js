import * as api from './data-api';
import * as Immutable from 'immutable';
import Papa from 'papaparse';

const LOAD_DATA = 'LOAD_DATA'
const LOAD_DATA_DONE = 'LOAD_DATA_DONE'
const LOAD_DATA_ERROR = 'LOAD_DATA_ERROR'
const LOAD_CATEGORIES = 'LOAD_CATEGORIES'
const LOAD_CATEGORIES_DONE = 'LOAD_CATEGORIES_DONE'
const LOAD_CATEGORIES_ERROR = 'LOAD_CATEGORIES_ERROR'
const SET_PAGE_MODULE_PROPS = 'SET_PAGE_MODULE_PROPS'

const RELOAD_CHILD_FILTER_ITEMS = "RELOAD_CHILD_FILTER_ITEMS"
const LOAD_PAGE_MODULE_PROPS = 'LOAD_PAGE_MODULE_PROPS'
const SET_FILTER = 'SET_FILTER' //single filter changed
const SET_FILTERS = 'SET_FILTERS' //use if bulk filter updates is needed
const SET_INITIAL_FILTER = 'SET_INITIAL_FILTER'
const SET_APPLY = 'SET_APPLY'
const CLEAN_FILTER = 'CLEAN_FILTER'
const UNSET_FILTER = 'UNSET_FILTER'
const initialState = Immutable.Map({ mode: 'info' })
const SET_MEASURES = 'SET_MEASURES'
const CLEAN_MEASURES = 'CLEAN_MEASURES'
export const cleanMeasures = ({ app, group }) => (dispatch, getState) => {
    dispatch({ type: CLEAN_MEASURES, app, group })
}
export const setMeasures = ({ app, group, mGroup }) => (dispatch, getState) => {
    const measures = Object.keys(mGroup.measures).filter(k => mGroup.measures[k].selected)
    const newMgroup = { ...mGroup }
    newMgroup[app] = { measures: {} }
    measures.forEach(m => {
        newMgroup[app].measures[m] = { ...mGroup.measures[m] }
    })
    newMgroup[app].format = mGroup.format
    dispatch({ type: SET_MEASURES, app, group, measure: newMgroup })
}



export const loadFilterItems = ({ app, type, group, param, autoApply, params, parentParam, parentType, parentSelectedItems, uniqueStorage, dvzProxyDatasetId }) => (dispatch, getState) => {

    const newPrams = { ...params }
    newPrams[parentParam] = parentSelectedItems


    api.getCategory({ app, params: newPrams, type })
        .then(
            data => {

                dispatch({
                    type: RELOAD_CHILD_FILTER_ITEMS,
                    filterType: type,
                    parentType,
                    param,
                    app,
                    group,
                    data,
                    uniqueStorage,
                    dvzProxyDatasetId,
                    autoApply
                })
            })
}


export const setFilter = (props) => (dispatch, getState) => {
    const { app, group, param, value, autoApply, parent } = props
    console.log("set filters")
    dispatch({ type: SET_FILTER, app, group, param, value, autoApply, parent })
}


export const cleanFilter = ({ app, group }) => (dispatch, getState) => {
    dispatch({ type: CLEAN_FILTER, app, group })
    //dispatch({type: CLEAN_MEASURES, app, group})
}
export const unsetFilter = ({ app, group, param, parent }) => (dispatch, getState) => {

    dispatch({ type: UNSET_FILTER, app, group, param, parent })

}
export const applyFilter = ({ app, group }) => (dispatch, getState) => {
    dispatch({ type: SET_APPLY, app, group })
}
export const setInitialFilters = ({ app, group, param, value }) => (dispatch, getState) => {
    dispatch({ type: SET_INITIAL_FILTER, app, group, param, value })
}




export const getCategories = (props) => (dispatch, getState) => {
    const { app, params, dvzProxyDatasetId, uniqueStorage } = props
    dispatch({ type: LOAD_CATEGORIES, params, app, uniqueStorage, dvzProxyDatasetId })

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
        }))
}
export const setData = ({ app, group, csv, store, params }) => (dispatch, getState) => {

    const filters = getState().get('data').getIn(['filters', app, group]);
    if (filters) {
        params = { ...params, ...filters.toJS() }
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

    const d2 = { ...data, data: filtered, appliedFilters: params }
    dispatch({ type: LOAD_DATA_DONE, app, group, store, data: { count: d2.data.length, itemsSize: d2.data.length, ...d2 } })
}
export const getData = (props) => (dispatch, getState) => {

    const { app, group, source, store, params, parent } = props
    let filters = getState().get('data').getIn(['filters', app, group]);
    let newParams = { ...params }


    if (filters) {
        //preset filters overrides selected filters
        /*
         // Example: If the component has a preset `Gender=Female` filter, 
        // selecting anything other than "Female" should result in no data being shown.

        dvzProxyDatasetId: "122"
        meta_source: ['aadgg']
                sex: ['Female']

        for those components that were using preset filter as default filter, please use the new 
        default selected filter setting of Filter Component
        */

        const userFilters = filters.toJS();
        newParams = { ...userFilters, ...params };

        if (params) {
            debugger;
            Object.keys(params).forEach(key => {
                if (userFilters[key] !== undefined) {
                    const presetValues = Array.isArray(params[key]) ? params[key] : [params[key]];
                    const userValues = Array.isArray(userFilters[key]) ? userFilters[key] : [userFilters[key]];

                    const hasPreset = presetValues.some(val => userValues.includes(val));

                    if (!hasPreset) {
                        newParams[key] = [Number.MIN_SAFE_INTEGER];
                    }
                }
            });
        }
    }

    dispatch({ type: LOAD_DATA, app, group, params: newParams, store })

    api.getData({ app, source, params: newParams })
        .then(data => {
            data.appliedFilters = newParams
            return dispatch({ type: LOAD_DATA_DONE, app, group, store, data, params: newParams })
        })
        .catch(error => dispatch({ type: LOAD_DATA_ERROR, app, group, store, error }))

}
export const setPageModuleProps = ({ data }) => (dispatch, getState) => {
    dispatch({ type: SET_PAGE_MODULE_PROPS, data })
}
export default (state = initialState, action) => {


    switch (action.type) {
        case LOAD_DATA: {
            const { store, app, group, params } = action
            const time = Date.now()

            return state.deleteIn([...store, 'error'])
                .setIn([...store, 'loading'], true)
                .setIn([...store, 'time'], time)
                .setIn([...store, 'presetFilter'], params);

        }
        case LOAD_DATA_ERROR: {
            const { error, store, app, group } = action
            return state
                .setIn([...store, 'loading'], false)
                .setIn([...store, 'error'], error)
                .setIn(['filters-settings', app, group, "apply"], null);
        }
        case LOAD_DATA_DONE: {
            const { data, app, group, store } = action
            return state
                .setIn([...store, 'loading'], false)
                .deleteIn([...store, 'error'])
                .setIn([...store, 'data'], data)
                .setIn(['filters-settings', app, group, "apply"], null);
        }

        case SET_PAGE_MODULE_PROPS: {
            const { data } = action
            return state
                .setIn(['pageModuleProps'], data);
        }
        case LOAD_CATEGORIES: {
            const { data, app, uniqueStorage, dvzProxyDatasetId } = action
            const path = ["categories", app]
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
            const { data, app, uniqueStorage, dvzProxyDatasetId } = action
            const path = ["categories", app]
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
            const { data, app, uniqueStorage, dvzProxyDatasetId } = action
            const path = ["categories", app]
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
            const { app, group } = action
            return state.setIn(['filters-settings', app, group, "apply"], new Date().getTime())
        }

        case SET_FILTER: {
            const now = Date.now();
            const { app, group, param, value, autoApply, parent } = action

            return state.setIn(['filters-settings', app, group, "autoApply"], autoApply)
                .setIn(['filters', app, group, param], value.length === 0 ? [Number.MIN_SAFE_INTEGER] : value)
                .setIn(['filters-settings', app, group, "apply"], null)
                .setIn(['filters-settings', app, group, 'lastUserFilterChange'], now)
                .setIn(['filters-settings', app, group, "parent"], parent ? parent : null);



        }


        case SET_FILTERS: {


            const now = Date.now();
            const { app, group, filters, autoApply } = action
            return state.setIn(['filters-settings', app, group, "autoApply"], autoApply)
                .setIn(['filters', app, group, param], value.length === 0 ? [Number.MIN_SAFE_INTEGER] : value)
                .setIn(['filters-settings', app, group, "apply"], null)
                .setIn(['filters-settings', app, group, 'lastUserFilterChange'], now);
        }


        case RELOAD_CHILD_FILTER_ITEMS: {

            const { data, app, group, param, uniqueStorage, dvzProxyDatasetId, filterType, parentType, autoApply } = action
            const now = Date.now();

            const path = ["categories", app]
            if (dvzProxyDatasetId) {
                path.push(dvzProxyDatasetId)
            }
            if (uniqueStorage) {
                path.push(uniqueStorage)
            }




            const filterItems = data.filter(d => d.type == filterType)

            //previous items on category
            const prevItems = state.getIn([...path, "items"]).filter(f => f.get("type") == filterType)
            const prevItemsJs = prevItems.get(0).get("items").map(p => p.value)

            //keep other categories 
            const otherCategories = state.getIn([...path, "items"]).filter(p => {
                return p.get("type") != filterType
            })
            //set new items
            const newItems = otherCategories.push(Immutable.Map(filterItems[0]))


            //previous child applied filter
            const appliedFilters = state.getIn(["filters", app, group, param])
            //on new items, set selected those items that were selected previously 
            const newItemsValues = data[0].items.map(i => i.value)

            //if filter were removed we should unselect them 
            const onlySelectedPresentOnItems = appliedFilters.filter(f => {
                return newItemsValues.indexOf(f) > -1
            })


            //if we have new items (meaning more parent filters selected, new items should be selected by default)
            const addedItems = newItemsValues.filter(f => {
                //new items added to the list only 
                return prevItemsJs.indexOf(f) == -1
            })

            const consolidatedFilters = Array.from(new Set([...onlySelectedPresentOnItems, ...addedItems]))



            return state.setIn([...path, "items"], newItems)
                .setIn(["filters", app, group, param], Array.from(consolidatedFilters))
                .setIn(['filters-settings', app, group, "autoApply"], autoApply)
                .setIn(['filters', app, group, param], consolidatedFilters.length === 0 ? [Number.MIN_SAFE_INTEGER] : consolidatedFilters)
                .setIn(['filters-settings', app, group, "apply"], null)
                .setIn(['filters-settings', app, group, 'lastUserFilterChange'], now);

        }



        case SET_INITIAL_FILTER: {
            const now = Date.now();
            const { app, group, param, value } = action

            return state.setIn(['filters', 'initial', app, group, param], value.length === 0 ? [Number.MIN_SAFE_INTEGER] : value)
                .setIn(['filters', app, group, param], value.length === 0 ? [Number.MIN_SAFE_INTEGER] : value)
                .setIn(['filters-settings', app, group, 'lastInitialFilterChange'], now)
                .setIn(['filters-settings', app, group, 'lastUserFilterChange'], now);
        }

        case UNSET_FILTER: {
            const now = Date.now();
            const { app, group, param, parent } = action
            return state.deleteIn(['filters', app, group, param])
                .setIn(['filters-settings', app, group, 'lastUserFilterChange'], now)
                .setIn(['filters-settings', app, group, "parent"], parent ? parent : null);;
        }


        case CLEAN_FILTER: {
            const { app, group } = action
            const initial = state.getIn(['filters', 'initial', app, group])
            return state.setIn(['filters', app, group], initial)
        }

        case SET_MEASURES: {
            const { app, group, measure } = action
            return state.setIn(['measures', app, group], measure)

        }
        case CLEAN_MEASURES: {
            const { app, group, measure } = action
            return state.deleteIn(['measures', app, group])

        }

        default:
            return state;
    }
};

export const clearPostsFilter = ({ group, dispatch, initialFilters }) => {
    dispatch({
        type: SET_INITIAL_POSTS_FILTER,
        group,
        ...initialFilters,
        reset: true,
        page: 1
    });
}
