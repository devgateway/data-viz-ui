import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import BlockSave from "./BlockSave";
import BlockEdit from "./BlockEdit";
import Generic from "../icons";

registerBlockType(process.env.BLOCKS_NS + '/menu',
    {
        title: __('Inline Menu'),
        icon: Generic,
        category: process.env.BLOCKS_CATEGORY,
        apiVersion: 2,
        attributes: {
            name: {
                type: 'String',
                default: ""
            },
            showTitle: {
                type: 'Boolean',
                default: true
            },
            showIcon: {
                type: 'Boolean',
                default: true
            },
            height:{
                type: 'Numeric',
                default: 500
            }
        },
        edit: BlockEdit,
        save: BlockSave,
    }
)
;
