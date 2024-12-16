import React from 'react';


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
    } = props

    const url = decodeURIComponent(apacheSupersetUrl);    
    const iframeSrc = `${url}/superset/explore/?form_data=${selectedChartData}&standalone=1`;   
    return (
        <div id={`superset-chart-${unique}`}  >           
            <iframe
                src={iframeSrc}                                        
                seamless="seamless"
                title="superset-chart"
                style={{ border: 'none' , width: width + '%', height: height + 'px', margin: margin + 'px'}}  />          
        </div>);    
}

export default Component;

