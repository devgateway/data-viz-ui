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
            icon: {
                type: 'String',
                default: ""
            },
            icon_media_id: {
                type: 'Numeric',
                default: null,
            },
            name: {
                type: 'String',
                default: ""
            },
            label: {
                type: 'String',
                default: ""
            },
            showLabels: {
                type: 'Boolean',
                default: true
            },
            showIcons: {
                type: 'Boolean',
                default: true
            },
            height: {
                type: 'Numeric',
                default: 80
            }
        },
        edit: BlockEdit,
        save: BlockSave,
    }
)
;
