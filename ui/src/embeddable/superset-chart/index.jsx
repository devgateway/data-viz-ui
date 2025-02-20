import React from 'react';
import {connect} from "react-redux";

const Component = (props) => {
    const {
        editing = false,
        unique,
        intl,        
        "data-csv": csv = "",
        "data-selected-chart-data": selectedChartData = "{}",
        "data-apache-superset-url": apacheSupersetUrl = "",
        "data-height": height,  
        "data-width": width = 100,   
        "data-margin": margin = 0
    } = props;

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


export default connect(mapStateToProps, mapActionCreators)(Component);

