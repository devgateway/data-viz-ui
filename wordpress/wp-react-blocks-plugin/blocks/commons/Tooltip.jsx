import {PanelRow, Label, PanelBody, TextareaControl} from '@wordpress/components';
import {__} from '@wordpress/i18n';

const Format = (props) => {

    function repeat(times) {
        return function (...args) {
            return cook(...args).repeat(times);
        };
    }

    function cook(strs, ...substs) {
        return substs.reduce(
            (prev,cur,i) => prev+cur+strs[i+1],
            strs[0]
        );
    }

   

    const {setAttributes,attributes: {tooltipHTML, dimension1, dimension2, measures},allMeasures, allDimensions, type} = props;

    return [
            <PanelBody title={__("Variables")}>
                <div>                             
                {allDimensions.filter(d=>(d.value===dimension1 || d.value===dimension2))
                    .map(d=><PanelRow>
                                <span style={{"font-size":"11px"}}>{d.label} -> {"{"}{d.value}{"}"}</span>
                            </PanelRow>)}
                </div>
                <div>
                    {allMeasures
                        .map(m=><PanelRow>
                            <span style={{"font-size":"11px"}}>{m.label} -> {"{"}{m.value}{"}"}</span>
                        </PanelRow>)}
                </div>
                {dimension1 == "none" && dimension2 == "none" &&
                     <PanelRow>
                            <span style={{"font-size":"11px"}}>Corresponding Population -> {"{"}populationValue{"}"}</span>
                      </PanelRow>
                }  
            {type === "pie" &&
                <>
                    <PanelRow>
                        <span style={{ "font-size": "11px" }}>Value Percent -> {'{valuePercent}'}</span>
                    </PanelRow>
                    <PanelRow>
                        <span style={{ "font-size": "11px" }}>Category -> {'{category}'}</span>
                    </PanelRow>
                </>
            }
            </PanelBody>,
        <PanelRow>
            <TextareaControl
                label={__("Tooltip")}
                value={tooltipHTML}
                help={__("You can use variables {var_name}")}
                onChange={(tooltipHTML) => setAttributes({tooltipHTML})}
                rows={10}                
            />
        </PanelRow>]
}

export default Format