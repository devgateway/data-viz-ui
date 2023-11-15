import {
    AnglePickerControl, Button, PanelBody, PanelRow, RangeControl, SelectControl, TextControl
} from "@wordpress/components";
import {PanelColorSettings} from "@wordpress/block-editor";
import {__} from '@wordpress/i18n';
import CSVPatternGenerator from './CSVPatternGenerator';
import AppPatternGenerator from "./AppPatternGenerator";
import Papa from 'papaparse'

const Patterns = (props) => {
    const {app} = props

    if (app == "csv") {
        return <CSVPatternGenerator {...props}/>
    } else {
        return <AppPatternGenerator {...props}/>
    }
}


export default Patterns;