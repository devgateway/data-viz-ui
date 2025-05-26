import { 
    ActionFromReducersMapObject,
    PreloadedStateShapeFromReducersMapObject,
    Reducer,
    StateFromReducersMapObject
} from '@reduxjs/toolkit';

export type ReducerType<M> = M [keyof M] extends Reducer<any,any,any> 
| undefined ?  Reducer<StateFromReducersMapObject<M>, ActionFromReducersMapObject<M>, Partial<PreloadedStateShapeFromReducersMapObject<M>>> : never;