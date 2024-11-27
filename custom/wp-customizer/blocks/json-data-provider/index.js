import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import BlockSave from "./BlockSave";
import BlockEdit from "./BlockEdit";
import {Generic} from "../../../../front/wordpress/wp-react-blocks-plugin/blocks/icons/"


registerBlockType(process.env.BLOCKS_NS + '/json-data-provider',
    {
        title: __('Json Data Provider', "dg"),
        icon: "database",
        category: 'dc-react-lib-blocks',
        attributes: {
            panelStatus: {
                type: "Object",
                default: {}
            },
            file: {
                type: 'string',
                default: "none",
            },
            header: {
                type: 'string',
                default: "Existing Model ",
            },
            message: {
                type: 'string',
                default: "A previous model was found, do you want to restore it now?",
            },
            useAutoRestore: {
                type: 'boolean',
                default: false

            },
            sessionTimeOut: {
                type: 'number',
                default: 4,
            },
            group: {
                type: 'string',
                default: 'default',
            },
        },

        edit: BlockEdit,
        save: BlockSave
    }
)
;
