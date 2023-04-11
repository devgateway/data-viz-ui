import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import BlockSave from "./BlockSave";
import BlockEdit from "./BlockEdit";
import {Generic} from "../icons";
import { withColors} from '@wordpress/block-editor';
registerBlockType(process.env.BLOCKS_NS + '/showcase',
    {
        title: __('Showcase Form',"dg"),
        icon: Generic,
        category: process.env.BLOCKS_CATEGORY,
        attributes: {
            width: {
                type: 'string',
                default: "100%",
            }
            ,
            height: {
                type: 'string',
                default: "1200px",
            }
            ,
            backgroundColor: {
                type: 'string'
            },
            alignment: {type: 'string', default: 'center'},
            organization: {type: 'string', default: 'Organization'},
            name: {type: 'string', default: 'Name'},
            email: {type: 'string', default: 'Email'},
            country: {
                type: 'string', default: 'Country'
            },
            message: {type: 'string', default: 'Please write a message'},
            submitLabel: {type: 'string', default: 'Send'},
            resetLabel: {type: 'string', default: 'Reset'},
            successMessage: {type: 'string', default: "Thanks for submitting"},
            failureMessage: {type: 'string', default: "Something didn't go well, please try again later"},


        },
        edit: withColors('backgroundColor', {textColor: 'color'})(BlockEdit),
        save: BlockSave
    }
)
;
