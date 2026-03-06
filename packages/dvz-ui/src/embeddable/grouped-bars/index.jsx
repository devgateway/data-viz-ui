import React, {useRef, useState} from "react";
import GroupedBars from './GroupedBars.jsx'
import {connect} from "react-redux";


const Bars = (props) => {
    const {
        editing = false,
        unique,
        intl,
        childContent,
    } = props
    return <GroupedBars {...props}></GroupedBars> 
}


export default Bars
