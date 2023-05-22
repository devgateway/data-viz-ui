import {PanelBody, PanelRow} from "@wordpress/components";

export class LayerObject {
    id = Date.now();
    name = 'New Layer'

    app = "csv"
    dimension1 = "none"
    dimension2 = "none"
    measures = []

    filters = []

    csv = ""

    file = 'none'
    color = '#000000'
    opacity = 1
    type = 'base' //base layer user will select only a file
    //type:'shape', //shape layer user will select file and data source
    //type:'data', //will select data source and symbols + symbols configuration
    constructor() {

    }
}


export default LayerObject