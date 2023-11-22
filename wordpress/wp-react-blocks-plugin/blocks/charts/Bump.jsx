import {PanelBody, PanelRow, SelectControl} from '@wordpress/components';
import {__} from '@wordpress/i18n';
import ChartColors from "../commons/ChartColors.jsx"
import ChartLegends from '../commons/ChartLegends.jsx'
import AxisConfig from './AxisConfig.jsx'

const BumpOptions = (props) => {
    const {setAttributes, attributes: {groupMode, colorBy}} = props;
    return [

        <PanelBody initialOpen={false}   title={__("Bump Options")}>
            <ChartColors {...props}></ChartColors>
            <ChartLegends {...props}></ChartLegends>
            {colorBy === "id" && <AxisConfig {...props}></AxisConfig>}


        </PanelBody>

    ]
}

export default BumpOptions