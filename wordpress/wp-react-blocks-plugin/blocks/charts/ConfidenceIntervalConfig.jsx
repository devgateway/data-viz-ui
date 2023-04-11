import { Component } from "@wordpress/element";
import {PanelBody, PanelRow, TextControl} from '@wordpress/components';
import {__} from '@wordpress/i18n';


export default class ConfidenceIntervalConfig extends Component {
    constructor(props) {
        super(props);
    }
 
    setFieldData(serieId, serieLabel, dataField, value) { 
         const { attributes: { confidenceIntervals }, setAttributes } = this.props
        const newConfidenceIntervals = confidenceIntervals.slice()
        let current = newConfidenceIntervals.filter(c => c.serieId == serieId)[0]
         if (!current) {
            current = {serieId,serieLabel}
            current[dataField] = value           
            newConfidenceIntervals.push(current)
        }
        current[dataField] = value
        setAttributes({ confidenceIntervals: newConfidenceIntervals });
    }
   
     render() {    
    const {
        app,
        series,
        setAttributes,
        attributes: {
            confidenceIntervals        
        }
    }= this.props;

    return [
        <PanelBody initialOpen={false}  title={__("Confidence Intervals")} initialOpen={false}>
            {series && series.map(s=>{
            const current = confidenceIntervals.filter(c => c.serieId == s.id)[0]
             
             return (<>
             <PanelRow> <label>{s.value} </label></PanelRow>
             <PanelRow>             
             <span><TextControl
                 label={__("Low")}
                 value={ current && current.low ? parseFloat(current.low): null}
                 onChange={(value) => 
                    this.setFieldData(s.id, s.value,'low', value)
                }
                type="number"                
             />
             </span>
             <span>

             </span>
             <span style={{marginLeft: "10px"}}>
              <TextControl
                 label={__("High")}
                 value={current && current.high ? parseFloat(current.high) : null}                 
                 onChange={(value) => this.setFieldData(s.id, s.value,'high', value)}
                 type="number"
             />
             </span>
         </PanelRow></>)
             })}            
        </PanelBody>
    ]
}
}

