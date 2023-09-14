import React from "react";
import {getTranslatedValue, measuresMap, typesMap} from "./Utils";


const alphaSort = (reverse, a, b) => {

    if (b < a) {
        return reverse ? -1 : 1;
    }
    if (b > a) {
        return reverse ? 1 : -1;
    }

    return 0;

}
const numericSort = (reverse, a, b) => {

    return reverse ? b - a : a - b

}

const getOptionsNoDimension = (props) => {
    const {data, measures, swap, dimensions, locale, customLabels} = props
    let options = {}
    const selectedDimensions = dimensions.filter(f => f != '')
    const measuresMetadata = new Set()
    if (selectedDimensions.length == 0 && data) {
        const mMap = measuresMap(data)
        const categories = new Set()
        let keys = new Set()
        let series = []
        let indexBy
        if (data.metadata && data.metadata.measures) {
            const selectedMeasures = data.metadata.measures.filter(m => measures.includes(m.value)).sort((aMeasure, bMeasure) => {
                if (aMeasure.position != null && bMeasure.position != null && aMeasure.position != bMeasure.position) {
                    return aMeasure.position - bMeasure.position
                }

                return 0
            })
            series = []
            indexBy = "measure"
            categories.add("measure")

            const variables = {}
            Object.keys(data).forEach(k => {
                variables[k] = data[k]
            })

            selectedMeasures.forEach(m => {
                let row = {}
                const label = customLabels[m.value] || getTranslatedValue(mMap[m.value], locale)
                row.type = "measure"
                row["measureFieldName"] = m.value
                row["measure"] = label
                row[label] = data[m.value]
                row.variables = variables
                series.push(row)
                keys.add(label)
                measuresMetadata.add(mMap[m.value])
            })

            options = {
                categories,
                indexBy,
                keys: Array.from(keys),
                measuresMetadata,
                data: series
            }
        }
    }

    return options;
}
const includeOverallData = (props) => {
    const {data, measures, dimensions, overallLabel} = props
    if (dimensions.length == 1 && data.children) {
        let overallAdded = data.children.filter(c => c.value == overallLabel).length > 0
        if (!overallAdded) {
            const overallData = {}
            overallData.type = dimensions[0];
            overallData.value = overallLabel;
            overallData.label = overallLabel;
            Object.keys(data).forEach(k => {
                if (!["children", "metadata", "type", "value"].includes(k)) {
                    overallData[k] = data[k];
                }
            })

            data.children = [overallData, ...data.children]
        }
    } else if (dimensions.length == 2 && data.children) {
        data.children.forEach(d => {
            let overallAdded = d.children.filter(c => c.value == overallLabel).length > 0
            if (!overallAdded) {
                const overallData = {}
                overallData.type = dimensions[1];
                overallData.value = overallLabel;
                overallData.label = overallLabel;

                Object.keys(d).forEach(k => {
                    if (!["children", "metadata", "type", "value"].includes(k)) {
                        overallData[k] = d[k];
                    }
                })

                d.children = [overallData, ...d.children]
            }
        })
    }

    return data;
}

