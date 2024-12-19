import React from 'react';
import { embedDashboard } from "@superset-ui/embedded-sdk";
import { injectIntl, FormattedMessage } from "react-intl";
import {connect} from "react-redux";


const Component = (props) => {
    const {
        editing = false,
        unique,
        intl,        
        "data-csv": csv = "",
        "data-selected-dashboard-id": selectedDashboardId = "",
        "data-apache-superset-url": apacheSupersetUrl = "",
        "data-height": height,  
        "data-width": width = 100,   
        "data-margin": margin = 0
    } = props

    const url = decodeURIComponent(apacheSupersetUrl);    

    const iframeSrc = `${url}/superset/dashboard/${selectedDashboardId}/?standalone=2`;   
    
    return (
        <div id={`superset-dashboard-${unique}`}>           
            <iframe
                src={iframeSrc}                                        
                seamless="seamless"
                title="superset-dashboard"
                style={{ border: 'none' , width: width + '%', height: height + 'px', margin: margin + 'px'}}  />          
        </div>);    
}


const mapStateToProps = (state, ownProps) => {
    return {}    
 }
 const mapActionCreators = {};
 
 
 export default connect(mapStateToProps, mapActionCreators)(Component);

