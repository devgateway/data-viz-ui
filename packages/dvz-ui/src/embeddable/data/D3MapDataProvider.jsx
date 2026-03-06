import React from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl';
import { DataContext } from './DataContext'
import { getData, setData } from "../reducers/data";
import { Container, Dimmer, Loader, Segment } from "semantic-ui-react";


class DataProvider extends React.Component {

    constructor() {
        super();
        this.state = {
            showLoading: false
        }
        this.checkLoadingTime = this.checkLoadingTime.bind(this)

        // Timer references
        this.loadingTimeout = null;
        this.fallbackTimeout = null;
        this.initialFilterTimeout = null;
    }

    componentDidMount() {
        const { app, csv, store, params, source, group, editing, waitForFilters = false } = this.props
        console.log("Group & Store ", store, this.props.mySelf)

        if (app === "csv") {
            this.props.onSetData({ app, csv, store, params, group })
        } else {
            this.setState({ showLoading: false })

            if (!waitForFilters || editing) {
                console.log('📥 [D3 Map DataProvider] Initial data load triggered', { app, editing, waitForFilters });
                this.loadData({ app, source, store, params, group });
            }

            if (!editing && waitForFilters) {
                this.fallbackTimeout = setTimeout(() => {
                    if (!this.props.data && !this.props.loading) {
                        console.warn('⚠️ [D3 Map DataProvider] Fallback loading triggered');
                        this.loadData({ app, source, store, params, group });
                    }
                }, 2000);
            }
        }
    }

    componentWillUnmount() {
        clearTimeout(this.fallbackTimeout);
        clearTimeout(this.loadingTimeout);
        clearTimeout(this.initialFilterTimeout);
    }

    componentDidUpdate(prevProps) {
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
            lastInitialFilterChange,
            lastUserFilterChange,
            waitForFilters
        } = this.props

        // 1. Manual Apply
        if (apply !== undefined && apply !== null && apply !== prevProps.apply) {
            console.log('🔄 [DataProvider] Manual reload (apply button)');
            this.loadData({ app, source, store, params, group });
            return;
        }

        // 2. Auto Apply Logic
        if (autoApply !== false) {
            const significantPropChange =
                filters !== prevProps.filters ||
                JSON.stringify(params) !== JSON.stringify(prevProps.params) ||
                app !== prevProps.app ||
                JSON.stringify(prevProps.source) !== JSON.stringify(source) ||
                csv !== prevProps.csv;

            if (significantPropChange) {
                if (app === "csv") {
                    this.props.onSetData({ app, csv, store, params, group });
                } else {
                    const initialChanged = lastInitialFilterChange !== prevProps.lastInitialFilterChange;
                    const userChanged = lastUserFilterChange !== prevProps.lastUserFilterChange;

                    if (initialChanged && waitForFilters) {
                        console.log('ℹ️ [DataProvider] Initial filters changing, debouncing...');

                        if (this.initialFilterTimeout) clearTimeout(this.initialFilterTimeout);

                        this.initialFilterTimeout = setTimeout(() => {
                            console.log('✅ [DataProvider] Initial filters settled, loading data');
                            this.loadData({ app, source, store, params, group });
                        }, 500);

                    } else if (userChanged) {
                        console.log('ℹ️ [DataProvider] User filters changed, loading data');
                        this.loadData({ app, source, store, params, group });
                    } else if (!initialChanged && !userChanged) {
                        // Fallback for prop changes that aren't explicitly filter timestamps
                        // Only load if we are not waiting for initial filters
                        if (!waitForFilters) {
                            // console.log('ℹ️ [DataProvider] Props changed, loading data');
                            //this.loadData({ app, source, store, params, group });
                        }
                    }
                }
            }
        }
    }

    loadData(params) {
        console.log("Loading data for map", params)
        this.setState({ showLoading: false });
        this.props.onLoadData(params);

        if (this.loadingTimeout) clearTimeout(this.loadingTimeout);
        this.loadingTimeout = setTimeout(this.checkLoadingTime, 200);
    }

    checkLoadingTime() {
        const { loading, time } = this.props
        if (loading && time) {
            const loadingTime = Date.now() - time;
            if (loadingTime > 1000) {
                this.setState({ showLoading: true });
            } else {
                this.loadingTimeout = setTimeout(this.checkLoadingTime, 200);
            }
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
