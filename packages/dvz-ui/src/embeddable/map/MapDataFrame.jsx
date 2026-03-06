import React from 'react';

const MapDataFrame = (props) => {
    const {data, measures, customMeasureLabels, children, source} = props;

    const transformedData = {
        locationsData: [],
        nationalData: {},
        measureLabelMap: {}
    }

    if (data.metadata && data.metadata.measures) {
        data.metadata.measures.forEach(m => {
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
                    measure: measure
                }


                if (item.children) {
                    newItem.children = []
                    item.children.forEach(child => {
                        newItem.children.push({...child, label: child.value, value: child[measure]});
                    })
                }

                transformedData.locationsData.push(newItem);
            })
        })
        transformedData.measures = measuresArray.length > 1 ? measuresArray : null;
        transformedData.nationalData.value = data[measures];
    }

    return React.Children.map(children, child => React.cloneElement(child, {transformedData: {
        ...transformedData, types: data.metadata ? data.metadata.types : []
    }}))
}

export default MapDataFrame;
