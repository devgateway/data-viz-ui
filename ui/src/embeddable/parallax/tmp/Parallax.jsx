import React, {useEffect, useRef, useState} from 'react';
import {Button, Container, Dropdown, Grid, Icon} from "semantic-ui-react";
import {PostContent} from "@devgateway/wp-react-lib";
import {cloneNode, toJpeg, toPng} from "./dom-to-image";
import {saveAs} from 'file-saver';
import {Parallax} from "react-scroll-parallax";


const ParallaxWrapper = (props) => {
    const componentRef = useRef();
    const {
        childContent, "data-background": background, "data-offset": offset, parent, editing, component, unique

    } = props


    return (

        <Parallax className={`viz  parallax-layer`} background={background} offset={offset} parent={parent}>
            <Container fluid={true} className={"content area"}>
                <PostContent parentUnique={props.unique}
                             post={{content: {rendered: childContent}}}></PostContent>
            </Container>
        </Parallax>


    );
};

export default ParallaxWrapper;
