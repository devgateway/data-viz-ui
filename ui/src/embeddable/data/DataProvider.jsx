import React from 'react'
import {connect} from 'react-redux'
import {injectIntl} from 'react-intl';
import {DataContext} from './DataContext'
import {getData, setData} from "../reducers/data";
import {Container, Dimmer, Loader, Segment} from "semantic-ui-react";
import {ini_get} from "locutus/php/info";

class DataProvider extends React.Component {

    constructor() {
        super();
        this.state = {
            showLoading: false
        }
        this.checkLoadingTime = this.checkLoadingTime.bind(this)
    }

    componentDidMount() {
        
        const {app, source, store, params, csv, group, editing} = this.props

        if (app === "csv") {
            this.props.onSetData({app, csv, store, params, group})
        } else {

            this.setState({showLoading: false})
            this.props.onLoadData({app, source, store, params, group})
            setTimeout(this.checkLoadingTime, 100);
        }


    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {app, filters, source, store, params, csv, group, editing} = this.props
        if (filters != prevProps.filters ||
            JSON.stringify(params) != JSON.stringify(prevProps.params)
            || app != prevProps.app
            || prevProps.source != source
            || csv != prevProps.csv) {
            
            if (app === "csv") {
                this.props.onSetData({app, csv, store, params, group})
            } else {
                if (editing) {
                    params.v = (Math.random() + 1).toString(36).substring(7)
                }
                this.setState({showLoading: false})
                this.props.onLoadData({app, source, store, params, group})
                setTimeout(this.checkLoadingTime, 100);
            }
        }
    }


    checkLoadingTime() {
        const {data, loading, time, error} = this.props
        const loadingTime = Date.now() - time
        console.log(loadingTime)
        if (loading && time && loadingTime > 1000) {
            this.setState({showLoading: true})
            console.log("-----show loading---")
        } else if (loading) {
            setTimeout(this.checkLoadingTime, 100);
        }
    }


    render() {
        const {data, style,isSvg, loading,ignoreErrors, time, error, editing} = this.props

        if ((loading && this.state.showLoading && !editing)) {
            return (<Container style={style} className={"loading"}>
                <Segment basic={true} padded={true} textAlign={"center"} style={{margin: '30px', ...style}}>
                    <Dimmer active inverted>
                        <Loader size='medium'></Loader>
                    </Dimmer>
                </Segment>

            </Container>)
        } else if (!error) {
            return <DataContext.Provider value={data}>{this.props.children}</DataContext.Provider>
        }else if (error && ignoreErrors) {
            debugger;
            return <DataContext.Provider value={{}}>{this.props.children}</DataContext.Provider>
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

        return null;
    }
}

const mapStateToProps = (state, ownProps) => {
    const {store, group, app} = ownProps

    return {
        data: state.getIn(['data', ...store, 'data']),
        filters: state.getIn(['data', 'filters', app, group]),
        error: state.getIn(['data', ...store, 'error']),
        loading: state.getIn(['data', ...store, 'loading']),
        time: state.getIn(['data', ...store, 'time']),
    }
}

const mapActionCreators = {
    onSetData: setData,
    onLoadData: getData
};

export default connect(mapStateToProps, mapActionCreators)(injectIntl(DataProvider));
