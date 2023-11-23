import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import BlockSave from "./BlockSave";
import BlockEdit from "./BlockEdit";
import {Generic} from '../icons/index.js'

registerBlockType(process.env.BLOCKS_NS + '/sankeychart',
    {
        title: __('Sankey Chart'),
        icon: Generic,
        category: process.env.BLOCKS_CATEGORY,
        apiVersion: 2,
        attributes: {
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
                default: 500,
            },
            scheme: {
                type: 'string',
                default: 'nivo'
            },
            colorBy: {
                type: 'String',
                default: 'index'
            },
            dimension1: {
                type: 'String',
                default: 'none'
            },
            dimension2: {
                type: 'String',
                default: 'none'
            },
            dimension3: {
                type: 'String',
                default: 'none'
            },
            legendPosition: {
                type: 'String',
                default: "top"
            },
            marginLeft: {
                type: 'Numeric',
                default: 50
            },
            marginTop: {
                type: 'Numeric',
                default: 25
            },
            marginBottom: {
                type: 'Numeric',
                default: 25
            },
            marginRight: {
                type: 'Numeric',
                default: 25
            },
            showLegends: {
                type: 'boolean',
                default: true
            },
            legendLabel: {
                type: 'String',
                default: ''
            },
            app: {
                type: 'String',
                default: "csv"
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
            keys: {
                type: "Array",
                default: []
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
            csv: {
                type: "String",
                default: "dimension,Key1,Key2,Key3 \nIndex1,12,13,14 \nIndex2,22,23,34 \nIndex3,32,33,34"
            },
            tooltipEnableMarkdown: {
                type: 'Boolean',
                default: false
            },
            tooltipHTML: {
                type: "String",
                default: "{value}"
            },
            layout: {
                type: "String",
                default: "horizontal"
            },
            reverse: {
                type: "Boolean",
                default: false
            },
            useLabelBackground: {
                type: "Boolean",
                default: false
            },
            useCheckBoxBackground: {
                type: "Boolean",
                default: true
            },
            legendLabelColor: {
                type: "String",
                default: encodeURIComponent("#000000")
            },
            noDataMessage: {
                type: 'String',
                default: "No data matches your selection.",
            },
            manualColors: {
                type: 'Object',
                default: {}
            },
            tooltipEnabled: {
                type: "Boolean",
                default: true
            },
            rightLegend: {
                type: 'string',
                default: "Right Legend",
            },
            reverseLegend: {
                type: 'Boolean',
                default: false
            },
            sort: {
                type: 'string',
                default: 'auto',
            },

            nodeThickness: {
                type: "Numeric",
                default: 12
            },
            nodeOpacity: {
                type: "Numeric",
                default: 0.75
            },
            nodeHoverOpacity: {
                type: "Numeric",
                default: 1
            },
            nodeHoverOthersOpacity: {
                type: "Numeric",
                default: 0.15
            },
            nodeSpacing: {
                type: "Numeric",
                default: 12
            },
            nodeInnerPadding: {
                type: "Numeric",
                default: 0
            },
            nodeBorderWidth: {
                type: "Numeric",
                default: 1
            },
            nodeBorderRadius: {
                type: "Numeric",
                default: 1
            },
            linkOpacity: {
                type: "Numeric",
                default: 0.25
            },
            linkHoverOpacity: {
                type: "Numeric",
                default: 0.6
            },
            linkHoverOthersOpacity: {
                type: "Numeric",
                default: 0.15
            },
            linkContract: {
                type: "Numeric",
                default: 5
            },
            enableLinkGradient: {
                type: "Boolean",
                default: false
            },
            enableLabels: {
                type: "Boolean",
                default: true
            },
            labelPosition: {
                type: "String",
                default: 'inside'
            },
            labelPadding: {
                type: "Numeric",
                default: 9
            },
            useCustomLabelColor: {
                type: "Boolean",
                default: false
            },
            labelTextColor: {
                type: "String",
                default: '#999'
            },
            labelOrientation: {
                type: "String",
                default: 'horizontal'
            }
        },

        edit: BlockEdit,
        save: BlockSave,
    }
);

