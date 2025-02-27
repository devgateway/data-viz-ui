import {__} from '@wordpress/i18n';
import {CheckboxControl, PanelBody, PanelRow, SelectControl, ToggleControl} from '@wordpress/components';

import Format from '../../../charts/Format.jsx'
import {togglePanel} from "../../../commons/Util";
import {getTranslation} from "../../../commons/APIutils";

const defaultFormat = {
    "style": "percent",
    "minimumFractionDigits": 1,
    "maximumFractionDigits": 1,
    "currency": "USD"

}

const Measures = (props) => {
    const {
        onMeasuresChange,
        onFormatChange,
        onSetSingleMeasure,
        allMeasures,
        setAttributes,
        panelStatus,
        layer: {
            measures,
            app,
            format
        }
    } = props


    const MCheckbox = ({measure}) => {

        const userMeasure = measures ? measures[measure.value] : {}
        return <CheckboxControl
            label={getTranslation(measure)}
            checked={measures.indexOf(measure.value) > -1}
            onChange={(value) => onSetSingleMeasure(measure.value)}/>
    }


    const countSelected = (g) => {
        const groupMeasures = allMeasures.filter(m => m.group.label === g).map(m => m.value)
        if (groupMeasures.length > 0) {
            return groupMeasures.filter(m => measures.includes(m)).length
        }
        return 0
    }

    return <PanelBody initialOpen={false} title={__("Measures")}>
        {allMeasures && [...new Set(allMeasures.map(p => getTranslation(p.group)))].map(g => {
            return (<PanelBody
                initialOpen={false}
                onToggle={e => togglePanel(g, panelStatus, setAttributes)}
                title={`${g} (${countSelected(g)} / ${allMeasures.filter(f => f.group.label === g).length} ) `}>
                {allMeasures.filter(f => getTranslation(f.group) === g)
                    .map(m => <PanelRow>
                        <PanelRow>
                            <MCheckbox measure={m}></MCheckbox>
                        </PanelRow>
                    </PanelRow>)}
            </PanelBody>)
        })}

        <Format
            format={format ? format : defaultFormat}
            hiddenCustomAxisFormat={true}
            onFormatChange={format => {
                onFormatChange(format)
            }}>
        </Format>

    </PanelBody>
}


export default Measures