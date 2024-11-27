import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import BlockSave from "./BlockSave";
import BlockEdit from "./BlockEdit";
import {Generic} from "../../../../front/wordpress/wp-react-blocks-plugin/blocks/icons/"


registerBlockType(process.env.BLOCKS_NS + '/super-set-chart',
    {
        title: __('Superset Chart', "dg"),
        icon: "image-filter",
        category: 'dc-react-lib-blocks',
        attributes: {
            height: {
                type: 'number',
                default: 400
            },
            group: {
                type: 'string',
                default: 'none',
            },
            selectedChartId: {
                type: 'string',
                default: 'none'
            },
            selectedChartData:{
                type: 'Object',
                default: {}
            }          
        },
        edit: BlockEdit,
        save: BlockSave
    }
)
;
