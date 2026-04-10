import React from 'react';
import * as d3 from 'd3';
import { createRoot } from 'react-dom/client';
import { injectIntl } from 'react-intl';
import DataProvider from '../data/D3MapDataProvider.jsx';
import DataConsumer from '../data/D3MapDataConsumer.jsx';
import { parse } from '../utils/index.js';
import GradientColors from './GradientColors.js';
import Tooltip from './Tooltip.jsx';

// ---------------------------------------------------------------------------
// Performance note:
//   ~24 k pixels per filter combination.  SVG <rect> handles this comfortably
//   because D3 zoom applies a single CSS transform to the parent <g> — no
//   per-pixel redraw on pan/zoom.  A full redraw only happens when the data or
//   projection changes.  Canvas would be faster for > ~100 k points, but for
//   this dataset SVG is the right choice so the layer integrates natively with
//   the existing zoom / tooltip / legend system.
// ---------------------------------------------------------------------------

const getFilters = (filters) => {
    const ff = parse(filters) || [];
    let params = {};
    if (ff && ff.forEach) {
        ff.forEach(f => {
            if (f.value != null && f.value.filter(v => v != null && v.toString().trim() !== '').length > 0)
                params[f.param] = f.value;
        });
    } else {
        params = ff;
    }
    return params;
};

// ---------------------------------------------------------------------------
// Core layer (receives data via DataConsumer)
// ---------------------------------------------------------------------------

class PixelLayerCore extends React.Component {

    constructor() {
        super();
        this.gRef = React.createRef();
        this.tooltipRoot = null;
        this.tooltipNode = null;

        this.create = this.create.bind(this);
        this.resize = this.resize.bind(this);
        this.showToolTip = this.showToolTip.bind(this);
        this.moveToolTip = this.moveToolTip.bind(this);
        this.hideToolTip = this.hideToolTip.bind(this);
        this.getActiveMeasure = this.getActiveMeasure.bind(this);
    }

    getActiveMeasure(props = this.props) {
        const { measures = [], selectedMeasure } = props;
        if (selectedMeasure && measures.includes(selectedMeasure)) return selectedMeasure;
        return measures[0];
    }

    showToolTip(content, data, color, event) {
        if (!data) return;
        d3.selectAll('.d3MapTooltip').remove();
        const tip = d3.select('body').append('div')
            .attr('class', 'd3MapTooltip')
            .style('position', 'absolute')
            .style('z-index', '9999')
            .html('')
            .style('left', (event.pageX + 15) + 'px')
            .style('top', (event.pageY - 50) + 'px');

        this.tooltipNode = tip._groups[0][0];
        this.tooltipRoot = createRoot(this.tooltipNode);
        this.tooltipRoot.render(
            <Tooltip intl={this.props.intl} tooltip={content} data={data} tooltipEnableMarkdown={false} />
        );
    }

    moveToolTip(event) {
        d3.select('.d3MapTooltip')
            .style('left', (event.pageX + 15) + 'px')
            .style('top', (event.pageY - 50) + 'px');
    }

    hideToolTip() {
        if (this.tooltipRoot) {
            // Unmount asynchronously to avoid React warning
            const root = this.tooltipRoot;
            setTimeout(() => root.unmount(), 0);
            this.tooltipRoot = null;
            this.tooltipNode = null;
        }
        d3.selectAll('.d3MapTooltip').remove();
    }

    /**
     * Compute the pixel half-size in projected coordinates.
     *
     * Strategy: project two points that are `pixelSizeDeg` apart in longitude
     * at the centre of the data bounding box and use the pixel distance between
     * them as the rect half-width.  This is correct for Mercator-like projections.
     *
     * Falls back to a safe default (2 px) when the projection is not yet ready.
     */
    computePixelHalfSize(points) {
        const { projection, pixelSizeDeg = 0.05 } = this.props;
        if (!projection || points.length === 0) return 2;

        // Use the median latitude for the reference point
        const midLat = points[Math.floor(points.length / 2)].lat;
        const midLon = points[Math.floor(points.length / 2)].lon;

        const p1 = projection([midLon, midLat]);
        const p2 = projection([midLon + pixelSizeDeg, midLat]);
        if (!p1 || !p2) return 2;

        return Math.abs(p2[0] - p1[0]) / 2;
    }

