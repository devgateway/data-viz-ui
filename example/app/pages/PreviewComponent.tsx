import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router';
import { getComponentByNameIgnoreCase } from '@devgateway/dvz-ui-react/embeddable';
import { Container, Segment } from 'semantic-ui-react';
import { SettingsConsumer } from '@devgateway/wp-react-lib';


const PreviewComponentParameterParser = () => {
    const urlParams = useParams();
    const location = useLocation();

    const [UIComponent] = useState(() => getComponentByNameIgnoreCase(urlParams.name ?? ''));


    let [params, setParams] = useSearchParams();
    const readMessage = (event: MessageEvent) => {
        const data = event.data
        if (data.messageType && data.messageType == 'component-attributes') {

            const newParams = new URLSearchParams(params);
            Object.keys(data).forEach(k => {
                const key = "data-" + k.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
                const value = typeof data[k] === 'object' ? JSON.stringify(data[k]) : data[k];
                newParams.set(key, value);
            });
            setParams(newParams);
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
    return (
        <div>
            <Container fluid={true} className={"editing"}>
                {/* @ts-ignore */}
                {UIComponent ? <UIComponent  {...params} editing={true} /> :
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

export default PreviewComponent