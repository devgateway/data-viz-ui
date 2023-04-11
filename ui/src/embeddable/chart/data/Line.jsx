import React from "react";
import {getTranslatedValue, measuresMap, typesMap} from "./Utils";

export const LineData = ({children, data, measures, locale}) => {

    const vals = []
    const {metadata} = data
    const categories = new Set()
    const mMap = measuresMap(data)
    const tMap = typesMap(data)

    
    const dimensionsMetadata = new Set()
    const measuresMetadata = new Set()

    let keys = new Set()

    const chartData = Object.keys(data)
        .filter(k => measures.indexOf(k) > -1)
        .map(k => {
            categories.add(mMap[k].label)
            measuresMetadata.add(mMap[k])
            return {
                id: getTranslatedValue(mMap[k], locale),
                label: getTranslatedValue(mMap[k], locale),
                position: mMap && mMap[k] && mMap[k].position ? mMap[k].position : 0,
                data: data && data.children ? data.children.map(d => {
                    const variables = new Object()
                    dimensionsMetadata.add(tMap[d.type])
                    variables[d.type] = getTranslatedValue(tMap[d.type].items.filter(i => i.value === d.value)[0], locale) || d.value
                    Object.keys(data).forEach(k => {
                        variables[k] = d[k]
                    })
                    vals.push([d[k]])
                    variables["value"] = d[k]


                    return {
                        x: getTranslatedValue(tMap[d.type].items.filter(i => i.value === d.value)[0], locale) || d.value,
                        y: d[k],
                        variables
                    }
                }) : []
            }
        }).sort((a, b) => {
            return a.position - b.position
        })
    
    const options = {
        indexBy: "id",
        keys: Array.from(keys),
        categories,
        data: chartData,
        dimensionsMetadata,
        measuresMetadata,
        metadata: data.metadata
    }

    return React.Children.map(children, child => React.cloneElement(child, {options}))
}
export default LineData