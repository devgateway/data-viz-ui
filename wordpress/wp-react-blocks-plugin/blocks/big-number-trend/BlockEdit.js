import {InspectorControls, PanelColorSettings, useBlockProps} from '@wordpress/block-editor';
import {
    Panel,
    PanelBody,
    PanelRow,
    ResizableBox,
    SelectControl,
    TextControl,
    FontSizePicker,
    __experimentalText as Text,
    ToggleControl,
    TextareaControl
} from '@wordpress/components';
import {__} from '@wordpress/i18n';
import {BlockEditWithAPIMetadata, SizeConfig} from '../commons/index'
import CSVSourceConfig from "../commons/CSVSourceConfig";
import {togglePanel} from "../commons/Util";
import Measures from "../commons/Measures";
import DataFilters from "../commons/DataFilters";
import {isSupersetAPI} from "../commons/APIutils";
import Format from "../charts/Format.jsx";


class BlockEdit extends BlockEditWithAPIMetadata {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        super.componentDidMount()
    }

    render() {
        const {
            className, isSelected,
            toggleSelection, setAttributes,
            attributes: {
                measures,
                height,
                app,
                format,
                filters,
                group,
                panelStatus,
                dvzProxyDatasetId,
                label,
                bigNumberFontSize,
                percentFontSize,                
                labelFontSize,   
                textColor,          
                dimension1,
                showPercentageChange,
                csv, 
                type
            }
        } = this.props;


        const  datasets = [{label: 'Select Dataset', value: '0'}]
        if (this.state.datasets) {
            this.state.datasets.forEach(d => {
                datasets.push({label: d.label, value: d.id})
            })
        }

        let params = {}
        filters.forEach(f => {
            if (f.value != null && f.value.filter(v => v != null && v.toString().trim() != "").length > 0)
                params[f.param] = f.value
        })
        const divStyles = {height: height + 'px', width: '100%'}

        return ([isSelected && (
            <InspectorControls>
                <Panel header={__("Chart Configuration")}>
                    <PanelBody
                      panelStatus={panelStatus['GROUP']}
                      onToggle={e => togglePanel("GROUP", panelStatus, setAttributes)}
                      title={__("Group")}>
                        <PanelRow>
                            <TextControl
                              label={__('Name')}
                              value={group}
                              onChange={(group) => setAttributes({group})}
                      />
                        </PanelRow>
                    </PanelBody>
                    <SizeConfig setAttributes={setAttributes} panelStatus={panelStatus}
                                height={height}></SizeConfig>

                    <>
                        <PanelBody initialOpen={false} title={__("API & Source")}>
                            <PanelRow>
                                <SelectControl
                                  value={[app]}
                                  onChange={(app) => {
                                      setAttributes({
                                          app: app
                                      })
                                  }}
                                  options={this.state.apps}
                                />
                            </PanelRow>


                             {isSupersetAPI(app, this.state.apps) &&   <PanelRow>
                                                                    <SelectControl
                                                                        label={__('Datasets')}
                                                                        value={[dvzProxyDatasetId]}
                                                                        onChange={(newDatasetId)   => {
                                                                            setAttributes({
                                                                                dvzProxyDatasetId: newDatasetId
                                                                            })
                                                                            
                                                                            this.loadMetadata(app, newDatasetId)
                                                                        }}
                                                                        options={datasets}
                                                                    />
                                                                  </PanelRow>
                                                                }
                        </PanelBody>
                        
                        {app != 'csv' &&
                           <PanelBody initialOpen={false} title={__("Dimensions")}>
                               <PanelRow>
                                   <SelectControl
                                       label={__("First Dimension")}
                                       value={[dimension1]} 
                                       onChange={(value) => {
                                           setAttributes({
                                               dimension1: value
                                           });
                                       }}
                                       options={this.state.dimensions}
                                   />
                               </PanelRow>
                           </PanelBody>
                         }
                         {app == 'csv' &&
                         <>
                            <PanelBody initialOpen={false} title={__("CSV Configuration")}
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
                                            format={format}
                                            customFormat={{}}
                                            useCustomAxisFormat={false}
                                            onFormatChange={(newFormat, field) => {
                                                console.log("newFormat", newFormat)
                                                setAttributes({format: newFormat})
                                            }}
                                            onUseCustomAxisFormatChange = {value => {                                               
                                            }}
                                            >
                                        </Format>
                                    </PanelBody>
                                    </>
                         }
                      
                        {app != 'csv' &&  
                          <Measures
                              title={__(`Measure`)}
                              onSetSingleMeasure={value => {
                                  setAttributes({measures: [value]})
                              }}
                              onFormatChange={value => {
                                  setAttributes({format: value})
                              }}
                              allMeasures={this.state.measures}
                              format={format}
                              measures={measures}                              
                              {...this.props}/>
                        }

                       

                        <DataFilters
                          allFilters={this.state.filters}
                          allCategories={this.state.categories}
                          {...this.props}/>

                    </>
                    <PanelBody title={__('Settings')} initialOpen={false}>
                        <PanelRow>
                            <ToggleControl label={__('Show Percentage Change')}
                                             checked={showPercentageChange}
                                             onChange={(showPercentageChange) => setAttributes({showPercentageChange})}/>
                            </PanelRow>
                        <PanelRow>
                            <TextControl
                                label={__('Label')}
                                value={label}
                                onChange={(label) => setAttributes({ label })}
                            />
                        </PanelRow>
                        <PanelRow>
                            <Text>{__("Big Number Font Size")}</Text>
                        </PanelRow>
                        <FontSizePicker
                            fontSizes={[]}
                            value={bigNumberFontSize}
                            fallbackFontSize={14}
                            onChange={(newFontSize) => {
                                setAttributes({ bigNumberFontSize: newFontSize })
                            }}
                        />
                         <PanelRow>
                            <Text>{__("Percent Change Font Size")}</Text>
                        </PanelRow>
                        <FontSizePicker
                            fontSizes={[]}
                            value={percentFontSize}
                            fallbackFontSize={14}
                            onChange={(newFontSize) => {
                                setAttributes({ percentFontSize: newFontSize })
                            }}
                        />
                        <PanelRow>
                            <Text>{__("Label Font Size")}</Text>
                        </PanelRow>
                        <FontSizePicker
                            fontSizes={[]}
                            value={labelFontSize}
                            fallbackFontSize={14}
                            onChange={(newFontSize) => {
                                setAttributes({ labelFontSize: newFontSize })
                            }}
                        />

                        <PanelColorSettings title={__('Color Settings')}
                            colorSettings={[
                                {
                                    value: textColor,
                                    onChange: (color) => {
                                        setAttributes({ textColor: color })
                                    },
                                    label: __("Text Color")
                                }                               
                            ]}
                        />
                    </PanelBody>
                </Panel>
            </InspectorControls>),
              (<ResizableBox
                  size={{height}}
                  style={{"margin": "auto", width: "100%"}}
                  minHeight="0"
                  minWidth="50"
                  enable={{
                      top: false,
                      right: false,
                      bottom: true,
                      left: false,
                      topRight: false,
                      bottomRight: false,
                      bottomLeft: false,
                      topLeft: false,
                  }}
                  onResizeStop={(event, direction, elt, delta) => {
                      setAttributes({
                          height: parseInt(height + delta.height, 10),
                      });
                      toggleSelection(true);
                  }}
                  onResizeStart={() => {
                      toggleSelection(false);
                  }}>

                    <div className={className}>
                        {this.state.react_ui_url && <iframe ref={this.iframe} style={divStyles} scrolling={"no"}
                                                            src={this.state.react_ui_url + "/embeddable/bignumbertrend?"}/>}

                    </div>
                </ResizableBox>
              )]
        );

    }
}

const Edit = (props) => {
    const blockProps = useBlockProps();
    return <div {...blockProps}><BlockEdit {...props}/></div>;
}
export default Edit;
