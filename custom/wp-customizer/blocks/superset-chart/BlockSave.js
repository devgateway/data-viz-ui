import {InnerBlocks} from '@wordpress/editor'; // or wp.editor

const SaveComponent = (props) => {
    const {
        setAttributes, attributes: {
            path, 
            group, 
            isActionPlan,
            selectedChartId,
            selectedChartData
        },
    } = props;


    const divClass = {}
    const divStyles = {}

     

    return ( <div               
                data-group={group}
                className={"viz-component"}
                data-component={"supersetChart"}
                data-selected-chart-id={selectedChartId}
                data-selected-chart-data={encodeURIComponent(JSON.stringify(selectedChartData))}>           

            <InnerBlocks.Content/>
        </div>);
        
}


export default SaveComponent