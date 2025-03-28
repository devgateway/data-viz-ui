import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import BlockSave from "./BlockSave";
import BlockEdit from "./BlockEdit";
import {Generic} from '../icons/index.js'

registerBlockType(process.env.BLOCKS_NS + '/bignumbertrend',
    {
        title: __('Big Number Trend'),
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
                default: 20,
            },
            app: {
                type: 'String',
                default: "csv"
            },
            dimension1: {
                type: 'String',
                default: 'none'
            },
            params: {
                type: Object,
                default: {}
            },
            format: {
                type: Object,
                default: {
                    "style": "percent",
                    "minimumFractionDigits": 1,
                    "maximumFractionDigits": 1,
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
                default: ""
            },           
            textColor: {
                type: 'string',
                default: "#a7a9ac",
            },
            bigNumberFontSize: {
                type: 'Numeric',
                default: 14
            },
            labelFontSize: {
                type: 'Numeric',
                default: 14
            },           
            percentFontSize: {
                type: 'Numeric',
                default: 14
            },                   
            showPercentageChange: {
                type: 'Boolean',
                default: false
            },
        },
        edit: BlockEdit,
        save: BlockSave
    }
);

