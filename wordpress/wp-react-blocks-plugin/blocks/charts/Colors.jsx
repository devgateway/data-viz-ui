import {PanelBody, PanelRow, SelectControl} from '@wordpress/components';
import {PanelColorSettings} from '@wordpress/block-editor';
import {__} from '@wordpress/i18n';
import {useEffect} from "react";
import Papa from 'papaparse'
import {useRef, useState} from "@wordpress/element";
import {getTranslation} from "../commons/APIutils";

const OVERALL = 'Overall';
const system = [{value: "system", label: 'System Colors'}, {value: "manual", label: 'Manual Colors'}]
export const categorical = [{value: "nivo", label: 'nivo'}, {
    value: "category10", label: 'category10'
}, {value: "accent", label: 'Accent'}, {value: "dark2", label: 'dark2'}, {
    value: "paired", label: 'paired'
}, {value: "pastel1", label: 'pastel1'}, {value: "pastel2", label: 'pastel2'}, {
    value: "set1", label: 'set1'
}, {value: "set2", label: 'set2'}, {value: "set3", label: 'set3'}]

export const sequential = [{value: "blues", label: 'blues'}, {value: "greens", label: 'greens'}, {
    value: "greys", label: 'greys'
}, {value: "oranges", label: 'oranges'}, {value: "purples", label: 'purples'}, {
    value: "reds", label: 'reds'
}, {value: "blue_green", label: 'blue_green'}, {value: "blue_purple", label: 'blue_purple'}, {
    value: "green_blue", label: 'green_blue'
}, {value: "orange_red", label: 'orange_red'}, {
    value: "purple_blue_green", label: 'purple_blue_green'
}, {value: "purple_blue", label: 'purple_blue'}, {value: "purple_red", label: 'purple_red'}, {
    value: "red_purple", label: 'red_purple'
}, {value: "yellow_green_blue", label: 'yellow_green_blue'}, {
    value: "yellow_green", label: 'yellow_green'
}, {value: "yellow_orange_brown", label: 'yellow_orange_brown'}, {
    value: "yellow_orange_red", label: 'yellow_orange_brown'
}]


const plainColor = {value: "plain_color", label: 'Use Plain color'};

