import React, {useRef, useState} from "react";
import Classic from './Classic.jsx'
import Alternative from './Alternative.jsx'
import {connect} from "react-redux";


const BigNumber = (props) => {
    const {
        editing = false,
        "data-style-option": style = "classic"
    } = props
    return style == 'classic' ? <Classic {...props}></Classic> : <Alternative {...props}></Alternative>
}


export default BigNumber
