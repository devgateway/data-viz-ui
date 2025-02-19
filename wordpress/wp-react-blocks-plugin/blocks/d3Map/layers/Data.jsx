import {Component} from "@wordpress/element";
import {__} from '@wordpress/i18n';
import {
    Button, ButtonGroup,
    CheckboxControl,
    PanelBody,
    PanelRow,
    RangeControl,
    SelectControl,
    TextareaControl,
    TextControl,
    ToggleControl
} from '@wordpress/components';
import Measures from '../../commons/Measures.jsx'
import Property from "./utils/Property";
import BreaksGenerator from "./utils/BreaksGenerator";
import {PanelColorSettings} from "@wordpress/block-editor";
import PatternGenerator from "./utils/PatternGenerator";
import Format from '../../charts/Format.jsx'
import {ALIVE_SUPERSET_APP} from '../../commons/Constants';

const FilterSelector = ({param, index, options, onUpdateFilterParam}) => {
    const sortedOptions = options.sort(function (a, b) {
        var aLabel = a.label ? a.label.toLowerCase() : "";
        var bLabel = b.label ? b.label.toLowerCase() : "";
        return aLabel < bLabel ? -1 : aLabel > bLabel ? 1 : 0;
    });

    return <SelectControl onChange={(value) => {
        onUpdateFilterParam(value, index)
    }} value={param} options={sortedOptions}/>
}

const CategoricalFilter = ({value, index, items, onUpdateFilterValue}) => {
    if (items) {
        const sortedItems = items.sort(function (a, b) {
            /*
                var aValue= a.value ? a.value.toLowerCase() : "";
                var bValue = b.value ? b.value.toLowerCase() : "";
                return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
            */
            return a.position - b.position
        });
        return sortedItems.map(v => <PanelRow> <ToggleControl label={v.value} checked={value.indexOf(v.id) > -1}
                                                              onChange={e => {
                                                                  onUpdateFilterValue(v.id, index)
                                                              }}/></PanelRow>)
    } else {
        return null;
    }
}

export class DataLayerSetting extends Component {
    constructor(props) {
        super(props);
        this.onSetSingleMeasure = this.onSetSingleMeasure.bind(this)
        this.addFilter = this.addFilter.bind(this)
        this.updateFilterParam = this.updateFilterParam.bind(this)
        this.updateFilterValue = this.updateFilterValue.bind(this)
        this.setFilterValue = this.setFilterValue.bind(this)
        this.removeFilter = this.removeFilter.bind(this)
        this.items = this.items.bind(this)
        this.getCSValue = this.getCSValue.bind(this)
        this.onFormatChange = this.onFormatChange.bind(this)
        this.state = {
            measures: [], dimensions: [], filters: [], categories: []
        }
    }

    



    onFormatChange(format, field) {
        const {
            onChangeProperty, allDimensions, allFilters, allMeasures, features, apps, layer: {
                app,
                csv,
                measures,
                filters,
                featureJoinAttribute,
                apiJoinAttribute,
                type,
                fillColor,
                borderColor,
                breaks,
                markFillColor,
                markBorderColor,
                markSizeScale,
                tooltip
            }
        } = this.props

        onChangeProperty("format", format);
    }


    getCSValue() {
        const {apps, features, layer: {csv, featureJoinAttribute}} = this.props
        if (csv == '') {
            let generatedCSV = 'id,value\n'
            if (features && features.length > 0) {
                features.forEach(f => {
                    generatedCSV = generatedCSV + f.properties[featureJoinAttribute] + ', \n'

                })
            }

            return generatedCSV
        }
        return csv
    }

    cleanSelection(prevState) {

        const {onChangeProperty} = this.props
        onChangeProperty("measures", [])
        onChangeProperty("filters", [])

        //setAttributes({measures: [], filters: []})
    }

    updateFilterParam(param, idx) {

        const {layer: {filters}, onChangeProperty, allFilters} = this.props
        const newFilters = filters.slice()
        const selected = allFilters.filter(f => f.param === param)[0]
        newFilters[idx] = {...selected, value: []}
        // setAttributes({filters: newFilters})
        onChangeProperty("filters", newFilters)


    }

