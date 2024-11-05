import { Action, ReducersMapObject } from "redux";
import Immutable from "immutable";
import { getUnexpectedInvocationParameterMessage } from "./utils";

export const combineReducers = <S extends Immutable.Map<string, any>>(
  reducers: ReducersMapObject<any, any>,
  getDefaultState: () => S
): ((inputState: S | undefined, action: Action) => S) => {
  const reducerKeys = Object.keys(reducers);

   
  return (inputState: S | undefined, action: Action): S => {
    if (typeof inputState === "undefined") {
      inputState = getDefaultState();
    }

     
    if (process.env.NODE_ENV !== "production") {
      const warningMessage = getUnexpectedInvocationParameterMessage(
        inputState,
        reducers,
        action
      );

      if (warningMessage) {
         
        console.error(warningMessage);
      }
    }

    return inputState.withMutations(temporaryState => {
      reducerKeys.forEach(reducerName => {
        const reducer = reducers[reducerName];
        const currentDomainState = temporaryState.get(reducerName);
        const nextDomainState = reducer(currentDomainState, action);

        if (nextDomainState === undefined) {
          throw new Error(
            'Reducer "' +
              reducerName +
              '" returned undefined when handling "' +
              action.type +
              '" action. To ignore an action, you must explicitly return the previous state.'
          );
        }

        temporaryState.set(reducerName, nextDomainState);
      });
    });
  };
};