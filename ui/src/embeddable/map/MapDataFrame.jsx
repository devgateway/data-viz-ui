import React from 'react';

const MapDataFrame = ({children, data, measures, customMeasureLabels}) => {
    debugger;
    const transformedData = {
        locationsData: [],
        nationalData: {},
        measureLabelMap: {}
    }

    data.metadata.measures.forEach(m => {
        if (customMeasureLabels && customMeasureLabels[m.value] && customMeasureLabels[m.value].hasCustomLabel && customMeasureLabels[m.value].customLabel) {
            transformedData.measureLabelMap[m.value] = customMeasureLabels[m.value].customLabel;
        } else {

            transformedData.measureLabelMap[m.value] = m.label;
        }


    })

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
    debugger;
    return React.Children.map(children, child => React.cloneElement(child, {transformedData: transformedData}))
}

export default MapDataFrame;