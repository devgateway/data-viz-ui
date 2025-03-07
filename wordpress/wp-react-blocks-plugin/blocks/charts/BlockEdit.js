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
import Bar from "./Bar.jsx"
import Pie from "./Pie.jsx"
import Line from "./Line.jsx"
import Bump from "./Bump.jsx"
import Info from "./Info.jsx"
import MobileConfig from './MobileConfig.jsx';
import Tooltip from "../commons/Tooltip.jsx";
import {togglePanel} from "../commons/Util";
import Radar from './Radar.jsx';
import {DEFAULT_FORMAT_SETTINGS} from '../commons/Constants';
import {isSupersetAPI} from "../commons/APIutils";

class BlockEdit extends BlockEditWithAPIMetadata {
    constructor(props) {
        super(props);
        this.ignoreAttributes = ['tooltip']
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {setAttributes, attributes: {type,colorBy,dimension1, dimension2, types, measures, app}} = this.props
        const {attributes: {type: prevType, dimension2: prevDimension2}} = prevProps

        if (type != prevType) {
            if (type == 'radar') {
                if (colorBy != 'id') {
                    setAttributes({colorBy: 'id'})

                }
            }
            if (type == 'pie') {

                if (dimension1 != 'none' && dimension2 == 'none' && colorBy != 'index') {
                    setAttributes({colorBy: 'index'})

                }
                if (dimension1 != 'none' && dimension2 != 'none' && colorBy != 'id') {
                    setAttributes({colorBy: 'id'})

                }
            }
        }
        super.componentDidUpdate(prevProps, prevState, snapshot);
    }
    

