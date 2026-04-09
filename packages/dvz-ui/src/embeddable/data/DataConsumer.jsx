import React from 'react'
import { DataContext } from './DataContext'

// Exported hook so functional child components can consume chart data directly
// without going through cloneElement, enabling them to be wrapped in React.memo.
export const useDataContext = () => React.useContext(DataContext)

const DataConsumer = ({ children }) => {
    const data = React.useContext(DataContext)

    if (!data) return null

    return (
        <React.Fragment>
            {React.Children.map(children, child =>
                React.cloneElement(child, { data })
            )}
        </React.Fragment>
    )
}

// React.memo prevents DataConsumer from re-rendering when its parent re-renders
// for unrelated reasons (e.g. loading state changes) and children/data are the same.
export default React.memo(DataConsumer)
