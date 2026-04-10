import React, { useEffect, useRef, useCallback } from 'react';
import * as d3 from 'd3';

/**
 * Available OpenMapTiles-compatible tile sources.
 * Each entry has an id (used in layer config), a label (shown in editor),
 * and a getTileUrl function that returns the URL for a given {x, y, z}.
 *
 * OpenStreetMap and Carto tiles are open and require no key.
 * Stamen tiles are hosted via Stadia and may require attribution.
 */
export const TILE_SOURCES = [
    {
        id: 'osm',
        label: 'OpenStreetMap',
        getTileUrl: ({ x, y, z }) =>
            `https://tile.openstreetmap.org/${z}/${x}/${y}.png`,
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
    {
        id: 'carto-light',
        label: 'Carto Positron (Light)',
        getTileUrl: ({ x, y, z }) =>
            `https://a.basemaps.cartocdn.com/light_all/${z}/${x}/${y}.png`,
        attribution:
            '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
    },
    {
        id: 'carto-dark',
        label: 'Carto Dark Matter',
        getTileUrl: ({ x, y, z }) =>
            `https://a.basemaps.cartocdn.com/dark_all/${z}/${x}/${y}.png`,
        attribution:
            '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
    },
    {
        id: 'carto-voyager',
        label: 'Carto Voyager',
        getTileUrl: ({ x, y, z }) =>
            `https://a.basemaps.cartocdn.com/rastertiles/voyager/${z}/${x}/${y}.png`,
        attribution:
            '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
    },
    {
        id: 'stadia-alidade-smooth',
        label: 'Stadia Alidade Smooth',
        getTileUrl: ({ x, y, z }) =>
            `https://tiles.stadiamaps.com/tiles/alidade_smooth/${z}/${x}/${y}.png`,
        attribution:
            '© <a href="https://stadiamaps.com/">Stadia Maps</a> © <a href="https://openmaptiles.org/">OpenMapTiles</a> © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
    {
        id: 'stadia-alidade-smooth-dark',
        label: 'Stadia Alidade Smooth Dark',
        getTileUrl: ({ x, y, z }) =>
            `https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/${z}/${x}/${y}.png`,
        attribution:
            '© <a href="https://stadiamaps.com/">Stadia Maps</a> © <a href="https://openmaptiles.org/">OpenMapTiles</a> © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
    {
        id: 'stadia-osm-bright',
        label: 'Stadia OSM Bright',
        getTileUrl: ({ x, y, z }) =>
            `https://tiles.stadiamaps.com/tiles/osm_bright/${z}/${x}/${y}.png`,
        attribution:
            '© <a href="https://stadiamaps.com/">Stadia Maps</a> © <a href="https://openmaptiles.org/">OpenMapTiles</a> © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
    {
        id: 'stadia-outdoors',
        label: 'Stadia Outdoors',
        getTileUrl: ({ x, y, z }) =>
            `https://tiles.stadiamaps.com/tiles/outdoors/${z}/${x}/${y}.png`,
        attribution:
            '© <a href="https://stadiamaps.com/">Stadia Maps</a> © <a href="https://openmaptiles.org/">OpenMapTiles</a> © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
    {
        id: 'esri-world-imagery',
        label: 'ESRI World Imagery (Satellite)',
        getTileUrl: ({ x, y, z }) =>
            `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${z}/${y}/${x}`,
        attribution: '© <a href="https://www.esri.com/">Esri</a>',
    },
    {
        id: 'esri-topo',
        label: 'ESRI World Topo Map',
        getTileUrl: ({ x, y, z }) =>
            `https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/${z}/${y}/${x}`,
        attribution: '© <a href="https://www.esri.com/">Esri</a>',
    },
];

const TILE_SIZE = 256;

/**
 * Given a D3 Mercator projection (already fitted to the container),
 * and an optional zoom transform (from d3.zoom), compute the set of
 * tiles that need to be rendered and their pixel positions.
 *
 * The algorithm:
 *  1. Compute the effective "scale" of the projection in tile space.
 *     D3's geoMercator uses a default scale of 961/τ ≈ 153 to fill a 960px world.
 *     The Web Mercator tile at zoom z covers 256*2^z px at d3 scale 256/τ*(2^z).
 *     So:  z = log2(projScale * τ / 256)
 *  2. The projection translate gives the pixel position of [0,0] (lon/lat).
 *  3. Apply the zoom transform on top.
 */
function getTilesForProjection(projection, transform, width, height) {
    if (!projection) return [];

    // Effective projection parameters after applying zoom transform
    const tau = 2 * Math.PI;

    // Base projection scale (d3 stores it as pixels per radian)
    const baseScale = projection.scale();
    // Base translate [tx, ty] — pixel coords of the map origin
    const [baseTx, baseTy] = projection.translate();

    // Apply zoom transform on top
    const k = transform ? transform.k : 1;
    const dx = transform ? transform.x : 0;
    const dy = transform ? transform.y : 0;

    const scale = baseScale * k;
    const tx = baseTx * k + dx;
    const ty = baseTy * k + dy;

    // Determine zoom level from scale
    // At zoom z, one tile covers 256 px at scale = 256/(2π) * 2^z
    // => z = log2(scale * 2π / 256)
    const zFloat = Math.log2((scale * tau) / TILE_SIZE);
    const z = Math.max(0, Math.min(20, Math.round(zFloat)));
    const zScale = Math.pow(2, z); // number of tiles along one axis at zoom z

    // In Web Mercator, the full world fits in [0,0] to [1,1] normalised coords.
    // At zoom z it's [0,0] to [zScale, zScale] in tile coords.
    // The d3 Mercator projection maps [lon=0, lat=0] to [tx, ty] in pixel space.
    // The world width in pixels at zoom z: TILE_SIZE * zScale
    // But our effective world width is scale * tau
    // So tile space origin in pixels = tx - scale * π  (lon -180° maps to x=0 tile)
    // Actually: lon=-180 in Mercator = x=0 tile
    // d3 geoMercator: x_pixel = scale * (lon_rad + π) + (tx - scale*π)
    //              => x_pixel = scale * lon_rad + tx
    // Tile space: tile_x = x_pixel / TILE_SIZE * (zScale / (scale*tau/TILE_SIZE))
    //           = x_pixel / (scale * tau / zScale)

    // Pixel position of tile (0,0) origin:
    // lon=-180 (= -π rad) → x_pixel = scale*(-π) + tx = tx - scale*π
    const worldOriginX = tx - scale * Math.PI;
    const worldOriginY = ty - scale * Math.PI; // lat=0 Mercator y

    // Tile pixel size at this zoom
    const tilePixelSize = (scale * tau) / zScale;

    // Viewport: [0,0] to [width, height]
    // First visible tile index
    const x0 = Math.floor(-worldOriginX / tilePixelSize);
    const y0 = Math.floor(-worldOriginY / tilePixelSize);
    // Last visible tile index
    const x1 = Math.ceil((width - worldOriginX) / tilePixelSize);
    const y1 = Math.ceil((height - worldOriginY) / tilePixelSize);

    const tiles = [];
    for (let tileX = x0; tileX < x1; tileX++) {
        for (let tileY = y0; tileY < y1; tileY++) {
            // Wrap tile X around the world
            const wrappedX = ((tileX % zScale) + zScale) % zScale;
            // Clamp tile Y
            if (tileY < 0 || tileY >= zScale) continue;

            const pixelX = worldOriginX + tileX * tilePixelSize;
            const pixelY = worldOriginY + tileY * tilePixelSize;

            tiles.push({
                x: wrappedX,
                y: tileY,
                z,
                pixelX,
                pixelY,
                size: tilePixelSize,
                key: `${z}/${wrappedX}/${tileY}`,
            });
        }
    }

    return tiles;
}

/**
 * TileBasemapLayer renders an absolutely-positioned <div> behind the SVG
 * that shows a raster tile basemap from an OpenMapTiles-compatible source.
 *
 * Props:
 *   - tileSource: one of the TILE_SOURCES ids (default: 'carto-light')
 *   - tileOpacity: 0–1 (default: 1)
 *   - projection: D3 projection object (injected by ProjectedContainer)
 *   - transform: D3 zoom transform (injected by ZoomControl via index.jsx)
 *   - width: container width in px
 *   - height: container height in px
 *   - visible: boolean
 *   - onReady: callback to signal readiness
 */
const TileBasemapLayer = ({
    tileSource = 'carto-light',
    tileOpacity = 1,
    projection,
    transform,
    width,
    height,
    visible = true,
    onReady,
}) => {
    const calledReady = useRef(false);

    // Signal readiness once
    useEffect(() => {
        if (!calledReady.current && onReady) {
            calledReady.current = true;
            onReady();
        }
    }, [onReady]);

    const source = TILE_SOURCES.find(s => s.id === tileSource) || TILE_SOURCES[0];

    if (!projection || !width || !height) return null;

    const tiles = getTilesForProjection(projection, transform, width, height);
    const attribution = source.attribution;

    return (
        <div
            className="tile-basemap-layer"
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: `${width}px`,
                height: `${height}px`,
                overflow: 'hidden',
                pointerEvents: 'none',
                opacity: visible ? tileOpacity : 0,
                zIndex: 0,
            }}
        >
            {tiles.map(tile => (
                <img
                    key={tile.key}
                    src={source.getTileUrl({ x: tile.x, y: tile.y, z: tile.z })}
                    alt=""
                    draggable={false}
                    style={{
                        position: 'absolute',
                        left: `${tile.pixelX}px`,
                        top: `${tile.pixelY}px`,
                        width: `${tile.size}px`,
                        height: `${tile.size}px`,
                        imageRendering: 'pixelated',
                        display: 'block',
                        border: 'none',
                        outline: 'none',
                    }}
                />
            ))}
            {attribution && (
                <div
                    style={{
                        position: 'absolute',
                        bottom: 4,
                        right: 4,
                        fontSize: '10px',
                        background: 'rgba(255,255,255,0.75)',
                        padding: '2px 4px',
                        borderRadius: 2,
                        pointerEvents: 'all',
                        lineHeight: 1.4,
                    }}
                    dangerouslySetInnerHTML={{ __html: attribution }}
                />
            )}
        </div>
    );
};

export default TileBasemapLayer;

