import {combineReducers} from 'redux-immutable';
// import {connectRouter} from 'connected-react-router/immutable'
// import {intlReducer} from 'react-intl-redux'
import {wordpress} from "@devgateway/wp-react-lib"
// import {reducers} from '../embeddable/'
import { createReduxHistoryContext } from "redux-first-history";
import { createBrowserHistory } from "history";

const {
    createReduxHistory,
    createReduxHistoryEnhancer,
    routerMiddleware,
    routerReducer
} =
    createReduxHistoryContext({
        history: createBrowserHistory(),
    })

const createRootReducer = () => combineReducers({
    router: routerReducer,
    wordpress,
    // intl: intlReducer
});

export { createReduxHistory, createReduxHistoryEnhancer, routerMiddleware };
export default createRootReducer
