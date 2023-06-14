import React, {useEffect} from 'react';
import {connect} from "react-redux";
import * as d3 from 'd3' // d3 plugin
import * as topojson from "topojson-client";
import {Icon, Popup} from "semantic-ui-react";
import {FormattedMessage} from "react-intl";


class ZoomControl extends React.Component {


    constructor(props) {
        super(props);

        this.zooming = false

        this.zoomEnd = this.zoomEnd.bind(this)

        this.zoomed = this.zoomed.bind(this)
        this.zoomIn = this.zoomIn.bind(this)
        this.zoomOut = this.zoomOut.bind(this)

        this.reset = this.reset.bind(this)


        this.fullView = this.fullView.bind(this)
        this.transition2fullView = this.transition2fullView.bind(this)

        this._fullView = this._fullView.bind(this)

        this.zoomRef = React.createRef();
        this.zoom = d3.zoom().scaleExtent([0, 200])
            .on("zoom", this.zoomed)
            .on("end", this.zoomEnd);


    }

    componentDidMount() {
        const {editing} = this.props
        const svg = this.getSvg()
        svg.call(this.zoom)

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!prevProps.readyState && this.props.readyState) {
            this.fullView()
        }
    }

    reset() {

        this.transition2fullView()
    }

    zoomed() {
        const svg = this.getSvg()
        svg.selectAll("g").attr("transform", d3.event.transform)
    }


    /*Button Zoom in*/
    zoomIn(e) {
        const svg = this.getSvg()
        svg.transition().call(this.zoom.scaleBy, 1.5)
    }

    /*Button zoom oit*/
    zoomOut() {
        const svg = this.getSvg()
        svg.transition().call(this.zoom.scaleBy, 0.6667)
    }

    getSvg() {
        const svg = d3.select(this.zoomRef.current.parentNode.getElementsByTagName('svg')[0])
        return svg
    }


    _fullView(transition = true) {
        const {editing, initialPosition: {x = 100, y = 23, k = 1, width: oW, height: oH}, width, height} = this.props

        const ratio = Math.min(width / oW, height / oH);

        const dx = x / oW, dy = y / oH
        const nx = width * dx, ny = height * dy

        const scaledPosition = {
            x: x * ratio,
            y: y * ratio,
            k: k
        };
        const offset = {
            x: (width - oW * ratio) / 2,
            y: (height - oH * ratio) / 2
        };

        const finalPosition = {
            x: scaledPosition.x +offset.x ,
            y: scaledPosition.y +offset.y,
            k: scaledPosition.k
        };

        const svg = this.getSvg()


        if (transition) {
            svg.transition().call(this.zoom.transform, d3.zoomIdentity
                .translate(nx , ny)
                .scale(k))
        } else {
            svg.call(this.zoom.transform, d3.zoomIdentity
                .translate(nx, ny)
                .scale(k))
        }
    }

    transition2fullView() {
        this._fullView(true)
    }

    fullView() {
        this._fullView(false)
    }

    zoomEnd() {
        const {editing, width, height} = this.props
        if (editing) {
            const {x, y, k} = d3.event.transform
            
            window.parent.postMessage({type: 'd3map', value: ({k, x, y, width, height})}, "*");
        }
    }

    render() {
        const {editing, zoomEnabled = true} = this.props
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

