import {PanelBody, PanelRow, ToggleControl, TextareaControl, SelectControl} from '@wordpress/components';
import {__} from '@wordpress/i18n';


const CSVConfig = ({attributes:{app,  csv, hasMultipleMeasures, enableSummaryView},setAttributes}) => {

    return (
        [<PanelBody initialOpen={false} title={__("CSV Configuration")}>
            <PanelRow>
                <ToggleControl
                    label="Has Multiple Measures"
                    checked={hasMultipleMeasures}
                    onChange={() => setAttributes({ hasMultipleMeasures: !hasMultipleMeasures })}
                />
            </PanelRow>               
            <PanelRow>
                <TextareaControl
                    label={__("CSV Data")}
                    value={csv}
                    onChange={(csv) => setAttributes({ csv })}
                />
            </PanelRow>
        </PanelBody>     
        ]
    )

}

export default CSVConfig