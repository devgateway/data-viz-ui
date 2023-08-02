import React, {useEffect, useRef, useState} from 'react'
import {Container, Grid, Label} from 'semantic-ui-react'
import {MediaConsumer, MediaProvider, PostConsumer, PostIcon, PostProvider, utils} from "@devgateway/wp-react-lib";
import PostIntro from "../connected-templates/PostIntro";
import {Parallax, ParallaxLayer} from '@react-spring/parallax'
import PostContent from "../connected-templates/PostContent";
import {parse} from "../utils/parseUtils";
import asyncComponent from "../../AsyncComponent";
import * as external from "@devgateway/embedded";

const Root = (props) => {

    debugger
    const [random, setRandomStore] = useState(Math.random() * (99999 - 1) + 1);
    const {
        "data-width": width,
        "data-height": height,
        "data-name": name, parent, editing, component, unique
    } = props

    let C2 = () => {
        return <div>Not found</div>
    }
    if (external[name]) {
        C2 = external[name]
    } else {
        C2 = asyncComponent(() => import('../' + name + '/'))
    }
    return (<div style={{width: '100%', height: height + "px"}} className={"parallax-container"}>

        <C2 {...props} />
    </div>)

}


export default Root
