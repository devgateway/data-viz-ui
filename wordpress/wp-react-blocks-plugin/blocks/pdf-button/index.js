import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import BlockSave from "./BlockSave";
import BlockEdit from "./BlockEdit";
import {Generic} from '../icons'

registerBlockType(process.env.BLOCKS_NS + 'tcdi-components/pdf-button',
    {
        title: __('PDF Export Button', 'tcdi-components'),
        icon: Generic,
        category: process.env.BLOCKS_CATEGORY,
        attributes: {
            buttonLabel: {
                type: 'string',
                default: "Download Prevalence Factsheet"
            },
            height: {
                type: 'Numeric',
                default: 200,
            },
            pdfLabel: {
                type: 'string',
                default: 'export.pdf'
            },
            url: {
                type: 'string',
            },

            post: {
                type: 'boolean',
                default: true
            },
            page: {
                type: 'boolean',
                default: true
            },


        }
        ,
        edit: BlockEdit,
        save: BlockSave,
    }
)
;
