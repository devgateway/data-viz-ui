import {InspectorControls, PanelColorSettings, useBlockProps} from '@wordpress/block-editor';
import {
    Panel,
    PanelBody,
    PanelRow, RangeControl,
    ResizableBox,
    SelectControl,
    TextareaControl,
    TextControl,
    ToggleControl
} from '@wordpress/components';

import {InnerBlocks} from '@wordpress/editor'; // or wp.editor
import {__} from '@wordpress/i18n';
import {BlockEditWithAPIMetadata, SizeConfig} from '../commons/index'
import CSVSourceConfig from "../commons/CSVSourceConfig";
import Tooltip from "../commons/Tooltip.jsx";
import {togglePanel} from "../commons/Util";
import Measures from "../commons/Measures";
import {categorical, sequential, diverging} from "../commons/ChartColors";
import {getTranslation} from "../commons/APIutils";
import ChartLegends from "../commons/ChartLegends";
import Papa from "papaparse";

class BlockEdit extends BlockEditWithAPIMetadata {
    constructor(props) {
        super(props);
        this.ignoreAttributes = ['tooltip']
    }

    componentDidMount() {
        super.componentDidMount()
        this.initCSVManualColors()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {attributes: {csv}} = this.props
        super.componentDidUpdate(prevProps, prevState, snapshot);
        if (csv != prevProps.attributes.csv) {
            this.initCSVManualColors()
        }
    }

    initCSVManualColors() {
        const {setAttributes, attributes: {app, manualColors, csv}} = this.props
        const dataParsed = Papa.parse(csv, {header: true, dynamicTyping: true});
        const sourceList = dataParsed.meta.fields
        const targetParameter = sourceList.shift()
        const targetList = dataParsed.data.map(d => d[targetParameter])
        const nodes = [...sourceList.map(s => {return {id: s}}), ...targetList.map(s => {return {id: s}})]
        const newColors = Object.assign({}, manualColors)
        if (!newColors[app]) {
            newColors[app] = {}
        }
        if (nodes.length > 0) {
            nodes.forEach(item => {
                if (!newColors[app][item.id]) {
                    newColors[app][item.id] = "#eeeeee"
                }
            })
            setAttributes({manualColors: newColors})
        }
    }

    initDimensionColors(dimension) {
        const {setAttributes, attributes: {app, manualColors}} = this.props
        const {categories} = this.state
        const itemsList = []
        if (dimension && dimension != 'none') {
            const cats = categories.find(c => c.type.toLowerCase() === dimension.toLowerCase()).items
            itemsList.push(...cats)
        }

        const newColors = Object.assign({}, manualColors)
        if (!newColors[app]) {
            newColors[app] = {}
        }
        if (itemsList.length > 0) {
            itemsList.forEach(item => {
                if (!newColors[app][item.value]) {
                    newColors[app][item.value] = item.categoryStyle ? item.categoryStyle.color : "#eeeeee"
                }
            })
            setAttributes({manualColors: newColors})
        }
    }

    getManualColorsPanel() {
        const {setAttributes, attributes: {app, manualColors, dimension1, dimension2, dimension3, csv}} = this.props
        const {categories} = this.state
        let itemsList = []
        if (app != 'csv') {
            if (dimension1 && dimension1 != 'none') {
                const cats = categories.find(c => c.type.toLowerCase() === dimension1.toLowerCase()).items
                itemsList.push(...cats)
            }
            if (dimension1 && dimension2 != 'none') {
                const cats = categories.find(c => c.type.toLowerCase() === dimension2.toLowerCase()).items
                itemsList.push(...cats)
            }
            if (dimension1 && dimension3 != 'none') {
                const cats = categories.find(c => c.type.toLowerCase() === dimension3.toLowerCase()).items
                itemsList.push(...cats)
            }
        } else {
            const dataParsed = Papa.parse(csv, {header: true, dynamicTyping: true});
            const sourceList = dataParsed.meta.fields
            const targetParameter = sourceList.shift()
            const targetList = dataParsed.data.map(d => d[targetParameter])
            itemsList = [...sourceList.map(s => {return {value: s}}), ...targetList.map(s => {return {value: s}})]
        }
        const updateColor = (value, color) => {
            const newColors = Object.assign({}, manualColors)
            newColors[app][value] = color
            setAttributes({manualColors: newColors})
        }
        return <PanelBody initialOpen={false} title={__("Set Colors")}>
            {itemsList.map(item => {
                return <PanelColorSettings
                  colorSettings={[{
                      value: manualColors[app][item.value],
                      onChange: (color) => {
                          if (color) {
                              updateColor(item.value, color)
                          } else {
                              updateColor(item.value, item.categoryStyle ? item.categoryStyle.color : "#eeeeee")
                          }
                      }, label: getTranslation(item)
                  }]}
                />
            })}
        </PanelBody>
    }

