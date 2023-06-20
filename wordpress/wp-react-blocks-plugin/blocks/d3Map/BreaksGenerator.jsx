import {Button, PanelRow, TextControl} from "@wordpress/components";
import * as ss from "simple-statistics"

const BreaksGenerator = (props) => {

    
    console.log(ss.jenks([1, 2, 3, 4, 5, 6, 7, 8, 9], 3))

    return <>
        <PanelRow>
            <Button isLink></Button>
        </PanelRow>
        <PanelRow>
            <Button isLink></Button>
            <Button isLink></Button>
        </PanelRow>
    </>
}


export default BreaksGenerator;