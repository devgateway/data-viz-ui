import {InspectorControls, useBlockProps} from '@wordpress/block-editor';
import {
    Panel,
    PanelBody,
    PanelRow,
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
import APIConfig from "../commons/APIConfig";
import Tooltip from "../commons/Tooltip.jsx";
import {togglePanel} from "../commons/Util";
import Measures from "../commons/Measures";

class BlockEdit extends BlockEditWithAPIMetadata {
    constructor(props) {
        super(props);
        this.ignoreAttributes = ['tooltip']
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {attributes: {app}} = this.props
        super.componentDidUpdate(prevProps, prevState, snapshot);
    }

    render() {
        const {
            className, isSelected,
            toggleSelection, setAttributes,
            attributes: {
                measures,
                height,
                type,
                groupMode,
                bottomLegend,
                leftLegend,
                scheme,
                colorBy,
                dimension1,
                dimension2,
                dimension3,
                csv,
                mode,
                dualMode,
                toggleInfoLabel,
                toggleChartLabel,
                dataSourceLabel,
                dataSource,
                showLegends,
                legendPosition,
                marginLeft,
                marginTop,
                marginRight,
                marginBottom,
                app,
                tooltipHTML,
                tooltip,
                tickColor,
                tickRotation,
                offsetText,
                format,
                filters,
                startAngle,
                endAngle,
                reverse,
                layout,
                offsetY,
                csvLineColor,
                csvLineTooltip,
                csvLineLayerData,
                csvLineTitle,
                lineLayerEnabled,
                group,
                maxValue,
                valueScale,
                swap,
                noDataMessage,
                legendLabel,
                barColor,
                overrideTickColor,
                fixedMaxValue,
                fixedMinValue,
                types,
                barPadding,
                barLabelPosition,
                showGrid,
                includeOverall,
                tooltipEnabled,
                barInnerPadding,
                useCheckBoxBackground,
                useLabelBackground,
                xLabelColor,
                barLabelColor,
                legendLabelColor,
                highlightXAxisLine,
                showTickLine,
                showRightAxis,

                rightLegend,
                offsetRight,
                manualColors,
                offsetBottom,
                hiddenBars,
                enableArea,
                areaShadingCriteria,
                areaLowerBound,
                areaUpperBound,
                showPoints,
                confidenceIntervals,
                showGroupTotal,
                groupTotalMeasure,
                groupTotalFormat,
                groupTotalLabel,
                groupTotalLabelOffset,
                groupTotalFixedPosition,
                centerLabel,
                showArcLabels,
                showArcLinkLabels,
                slicePadding,
                centerLabelFontWeight,
                centerLabelFontSize,
                centerLabelXOffset,
                centerLabelYOffset,
                tooltipEnableMarkdown,
                yAxisTickValues,
                enableGridY,
                overallLabel,
                enableGridX,
                minMaxClamp
            }
        } = this.props;

        //migration code
        if (tooltip != '') {
            setAttributes({tooltipHTML: tooltip, tooltip: ''})
            return null;
        }

        const levels = [dimension1, dimension2, dimension3]
        const source = levels.filter(l => l != 'none' && l != null).join('/')

        let params = {}
        filters.forEach(f => {
            if (f.value != null && f.value.filter(v => v != null && v.toString().trim() != "").length > 0)
                params[f.param] = f.value
        })
        const divStyles = {height: height + 'px', width: '100%'}
        console.log('url: ' + this.state.react_ui_url)
        return ([isSelected && (
            <InspectorControls>
                <Panel header={__("Chart Configuration")}>
                    <PanelBody
                      panelStatus={this.props.attributes.panelStatus['GROUP']}
                      onToggle={e => togglePanel("GROUP", this.props.attributes.panelStatus, setAttributes)}
                      title={__("Group")}>
                        <PanelRow>
                            <TextControl
                              label={__('Name')}
                              value={group}
                              onChange={(group) => setAttributes({group})}
                            />
                        </PanelRow>
                    </PanelBody>
                    <SizeConfig setAttributes={setAttributes} panelStatus={this.props.attributes.panelStatus}
                                height={height}></SizeConfig>

                    {mode == 'chart' &&
                    <>
                        <PanelBody initialOpen={false} title={__("API & Source")}>
                            <PanelRow>
                                <SelectControl
                                  value={[app]} // e.g: value = [ 'a', 'c' ]
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
                                  value={[dimension1]} // e.g: value = [ 'a', 'c' ]
                                  onChange={(value) => {
                                      setAttributes({dimension1: value, dimension2: value == 'none' ? 'none' : dimension2 , dimension3: value == 'none' ? 'none' : dimension3})
                                  }}
                                  options={this.state.dimensions}
                                />
                            </PanelRow>
                            <PanelRow>
                                <SelectControl
                                  label={__('Second Dimension')}
                                  value={[dimension2]} // e.g: value = [ 'a', 'c' ]
                                  onChange={(value) => {
                                      setAttributes({dimension2: value, dimension3: value == 'none' ? 'none' : dimension3})
                                  }}
                                  options={this.state.dimensions}
                                  disabled={dimension1 == 'none'}
                                />
                            </PanelRow>
                            <PanelRow>
                                <SelectControl
                                  label={__('Third Dimension')}
                                  value={[dimension3]} // e.g: value = [ 'a', 'c' ]
                                  onChange={(value) => {
                                      setAttributes({dimension3: value})
                                  }}
                                  options={this.state.dimensions}
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
                          {...this.props}/>}

                        {app == 'csv' &&
                        <CSVSourceConfig {...this.props}>
                        </CSVSourceConfig>}


                        {app == 'csv' &&
                        <PanelBody initialOpen={false} title={__("Tooltip")}>
                            <PanelRow>
                                <ToggleControl label={__("Enable Tooltip")} checked={tooltipEnabled}
                                               onChange={(tooltipEnabled) => {
                                                   setAttributes({
                                                       tooltipEnabled,
                                                       tooltip: tooltipEnabled && tooltip.trim().length == 0 ? "{value}" : tooltip
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
                                {type === "pie" &&
                                <PanelBody initialOpen={false} title={__("Variables")}>
                                    <PanelRow>
                                                            <span
                                                              style={{"font-size": "11px"}}>Value -> {'{value}'}</span>
                                    </PanelRow>
                                    <PanelRow>
                                                            <span
                                                              style={{"font-size": "11px"}}>Value Percent -> {'{valuePercent}'}</span>
                                    </PanelRow>
                                    <PanelRow>
                                                            <span
                                                              style={{"font-size": "11px"}}>Category -> {'{category}'}</span>
                                    </PanelRow>
                                </PanelBody>
                                }
                                <PanelRow>
                                    <TextareaControl
                                      label={__("Tooltip")}
                                      value={tooltipHTML}
                                      help={__("You can use variables {var_name}")}
                                      onChange={(tooltipHTML) => setAttributes({tooltipHTML})}
                                      rows={10}
                                    />
                                </PanelRow>
                            </>
                            }
                        </PanelBody>
                        }
                        {app != 'csv' &&
                        <PanelBody initialOpen={false} title={__("Tooltip")}>
                            <PanelRow>
                                <ToggleControl label={__("Enable Tooltip")} checked={tooltipEnabled}
                                               onChange={(tooltipEnabled) => {
                                                   setAttributes({
                                                       tooltipEnabled,
                                                       tooltip: tooltipEnabled && tooltip.trim().length == 0 ? "{value}" : tooltip
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
                                <Tooltip allDimensions={this.state.dimensions}
                                         allMeasures={this.state.measures} {...this.props} ></Tooltip>
                            </>
                            }
                        </PanelBody>
                        }

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
                    }
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