    updateFilterValue(value, idx) {

        const {layer: {filters}, onChangeProperty} = this.props
        const selected = filters[idx]
        let values = selected.value
        if (values.indexOf(value) > -1) {
            values = values.filter(v => v != value)
        } else {
            values.push(value)
        }

        const newFilters = filters.slice()
        newFilters[idx].value = values
        // setAttributes({filters: newFilters})
        onChangeProperty("filters", newFilters)
    }

    setFilterValue(value, idx) {

        const {layer: {filters}, onChangeProperty} = this.props
        const selected = filters[idx]
        let values = selected.value
        values = value.split(",")
        const newFilters = filters.slice()
        newFilters[idx].value = values
        //setAttributes({filters: newFilters})
        onChangeProperty("filters", newFilters)

    }

    addFilter() {

        const {layer: {filters}, onChangeProperty, allFilters} = this.props
        let index = filters.length > allFilters.length ? allFilters.length : filters.length
        const newFilter = (allFilters && allFilters.length > 0) ? {
            ...allFilters[index], "value": []
        } : null
        let newFilters = filters.slice()
        newFilters.push(newFilter)
        //setAttributes({filters: newFilters})
        onChangeProperty("filters", newFilters)
    }

    removeFilter(f) {
        const {layer: {filters}, onChangeProperty, allFilters} = this.props
        let newFilters = filters.slice(0, -1)
        onChangeProperty("filters", newFilters)
    }


    componentDidUpdate(prevProps) {
        const {onChangeProperty, layer: {type, dimension2, types}} = this.props
        const {layer: {type: prevType, dimension2: prevDimension2}} = prevProps
    }


    onSetSingleMeasure(value) {
        const {onChangeProperty} = this.props
        onChangeProperty("measures", [value])
    }

    items(type) {

        const values = this.props.allCategories ? this.props.allCategories.filter(c => c.type === type) : []
        const cat = values.length > 0 ? values[0] : null
        let items = null
        if (type === 'Boolean') {
            items = [{"value": "Yes", id: true}, {"value": "No", id: false}]
        } else if (cat) {
            items = cat.items
        }
        return items

    }

