import React, { useState } from 'react'

const Root = (props) => {
    const [random, setRandomStore] = useState(Math.random() * (99999 - 1) + 1);
    const {
        "data-width": width,
        "data-height": height,
        "data-name": name, parent, editing, component, unique
    } = props

    let C2: React.FC = () => {
        return <div>Not found</div>
    }

    C2 = React.lazy(() => import('../' + name + '/'))

    return (<div style={{width: '100%', height: height + "px"}} className={"parallax-container"}>

        {/* <React.Suspense> */}
            <C2 {...props} />
        {/* </React.Suspense> */}
    </div>)

}


export default Root