import {AnglePickerControl, PanelBody, PanelRow, SelectControl} from '@wordpress/components';
import {__} from '@wordpress/i18n';
import ChartColors from "../commons/ChartColors.jsx"
import ChartLegends from "../commons/ChartLegends.jsx";
import Format from "./Format.jsx";

const PieOptions = (props) => {
    const {setAttributes, attributes: {figure}} = props;
    return [<PanelBody initialOpen={false}   title={__("Inf Graphic Options")}>

        <PanelRow>
            <SelectControl
                label={__('Figure')}
                value={[figure]} // e.g: value = [ 'a', 'c' ]
                onChange={(value) => {
                    setAttributes({figure: value})
                }}
                options={[
                    {label: 'Male', value: 'male'},
                    {label: 'Female', value: 'female'},
                ]}
            />
        </PanelRow>

        <ChartColors {...props}></ChartColors>

        <Format {...props}></Format>
    </PanelBody>]
}

export default PieOptions