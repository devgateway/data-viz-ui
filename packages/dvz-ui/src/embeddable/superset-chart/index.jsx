import React from 'react';
import {connect} from "react-redux";
import { SettingProvider } from '@devgateway/wp-react-lib';
import {SettingsConsumer} from '@devgateway/wp-react-lib';

const SupersetChartWrapper = (props) => {
  return (<SettingProvider locale={props.intl.locale} changeUUID={props.unique}>
            <SettingsConsumer>
                <SupersetChart {...props} />
            </SettingsConsumer>
            </SettingProvider>);
}
        
const SupersetChart = (props) => {
    const {
        editing = false,
        unique,
        intl,        
        "data-csv": csv = "",
        "data-selected-chart-data": selectedChartData = "{}",
        "data-height": height,  
        "data-width": width = 100,   
        "data-margin": margin = 0,
         settings
    } = props;

    const apacheSupersetUrl = settings ? settings.apache_superset_url: "";
    const url = decodeURIComponent(apacheSupersetUrl);  
    const chartdata = decodeURIComponent(selectedChartData);  
    const iframeSrc = `${url}/superset/explore/?form_data=${chartdata}&standalone=1`;   
    
    return (
        <div id={`superset-chart-${unique}`}  >           
            <iframe
                src={iframeSrc}                                        
                seamless="seamless"
                title="superset-chart"
                style={{ border: 'none' , width: width + '%', height: height + 'px', margin: margin + 'px'}}  />
                
        </div>);  
}

const mapStateToProps = (state, ownProps) => {
   return {}    
}
const mapActionCreators = {};


export default connect(mapStateToProps, mapActionCreators)(SupersetChartWrapper);

