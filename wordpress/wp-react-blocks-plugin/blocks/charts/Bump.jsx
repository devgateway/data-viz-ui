import {PanelBody, PanelRow, SelectControl} from '@wordpress/components';
import {__} from '@wordpress/i18n';
import Colors from "./Colors.jsx"
import Legends from './Legends.jsx'
import AxisConfig from './AxisConfig.jsx'

const BumpOptions = (props) => {
    const {setAttributes, attributes: {groupMode, colorBy}} = props;
    return [

        <PanelBody initialOpen={false}   title={__("Bump Options")}>
            <Colors {...props}></Colors>
            <Legends {...props}></Legends>
            {colorBy === "id" && <AxisConfig {...props}></AxisConfig>}


        </PanelBody>

    ]
}

export default BumpOptions