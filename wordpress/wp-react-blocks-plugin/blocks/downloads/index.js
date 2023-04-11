import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import BlockSave from "./BlockSave";
import BlockEdit from "./BlockEdit";
import {Generic} from '../icons'

registerBlockType(process.env.BLOCKS_NS + '/download',
    {
        title: __('Download'),
        icon: Generic,
        category: process.env.BLOCKS_CATEGORY,
        attributes: {
            defaultFormat: {
                type: 'string',
                default: 'PNG'
            },
            title: {
                type: 'string',
                default: "Set your chart download file type"
            },
            useTitle: {
                type: 'Boolean',
                default: false,
            },
            style: {
                type: 'String',
                default: "heavy",
            },
            sectionTitle: {
                type: 'string',
                default: ""
            },

            buttonLabel: {
                type: 'string',
                default: "Download"
            },
            pngLabel: {
                type: 'string',
                default: 'export.png'
            },
            jpgLabel: {
                type: 'string',
                default: 'export.jpg'
            },
            pngText: {
                type: 'string',
                default: 'Download PNG'
            },
            jpgText: {
                type: 'string',
                default: 'Download JPG'
            },
            checkPng: {
                type: 'boolean',
                default: true
            },
            checkJpg: {
                type: 'boolean',
                default: false
            },
            height: {
                type: 'Numeric',
                default: 200,
            },
            fontSize: {
                type: 'string',
                default: '24px',
            },
            fontClass: {
                type: 'string',
                default: '24px',
            },
            color: {
                type: 'string',
                default: '24px',
            },
            downloadTooltip: {
                type: 'string',
                default: "Click to select download format"
            },
            tooltip: {
                type: 'string',
                default: "Click to select download format"
            },
            includeSourceURL: {
                type: 'boolean',
                default: false
            },
            sourceURLMarginLeft: {
                type: 'Numeric',
                default: 70
            },
            sourceURLMarginTop: {
                type: 'Numeric',
                default: 10
            },
            sourceURLFontSize: {
                type: 'Numeric',
                default: 18,
            }
        },
        edit: BlockEdit,
        save: BlockSave,
    }
);