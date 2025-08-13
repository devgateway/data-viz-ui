import React from 'react';
import * as d3 from 'd3';
import {Icon, Popup} from "semantic-ui-react";
import {FormattedMessage} from "react-intl";

class ZoomControl extends React.Component {
    constructor(props) {
        super(props);

        this.zoomRef = React.createRef();
        this.lastInternalZoom = null;
        this.lastUserTransform = null;

        this.zoomed = this.zoomed.bind(this);
        this.zoomEnd = this.zoomEnd.bind(this);
        this.zoomIn = this.zoomIn.bind(this);
        this.zoomOut = this.zoomOut.bind(this);
        this.reset = this.reset.bind(this);
        this.fullView = this.fullView.bind(this);
        this.transition2fullView = this.transition2fullView.bind(this);
        this._fullView = this._fullView.bind(this);

        this.initialized = false;

        this.zoom = d3.zoom()
            .scaleExtent([0.1, 300])
            .on("zoom", this.zoomed)
            .on("end", this.zoomEnd);
    }

    componentDidMount() {

        const {zoomEnabled = true} = this.props;
        const selection = this.getSelection();
        this._fullView(false)
        if (zoomEnabled) {

            if (!this.props.editing) {

                selection.on("dblclick.zoom", null);
                selection.on("dblclick", (event) => {
                    event.preventDefault();

                    selection.transition().duration(250).call(this.zoom.scaleBy, 1.5);
                });

                selection.on("wheel.zoom", null);
                selection.on("wheel", (event) => {

                    event.preventDefault();
                    const direction = event.deltaY > 0 ? 1 / 1.5 : 1.5;
                    selection.transition().duration(250).call(this.zoom.scaleBy, direction);
                });
                selection.call(this.zoom);
            } else {

            }
        }
        this.fullView();

    }

    componentDidUpdate(prevProps) {


        const selection = this.getSelection();
        const {
            zoomEnabled, initialPosition, readyState, height, width, selectedPoint, projection, editing
        } = this.props;


        if (!this.initialized && this.props.readyToZoom) {
            this.fullView();
            this.initialized = true;
        }

        const zoomChanged = JSON.stringify(prevProps.initialPosition) !== JSON.stringify(initialPosition);

        if (prevProps.zoomEnabled !== zoomEnabled || zoomChanged) {
            if (zoomEnabled && selection || editing) {
                if (initialPosition && this.lastInternalZoom) {
                    const round = (v, p = 3) => Number(v.toFixed(p));
                    const {x, y, k} = initialPosition;
                    const {x: lx, y: ly, k: lk} = this.lastInternalZoom;

                    const same = Math.abs(round(x) - round(lx)) < 1 && Math.abs(round(y) - round(ly)) < 1 && Math.abs(round(k) - round(lk)) < 1e-3;

                    if (same) {
                        this.lastInternalZoom = null;
                        return;
                    }
                }

                selection.call(this.zoom).on(".zoom", this.zoom);
                this.transition2fullView();
            } else if (selection) {
                selection.on(".zoom", null);
            }
        }

        if (!prevProps.readyState && readyState) {
            this.fullView();
        }

        if (prevProps.height !== height || prevProps.width !== width) {
            this.fullView();
        }

        if (selectedPoint != prevProps.selectedPoint && selectedPoint) {

            this.zoomTo(projection([selectedPoint.y, selectedPoint.x]))
        }
    }

    zoomed(event) {
        const selection = this.getSelection();
        if (selection) {
            selection.selectAll("g.zoomable").attr("transform", event.transform);
            this.props.onZoomed?.(event.transform);

            if (this.props.editing && event.sourceEvent) {
                this.lastUserTransform = event.transform;
            }
        }
    }

    zoomEnd(event) {
        const {identifier, editing, width, height, postMessageOrigin = "*"} = this.props;
        const transform = this.lastUserTransform || event.transform;
        this.lastUserTransform = null;

        this.props.onZoomed?.(transform);

        if (editing) {
            const round = (v, p = 3) => Number(v.toFixed(p));
            const {x, y, k} = transform;
            const rounded = {x: round(x), y: round(y), k: round(k)};

            this.lastInternalZoom = rounded;

            const payload = {
                type: `d3_map_${identifier}`, value: {
                    ...rounded, width, height
                }
            };

            // Post immediately, we trust it's now the final value from user
            window.parent.postMessage(payload, postMessageOrigin);
        }
    }

    zoomIn() {
        const selection = this.getSelection();
        if (selection) {
            const duration = this.props.editing ? 0 : (this.props.transitionDuration || 500);
            selection.transition().duration(duration).call(this.zoom.scaleBy, 2);
        }
    }

    zoomTo(xy) {

        const transform = d3.zoomIdentity
            .translate(this.props.width / 2, this.props.height / 2) // move center to middle of screen
            .scale(200) // your desired zoom level
            .translate(-xy[0], -xy[1]); // move point to center
        const selection = this.getSelection();
        const duration = this.props.editing ? 0 : (this.props.transitionDuration || 500);
        selection.transition()
            .duration(750)
            .call(this.zoom.transform, transform);
    }

    zoomOut() {
        const selection = this.getSelection();
        if (selection) {
            const duration = this.props.editing ? 0 : (this.props.transitionDuration || 500);
            selection.transition().duration(duration).call(this.zoom.scaleBy, 0.5);
        }
    }

    reset() {
        const selection = this.getSelection();
        if (selection) {
            if (this.props.editing) {
                selection.call(this.zoom.transform, d3.zoomIdentity.translate(0, 0).scale(1));
            } else {
                this.transition2fullView();
            }
        }
    }

    getSelection() {


        const selection = d3.select(this.zoomRef.current.parentNode.querySelector('svg'));
        return selection


    }

    _fullView(transition = true) {

        const {initialPosition, width, height, transform} = this.props;

        if (!initialPosition) return;

        const {x = 100, y = 23, k = 1, width: oW, height: oH} = initialPosition;
        if (!oW || !oH || !k) return;

        const dx = x / oW;
        const dy = y / oH;
        const nx = width * dx;
        const ny = height * dy;

        const selection = this.getSelection();
        if (selection) {
            //print svg parent client sizes before zoooming
            console.log("SVG parent client sizes:", selection.node().parentNode.clientWidth, selection.node().parentNode.clientHeight);

            selection.transition().duration(transition ? 750 : 0)
                .attr("transform", transform)
                .call(this.zoom.transform, d3.zoomIdentity.translate(x, y).scale(k));
        }
    }

    transition2fullView() {
        this._fullView(true);
    }

    fullView() {

        this._fullView(false);
    }

    render() {
        const {editing, zoomEnabled = true} = this.props;

        return (<div ref={this.zoomRef} className={`zoom ${zoomEnabled ? '' : 'disabled'}`}>
            {(editing || zoomEnabled) && (<div>
                <div className="button plus" onClick={this.zoomIn}>
                    <Icon name='plus' size='small'/>
                </div>
                <div className="button minus" onClick={this.zoomOut}>
                    <Icon name='minus' size='small'/>
                </div>
                <Popup
                    content={<FormattedMessage id="map.reset.tooltip" defaultMessage="Reset zoom"/>}
                    trigger={<div className="button reset" onClick={this.reset}>
                        <Icon name='repeat' size='small'/>
                    </div>}
                />
            </div>)}
        </div>);
    }
}

export default ZoomControl;
