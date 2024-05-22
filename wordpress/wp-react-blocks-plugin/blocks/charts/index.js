import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import BlockSave from "./BlockSave";
import BlockEdit from "./BlockEdit";
import {Chart} from '../icons/index.js'

registerBlockType(process.env.BLOCKS_NS + '/chart',
    {
        title: __('Data Chart'),
        icon: Chart,
        category: process.env.BLOCKS_CATEGORY,
        apiVersion: 2,
        attributes: {
            height: {
                type: 'number',
                default: 500,
            },

            type: {
                type: 'string',
                default: "bar",
            },
            source: {
                type: 'string',
                default: '',
            },
            bottomLegend: {
                type: 'string',
                default: "",
            }
            ,
            leftLegend: {
                type: 'string',
                default: "Left Legends",
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

            groupMode: {
                type: 'String',
                default: 'grouped',
            },
            group: {
                type: 'String',
                default: 'default',
            },
            mode: {
                type: 'String',
                default: "chart"
            },


            dualMode: {
                type: "Boolean",
                default: false
            },
            toggleInfoLabel: {
                type: 'String',
                default: "Info Graphic"
            },
            toggleChartLabel: {
                type: 'String',
                default: "Chart"
            },
            dataSourceLabel: {
                type: 'String',
                default: "Source"
            },
            dataSource: {
                type: 'String',
                default: "NIDS"
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
            groupTotalFormat: {
                type: Object,
                default: {
                    "style": "percent",
                    "minimumFractionDigits": 1,
                    "maximumFractionDigits": 1,
                    "currency": "USD"
                }

            },
            groupTotalFixedPosition: {
                type: "Boolean",
                default: false
            },
            groupTotalOffset: {
                type: 'Numeric',
                default: 0
            },
            tickRotation: {
                type: 'Numeric',
                default: 0
            },
            offsetText: {
                type: "Numeric",
                default: 0
            },
            tickColor: {
                type: "String",
                default: encodeURIComponent("#FFFFFF")
            },
            yAxisTickValues: {
                type: 'Numeric',
                default: 10
            },
            xAxisTickValues: {
                type: 'Numeric',
                default: 10
            },
            xLabelColor: {
                type: "String",
                default: encodeURIComponent("#000000")
            },
            barLabelColor: {
                type: "String",
                default: encodeURIComponent("#000000")
            },
            keys: {
                type: "Array",
                default: []
            },

            measures: {
                type: "Object",
                default: {
                    csv: {
                        format: {
                            style: "percent",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        },
                        customFormat: {
                            style: "percent",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        },
                        useCustomAxisFormat: false
                    },
                }
            },

            _measures: {},
            filters: {
                type: "Array",
                default: []
            },
            csv: {
                type: "String",
                default: "Key1,Key2,Key3,Key4 \nIndex1,12,13,14 \nIndex2,22,23,34 \nIndex3,32,33,34"
            },
            startAngle: {
                type: "Numeric",
                default: 0
            },
            tooltipHTML: {
                type: "String",
                default: "{value}"
            },
            tooltip: {
                type: "String",
                default: "{value}"
            },
            endAngle: {
                type: "Numeric",
                default: 360
            },
            layout: {
                type: "String",
                default: "vertical"
            },
            reverse: {
                type: "Boolean",
                default: false
            },
            useLabelBackground: {
                type: "Boolean",
                default: false
            },

            showGroupTotal: {
                type: "Boolean",
                default: false
            },
            groupTotalMeasure: {
                type: "String",
                default: "",
            },
            groupTotalLabel: {
                type: "String",
                default: "",
            },

            useCheckBoxBackground: {
                type: "Boolean",
                default: true
            },
            offsetY: {
                type: "Numeric",
                default: -40
            },
            groupTotalLabelOffset: {
                type: "Numeric",
                default: 0
            },
            legendLabelColor: {
                type: "String",
                default: encodeURIComponent("#000000")
            },

            overlays: {
                type: 'Array',
                default: []
            },

            csvLineLayerData: {
                type: "String",
                default: ""
            },
            csvLineColor: {
                type: "String",
                default: encodeURIComponent("#000000")
            },
            csvLineTooltip: {
                type: "String",
                default: "{x} - #({y},2)"
            },
            csvLineTitle: {
                type: "String",
                default: "Overlay"
            },
            lineLayerEnabled: {
                type: "Boolean",
                default: false
            },
            valueScale: {
                type: 'String',
                default: 'linear'
            },
            maxValue: {
                type: 'String',
                default: 'auto'
            },
            fixedMinValue: {
                type: 'Numeric',
                default: 0
            },
            fixedMaxValue: {
                type: 'Numeric',
                default: 0
            },
            swap: {
                type: 'Boolean',
                default: false
            },
            noDataMessage: {
                type: 'String',
                default: "No data matches your selection.",
            },
            types: {
                type: "Array",
                default: [
                    {label: 'Bar', value: 'bar', supports: {singleMeasure: false, singleDimension: false}},
                    {label: 'Pie', value: 'pie', supports: {singleMeasure: false, singleDimension: false}},
                    {label: 'Line', value: 'line', supports: {singleMeasure: false, singleDimension: true}},
                    {label: 'Radar', value: 'radar', supports: {singleMeasure: true, singleDimension: true}}
                ]
            },
            barColor: {
                type: "String",
                default: encodeURIComponent("#000000")
            },
            overrideTickColor: {
                type: 'Boolean',
                default: false
            },

            manualColors: {
                type: 'Object',
                default: {}
            },
            barPadding: {
                type: 'Numeric',
                default: 0.15
            },
            barLabelPosition: {
                type: "String",
                default: "middle"
            },
            showGrid: {
                type: 'Boolean',
                default: true
            },
            includeOverall: {
                type: 'Boolean',
                default: false
            },
            overallLabel: {
                type: "String",
                default: "Overall"
            },
            tooltipEnabled: {
                type: "Boolean",
                default: true
            },
            barInnerPadding: {
                type: 'Numeric',
                default: 0.7
            },
            highlightXAxisLine: {
                type: "Boolean",
                default: false
            },
            showTickLine: {
                type: "Boolean",
                default: false
            },
            showRightAxis: {
                type: "Boolean",
                default: false
            },
            offsetRight: {
                type: "Numeric",
                default: 40
            },
            rightLegend: {
                type: 'string',
                default: "Right Legend",
            },
            offsetBottom: {
                type: "Numeric",
                default: 40
            },
            hiddenBars: {
                type: "Array",
                default: []
            },

            enableArea: {
                type: "Boolean",
                default: false
            },
            areaShadingCriteria: {
                type: 'string',
                default: "DEFAULT"
            },
            areaLowerBound: {
                type: 'string',
                default: ""
            },
            areaUpperBound: {
                type: 'string',
                default: ""
            },
            showPoints: {
                type: "Boolean",
                default: true
            },
            confidenceIntervals: {
                type: "Array",
                default: []
            },
            centerLabel: {
                type: 'string',
                default: ""
            },
            centerLabelFontWeight: {
                type: 'String',
                default: 'normal'
            },
            centerLabelFontSize: {
                type: 'Numeric',
                default: 12
            },
            showArcLabels: {
                type: "Boolean",
                default: true
            },
            showArcLinkLabels: {
                type: "Boolean",
                default: false
            },
            slicePadding: {
                type: "Numeric",
                default: 1
            },
            centerLabelXOffset: {
                type: "Numeric",
                default: 0
            },
            centerLabelYOffset: {
                type: "Numeric",
                default: 0
            },
            panelStatus: {
                type: "Object",
                default: {}
            },
            tooltipEnableMarkdown: {
                type: 'Boolean',
                default: false
            },
            enableGridY: {
                type: 'Boolean',
                default: true
            },
            enableGridX: {
                type: 'Boolean',
                default: false
            },
            minMaxClamp: {
                type: 'Boolean',
                default: false
            },
            reverseLegend: {
                type: 'Boolean',
                default: false
            },
            sort: {
                type: 'string',
                default: '',
            },
            sort2Dimension: {
                type: 'string',
                default: 'none',
            },
            sortReverse: {
                type: 'Boolean',
                default: false
            },
            radarCurve: {
                type: 'string',
                default: 'linearClosed'
            },
            radarFillOpacity: {
                type: 'Numeric',
                default: 0.25
            },
            radarBorderWidth: {
                type: 'Numeric',
                default: 1
            },
            radarGridLevels: {
                type: 'Numeric',
                default: 7
            },
            radarGridShape: {
                type: 'string',
                default: 'circular'
            },
            radarGridLabelOffset: {
                type: 'Numeric',
                default: 36
            },
            radarEnableDots: {
                type: 'Boolean',
                default: true
            },
            radarDotSize: {
                type: 'Numeric',
                default: 6
            },
            radarEnableDotLabel: {
                type: 'Boolean',
                default: false

            },
            radarDotLabelOffset: {
                type: 'Numeric',
                default: -12
            }
        },
        edit: BlockEdit,
        save: BlockSave,
    }
);
