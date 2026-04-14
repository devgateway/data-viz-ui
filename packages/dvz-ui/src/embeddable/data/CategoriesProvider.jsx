import React from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl';
import { CategoriesContext } from './DataContext'
import { getCategories, loadFilterItems } from "../reducers/data";
import { Container, Segment } from '@devgateway/ui';

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
        const { app, parentSelectedItems, filters, source, store, params, csv, group, editing } = this.props

        if (prevProps.parentSelectedItems && parentSelectedItems && parentSelectedItems.length != prevProps.parentSelectedItems.length) {
            this.props.onReLoadItems(this.props)
        }


        if (filters != prevProps.filters ||
            JSON.stringify(params) != JSON.stringify(prevProps.params)
            || app != prevProps.app
            || prevProps.source != source
            || csv != prevProps.csv) {

            if (app === "csv") {
                this.props.onSetData({ app, csv, store, params, group })
            } else {
                if (editing) {
                    params.v = (Math.random() + 1).toString(36).substring(7)
                }
                this.setState({ showLoading: false })
                this.props.onLoadData(this.props)//this.props.onLoadData({app, source, store, params, group})
                setTimeout(this.checkLoadingTime, 100);
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

    const itemsJS = state.getIn([...path, 'items'])
    const items = itemsJS ? itemsJS.toJS() : []
    const selectedItems = state.getIn(['data', 'filters', app, group, param])

    const tmpFilterItems = items.filter(f => f.type == type)
    const filterItems = tmpFilterItems && tmpFilterItems.length > 0 ? tmpFilterItems[0].items : []
    const thisFilterSelection = []

    let parentItems = []
    let parentSelectedItems = []
    if (parentType) {

        parentItems = items.filter(f => f.type == parentType)
        parentSelectedItems = state.getIn(['data', 'filters', app, group, parentParam])
    }
    return {
        parentSelectedItems,
        selectedItems,
        items,
        parentItems,
        data: state.getIn([...path, 'items']),
        error: state.getIn([...path, 'error']),
        loading: state.getIn([...path, 'loading']),
    }
}

const mapActionCreators = {
    onLoadData: getCategories,
    onReLoadItems: loadFilterItems
};

export default connect(mapStateToProps, mapActionCreators)(injectIntl(DataProvider));
