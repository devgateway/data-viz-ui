import Immutable, { Record } from 'immutable'
import createRootReducer from "./reducer";
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

const initialState: Immutable.Map<string, any> = Immutable.Map()

const getRootReducer = () => {
    return createRootReducer()
}


export const store  = configureStore({
    reducer: getRootReducer() ,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false
    })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = Record<ReturnType<typeof store.getState>>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
