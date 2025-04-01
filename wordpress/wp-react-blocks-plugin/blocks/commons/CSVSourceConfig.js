import {PanelBody, PanelRow, TextareaControl} from '@wordpress/components';
import {__} from '@wordpress/i18n';
import Format from "../charts/Format.jsx";
import {togglePanel} from "./Util";

const defaultFormat = {
    "style": "percent",
    "minimumFractionDigits": 1,
    "maximumFractionDigits": 1,
    "currency": "USD"     
}

const CSVConfig = ({attributes: {csv, panelStatus, measures, type}, setAttributes}) => {

    const onFormatChange = (format, field) => {           
        const app = "csv"
        const uMs = measures ? JSON.parse(JSON.stringify(measures)) : {}
        if (!uMs[app]) {
            uMs[app] = {allowSelection: false, format: Object.assign({}, defaultFormat), customFormat: Object.assign({}, {...defaultFormat}), selected: false}
        }     
        uMs[app][field] = format
        setAttributes({measures: uMs})

        
    }

   const onUseCustomAxisFormatChange = (value) =>{
        const app = "csv"
        const uMs = measures ? JSON.parse(JSON.stringify(measures)) : {}
        if (uMs[app]) {
            uMs[app].useCustomAxisFormat = value

            if (!uMs[app].customFormat) {
                uMs[app].customFormat = Object.assign({}, {...defaultFormat})
            } 
            setAttributes({ measures: uMs })
        }  else {
            uMs[app] = {allowSelection: false, format: Object.assign({}, {...defaultFormat}), customFormat: Object.assign({}, {...defaultFormat}), selected: false}
            uMs[app].useCustomAxisFormat = value
            setAttributes({ measures: uMs })
        }

    }

    return (
        [<PanelBody initialOpen={false} title={__("CSV Configuration")}
                    onToggle={e => togglePanel("csv_cfg",panelStatus,setAttributes)}>
            <PanelRow>
                <TextareaControl
                    label={__("CSV Data")}
                    value={csv}
                    onChange={(csv) => setAttributes({csv})}
                />
            </PanelRow>

            <Format
                hiddenCustomAxisFormat={type=='radar' || type=='big-number'}              
                format={measures["csv"] && measures["csv"].format ? measures["csv"].format : {}}
                customFormat={measures["csv"] && measures["csv"].customFormat ? measures["csv"].customFormat : {}}
                useCustomAxisFormat={measures["csv"] ? measures["csv"].useCustomAxisFormat : false}
                onFormatChange={(newFormat, field) => {
                    onFormatChange(newFormat, field)
                }}
                onUseCustomAxisFormatChange = {value => {
                    onUseCustomAxisFormatChange(value)
                }}
                >
            </Format>
        </PanelBody>
        ]
    )

}

export default CSVConfig