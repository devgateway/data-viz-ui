import React from 'react';


const Component = (props) => {
    const {
        editing = false,
        unique,
        intl,        
        "data-csv": csv = "",
        "data-selected-chart-data": selectedChartData = "{}",
        "data-apache-superset-url": apacheSupersetUrl = "",
        "data-height": height
      
    } = props

    const url = decodeURI(apacheSupersetUrl);    
    const iframeSrc = `${url}/superset/explore/?form_data=${selectedChartData}&standalone=1`;   
    return (
        <div id={`superset-chart-${unique}`} style={{"height": height + 'px'}} >
            <iframe
                src={iframeSrc}
                width="100%"   
                height={height + 'px'}           
                seamless="seamless"
                title="superset-chart"
            />            
        </div>);    
}



export default Component;

