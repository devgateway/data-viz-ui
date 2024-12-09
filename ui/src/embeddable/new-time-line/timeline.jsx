import 'pure-react-carousel/dist/react-carousel.es.css';
import React, {useEffect, useRef, useState} from "react";
import * as d3 from 'd3'

const visibleStyle  = {
    visibility: 'visible',
    position: "relative",
    height: 'auto',
    width: 'auto',
}

const hiddenStyle = {
    position: "absolute",
    left: ' -1000px',
    width: '1px',
    height: '1px',
    overflow: 'hidden'
}

const TimeLine = ({
                      posts, position, lineWidth, meta, locale, lineColor, height, config, marginLeft,
                      marginTop,
                      marginRight,
                      marginBottom,
                      fontSize,
                      titleWidth,
                      subtitleWidth,
                      onSelectSlide,
                      currentSlide
                  }) => {



    const ref = useRef()
    const [displayTooltip, setDisplayTooltip] = useState(false);
    const [tooltipData, setTooltipData] = useState(null);


    const pointPosition = (idx) => {
        return config[idx].position
    }

    const tickLength = (idx) => {
        return config[idx].connectorLineHeight
    }
    const subtitleOffset = (idx) => {
        return config[idx].subtitleOffset
    }
    const connectorLineHeight = (idx) => {
        return config[idx].connectorLineHeight
    }
    const titleOffset = (idx) => {
        return config[idx].titleOffset
    }
    const circleColor = (idx) => {
        return config[idx].circleColor
    }
    const pointLineColor = (idx) => {
        return config[idx].lineColor
    }

    const titleColor = (idx) => {
        return config[idx].titleColor
    }

    const labelColor = (idx) => {
        return config[idx].labelColor
    }

    const size = (idx) => {
        return config[idx].size
    }

    const readMoreLabel = (idx) => {
        return config[idx].readMoreLabel
    }

    useEffect(() => {

        const margin = {top: marginTop, right: marginRight, bottom: marginBottom, left: marginLeft};

        let graphicPosition = height / 2
        if (position == "middle") {
            graphicPosition = height / 2
        }
        if (position == "top") {
            graphicPosition = margin.top
        }
        if (position == "bottom") {
            graphicPosition = height - margin.bottom
        }


        const svgWidth = ref.current.clientWidth,
            svgHeight = height;

        const xScale = d3.scaleLinear()
            .domain([0, posts.length - 1])
            .range([margin.left, svgWidth - margin.right])


        const lineGenerator = d3.line();
        const data = [[xScale(0), 0], [xScale(posts.length - 1), 0]];
        const pathString = lineGenerator(data);


        /*making svg take available width*/
        const svgElement = d3.select(ref.current)
        svgElement.attr("width", svgWidth).attr("height", svgHeight)


        const onclick=(i)=>{
            onSelectSlide(i)
        }
        /* tooltip*/
        const parent = svgElement.node().parentNode

        const onMouseOver = (d, i) => {
            const offset = 30
            const position = [d3.event.pageX + offset, d3.event.pageY - offset]
            const tooltipWidth =  600
            if ((d3.event.pageX + tooltipWidth + offset) > window.innerWidth) {
                position[0] = d3.event.pageX - tooltipWidth - offset
            }

            setDisplayTooltip(true)
            setTooltipData({data: d, index: i, position})

            d3.selectAll("#circle" + i)
                 .style("stroke", circleColor(i))
                 .style("fill", "#fff");

                 d3.selectAll("#label" + i)
                 .style("font-weight", "bold")


                 //.style("font-weight", (d) => "bold")
        }

        const onMouseOut = (d, i) => {
            d3.selectAll("#circle" + i)
            .style("stroke", "none")
            .style("fill", circleColor(i));

            d3.selectAll("#label" + i)
            .style("font-weight", "normal")
        }

        /* g element */
        const g = svgElement.append("g")
        g.attr("transform", `translate(${0},${graphicPosition})`);

        /*Horizontal Line */
        g.append("path").attr("d", pathString)
            .attr("stroke-width", lineWidth)
            .attr("stroke", lineColor)

        /*Vertical lines */
        g.selectAll(".tick")
            .data(posts).enter()
            .append('path')
            .attr("d", (d, i) => lineGenerator([[xScale(i), 0], [xScale(i), (pointPosition(i) === 'top') ? tickLength(i) * -1 : tickLength(i)]]))
            .attr("stroke-width", lineWidth)
            .attr("stroke", (d, i) => {
                return pointLineColor(i)
            }).on("mouseover", function (d, i) {
            })



        /* Label (post subtitle custom field) */
        g.selectAll('.label')
            .data(posts)
            .enter()
            .append("foreignObject")
            .attr('id', (d, i) => {
                return "label" + i
            })
            .attr('x', function (d, i) {
                return xScale(i) - subtitleWidth / 2;
            })
            .attr("width", subtitleWidth)
            .attr("height", "50px")
            .attr('overflow', 'visible')
            .style('opacity', 1)
            .attr('y', (d, i) => subtitleOffset(i))
            .append("xhtml:div")
            .style("color", (d, i) => labelColor(i))
             .style('font-size', (parseInt(fontSize) - 2) + 'px')
            .style('line-height', '100%')
            .style('text-align', 'center')
            .html((d, i) => {
                return d["meta_fields"]["subtitle"]
            })
            .on("mouseover", (d, i) => {
                onMouseOver(d, i)
            })
            .on("mouseout", (d, i) => {
                onMouseOut(d, i)
            })



        /*Title*/
        g.selectAll('.title')
            .data(posts)
            .enter()
            .append("foreignObject")
            .attr('x', function (d, i) {
                return xScale(i) - (titleWidth / 2);
            })
             .attr("width", titleWidth)
             .attr("height", "50px")
             .attr('overflow', 'visible')
             .style('opacity', 1)
            .attr('y', (d, i) =>  titleOffset(i))
            .append("xhtml:div")
            .style('font-size', (parseInt(fontSize) + 1) + 'px')
            .style("color", (d, i) => titleColor(i))
            .style("font-weight", (d) => "bold")
            .style('line-height', '100%')
            .style('text-align', 'center')
            .html((d, i) => {
                const readmore = readMoreLabel(i)
                let title = d.title.rendered
                if (readmore) {
                    title += `<br><a href="${d.link}" target="_blank" style="font-size:${parseInt(fontSize) - 3}px;color:${titleColor(i)}">${readmore}</a>`
                }
                return title
            })
            .on("mouseover", (d, i) => {
                onMouseOver(d, i)
            })
            .on("mouseout", (d, i) => {
                onMouseOut(d, i)
            })


        /* Circles */
        g.selectAll(".circle")
            .data(posts).enter()
            .append('circle')
            .attr("class",(d,i)=>{
                if (i==currentSlide){
                    return "active"
                }
                return "normal"
            })

            .attr('cx', (d, i) => {
                return xScale(i)
            })
            .attr('cy', 0)
            .attr('id', (d, i) => {
                return "circle" + i
            })
            .attr('r', (d, i) => {
                return size(i)
            })
            .style("stroke-width", 3)
            .style('fill', (d, i) => {
                return circleColor(i)
            })
            .on("mouseover", function (d, i) {
                onMouseOver(d, i)
            })
            .on("mouseout", function (d, i) {
                onMouseOut(d, i)
            }).on("click", function (d, i) {
            onclick(i)
        })




    }, [])




    return (
        <div className={"line"}>
               <svg height={height}  width={"100%"} ref={ref}/>
        </div>
    )
}


export default TimeLine
