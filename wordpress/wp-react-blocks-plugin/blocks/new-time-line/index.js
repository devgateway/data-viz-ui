import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import BlockSave from "./BlockSave";
import BlockEdit from "./BlockEdit";
import {Generic} from "../icons";


registerBlockType(process.env.BLOCKS_NS + '/new-time-line',
    {
        title: __('New Time Line',"dg"),
        icon: Generic,
        category: process.env.BLOCKS_CATEGORY,
        attributes: {
            count: {
                type: 'numeric',
                default: 7,
            },
            position: {
                type: 'string',
                default: "middle",
            },
            lineWidth: {
                type: 'Numeric',
                default: 2,
            },
            type: {
                type: 'string',
                default: "posts",
            },
            taxonomy: {
                type: 'string',
                default: "none",
            },
            categories: {
                type: 'array',
                default: [],
            },
            height: {
                type: 'Numeric',
                default: 500,
            },
            lineColor: {
                type: 'string',
                default: "#a7a9ac",
            },
            marginLeft: {
                type: 'Numeric',
                default: 50
            },
            marginRight: {
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
            titleWidth: {
                type: 'Numeric',
                default: 120
            },
            subtitleWidth: {
                type: 'Numeric',
                default: 120
            },            
            fontSize: {
                type: 'Numeric',
                default: 14
            },
            panelStatus: {
                type: "Object",
                default: {}
            },
            config: {
                type: 'array',
                default: [
                    {
                        circleColor: "#6acbd5",
                        lineColor: "#6acbd5",
                        titleColor: "#6acbd5",
                        labelColor: "#000000",
                        size: 10,
                        subtitleOffset: 20,
                        titleOffset: -120,
                        connectorLineHeight: 100,
                        position: "top",
                        readMoreLabel: "read more"
                    },
                    {
                        circleColor: "#fcb535",
                        lineColor: "#fcb535",
                        titleColor: "#fcb535",
                        labelColor: "#000000",
                        size: 10,
                        subtitleOffset: 20,
                        titleOffset: 120,
                        connectorLineHeight: 100,
                        position: "bottom",
                        readMoreLabel: "read more"
                    },
                    {
                        circleColor: "#f79132",
                        lineColor: "#f79132",
                        titleColor: "#f79132",
                        labelColor: "#000000",
                        size: 10,
                        subtitleOffset: 20,
                        titleOffset: -120,
                        connectorLineHeight: 100,
                        position: "top",
                        readMoreLabel: "read more"
                    },
                    {
                        circleColor: "#f79132",
                        lineColor: "#f79132",
                        titleColor: "#f79132",
                        labelColor: "#000000",
                        size: 10,
                        subtitleOffset: 20,
                        titleOffset: 120,
                        connectorLineHeight: 100,
                        position: "bottom",
                        readMoreLabel: "read more"
                    }, {
                        circleColor: "#e54957",
                        lineColor: "#e54957",
                        titleColor: "#e54957",
                        labelColor: "#000000",
                        size: 10,
                        subtitleOffset: 20,
                        titleOffset: -120,
                        connectorLineHeight: 100,
                        position: "top",
                        readMoreLabel: "read more"
                    }, {
                        circleColor: "#0e5583",
                        lineColor: "#0e5583",
                        titleColor: "#0e5583",
                        labelColor: "#000000",
                        size: 10,
                        subtitleOffset: 20,
                        titleOffset: 120,
                        connectorLineHeight: 100,
                        position: "bottom",
                        readMoreLabel: "read more"
                    }, {
                        circleColor: "#2fb2e4",
                        lineColor: "#2fb2e4",
                        titleColor: "#2fb2e4",
                        labelColor: "#000000",
                        size: 10,
                        subtitleOffset: 20,
                        titleOffset: -120,
                        connectorLineHeight: 100,
                        position: "top",
                        readMoreLabel: "read more"
                    },
                    {
                        circleColor: "#fcb535",
                        lineColor: "#fcb535",
                        titleColor: "#fcb535",
                        labelColor: "#000000",
                        size: 10,
                        subtitleOffset: 20,
                        titleOffset: 120,
                        connectorLineHeight: 100,
                        position: "bottom",
                        readMoreLabel: "read more"
                    }],
            }
        },
        edit: BlockEdit,
        save: BlockSave
    }
)
;
