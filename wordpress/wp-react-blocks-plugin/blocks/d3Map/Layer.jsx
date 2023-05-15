import {PanelBody, PanelRow} from "@wordpress/components";

export const layerPrototype     = {
    name:'New Layer',
    file:'',
    type:'Shape',
    color:'#000000',
    opacity:1,
}

const LayerSettings =(layer)=> {

    const {name,type,color,opacity} = layer

    return <PanelBody title={name}>
                <PanelRow>
                    <label>Layer Name</label>
                </PanelRow>
            </PanelBody>
}

export default LayerSettings