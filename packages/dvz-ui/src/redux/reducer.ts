import {combineReducers} from '@/lib/redux-immutable'
import * as wpReactLib from "@devgateway/wp-react-lib"
import {reducers} from '../embeddable'
import { intlReducer } from '@/lib/react-intl-redux';
import * as Immutable from 'immutable';
import type { Reducer } from 'redux';

const wordpress = (wpReactLib as {wordpress?: Reducer}).wordpress as Reducer

const appReducers = {
    ...reducers,
    wordpress,
    intl: intlReducer
}

const initialState = () => Immutable.Map<string, any>();


const createRootReducer = () => combineReducers(appReducers, initialState);

export default createRootReducer
