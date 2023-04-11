import {
    getColorClassName
} from '@wordpress/block-editor';

const SaveComponent = (props) => {
    const {setAttributes} = props;
    const {
        customBackgroundColor,
        backgroundColor,
        width,
        height,
        alignment
    } = props.attributes;

    const divClass = getColorClassName('background-color', backgroundColor);

    const divStyles = {
        "background-color": customBackgroundColor,
        "text-align": alignment,
        "margin": 'auto'
    };
    return (<div className={divClass} style={divStyles}>
            <div {...props.attributes} className={"tcdi-component"} data-component={"showCaseForm"}></div>
        </div>
    );
}

export default SaveComponent