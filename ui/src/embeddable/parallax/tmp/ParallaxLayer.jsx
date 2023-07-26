import React, {useEffect, useRef, useState} from 'react';
import {Button, Container, Dropdown, Grid, Icon} from "semantic-ui-react";
import {PostContent} from "@devgateway/wp-react-lib";
import {cloneNode, toJpeg, toPng} from "./dom-to-image";
import {saveAs} from 'file-saver';
import {ParallaxLayer} from "@react-spring/parallax";


const ParallaxLayerWrapper = (props) => {
    const componentRef = useRef();
    const {
        childContent, "data-background": background, "data-offset": offset, parent, editing, component, unique

    } = props


    return (

        <ParallaxLayer className={`viz  parallax-layer`} background={background} offset={offset} parent={parent}>
            <Container fluid={true} className={"content area"}>
                <PostContent parentUnique={props.unique}
                             post={{content: {rendered: childContent}}}></PostContent>
            </Container>
        </ParallaxLayer>


    );
};

export default ParallaxLayerWrapper;
