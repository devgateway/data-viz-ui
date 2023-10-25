import { Component } from "@wordpress/element"
import {PanelColorSettings } from '@wordpress/block-editor'
import { PanelBody, PanelRow, SelectControl, TextControl, ToggleControl, Button, ButtonGroup, RangeControl, TextareaControl} from '@wordpress/components'
import { __ } from '@wordpress/i18n';
import {SizeConfig } from '../commons/index'
import Format from "./Format"

export default class Settings  extends Component{
    constructor(props) {
        super(props);        
    }  
    render() {
        const {setAttributes, attributes: {
                height,
                app,
                nationalAverageLabel,
                zoomEnabled,
                mapCenter,
                mapLabelShowValue,
                showTooltip,
                measureSelectorLabel,
                valueFormat,
                showOverallValue,
                showNoDataLabel,
                group,
                tooltipTheme,
                labelFontColor,
                labelFontWeight,
                labelFontSize,
                legendFontSize,
                legendFontWeight,
                legendTitle,
                tooltipFontSize,
                showAdminUnitLabel,
                highlightedLocation,
                showNoDataTooltip,
                pointLabelColor,
                pointLabelFormat,
                highlightedLocLabelFormat,
                labelsExclusionList,
                noDataText
            },
            locations
        } = this.props;

       return (<PanelBody initialOpen={false} title={__("Settings")}>
                    <PanelRow> <TextControl
                                    label={__('Group Name')}
                                    value={group}
                                    onChange={(group) => setAttributes({group})}
                                />
                    </PanelRow>                     
                    <SizeConfig initialOpen={true} setAttributes={setAttributes} height={height} panelStatus={this.props.attributes.panelStatus}></SizeConfig>                
                    <PanelBody title={__("Labels")} initialOpen={false}>
                    <PanelRow>
                        <TextControl
                            label={__('Measure Selector Label')}
                            value={measureSelectorLabel}
                            onChange={(measureSelectorLabel) => setAttributes({ measureSelectorLabel })}
                        />
                    </PanelRow>
                    {(mapLabelShowValue || showTooltip) &&
                        <PanelRow>
                            <TextControl
                                placeholder={__('#({value},2,{measure})')}
                                label={__('Map Label')}
                                value={valueFormat}
                                onChange={(valueFormat) => setAttributes({ valueFormat })}
                            />
                        </PanelRow>
                    }
                   <PanelRow>
                   <SelectControl
                                label={__('Show Admin Unit Label')}
                                value={[showAdminUnitLabel]}
                                onChange={(value) => {
                                    setAttributes({ showAdminUnitLabel: value })
                                }}
                                options={[{ label: 'Only if admin unit has data', value: 'ifUnitHasData'}, {label: 'Do not show', value: 'doNotShow' }, {label: 'Show All', value: 'showAll' }]}/>
                   </PanelRow>
                   {(showAdminUnitLabel == 'ifUnitHasData' || showAdminUnitLabel == 'showAll') &&
                     <PanelRow>
                     <TextareaControl
                         label={__("Do not show these labels(use comma to separate) ")}
                         value={labelsExclusionList}
                         onChange={(labelsExclusionList) => setAttributes({ labelsExclusionList })}
                     />
                    </PanelRow>
                   }
                    <PanelRow>
                        <ToggleControl
                            label="Map Label: Show Value"
                            checked={mapLabelShowValue}
                            onChange={() => setAttributes({ mapLabelShowValue: !mapLabelShowValue })} />
                    </PanelRow>
                    <PanelRow>
                        <ToggleControl
                            label='Show "No Data" Label'
                            checked={showNoDataLabel}
                            onChange={() => setAttributes({ showNoDataLabel: !showNoDataLabel })} />
                    </PanelRow>    
                    <PanelRow>
                    <RangeControl
                    label={__('Font Size')}
                    value={labelFontSize}
                    onChange={(labelFontSize) => setAttributes({ labelFontSize })}
                    min={0}
                    max={20}
                />
                    </PanelRow>
                    <PanelRow>
                     <ButtonGroup>
                     <Button isPrimary={labelFontWeight == 'lighter'} isSecondary={labelFontWeight != 'lighter'}
                            onClick={e => setAttributes({labelFontWeight: "lighter"})}>
                        {__("Lighter")}
                    </Button>
                     <Button isPrimary={labelFontWeight == 'normal'}
                            isSecondary={labelFontWeight != 'normal'}
                            onClick={e => setAttributes({labelFontWeight: "normal"})}>
                        {__("Normal")}
                    </Button>   
                    <Button isPrimary={labelFontWeight == 'bold'} isSecondary={labelFontWeight != 'bold'}
                            onClick={e => setAttributes({labelFontWeight: "bold"})}>
                        {__("Bold")}
                    </Button>                                                    
                    </ButtonGroup>                                                        
                </PanelRow>
                <PanelRow>
                <PanelColorSettings
                    title={__('Label font color')}
                    colorSettings={[
                        {
                            value: decodeURIComponent(labelFontColor ? labelFontColor : "#f0f0f1"),
                            onChange: (color) => {
                                if (color) {
                                    setAttributes({labelFontColor: encodeURIComponent(color)})
                                } else {
                                    setAttributes({labelFontColor: null})
                                }
                            },
                            label: __("")
                        }
                    ]}

                />
                </PanelRow>  
                </PanelBody>  
                <PanelBody title={__("Point Settings")} initialOpen={false}><PanelRow>
                <PanelColorSettings
                    title={__('Label font color')}
                    colorSettings={[
                        {
                            value: decodeURIComponent(pointLabelColor ? pointLabelColor : "#f0f0f1"),
                            onChange: (color) => {
                                if (color) {
                                    setAttributes({pointLabelColor: encodeURIComponent(color)})
                                } else {
                                    setAttributes({pointLabelColor: null})
                                }
                            },
                            label: __("")
                        }
                    ]}

                />
                </PanelRow> 
                <PanelRow>
                            <TextControl
                                placeholder={__('#({value},2)')}
                                label={__('Point Label')}
                                value={pointLabelFormat}
                                onChange={(pointLabelFormat) => setAttributes({ pointLabelFormat })}
                            />
                        </PanelRow> 
                </PanelBody> 
                 <PanelBody title={__("Legend")} initialOpen={false}>
                <PanelRow>
                    <TextControl
                        label={__('Legend Title')}
                        value={legendTitle}
                        onChange={(legendTitle) => setAttributes({ legendTitle })}
                    />
                </PanelRow>
                <PanelRow>
                    <RangeControl
                        label={__('Legend Font Size')}
                        value={legendFontSize}
                        onChange={(legendFontSize) => setAttributes({ legendFontSize })}
                        min={0}
                        max={20} />
                </PanelRow>
                <PanelRow>
                <ButtonGroup>
                    <label style={{fontSize:'13px'}} className="components-base-control__label">Font Weight </label> <br></br>
                    <Button isPrimary={legendFontWeight == 'lighter'} isSecondary={legendFontWeight != 'lighter'}
                        onClick={e => setAttributes({ legendFontWeight: "lighter" })}>
                        {__("Lighter")}
                    </Button>
                    <Button isPrimary={legendFontWeight == 'normal'}
                        isSecondary={legendFontWeight != 'normal'}
                        onClick={e => setAttributes({ legendFontWeight: "normal" })}>
                        {__("Normal")}
                    </Button>
                    <Button isPrimary={legendFontWeight == 'bold'} isSecondary={legendFontWeight != 'bold'}
                        onClick={e => setAttributes({ legendFontWeight: "bold" })}>
                        {__("Bold")}
                    </Button>
                </ButtonGroup>
            </PanelRow>
             </PanelBody >
             <Format {...this.props}></Format>
                    <PanelRow>
                        <ToggleControl
                            label="Zoom & Pan Enabled"
                            checked={zoomEnabled}
                            onChange={() => setAttributes({ zoomEnabled: !zoomEnabled })}
                        />                        
                    </PanelRow>
                {app != 'csv' &&
                  <>
                <PanelRow>
                <ToggleControl
                    label="Show Overall/National Value"
                    checked={showOverallValue}
                    onChange={() => setAttributes({ showOverallValue: !showOverallValue })}
                />                        
               </PanelRow>
               {showOverallValue &&
                  <PanelRow>
                        <TextControl
                            label={__('Overall Average Label')}
                            value={nationalAverageLabel}
                            onChange={(nationalAverageLabel) => setAttributes({ nationalAverageLabel })}
                        />
                    </PanelRow>
                  }
                    </>
                 }                                      
               
                        {locations &&
                        <PanelRow>
                            <SelectControl
                                label={__('Highlighted Location')}
                                value={[highlightedLocation]}
                                onChange={(value) => {
                                    setAttributes({ highlightedLocation: value })
                                }}
                                options={[{label:'None', value: ''}, ...locations]}/>
                        </PanelRow>
                        }

                       {highlightedLocation &&
                       <PanelRow>
                         <TextControl
                           placeholder={__('{locationName} - Score: #({value},2)')}
                           label={__('Highlighted Location Label')}
                           value={highlightedLocLabelFormat}
                           onChange={(highlightedLocLabelFormat) => setAttributes({ highlightedLocLabelFormat })}
                       />
                     </PanelRow> 
                       }
                        
                </PanelBody>)
    }
}