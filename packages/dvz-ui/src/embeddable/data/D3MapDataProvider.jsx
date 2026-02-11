import React from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl';
import { DataContext } from './DataContext'
import { getData, setData } from "../reducers/data";
import { Container, Dimmer, Loader, Segment } from "semantic-ui-react";
import debounce from 'lodash/debounce'

class DataProvider extends React.Component {

    constructor() {
        super();
        this.state = {
            showLoading: false
        }
        this.checkLoadingTime = this.checkLoadingTime.bind(this)
        this.debounces = []

    }


    debouncedLoadData(time, args) {
        const db = debounce((args) => {

            console.log(`🔄 [DataProvider] Debounced load triggered (${time}ms delay)`, {
                args,
                timestamp: new Date().toISOString()
            })
            this.setState({ showLoading: false })
            this.props.onLoadData(args)
            this.dataLoaded = true
            this.checkLoadingTime = this.checkLoadingTime.bind(this)
            setTimeout(this.checkLoadingTime, 0)
        }, time)

        this.debounces.push(db(args))
    }


    componentDidMount() {
        const { app, source, store, params, csv, group, editing, waitForFilters = false } = this.props

        if (app === "csv") {
            this.props.onSetData({ app, csv, store, params, group })
        } else {
            if (editing) {
                // params.v = (Math.random() + 1).toString(36).substring(7)
            }

            this.setState({ showLoading: false })
            if (!waitForFilters || editing) {
                console.log('📥 [DataProvider] Initial data load triggered', {
                    app,
                    source,
                    store,
                    params,
                    group,
                    waitForFilters,
                    editing,
                    timestamp: new Date().toISOString()
                })
                this.props.onLoadData({ app, source, store, params, group })
                setTimeout(this.checkLoadingTime, 100);
            } else {
                console.log('⏳ [DataProvider] Waiting for filters before loading data', {
                    app,
                    source,
                    store,
                    params,
                    group,
                    waitForFilters,
                    timestamp: new Date().toISOString()
                })
            }
        }
        if (!editing && waitForFilters) {
            this.fallbackTimeout = setTimeout(() => {
                if (!this.dataLoaded) {
                    console.warn('⚠️ [DataProvider] Fallback loading triggered - filters took too long', {
                        app,
                        source,
                        store,
                        params,
                        group,
                        dataLoaded: this.dataLoaded,
                        timestamp: new Date().toISOString()
                    });
                    this.setState({ showLoading: false });
                    this.props.onLoadData({ app, source, store, params, group });
                    setTimeout(this.checkLoadingTime, 100);
                }
            }, 1000); // You can adjust this delay
        }


    }

    componentWillUnmount() {
        clearTimeout(this.fallbackTimeout);
        clearTimeout(this.debounceTimeout);
        this.debounces.forEach(d => d ? d.cancel() : null)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {
            app,
            filters,
            apply,
            source,
            store,
            params,
            csv,
            group,
            autoApply,
            editing,
            lastInitialFilterChange,
            lastUserFilterChange
        } = this.props

        const initialChanged = lastInitialFilterChange !== prevProps.lastInitialFilterChange;
        const userChanged = lastUserFilterChange !== prevProps.lastUserFilterChange;


        //
        //log filters

        const timeOut = true

        let doApply = false


        if (apply !== undefined && apply !== null && apply != prevProps.apply) {
            doApply = true;
        }

        if (autoApply !== false) {
            if (filters != prevProps.filters || JSON.stringify(params) != JSON.stringify(prevProps.params)
                || app != prevProps.app
                || JSON.stringify(prevProps.source) != JSON.stringify(source)
                || csv != prevProps.csv) {


                if (app === "csv") {
                    this.props.onSetData({ app, csv, store, params, group })
                } else {

                    this.setState({ showLoading: true });
                    if (editing) {
                        this.props.onLoadData({ app, source, store, params, group })
                    }

                    if (initialChanged && this.props.waitForFilters) { //if this timestamp is different, it means that the initial filters still on initial setup


                        // console.log("initial filters updated", filters, params);
                        clearTimeout(this.debounceTimeout);
                        clearTimeout(this.fallbackTimeout); // Cancel fallback because actual trigger happened


                        this.debounceTimeout = setTimeout(() => {
                            this.dataLoaded = true;
                            this.setState({ showLoading: false });
                            console.log('🔄 [DataProvider] Loading data after initial filter setup', {
                                app,
                                source,
                                store,
                                params,
                                group,
                                filters,
                                debounceDelay: '100ms',
                                timestamp: new Date().toISOString()
                            })
                            this.props.onLoadData({ app, source, store, params, group })
                            setTimeout(this.checkLoadingTime, 100);
                        }, 100);

                    } else if (userChanged) {
                        console.log('🔧 [DataProvider] User filter change detected', {
                            currentFilters: filters,
                            previousFilters: prevProps.filters,
                            currentParams: params,
                            previousParams: prevProps.params,
                            app,
                            source,
                            store,
                            group,
                            debounceDelay: '400ms',
                            timestamp: new Date().toISOString()
                        })
                        this.setState({ showLoading: false })

                        this.debouncedLoadData(400, { app, source, store, params, group })
                        setTimeout(this.checkLoadingTime, 100);
                    } else {
                        console.log('ℹ️ [DataProvider] Component updated but no filter changes detected', {
                            initialChanged,
                            userChanged,
                            waitForFilters: this.props.waitForFilters,
                            timestamp: new Date().toISOString()
                        })
                    }


                }

            }

        } else if (doApply) {
            console.log('🔄 [DataProvider] Manual reload triggered (apply button)', {
                app,
                source,
                store,
                params,
                group,
                apply,
                previousApply: prevProps.apply,
                timestamp: new Date().toISOString()
            })
            this.props.onLoadData({ app, source, store, params, group })
            this.setState({ showLoading: false })
            setTimeout(this.checkLoadingTime, 100);
        }


    }


    checkLoadingTime() {
        const { data, loading, time, error, verbose = true } = this.props
        const loadingTime = Date.now() - time

        if (loading && time && loadingTime > 1000) {
            this.setState({ showLoading: true })
        } else if (loading) {
            setTimeout(this.checkLoadingTime, 100);
        }
    }


    render() {
        const { data, } = this.props

        return <DataContext.Provider value={data}>{this.props.children}</DataContext.Provider>

    }
}

const mapStateToProps = (state, ownProps) => {
    const { store, group, app } = ownProps


    return {
        lastUserFilterChange: state.getIn(['data', 'filters-settings', app, group, 'lastUserFilterChange']),
        lastInitialFilterChange: state.getIn(['data', 'filters-settings', app, group, 'lastInitialFilterChange']),
        data: state.getIn(['data', ...store, 'data']),
        filters: state.getIn(['data', 'filters', app, group]),
        autoApply: state.getIn(['data', 'filters-settings', app, group, "autoApply"]),
        apply: state.getIn(['data', 'filters-settings', app, group, "apply"]),
        error: state.getIn(['data', ...store, 'error']),
        loading: state.getIn(['data', ...store, 'loading']),
        time: state.getIn(['data', ...store, 'time']),
    }
}

const mapActionCreators = {
    onSetData: setData, onLoadData: getData
};

export default connect(mapStateToProps, mapActionCreators)(injectIntl(DataProvider));
