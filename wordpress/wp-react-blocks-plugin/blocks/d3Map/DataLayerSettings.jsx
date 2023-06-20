import {Component} from "@wordpress/element";
import {__} from '@wordpress/i18n';
import {
    Button,
    CheckboxControl,
    PanelBody,
    PanelRow, RangeControl,
    SelectControl,
    TextControl,
    ToggleControl
} from '@wordpress/components';
import Measures from './MapMeasures.jsx'
import Property from "./Property";
import BreaksGenerator from "./BreaksGenerator";
import {BlockEditWithAPIMetadata} from "../commons";
import {PanelColorSettings} from "@wordpress/block-editor";

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
        this.onMeasuresChange = this.onMeasuresChange.bind(this)
        this.onSetSingleMeasure = this.onSetSingleMeasure.bind(this)
        this.addFilter = this.addFilter.bind(this)
        this.updateFilterParam = this.updateFilterParam.bind(this)
        this.updateFilterValue = this.updateFilterValue.bind(this)
        this.setFilterValue = this.setFilterValue.bind(this)
        this.removeFilter = this.removeFilter.bind(this)
        this.items = this.items.bind(this)

        this.state = {
            measures: [],
            dimensions: [],
            filters: [],
            categories: []
        }
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
            ...allFilters[index],
            "value": []
        } : null
        let newFilters = filters.slice()
        newFilters.push(newFilter)
        //setAttributes({filters: newFilters})
        onChangeProperty("filters", newFilters)
    }

    removeFilter(f) {

        const {layer: {filters}, onChangeProperty, allFilters} = this.props
        let newFilters = filters.slice(0, -1)
        //setAttributes({filters: newFilters})
        onChangeProperty("filters", newFilters)
    }


    componentDidUpdate(prevProps) {
        const {onChangeProperty, layer: {type, dimension2, types}} = this.props
        const {layer: {type: prevType, dimension2: prevDimension2}} = prevProps
    }


    onSetSingleMeasure(value) {

        const {onChangeProperty} = this.props
        //setAttributes({measures: [value]})
        onChangeProperty("measures", [value])

    }

    onMeasuresChange(value) {

        const {onChangeProperty, attributes: {measures}} = this.props
        if (measures.indexOf(value) > -1) {
            //setAttributes({measures: measures.filter(d => d != value)})
            onChangeProperty("measures", measures.filter(d => d != value))
        } else {
            //setAttributes({measures: [...measures, value]})
            onChangeProperty("measures", [...measures, value])
        }
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
            allDimensions,
            allFilters,
            allMeasures,
            features,
            layer: {
                measures,
                filters,
                featureJoinAttribute,
                apiJoinAttribute,
                type,
                breaks,
                markFillColor,
                markBorderColor,
                markSizeScale
            }
        } = this.props




        return (
            [
                <PanelBody title={"Join Fields"}>
                    <Property property={"featureJoinAttribute"}
                              type={"select"} onChangeProperty={onChangeProperty}
                              features={features}
                              value={featureJoinAttribute}
                              title={"Shape Attribute"}>

                    </Property>
                    <PanelRow>
                        <SelectControl
                            label={'Dimension'}
                            value={[apiJoinAttribute]} // e.g: value = [ 'a', 'c' ]
                            onChange={(value) => {
                                onChangeProperty("apiJoinAttribute", value)
                            }}
                            options={allDimensions}
                        />
                    </PanelRow>

                </PanelBody>
                ,
                <Measures
                    onSetSingleMeasure={this.onSetSingleMeasure}
                    onMeasuresChange={this.onMeasuresChange}
                    {...this.props} />
                ,

                <PanelBody initialOpen={false} title={__("Filters")}>
                    {filters.map((f, index) => {

                        return (
                            <PanelBody initialOpen={true} title={__(`Filter - ${f.label}`)}>
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
                </PanelBody>,

                <PanelBody title={"Marks & Colors"}>
                    <PanelRow>
                        <ToggleControl
                            label="Use Circle Mark"
                            checked={true}
                            onChange={(value) => {
                                onChangeProperty("useCentroidPoint", value)
                            }}
                        />
                    </PanelRow>
                     <PanelRow>
                        <RangeControl
                            label="Maker Base Size"
                            value={markSizeScale}
                            onChange={(value) => {
                                onChangeProperty("markSizeScale", value)
                            }}
                            step={0.5}
                            min={0}
                            max={10}
                        />
                    </PanelRow>
                    <PanelRow>
                        <PanelColorSettings
                            title={__(`Fill Color`)}
                            colorSettings={[{
                                value: markFillColor, onChange: (fillColor) => {
                                    onChangeProperty("markFillColor", fillColor)
                                },

                            }]}
                        />
                        <PanelColorSettings
                            title={__(`Border Color`)}
                            colorSettings={[{
                                value: markBorderColor, onChange: (borderColor) => {
                                    onChangeProperty("markBorderColor", borderColor)
                                },

                            }]}
                        />
                    </PanelRow>

                    <BreaksGenerator onChangeProperty={onChangeProperty} breaks={breaks}/>

                </PanelBody>


            ]
        )
    }

}

export default DataLayerSetting;