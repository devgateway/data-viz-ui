import {__} from '@wordpress/i18n';
import {CheckboxControl, PanelBody, PanelRow, ToggleControl} from '@wordpress/components';
import {getTranslation} from "../commons/APIutils";


const Measures = (props) => {
    const {
        currentType,
        onMeasuresChange,
        onSetSingleMeasure,
        allMeasures,
        setAttributes,
        attributes: {
            measures,
            dimension2,
        }
    } = props


    const MeasureToggle = ({measure}) => {
        return (<ToggleControl
            label={measure.label}
            checked={measures.indexOf(measure.value) > -1}
            onChange={(value) => onMeasuresChange(measure.value)}/>)
    }
    const MeasureCheckBox = ({measure}) => {
        return <CheckboxControl
            label={measure.label}
            checked={measures.indexOf(measure.value) > -1}
            onChange={(value) => onSetSingleMeasure(measure.value)}/>
    }

      
    return <PanelBody initialOpen={false} title={__("Measures")}>
              {
            [...new Set(allMeasures.map(p => getTranslation(p.group)))].map(g => {
                    return (<PanelBody title={g}>
                            {allMeasures.filter(f => getTranslation(f.group) === g).map(m => <PanelRow><MeasureCheckBox
                                measure={m}></MeasureCheckBox></PanelRow>)}
                        </PanelBody>
                    )
                }
            )
            }
    </PanelBody>
}


export default Measures