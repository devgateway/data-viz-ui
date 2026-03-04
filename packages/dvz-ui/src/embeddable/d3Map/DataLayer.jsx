import React from 'react';
import BaseLayer from "./BaseLayer.jsx";
import DataProvider from "../data/D3MapDataProvider.jsx";
import DataConsumer from "../data/D3MapDataConsumer.jsx";
import { parse } from "../utils/index.js";
import * as d3 from "d3";
import { injectIntl } from "react-intl";

import BreaksStyles from "./BreaksStyles.js";
import GradientColors from "@/embeddable/d3Map/GradientColors.js";


const toGenericID = (key) => {
    //replace blank space by underscore
    if (!key) return ""
    return key.toString().replace(/ /g, "_")
}
const toId = (key) => {
    //replace blank space by underscore
    if (!key) return ""
    return "pattern_" + toGenericID(key)
}


const getFilters = (filters) => {
    const ff = parse(filters) || []
    let params = {};
    if (ff && ff.forEach) {
        ff.forEach(f => {
            if (f.value != null && f.value.filter(v => v != null && v.toString().trim() != "").length > 0) params[f.param] = f.value
        })
    } else {
        params = ff;
    }

    return params
}

class DataLayer extends BaseLayer {
    constructor() {
        super();

        this.state = { geoJson: null, json: null }
        this.getTooltipVariables = this.getTooltipVariables.bind(this)
        this.resize = this.resize.bind(this)
        this.createLayer = this.createLayer.bind(this)
        this.createCentroids = this.createCentroids.bind(this)
        this.createPatterns = this.createPatterns.bind(this)
        this.createPaths = this.createPaths.bind(this)

    }


    createLayer(json) {
        //eslint-disable-next-line
        const joined = this.joinData(json, this.props.app, this.props.featureJoinAttribute, this.props.data, this.props.measures, this.props.patternDiscriminator)
        this.createDataLayer(joined)
        if (this.props.onReady) {
            //eslint-disable-next-line

            this.props.onReady();
        }
    }


    resize() {
        const {
            markerLabelSize,
            markFillColor,
            markBorderColor,
            markSizeScale,
            measures,
            data,
            breaks,
            gradientScheme,
            gradientReverse, labelFontSize

        } = this.props

        const k = this.props.transform ? this.props.transform.k : 1

        super.resize()

        const brStyles = new BreaksStyles({
            breaks: breaks,
            defaultFillColor: markFillColor,
            defaultBorderColor: markBorderColor,
            defaultSize: markSizeScale
        })




        this.g.selectAll(".centroids .point").attr('r', d => {
            return brStyles.getSize(d.properties._value) * 1 / k
        })

        this.g.selectAll(".point-label")
            .attr("font-size", d => {
                return (markerLabelSize * (1 / k)) + "px"
            })





        const patternWidth = 10 * 1 / k
        const patternHeight = 10 * 1 / k


        /*
                this.g.selectAll("defs").selectAll("pattern").each(function(d, i) {
                    const pattern = d3.select(this);
                    console.log(d.type)
                    if (d.type == 'lines' || d.type == 'squares') {
                        pattern.attr('width', patternWidth / 2)
                        pattern.attr('height', patternHeight / 2)
                    }
                    if (d.type == 'dots') {
                        pattern
                            .attr("cx", patternWidth / 2)
                            .attr("cy", patternHeight / 2)
                            .attr('r', patternWidth / 2.5)
                    }
                    if (d.type == 'triangle') {
                        pattern.attr("points", `${patternWidth / 2} 0, 0 ${patternWidth}, ${patternWidth}  ${patternWidth} `)
                    }

                })



                this.g.selectAll(".shape-pattern")
                    .attr("style", () => {
                        return "none;;"
                    })
                    .attr("style", (p) => {
                        return "none;fill:url(#" + toId(p) + ");"
                    })
        */

    }


    getTooltipVariables(d) {
        const { apiJoinAttribute } = this.props
        //eslint-disable-next-line

        if (d.properties._value) {
            const variables = {
                ...d.properties, meta: {
                    [apiJoinAttribute]: d.properties.meta ? d.properties.meta.value : '', ...d.properties.meta,
                    value: d.properties._value
                }
            }
            return variables
        }
        return {}

    }

