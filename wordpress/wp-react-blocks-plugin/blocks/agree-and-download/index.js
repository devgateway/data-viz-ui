import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import BlockSave from "./BlockSave";
import BlockEdit from "./BlockEdit";
import {Generic} from '../icons'

registerBlockType(process.env.BLOCKS_NS + 'viz-components/agree-button',
    {
        title: __('Agree & Download ', 'viz-components'),
        icon: Generic,
        category: process.env.BLOCKS_CATEGORY,
        attributes: {
            post_id: {
                type: 'Numeric',
                default: -1,
            },

            post_slug: {
                type: 'string',
                default: null,
            },
            media: {
                type: 'Object',
                default: null,
            },
            download_style: {
                type: 'string',
                default: "link",
            },
            text: {
                type: 'string',
                default: "Download File",
            },
            agree: {
                type: 'string',
                default: "Agree",
            },
            cancel: {
                type: 'string',
                default: "Cancel",
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

        }
        ,
        edit: BlockEdit,
        save: BlockSave,
    }
)
;
