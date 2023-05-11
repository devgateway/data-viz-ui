import { Component } from "@wordpress/element";
import { __ } from '@wordpress/i18n';
import {
    Button,
    PanelBody,
    PanelRow,
    TextControl,
    ToggleControl,
    SelectControl       
} from '@wordpress/components';
import { PanelColorSettings } from '@wordpress/block-editor'
import Papa from 'papaparse'

const colorSchemes = [{value: "blues", label: 'blues'},
    {value: "greens", label: 'greens'},
    {value: "greys", label: 'greys'},
    {value: "oranges", label: 'oranges'},
    {value: "purples", label: 'purples'},
    {value: "reds", label: 'reds'}];

export default class LegendBreaks extends Component {
    constructor(props) {
        super(props);
        this.setMinValue = this.setMinValue.bind(this)
        this.setMaxValue = this.setMaxValue.bind(this)
        this.addLegendBreaks = this.addLegendBreaks.bind(this)
        this.removeLegendBreaks = this.removeLegendBreaks.bind(this)
    }

    setMinValue(value, idx) {
        const { attributes: { legendBreaks }, setAttributes } = this.props
        const newLegendBreak = legendBreaks.slice()
        newLegendBreak[idx].min = value
        setAttributes({ legendBreaks: newLegendBreak })
    }

    setMaxValue(value, idx) {
        const { attributes: { legendBreaks }, setAttributes } = this.props
        const newLegendBreak = legendBreaks.slice()
        newLegendBreak[idx].max = value
        setAttributes({ legendBreaks: newLegendBreak })
    }

    setColor(color, idx) {
        const { attributes: { legendBreaks }, setAttributes } = this.props
        const newLegendBreak = legendBreaks.slice()
        newLegendBreak[idx].color = color ? encodeURIComponent(color) : null;
        setAttributes({ legendBreaks: newLegendBreak })
    }

    setFieldData(field, value, idx) {
        const { attributes: { legendBreaks }, setAttributes } = this.props
        const newLegendBreak = legendBreaks.slice()
        newLegendBreak[idx][field] = value;
        setAttributes({ legendBreaks: newLegendBreak });
    }

    addLegendBreaks() {
        const { attributes: { legendBreaks }, setAttributes } = this.props
        let index = legendBreaks.length;
        const newLegendBreak = {}
        let newLegendBreaks = legendBreaks.slice()
        newLegendBreaks.push(newLegendBreak)
        setAttributes({ legendBreaks: newLegendBreaks })
    }

    removeLegendBreaks(f) {
        const { attributes: { legendBreaks }, setAttributes } = this.props
        let newLegendBreaks = legendBreaks.slice(0, -1)
        setAttributes({ legendBreaks: newLegendBreaks })
    }

    addFilter(idx) {
        const { attributes: { legendBreaks }, setAttributes } = this.props
        const breaks = legendBreaks.slice()
        const currentBreak = breaks[idx];
        if (!currentBreak['filters']) {
            currentBreak['filters'] = []
        }
        currentBreak['filters'].push({})
        setAttributes({ legendBreaks: breaks });               
    }

    removeFilters(idx) {         
        const { attributes: { legendBreaks }, setAttributes } = this.props
        const breaks = legendBreaks.slice()
        const currentBreak = breaks[idx];
        if (currentBreak['filters']) {            
            currentBreak['filters'] = currentBreak['filters'].slice(0, -1) 
        }        
        setAttributes({ legendBreaks: breaks });  
    }

    setFilterData(field, value, breakIndex, filterIndex) {
        const { attributes: { legendBreaks }, setAttributes } = this.props
        const newLegendBreak = legendBreaks.slice()
        let filters = newLegendBreak[breakIndex]['filters']
        if (filters) {
           filters[filterIndex][field] = value;
        }
        setAttributes({ legendBreaks: newLegendBreak });
    }

