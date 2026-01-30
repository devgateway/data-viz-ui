import React, { useRef } from "react";
import { Container } from "semantic-ui-react";
import { connect } from "react-redux";
import DataConsumer from "../data/DataConsumer";
import { setFilter, unsetFilter } from "../reducers/data";
import { parse } from "../utils/parseUtils";
import BigFilterDataProvider from './DataProvider'
import BigNumberGroup from "./BigNumberGroup";


const BigFilter = (props) => {
    const {
        editing = false,
        unique,
        intl,
        "data-csv": csv = "",
        "data-dimension1": dimension = "none",
        "data-dvz-proxy-dataset-id": dvzProxyDatasetId,
        "data-no-data-message": noDataMsg = "No data matches your selection",
        "data-view-mode": editMode = 'info',
        'data-height': height,
        'data-app': app,
        'data-measures': measures = '{}',
        'data-group': group,
        'data-parent': parent,
        'data-block-name': blockName,
        'data-filters': filters = '[]',
        'data-number-font-size': numberFontSize = 20,
        'data-label-font-size': labelFontSize = 20,
        'data-number-color': numberColor = '#000000',
        'data-label-color': labelColor = '#000000',
        'data-label': label = '',
        "data-wait-for-filters": waitForFilters = "false",
        "data-n-columns": nColumns = 4,
        "data-sort": sort = "alpha",
        "data-order": order = "asc",
        "data-show-zero-values": showZeroValues = "false",
        hasParentFilters,
        effectiveFilter,
        appliedFilters,
        onSetFilter,
        onUnSetFilter
    } = props

    const ref = useRef(null);

    const contentHeight = (editing ? height - 80 : height - 40)

    const params = { dvzProxyDatasetId }
    const ff = parse(filters) || {}

    if (ff && ff.forEach) {
        ff.forEach(f => {
            if (f.value != null && f.value.filter(v => v != null && v.toString().trim() != "").length > 0) params[f.param] = f.value
        })
    }


    const dimensions = []

    const writeGroup = group //where to write final filters
    const readGroup = parent ? parent : blockName + Math.random(0, 1) //were to read my linked filters
    const selfGroup = blockName //where to store my  state

    return (<div ref={ref}>
        <Container fluid={true} style={{ padding: '0px', margin: '0px', height: `${height}px` }}>
            {(!app || app === 'csv') && <p><h2>Big Filter:</h2><h4>Please select an API! </h4></p>}
            {(app !== 'csv' && dimension == 'none') && <p><h2>Big Filter:</h2><h4>Please select dimension! </h4></p>}
            {app && dimension != 'none' &&

                <BigFilterDataProvider
                    style={{ "height": `${contentHeight}px` }}
                    blockName={blockName}
                    params={params}
                    app={app}
                    useAncestor={true}
                    parent={parent}

                    editing={editing}
                    waitForFilters={waitForFilters === "true"}
                    store={[app, unique, ...dimensions]}
                    source={dimension}>

                    <DataConsumer noDataMessage={<h1>No data</h1>}>
                        <BigNumberGroup
                            nColumns={nColumns}
                            parent={parent}
                            sort={sort}
                            order={order}
                            showZeroValues={showZeroValues}
                            hasParentFilters={hasParentFilters}
                            onSetFilter={onSetFilter}
                            onUnSetFilter={onUnSetFilter}
                            appliedFilters={appliedFilters}
                            height={height}
                            intl={intl}
                            app={app}
                            group={group}
                            blockName={blockName}
                            measures={parse(measures)}
                            label={label}
                            numberFontSize={numberFontSize}
                            numberColor={numberColor}
                            labelFontSize={labelFontSize}
                            labelColor={labelColor}

                            dimension={dimension}>
                        </BigNumberGroup>
                    </DataConsumer>
                </BigFilterDataProvider>
            }
        </Container>
    </div >)

}

const mapStateToProps = (state, ownProps) => {
    const { "data-app": app, "data-group": group, "data-block-name": blockName, "data-parent": parent } = ownProps


    const writeGroup = group //where to write final filters
    const readGroup = parent ? parent : blockName + Math.random(0, 1) //were to read my linked filters
    const selfGroup = blockName //where to store my  state

    const currentFilter = state.getIn(['data', 'filters', app, selfGroup])

    const hasParentFilters = (parent && parent != "") && state.getIn(['data', 'filters', app, readGroup])
        && state.getIn(['data', 'filters', app, readGroup]).size > 0 ? true : false

    const effectiveFilter = state.getIn(['data', 'filters', app, writeGroup]) ? state.getIn(['data', 'filters', app, writeGroup]).toJS() : {}

    return {
        hasParentFilters,
        effectiveFilter,
        appliedFilters: currentFilter ? currentFilter.toJS() : null
    }

}
///setFilter = ({app, group, param, value, autoApply})
const mapActionCreators = {
    onSetFilter: setFilter,
    onUnSetFilter: unsetFilter
};
export default connect(mapStateToProps, mapActionCreators)(BigFilter)
