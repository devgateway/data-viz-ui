import React from 'react';

const MapDataFrame = (props) => {
    const {data, measures, customMeasureLabels, children, source} = props;

    const transformedData = {
        locationsData: [],
        nationalData: {},
        measureLabelMap: {}
    }

    // Detect which API format we're using
    const isGenericAPI = data.metadata && data.metadata.measures && Array.isArray(data.metadata.measures);
    const isSupersetAPI = data.children && data.children[0] && data.children[0].children; // Has nested children

    // Extract metadata - works for both formats
    const metadata = data.metadata || {};

    // Standard properties to exclude from variables
    const standardProps = ['value', 'count', 'type', 'children', 'label', 'measure'];

    // Extract all dynamic fields as variables
    const extractVariables = (item) => {
        const variables = {};
        Object.keys(item).forEach(key => {
            if (!standardProps.includes(key)) {
                variables[key] = item[key];
            }
        });
        
        if (item.type && item.value !== undefined) {
            variables[item.type] = item.value;
        }
        return variables;
    };

    // Build measure label map from metadata
    if (metadata.measures) {
        metadata.measures.forEach(m => {
            if (customMeasureLabels && customMeasureLabels[m.value] && customMeasureLabels[m.value].hasCustomLabel && customMeasureLabels[m.value].customLabel) {
                transformedData.measureLabelMap[m.value] = customMeasureLabels[m.value].customLabel;
            } else {
                transformedData.measureLabelMap[m.value] = m.label;
            }
        })
    }

    const measuresArray = measures.split(",");

    if (data && data.children) {
        data.children.forEach(item => {
            measuresArray.forEach(measure => {
                const newItem = {
                    ...item,
                    label: item.value,
                    value: item[measure],
                    measure: measure,
                    variables: extractVariables(item)  // Dynamic fields for both formats
                }

                // Handle nested children (Superset format)
                if (item.children && Array.isArray(item.children)) {
                    newItem.children = []
                    item.children.forEach(child => {
                        newItem.children.push({
                            ...child, 
                            label: child.value, 
                            value: child[measure],
                            variables: extractVariables(child)
                        });
                    })
                }

                transformedData.locationsData.push(newItem);
            })
        })
        
        transformedData.measures = measuresArray.length > 1 ? measuresArray : null;
        
        // Handle national data - works for both formats
        transformedData.nationalData.value = data[measures] || data[measuresArray[0]];
    }

    return React.Children.map(children, child => React.cloneElement(child, {transformedData: {
        ...transformedData, 
        types: metadata.types ? metadata.types : []
    }}))
}

export default MapDataFrame;