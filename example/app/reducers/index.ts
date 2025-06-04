import example from "./example-reducer";
import {customizer} from "@devgateway/dvz-ui-react";

const reducers = {
  example,
};

// @ts-ignore
customizer.registerCustomReducers(reducers);