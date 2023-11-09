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
        this.zoomstarted = this.zoomStarted.bind(this)
        this.zoomEnd = this.zoomEnd.bind(this)
        this.zoomed = this.zoomed.bind(this)
        this.zoomIn = this.zoomIn.bind(this)
        this.zoomOut = this.zoomOut.bind(this)
        this.reset = this.reset.bind(this)
        this.fullView = this.fullView.bind(this)
        this.transition2fullView = this.transition2fullView.bind(this)
        this._fullView = this._fullView.bind(this)
        this.zoomRef = React.createRef();
        this.zoom = d3.zoom().scaleExtent([0, 300])
            .on("start", this.zoomStarted)
            .on("zoom", this.zoomed)
            .on("end", this.zoomEnd);

    }

    componentDidMount() {
        const {zoomEnabled = true, rotationEnabled} = this.props
        const selection = this.getSelection()
        debugger;
        if (selection) {

            if (zoomEnabled) {
                selection.call(this.zoom)
                this.transition2fullView()
            }
            if (rotationEnabled) {

            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const selection = this.getSelection()
        if (prevProps.zoomEnabled != this.props.zoomEnabled) {
            if (this.props.zoomEnabled) {
                if (selection) {

                    selection.call(this.zoom)
                    selection.on(".zoom", this.zoom)
                    this.transition2fullView()
                }
            } else {
                if (selection) {
                    selection.on(".zoom", null)
                }
            }
        }


        if (!prevProps.readyState && this.props.readyState) {
            this.fullView()
        }

        if (prevProps.height !== this.props.height || prevProps.width !== this.props.width) {
            this.fullView()
        }

    }

    reset() {
        const {
            editing,
        } = this.props
        if (editing) {
            const selection = this.getSelection()
            if (selection) {
                selection.call(this.zoom.transform, d3.zoomIdentity
                    .translate(0, 0)
                    .scale(1)
                )
            }
        } else {
            this.transition2fullView()
        }

    }


    zoomStarted() {

    }

    zoomed() {
        //selection.selectAll("g").attr("transform", d3.event.transform)
        this.props.onZoomed(d3.event.transform)

    }


    /*Button Zoom in*/
    zoomIn(e) {
        const selection = this.getSelection()
        if (selection) {
            selection.transition().call(this.zoom.scaleBy, 1.5)
        }
    }

    /*Button zoom oit*/
    zoomOut() {
        const selection = this.getSelection()
        if (selection) {
            selection.transition().call(this.zoom.scaleBy, 0.6667)
        }

    }

    getSelection() {
        const selection = this.zoomRef.current ? d3.select(this.zoomRef.current.parentNode.getElementsByTagName('svg')[0]) : null
        return selection
    }


    _fullView(transition = true) {
        const {editing, initialPosition: {x = 100, y = 23, k = 1, width: oW, height: oH}, width, height} = this.props
        const selection = this.getSelection()
        const dx = x / oW
        const dy = y / oH
        const nx = width * dx
        const ny = height * dy
        if (oH && oW && k && selection) {
            selection.transition().call(this.zoom.transform, d3.zoomIdentity
                .translate(x, y)
                .scale(k)
            )
        }


    }

    transition2fullView() {
        this._fullView(true)
    }

    fullView() {
        this._fullView(false)
    }

    zoomEnd() {
        const {group, editing, width, height} = this.props
        if (editing) {
            const {x, y, k} = d3.event.transform
            window.parent.postMessage({type: `d3_map_${group}`, value: ({k, x, y, width, height})}, "*");
        }
    }

    render() {
        const {editing, zoomEnabled = true} = this.props


        return <div ref={this.zoomRef} className={`zoom ${zoomEnabled ? '' : 'disabled'}`}>
            {(editing || zoomEnabled) && <div>
                <div className=" button plus" onClick={this.zoomIn}><Icon name='plus' size='small'/></div>
                <div className=" button minus" onClick={this.zoomOut}><Icon name='minus' size='small'/></div>
                <Popup content={<FormattedMessage id="map.reset.tooltip" defaultMessage="Reset zoom"/>}
                       trigger={<div className="button reset" onClick={this.reset}>
                           <Icon name='repeat' size='small'/></div>}/>
            </div>}

        </div>
    }
}


export default ZoomControl

