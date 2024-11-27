import {InspectorControls, useBlockProps} from '@wordpress/block-editor';

import {
    Panel, PanelBody, PanelRow, TextControl, SelectControl, Icon, Button, ButtonGroup, ResizableBox, ToggleControl
} from '@wordpress/components';
import {__} from '@wordpress/i18n';
import {useSelect, useDispatch} from "@wordpress/data";


import {
    BlockEditWithAPIMetadata,
    ComponentWithSettings
} from '../../../../front/wordpress/wp-react-blocks-plugin/blocks/commons/'
import {useEffect, useState} from "react";


import {store as noticesStore} from '@wordpress/notices';
const supersetBaseUrl = 'http://localhost:8088';
const supersetChartsEP = "http://localhost:3001/api/charts";

class BlockEdit extends ComponentWithSettings {


    constructor(props) {
        super(props);
        this.iframe = React.createRef();

    }

    componentDidMount() {
        super.componentDidMount();      
    }

    getCharts() {
        const {chartData} = this.props;
        const transformedData = []
        if (chartData && chartData.result) {
            chartData.result.forEach(d=> {                
                transformedData.push({value: d.id, label: d.slice_name})
            })
        }

        return transformedData;
    }

    getChartData(chartId) {
        const {chartData} = this.props;
        let result
        if (chartData) {
           result = chartData.result.find(c => c.id == chartId)
        }

        return result ? result["form_data"] : {}
    }    

    render() {
        const {
            isSelected, toggleSelection, setAttributes, providers, attributes: {group, isActionPlan, height, selectedChartId, selectedChartData}
        } = this.props; 

        const {files} = this.state;
        const divStyles = {}
        const iframeStyles = {height: `${height}px`, width: '100%'}
        const encodedFormData = encodeURIComponent(JSON.stringify(selectedChartData))
        const iframeSrc = `${supersetBaseUrl}/superset/explore/?form_data=${encodedFormData}&standalone=1`;
        return ([isSelected && (<InspectorControls>
            <Panel header={__("Settings")}>
                <PanelBody>
                    <PanelRow>
                        <SelectControl
                            label={__("Provider")}
                            value={group}
                            onChange={group => {
                                providers.filter(p => p.group == group).map(p => setAttributes({file: p.file}))
                                setAttributes({group})
                            }}
                            options={providers ? [{
                                label: 'None', group: 'none'
                            }, ...providers.map(p => ({label: p.group, value: p.group}))] : [{
                                label: 'None', group: 'none'
                            }]}>
                        </SelectControl>

                        
                    </PanelRow>
                    <PanelRow>
                    <SelectControl 
                            label={__("Select Chart")}
                            value={selectedChartId}
                            onChange={selectedChartId => {                                
                                const formData =  this.getChartData(selectedChartId)
                                setAttributes({selectedChartId, selectedChartData: formData})
                            }}
                            options={[{label: 'None', group: 'none'}, ...this.getCharts()]}>
                        </SelectControl>
                    </PanelRow>

                    <PanelRow>
                        <ToggleControl
                            label={__("Action Plan")}
                            checked={isActionPlan}
                            onChange={() => {
                                setAttributes({isActionPlan: !isActionPlan})
                            }}>

                        </ToggleControl>
                    </PanelRow>

                </PanelBody>
            </Panel>
        </InspectorControls>), (<ResizableBox
                size={{
                    height
                }}
                style={{"margin": "auto", width: "100%"}}
                minHeight="50"
                minWidth="50"
                enable={{
                    top: false,
                    right: false,
                    bottom: true,
                    left: false,
                    topRight: false,
                    bottomRight: false,
                    bottomLeft: false,
                    topLeft: false,
                }}
                onResizeStop={(event, direction, elt, delta) => {
                    setAttributes({
                        height: parseInt(height + delta.height, 10)
                    });
                    toggleSelection(true);
                }}
                onResizeStart={() => {
                    toggleSelection(false);
                }}>
                <div style={divStyles}>
                    <div>

                        {/*this.state.react_ui_url && <iframe ref={this.iframe}
                                                            scrolling={"no"}
                                                            style={iframeStyles}
                                                            src={this.state.react_ui_url + "/embeddable/supersetDashboard"}/>*/}
                         {encodedFormData && this.state.react_ui_url && <iframe ref={this.iframe}
                                                            scrolling={"no"}
                                                            style={iframeStyles}
                                                            src={iframeSrc}/>}
                    </div>

                </div>
            </ResizableBox>
        )])


    }
}


const Edit = (props) => {
    const {
        isSelected, toggleSelection, setAttributes, attributes: {group, file}
    } = props;
    const [chartData, setChartData] = useState(null);
    const getBlocks = useSelect((select) => {
        return (args) => {
            return select('core/block-editor').getBlocks();
        }
    });

    const blocks = getBlocks()
    const providers = blocks.filter(b => b.name == "viz/json-data-provider").map(b => ({
        group: b.attributes.group, file: b.attributes.file
    }))

    const notices = useSelect((select) =>
        select(noticesStore).getNotices()
    );

    useEffect(() => {      
        setAttributes({providers})
        providers.filter(p => p.group == group).map(p => setAttributes({file: p.file}))
    }, [providers.map(p => p.file).join(","), providers.map(p => p.group).join(","), notices])


    useEffect(() => {
        const fetchChartData = async () => {
          const response = await  fetch(supersetChartsEP, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'                
            }
        });

          const data = await response.json();           
          setChartData(data)
        };
    
        fetchChartData();
      }, []); 



    const blockProps = useBlockProps({className: 'wp-react-component'});
    const theProps = {
        ...props,
        providers: providers,
        chartData: chartData
    }
    return (<div {...blockProps}>
        <p className={"iframe container"}>
            <BlockEdit  {...theProps}  />
        </p>

    </div>)

}

export default Edit;