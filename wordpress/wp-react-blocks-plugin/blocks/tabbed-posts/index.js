import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import BlockSave from "./BlockSave";
import BlockEdit from "./BlockEdit";
import {Generic} from '../icons'

registerBlockType(process.env.BLOCKS_NS + '/tabbed-posts',
    {
        title: __('Tabbed Posts', "dg"),
        icon: Generic,
        category: process.env.BLOCKS_CATEGORY,
        attributes: {
            count: {
                type: 'Numeric',
                default: 3,
            },
            type: {
                type: 'string',
                default: "posts",
            },
            taxonomy: {
                type: 'string',
                default: "none",
            },
            categories: {
                type: 'array',
                default: [],
            },
            height: {
                type: 'Numeric',
                default: 700,
            },
            theme: {
                type: 'string',
                default: "buttons",
            },
            useLabels: {
                type: "boolean",
                default: false
            },
            showIcons: {
                type: "boolean",
                default: false
            },
            useScrolls: {
                type: "boolean",
                default: false
            },
            panelStatus: {
                type: "Object",
                default: {}
            },
            previewMode: {
                type: "string",
                default: "Desktop"
            }
        },
        edit: BlockEdit,
        save: BlockSave,
    }
)
;
