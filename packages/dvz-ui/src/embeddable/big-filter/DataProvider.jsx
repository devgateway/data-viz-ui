import React from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl';
import { Container, Dimmer, Loader, Segment } from "semantic-ui-react";
import DataContext from '../data/DataContext';
import { getData, setData } from '../reducers/data'
import debounce from 'lodash/debounce'


class BigFilterDataProvider extends React.Component {

    constructor(props) {
        super(props);
        this.debouncedLoadData = this.debouncedLoadData.bind(this)
        this.debounces = []

    }

    debouncedLoadData(time, args) {
        const db = debounce((args) => {
            this.props.onLoadData(args)
        }, time)
        this.debounces.push(db(args))
    }

    componentDidMount() {
        const { app, useAncestor, parent, source, store, params, csv, group, editing, waitForFilters = false } = this.props
        this.props.onLoadData({ app, source, store, params, group }) //read filters from read group
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        const { app, filters, useAncestor, parent, source, store, params, csv, group, editing } = this.props
        if (filters != prevProps.filters || JSON.stringify(params) != JSON.stringify(prevProps.params) || app != prevProps.app || JSON.stringify(prevProps.source) != JSON.stringify(source) || csv != prevProps.csv) {
            this.setState({ showLoading: true });

            this.debouncedLoadData(600, { app, source, store, params, group })
        }
    }



    componentWillUnmount() {
        debugger;
        this.debounces.forEach(d => {
            d ? d.canel() : d.canel()
        })
    }

    render() {
        const { data, style, loading, time, error, editing } = this.props
        return <DataContext.Provider value={data}>{this.props.children}</DataContext.Provider>
    }
}


const getParents = (state, parent, app) => {
    const parents = [parent]
    const settings = state.getIn(['data', 'filters-settings', app]) ? state.getIn(['data', 'filters-settings', app]).toJS() : null
    if (settings) {
        const parentSetting = settings[parent]
        if (parentSetting && parentSetting.parent) {

            parents.push(...getParents(state, parentSetting.parent, app))
        }
    }

    return parents
}


const mapStateToProps = (state, ownProps) => {
    const { store, readGroup, app, blockName, params, parent } = ownProps
    let newParams = { ...params }
    if (parent) {

        const parents = getParents(state, parent, app)

        parents.forEach(p => {

            const values = state.getIn(['data', 'filters', app, p])
            if (values && values.size > 0) {
                newParams = { ...newParams, ...values.toJS() }
            }
        })


    }



    return {
        params: newParams,
        data: state.getIn(['data', ...store, 'data']),
        filters: state.getIn(['data', 'filters', app, readGroup]),
        error: state.getIn(['data', ...store, 'error']),
        loading: state.getIn(['data', ...store, 'loading']),

    }
}

const mapActionCreators = {
    onSetData: setData, onLoadData: getData
};

export default connect(mapStateToProps, mapActionCreators)(injectIntl(BigFilterDataProvider));
