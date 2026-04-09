import React from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl';
import { CategoriesContext } from './DataContext'
import { getCategories, loadFilterItems, setData } from "../reducers/data";
import { Container, Segment } from "semantic-ui-react";

const MemoizedCategoriesContextProvider = ({ data, children }) => {
    const dataValue = React.useMemo(() => (data ? data.toJS() : null), [data])

    return <CategoriesContext.Provider value={dataValue}>{children}</CategoriesContext.Provider>
}


class DataProvider extends React.Component {

    componentDidMount() {
        const { categories } = this.props
        if (!categories && !this.props.loading) {
            this.props.onLoadData(this.props)
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { app, filters, parentSelectedItems, params, source, csv, store, group } = this.props

        if (prevProps.parentSelectedItems && parentSelectedItems && parentSelectedItems.length != prevProps.parentSelectedItems.length) {
            this.props.onReLoadItems(this.props)
        }

        // For CSV apps, filter selection changes require re-processing the in-memory data.
        // For API apps, filter selections do not change the available category options —
        // only structural source changes (params, app, source, csv) warrant a reload.
        const csvFiltersChanged = app === "csv" && filters != prevProps.filters;

        if (csvFiltersChanged
            || JSON.stringify(params) != JSON.stringify(prevProps.params)
            || app != prevProps.app
            || prevProps.source != source
            || csv != prevProps.csv) {

            if (app === "csv") {
                this.props.onSetData({ app, csv, store, params, group })
            } else {
                this.props.onLoadData(this.props)
            }
        }
    }

    render() {
        const { data, loading, error } = this.props

        if (loading) {
            return (
                <Container>
                    <div className="filter-skeleton-placeholder">
                        <div className="filter-skeleton-shimmer" />
                    </div>
                </Container>
            )
        }


        if (data) {
            // return <CategoriesContext.Provider value={data.toJS()}>{this.props.children}</CategoriesContext.Provider>
            return <MemoizedCategoriesContextProvider data={data}>{this.props.children}</MemoizedCategoriesContextProvider>
        } else if (error) {
            return <Segment color={"red"}>
                <h1>500</h1>
                <p>Wasn't able to load data</p>
            </Segment>
        } else {
            return <Container>
                <Segment color={"red"}>
                    <h1>404</h1>
                    <p>Can't find this page</p>
                </Segment>
            </Container>
        }

        return null
    }
}

const mapStateToProps = (state, ownProps) => {

    const { app, group, type, parentType, param, parentParam, params, dvzProxyDatasetId, uniqueStorage } = ownProps

    const path = ['data', 'categories', app]
    if (dvzProxyDatasetId) {
        path.push(dvzProxyDatasetId)
    }
    if (uniqueStorage) {
        path.push(uniqueStorage)
    }

    // Avoid calling .toJS() here — it creates a new object reference on every Redux
    // dispatch and causes unnecessary re-renders. The Immutable `data` reference only
    // changes when categories actually load new data from the API.
    const selectedItems = state.getIn(['data', 'filters', app, group, param])
    const filters = state.getIn(['data', 'filters', app, group])

    let parentSelectedItems
    if (parentType) {
        parentSelectedItems = state.getIn(['data', 'filters', app, group, parentParam])
    }

    return {
        parentSelectedItems,
        selectedItems,
        filters,
        data: state.getIn([...path, 'items']),
        error: state.getIn([...path, 'error']),
        loading: state.getIn([...path, 'loading']),
    }
}

const mapActionCreators = {
    onLoadData: getCategories,
    onReLoadItems: loadFilterItems,
    onSetData: setData
};

export default connect(mapStateToProps, mapActionCreators)(injectIntl(DataProvider));
