import {InspectorControls, useBlockProps} from '@wordpress/block-editor';
import {
    Panel,
    PanelBody,
    PanelRow,
    ResizableBox,
    SelectControl,
    TextControl,
} from '@wordpress/components';
import {__} from '@wordpress/i18n';
import {BlockEditWithAPIMetadata, SizeConfig} from '../commons/index'
import CSVSourceConfig from "../commons/CSVSourceConfig";
import {togglePanel} from "../commons/Util";
import Measures from "../commons/Measures";
import DataFilters from "../commons/DataFilters";

class BlockEdit extends BlockEditWithAPIMetadata {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        super.componentDidMount()
    }

    render() {
        const {
            className, isSelected,
            toggleSelection, setAttributes,
            attributes: {
                measures,
                height,
                dimension1,
                app,
                format,
                filters,
                group,
                panelStatus,
                valueType
            }
        } = this.props;

        const {dimensions} = this.state

        let params = {}
        filters.forEach(f => {
            if (f.value != null && f.value.filter(v => v != null && v.toString().trim() != "").length > 0)
                params[f.param] = f.value
        })
        const divStyles = {height: height + 'px', width: '100%'}

        return ([isSelected && (
            <InspectorControls>
                <Panel header={__("Chart Configuration")}>
                    <PanelBody
                      panelStatus={panelStatus['GROUP']}
                      onToggle={e => togglePanel("GROUP", panelStatus, setAttributes)}
                      title={__("Group")}>
                        <PanelRow>
                            <TextControl
                              label={__('Name')}
                              value={group}
                              onChange={(group) => setAttributes({group})}
                      />
                        </PanelRow>
                    </PanelBody>
                    <SizeConfig setAttributes={setAttributes} panelStatus={panelStatus}
                                height={height}></SizeConfig>

                    <>
                        <PanelBody initialOpen={false} title={__("API & Source")}>
                            <PanelRow>
                                <SelectControl
                                  value={[app]}
                                  onChange={(app) => {
                                      setAttributes({
                                          app: app
                                      })
                                  }}
                                  options={this.state.apps}
                                />
                            </PanelRow>
                        </PanelBody>
                        {app != 'csv' && <PanelBody initialOpen={false} title={__(`Dimension`)}>
                            <PanelRow>
                                <SelectControl
                                  label={__('Dimension')}
                                  value={[dimension1]}
                                  onChange={(value) => {
                                      setAttributes({dimension1: value})
                                  }}
                                  options={dimensions || []}
                                />
                            </PanelRow>
                        </PanelBody>}

                        {app != 'csv' &&  <Measures
                              title={__(`Measure`)}
                              onSetSingleMeasure={value => {
                                  setAttributes({measures: [value]})
                              }}
                              onFormatChange={value => {
                                  setAttributes({format: value})
                              }}
                              allMeasures={this.state.measures}
                              format={format}
                              measures={measures}
                              {...this.props}/>
                        }

                        <PanelBody initialOpen={false} title={__("Types")}>
                            <PanelRow>
                                <SelectControl
                                  label={__('Value Type')}
                                  value={valueType}
                                  onChange={(value) => {
                                      setAttributes({valueType: value})
                                  }}
                                  options={[
                                    {label: 'First', value: 'first'},
                                    {label: 'Total', value: 'total'},
                                    {label: 'Minimum', value: 'min'},
                                    {label: 'Maximum', value: 'max'},
                                    {label: 'Average', value: 'avg'},
                                  ]}
                                />
                            </PanelRow>
                        </PanelBody>

                        <DataFilters
                          allFilters={this.state.filters}
                          allCategories={this.state.categories}
                          {...this.props}/>

                    </>
                </Panel>
            </InspectorControls>),
              (<ResizableBox
                  size={{height}}
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
                          height: parseInt(height + delta.height, 10),
                      });
                      toggleSelection(true);
                  }}
                  onResizeStart={() => {
                      toggleSelection(false);
                  }}>

                    <div className={className}>
                        {this.state.react_ui_url && <iframe ref={this.iframe} style={divStyles} scrolling={"no"}
                                                            src={this.state.react_ui_url + "/embeddable/datalabel?"}/>}

                    </div>
                </ResizableBox>
              )]
        );

    }
}

const Edit = (props) => {
    const blockProps = useBlockProps();
    return <div {...blockProps}><BlockEdit {...props}/></div>;
}
export default Edit;
