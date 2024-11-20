import React from 'react'
import {connect} from 'react-redux'
import {injectIntl} from 'react-intl';
import {CategoriesContext} from './DataContext'
import {getCategories} from "../reducers/data";
import {Container, Dimmer, Loader, Segment} from "semantic-ui-react";

class DataProvider extends React.Component {

    componentDidMount() {
        const {categories} = this.props
        if (!categories && !this.props.loading) {
            this.props.onLoadData(this.props)
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
                this.props.onLoadData(this.props)//this.props.onLoadData({app, source, store, params, group})
                setTimeout(this.checkLoadingTime, 100);
            }
        }
    }

    render() {
        const {data, loading, error} = this.props

        if (loading) {
            return (<Container>


            </Container>)
        }

        
        if (data) {
            return <CategoriesContext.Provider value={data.toJS()}>{this.props.children}</CategoriesContext.Provider>
        } else if (error) {
            return <Segment color={"red"}>
                <h1>500</h1>
                <p>Wasn't able to load data</p>
            </Segment>
        }  else {
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
    const {app} = ownProps

    return {
        data: state.getIn(['data', 'categories', app, 'items']),
        error: state.getIn(['data', 'categories', app, 'error']),
        loading: state.getIn(['data', 'categories', app, 'loading']),
    }
}

const mapActionCreators = {
    onLoadData: getCategories
};

export default connect(mapStateToProps, mapActionCreators)(injectIntl(DataProvider));
