import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import BlockSave from "./BlockSave";
import BlockEdit from "./BlockEdit";
import Generic from "../icons";

registerBlockType(process.env.BLOCKS_NS + '/new-d3-map',
    {
        title: __('D3 Map'),
        icon: Generic,
        category: process.env.BLOCKS_CATEGORY,
        apiVersion: 2,
        attributes: {
            height: {
                type: 'Numeric',
                default: 500
            },
            group: {
                type: 'string',
                default: 'default',
            },

            layers: {
                type: "Array",
                default: []
            },
            panelStatus: {
                type: "Object",
                default: {}
            },


        },
        edit: BlockEdit,
        save: BlockSave,
    }
);