    render() {
        const {
            className, isSelected,
            toggleSelection, setAttributes,
            attributes: {
                measures,
                height,
                scheme,
                dimension1,
                dimension2,
                dimension3,
                app,
                tooltipHTML,
                format,
                filters,
                layout,
                group,
                noDataMessage,
                tooltipEnabled,
                tooltipEnableMarkdown,
                panelStatus,
                sort,
                nodeThickness,
                nodeOpacity,
                nodeHoverOpacity,
                nodeInnerPadding,
                nodeSpacing,
                nodeHoverOthersOpacity,
                nodeBorderWidth,
                nodeBorderRadius,
                linkOpacity,
                linkHoverOpacity,
                linkHoverOthersOpacity,
                linkContract,
                enableLinkGradient,
                enableLabels,
                labelPosition,
                labelPadding,
                useCustomLabelColor,
                labelTextColor,
                labelOrientation
            }
        } = this.props;

        const {dimensions} = this.state

        let params = {}
        filters.forEach(f => {
            if (f.value != null && f.value.filter(v => v != null && v.toString().trim() != "").length > 0)
                params[f.param] = f.value
        })
        const divStyles = {height: height + 'px', width: '100%'}
        const colorOptions = [{value: "manual", label: 'Manual'}, ...categorical, ...sequential]

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
                        </PanelBody>
                        {app != 'csv' && <PanelBody initialOpen={false} title={__(`Node Dimensions`)}>
                            <PanelRow>
                                <SelectControl
                                  label={__('First Dimension')}
                                  value={[dimension1]}
                                  onChange={(value) => {
                                      this.initDimensionColors(value)
                                      setAttributes({dimension1: value, dimension2: value == 'none' ? 'none' : dimension2 , dimension3: value == 'none' ? 'none' : dimension3})
                                  }}
                                  options={dimensions ? dimensions.filter(d => d.value == 'none' || (d.value != dimension2 && d.value != dimension3)) : []}
                                />
                            </PanelRow>
                            <PanelRow>
                                <SelectControl
                                  label={__('Second Dimension')}
                                  value={[dimension2]}
                                  onChange={(value) => {
                                      this.initDimensionColors(value)
                                      setAttributes({dimension2: value, dimension3: value == 'none' ? 'none' : dimension3})
                                  }}
                                  options={dimensions ? dimensions.filter(d => d.value == 'none' || (d.value != dimension1 && d.value != dimension3)) : []}
                                  disabled={dimension1 == 'none'}
                                />
                            </PanelRow>
                            <PanelRow>
                                <SelectControl
                                  label={__('Third Dimension')}
                                  value={[dimension3]}
                                  onChange={(value) => {
                                      this.initDimensionColors(value)
                                      setAttributes({dimension3: value})
                                  }}
                                  options={dimensions ? dimensions.filter(d => d.value == 'none' || (d.value != dimension1 && d.value != dimension2)) : []}
                                  disabled={dimension2 == 'none' || dimension2 == 'none'}
                                />
                            </PanelRow>
                        </PanelBody>}

                        {app != 'csv' &&  <Measures
                              title={__(`Link Measure`)}
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

                        {app == 'csv' &&
                        <CSVSourceConfig {...this.props}>
                        </CSVSourceConfig>}

                        <PanelBody initialOpen={false} title={__("Options")}>
                            <PanelBody initialOpen={false} title={__("Layout")}>
                                <PanelRow>
                                    <SelectControl
                                      label={__('Orientation')}
                                      value={layout} // e.g: value = [ 'a', 'c' ]
                                      onChange={(value) => {
                                          setAttributes({layout: value})
                                      }}
                                      options={[{label: 'Vertical', value: 'vertical'}, {label: 'Horizontal', value: 'horizontal'}]}
                                    />
                                </PanelRow>
                                <PanelRow>
                                    <SelectControl
                                      label={__('Sort')}
                                      value={sort} // e.g: value = [ 'a', 'c' ]
                                      onChange={(value) => {
                                          setAttributes({sort: value})
                                      }}
                                      options={[{label: 'Auto', value: 'auto'}, {label: 'Input', value: 'input'},
                                          {label: 'Ascending', value: 'ascending'}, {label: 'Descending', value: 'descending'}]}
                                    />
                                </PanelRow>
                            </PanelBody>
                            <PanelBody initialOpen={false} title={__("Style")}>
                                <PanelRow>
                                    <SelectControl
                                      label={__('Color Scheme')}
                                      value={[scheme]}
                                      onChange={(value) => {
                                          setAttributes({scheme: value})
                                      }}
                                      options={colorOptions}
                                    />
                                </PanelRow>
                                {scheme === 'manual' && this.getManualColorsPanel()}
                            </PanelBody>
                            <PanelBody initialOpen={false} title={__("Nodes")}>
                                <PanelRow>
                                    <RangeControl
                                      label={__('Node Thickness')}
                                      value={nodeThickness}
                                      initialPosition={12}
                                      onChange={(nodeThickness) => setAttributes({nodeThickness})}
                                      step={1}
                                      min={0}
                                      max={100}/>
                                </PanelRow>
                                <PanelRow>
                                    <RangeControl
                                      label={__('Node Opacity')}
                                      value={nodeOpacity}
                                      initialPosition={0.75}
                                      onChange={(nodeOpacity) => setAttributes({nodeOpacity})}
                                      step={0.05}
                                      min={0}
                                      max={1}/>
                                </PanelRow>
                                <PanelRow>
                                    <RangeControl
                                      label={__('Node Hover Opacity')}
                                      value={nodeHoverOpacity}
                                      initialPosition={1}
                                      onChange={(nodeHoverOpacity) => setAttributes({nodeHoverOpacity})}
                                      step={0.05}
                                      min={0}
                                      max={1}/>
                                </PanelRow>
                                <PanelRow>
                                    <RangeControl
                                      label={__('Node Hover Others Opacity')}
                                      value={nodeHoverOthersOpacity}
                                      initialPosition={0.15}
                                      onChange={(nodeHoverOthersOpacity) => setAttributes({nodeHoverOthersOpacity})}
                                      step={0.05}
                                      min={0}
                                      max={1}/>
                                </PanelRow>
                                <PanelRow>
                                    <RangeControl
                                      label={__('Node Spacing')}
                                      value={nodeSpacing}
                                      initialPosition={12}
                                      onChange={(nodeSpacing) => setAttributes({nodeSpacing})}
                                      step={1}
                                      min={0}
                                      max={60}/>
                                </PanelRow>
                                <PanelRow>
                                    <RangeControl
                                      label={__('Node Inner Padding')}
                                      value={nodeInnerPadding}
                                      initialPosition={0}
                                      onChange={(nodeInnerPadding) => setAttributes({nodeInnerPadding})}
                                      step={1}
                                      min={0}
                                      max={20}/>
                                </PanelRow>
                                <PanelRow>
                                    <RangeControl
                                      label={__('Node Border Width')}
                                      value={nodeBorderWidth}
                                      initialPosition={1}
                                      onChange={(nodeBorderWidth) => setAttributes({nodeBorderWidth})}
                                      step={1}
                                      min={0}
                                      max={20}/>
                                </PanelRow>
                                {/*Nivo Sankey ignores this parameter
                                <PanelRow>
                                    <RangeControl
                                      label={__('Node Border Radius')}
                                      value={nodeBorderRadius}
                                      initialPosition={1}
                                      onChange={(nodeBorderRadius) => setAttributes({nodeBorderRadius})}
                                      step={1}
                                      min={0}
                                      max={12}/>
                                </PanelRow>*/}
                            </PanelBody>
                            <PanelBody initialOpen={false} title={__("Links")}>
                                <PanelRow>
                                    <RangeControl
                                      label={__('Link Opacity')}
                                      value={linkOpacity}
                                      initialPosition={0.25}
                                      onChange={(linkOpacity) => setAttributes({linkOpacity})}
                                      step={0.05}
                                      min={0}
                                      max={1}/>
                                </PanelRow>
                                <PanelRow>
                                    <RangeControl
                                      label={__('Link Hover Opacity')}
                                      value={linkHoverOpacity}
                                      initialPosition={0.6}
                                      onChange={(linkHoverOpacity) => setAttributes({linkHoverOpacity})}
                                      step={0.05}
                                      min={0}
                                      max={1}/>
                                </PanelRow>
                                <PanelRow>
                                    <RangeControl
                                      label={__('Link Hover Others Opacity')}
                                      value={linkHoverOthersOpacity}
                                      initialPosition={0.15}
                                      onChange={(linkHoverOthersOpacity) => setAttributes({linkHoverOthersOpacity})}
                                      step={0.05}
                                      min={0}
                                      max={1}/>
                                </PanelRow>
                                <PanelRow>
                                    <RangeControl
                                      label={__('Link Contact')}
                                      value={linkContract}
                                      initialPosition={0}
                                      onChange={(linkContract) => setAttributes({linkContract})}
                                      step={1}
                                      min={0}
                                      max={60}/>
                                </PanelRow>
                                <PanelRow>
                                    <ToggleControl label={__("Enable Link Gradient")}
                                       checked={enableLinkGradient}
                                       onChange={(enableLinkGradient) => setAttributes({enableLinkGradient})
                                       }/>
                                </PanelRow>
                            </PanelBody>
                            <PanelBody initialOpen={false} title={__("Labels")}>
                                <PanelRow>
                                    <ToggleControl label={__("Enable Labels")}
                                       checked={enableLabels}
                                       onChange={(enableLabels) => setAttributes({enableLabels})
                                       }/>
                                </PanelRow>
                                <PanelRow>
                                    <SelectControl
                                      label={__('Label Position')}
                                      value={labelPosition}
                                      onChange={(labelPosition) => {
                                          setAttributes({labelPosition})
                                      }}
                                      options={[{label: 'Inside', value: 'inside'}, {label: 'Outside', value: 'outside'}]}
                                    />
                                </PanelRow>
                                <PanelRow>
                                    <RangeControl
                                      label={__('Label Padding')}
                                      value={labelPadding}
                                      initialPosition={9}
                                      onChange={(labelPadding) => setAttributes({labelPadding})}
                                      step={1}
                                      min={0}
                                      max={60}/>
                                </PanelRow>
                                <PanelRow>
                                    <ToggleControl label={__("Use Custom Label Color")}
                                       checked={useCustomLabelColor}
                                       onChange={(useCustomLabelColor) => setAttributes({useCustomLabelColor})
                                       }/>
                                </PanelRow>
                                {useCustomLabelColor && <PanelRow>
                                    <PanelColorSettings
                                      colorSettings={[{
                                          value: labelTextColor,
                                          onChange: (labelTextColor) => setAttributes({labelTextColor}),
                                          label: __("Label Color")
                                      }]}
                                    />
                                </PanelRow>
                                }
                                <PanelRow>
                                    <SelectControl
                                      label={__('Label Orientation')}
                                      value={labelOrientation}
                                      onChange={(labelOrientation) => {
                                          setAttributes({labelOrientation})
                                      }}
                                      options={[{label: 'Horizontal', value: 'horizontal'}, {label: 'Vertical', value: 'vertical'}]}
                                    />
                                </PanelRow>

                            </PanelBody>
                            <PanelBody initialOpen={false} title={__("Legends")}>
                                <ChartLegends {...this.props}></ChartLegends>
                            </PanelBody>
                        </PanelBody>

                        <PanelBody initialOpen={false} title={__("Tooltip")}>
                            <PanelRow>
                                <ToggleControl label={__("Enable Tooltip")} checked={tooltipEnabled}
                                               onChange={(tooltipEnabled) => {
                                                   setAttributes({
                                                       tooltipEnabled,
                                                       tooltipHTML: "{value}"
                                                   })
                                               }}/>
                            </PanelRow>
                            {tooltipEnabled &&
                            <>
                                <PanelRow>
                                    <ToggleControl label={__("Enable Markdown Syntax Support")}
                                                   checked={tooltipEnableMarkdown}
                                                   onChange={(tooltipEnableMarkdown) => {
                                                       setAttributes({
                                                           tooltipEnableMarkdown
                                                       })
                                                   }}/>
                                </PanelRow>
                                {app == 'csv' &&
                                <PanelRow>
                                    <TextareaControl
                                      label={__("Tooltip")}
                                      value={tooltipHTML}
                                      help={__("You can use variables {var_name}")}
                                      onChange={(tooltipHTML) => setAttributes({tooltipHTML})}
                                      rows={10}
                                    />
                                </PanelRow>
                                }
                                {app != 'csv' &&
                                <Tooltip allDimensions={this.state.dimensions}
                                         allMeasures={this.state.measures} {...this.props} ></Tooltip>
                                }
                            </>
                            }
                        </PanelBody>


                        <PanelBody initialOpen={false} title={"Messages"}>
                            <PanelRow>
                                <TextControl
                                  label={__('No Data Message')}
                                  value={noDataMessage}
                                  onChange={(noDataMessage) => setAttributes({noDataMessage})}
                                />
                            </PanelRow>
                        </PanelBody>
                    </>
                </Panel>
            </InspectorControls>),
              (<ResizableBox
                  size={{height}}
                  style={{"margin": "auto", width: "100%"}}
                  minHeight="50"
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
                                                            src={this.state.react_ui_url + "/embeddable/sankeychart?"}/>}

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
