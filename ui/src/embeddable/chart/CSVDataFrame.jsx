import React from "react";


const LineData = ({children, data}) => {
    const {data: json, meta: {fields}} = data
    const index = fields[0]
    const keys = fields.slice(1).filter(f => !f.startsWith("_"))

    const chartData = keys.map(k => {
        const row = {}
        row["id"] = k
        row["data"] = json.map(j => {
            const variables = {}
            Object.keys(j).forEach(k => {
                variables[k] = j[k]
            })
            return {x: j[fields[0]], y: j[k], variables: {...variables, field: k}}
        })

        return row;
    })

    /*
    const chartData = json.map(j => {
        const row = {}
        const variables={}

        row["id"] = j[fields[1]]
        row["data"] = fields.slice(1).filter(f=>!f.startsWith("_")).map(f => {
            Object.keys(j).forEach(k => {
                variables[k] = j[k]
            })
            return {"x": f, "y": j[f],variables:{...variables,field:f}}
        })

        return row
    })
*/

    const options = {
        indexBy: "id",
        keys: keys,
        data: chartData
    }

    return React.Children.map(children, child => React.cloneElement(child, {options}))
}
const PieData = ({children, data}) => {

    const {data: json, meta: {fields}} = data
    const index = fields[0]
    const keys = data.data.map(d => d.ID)

    const chartData = json.map(j => {
        const row = {}
        const variables = {}
        Object.keys(j).forEach(k => {
            variables[k] = j[k]
        })
        variables["field"] = fields[1]
        row["variables"] = variables
        row["id"] = j[fields[0]]
        row["label"] = j[fields[0]]
        row["value"] = j[fields[1]]
        return row
    })

    const options = {
        keys,
        indexBy: "id",
        data: chartData
    }
    return React.Children.map(children, child => React.cloneElement(child, {options}))
}
const BumpData = ({children, data}) => {
    const {data: json, meta: {fields}} = data
    const index = fields[0]
    const keys = fields.slice(1).filter(f => !f.startsWith("_"))


    const chartData = json.map(j => {
        const row = {}
        const variables = {}
        Object.keys(j).forEach(k => {
            variables[k] = j[k]
        })

        row["id"] = j[fields[0]]
        row["data"] = fields.slice(1).filter(f => !f.startsWith("_")).map(f => {
            return {"x": f, "y": j[f]}
        })

        return row
    })


    const options = {
        data: chartData
    }
    return React.Children.map(children, child => React.cloneElement(child, {options}))
}
const BarData = ({children, data, measures}) => {
    const {data: json, meta: {fields}} = data

    
    const index = fields[0]
    const keys = measures && measures.length > 0 ? measures : fields.slice(1).filter(f => !f.startsWith("_"))

    const options = {
        indexBy: index,
        keys: keys,
        data: json
    }
    return React.Children.map(children, child => React.cloneElement(child, {options}))
}

const CSVDataFrame = ({children, data, keys, type, measures}) => {


    

    if (type == 'bar') {
        return <BarData data={data} keys={keys} measures={measures}>{children}</BarData>
    }
    if (type == 'line') {
        return <LineData data={data} keys={keys} measures={measures}>{children}</LineData>
    }

    if (type == 'bump') {
        return <LineData data={data} keys={keys} measures={measures}>{children}</LineData>
    }
    if (type == 'pie') {
        return <PieData data={data} keys={keys} measures={measures}>{children}</PieData>
    }
}

export default CSVDataFrame;