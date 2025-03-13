import * as api from './data-api'
import Immutable from 'immutable'
import Papa from 'papaparse'

const LOAD_DATA = 'LOAD_DATA'
const LOAD_DATA_DONE = 'LOAD_DATA_DONE'
const LOAD_DATA_ERROR = 'LOAD_DATA_ERROR'
const LOAD_CATEGORIES = 'LOAD_CATEGORIES'
const LOAD_CATEGORIES_DONE = 'LOAD_CATEGORIES_DONE'
const LOAD_CATEGORIES_ERROR = 'LOAD_CATEGORIES_ERROR'


const SET_FILTER = 'SET_FILTER'
const SET_INITIAL_FILTER = 'SET_INITIAL_FILTER'
const CLEAN_FILTER = 'CLEAN_FILTER'
const initialState = Immutable.Map({mode: 'info'})

const SET_MEASURES = 'SET_MEASURES'
const CLEAN_MEASURES = 'CLEAN_MEASURES'

export const cleanMeasures = ({app, group}) => (dispatch, getState) => {
    dispatch({type: CLEAN_MEASURES, app, group})
}


export const setMeasures = ({app, group, mGroup}) => (dispatch, getState) => {

    const measures = Object.keys(mGroup.measures).filter(k => mGroup.measures[k].selected)

    const newMgroup = {...mGroup}

    newMgroup[app] = {measures: {}}
    measures.forEach(m => {
        newMgroup[app].measures[m] = {...mGroup.measures[m]}
    })
    newMgroup[app].format = mGroup.format
    dispatch({type: SET_MEASURES, app, group, measure: newMgroup})
}


export const setFilter = ({app, group, param, value, autoApply}) => (dispatch, getState) => {

    dispatch({type: SET_FILTER, app, group, param, value,autoApply})
}


export const cleanFilter = ({app, group}) => (dispatch, getState) => {

    dispatch({type: CLEAN_FILTER, app, group})
    //dispatch({type: CLEAN_MEASURES, app, group})
}


export const setInitialFilters = ({app, group, param, value}) => (dispatch, getState) => {
    dispatch({type: SET_INITIAL_FILTER, app, group, param, value})
}


export const getCategories = (props) => (dispatch, getState) => {
    const {app, params} = props
    dispatch({type: LOAD_CATEGORIES, params, app, datasetId: params.datasetId})
    api.getCategories({app, params})
      .then(data => {              
          data.appliedFilters = params
          return dispatch({type: LOAD_CATEGORIES_DONE, app, data, datasetId: params.datasetId})
      })
      .catch(error => dispatch({type: LOAD_CATEGORIES_ERROR, app, error, datasetId: params.datasetId}))
}


export const setData = ({app, group, csv, store, params}) => (dispatch, getState) => {
    const filters = getState().get('data').getIn(['filters', app, group])
    if (filters) {
        params = {...params, ...filters.toJS()}
    }

    const data = Papa.parse(csv, {header: true, dynamicTyping: true});

    const filtered = data.data.filter(d => {
        let filtered = false
        Object.keys(params).forEach(k => {
            const field = k
            const value = params[k]
            if (d[k]) {
                const filterValue = d[k].toString().trim().toLowerCase();
                filtered = value.filter(v => v && v.toString().trim().toLowerCase() == filterValue).length == 0
            }
        })

        return !filtered
    })

    const d2 = {...data, data: filtered, appliedFilters: params}
    dispatch({type: LOAD_DATA_DONE, store, data: {count: d2.data.length, itemsSize: d2.data.length, ...d2}})
}

export const getData = ({app, group, source, store, params}) => (dispatch, getState) => {
    const filters = getState().get('data').getIn(['filters', app, group])

    if (filters) {
        params = {...params, ...filters.toJS()}
    }
    dispatch({type: LOAD_DATA, params, store})
    api.getData({app, source, params})
        .then(data => {
            data.appliedFilters = params
            return dispatch({type: LOAD_DATA_DONE, store, data})
        })
        .catch(error => dispatch({type: LOAD_DATA_ERROR, store, error}))

}


export default (state = initialState, action) => {

    switch (action.type) {
        case LOAD_DATA: {
            const {store} = action
            const time=Date.now()
            return state.deleteIn([...store, 'error'])
                .setIn([...store, 'loading'], true)
                .setIn([...store, 'time'], time)
        }
        case LOAD_DATA_ERROR: {
            const {error, store} = action
            return state
                .setIn([...store, 'loading'], false)
                .setIn([...store, 'error'], error)
        }
        case LOAD_DATA_DONE: {
            const {data, store} = action
            return state
                .setIn([...store, 'loading'], false)
                .deleteIn([...store, 'error'])
                .setIn([...store, 'data'], data)
        }


        case LOAD_CATEGORIES: {
            const {data, app, datasetId} = action
            const path = ["categories", app]

            if (datasetId) {
                path.push(datasetId)
            }

            return state.setIn([...path, "loading"], true)
                .deleteIn([...path, "error"])
        }

        case LOAD_CATEGORIES_DONE: {
            const {data, app, datasetId} = action
            const path = ["categories", app]

            if (datasetId) {
                path.push(datasetId)
            }
            
            return state.setIn([...path, "loading"], false)
                    .setIn([...path, "items"], Immutable.fromJS(data))            
        }
        case LOAD_CATEGORIES_ERROR: {
             const {data, app, datasetId} = action
            const path = ["categories", app]

            if (datasetId) {
                path.push(datasetId)
            }
            
            return state.setIn([...path, "loading"], false)
                .setIn([...path, "error"], data)
          
        }
        case SET_FILTER: {
            const {app, group, param, value,autoApply} = action
            debugger; //eslint-disable-line
            return  state.setIn(['filters-settings', app, group, "autoApply"],autoApply)
                .setIn(['filters', app, group, param], value.length === 0 ? [Number.MIN_SAFE_INTEGER] : value)
        }

        case SET_INITIAL_FILTER: {
            const {app, group, param, value} = action
            return state.setIn(['filters', 'initial', app, group, param], value.length === 0 ? [Number.MIN_SAFE_INTEGER] : value)
                .setIn(['filters', app, group, param], value.length === 0 ? [Number.MIN_SAFE_INTEGER] : value)
        }

        case CLEAN_FILTER: {
            const {app, group} = action
            const initial = state.getIn(['filters', 'initial', app, group])
            return state.setIn(['filters', app, group], initial)
        }

        case SET_MEASURES: {
            const {app, group, measure} = action
            return state.setIn(['measures', app, group], measure)

        }
        case CLEAN_MEASURES: {
            const {app, group, measure} = action

            ;
            return state.deleteIn(['measures', app, group])

        }

        default:
            return state
    }
}