    create() {
        const {
            data,
            projection,
            transform,
            tooltip = '{value}',
            gradientScheme = 'greens',
            gradientReverse = false,
            gradientStartColor,
            gradientEndColor,
            fillColor = '#cccccc',
            opacity = 0.8,
            visible = true,
            id,
        } = this.props;

        if (!this.gRef || !this.gRef.current || !projection) return;

        const activeMeasure = this.getActiveMeasure();

        // The API returns a 2-level nested tree:
        //   data.children[]  → lat nodes  { value: "lat_str", children: [...] }
        //     .children[]    → lon nodes  { value: "lon_str", [measure]: val }
        // We flatten this into a simple points array.
        let points = [];
        if (data && data.children) {
            data.children.forEach(latNode => {
                const lat = parseFloat(latNode.value);
                if (isNaN(lat)) return;

                const lonNodes = latNode.children || [];
                lonNodes.forEach(lonNode => {
                    const lon = parseFloat(lonNode.value);
                    const value = lonNode[activeMeasure] != null ? parseFloat(lonNode[activeMeasure]) : null;
                    if (!isNaN(lon) && value != null && !isNaN(value)) {
                        points.push({ lat, lon, value, meta: lonNode });
                    }
                });
            });
        }

        // Build gradient colour scale over the actual value domain
        const gradientColors = new GradientColors({
            data: points.map(p => ({ [activeMeasure]: p.value })),
            measure: activeMeasure,
            defaultFillColor: fillColor,
            gradientScheme,
            gradientReverse,
            gradientStartColor,
            gradientEndColor,
        });

        const halfSize = this.computePixelHalfSize(points);

        const g = d3.select(this.gRef.current);
        g.attr('class', `pixel-layer zoomable ${id}`);
        g.selectAll('.pixel-rect').remove();

        if (transform) g.attr('transform', transform);

        g.selectAll('.pixel-rect')
            .data(points)
            .enter()
            .append('rect')
            .attr('class', 'pixel-rect')
            .attr('x', d => {
                const px = projection([d.lon, d.lat]);
                return px ? px[0] - halfSize : 0;
            })
            .attr('y', d => {
                const px = projection([d.lon, d.lat]);
                return px ? px[1] - halfSize : 0;
            })
            .attr('width', halfSize * 2)
            .attr('height', halfSize * 2)
            .attr('fill', d => gradientColors.getColor(d.value))
            .attr('fill-opacity', opacity)
            .attr('stroke', 'none')
            .style('vector-effect', 'non-scaling-stroke')
            .style('display', visible ? null : 'none')
            .on('mouseenter', (event, d) => {
                const tooltipData = {
                    value: d.value,
                    lat: d.lat,
                    lon: d.lon,
                    meta: { value: d.value, ...d.meta },
                };
                this.showToolTip(tooltip, tooltipData, gradientColors.getColor(d.value), event);
            })
            .on('mousemove', (event) => {
                this.moveToolTip(event);
            })
            .on('mouseleave', () => {
                this.hideToolTip();
            });

        if (this.props.onReady) this.props.onReady();
    }

    resize() {
        const { transform } = this.props;
        if (!this.gRef || !this.gRef.current) return;
        const g = d3.select(this.gRef.current);
        if (transform) g.attr('transform', transform);
    }

    componentDidMount() {
        // Apply initial transform if available
        const { transform, initialPosition, width, height } = this.props;
        if (this.gRef.current && initialPosition) {
            if (initialPosition.width) {
                const { x, y, k, width: oW, height: oH } = initialPosition;
                const nx = x + (width - oW) / 2 * (1 - k);
                const ny = y + (height - oH) / 2 * (1 - k);
                d3.select(this.gRef.current).attr('transform', `translate(${nx},${ny}) scale(${k})`);
            } else {
                d3.select(this.gRef.current).attr('transform',
                    `translate(${initialPosition.x},${initialPosition.y}) scale(${initialPosition.k})`);
            }
        }
        this.create();
    }

    componentDidUpdate(prevProps) {
        const dataChanged = prevProps.data !== this.props.data;
        const projectionChanged = prevProps.path !== this.props.path; // path is recreated on resize
        const measureChanged = prevProps.selectedMeasure !== this.props.selectedMeasure;
        const visibilityChanged = prevProps.visible !== this.props.visible;

        if (dataChanged || projectionChanged || measureChanged) {
            this.create();
        } else if (visibilityChanged) {
            if (this.gRef && this.gRef.current) {
                d3.select(this.gRef.current)
                    .style('display', this.props.visible ? null : 'none');
            }
        } else {
            this.resize();
        }
    }

    componentWillUnmount() {
        this.hideToolTip();
    }

    render() {
        const { id } = this.props;
        return <g id={`pixel-${id}`} ref={this.gRef} />;
    }
}

// ---------------------------------------------------------------------------
// Wrapper: wires DataProvider + DataConsumer, same pattern as DataLayer
// ---------------------------------------------------------------------------

const PixelLayer = (props) => {
    const {
        id,
        unique,
        filters,
        app,
        group = 'default',
        latField = 'lat',
        lonField = 'lon',
        editing,
        dvzProxyDatasetId,
        waitForFilters,
    } = props;

    const params = getFilters(filters);

    if (dvzProxyDatasetId) {
        params.dvzProxyDatasetId = dvzProxyDatasetId;
    }

    // The API source should return rows with lat, lon, and the measure columns.
    // We request lat and lon as the "join" dimensions so they are included.
    const source = `${latField}/${lonField}`;

    return (
        <DataProvider
            editing={editing}
            params={params}
            waitForFilters={waitForFilters}
            app={app}
            csv={''}
            group={group}
            ignoreErrors={true}
            isSvg={true}
            store={[app, unique, id]}
            mySelf="Pixel layer"
            source={source}
        >
            <DataConsumer>
                <PixelLayerCore {...props} />
            </DataConsumer>
        </DataProvider>
    );
};

export default injectIntl(PixelLayer);

