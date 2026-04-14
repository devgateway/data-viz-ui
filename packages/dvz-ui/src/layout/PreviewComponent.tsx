import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useSearchParams } from 'react-router';
import { Container, Segment } from '@devgateway/ui';
import { SettingsConsumer } from '@devgateway/wp-react-lib';
import { getComponentByNameIgnoreCase } from '@/embeddable';


const PreviewComponentParameterParser = () => {
    const urlParams = useParams();
    const [searchParams] = useSearchParams();

    const [UIComponent] = useState(() => getComponentByNameIgnoreCase(urlParams.name ?? ''));

    // Use local state instead of setSearchParams to avoid triggering React Router
    // single-fetch navigation (which causes net::ERR_CONNECTION_CLOSED in nested iframes
    // because the root loader re-runs without session cookies in cross-site iframe context)
    const [paramProps, setParamProps] = useState<Record<string, string>>(
        () => Object.fromEntries(searchParams.entries())
    );

    // Ref to avoid stale closure in readMessage without re-registering the listener
    const paramPropsRef = useRef(paramProps);
    paramPropsRef.current = paramProps;

    const readMessage = useCallback((event: MessageEvent) => {
        const data = event.data;
        if (data.messageType && data.messageType === 'component-attributes') {
            const newParams: Record<string, string> = { ...paramPropsRef.current };
            Object.keys(data).forEach(k => {
                newParams["data-" + k.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()] =
                    typeof data[k] === 'object' ? JSON.stringify(data[k]) : data[k];
            });
            setParamProps(newParams);
        }
    }, []);

    useEffect(() => {
        window.addEventListener("message", readMessage, false);
        if (window.parent) {
            window.parent.postMessage({ type: "componentReady", value: true }, "*");
        }
        if (window.top) {
            window.top.postMessage({ type: "componentReady", value: true }, "*");
        }
        return () => {
            window.removeEventListener('message', readMessage);
        };
    }, [readMessage]);

    return (
        <div>
            <Container fluid={true} className={"editing"}>
                {/* @ts-ignore */}
                {UIComponent ? <UIComponent {...paramProps} editing={true} /> :
                    <div className="border-t-2 border-t-sui-red text-center p-4"><h1>Wrong Component Name</h1></div>}
            </Container>
        </div>
    );

}


const PreviewComponent = () => {
    return (
        <SettingsConsumer>
            <PreviewComponentParameterParser />
        </SettingsConsumer>
    )
}

export default PreviewComponent;