    render() {
        const {
            onChangeProperty,
            allDimensions, allFilters, allMeasures, allCategories, allDatasets, features, apps,layer, layer: {
                app,
                csv,
                measures,
                filters,
                featureJoinAttribute,
                apiJoinAttribute,
                type,
                useCentroidPoint,
                useBreaks,
                fillColor,
                borderColor,
                format,

                breaks,
                labelFontSize,
                markFillColor,
                markLabelColor,
                markBorderColor,
                markSizeScale,
                markerLabelSize,
                tooltip,
                usePattern,
                patterns,
                customMeasuresLabels,
                patternDiscriminator,
                onRemoveLayer,
                onMoveLayer,
                apacheSupersetUrl,
                datasetId,
                           
            }
        } = this.props

        let selectedMeasureLabel = ""
        let selectedMeasureValue = ""

        

        if (app != 'csv') {
            const theMeasure = measures ? measures[0] : null
            const selectedMeasure = allMeasures && theMeasure ? allMeasures.filter(m => m.value == theMeasure)[0] : null
            if (selectedMeasure) {
                selectedMeasureLabel = selectedMeasure.label
                selectedMeasureValue = selectedMeasure.value


                if (customMeasuresLabels && (!customMeasuresLabels[selectedMeasureValue] || customMeasuresLabels[selectedMeasureValue] == "")) {
                    onChangeProperty("customMeasuresLabels", {
                        ...customMeasuresLabels,
                        [selectedMeasureValue]: selectedMeasureLabel
                    })
                }
            }
        }

        const  datasets = [{label: 'Select Dataset', value: '0'}]
        if (allDatasets) { {
            allDatasets.forEach(d => {
                datasets.push({label: d.label, value: d.id})
            })
        }

        console.log("ApacheSupersetUrl", apacheSupersetUrl)
        console.log("App", app)

        console.log("All Datasets", allDatasets)
        console.log("DatasetId", datasetId)
        
        console.log("AllDimensions", allDimensions)
        console.log("AllMeasures", allMeasures)
      
        return ([<PanelBody initialOpen={false} title={"Data Source"}>
            <PanelRow>
                <SelectControl
                    label={__("App", "dg")}
                    value={[app]} // e.g: value = [ 'a', 'c' ]
                    onChange={(app) => {    
                        onChangeProperty("apacheSupersetUrl", apacheSupersetUrl)        
                        onChangeProperty("app", app)                            
                    }}
                    options={apps}
                />
            </PanelRow>
            {app == ALIVE_SUPERSET_APP && <PanelRow>
                <SelectControl
                    label={__('Datasets')}
                    value={[datasetId]}
                    onChange={(newDatasetId) => {
                        onChangeProperty("datasetId", newDatasetId)
                       // onChangeProperty("apiJoinAttribute", "none")                      
                    }}
                    options={datasets}
                />
            </PanelRow>
            }
            {type != 'dataPoints' && <Property property={"featureJoinAttribute"}
                                               type={"select"} onChangeProperty={onChangeProperty}
                                               features={features}
                                               value={featureJoinAttribute}
                                               title={"Shape Attribute"}>

            </Property>}

            {app == 'csv' && <PanelRow>
                <TextareaControl
                    label={__("CSV Data")}
                    value={this.getCSValue(csv)}
                    onChange={(csv) => onChangeProperty("csv", csv)}
                />
            </PanelRow>}

            {app == 'csv' && <PanelRow>
                <Format title={"Format"} format={format} hiddenCustomAxisFormat={true}
                        onFormatChange={this.onFormatChange}></Format>
            </PanelRow>}

            {app != 'csv' && <PanelRow>
                <SelectControl
                    label={'Dimension' + (type == 'dataPoints' ? 'LatLong' : '')}
                    value={[apiJoinAttribute]} // e.g: value = [ 'a', 'c' ]
                    onChange={(value) => {
                        onChangeProperty("apiJoinAttribute", value)
                    }}
                    options={allDimensions}
                />
            </PanelRow>}
            <PanelRow>
                <TextareaControl
                    label={__("Tooltip")}
                    value={tooltip}
                    help={__("You can use variables {var_name}")}
                    onChange={(tooltip) => onChangeProperty("tooltip", tooltip)}
                    rows={10}
                />

            </PanelRow>
            {app != 'csv' && allMeasures && allMeasures.map(m => <PanelRow><p
                style={{
                    "margin-top": "calc(8px)",
                    "font-size": "12px",
                    "font-style": "normal",
                    "color": "rgb(117, 117, 117)"
                }}>{"{" + m.value + "}"}</p></PanelRow>)}
        </PanelBody>,
        <React.Fragment>
            {app != 'csv' && <Measures
                onFormatChange={this.onFormatChange}
                onSetSingleMeasure={this.onSetSingleMeasure}
                measures={layer.measures}
                format={layer.format}
                {...this.props}/>}
        </React.Fragment>,
        <React.Fragment>
            {app != 'csv' && <PanelBody initialOpen={false} title={__("Filters")}>
                {filters.map((f, index) => {
                    return (<PanelBody initialOpen={false} title={__(`Filter - ${f.label}`)}>
                        <FilterSelector param={f.param} index={index} options={allFilters}
                                        onUpdateFilterParam={this.updateFilterParam}/>
                        {<CategoricalFilter value={f.value} index={index} items={this.items(f.type)}
                                            onUpdateFilterValue={this.updateFilterValue}/>}
                    </PanelBody>)
                })}

                <PanelRow>
                    <Button variant={"link"} onClick={this.addFilter}>{__("Add Filter")}</Button>
                    <Button variant={"link"} onClick={this.removeFilter}>{__("Remove")}</Button>
                </PanelRow>
            </PanelBody>}
        </React.Fragment>,
        <PanelBody initialOpen={false} title={"Symbols and Styles"}>
            {app != "csv" && selectedMeasureValue && <PanelRow>
                <TextControl
                    label={selectedMeasureLabel}
                    help={__("Customize Measure Label")}
                    value={customMeasuresLabels ? customMeasuresLabels[selectedMeasureValue] : ""}
                    onChange={(measureLabel) => {
                        onChangeProperty("customMeasuresLabels", {
                            ...customMeasuresLabels, [selectedMeasureValue]: measureLabel
                        })


                    }}>
                </TextControl>
            </PanelRow>}
            <PanelRow>
                <PanelColorSettings
                    title={__(`Default Fill Color`)}
                    value={fillColor}
                    colorSettings={[{
                        clearable: true, enableAlpha: true,
                        value: fillColor, onChange: (fillColor) => {
                            onChangeProperty("fillColor", fillColor)
                        },

                    }]}
                />
            </PanelRow>
            <PanelRow>
                <ToggleControl
                    label="Use Centroid Points"
                    checked={useCentroidPoint}
                    onChange={(value) => {
                        onChangeProperty("useCentroidPoint", true)
                    }}
                />
            </PanelRow>
            <PanelRow>
                <ToggleControl
                    label="Use Shape Colors"
                    checked={!useCentroidPoint}
                    onChange={(value) => {
                        onChangeProperty("useCentroidPoint", false)
                    }}
                />
            </PanelRow>


            {useCentroidPoint && <PanelRow>
                <RangeControl
                    label="Point Base Size"
                    value={markSizeScale}
                    onChange={(value) => {
                        onChangeProperty("markSizeScale", value)
                    }}
                    step={1}
                    min={0}
                    max={100}
                />
            </PanelRow>}
            {useCentroidPoint && <PanelRow>
                <RangeControl
                    label="Point Label Size"
                    value={markerLabelSize}
                    onChange={(markerLabelSize) => {
                        onChangeProperty("markerLabelSize", markerLabelSize)
                    }}
                    step={1}
                    min={0}
                    max={100}
                >

                </RangeControl>
            </PanelRow>}
            {useCentroidPoint && <PanelRow>

                <PanelColorSettings
                    title={__(`Circle Fill Color`)}
                    value={markFillColor}
                    colorSettings={[{
                        clearable: true, enableAlpha: true, value: markFillColor, onChange: (markFillColor) => {
                            onChangeProperty("markFillColor", markFillColor)
                        },

                    }]}
                /></PanelRow>}

            {useCentroidPoint && <PanelRow>
                <PanelColorSettings
                    title={__(`Circle Label Color`)}
                    value={markLabelColor}
                    colorSettings={[{
                        clearable: true,
                        enableAlpha: true,
                        value: markLabelColor,
                        onChange: (markLabelColor) => {
                            onChangeProperty("markLabelColor", markLabelColor)
                        },

                    }]}
                />
            </PanelRow>}
            {useCentroidPoint && <PanelRow>
                <PanelColorSettings
                    title={__(`Circle Border Color`)}
                    value={borderColor}
                    colorSettings={[{
                        clearable: true, enableAlpha: true, value: markBorderColor, onChange: (borderColor) => {
                            onChangeProperty("markBorderColor", borderColor)
                        },

                    }]}
                />
            </PanelRow>}

            <PanelRow>
                <ToggleControl
                    label="Use Breaks"
                    checked={useBreaks}
                    onChange={e => {
                        onChangeProperty("useBreaks", !useBreaks)
                    }}

                />
            </PanelRow>

            {useBreaks && <BreaksGenerator
                showSize={useCentroidPoint}
                defaultBorderColor={markBorderColor}
                defaultFillColor={markFillColor}
                onChangeProperty={onChangeProperty} breaks={breaks}/>}


            <PanelRow>
                <ToggleControl
                    label="Use Patterns"
                    checked={usePattern}
                    onChange={e => {
                        onChangeProperty("usePattern", !usePattern)
                    }}
                />
            </PanelRow>

            {usePattern && <PatternGenerator allCategories={allCategories} allDimensions={allDimensions}
                                             defaultFillColor={fillColor} onChangeProperty={onChangeProperty}
                                             patterns={patterns} app={app} csv={csv}
                                             patternDiscriminator={patternDiscriminator}/>}
        </PanelBody>



        ])
    }

}
}

export default DataLayerSetting;