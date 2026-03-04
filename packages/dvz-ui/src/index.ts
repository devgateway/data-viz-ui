export {
    getComponentByNameIgnoreCase,
    components,
    reducers,
    customizer
} from "./embeddable/index";
export * from "./conf";
export * from "./layout";
export * from "./tracker";
export * from "./redux";
export * from "./lib";
export * from "./translations";
export * from './countries';
export * from './utils';



export { default as DataConsumer } from "./embeddable/data/DataConsumer.jsx"
export { default as DataProvider } from "./embeddable/data/DataProvider.jsx"
export { default as DataContext } from "./embeddable/data/DataContext.jsx"
export * from "./embeddable/data/index.js"
export * from "./embeddable/utils/index.js"

export *  as reducer from "./embeddable/reducers/data.js"




