import ResponsiveContainer from './ResponsiveContainer.jsx'
import * as customizer from "@devgateway/customizer";

const determineLayout = () => customizer.hasOwnProperty('ResponsiveContainer') ? customizer.ResponsiveContainer : ResponsiveContainer

export default determineLayout();
