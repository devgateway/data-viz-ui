import {InspectorControls, useBlockProps} from '@wordpress/block-editor';
import {Panel, PanelBody, PanelRow, SelectControl, TextControl, ToggleControl, Button} from '@wordpress/components';
import {__} from '@wordpress/i18n';
import {BlockEditWithAPIMetadata} from '../commons/index'
import {useEffect} from "react";
import DataFilters from "../commons/DataFilters";
import {ALIVE_SUPERSET_APP} from '../commons/Constants';
const DEFAULT_VALUE_INPUT = 'DEFAULT_VALUE_INPUT'
const LOWEST_VALUE = 'LOWEST_VALUE'
const HIGHEST_VALUE = 'HIGHEST_VALUE'

const CategoricalFilter = ({value, index, items, onUpdateFilterValue}) => {
    if (items) {
        const sortedItems = items.sort(function (a, b) {
            if (a.position !== null && b.position !== null) {
                return a.position - b.position
            }
            return 0
        });

        return sortedItems.map(v => <PanelRow> <ToggleControl label={v.value} checked={value.indexOf(v.id) > -1}
                                                              onChange={e => {
                                                                  onUpdateFilterValue(v.id, index)
                                                              }}/></PanelRow>)
    } else {
        return null;
    }
}

class BlockEdit extends BlockEditWithAPIMetadata {
    constructor(props) {
        super(props);
        this.iframe = React.createRef();
        this.updateHiddenFilters = this.updateHiddenFilters.bind(this)
        //this.onFilterChange = this.onFilterChange.bind(this)
        this.items = this.items.bind(this)
    }

    updateHiddenFilters(value, idx) {
        const {attributes: {hiddenFilters}, setAttributes} = this.props
        if (hiddenFilters.indexOf(value) > -1) {
            setAttributes({hiddenFilters: hiddenFilters.filter(item => item !== value)})
        } else {
            setAttributes({hiddenFilters: [...hiddenFilters, value]})
        }
    }

    /*onFilterChange() {
        this.loadMetadata();
    }*/

    items(type) {
        const allCategories = this.state.categories
        const values = allCategories ? allCategories.filter(c => c.type === type) : []
        const cat = values.length > 0 ? values[0] : null
        let items = []
        if (type === 'Boolean') {
            items = [{"value": "Yes", id: true}, {"value": "No", id: false}]
        } else if (cat) {
            items = cat.items
        }

        return items

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        super.componentDidUpdate(prevProps, prevState, snapshot)
        const {setAttributes} = this.props
    }

