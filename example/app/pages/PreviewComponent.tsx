import React, { useState, useEffect,useMemo } from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router';
import { getComponentByNameIgnoreCase } from '@devgateway/dvz-ui-react';
import { Container, Segment } from 'semantic-ui-react';
import { SettingsConsumer } from '@devgateway/wp-react-lib';


const PreviewComponentParameterParser = () => {
    const urlParams = useParams();
    const location = useLocation();

    const [UIComponent] = useState(() => getComponentByNameIgnoreCase(urlParams.name ?? ''));

    let [params, setParams] = useSearchParams();

    //eslint-disable-next-line
    debugger;
    const readMessage = (event: MessageEvent) => {
        console.log("-------------------------------reading message ----------------------------------------")
        const data = event.data
        if (data.messageType && data.messageType == 'component-attributes') {
            const newPrams = {...params}
            Object.keys(data).forEach(k => {
                // @ts-ignore
                newPrams["data-" + k.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()] = typeof data[k] == 'object' ? JSON.stringify(data[k]) : data[k]
            })
            setParams(newPrams)
        }
    };


    useEffect(() => {
        window.addEventListener("message", readMessage, false);
        if (window.parent) {
            window.parent.postMessage({ type: "componentReady", value: true }, "*")
        }
        if (window.top) {
            window.top.postMessage({ type: "componentReady", value: true }, "*")
        }
        return () => {
            window.removeEventListener('message', readMessage);
        };
    }, []);


    const paramProps = React.useMemo(() => Object.fromEntries(params.entries()), [params]);

    return (
        <div>
            <Container fluid={true} className={"editing"}>
                {/* @ts-ignore */}
                {UIComponent ? <UIComponent  {...paramProps} editing={true} /> :
                    <Segment.Group color={"red"} textAlign={"center"}><h1>Wrong Component Name</h1></Segment.Group>}
            </Container>

        </div>

    )

}


const PreviewComponent = () => {
    return (
        <SettingsConsumer>
            <PreviewComponentParameterParser />
        </SettingsConsumer>
    )
}

export default PreviewComponent;
