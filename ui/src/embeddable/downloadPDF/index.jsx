import React, {useRef, useState} from 'react';
import "jspdf/dist/polyfills.es.js";
import {Button, Container} from "semantic-ui-react";

const DownloadableContent = React.forwardRef((props, ref) => (
    <div id="divIdToPrint" ref={ref}>{props.children}</div>
));
const DownloadPdf = (props) => {
    const componentRef = useRef();
    const [loading,setLoading]=useState(false)
    const {
        childContent,
        "data-height": height,
        "data-button-label": buttonLabel = "Download PDF",
        "data-file-label": fileName,
        "data-url": url,
        editing,

    } = props
    const download = () => {
        setLoading(true)
        fetch("/pdf/" + url).then(response => response.blob())
            .then(blob => {

                var url = window.URL.createObjectURL(blob);
                var a = document.createElement('a');
                a.href = url;
                a.download = fileName;
                document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
                a.click();
                setLoading(false)
                a.remove();  //afterwards we remove the element again
            });

    }
    return (
        <Container className={`viz download ${editing ? 'editing' : ''}`} fluid={true}>
            <React.Fragment>
                <div className='downloadPdf'>
                   <Button loading={loading} className={"download"} onClick={download}>{buttonLabel}</Button>
                </div>
            </React.Fragment>
        </Container>
    )

}
export default DownloadPdf