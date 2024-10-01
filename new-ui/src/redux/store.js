import {applyMiddleware, compose, createStore} from 'redux'
import {createBrowserHistory, createHashHistory} from 'history'
import Immutable from 'immutable'
import createRootReducer, { routerMiddleware, createReduxHistory } from "./reducer";
import { configureStore } from '@reduxjs/toolkit';

const useHash = process.env.REACT_APP_USE_HASH_LINKS === true;
export const history = useHash? createHashHistory():createBrowserHistory()

const initialState = Immutable.Map()

const getRootReducer = () => {
    return createRootReducer()
}


export const store  = configureStore({
    reducer: getRootReducer(),
    initialState,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(routerMiddleware)
});

export const reduxHistory = createReduxHistory(store);
