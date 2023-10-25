import React from 'react';

const MapCSVDataFrame = (props) => { 
    const {mapType} = props
    if (mapType == 'POINTS_MAP') {
        return pointsMap(props)
    } else {
        return defaultMap(props)
    }   
}
const pointsMap = (props) => {
    const { children, data, multipleMeasures, aggregationFormula} = props;

    const transformedData = {
        locationsData: [],
        nationalData: {},
        measures: [],
        measureLabelMap: {}
    }

    const indexOfValueColumn = data.meta.fields.findIndex((f, i) => {
        return i > 2 && !f.startsWith('_');
    })

    const adminLocationsData = []
    if (data && data.data && data.meta.fields && data.meta.fields.length >= 2) {

        /// create summary of data
        data.data.forEach(item => {
            const newItem = {
                label: item[data.meta.fields[0]],
                lat: item[data.meta.fields[1]],
                lng: item[data.meta.fields[2]],
                value: item[data.meta.fields[indexOfValueColumn]] || 1,
                measure: data.meta.fields[indexOfValueColumn]
            }

            const variables = {}
            if (multipleMeasures && !transformedData.measures.includes(data.meta.fields[indexOfValueColumn])) {
                transformedData.measures.push(data.meta.fields[indexOfValueColumn])
            }

            if (data.meta.fields.length > indexOfValueColumn) {
                newItem.children = []
                for (let i = indexOfValueColumn + 1; i <= data.meta.fields.length; i++) {
                    const columnName = data.meta.fields[i]
                    const value = item[data.meta.fields[i]]
                    if (columnName) {
                        if (columnName.trim().startsWith("_")) {
                            variables[columnName] = value;
                        } else {
                            if (value != null) {
                                if (multipleMeasures) {
                                    const measureData = { label: item[data.meta.fields[0]], value: value, measure: data.meta.fields[i] }
                                    measureData.variables = variables;
                                    adminLocationsData.push(measureData);
                                    if (!transformedData.measures.includes(data.meta.fields[i])) {
                                        transformedData.measures.push(data.meta.fields[i])
                                    }
                                } else {
                                    newItem.children.push({ label: data.meta.fields[i], value: value });
                                }
                            }
                        }
                    }
                }
            }

            newItem.variables = variables;
            adminLocationsData.push(newItem);
        })

        //count, sum
        const summaryData= []
        adminLocationsData.forEach(locData => {            
            let summaryItem = summaryData.find(s => s.label == locData.label)
            if (!summaryItem) {
                summaryItem = { label: locData.label, value: aggregationFormula == 'COUNT' ? 1 : (locData.value ? locData.value : 0) }
                summaryData.push(summaryItem)
            } else {
                if (aggregationFormula == 'COUNT') {
                    ++summaryItem.value
                } else if (aggregationFormula == 'SUM') {
                    summaryItem.value += locData.value
                }
            }
        })
        
        transformedData.pointsData = adminLocationsData
        transformedData.locationsData = summaryData        
        transformedData.nationalData.value = 0;
    }

    return React.Children.map(children, child => React.cloneElement(child, { transformedData: transformedData, appliedFilters: data.appliedFilters }))
}

const defaultMap = (props) => {
    const { children, data, multipleMeasures } = props;

    const transformedData = {
        locationsData: [],
        nationalData: {},
        measures: [],
        measureLabelMap: {}
    }

    const indexOfValueColumn = data.meta.fields.findIndex((f, i) => {
        return i != 0 && !f.startsWith('_');
    })

    if (data && data.data && data.meta.fields && data.meta.fields.length >= 2) {
        data.data.forEach(item => {
            const newItem = {
                label: item[data.meta.fields[0]],
                value: item[data.meta.fields[indexOfValueColumn]],
                measure: data.meta.fields[indexOfValueColumn]
            }
            const variables = {}
            if (multipleMeasures && !transformedData.measures.includes(data.meta.fields[indexOfValueColumn])) {
                transformedData.measures.push(data.meta.fields[indexOfValueColumn])
            }

            if (data.meta.fields.length > indexOfValueColumn) {                
                newItem.children = []
                for (let i = indexOfValueColumn + 1; i <= data.meta.fields.length; i++) {
                    const columnName = data.meta.fields[i]
                    const value = item[data.meta.fields[i]]
                    
                    if (columnName) {
                        if (columnName.trim().startsWith("_")) {
                            variables[columnName] = value;
                        } else {
                            //if (value != null) {
                                if (multipleMeasures) {
                                    const measureData = { label: item[data.meta.fields[0]], value: value, measure: data.meta.fields[i] }
                                    measureData.variables = variables;
                                    transformedData.locationsData.push(measureData);
                                    if (!transformedData.measures.includes(data.meta.fields[i])) {
                                        transformedData.measures.push(data.meta.fields[i])
                                    }
                                } else {
                                    newItem.children.push({ label: data.meta.fields[i], value: value });
                                }
                           // }
                        }
                    }
                }
            }

            newItem.variables = variables;
            transformedData.locationsData.push(newItem);
        })

        transformedData.nationalData.value = 0;
    }

    return React.Children.map(children, child => React.cloneElement(child, { transformedData: transformedData, appliedFilters: data.appliedFilters }))
}

export default MapCSVDataFrame;