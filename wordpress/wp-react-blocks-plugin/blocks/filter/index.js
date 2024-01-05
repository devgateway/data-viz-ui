import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import BlockSave from "./BlockSave";
import BlockEdit from "./BlockEdit";
import Generic from "../icons";

registerBlockType(process.env.BLOCKS_NS + '/filter',
    {
        title: __('Data Filter'),
        icon: Generic,
        category: process.env.BLOCKS_CATEGORY,
        apiVersion: 2,
        attributes: {

            placeHolder: {
                type: 'String',
                default: ""
            },
            type: {
                type: 'String',
                default: ""
            },
            param: {
                type: 'String',
                default: ""
            },
            app: {
                type: 'String',
                default: "csv",
            },
            group: {
                type: 'String',
                default: "default",
            },
            icon: {
                type: 'String',
                default: "filter",
            },
            csvField: {
                type: 'String',
                default: "",
            },
            csvValue: {
                type: 'String',
                default: "",
            },
            isRange: {
                type: 'Boolean',
                default: false
            },
            allLabel: {
                type: 'String',
                default: "Select All",
            },
            noneLabel: {
                type: 'String',
                default: "Select None",
            },
            startLabel: {
                type: 'String',
                default: "Start",
            },
            endLabel: {
                type: 'String',
                default: "End",
            },
            useSingleColumn: {
                type: 'Boolean',
                default: false
            },
            enableTextSearch: {
                type: 'Boolean',
                default: false
            },
            showNoDataOption: {
                type: 'Boolean',
                default: true
            },
            filterType: {
                type: 'String',
                default: 'multi-select'
            },
            defaultValues: {
                type: 'String',
                default: ""
            },
            defaultValueCriteria: {
                type: 'String',
                default: "DEFAULT_VALUE_INPUT"
            },
            booleanTrueLabel: {
                type: 'String',
                default: "Yes",
            },
            booleanFalseLabel: {
                type: 'String',
                default: "No",
            },
            hiddenFilters: {
                type: "Array",
                default: []
            },
            allNoneSameBehaviour: {
                type: 'Boolean',
                default: false
            },
            alphabeticalSort: {
                type: 'Boolean',
                default: true
            },
            ascOrder: {
                type: 'Boolean',
                default: true,
            },
            closeOnSelect: {
                type: 'Boolean',
                default: false
            }


        },
        edit: BlockEdit,
        save: BlockSave,
    }
)
;