    render() {
        console.log("apps", this.state.apps)
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
                minMaxClamp,
                mobileCustomization,
                datasetId
            }
        } = this.props;


        if (Object.keys(measures).indexOf("global") > -1) {

            //migrating measures
            const appMeasures = {}
            appMeasures[app] = {}
            appMeasures['csv'] = measures['csv']
            const count = Object.keys(measures).filter(k => measures[k].selected).length
            Object.keys(measures)
                .filter(k => ['global', 'csv']
                    .indexOf(k) == -1).forEach(k => {

                    if (measures[k].selected) {
                        appMeasures[app][k] = measures[k]
                    }
                    if (count == 1) {
                        appMeasures[app]['format'] = measures[k].format
                    }
                    if (count > 1) {
                        appMeasures[app]['format'] = measures['global']['format']
                    }

                }
            )
            setAttributes({measures: appMeasures})
            return null;
        }
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

        const  datasets = [{label: 'Select Dataset', value: '0'}]
        if (this.state.datasets) {
            this.state.datasets.forEach(d => {
                datasets.push({label: d.label, value: d.id})
            })
        }

        const divStyles = {height: height + 'px', width: '100%'}
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
                        {/*
                        <PanelBody initialOpen={false} title={__("Info Graphic")}>
                            <PanelRow>
                                <ToggleControl
                                    label="Use Infographic"
                                    checked={dualMode}
                                    onChange={(dualMode) => {
                                        setAttributes({dualMode, mode: 'chart'})
                                        if (dualMode) {
                                            setAttributes({mode: 'info'})
                                        }
                                    }}
                                />
                            </PanelRow>
                            {dualMode &&
                                <>
                                    <PanelRow>
                                        <ButtonGroup>
                                            <Button isPrimary={mode == 'chart'}
                                                    onClick={() => setAttributes({mode: 'chart'})}>Chart</Button>
                                            <Button isPrimary={mode == 'info'}
                                                    onClick={() => setAttributes({mode: 'info'})}>Info Graphic</Button>
                                        </ButtonGroup>
                                    </PanelRow>
                                    <PanelRow>
                                        <TextControl
                                            label={__('Toggle Info Graphic Label')}
                                            value={toggleInfoLabel}
                                            onChange={(toggleInfoLabel) => setAttributes({toggleInfoLabel})}
                                        />
                                    </PanelRow>
                                    <PanelRow>
                                        <TextControl
                                            label={__('Toggle Chart Label')}
                                            value={toggleChartLabel}
                                            onChange={(toggleChartLabel) => setAttributes({toggleChartLabel})}
                                        />
                                    </PanelRow>

                                </>
                            }
                        </PanelBody>
                        */}

                        {type === 'map' ? null : <PanelBody initialOpen={false} title={__("Chart Type")}>
                            <PanelRow>
                                <SelectControl
                                    label={__('Type')}
                                    value={[type]} // e.g: value = [ 'a', 'c' ]
                                    onChange={(value) => {
                                        if (value != 'bar' && scheme == 'plain_color') {
                                            //    setAttributes({scheme: 'system'})
                                        }

                                        setAttributes({type: value})

                                    }}
                                    options={app == 'csv' ? [
                                        {label: 'Bar', value: 'bar'},
                                        {label: 'Pie', value: 'pie'},
                                        {label: 'Line', value: 'line'},
                                        {label: 'Radar', value: 'radar'}
                                    ] : types}
                                />

                            </PanelRow>
                        </PanelBody>}

                        {mode == 'chart' &&
                            <>
                                <PanelBody initialOpen={false} title={__("API & Source")}>
                                    <PanelRow>
                                        <SelectControl
                                            label={__('Provider')}
                                            value={[app]} // e.g: value = [ 'a', 'c' ]
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
                                            value={[datasetId]} 
                                            onChange={(newDatasetId)   => {
                                                setAttributes({
                                                    datasetId: newDatasetId,
                                                    dimension1: 'none',
                                                    dimension2: 'none',
                                                    dimension3: 'none',	
                                                    measures: Object.assign({}, DEFAULT_FORMAT_SETTINGS)
                                                })
                                                this.setState({dimensions: [], measures: [], filters: [], categories: []})
                                                this.loadMetadataForSuperset(app, newDatasetId)
                                            }}
                                            options={datasets}
                                        />
                                      </PanelRow>
                                    }
                                  
                                </PanelBody>
                                {app != 'csv' && <APIConfig
                                    allDimensions={this.state.dimensions}
                                    allFilters={this.state.filters}
                                    allMeasures={this.state.measures}
                                    allCategories={this.state.categories}
                                    allApps={this.state.apps}
                                    {...this.props}>
                                </APIConfig>}
                                {app == 'csv' &&
                                    <CSVSourceConfig {...this.props}>
                                    </CSVSourceConfig>}


                                {type === "bar" && <Bar {...this.props}
                                                        apps={this.state.apps}
                                                        allMeasures={this.state.measures}
                                                        allDimensions={this.state.dimensions}
                                                        allCategories={this.state.categories}>

                                </Bar>}
                                {type === "pie" && <Pie allMeasures={this.state.measures}
                                                        allDimensions={this.state.dimensions}
                                                        allCategories={this.state.categories} {...this.props}></Pie>}
                                {type === "line" && <Line {...this.props}
                                                          allMeasures={this.state.measures}
                                                          allDimensions={this.state.dimensions}
                                                          allCategories={this.state.categories}
                                                          measures={measures}></Line>}
                                {type === "bump" && <Bump allMeasures={this.state.measures}
                                                          allDimensions={this.state.dimensions}
                                                          allCategories={this.state.categories}  {...this.props}></Bump>}
                                {type === "radar" && <Radar allMeasures={this.state.measures}
                                                            allDimensions={this.state.dimensions}
                                                            allCategories={this.state.categories} {...this.props}></Radar>}
                                {type === "info" && <Info allMeasures={this.state.measures}
                                                          allDimensions={this.state.dimensions}
                                                          allCategories={this.state.categories} {...this.props}></Info>}
                                {app == 'csv' && type!='radar' &&
                                    <PanelBody initialOpen={false} title={__("Tooltip")}>
                                        <PanelRow>
                                            <ToggleControl label={__("Enable Tooltip")} checked={tooltipEnabled}
                                                           onChange={(isToolTipEnabled) => {
                                                               setAttributes({
                                                                   tooltipEnabled: isToolTipEnabled,
                                                                   tooltip: setTooltipState(isToolTipEnabled, tooltipHTML)
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
                                {app != 'csv' && type!='radar' &&
                                    <PanelBody initialOpen={false} title={__("Tooltip")}>
                                        <PanelRow>
                                            <ToggleControl label={__("Enable Tooltip")} checked={tooltipEnabled}
                                                           onChange={(isToolTipEnabled) => {
                                                               setAttributes({
                                                                   tooltipEnabled: isToolTipEnabled,
                                                                   tooltip: setTooltipState(isToolTipEnabled, tooltipHTML)
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
                                <MobileConfig
                                    attributes={this.props.attributes}
                                    setAttributes={setAttributes}>
                                </MobileConfig>
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
                            {mode == "info" && <div><InnerBlocks template={[['core/image', {}]]}/></div>}
                            {this.state.react_ui_url && <iframe ref={this.iframe} style={divStyles} scrolling={"no"}
                                                                src={this.state.react_ui_url + "/embeddable/chart?"}/>}

                        </div>
                    </ResizableBox>
                )]
        );

    }
}

function setTooltipState (isTooltipEnabled, tooltipHTML) {
    return isTooltipEnabled && tooltipHTML.trim().length === 0 ? "{value}" : tooltipHTML;
}


const Edit = (props) => {
    const blockProps = useBlockProps();
    return <div {...blockProps}><BlockEdit {...props}/></div>;
}
export default Edit;
