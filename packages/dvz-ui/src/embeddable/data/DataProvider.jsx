import React from 'react'
import {connect} from 'react-redux'
import {injectIntl} from 'react-intl';
import {DataContext} from './DataContext'
import {getData, setData} from "../reducers/data";
import {Container, Dimmer, Loader, Segment} from "semantic-ui-react";

class DataProvider extends React.Component {

    constructor() {
        super();
        this.state = {
            showLoading: false
        }
        this.checkLoadingTime = this.checkLoadingTime.bind(this)
    }

    componentDidMount() {
        const {app, source, store, params, csv, group, editing, waitForFilters = false} = this.props
        if (app === "csv") {
            this.props.onSetData({app, csv, store, params, group})
        } else {
            if (editing) {
                // params.v = (Math.random() + 1).toString(36).substring(7)
            }

            this.setState({showLoading: false})
            if (!waitForFilters || editing) {
                console.log('loading -----')
                this.props.onLoadData({app, source, store, params, group})
                setTimeout(this.checkLoadingTime, 100);
            } else {
                console.log("waiting for filters to be set before loading data", app, source, store, params, group)
            }
        }
        if (!editing && waitForFilters) {
            this.fallbackTimeout = setTimeout(() => {
                if (!this.dataLoaded) {
                    console.warn("Fallback loading triggered");
                    this.setState({showLoading: false});
                    this.props.onLoadData({app, source, store, params, group});
                    setTimeout(this.checkLoadingTime, 100);
                }
            }, 1000); // You can adjust this delay
        }


    }

    componentWillUnmount() {
        clearTimeout(this.fallbackTimeout);
        clearTimeout(this.debounceTimeout);
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
                    this.props.onSetData({app, csv, store, params, group})
                } else {

                    this.setState({showLoading: true});
                    if (editing) {
                        this.props.onLoadData({app, source, store, params, group})
                    }

                    if (initialChanged && this.props.waitForFilters) { //if this timestamp is different, it means that the initial filters still on initial setup


                        console.log("initial filters has been updated", filters, params);
                        clearTimeout(this.debounceTimeout);
                        clearTimeout(this.fallbackTimeout); // Cancel fallback because actual trigger happened


                        this.debounceTimeout = setTimeout(() => {
                            this.dataLoaded = true;
                            this.setState({showLoading: false});
                            console.log("Loading data " + app + " " + source)
                            this.props.onLoadData({app, source, store, params, group})
                            setTimeout(this.checkLoadingTime, 100);
                        }, 100);

                    } else if (userChanged) {
                        console.log("filters has been updated", filters, prevProps.filters, params, prevProps.params, app, source, store, group)
                        this.setState({showLoading: false})
                        console.log("filters has been updated", filters)
                        this.props.onLoadData({app, source, store, params, group})
                        setTimeout(this.checkLoadingTime, 100);
                    } else {
                        console.log("no changes detected ............")
                    }


                }

            }

        } else if (doApply) {
            console.log('reloading -----')
            this.props.onLoadData({app, source, store, params, group})
            this.setState({showLoading: false})
            setTimeout(this.checkLoadingTime, 100);
        }


    }


    checkLoadingTime() {
        const {data, loading, time, error} = this.props
        const loadingTime = Date.now() - time

        if (loading && time && loadingTime > 1000) {
            this.setState({showLoading: true})
        } else if (loading) {
            setTimeout(this.checkLoadingTime, 100);
        }
    }


    render() {
        const {data, style, loading, time, error, editing, isSvg} = this.props



        if ((loading && this.state.showLoading && !editing)) {
            const foreignObjectStyle = {
                width: "100%", height: "100%", background: "transparent", verticalAlign: "middle", overflow: "hidden"
            }

            const segmentStyle = Object.assign({}, style, {
                height: "90%", background: "transparent", textAlign: "center", margin: "30px"
            })



            const spinner = <Segment basic={true} padded={true} style={segmentStyle}>
                <Dimmer active inverted style={{background: "transparent"}}>
                    <Loader size='medium' style={{background: "transparent"}}></Loader>
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
    const {store, group, app} = ownProps


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
