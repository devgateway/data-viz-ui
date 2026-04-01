import React from 'react'
import { DataContext } from './DataContext'

const DataConsumer = (props) => {


    return (
        <DataContext.Consumer>
            {(data) => {
                return data && <React.Fragment>
                    {React.Children.map(props.children, (child => {
                        return React.isValidElement(child)
                            ? React.cloneElement(child, { data })
                            : child
                    }))}
                </React.Fragment>
            }}
        </DataContext.Consumer>
    )
}


export default DataConsumer
