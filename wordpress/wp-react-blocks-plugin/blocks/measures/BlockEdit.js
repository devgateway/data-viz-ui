import {InspectorControls, useBlockProps} from '@wordpress/block-editor';
import {
    __experimentalDivider as Divider,
    Button,
    Panel,
    PanelBody,
    PanelRow,
    SelectControl,
    TextControl,
    ToggleControl,
    TextareaControl
} from '@wordpress/components';
import {__} from '@wordpress/i18n';
import {BlockEditWithAPIMetadata} from '../commons/index'
import Format from '../charts/Format.jsx'
import {useState} from "@wordpress/element";
import {v4 as uuidv4} from "uuid";


const getGroups = (measures) => {
    let groups = []
    if (measures) {
        groups = [...new Set(measures.map(m => m.group))]
    }
    return groups
}

const MToggle = ({onChange, checked, label}) => {

    return (<ToggleControl
        label={label}
        checked={checked}
        onChange={onChange}/>)
}

const Group = ({

                   app,
                   allMeasures,
                   measures,
                   idx,
                   defaultSelected,
                   label,
                   format,
                   leftTitle,
                   rightTitle,
                   customTooltip,
                   onLabelChange,
                   onFormatChange,
                   onMeasureChange,
                   onLeftTitleChange,
                   onRightTitleChange,
                   onDefaultSelectedChanged,
                   onCsvMeasureChanged,
                   onCustomTooltipChange
               }) => {
    const groups = getGroups(allMeasures)
    const [g, setG] = useState(groups[0])



    return (<PanelBody title={label ? label : __("New Group")}>
        <PanelRow>
            <TextControl
                label={""}
                value={label}
                onChange={label => onLabelChange(idx, label)}
            />
        </PanelRow>
        <PanelRow>
            <ToggleControl
                label="Default Selected"
                checked={defaultSelected}
                onChange={() => onDefaultSelectedChanged(idx, !defaultSelected)}
            />
        </PanelRow>

        {app != 'csv' && groups.map(g => {

            return (<PanelBody title={g.label}>{allMeasures.filter(m => m.group == g).map(m =>
                <PanelRow>
                    <MToggle label={m.label} checked={measures[m.value] && measures[m.value].selected}
                             onChange={value => onMeasureChange(idx, m.value, value)}>

                    </MToggle>
                </PanelRow>
            )}
            </PanelBody>)

        })
        }
        {app == 'csv' && <PanelBody title={"Fields "}>
            <TextControl value={Object.keys(measures).join(',')} label={__("CSV Fields")}
                         onChange={value => onCsvMeasureChanged(idx, value)}></TextControl>

        </PanelBody>}
        <PanelBody title={__("Format")}>
            <Format format={format} onFormatChange={format => onFormatChange(idx, format)}></Format>

        </PanelBody>
        <PanelBody title={__("Legends")}>
            <PanelRow>
                <TextControl
                    label={__("Y Left Title")}
                    onChange={title => onLeftTitleChange(idx, title)}
                    value={leftTitle}
                />

            </PanelRow>
            <PanelRow>
                <TextControl
                    label={__("Y Right Title")}
                    onChange={title => onRightTitleChange(idx, title)}
                    value={rightTitle}
                />
            </PanelRow>

        </PanelBody>
        <PanelBody initialOpen={false} title={__("Custom Tooltip")}>
            <PanelRow>
                <TextareaControl
                    label={__("Tooltip")}
                    value={customTooltip}
                    help={__("This tooltip overrides the tooltip configured in the chart. You can use the dimensions and measures selected in the chart as variables e.g {var_name}.")}
                    onChange={(customTooltip) => onCustomTooltipChange(idx, customTooltip)}
                    rows={10}
                />
            </PanelRow>
        </PanelBody>
    </PanelBody>)

}


class BlockEdit extends BlockEditWithAPIMetadata {

