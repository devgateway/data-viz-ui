import {combineReducers} from '@/lib/redux-immutable'
import {wordpress} from "@devgateway/wp-react-lib"
import {reducers} from '../embeddable'
import { intlReducer } from '@/lib/react-intl-redux';
import * as Immutable from 'immutable';

const appReducers = {
    ...reducers,
    wordpress,
    intl: intlReducer
}

const initialState = () => Immutable.Map<string, any>();


const createRootReducer = () => combineReducers(appReducers, initialState);

export default createRootReducer