const BarOneDimension = (props) => {
    let options = {}
    const {data, measures, swap, dimensions, includeOverall, locale, customLabels, colorBy, hiddenBars} = props
    const selectedDimensions = dimensions.filter(f => f != '')
    const selectedMeasures = data.metadata.measures.filter(m => measures.includes(m.value)).sort((aMeasure, bMeasure) => {
        if (aMeasure.position != null && bMeasure.position != null && aMeasure.position != bMeasure.position) {
            return aMeasure.position - bMeasure.position
        }

        return 0
    })

    if (includeOverall && measures.length == 1) {
        includeOverallData(props)
    }
    if (selectedDimensions.length == 0 && data) {
        options = getOptionsNoDimension(props);
    } else if (data && data.children && selectedDimensions.length > 0) {
        const mMap = measuresMap(data)
        const tMap = typesMap(data)
        const dimensionsMetadata = new Set()
        const measuresMetadata = new Set()
        let keys = new Set()
        let series = []
        let indexBy

        if (swap && (selectedDimensions.length == 1 && measures.length > 0)) {
            indexBy = 'measure'
            selectedMeasures.forEach(measure => {
                const row = {}
                row["measure"] = customLabels[measure.value] || getTranslatedValue(mMap[measure.value], locale)// measureLabel(mMap, m)
                measuresMetadata.add(mMap[measure.value])
                data.children.forEach(d => {
                    const value = getTranslatedValue(tMap[d.type].items.filter(i => i.value === d.value)[0], locale) || d.value
                    const variables = {}
                    Object.keys(d).forEach(k => {
                        variables[k] = d[k]
                    })
                    variables[d.type] = d.value.toString()
                    row['variables'] = variables
                    dimensionsMetadata.add(tMap[d.type])
                    row[value] = d[measure.value]
                    keys.add(value)
                })

                series.push({...row})
            })

        } else {

            indexBy = data.children[0].type
            let total = 0;
            data.children.forEach(d => {
                const variables = {}
                const row = {}
                row[d.type] = getTranslatedValue(tMap[d.type] && tMap[d.type].items ? tMap[d.type].items.filter(i => i.value === d.value)[0] : d.value, locale) || d.value
                Object.keys(d).forEach(k => {
                    variables[k] = d[k]
                })

                dimensionsMetadata.add(tMap[d.type])
                variables[d.type] = d.value.toString()
                selectedMeasures.map(m => {
                    const label = customLabels[m.value] || getTranslatedValue(mMap[m.value], locale)
                    row[label] = d[m.value];
                    measuresMetadata.add(mMap[m.value])
                    keys.add(label)
                })

                series.push({...row, variables, parent_variables: variables})
            })


        }
        const allKeys = Array.from(keys)
        const filtered = hiddenBars && series ? series.filter(s => hiddenBars.indexOf(s[indexBy]) == -1) : series

        if (props.sort == 'alphabetically') {
            filtered.sort((a, b) => alphaSort(props.sortreverse, a[indexBy], b[indexBy]));
        }
        if (props.sort == 'values') {

            filtered.sort((a, b) => {
                debugger;
                const va =Math.max(...allKeys.map(k=>a[k]))
                const vb = Math.max(...allKeys.map(k=>b[k]));
                return numericSort(props.sortreverse, va, vb)
            });
        }
        options = {
            metadata: data.metadata,
            indexBy,
            dimensionsMetadata,
            measuresMetadata,
            keys: allKeys,
            data: filtered
        }

    }


    return React.Children.map(props.children, child => React.cloneElement(child, {options}))

}
const Bar2Dimensions = (props) => {
    const {data, measures, includeOverall, dimensions, hiddenBars, colorBy, locale, customLabels} = props
    const selectedDimensions = dimensions.filter(f => f != '')
    let options = {}
    if (includeOverall) {
        includeOverallData(props)
    }

    if (selectedDimensions.length == 0 && data) {
        options = getOptionsNoDimension(props);
    } else if (data && data.children && selectedDimensions.length > 0) {
        const mMap = measuresMap(data)
        const tMap = typesMap(data)
        const field = measures[0];
        const dimensionsMetadata = new Set()
        // const measuresMetadata = new Set()
        let keys = new Set()
        const series = []
        const vals = []
        const indexBy = data.children[0].type
        let total = 0;
        let variables
        let parentValue;
        data.children.forEach(d => {
            const row = {variables: {}}
            parentValue = getTranslatedValue(tMap[d.type] && tMap[d.type].items ? tMap[d.type].items.filter(i => i.value === d.value)[0] : d.value, locale) || d.value
            row[d.type] = parentValue
            row[parentValue] = d[field];
            variables = new Object()
            //variables[d.type] = d.value
            variables[d.type] = parentValue
            row.parent_variables = variables

            Object.keys(d).forEach(k => {
                variables[k] = d[k]
            })

            dimensionsMetadata.add(tMap[d.type])
            // measuresMetadata.add(mMap[field])

            if (!d.children) {
                keys.add(parentValue)
            }
            if (d.children) { //level 2
                d.children.forEach(d1 => {


                    variables = new Object()
                    dimensionsMetadata.add(tMap[d1.type])

                    const value = getTranslatedValue(tMap[d1.type] && tMap[d1.type].items ? tMap[d1.type].items.filter(i => i.value === d1.value)[0] : d1.value, locale) || d1.value

                    variables[d.type] = parentValue
                    variables[d1.type] = value
                    Object.keys(d1).forEach(k => {
                        variables[k] = d1[k]
                    })
                    row.variables[value] = variables
                    keys.add(value)
                    total += d1[field]
                    vals.push(d1[field])
                    row[value] = d1[field]
                })
            } else {
                const variables = new Object()
                variables[d.type] = parentValue
                dimensionsMetadata.add(tMap[d.type])
                Object.keys(data).forEach(k => {
                    variables[k] = d[k]
                })
                row.variables = variables
            }
            series.push(row)
        })

        const filtered=(colorBy == "id") ? series : series.filter(s => hiddenBars.indexOf(s[indexBy]) == -1);
        const allKeys = Array.from(keys)
        if (props.sort == 'alphabetically') {
            filtered.sort((a, b) => alphaSort(props.sortreverse, a[indexBy], b[indexBy]));
        }
        if (props.sort == 'values') {

            filtered.sort((a, b) => {
                debugger;
                const va =Math.max(...allKeys.map(k=>a[k]))
                const vb = Math.max(...allKeys.map(k=>b[k]));
                return numericSort(props.sortreverse, va, vb)
            });
        }

        options = {
            metadata: data.metadata,
            dimensionsMetadata,
            indexBy,
            keys: (colorBy == "index") ? allKeys : allKeys.filter(k => hiddenBars.indexOf(k) == -1),
            data: filtered
        }
    }


    return <>
        {React.Children.map(props.children, child => React.cloneElement(child, {options}))}</>
}

const BarData = (props) => {
    const {data, measures, dimensions} = props
    const copyData = JSON.parse(JSON.stringify(data))
    if (dimensions.length === 1) {
        return <BarOneDimension {...props} data={copyData}></BarOneDimension>
    } else {
        return <Bar2Dimensions {...props} data={copyData}></Bar2Dimensions>
    }
}


export default BarData