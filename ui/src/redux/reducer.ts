import {combineReducers} from 'redux-immutable';
import {wordpress} from "@devgateway/wp-react-lib"
import {reducers} from '../embeddable'
import { intlReducer } from '@/lib/react-intl-redux';


const createRootReducer = () => combineReducers({
    wordpress,
    ...reducers,
    intl: intlReducer
});

export default createRootReducer
