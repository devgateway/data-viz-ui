import React, { useState } from 'react'
import * as external from "@devgateway/customizer";

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
    if (external[name]) {
        C2 = external[name]
    } else {
        C2 = React.lazy(() => import('../' + name + '/'))
    }
    return (<div style={{width: '100%', height: height + "px"}} className={"parallax-container"}>

        <React.Suspense fallback={<div>Loading...</div>}>
            <C2 {...props} />
        </React.Suspense>
    </div>)

}


export default Root
