import React from 'react';
import { embedDashboard } from "@superset-ui/embedded-sdk";
import { injectIntl, FormattedMessage } from "react-intl";
import {connect} from "react-redux";

import { SettingProvider } from '@devgateway/wp-react-lib';
import {SettingsConsumer} from '@devgateway/wp-react-lib';

const SupersetDashboardWrapper = (props) => {
  return (<SettingProvider locale={props.intl.locale} changeUUID={props.unique}>
            <SettingsConsumer>
                <SupersetDashboard {...props} />
            </SettingsConsumer>
            </SettingProvider>);
}
    
const SupersetDashboard = (props) => {
    const {
        editing = false,
        unique,
        intl,        
        "data-csv": csv = "",
        "data-selected-dashboard-id": selectedDashboardId = "",        
        "data-height": height,  
        "data-width": width = 100,   
        "data-margin": margin = 0,
        settings
    } = props

    const apacheSupersetUrl = settings ? settings.apache_superset_url: "";
    const url = decodeURIComponent(apacheSupersetUrl);    

    const iframeSrc = `${url}/superset/dashboard/${selectedDashboardId}/?standalone=3`;   
    
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
 
 
 export default connect(mapStateToProps, mapActionCreators)(SupersetDashboard);

