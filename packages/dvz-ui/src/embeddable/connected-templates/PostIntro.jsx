import {connect} from "react-redux";
import React from 'react'
import {PostIntro} from "@devgateway/wp-react-lib";
import {postLoaded} from '../reducers/embeddable'

const Connected = (props) => {
    return (<PostIntro  onLoad={props.onLoad} {...props}/>)
}

const mapStateToProps = (state, ownProps) => {
    return {}
}

const mapActionCreators = {
    onLoad:postLoaded
};



export default connect(mapStateToProps, mapActionCreators)(Connected)