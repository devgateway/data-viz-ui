import React from 'react'
import {CategoriesContext} from './DataContext'

const CategoriesConsumer = (props) => {


    return (
        <CategoriesContext.Consumer>
            {(data) => {

                return data && <React.Fragment>
                    {React.Children.map(props.children, (child => {
                        return React.cloneElement(child, {...props,data} )
                    }))}
                </React.Fragment>
            }}
        </CategoriesContext.Consumer>
    )
}


export default CategoriesConsumer
