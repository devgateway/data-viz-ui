import {Component} from "@wordpress/element";
import {__} from '@wordpress/i18n';
import {
    AnglePickerControl,
    Button,
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
import {PanelColorSettings} from "@wordpress/block-editor";
import BreaksGenerator from "./utils/BreaksGenerator";
import {compareJsonProps} from "../../../../../ui/src/embeddable/utils/parseUtils";

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


    onFormatChange(format) {
        const {onChangeProperty} = this.props
        onChangeProperty("format", format);
    }

    getCSValue() {
        const {apps, features, layer: {csv, featureJoinAttribute}} = this.props
        if (csv == '') {
            let generatedCSV = 'Latitude,Longitude,value\n'
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
        const {onChangeProperty, allCategories, layer: {type, dimension2, types}} = this.props
        const {allCategories: prevAllCategories, layer: {type: prevType, dimension2: prevDimension2}} = prevProps
        if (!compareJsonProps(allCategories, prevAllCategories)) {
            onChangeProperty("allCategories", allCategories)
        }
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
            onChangeProperty, allDimensions, allFilters, allMeasures, allCategories, features, apps, layer: {
                app,
                csv,
                measures,
                filters,
                format,
                featureJoinAttribute,
                apiJoinAttribute,
                type,
                useCentroidPoint,
                fillColor,
                borderColor,
                useBreaks,
                breaks,
                pointStyleBy,
                dimension2,
                pointDimensionStyles = [],
                markFillColor,
                markBorderColor,
                markSizeScale,
                tooltip,
                visible = true
            }
        } = this.props

        const cats = dimension2 && allCategories ? allCategories.filter(c => c.type.toUpperCase() == dimension2.toUpperCase()) : []
        const items = cats.length > 0 ? cats[0].items : []
        const dimensionValues = items.map(i => i.value)

        return ([<PanelBody initialOpen={false} title={"Data Source"}>
            <PanelRow>
                <SelectControl
                    label={__("App", "dg")}
                    value={[app]} // e.g: value = [ 'a', 'c' ]
                    onChange={(app) => {
                        onChangeProperty("app", app)
                    }}
                    options={apps}
                />
            </PanelRow>

            {app == 'csv' && <PanelRow>
                <TextareaControl
                    label={__("CSV Data")}
                    value={this.getCSValue(csv)}
                    onChange={(csv) => onChangeProperty("csv", csv)}
                />
            </PanelRow>}
            {app != 'csv' && <PanelRow>
                <SelectControl
                    label={'Dimension'}
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
                    help={__(`You can use the following variables: `)}
                    onChange={(tooltip) => onChangeProperty("tooltip", tooltip)}
                    rows={10}
                />

            </PanelRow>
            {app != 'csv' && allMeasures && allMeasures.map(m => <PanelRow><p
                style={{
                    "margin-top": "calc(8px)",
                    "font-size": "12px",
                    "font-style": "normal",
                    "color": "rgb(117, 117, 117)"}}>{"{" + m.value + "}"}</p></PanelRow>)
            }
            {app != 'csv' && pointStyleBy === 'dimension' && dimension2 != 'none' && <PanelRow><p
              style={{
                  "margin-top": "calc(8px)",
                  "font-size": "12px",
                  "font-style": "normal",
                  "color": "rgb(117, 117, 117)"}}>{"{" + dimension2 + "}"}</p></PanelRow>
            }
        </PanelBody>,
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
                <PanelRow>
                    <RangeControl
                        label={__(`Default Points Size`)}
                        value={markSizeScale}
                        onChange={(value) => {
                            onChangeProperty("markSizeScale", value)
                        }}
                        step={1}
                        min={0}
                        max={100}
                    />
                </PanelRow>
                <PanelRow>
                    <PanelColorSettings
                        title={__(`Default Fill Color`)}
                        value={markFillColor}
                        colorSettings={[{
                            clearable: true,
                            enableAlpha: true,
                            value: markFillColor, onChange: (markFillColor) => {
                                onChangeProperty("markFillColor", markFillColor)
                            },

                        }]}
                    />
                </PanelRow>
                <PanelRow>
                    <PanelColorSettings
                        title={__(`Default Border Color`)}
                        value={borderColor}
                        colorSettings={[{
                            clearable: true,
                            enableAlpha: true,
                            value: markBorderColor, onChange: (borderColor) => {
                                onChangeProperty("markBorderColor", borderColor)
                            },

                        }]}
                    />
                </PanelRow>
                <PanelRow>
                    <SelectControl
                      label={"Point styles by"}
                      value={pointStyleBy ? pointStyleBy : 'none'}
                      onChange={(v) => {
                          onChangeProperty('pointStyleBy', v)
                      }}
                      options={[{label: "None", value: "none"}, {label: "Dimension", value: "dimension"}, {label: "Measure", value: "measure"}]}/>
                </PanelRow>

                {pointStyleBy === 'measure' && <Measures
                  onFormatChange={this.onFormatChange}
                  onSetSingleMeasure={this.onSetSingleMeasure}
                  measures={measures}
                  format={format}
                  {...this.props}/>
                }

                {pointStyleBy === 'measure' && <BreaksGenerator
                  showSize={useCentroidPoint}
                  defaultBorderColor={markBorderColor}
                  defaultFillColor={markFillColor}
                  onChangeProperty={onChangeProperty} breaks={breaks}/>
                }

                {pointStyleBy === 'dimension' && <PanelRow>
                    <SelectControl
                        label={'Dimension'}
                        value={[dimension2]}
                        onChange={(value) => {
                            onChangeProperty("dimension2", value)
                        }}
                        options={allDimensions}
                    />
                </PanelRow>
                }
                {pointStyleBy  === 'dimension' && dimensionValues.map(field => <PanelBody initialOpen={false} title={field}>
                    <PanelRow>
                        <RangeControl
                          label={__(`Point Size`)}
                          value={pointDimensionStyles[field + '_size'] ? pointDimensionStyles[field + '_size'] : markSizeScale}
                          onChange={(v) => {
                              onChangeProperty('pointDimensionStyles', {...pointDimensionStyles, [field + '_size']: v})
                          }}
                          step={1}
                          min={0}
                          max={100}
                        />
                    </PanelRow>
                    <PanelRow>
                        <PanelColorSettings
                          title={__(`Point Fill Color`)}
                          value={pointDimensionStyles[field + '_color'] ? pointDimensionStyles[field + '_color'] : markFillColor}
                          colorSettings={[{
                              clearable: true,
                              enableAlpha: true,
                              value: pointDimensionStyles[field + '_color'] ? pointDimensionStyles[field + '_color'] : markFillColor, onChange: (v) => {
                                  onChangeProperty('pointDimensionStyles', {...pointDimensionStyles, [field + '_color']: v})
                              },

                          }]}
                        />
                    </PanelRow>
                    <PanelRow>
                        <PanelColorSettings
                          title={__(`Point Border Color`)}
                          value={pointDimensionStyles[field + '_border'] ? pointDimensionStyles[field + '_border'] : markBorderColor}
                          colorSettings={[{
                              clearable: true,
                              enableAlpha: true,
                              value: pointDimensionStyles[field + '_border'] ? pointDimensionStyles[field + '_border'] : markBorderColor, onChange: (v) => {
                                  onChangeProperty('pointDimensionStyles', {...pointDimensionStyles, [field + '_border']: v})
                              },
                          }]}
                        />
                    </PanelRow>
                </PanelBody>)
                }
            </PanelBody>
        ])
    }

}

export default DataLayerSetting;