    createDataLayer(json) {
        const {
            app,
            svg,
            format,
            id,
            file,
            path,
            onLayerCreated,
            labelFilter = [],
            labelField,
            labelFontSize,
            labelColor,
            fillColor,
            borderColor,
            tooltip,
            markFillColor,
            markLabelColor,
            markBorderColor,
            markSizeScale,
            markerLabelSize,
            featureJoinAttribute,
            apiJoinAttribute,
            measures,
            editing,
            data,
            patternDiscriminator,
            patternDiscriminatorLabel,
            breaks,
            gradientScheme,
            gradientReverse,
            patterns,
            projection,
            useBreaks,
            useGradients,
            useCentroidPoint,
            usePattern,
            waitForFilters,
            intl,
            patternsVisible = true,
            togglePatterns,
            colorLayerVisible = true,
            visible

        } = this.props


        if (this.gRef && this.gRef.current) {
            //eslint-disable-next-line


            this.g = d3.select(this.gRef.current)

            this.g.attr("class", "base-layer") //add unique name
            const filteredData = json.features.filter(f => f.properties._value != null)

            //call create path on base layer
            this.createPaths(json)


            if (!useCentroidPoint) {
                this.createColors(filteredData)
                //this.createLabels(json)
            }
            if (usePattern) {
                this.createPatterns(json)
            }
            if (labelField != 'none') {
                this.createLabels(json)
            }
            if (useCentroidPoint) {
                this.createCentroids(filteredData)
            }


        }


    }


    createColors(filteredData) {
        const {
            app,
            svg,
            format,
            id,
            file,
            path,
            onLayerCreated,
            labelFilter = [],
            labelField,
            labelFontSize,
            labelColor,
            fillColor,
            borderColor,
            tooltip,
            markFillColor,
            markLabelColor,
            markBorderColor,
            markSizeScale,
            markerLabelSize,
            featureJoinAttribute,
            apiJoinAttribute,
            measures,
            editing,
            data,
            patternDiscriminator,
            patternDiscriminatorLabel,
            breaks,
            gradientScheme,
            gradientReverse,
            patterns,
            projection,
            useBreaks,
            useGradients,
            useCentroidPoint,
            usePattern,
            waitForFilters,
            intl,
            patternsVisible = true,
            togglePatterns,
            colorLayerVisible = true,
            visible

        } = this.props

        const { gradientStartColor, gradientEndColor } = this.props;

        const brStyles = new BreaksStyles({
            breaks: breaks,
            defaultFillColor: markFillColor,
            defaultBorderColor: markBorderColor,
            defaultSize: markSizeScale
        })

        const gradientColors = new GradientColors({
            data: data ? data.children : [],
            measure: measures[0],
            defaultFillColor: markFillColor,
            gradientScheme: gradientScheme,
            gradientReverse: gradientReverse,
            gradientStartColor: gradientStartColor,
            gradientEndColor: gradientEndColor
        })
        if (this.g) {

            //eslint-disable-next-line

            this.g.selectAll("path")
                .attr("fill", d => {
                    if (!d || !d.properties || !d.properties._value) {
                        return fillColor
                    }
                    return useGradients ? gradientColors.getColor(d.properties._value) : brStyles.getColor(d.properties._value)
                })
                .attr("stroke", borderColor)
                .attr("id", "state-borders")
                .attr("d", path).on("mouseenter", (d, p) => {
                    if (p.properties._value) {
                        this.showToolTip(tooltip, this.getTooltipVariables(p), useGradients ? gradientColors.getColor(p.properties._value) : brStyles.getColor(p.properties._value), p)
                    }
                })
                .on("mouseleave", (d) => {
                    this.hiddenToolTip(d)
                })
                .on("mousemove", (d) => {
                    this.moveToolTip(d)
                })

            if (!colorLayerVisible) {
                this.g.selectAll(".borders").style("fill", this.props.fillColor)
                //this.g.selectAll(".centroids").style("display", this.props.colorLayerVisible ? "block" : "none")
            }


            this.g.attr("transform", this.props.transform);

        }

    }