    constructor(props) {
        super(props);
        this.addGroup = this.addGroup.bind(this)
        this.removeGroup = this.removeGroup.bind(this)
        this.onLabelChange = this.onLabelChange.bind(this)
        this.onFormatChange = this.onFormatChange.bind(this)
        this.onMeasureChange = this.onMeasureChange.bind(this)
        this.onDefaultSelectedChanged = this.onDefaultSelectedChanged.bind(this)
        this.onRightTitleChange = this.onRightTitleChange.bind(this)
        this.onLeftTitleChange = this.onLeftTitleChange.bind(this)
        this.onCsvMeasureChanged = this.onCsvMeasureChanged.bind(this)
        this.onCustomTooltipChange = this.onCustomTooltipChange.bind(this)

    }

    removeGroup() {
        const {
            setAttributes,
            attributes: {
                measuresGroups,
                app,
            }
        } = this.props;


        const newGroups = {...measuresGroups}
        newGroups[app].pop()

        setAttributes({measuresGroups: newGroups})
    }

    addGroup() {

        const {
            setAttributes,
            attributes: {
                measuresGroups,
                app,
            }
        } = this.props;

        const newGroups = {...measuresGroups}
        if (!newGroups[app]) {
            newGroups[app] = []
        }

        newGroups[app].push({
            idx: newGroups[app].length,
            label: "",
            measures: {},
            format: {
                "style": "percent",
                "minimumFractionDigits": 1,
                "maximumFractionDigits": 1,
                "currency": "USD",
                "customTooltip": ""
            }
        })
        setAttributes({measuresGroups: newGroups})
    }

    onLabelChange(idx, label) {
        const {
            isSelected,
            setAttributes,
            attributes: {
                app,
                measuresGroups,
            }
        } = this.props;
        const newGroups = {...measuresGroups}
        newGroups[app][idx].label = label
        setAttributes({measuresGroups: newGroups})
    }

    onLeftTitleChange(idx, leftTitle) {
        const {
            isSelected,
            setAttributes,
            attributes: {
                app,
                measuresGroups,
            }
        } = this.props;
        const newGroups = {...measuresGroups}

        newGroups[app][idx].leftTitle = leftTitle
        setAttributes({measuresGroups: newGroups})
    }

    onRightTitleChange(idx, rightTitle) {
        const {
            isSelected,
            setAttributes,
            attributes: {
                app,
                measuresGroups,
            }
        } = this.props;
        const newGroups = {...measuresGroups}

        newGroups[app][idx].rightTitle = rightTitle
        setAttributes({measuresGroups: newGroups})
    }

    onCustomTooltipChange(idx, customTooltip) {
        const {
            isSelected,
            setAttributes,
            attributes: {
                app,
                measuresGroups,
            }
        } = this.props;
        const newGroups = {...measuresGroups}
        newGroups[app][idx].customTooltip = customTooltip
        setAttributes({measuresGroups: newGroups})
    }

    onFormatChange(idx, format) {
        const {
            isSelected,
            setAttributes,
            attributes: {
                app,
                measuresGroups,
            }
        } = this.props;
        const newGroups = {...measuresGroups}
        newGroups[app][idx].format = format
        setAttributes({measuresGroups: newGroups})
    }

    onCsvMeasureChanged(idx, fields) {
        const {
            isSelected,
            setAttributes,
            attributes: {
                app,
                measuresGroups,
            }
        } = this.props;
        const newGroups = {...measuresGroups}

        newGroups[app][idx].measures = {}
        fields.split(",").forEach(measure => {

            newGroups[app][idx].measures[measure] = {}
            newGroups[app][idx].measures[measure] = {'selected': true}
        })


        setAttributes({measuresGroups: newGroups})

    }

    onMeasureChange(idx, measure, selected) {
        const {
            isSelected,
            setAttributes,
            attributes: {
                app,
                measuresGroups,
            }
        } = this.props;
        const newGroups = {...measuresGroups}

        if (!newGroups[app][idx].measures[measure]) {
            newGroups[app][idx].measures[measure] = {}
        }

        newGroups[app][idx].measures[measure] = {selected}
        setAttributes({measuresGroups: newGroups})

    }