    render() {
        const {
            isSelected, setAttributes, attributes: {
                group,
                placeHolder,
                param,
                app,
                csvValue,
                isRange,
                allLabel,
                alphabeticalSort,
                ascOrder,
                noneLabel,
                startLabel,
                endLabel,
                useSingleColumn,
                enableTextSearch,
                filterType,
                defaultValues,
                showNoDataOption,
                defaultValueCriteria,
                hiddenFilters,
                allNoneSameBehaviour,
                closeOnSelect,
                useFilterItems,
                datasetId,
                apacheSupersetUrl
            }
        } = this.props;

        const iframeStyles = {height: '65px'}
        const selectedFilters = this.state.filters ? this.state.filters.filter(f => f.param == param && f.type != 'Boolean') : null

        const filter = selectedFilters && selectedFilters.length > 0 ? selectedFilters[0] : null
        const  datasets = [{label: 'Select Dataset', value: '0'}]
        if (this.state.datasets) {
            this.state.datasets.forEach(d => {
                datasets.push({label: d.label, value: d.id})
            })
        }

        return ([isSelected && (<InspectorControls>
                <Panel header={__("Filter Configuration")}>
                    <PanelBody initialOpen={false} title={__("Group")}>
                        <PanelRow>
                            <TextControl
                                label={__('Name')}
                                value={group}
                                onChange={(group) => setAttributes({group})}
                            />
                        </PanelRow>
                    </PanelBody>
                    <PanelBody initialOpen={false} title={__("API & Source")}>
                        <PanelRow>
                            <SelectControl
                                value={app}
                                onChange={(app) => {
                                    setAttributes({app: app, hiddenFilters: []})
                                }}
                                options={this.state.apps}
                            />
                        </PanelRow>

                  {app == ALIVE_SUPERSET_APP && 
                        <PanelRow>
                            
                                        <SelectControl
                                            label={__('Datasets')}
                                            value={[datasetId]} 
                                            onChange={(newDatasetId)   => {
                                                setAttributes({
                                                    datasetId: newDatasetId,
                                                    dimension1: 'none',
                                                    dimension2: 'none'  

                                          })
                                                this.setState({dimensions: [], measures: [], filters: [], categories: []})                                              
                                                this.loadMetadata(newDatasetId)
                                            }}
                                            options={datasets}
                                        />
                                 </PanelRow>
        }
                    </PanelBody>

                    {app != 'csv' && this.state.filters && <PanelBody initialOpen={false} title={__("Select Filter")}>
                        <PanelRow>
                            <SelectControl
                                value={param}
                                options={[{value:'', label: __("Select Filter")}, ...this.state.filters]}
                                onChange={param => {
                                    const type = this.state.filters.filter(f => f.param === param)[0].type
                                    setAttributes({param, type, hiddenFilters: []})
                                }}/>
                        </PanelRow>

                    </PanelBody>}
                    {app == 'csv' && this.state.filters && <PanelBody initialOpen={false} title={__("Select Filter")}>
                        <PanelRow>
                            <TextControl label={__("Field")} value={param}
                                         onChange={(param) => setAttributes({param})}></TextControl>
                        </PanelRow>
                        <PanelRow>
                            <TextControl label={__("Values")} value={csvValue}
                                         onChange={(csvValue) => setAttributes({csvValue})}></TextControl>
                        </PanelRow>
                        <PanelRow>
                            <SelectControl
                                label={__('Default Value Criteria')}
                                value={defaultValueCriteria}
                                onChange={(defaultValueCriteria) => {
                                    setAttributes({defaultValueCriteria: defaultValueCriteria})
                                }}
                                options={[{
                                    value: DEFAULT_VALUE_INPUT, label: 'Enter default value'
                                }, {value: LOWEST_VALUE, label: 'Lowest value in filter data'}, {
                                    value: HIGHEST_VALUE, label: 'Highest value in filter data'
                                }]}
                            />
                        </PanelRow>
                        {defaultValueCriteria == DEFAULT_VALUE_INPUT && <PanelRow>
                            <TextControl label={__("Default Values")} value={defaultValues}
                                         onChange={(defaultValues) => setAttributes({defaultValues})}></TextControl>
                        </PanelRow>}


                    </PanelBody>}
                    <PanelBody title={__("Type Setting")}>
                        <PanelRow>
                            <SelectControl
                                label={__('Filter Type')}
                                value={[isRange ? "range" : filterType]}
                                onChange={(filterType) => {
                                    setAttributes({filterType: filterType, isRange: filterType == "range"})
                                }}
                                options={app == 'csv' ? [{
                                    label: "Multi select",
                                    value: "multi-select"
                                }, {label: "Single select", value: "single-select"}, {
                                    label: "Range",
                                    value: "range"
                                }] : [{label: "Multi select", value: "multi-select"}, {
                                    label: "Single select",
                                    value: "single-select"
                                }, {label: "Range", value: "range"}]}
                            />
                        </PanelRow>

                        {isRange && <PanelRow>
                            <TextControl
                                label={__('Start')}
                                value={startLabel}
                                onChange={(startLabel) => setAttributes({startLabel})}
                            />
                        </PanelRow>}
                        {isRange && <PanelRow>
                            <TextControl
                                label={__('End')}
                                value={endLabel}
                                onChange={(endLabel) => setAttributes({endLabel})}
                            />
                        </PanelRow>}
                    </PanelBody>
                    {app != 'csv' && <PanelBody initialOpen={false} title={__("Filter or hide items")}>
                        <PanelRow>
                            <ToggleControl
                              label={__("Filter items")}
                              checked={useFilterItems}
                              onChange={() => setAttributes({useFilterItems: !useFilterItems, filters: [], hiddenFilters: []})}/>
                        </PanelRow>
                        <PanelRow>
                            <ToggleControl
                              label={__("Hide items")}
                              checked={!useFilterItems}
                              onChange={() => setAttributes({useFilterItems: !useFilterItems, filters: [], hiddenFilters: []})}/>
                        </PanelRow>
                            {useFilterItems && <DataFilters
                              allFilters={this.state.filters}
                              allCategories={this.state.categories}
                              {...this.props}/>
                            }
                            {!useFilterItems && <PanelBody initialOpen={false} title={__("Hidden Filter Options")}>
                                {(selectedFilters || []).map((f, index) => {
                                    return (
                                      <CategoricalFilter value={hiddenFilters} index={index} items={this.items(f.type)}
                                                         onUpdateFilterValue={this.updateHiddenFilters}/>)
                                })}
                            </PanelBody>
                            }
                    </PanelBody>}
                    <PanelBody title={__("Labels")}>
                        <PanelRow>
                            <TextControl
                                label={__('Place Holder')}
                                value={placeHolder}
                                onChange={(placeHolder) => setAttributes({placeHolder})}
                            />
                        </PanelRow>
                        {!isRange && <PanelRow>
                            <TextControl
                                label={__('All')}
                                value={allLabel}
                                onChange={(allLabel) => setAttributes({allLabel})}
                            />
                        </PanelRow>}
                        {!isRange && <PanelRow>
                            <TextControl
                                label={__('None')}
                                value={noneLabel}
                                onChange={(noneLabel) => setAttributes({noneLabel})}
                            />
                        </PanelRow>}
                    </PanelBody>
                    <PanelBody title={__("Dropdown Options")}>
                        <PanelRow>
                            <ToggleControl
                                label={__("Alphabetical Sort")}
                                checked={alphabeticalSort}
                                onChange={() => setAttributes({alphabeticalSort: !alphabeticalSort})}/>
                        </PanelRow>
                        <PanelRow>
                            <ToggleControl
                                label={__("Order Asc")}
                                checked={ascOrder}
                                onChange={() => setAttributes({ascOrder: !ascOrder})}/>
                        </PanelRow>
                        <PanelRow>
                            <ToggleControl
                                label={__("Use single column to display dropdown items")}
                                checked={useSingleColumn}
                                onChange={() => setAttributes({useSingleColumn: !useSingleColumn})}/>
                        </PanelRow>
                        <PanelRow>
                            <ToggleControl label={__("Enable Text Search")}
                                           checked={enableTextSearch}
                                           onChange={() => setAttributes({enableTextSearch: !enableTextSearch})}/>
                        </PanelRow>
                        <PanelRow>
                            <ToggleControl label={__("Show No Data Option (if available)")}
                                           checked={showNoDataOption}
                                           onChange={() => setAttributes({showNoDataOption: !showNoDataOption})}/>
                        </PanelRow>
                        {filterType == "multi-select" && <>
                            <PanelRow>
                                <ToggleControl
                                    label={__("Close dropdown on item select/click")}
                                    checked={closeOnSelect}
                                    onChange={() => setAttributes({closeOnSelect: !closeOnSelect})}/>
                            </PanelRow>
                            <PanelRow>
                                <ToggleControl
                                    label={__("All and None have same behaviour")}
                                    checked={allNoneSameBehaviour}
                                    onChange={() => setAttributes({allNoneSameBehaviour: !allNoneSameBehaviour})}/>
                            </PanelRow>
                        </>}
                    </PanelBody>

                </Panel>
            </InspectorControls>),

                (<div>

                        {this.state.react_ui_url && <iframe ref={this.iframe} scrolling={"no"}
                                                            style={iframeStyles}
                                                            src={this.state.react_ui_url + "/embeddable/filter"}/>}
                    </div>

                )]);

    }
}


const Edit = (props) => {

    const blockProps = useBlockProps({className: 'wp-react-component'});
    return (<div {...blockProps}>
        <p className={"iframe container"}>
            <BlockEdit {...props}/>
        </p>

    </div>)


}
export default Edit;