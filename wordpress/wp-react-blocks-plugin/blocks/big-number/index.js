import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import BlockSave from "./BlockSave";
import BlockEdit from "./BlockEdit";
import {Generic} from '../icons/index.js'

registerBlockType(process.env.BLOCKS_NS + '/bignumber',
    {
        title: __('Big Number'),
        icon: Generic,
        category: process.env.BLOCKS_CATEGORY,
        apiVersion: 2,
        attributes: {
            type: {
                type: 'string',
                default: "big-number",
            },
            group: {
                type: 'String',
                default: 'default',
            },
            panelStatus: {
                type: "Object",
                default: {}
            },
            height: {
                type: 'number',
                default: 120,
            },
            app: {
                type: 'String',
                default: "csv"
            },
            csv: {
                type: "String",
                default: "Amount \n20000"
            },    
            params: {
                type: Object,
                default: {}
            },
            format: {
                type: Object,
                default: {
                    "style": "decimal",
                    "minimumFractionDigits": 0,
                    "maximumFractionDigits": 0,
                    "currency": "USD"
                }
            },
            measures: {
                type: "Array",
                default: []
            },
            _measures: {},
            filters: {
                type: "Array",
                default: []
            },
            dvzProxyDatasetId: {
                type: 'String',
                default: ""
            },
            types: {
                type: "Array",
                default: [
                  {label: 'Big Number', value: 'big-number', supports: {singleMeasure: true, singleDimension: false}}
                ]
            },
            label: {
                type: 'String',
                default: "# of animals"
            },
            numberFontSize: {
                type: 'Numeric',
                default: 24
            },
            numberColor: {
                type: 'string',
                default: "#5a5d68",
            },
            labelFontSize: {
                type: 'Numeric',
                default: 14
            },
            labelColor: {
                type: 'string',
                default: "#5a5d68",
            },
        },

        edit: BlockEdit,
        save: BlockSave,
    }
);