    onDefaultSelectedChanged(idx, value) {
        const {
            setAttributes,
            attributes: {
                app,
                measuresGroups,
            }
        } = this.props;

        const newGroups = {...measuresGroups}
        newGroups[app].forEach(g => g.defaultSelected = false)
        newGroups[app][idx].defaultSelected = value
        setAttributes({measuresGroups: newGroups})
    }

    render() {
        const {
            isSelected,
            setAttributes,
            attributes: {
                group,
                label,
                measuresGroups,
                app,
            }
        } = this.props;
        const iframeStyles = {height: '65px', width: '100%'}
        const queryString = ``
        const selectableGroups = measuresGroups[app] ? measuresGroups[app] : [];


        return ([isSelected && (<InspectorControls>
                <Panel header={__("Measures Configuration")}>
                    <PanelBody initialOpen={false} title={__("Group")}>
                        <PanelRow>
                            <TextControl
                                help={__('Use this field to set a shared key')}
                                label={__('Name')}
                                value={group == '' ? uuidv4() : group}
                                onChange={(group) => setAttributes({group})}
                            />
                        </PanelRow>
                    </PanelBody>
                    <PanelBody initialOpen={false} title={__("API & Source")}>
                        <PanelRow>
                            <SelectControl
                                value={app}
                                onChange={(app) => {

                                    setAttributes({app: app})
                                }}
                                options={this.state.apps ? [...this.state.apps] : []}
                            />
                        </PanelRow>
                    </PanelBody>

                    <PanelBody initialOpen={false} title={__("Options")}>

                        <TextControl
                            label={__("Label")}
                            value={label}
                            onChange={label => setAttributes({label})}
                        />
                    </PanelBody>

                    {app != 'csv' && <PanelBody initialOpen={false} title={__("Groups")}>

                        {this.state.measures && selectableGroups.map(g =>
                            <Group
                                app={app}
                                onMeasureChange={this.onMeasureChange}
                                onFormatChange={this.onFormatChange}
                                onLabelChange={this.onLabelChange}
                                onLeftTitleChange={this.onLeftTitleChange}
                                onRightTitleChange={this.onRightTitleChange}
                                onDefaultSelectedChanged={this.onDefaultSelectedChanged}
                                onCustomTooltipChange={this.onCustomTooltipChange}
                                allMeasures={this.state.measures} {...g}/>)}

                        <PanelRow>

                            <Button variant="link" onClick={this.addGroup}>{__("Add")}</Button>
                            <Button variant="link" onClick={this.removeGroup}>{__("Remove")}</Button>


                            <Divider/>
                        </PanelRow>
                    </PanelBody>}


                    {app == 'csv' && <PanelBody initialOpen={false} title={__("Groups")}>

                        {selectableGroups.map(g => <Group
                            app={app}
                            onCsvMeasureChanged={this.onCsvMeasureChanged}
                            onFormatChange={this.onFormatChange}
                            onLabelChange={this.onLabelChange}
                            onLeftTitleChange={this.onLeftTitleChange}
                            onRightTitleChange={this.onRightTitleChange}
                            onDefaultSelectedChanged={this.onDefaultSelectedChanged}
                            onCustomTooltipChange={this.onCustomTooltipChange}
                            {...g}/>
                        )}

                        <PanelRow>

                            <Button variant="link" onClick={this.addGroup}>{__("Add")}</Button>
                            <Button variant="link" onClick={this.removeGroup}>{__("Remove")}</Button>


                            <Divider/>
                        </PanelRow>
                    </PanelBody>}
                </Panel>
            </InspectorControls>),

                (<div>

                        {this.state.react_ui_url &&
                            <iframe ref={this.iframe} scrolling={"no"} style={iframeStyles}
                                    src={this.state.react_ui_url + "/embeddable/measures?" + queryString}/>}
                    </div>

                )
            ]
        );

    }
}


const Edit = (props) => {

    const blockProps = useBlockProps({className: 'wp-react-component'});
    return (<div {...blockProps}>
        <p className={"iframe container"}>
            <BlockEdit {...props}/>
        </p>

    </div>)


}
export default Edit;
