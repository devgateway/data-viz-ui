import React from 'react';
import { DataFrameProps } from './types';


const MapDataFrame: React.FC<DataFrameProps> = ({children, data, measures, customMeasureLabels }) => {
    
    const transformedData: any  = {
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

    return React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<{ transformedData?: any }>, { transformedData: transformedData });
        }
        return child; // Return unchanged if not a valid React element
    });
}

export default MapDataFrame;