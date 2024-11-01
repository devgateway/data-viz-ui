import { Action } from "redux";

export const getStateName = (action: Action): string => {
    return action && action.type === '@@redux/INIT' ? 'initialState argument passed to createStore' : 'previous state received by the reducer';
};