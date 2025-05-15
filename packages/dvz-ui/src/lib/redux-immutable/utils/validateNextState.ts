import { Action } from "redux";

export const validateNextState = (nextState: any, reducerName: string, action: Action): void => {
    if (nextState === undefined) {
        throw new Error('Reducer "' + reducerName + '" returned undefined when handling "' + action.type + '" action. To ignore an action, you must explicitly return the previous state.');
    }
};