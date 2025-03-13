import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import BlockSave from "./BlockSave";
import BlockEdit from "./BlockEdit";

registerBlockType(process.env.BLOCKS_NS + '/data-filters-apply',
    {
        title: __('Filters Apply Button', 'wp-react-blocks-plugin'),
        category: process.env.BLOCKS_CATEGORY,
        apiVersion: 2,
        attributes: {
            group: {
                type: 'String',
                default: "default"
            },
            app: {
                type: 'String',
                default: "csv"
            },
            resetLabel: {
                type: 'String',
                default: "Apply Filters"
            }
        },
        edit: BlockEdit,
        save: BlockSave,
    }
);