    createCentroids(filteredData) {
        const {
            app,
            svg,
            format,
            id,
            file,
            path,
            onLayerCreated,
            labelFilter = [],
            labelField,
            labelFontSize,
            labelColor,
            fillColor,
            borderColor,
            tooltip,
            markFillColor,
            markLabelColor,
            markBorderColor,
            markSizeScale,
            markerLabelSize,
            featureJoinAttribute,
            apiJoinAttribute,
            measures,
            editing,
            data,
            patternDiscriminator,
            patternDiscriminatorLabel,
            breaks,
            gradientScheme,
            gradientReverse,
            patterns,
            projection,
            useBreaks,
            useGradients,
            useCentroidPoint,
            usePattern,
            waitForFilters,
            intl,
            patternsVisible = true,
            togglePatterns,
            colorLayerVisible = true,
            visible

        } = this.props


        const brStyles = new BreaksStyles({
            breaks: breaks,
            defaultFillColor: markFillColor,
            defaultBorderColor: markBorderColor,
            defaultSize: markSizeScale
        })

        const getGradientColors = (data) => new GradientColors({
            data: data.children,
            measure: measures[0],
            defaultFillColor: markFillColor,
            gradientScheme: gradientScheme,
            gradientReverse: gradientReverse
        })

        if (this.g) {


            const numberFormat = {
                style: (format.style === 'compacted') ? 'decimal' : format.style,
                notation: (format.style === 'compacted') ? 'compact' : "standard",
                currency: format.currency,
                minimumFractionDigits: parseInt(format.minimumFractionDigits),
                maximumFractionDigits: parseInt(format.maximumFractionDigits)
            }


            const k = this.props.transform ? this.props.transform.k : 1

            this.g.selectAll(".centroids").remove()

            const pointsGroup = this.g.selectAll("centroids")
                .data(filteredData)
                .enter()
                .append("g")
                .attr("class", "centroids")


            pointsGroup.append("circle")
                .attr("fill", d => useGradients === true ? getGradientColors(data).getColor(d.properties._value) : brStyles.getColor(d.properties._value, true))
                .attr("stroke", markBorderColor)
                .attr("class", "point")
                .attr("stroke-width", 2)
                .style("vector-effect", "non-scaling-stroke")
                .attr("cx", d => path.centroid(d)[0])
                .attr("cy", d => path.centroid(d)[1])
                .attr('r', d => {
                    return brStyles.getSize(d.properties._value) * 1 / k
                }).on("mouseenter", (d, p) => {
                    if (p.properties._value) {

                        const variables = {
                            ...p.properties, meta: {
                                [apiJoinAttribute]: p.properties.meta ? p.properties.meta.value : '', ...p.properties.meta,
                                value: p.properties._value
                            }
                        }

                        this.showToolTip(tooltip, variables, useGradients === true ? getGradientColors(data).getColor(p.properties._value) : brStyles.getColor(p.properties._value))
                    }
                })
                .on("mouseleave", (d) => {
                    this.hiddenToolTip()
                })


            pointsGroup.append("text")
                .attr("class", "point-label")
                .attr("x", d => path.centroid(d)[0])
                .attr("y", d => path.centroid(d)[1])
                .attr("font-size", d => {
                    return (markerLabelSize * (1 / k)) + "px"
                })
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "middle")
                .style("pointer-events", "none")
                .attr("fill", markLabelColor)
                .text(d => {
                    return intl.formatNumber(format.style === 'percent' ? d.properties._value / 100 : d.properties._value, numberFormat)

                }).on("mouseover", (d) => {

                });

            if (!colorLayerVisible) {
                this.g.selectAll(".centroids").style("display", "none")
            }
        }

    }

    createPatterns(json) {
        const {
            app,
            svg,
            format,
            id,
            file,
            path,
            onLayerCreated,
            labelFilter = [],
            labelField,
            labelFontSize,
            labelColor,
            fillColor,
            borderColor,
            tooltip,
            markFillColor,
            markLabelColor,
            markBorderColor,
            markSizeScale,
            markerLabelSize,
            featureJoinAttribute,
            apiJoinAttribute,
            measures,
            editing,
            data,
            patternDiscriminator,
            patternDiscriminatorLabel,
            breaks,
            gradientScheme,
            gradientReverse,
            patterns,
            projection,
            useBreaks,
            useGradients,
            useCentroidPoint,
            usePattern,
            waitForFilters,
            intl,
            patternsVisible = true,
            togglePatterns,
            colorLayerVisible = true,
            visible

        } = this.props


        const brStyles = new BreaksStyles({
            breaks: breaks,
            defaultFillColor: markFillColor,
            defaultBorderColor: markBorderColor,
            defaultSize: markSizeScale
        })

        const k = this.props.transform ? this.props.transform.k : 1

        const patternWidth = 10 * 1 / k
        const patternHeight = 10 * 1 / k
        const getGradientColors = (data) => new GradientColors({
            data: data.children,
            measure: measures[0],
            defaultFillColor: markFillColor,
            gradientScheme: gradientScheme,
            gradientReverse: gradientReverse,
            gradientStartColor: gradientStartColor,
            gradientEndColor: gradientEndColor
        })


        let patternsData = []

        if (app == "csv" && patternDiscriminator != 'none') {
            patternsData = [...new Set(data.data.map(d => d[patternDiscriminator]))].map(key => {
                return {
                    key: key,
                    type: patterns[key + "_symbol"],
                    color: patterns[key + "_color"],
                    rotation: patterns[key + "_rotation"]
                }
            })
        } else if (patternDiscriminator != 'none') {
            const types = data.metadata ? data.metadata.types.filter(d => d.dimension == patternDiscriminator) : []
            patternsData = types && types.length > 0 ? types[0].items.map(item => {
                const key = item.value
                return {
                    key: key,
                    type: patterns[key + "_symbol"],
                    color: patterns[key + "_color"],
                    rotation: patterns[key + "_rotation"]
                }

            }) : []
        }


        this.g.selectAll("defs").remove()
        const defs = this.g.append("defs")
        defs.selectAll("pattern").remove()

        defs.selectAll("pattern")
            .data(patternsData)
            .enter()
            .append("pattern")
            .attr('id', d => toId(d.key))
            .attr('patternUnits', 'userSpaceOnUse')
            .attr('width', patternWidth)
            .attr('height', patternHeight)
            .attr("x", 0)
            .attr("y", 0)
            .attr("patternTransform", d => `rotate(${d.rotation})`)

        patternsData.forEach(d => {
            if (d.type === 'lines') {
                defs.select("#" + toId(d.key))
                    .append("rect")
                    .attr("x", .05)
                    .attr('width', patternWidth / 2)
                    .attr('height', patternHeight)
                    .attr("opacity", 1)
                    .attr('fill', d.color)
            }
            if (d.type === 'squares') {
                defs.select("#" + toId(d.key))
                    .append("rect")
                    .attr('width', patternWidth / 2)
                    .attr('height', patternHeight / 2)
                    .attr('fill', d.color)
                    .attr("opacity", 1)
                    .attr("stroke-width", 1)

            }
            if (d.type === 'dots') {
                defs.select("#" + toId(d.key))
                    .append("circle")
                    .attr("cx", patternWidth / 2)
                    .attr("cy", patternHeight / 2)
                    .attr('r', patternWidth / 2.5)
                    .attr('fill', d.color)
                    .attr("opacity", 1)
                    .attr("stroke-width", 1)

            }
            if (d.type === 'triangle') {
                defs.select("#" + toId(d.key))
                    .append("polygon")
                    .attr("points", `${patternWidth / 2} 0, 0 ${patternWidth}, ${patternWidth}  ${patternWidth} `)
                    .attr('fill', d.color)
                    .attr("opacity", 1)
                    .attr("stroke-width", 1)

            }
        })

        patternsData = patternsData.filter(p => {
            return p.type != undefined
        }).sort((a, b) => {
            return new Intl.Collator(intl.locale, { caseFirst: 'upper', numeric: true, sensitivity: 'variant' })
                .compare(a.key, b.key);
        })


        if (usePattern && json && json.features) {
            this.g.selectAll(".shape-pattern").remove()

            if (patternsVisible) {
                json.features.forEach(d => {
                    let patterns = []
                    if (d.properties && d.properties.meta) {
                        patterns = (app != "csv") ? d.properties.meta[patternDiscriminator] ? d.properties.meta[patternDiscriminator] : [] : [d.properties.meta[patternDiscriminator]]
                        if (patterns && patterns.length > 0) {

                            patterns.forEach(p => {
                                //eslint-disable-next-line

                                this.g.append("path")
                                    .attr("d", path(d))
                                    .datum(p)
                                    .attr("class", "shape-pattern")
                                    .attr("opacity", d => {
                                        if (useBreaks) {
                                            return .7
                                        }
                                    })
                                    .attr("fill", d => {
                                        return "transparent"
                                    })
                                    .attr("style", () => {
                                        return "none;fill:url(#" + toId(p) + ");"
                                    })
                                    .on("mouseenter", () => {
                                        this.showToolTip(tooltip, this.getTooltipVariables(d), useGradients === true ? getGradientColors(data).getColor(d.properties._value) : brStyles.getColor(d.properties._value))
                                    }).on("mousemove", (d) => {
                                        this.moveToolTip()
                                    }).on("mouseleave", (d) => {
                                        this.hiddenToolTip()
                                    })

                            })
                        }

                    }

                })
            }

            /*Adding patterns to legends*/
            /**/
            d3.select(this.gRef.current.parentNode.parentNode)
                .select(`.layer_${toGenericID(id)}`)
                .select("svg").remove()

            //eslint-disable-next-line


            const legendsSVG = d3.select(this.gRef.current.parentNode.parentNode)
                .select(`.layer_${toGenericID(id)}`).append("svg")


            legendsSVG.attr("height", 30 + ((patternsData.length * 23)) + "px")



            const lgenedsG = legendsSVG.append("svg").append("g")


            const defs = lgenedsG.append("defs")

            defs.selectAll("pattern").remove()

            if (patternsVisible) {
                defs.selectAll("pattern")
                    .data(patternsData).enter()
                    .append("pattern")
                    .attr('id', d => 'l_' + toId(d.key))
                    .attr('patternUnits', 'userSpaceOnUse')
                    .attr('width', 5)
                    .attr('height', 5)
                    .attr("x", 0).attr("y", 0)
                    .attr("patternTransform", d => `rotate(${!d.rotation ? 0 : d.rotation})`)

                patternsData.forEach(d => {
                    if (d.type === 'lines') {
                        defs.select("#" + 'l_' + toId(d.key))
                            .append("rect")
                            .attr("x", 0)
                            .attr('width', 1)
                            .attr('height', 10)
                            .attr("opacity", .75)
                            .attr('fill', d.color)
                    }
                    if (d.type === 'squares') {
                        defs.select("#" + 'l_' + toId(d.key))
                            .append("rect")
                            .attr('width', 3)
                            .attr('height', 3)
                            .attr('fill', d.color)
                            .attr("opacity", 1)
                            .attr("stroke-width", 1)

                    }
                    if (d.type === 'dots') {
                        defs.select("#" + 'l_' + toId(d.key))
                            .append("circle")
                            .attr("cx", 2)
                            .attr("cy", 2)
                            .attr('r', 2)
                            .attr('fill', d.color)
                            .attr("opacity", 1)
                            .attr("stroke-width", 1)

                    }
                    if (d.type === 'triangle') {
                        defs.select("#" + 'l_' + toId(d.key))
                            .append("polygon")
                            .attr("points", "5,0 8,8 0,5")
                            .attr('fill', d.color)
                            .attr("opacity", 1)
                            .attr("stroke-width", 1)

                    }
                })

            }


            let patternCheckbox = patternsVisible ? "☑ " : "☐ ";

            lgenedsG.append("text")
                .attr("class", "patterns-checkbox")
                .attr("x", 10)
                .attr("y", 20)

                .text(a => patternCheckbox)

                .attr("font-size", "22px")
                .on("click", () => {
                    if (togglePatterns) {
                        togglePatterns(id)
                    }
                })

            lgenedsG.append("text")
                .attr("class", "patterns-title")
                .attr("x", 25)
                .attr("y", 7)
                .text(a => app === 'csv' ? patternDiscriminator : patternDiscriminatorLabel)
                .on("click", () => {
                    if (togglePatterns) {
                        togglePatterns(id)
                    }
                })


            if (patternsVisible) {
                lgenedsG.selectAll(".legend-squares")
                    .data(patternsData)
                    .enter()
                    .append("rect")
                    .attr("width", 15)
                    .attr("height", 15)
                    .attr("y", (d, i) => (i * 22) + 30)
                    .attr("x", 15)
                    .attr("stroke", borderColor)
                    .attr("style", (d) => {
                        return "none;fill:url(#" + 'l_' + toId(d.key) + ");"
                    })


                lgenedsG.selectAll(".patterns-labels")
                    .data(patternsData)
                    .enter()
                    .append("text")
                    .attr("class", "patterns-labels")
                    .attr("y", (d, i) => (i * 22) + 30)
                    .attr("x", 32)
                    .text(d => d.key)
            }
        }

    }


    joinData(json, app, featureJoinAttribute, data, measures, patternDiscriminator) {

        const features = json.features.map(d => {
            const joinValue = d.properties[featureJoinAttribute]
            if (app != 'csv' && data && data.children) {
                const values = data.children.filter(d => {
                    return d.value == joinValue
                })
                if (values.length > 0) {
                    const measureValue = (values[0][measures[0]])
                    d.properties.meta = values[0]
                    d.properties._value = measureValue
                    if (patternDiscriminator && patternDiscriminator != 'none') {
                        const patternsValues = values[0] && values[0].children ? values[0].children.filter(f => f.type == patternDiscriminator).map(d => d.value) : []

                        d.properties.meta[patternDiscriminator] = patternsValues
                    }

                } else {
                    d.properties._value = null
                }

            } else if (app == 'csv') {
                const values = data.data.filter(d => d[data.meta.fields[0]] == joinValue)
                if (values.length > 0) {
                    d.properties.meta = values[0]
                    d.properties._value = values[0][data.meta.fields[1]]

                } else {
                    d.properties._value = null
                }
            } else {
                d.properties._value = null
            }
            return d
        })
        const newJson = { ...json, features }

        return newJson


    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        const { app, file, featureJoinAttribute, data, measures, patternDiscriminator, editing, usePattern } = this.props

        //TODO:Check if data has changed using JSON.stringify

        if (editing || prevProps.data !== data || prevProps.path !== this.props.path) {
            this.create()
        }

        if (prevProps.visible != this.props.visible) {
            //eslint-disable-next-line

            this.g.style("display", this.props.visible ? "" : "none")
        }

        if (prevProps.patternsVisible != this.props.patternsVisible) {
            //eslint-disable-next-line
            const svg = d3.select(this.gRef.current.parentNode.parentNode)

            const legendDiv = svg.select(`.layer_${toGenericID(this.props.id)}`)

            legendDiv.select(".patterns-checkbox").text(this.props.patternsVisible ? "☑ " : "☐ ")
            legendDiv.selectAll('.patterns-labels').style("display", this.props.patternsVisible ? "" : "none")

            legendDiv.selectAll('rect').style("display", this.props.patternsVisible ? "" : "none")

            //eslint-disable-next-line


            legendDiv.select("svg").attr("height", this.props.patternsVisible ? 30 + (((legendDiv.selectAll('rect').size() - 1) * 23)) + "px" : "30px")

            this.g.selectAll(".shape-pattern").style("display", this.props.patternsVisible ? "" : "none")

        }

        if (prevProps.colorLayerVisible != this.props.colorLayerVisible) {
            //eslint-disable-next-line

            this.g.selectAll(".borders").style("fill", d => {
                //eslint-disable-next-line

                return this.props.colorLayerVisible ? null : this.props.fillColor

            })
            this.g.selectAll(".centroids").style("display", this.props.colorLayerVisible ? "block" : "none")
        }

        if (prevProps.usePattern != this.props.usePattern) {
            if (!this.props.usePattern) {
                const svg = d3.select(this.gRef.current.parentNode.parentNode)

                const legendDiv = svg.select(`.layer_${toGenericID(this.props.id)}`)
                legendDiv.select("svg").remove()
            }
        }

        if (this.g) {
            this.resize()
        }
        if (usePattern) {
            // this.createPatterns(json)
        }
    }


    componentDidMount() {

        super.componentDidMount()
    }

    render() {
        const {
            id,
            file,
            path,
            zoom,
            labelFilter = [],
            labelField,
            labelFontSize,
            labelColor,
            fillColor,
            borderColor,
            featureJoinAttribute,
            apiJoinAttribute,
            dvzProxyDatasetId,
            editing
        } = this.props

        return <g id={"data-" + id} className={"data " + id} ref={this.gRef} />
    }

}

const DataWrapper = (props) => {
    const {
        id,
        unique,
        filters,
        csv,
        app,
        group = "default",
        apiJoinAttribute,
        editing,
        patternDiscriminator,
        dvzProxyDatasetId,
        intl,
        settings,
        waitForFilters
    } = props


    const params = {}
    const ff = filters || {}

    if (ff && ff.forEach) {
        ff.forEach(f => {
            if (f.value != null && f.value.filter(v => v != null && v.toString().trim() != "").length > 0) params[f.param] = f.value
        })
    }

    if (dvzProxyDatasetId) {
        params.dvzProxyDatasetId = dvzProxyDatasetId;
    }


    return (<DataProvider
        waitForFilters={true}
        editing={editing}
        params={params}
        app={app}
        csv={decodeURIComponent(csv)}
        group={group}
        ignoreErrors={true}
        isSvg={true}
        store={[app, unique, id]}
        mySelf="Data layer"
        source={apiJoinAttribute + (patternDiscriminator != 'none' ? "/" + patternDiscriminator : '')}>
        <DataConsumer>
            <DataLayer {...props}></DataLayer>
        </DataConsumer>

    </DataProvider>)
}

export default injectIntl(DataWrapper)
