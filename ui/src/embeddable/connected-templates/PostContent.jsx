import {connect} from "react-redux";
import React from 'react'
import {PostContent} from "@devgateway/wp-react-lib";
import {postLoaded} from '../reducers/embeddable'

const Connected = (props) => {
    return (<PostContent  onLoad={props.onLoad} {...props}/>)
}

const mapStateToProps = (state, ownProps) => {
    return {}
}

const mapActionCreators = {
    onLoad:postLoaded
};



export default connect(mapStateToProps, mapActionCreators)(Connected)