const Colors = (props) => {
    const {
        allDimensions, allFilters, allMeasures, allCategories, allApps, setAttributes, attributes: {
            swap,
            measures,
            manualColors,
            scheme,
            colorBy,
            dimension1,
            dimension2,
            barColor,
            type,
            app,
            csv,
            includeOverall
        }
    } = props;


    let l1Label
    let d2Label
    let d3Label


    const selectedMeasures = measures[app] ? Object.keys(measures[app]).map(k => measures[app][k]).filter(m => m.selected) : []

    let colorOptions = []


    if (app !== "csv") {
        l1Label = dimension1 != 'none' && allDimensions ? '1st Dimension - ' + allDimensions.filter(d => d.value == dimension1)[0].label : null
        //if one dimensions is selected o
        if (dimension2 == 'none' && selectedMeasures.length > 0) {
            d2Label = __("Measure Labels")
            d3Label = __("Measure Values")
        } else if (dimension2 != 'none') {
            //if two dimensions are selected show dimensions 1, dimensions 2 and values
            d2Label = allDimensions ? '2nd Dimension - ' + allDimensions.filter(d => d.value == dimension2)[0].label : null
            d3Label = __("Measure Values")
        }

    } else {
        //CSV Color Options
        const data = Papa.parse(csv, {header: true, dynamicTyping: true});
        l1Label = data.meta.fields.length > 0 ? '1st Column Values ' : null
        d2Label = __("Measure Columns Labels")
        d3Label = __("Measure Columns Values")
    }


    if (type == 'bar') {
        if (swap && dimension2 == "none" && selectedMeasures.length > 0) {
            colorOptions = []
            if (l1Label) {
                colorOptions.push({label: l1Label, value: 'id'})
                colorOptions.push({label: d2Label, value: 'index'})
            } else {
                colorOptions.push({label: d2Label, value: 'id'})
                colorOptions.push({label: "Measure Values", value: 'values'})
            }

        } else {
            colorOptions = []
            if (l1Label && l1Label !== 'none') {
                colorOptions.push({label: l1Label, value: 'index'})
            }
            if (d2Label && d2Label !== 'none') {
                colorOptions.push({label: d2Label, value: (l1Label && l1Label !== 'none') ? 'id' : 'index'})
            }

            if (d3Label && d3Label !== 'none') {
                colorOptions.push({label: d3Label, value: 'values'})
            }

        }
    }

    if (type == 'pie') {

        if (dimension1 != 'none' && dimension2 == 'none' && colorBy != 'index') {
            setAttributes({colorBy: 'index'})
            return null;
        }
        if (dimension1 != 'none' && dimension2 != 'none' && colorBy != 'id') {
            setAttributes({colorBy: 'id'})
            return null;
        }
    }


    let options = []
    if (colorBy === 'index' || colorBy === 'id') {
        if (type == "bar") {
            options = [...system, plainColor, ...categorical, ...sequential]

        } else if (type == "line") {
            options = [...system, plainColor, ...categorical]
        } else {
            options = [...system, ...categorical, ...sequential]
        }
    }
    if (colorBy === 'values') {
        options = [...sequential]
    }

    const [useColors, setUseColors] = useState("dimension")


    useEffect(() => {
        let nextUseColors = useColors;
        if (app != "csv") {
            // All conditions for coloring by measures
            if ((dimension2 == "none" && colorBy === "index" && swap) ||
                (type == 'line') ||
                (dimension1 == "none" && dimension2 == "none")) { //Multi measure colored by first dimension but  swapped (Colored by Measure) or dimensionless bar charts
                nextUseColors = "measure"
            } else if (dimension2 == "none" && colorBy === "id" && !swap) {  //Multi Measure chart colored by  (Measure)
                nextUseColors = "measure"
            } else {
                //colored by a dimensions
                nextUseColors = "dimension"
            }
            if (prevStatus.current) {
                if (nextUseColors == "dimension") {
                    if (prevStatus.current["scheme"] != scheme && scheme === "manual") {
                        initColors(colorBy === "index" ? dimension1 : dimension2)
                    }
                    if (prevStatus.current["colorBy"] != colorBy) {
                        initColors(colorBy === "index" ? dimension1 : dimension2)
                    }
                    if (prevStatus.current["dimension1"] != dimension1 || prevStatus.current["dimension2"] != dimension2) {
                        initColors(colorBy === "index" ? dimension1 : dimension2)
                    }
                } else {
                    initMeasuresColors()
                }

            }
            setUseColors(nextUseColors)
        } else {
            if (!manualColors["csv"]) {
                setAttributes({manualColors: {"csv": {}}})
            }
        }
        prevStatus.current = {scheme, colorBy, dimension1, dimension2, useColors, app}

    }, [scheme, dimension1, dimension2, colorBy, swap, app, type])

    const prevStatus = useRef();

    const updateColor = (value, color) => {
        
        const newColors = Object.assign({}, manualColors)
        newColors[app][value] = color
        setAttributes({manualColors: newColors})
    }

    const initColors = (dimension) => {
        
        const ds = allDimensions.filter(d => d.value == dimension)
        const newColors = Object.assign({}, manualColors)

        if (!newColors[app]) {
            newColors[app] = {}
        }

        if (ds.length > 0) {
            const {type} = ds[0]
            const cat = allCategories.filter(a => a.type === type)
            if (cat.length > 0) {
                
                cat[0].items.forEach(item => {
                    if (!newColors[app][item.code]) {
                        newColors[app][item.code] = item.categoryStyle ? item.categoryStyle.color : "#eeeeee"
                    }
                })
            }

            setAttributes({manualColors: newColors})
        }

    }

    const initMeasuresColors = () => {
        
        const newColors = Object.assign({}, manualColors)
        if (!newColors[app]) {
            newColors[app] = {}
        }
        if (!allMeasures) {
        }
        if (allMeasures) {
            allMeasures.forEach(p => {
                if (!newColors[app][p.value]) {
                    newColors[app][p.value] = p.styles ? p.styles.color : "#eeeeee"
                }
            })

        }
        setAttributes({manualColors: newColors})
    }

    const combinedCatColors = (dimension1, dimension2) => {
        
        if (manualColors[app]) {
            const ds1 = allDimensions.filter(d => d.value == dimension1)
            const ds2 = allDimensions.filter(d => d.value == dimension2)
            if (ds1.length > 0 && ds2.length > 0) {

                const {type} = ds1[0]
                const {type: type2} = ds2[0]

                const cat = allCategories.filter(a => a.type === type)
                const cat2 = allCategories.filter(a => a.type === type2)
                const list = []
                cat[0].items.sort((a, b) => a.position - b.position).forEach(c1 => {
                    cat2[0].items.sort((a, b) => a.position - b.position).forEach(c2 => {
                        list.push(<PanelColorSettings
                            colorSettings={[{
                                value: manualColors[app][c1.value + ' - ' + c2.value],
                                onChange: (color) => {
                                    if (color) {
                                        updateColor(c1.value + ' - ' + c2.value, color)
                                    } else {
                                        updateColor(c1.value + ' - ' + c2.value, "#eeeeee")
                                    }
                                },
                                label: c1.value + ' - ' + c2.value
                            }]}
                        />)
                    })
                })

                return list
            }
        }
        return null;
    }

    const catColors = (dimension) => {
        
        if (manualColors[app]) {
            const ds = allDimensions.filter(d => d.value == dimension)
            if (ds.length > 0) {
                const {type} = ds[0]
                const cat = allCategories.filter(a => a.type === type)

                if (cat && cat.length > 0) {
                    const list = cat[0].items.sort((a, b) => b.position - a.position).map(item => {
                        return <PanelColorSettings
                            colorSettings={[{
                                value: manualColors[app][item.code],
                                onChange: (color) => {
                                    if (color) {
                                        updateColor(item.code, color)
                                    } else {
                                        updateColor(item.code, item.categoryStyle ? item.categoryStyle.color : "#eeeeee")
                                    }
                                }, label: getTranslation(item)
                            }]}
                        />


                    })
                    const dimensions = [dimension1, dimension2].filter(f => f != '' && f != "none");


                    let selectedMeasures = []

                    allMeasures.forEach(m => {
                        
                        if (measures[app] && measures[app][m.value] && measures[app][m.value].selected) {
                            selectedMeasures.push(m.value)
                        }
                    })

                    if (includeOverall) {
                        list.push(<PanelColorSettings
                            colorSettings={[{
                                value: manualColors[app][OVERALL],
                                onChange: (color) => {
                                    if (color) {
                                        updateColor(OVERALL, color)
                                    } else {
                                        updateColor(OVERALL, "#eeeeee")
                                    }
                                }, label: __("Overall")
                            }]}
                        />)
                    }

                    return list
                } else {
                    return null
                }
            }
        }
        return null
    }

    const measureColors = () => {
        
        if (manualColors[app] && allMeasures && measures[app]) {
            
            const selectedMeasures = allMeasures.filter(m => Object.keys(measures[app]).indexOf(m.value) > -1 && measures[app][m.value].selected)
             if (selectedMeasures.length > 0) {

                const list = selectedMeasures.sort((a, b) => b.position - a.position)
                    .map(item => {
                        return <PanelColorSettings
                            colorSettings={[{
                                value: manualColors[app][item.value], onChange: (color) => {
                                    if (color) {
                                        updateColor(item.value, color)
                                    } else {
                                        updateColor(item.value, item.styles ? item.styles.color : "#555555")
                                    }
                                }, label: __(item.label)
                            }]}
                        />
                    })

                if (includeOverall && selectedMeasures.length == 1) {
                    list.push(<PanelColorSettings
                        colorSettings={[{
                            value: manualColors[app][OVERALL], onChange: (color) => {
                                if (color) {
                                    updateColor(OVERALL, color)
                                } else {
                                    updateColor(OVERALL, "#eeeeee")
                                }
                            }, label: __("Overall")
                        }]}
                    />)
                }

                return list


            }
        }
        return null
    }

    const csvColors = () => {
        const data = Papa.parse(csv, {header: true, dynamicTyping: true});
        const values = [];

        if (colorBy === "index" && type != 'line') {
            const field = data.meta.fields[0];
            values.push(...data.data.map(d => d[field]))
        }
        if (colorBy === "id" || type == 'line') {
            values.push(...data.meta.fields.slice(1))
        }
        if (colorBy === "values") {
            values.push(0, 100)
        }

        if (manualColors[app] && values) {
            return values.map(v => {
                return <PanelColorSettings
                    colorSettings={[{
                        value: manualColors[app][v],

                        onChange: (color) => {
                            if (color) {
                                updateColor(v, color)
                            }
                        }, label: __(v)
                    }]}
                />
            })
        }

        return null
    }

    const elements = []
    if (type == 'bar') {
        elements.push(<PanelRow>
            <SelectControl
                label={__('Color By')}
                value={[colorBy]} // e.g: value = [ 'a', 'c' ]
                onChange={(colorBy) => {
                    setAttributes({colorBy})
                    if (colorBy === 'index' || colorBy === 'id') {
                        setAttributes({colorBy})
                    }
                    if (colorBy === 'values') {
                        setAttributes({scheme: "blues", colorBy})
                    }
                }}
                options={colorOptions}
            />
        </PanelRow>)
    }


    return [
        ...elements,
        <PanelRow>
            <SelectControl
                label={__('Color Scheme')}
                value={[scheme]} // e.g: value = [ 'a', 'c' ]
                onChange={(value) => {
                    setAttributes({scheme: value})
                }}
                options={options}
            />
        </PanelRow>,


        (scheme == "plain_color") && <PanelRow>
            <PanelColorSettings
                title={__('Color settings')}
                colorSettings={[{
                    value: decodeURIComponent(barColor), onChange: (color) => {
                        if (color) {
                            setAttributes({barColor: encodeURIComponent(color)})
                        } else {
                            setAttributes({barColor: null})
                        }
                    }, label: __('Plain color')
                }]}
            />
        </PanelRow>,

        (scheme == "manual") && <PanelRow>

            {app != "csv" && useColors == "dimension" && colorBy == "index" &&
                <PanelBody initialOpen={false} title={__("Set Colors")}>
                     {catColors(dimension1)}
                </PanelBody>}
            {app != "csv" && useColors == "dimension" && (colorBy == "id" && dimension2 != "none") &&
                <PanelBody initialOpen={false} title={__("Set Colors")}>

                    {type == 'bar' && catColors(dimension2)}
                    {type == 'line' && catColors(dimension2)}
                    {type == 'pie' && combinedCatColors(dimension1, dimension2)}
                </PanelBody>}


            {app != "csv" && useColors == "dimension" && swap && colorBy == "id" && dimension1 != "none" && dimension2 == "none" &&
                <PanelBody initialOpen={false} title={__("Set Colors")}>
                    {/*Color By Dimension1 swapped chart*/}
                    {catColors(dimension1)}
                </PanelBody>}

            {/* 1 dimension API chart can be colored by measure */}
            {app != 'csv' && useColors === "measure" &&
                <PanelBody initialOpen={false} title={__("Set Color By Measure")}>
                    {measureColors()}
                </PanelBody>}
            {/* CSV CHART*/}

            {app == "csv" && <PanelBody initialOpen={false} title={__("Set Colors")}>
                {csvColors(colorBy)}
            </PanelBody>}


        </PanelRow>]
}

export default Colors