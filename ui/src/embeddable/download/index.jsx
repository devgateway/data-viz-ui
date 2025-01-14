import React, { useEffect, useRef, useState } from 'react';
import { Button, Container, Dropdown, Grid, Icon } from "semantic-ui-react";
import { PostContent } from "@devgateway/wp-react-lib";
import { domtoimage } from "./dom-to-image";
import { saveAs } from 'file-saver';
import getDeviceType from "../../utils/deviceType";


const isMobile = getDeviceType() === 'mobile';

const DownloadableContent = React.forwardRef((props, ref) => (
    <div ref={ref}>{props.children}</div>
));


const DownloadComponent = (props) => {
    const componentRef = useRef();
    const {
        childContent,
        "data-height": height,
        "data-button-label": buttonLabel,
        "data-png-label": pngLabel,
        "data-jpg-label": jpgLabel,
        'data-jpg-text': jpgText,
        'data-png-text': pngText,
        "data-check-png": checkPNG = 'true',
        "data-check-jpg": checkJPG = 'true',
        "data-title": title,
        "data-default-format": defaultFormat = "PNG",
        "data-use-title": useTitle = "false",
        "data-style": style = "heavy",
        "data-section-title": sectionTitle = "",
        "data-download-tooltip": tooltip = "",
        "data-include-source-url": includeSourceURL = "false",
        "data-source-urlmargin-left": sourceURLMarginLeft = isMobile ? 0: 70,
        "data-source-urlmargin-top": sourceURLMarginTop = 10,
        "data-source-urlfont-size": sourceURLFontSize = 18,
        parent,
        editing,
        component,
        unique

    } = props


    const [fileType, setFileType] = useState(defaultFormat)
    const isCheckPNG = checkPNG === 'true' || checkPNG === true
    const isCheckJPG = checkJPG === 'true' || checkJPG === true


    useEffect(() => {
        setFileType(defaultFormat)
    }, [defaultFormat])

    const handleChange = (e) => {
        setFileType(e.target.value)
    }

    function filter(node) {
        const attributes = node.attributes;
        const attributeNames = []
        if (attributes) {
            for (let i = 0; i < attributes.length; i++) {
                attributeNames.push(attributes[i].nodeName);
            }
        }

        const customAttributes = attributeNames.filter(a => a.startsWith('data-'));
        if (customAttributes.length > 0) {
            customAttributes.forEach(name => {
                node.setAttribute(name, "")
            })
        }

        if (node.classList) {
            return !node.classList.contains("ignore")
        }

        return true;
    }

    const options = { filter, bgcolor: "#FFF" }
    const save = (type) => {

        domtoimage.cloneNode(componentRef.current).then(function (node) {
            //add source url
            const addSourceURL = includeSourceURL === "true";
            let sourceURLLeftMargin = sourceURLMarginLeft;
            if(sourceURLLeftMargin > 0 && isMobile) {
                sourceURLLeftMargin = 0;
            }
            if (addSourceURL) {
                const urlNode = document.createElement('div')
                urlNode.style.marginLeft = sourceURLLeftMargin + "px"
                urlNode.style.marginTop = sourceURLMarginTop + "px"
                urlNode.style.fontSize = sourceURLFontSize + "px"

                urlNode.innerHTML = window.location.href;
                urlNode.style.maxWidth = "90%"; // Set a max width for the container
                urlNode.style.wordWrap = "break-word"; // Break lines within words if necessary
                urlNode.style.overflowWrap = "break-word"; // Ensure compatibility with other browsers
                node.appendChild(urlNode)
            }

            // TODO: Fix react compiler issue

            options.height = componentRef.current.offsetHeight + 100
            options.width = componentRef.current.offsetWidth + 100
            node.style.padding = "20px"

            if (type == "PNG") {
                domtoimage.toPng(node, options)
                    .then(function (blob) {
                        saveAs(blob, pngLabel)
                    });
            }

            if (type == "JPG") {
                domtoimage.toJpeg(node, options)
                    .then(function (blob) {
                        saveAs(blob, jpgLabel)
                    });
            }
        })
    }

    const onClickHandler = (type) => {
        if (editing) {
            alert("Not allowed when editing please preview page")
        } else {
            save(type)
        }
    }

    return (

        <Container
            className={`viz download ${style}  ${useTitle ? 'has-title' : ''}  ${isCheckPNG || isCheckJPG ? 'has-formats' : ''} ${editing ? 'editing' : ''}`}
            fluid={true}>

            <DownloadableContent ref={componentRef}>
                <Grid stackable reversed={"mobile"} className={"download-header"}>
                    {!editing && useTitle == "true" &&
                        <Grid.Column width={12}>
                            <PostContent parentUnique={props.unique}
                                post={{ content: { rendered: decodeURIComponent(sectionTitle) } }}></PostContent>

                        </Grid.Column>}
                    <Grid.Column className={editing ? "editing ignore" : "ignore"} width={(editing || useTitle != "true") ? 16 : 4}
                        textAlign={"right"}>
                        <div className={"wrapper"}>

                            <Dropdown className={"download"} data-tooltip={decodeURIComponent(tooltip)}
                                trigger={(isCheckJPG && isCheckPNG) ?
                                    <Icon name={"download"} className='download-icon'></Icon> : null}>
                                <Dropdown.Menu>
                                    {title}
                                    {(isCheckPNG == 'true' || isCheckPNG == true) ? <Dropdown.Item onClick={() => onClickHandler('PNG')}>
                                        <input type='radio' value='PNG' checked={fileType === 'PNG'}
                                            onChange={handleChange} />
                                        <label>{pngText}</label>
                                    </Dropdown.Item> : null}
                                    {(isCheckJPG == 'true' || isCheckJPG == true) ? <Dropdown.Item onClick={() => onClickHandler('JPG')}>
                                        <input type='radio' value='JPG' checked={fileType === 'JPG'}
                                            onChange={handleChange} />
                                        <label>{jpgText}</label>
                                    </Dropdown.Item> : null}
                                </Dropdown.Menu>
                            </Dropdown>

                            <Button className={"download"} onClick={() => onClickHandler(fileType)}>
                                {buttonLabel} {fileType === 'PNG' ? 'PNG' : 'JPG'}
                            </Button>

                        </div>
                    </Grid.Column>
                </Grid>
                {!editing &&
                    <Container fluid={true} className={"download area"}>
                        <PostContent parentUnique={props.unique}
                            post={{ content: { rendered: childContent } }}></PostContent>
                    </Container>
                }
            </DownloadableContent>
        </Container>

    );
};

export default DownloadComponent;
