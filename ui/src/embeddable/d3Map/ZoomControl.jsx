import React, {useEffect} from 'react';
import {connect} from "react-redux";
import * as d3 from 'd3' // d3 plugin
import * as topojson from "topojson-client";
import {Icon, Popup} from "semantic-ui-react";
import {FormattedMessage} from "react-intl";


class ZoomControl extends React.Component {


    constructor() {
        super();

        this.mapPosition = null
        this.centered = null
        this.mapPosition = null
        this.zooming = false
        this.zoomed=this.zoomed.bind(this)
        this.zoomEnd=this.zoomEnd.bind(this)
        this.zoomIn=this.zoomIn.bind(this)
        this.zoomOut=this.zoomOut.bind(this)

        this.reset=this.reset.bind(this)
        this.fullView=this.fullView.bind(this)

        this.zoomRef = React.createRef();


        this.zoom = d3.zoom().scaleExtent([1, 1000])
            .on("zoom", this.zoomed)
            .on("end", this.zoomEnd);



    }

    componentDidMount() {
        const svg = this.getSvg()
        svg.call(this.zoom)
    }

    reset() {
        //this.mapPosition = null
        //this.tooltip.style("visibility", "hidden")
        this.fullView()
    }

    zoomed() {
        //this.tooltip.style("visibility", "hidden")
        const svg = this.getSvg()
        svg.selectAll("g").attr("transform", d3.event.transform)

    }


    zoomEnd() {
        const {editing,onZoomEnd} = this.props;

        const svg = this.getSvg()
        let t = d3.event.transform;
        onZoomEnd && onZoomEnd(d3.event.transform)
     //   svg.selectAll("g").attr("stroke-width", 8 / (this.zoom.scale()))

        this.mapPosition = {k: t.k, x: t.x, y: t.y}
        if (editing) {
            window.paren.postMessage({type: 'map', value: JSON.stringify({k: t.k, x: t.x, y: t.y})}, "*");
        }
    }

    zoomIn(e) {
        debugger;
        const svg = this.getSvg()
        svg.transition().call(this.zoom.scaleBy, 1.5)

    }

    getSvg() {
        const svg = d3.select(this.zoomRef.current.parentNode.getElementsByTagName('svg')[0])
        return svg
    }

    zoomOut() {
        const svg = this.getSvg()
        svg.transition().call(this.zoom.scaleBy, 0.6667)
    }

    fullView() {
        debugger;
        const {mapPosition, editing} = this.props
        this.centered = null
        this.zooming = false
        const svg = this.getSvg()

        if (mapPosition && !editing) {
            svg.transition()
                .duration(300)
                .call(this.zoom.transform,d3.zoomIdentity
                    .translate(mapPosition.x, mapPosition.y)
                    .scale(mapPosition.k))
        } else {

            svg.transition()
                .duration(500)
                .call(this.zoom.transform, d3.zoomIdentity
                    .translate(0, 0)
                    .scale(1))
        }
    }

    render() {
        const {editing, zoomEnabled = true} = this.props
        debugger;
        return <div ref={this.zoomRef} className="zoom control">
            {(editing || zoomEnabled) && <div>
                <div className="zoom button plus" onClick={this.zoomIn}><Icon name='plus' size='small'/></div>
                <div className="zoom button minus" onClick={this.zoomOut}><Icon name='minus' size='small'/></div>
                <Popup content={<FormattedMessage id="map.reset.tooltip" defaultMessage="Reset zoom"/>}
                       trigger={<div className="zoom button reset" onClick={this.reset}>
                           <Icon name='repeat' size='small'/></div>}/>
            </div>}

        </div>
    }
}


export default ZoomControl

