import {PanelBody, PanelRow, TextareaControl} from '@wordpress/components';
import {__} from '@wordpress/i18n';
import Format from "../charts/Format.jsx";
import {togglePanel} from "./Util";


const CSVConfig = ({attributes: {csv, panelStatus, measures}, setAttributes}) => {


    const onFormatChange = (format) => {
        
        setAttributes({measures: {csv: {format}}})

    }


    return (
        [<PanelBody title={__("CSV Configuration")}
                    initialOpen={panelStatus["csv_cfg"]}
                    onToggle={e => togglePanel("csv_cfg",panelStatus,setAttributes)}>
            <PanelRow>
                <TextareaControl
                    label={__("CSV Data")}
                    value={csv}
                    onChange={(csv) => setAttributes({csv})}
                />
            </PanelRow>

            <Format
                format={measures["csv"] ? measures["csv"].format : {}}
                onFormatChange={format => {
                    onFormatChange(format)
                }}>
            </Format>
        </PanelBody>
        ]
    )

}

export default CSVConfig