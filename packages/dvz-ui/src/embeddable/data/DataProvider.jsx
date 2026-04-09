import React from 'react'
import { connect } from 'react-redux'
import { DataContext } from './DataContext'
import { getData, setData } from "../reducers/data";
import { Container, Dimmer, Loader, Segment } from "semantic-ui-react";
import debounce from 'lodash/debounce'

class DataProvider extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showLoading: false
        }
        this.checkLoadingTime = this.checkLoadingTime.bind(this)

        // Single, reusable debounce instance for user-triggered filter changes.
        // The previous pattern created a new debounce on every call, meaning
        // debouncing never actually occurred and all pending calls fired independently.
        this._debouncedLoad = debounce((args) => {
            this.setState({ showLoading: false })
            this.props.onLoadData(args)
            this.dataLoaded = true
            this._scheduleLoadingCheck()
        }, 400)
    }

    // Centralised helper so every recursive checkLoadingTime call is tracked
    // and can be cancelled on unmount, preventing setState on unmounted components.
    _scheduleLoadingCheck() {
        clearTimeout(this._loadingCheckTimeout)
        this._loadingCheckTimeout = setTimeout(this.checkLoadingTime, 100)
    }


    componentDidMount() {
        const { app, source, store, params, csv, group, editing, waitForFilters = false } = this.props

        if (app === "csv") {
            this.props.onSetData({ app, csv, store, params, group })
        } else {
            this.setState({ showLoading: false })
            if (!waitForFilters || editing) {
                this.props.onLoadData({ app, source, store, params, group })
                this._scheduleLoadingCheck()
            }
        }
        if (!editing && waitForFilters) {
            this.fallbackTimeout = setTimeout(() => {
                if (!this.dataLoaded) {
                    this.setState({ showLoading: false });
                    this.props.onLoadData({ app, source, store, params, group });
                    this._scheduleLoadingCheck()
                }
            }, 1000);
        }
    }

    componentWillUnmount() {
        clearTimeout(this.fallbackTimeout);
        clearTimeout(this.debounceTimeout);
        clearTimeout(this._loadingCheckTimeout);
        this._debouncedLoad.cancel();
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

        let doApply = false

        if (apply !== undefined && apply !== null && apply != prevProps.apply) {
            doApply = true;
        }

        if (autoApply !== false) {
            if (filters != prevProps.filters || JSON.stringify(params) != JSON.stringify(prevProps.params)
                || app != prevProps.app
                || source !== prevProps.source
                || csv != prevProps.csv) {

                if (app === "csv") {
                    this.props.onSetData({ app, csv, store, params, group })
                } else {

                    this.setState({ showLoading: true });
                    if (editing) {
                        this.props.onLoadData({ app, source, store, params, group })
                    }

                    if (initialChanged && this.props.waitForFilters) {
                        clearTimeout(this.debounceTimeout);
                        clearTimeout(this.fallbackTimeout);

                        this.debounceTimeout = setTimeout(() => {
                            this.dataLoaded = true;
                            this.setState({ showLoading: false });
                            this.props.onLoadData({ app, source, store, params, group })
                            this._scheduleLoadingCheck()
                        }, 100);

                    } else if (userChanged) {
                        this.setState({ showLoading: false })
                        this._debouncedLoad({ app, source, store, params, group })
                        this._scheduleLoadingCheck()
                    } else if (!editing && (
                        JSON.stringify(params) !== JSON.stringify(prevProps.params) ||
                        app !== prevProps.app ||
                        source !== prevProps.source
                    )) {
                        this.setState({ showLoading: false })
                        this.props.onLoadData({ app, source, store, params, group })
                        this._scheduleLoadingCheck()
                    }
                }
            }

        } else if (doApply) {
            this.props.onLoadData({ app, source, store, params, group })
            this.setState({ showLoading: false })
            this._scheduleLoadingCheck()
        }
    }


    checkLoadingTime() {
        const { loading, time } = this.props
        const loadingTime = Date.now() - time

        if (loading && time && loadingTime > 1000) {
            this.setState({ showLoading: true })
        } else if (loading) {
            this._loadingCheckTimeout = setTimeout(this.checkLoadingTime, 100)
        }
    }


    render() {
        const { data, style, loading, time, error, editing, isSvg } = this.props




        if ((loading && this.state.showLoading && !editing)) {
            const foreignObjectStyle = {
                width: "100%", height: "100%", background: "transparent", verticalAlign: "middle", overflow: "hidden"
            }

            const segmentStyle = Object.assign({}, style, {
                height: "90%", background: "transparent", textAlign: "center", margin: "30px"
            })



            const spinner = <Segment basic={true} padded={true} style={segmentStyle}>
                <Dimmer active inverted style={{ background: "transparent" }}>
                    <Loader size='medium' style={{ background: "transparent" }}></Loader>
                </Dimmer>
            </Segment>

            if (isSvg) {
                return (<foreignObject style={foreignObjectStyle}>
                    <Container style={style} className={"loading"}>
                        {spinner}
                    </Container>
                </foreignObject>)
            } else {
                return (<Container style={style} className={"loading"}>
                    {spinner}
                </Container>)
            }


        } else if (!error) {
            return <DataContext.Provider value={data}>{this.props.children}</DataContext.Provider>
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

export default connect(mapStateToProps, mapActionCreators)(DataProvider);