    render() {
        const { app, allMeasures, setAttributes, attributes: {
            legendBreaks,
            showLegendLabels,
            measures,
            autoGenerateBreaks,
            numberOfBreaks,
            colorScheme,
            csv,
            mapNoDataColor,
            mapBoundaryColor,
            mapFocusBoundaryColor,
            mapContainerBgColor,
            showNoDataLegendItem,
            defaultPointColor
        }
        } = this.props;

        const csvMeasureOPtions = []
        if (app == 'csv') {
            const data = Papa.parse(csv, { header: true, dynamicTyping: true });
            csvMeasureOPtions.push({ value: '', label: 'None' })
            data.meta.fields.forEach((field, i) => {
                if (i > 0) {
                    if (!field.startsWith('_')) {
                        csvMeasureOPtions.push({ value: field, label: field })
                    }                    
                }
            })
        }

        return [<PanelBody initialOpen={false} title={__("Colors")}>
            <PanelRow>
                <PanelColorSettings
                    title={__('Map Container Background Color')}
                    colorSettings={[
                        {
                            value: decodeURIComponent(mapContainerBgColor ? mapContainerBgColor : "#fff"),
                            onChange: (color) => {
                                if (color) {
                                    setAttributes({mapContainerBgColor: encodeURIComponent(color)})
                                } else {
                                    setAttributes({mapContainerBgColor: encodeURIComponent("#fff")})
                                }
                            },
                            label: __("")
                        }
                    ]}

                />
                </PanelRow> 
              <PanelRow>
                <PanelColorSettings
                    title={__('No Data Color')}
                    colorSettings={[
                        {
                            value: decodeURIComponent(mapNoDataColor ? mapNoDataColor : "#f8f8f8"),
                            onChange: (color) => {
                                if (color) {
                                    setAttributes({mapNoDataColor: encodeURIComponent(color)})
                                } else {
                                    setAttributes({mapNoDataColor: encodeURIComponent("#f8f8f8")})
                                }
                            },
                            label: __("")
                        }
                    ]}

                />
                </PanelRow> 
                <PanelRow>
                <PanelColorSettings
                    title={__('Boundary Color')}
                    colorSettings={[
                        {
                            value: decodeURIComponent(mapBoundaryColor ? mapBoundaryColor : "#000"),
                            onChange: (color) => {
                                if (color) {
                                    setAttributes({mapBoundaryColor: encodeURIComponent(color)})
                                } else {
                                    setAttributes({mapBoundaryColor: encodeURIComponent("#000")})
                                }
                            },
                            label: __("")
                        }
                    ]}/>
                </PanelRow> 
                <PanelRow>
                <PanelColorSettings
                    title={__('Boundary Highlight Color')}
                    colorSettings={[
                        {
                            value: decodeURIComponent(mapFocusBoundaryColor ? mapFocusBoundaryColor : "#000"),
                            onChange: (color) => {
                                if (color) {
                                    setAttributes({mapFocusBoundaryColor: encodeURIComponent(color)})
                                } else {
                                    setAttributes({mapFocusBoundaryColor: encodeURIComponent("#000")})
                                }
                            },
                            label: __("")
                        }
                    ]}

                />
                </PanelRow>
              
            <PanelRow>                
                <ToggleControl
                    label="Show 'No Data' legend item"
                    checked={showNoDataLegendItem}
                    onChange={() => setAttributes({ showNoDataLegendItem: !showNoDataLegendItem })}
                />
            </PanelRow>
            <PanelRow>                
                <ToggleControl
                    label="Auto-generate breaks based on available data"
                    checked={autoGenerateBreaks}
                    onChange={() => setAttributes({ autoGenerateBreaks: !autoGenerateBreaks })}
                />
            </PanelRow>
            {autoGenerateBreaks &&
                <>
                    <PanelRow>
                        {<TextControl value={numberOfBreaks} label={__("Number of breaks")}
                            onChange={(value) => setAttributes({ numberOfBreaks: value <= 10 ? value : numberOfBreaks})} max={10} type="number"
                            on/>}
                    </PanelRow>
                    <PanelRow>
                        <SelectControl
                            label={__('Color Scheme')}
                            value={[colorScheme]}
                            onChange={(value) => {
                                setAttributes({ colorScheme: value })
                            }}
                            options={colorSchemes}
                        />
                    </PanelRow>
                </>
            }
            
            {!autoGenerateBreaks &&
                <>
                    <PanelRow>
                        <ToggleControl
                            label="Show break labels instead of values"
                            checked={showLegendLabels}
                            onChange={() => setAttributes({ showLegendLabels: !showLegendLabels })}
                        />
                    </PanelRow>

                    {legendBreaks.map((f, index) => {
                        return (
                            <PanelBody initialOpen={true} title={__(`Break: ${f.min != null ? f.min : ''} - ${f.max != null ? f.max : ''}`)}>

                                {<TextControl value={f.min} label={__("Min")}
                                    onChange={value => this.setMinValue(value, index)} type="number" />}

                                {<TextControl value={f.max} label={__("Max")}
                                    onChange={value => this.setMaxValue(value, index)} type="number"

                                />}

                                {<TextControl value={f.label} label={__("Label")}
                                    onChange={value => this.setFieldData('label', value, index)} />}

                                <SelectControl label={__('Measure')}
                                    value={f.measure}
                                    onChange={(value) => {
                                        this.setFieldData('measure', value, index)
                                    }}
                                    options={app == 'csv' ? csvMeasureOPtions : [{ value: '', label: 'None' }, ...allMeasures.filter(m => measures.includes(m.value))]}
                                />

                                <PanelColorSettings
                                    title={__('Color settings')}
                                    colorSettings={[
                                        {
                                            value: decodeURIComponent(f.color),
                                            onChange: (color) => {
                                                this.setColor(color, index)
                                            },
                                            label: __('Color')
                                        }
                                    ]}
                                />
                            
                                <PanelBody title="Filters" initialOpen={false}>                                   
                                    {f.filters && f.filters.map((filter , filterIndex) => {
                                        return (<> <PanelRow>
                                            <TextControl label={__("Field")} value={filter.field}
                                            onChange={(value) => {
                                                this.setFilterData('field', value, index, filterIndex)
                                            }}></TextControl>
                                        </PanelRow>
                                            <PanelRow>
                                                <TextControl label={__("Value")} value={filter.values}
                                                onChange={(value) => {
                                                    this.setFilterData('values', value, index, filterIndex)
                                                }}></TextControl>
                                            </PanelRow>
                                            <hr></hr></>)
                                    })
                                    }
                                    <PanelRow>
                                        <Button isLink onClick={() => {
                                            this.addFilter(index)
                                        }}>{__("Add Filter")}</Button>
                                        <Button isLink onClick={() => {                                           
                                            this.removeFilters(index)
                                        }}>{__("Remove Filter")}</Button>
                                    </PanelRow>
                                </PanelBody>								

                            </PanelBody>)
                    })}                                     
                    <PanelRow>
                        <Button isLink onClick={this.addLegendBreaks}>{__("Add Break")}</Button>
                        <Button isLink onClick={this.removeLegendBreaks}>{__("Remove")}</Button>
                    </PanelRow>
                </>
            }
        </PanelBody>]
    }
}