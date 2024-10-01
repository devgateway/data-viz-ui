import {combineReducers} from 'redux-immutable';
import {wordpress} from "@devgateway/wp-react-lib"
import {reducers} from '../embeddable'
import { createReduxHistoryContext } from "redux-first-history";
import { createBrowserHistory } from "history";
import { intlReducer } from '@/lib/react-intl-redux';

const {
    createReduxHistory,
    routerMiddleware,
    routerReducer
} =
    createReduxHistoryContext({
        history: createBrowserHistory(),
    })

const createRootReducer = () => combineReducers({
    router: routerReducer,
    wordpress,
    ...reducers,
    intl: intlReducer
});

export { createReduxHistory, routerMiddleware };
export default createRootReducer
