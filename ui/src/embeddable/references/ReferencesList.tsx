import React, { useState, useEffect } from "react";
import { Container, Grid, SemanticWIDTHS, GridColumn, GridRow } from 'semantic-ui-react';
import { connect } from "react-redux";
import { useWindowDimensionsAndDevice } from "@/lib/hooks/window-dimensions";


const Reference = ({ content, link, index }) => {
    return <GridColumn>
        <GridRow id={"ref_" + index} className={"reference"}>
            <div className={"index"}>{index}</div>
            <div className={"content"} >{content}</div>
            <div className={"link"}>
                <a href={link} target="_blank">{link}</a>
            </div>
        </GridRow>
    </GridColumn>
}

const decodeContent = (content) => {
    let result;
    try {
        result = decodeURIComponent(content)
    } catch (err) {
        result = content
        console.error('error occurred decoding content:' + content)
    }
    return result
}
const References = ({
    random,
    editing = false,
    "data-columns": cols = 3,
    "data-height": height = 1000,
    "data-flex-direction": flexDirection = "row"
}) => {

    const { width: deviceWidth } = useWindowDimensionsAndDevice();
    const [orientation, setOrientation] = useState(window.innerWidth > window.innerHeight ? 'landscape' : 'portrait');
    const [isMobileOrTablet, setIsMobileOrTablet] = useState(deviceWidth < 1380);

    useEffect(() => {
        const handleResize = () => {
            setOrientation(window.innerWidth > window.innerHeight ? 'landscape' : 'portrait');
            setIsMobileOrTablet(window.innerWidth < 1380);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const style: { flexDirection: string; height?: string } = { flexDirection }
    const [elements, setElements] = useState<NodeListOf<Element> | []>([])

    if (flexDirection == "column" && cols > 1) {
        style.height = height + "px"
    }

    useEffect(() => {
        try {
            //delay to allow all references to be loaded
            setTimeout(() => {
                const el = window.parent.document.querySelectorAll("div.wp-reference")
                setElements(el)
            }, 3000)
        } catch (err) { /* empty */ }
    })

    const items = elements ? new Array(...elements) : []
    const unique: Element[] = []
    items.forEach(item => {
        const found = unique.find(it => it.getAttribute("data-index") == item.getAttribute("data-index"))
        if (!found) {
            unique.push(item)
        }
    })

    return (<Container className={"references list"}>
        {editing &&
            <div className="edit-mode-message"><p>No preview available. The full list of references will be displayed in the live page.</p></div>
        }
        <Grid fluid stretched={isMobileOrTablet ? true : false} columns={isMobileOrTablet ? 1 : cols as SemanticWIDTHS} style={style}>
            {/* <GridRow style={style}> */}
            {unique.sort((a, b) => {
                const indexA = a.getAttribute("data-index") ?? ""; // Handle null case
                const indexB = b.getAttribute("data-index") ?? ""; // Handle null case
                const numA = indexA ? parseInt(indexA) : Number.POSITIVE_INFINITY;
                const numB = indexB ? parseInt(indexB) : Number.POSITIVE_INFINITY;
                return numA - numB;
            }).map(i => {
                const index = i.getAttribute("data-index") ?? ""; // Handle null case
                return <Reference key={index} index={index}
                    content={decodeContent(i.getAttribute("data-description"))}
                    link={i.getAttribute("data-link")}></Reference>
            })}
            {/* </GridRow> */}

        </Grid>

    </Container>)
}


const mapStateToProps = (state, ownProps) => {
    return { random: state.getIn(["embeddable", "random"]) }
}

const mapActionCreators = {};
export default connect(mapStateToProps, mapActionCreators)(References)