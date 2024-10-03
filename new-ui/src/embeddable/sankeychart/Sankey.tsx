import React, { useState } from 'react'
import { ResponsiveSankey } from '@nivo/sankey'
import { injectIntl } from 'react-intl';
import Tooltip from "../common/ChartTooltip";

const Chart = (props) => {
  const {
    marginLeft,
    marginTop,
    marginRight,
    marginBottom,
    options,
    intl,
    format,
    colors,
    height,
    showLegends,
    tickColor,
    colorGenerator,
    legendLabel,
    legendCheckBack,
    legendLabelBack,
    legendLabelColor,
    reverseLegend,

    measures,
    dimension1,
    dimension2,
    dimension3,
    mode,
    app,
    tooltipHTML,
    tooltip,
    filters,
    layout,
    group,
    noDataMessage,
    tooltipEnabled,
    tooltipEnableMarkdown,

    sort,
    nodeThickness,
    nodeOpacity,
    nodeHoverOpacity,
    nodeInnerPadding,
    nodeSpacing,
    nodeHoverOthersOpacity,
    nodeBorderWidth,
    nodeBorderRadius,
    linkOpacity,
    linkHoverOpacity,
    linkHoverOthersOpacity,
    linkContract,
    enableLinkGradient,
    enableLabels,
    labelPosition,
    labelPadding,
    useCustomLabelColor,
    labelTextColor,
    labelOrientation,
    legendPosition,
    useLabelBackground,
    useCheckBoxBackground
  } = props
  const [filter, setFilter] = useState<any[]>([])

  const toggle = (id) => {
    const newFilter: any[] = filter.slice();
    if (newFilter.indexOf(id) > -1) {
      const index = newFilter.indexOf(id);
      newFilter.splice(index, 1);
    } else {
      newFilter.push(id)
    }
    setFilter(newFilter)
  }

  const margins = { top: marginTop, right: marginRight, bottom: marginBottom, left: marginLeft }

  const legendTitle = () => {
    return (<>{showLegends && legendLabel &&
      <div className={"legend item"}>
        <label className="legend-title">{legendLabel}</label>
      </div>
    }</>)
  }

  const legendItems = () => {
    const chartLegends = props.options.data.nodes.slice()
    if (reverseLegend) {
      chartLegends.reverse()
    }
    return (<>
      {showLegends && chartLegends.map(legend => {
        const legendEnabled = filter.indexOf(legend.id) == -1
        return (
          <div className={`legend item ${legendEnabled ? "" : "ignore"}`} onClick={() => toggle(legend.id)}>
            {useCheckBoxBackground && <input className={legendEnabled ? "" : "ignore"} type='checkbox'
              checked={legendEnabled}
              style={{
                backgroundColor: legend.color,
                color: "#000"
              }} />
            }
            {!useCheckBoxBackground && <input type='checkbox'
              checked={legendEnabled}
              style={{
                color: "#000"
              }} />}
            {useCheckBoxBackground && <span className={'checkmark-with-bg'}
              style={{ backgroundColor: legend.color }}></span>}
            {!useCheckBoxBackground && <span className={'checkmark'}></span>}
            {useLabelBackground && <label className={legendEnabled ? "" : "ignore"}
              style={{
                backgroundColor: legend.color,
                color: legendLabelColor
              }}>{legend.id}</label>}
            {!useLabelBackground && <label className={legendEnabled ? "" : "ignore"}
              style={{
                color: legendLabelColor
              }}>{legend.id}</label>}
          </div>)
      })}


    </>)
  }

  let filteredData = { nodes: [], links: [] }

  if (props.options.data && props.options.data.nodes && props.options.data.nodes.length) {
    const { links, nodes } = props.options.data
    nodes.forEach(node => {
      node.color = colorGenerator.getColor(node.id)
    })
    const filteredLinks = links.filter(l => filter.indexOf(l.source) == -1 && filter.indexOf(l.target) == -1) || []
    const filteredNodes = nodes.filter(n => filter.indexOf(n.id) == -1 && filteredLinks.find(fl => fl.source == n.id || fl.target == n.id))
    filteredData = {
      links: filteredLinks,
      nodes: filteredNodes
    }
  }

  return (
    <div style={{ height: height }}>
      <>
        {(filteredData.nodes.length && filteredData.links.length) ?
          <ResponsiveSankey
            data={filteredData}
            margin={margins}
            layout={layout}
            align="justify"
            sort={sort}
            colors={{ datum: 'color' }}
            nodeOpacity={nodeOpacity}
            nodeHoverOthersOpacity={nodeHoverOthersOpacity}
            nodeThickness={nodeThickness}
            nodeSpacing={nodeSpacing}
            nodeBorderWidth={nodeBorderWidth}
            nodeBorderColor={{
              from: 'color',
              modifiers: [
                [
                  'darker',
                  0.8
                ]
              ]
            }}
            linkTooltip={(d) => {
              if (tooltipEnabled && tooltip && tooltip.trim().length > 0) {
                // @ts-ignore
                return (<Tooltip intl={intl} format={format} d={d} tooltip={tooltip} tooltipEnableMarkdown={tooltipEnableMarkdown} />)
              }
              return null
            }}
            enableLabels={enableLabels}
            linkHoverOpacity={linkHoverOpacity}
            nodeHoverOpacity={nodeHoverOpacity}
            nodeInnerPadding={nodeInnerPadding}
            nodeBorderRadius={nodeBorderRadius}
            linkOpacity={linkOpacity}
            linkHoverOthersOpacity={linkHoverOthersOpacity}
            linkContract={linkContract}
            enableLinkGradient={enableLinkGradient}
            labelPosition={labelPosition}
            labelOrientation={labelOrientation}
            labelPadding={labelPadding}
            labelTextColor={useCustomLabelColor ? labelTextColor :
              {
                from: 'color',
                modifiers: [
                  [
                    'darker',
                    1
                  ]
                ]
              }}
          />
          :
          <></>
        }
        {(legendPosition == 'top' || legendPosition == 'bottom') &&
          <div className={`legends container has-standard-12-font-size  ${legendPosition}`}>
            <div className="legend-sections">
              <div className="title-section">
                {legendTitle()}
              </div>
              <div className={`legends container has-standard-12-font-size items-section`}>
                {legendItems()}
              </div>
            </div>
          </div>}


        {(legendPosition == 'right' || legendPosition == 'left') &&
          <div className={`legends container has-standard-12-font-size  ${legendPosition}`}>
            {legendTitle()}
            {legendItems()}
          </div>}


      </>

    </div>)

}

export default injectIntl(Chart)
