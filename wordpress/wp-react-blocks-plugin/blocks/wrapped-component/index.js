import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import BlockSave from "./BlockSave";
import BlockEdit from "./BlockEdit";
import {Generic} from "../icons";


registerBlockType(process.env.BLOCKS_NS + '/wrapped-component',
    {
        title: __('Wrapped Component', "dg"),
        icon: Generic,
        category: process.env.BLOCKS_CATEGORY,
        attributes: {
            panelStatus: {
                type: "Object",
                default: {}
            },
            name: {
                type: 'string',
                default: "none",
            },
            attr: {
                type: 'array',
                default: [],

            },
            height: {
                type: 'Numeric',
                default: 500,
            },
        },

        edit: BlockEdit,
        save: BlockSave
    }
)
;
