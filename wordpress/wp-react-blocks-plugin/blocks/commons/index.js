import {__} from '@wordpress/i18n';
import {CheckboxControl, PanelBody, PanelRow, SelectControl, TextControl} from '@wordpress/components';
import {Component} from '@wordpress/element'
import apiFetch from '@wordpress/api-fetch';
import {togglePanel} from "./Util";

import {getTranslatedOptions} from './APIutils'

const ALIVE_SUPERSET_APP = 'superset-proxy'
export const SizeConfig = ({height, setAttributes, panelStatus,initialOpen}) => {
    return (<PanelBody initialOpen={panelStatus?panelStatus["SIZE"]:initialOpen} onToggle={e => togglePanel("SIZE", panelStatus, setAttributes)}
                       title={__("Size")}>
        <PanelRow>
            <TextControl
                size={10}
                label="Height"
                value={height}
                onChange={(height) => setAttributes({height: height ? parseInt(height) : 0})}
            />
        </PanelRow>
    </PanelBody>)

}

export class ComponentWithSettings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            react_ui_url: ''
        }

        window.addEventListener("message", (event) => {

            if (event.data.type == 'componentReady' && event.data.value == true) {
                if (this.iframe.current) {
                    console.log("-----------Sending message -----------")
                    this.iframe.current.contentWindow.postMessage(({messageType: 'component-attributes', ...this.props.attributes}), "*")
                }
            }
        }, false);
        this.iframe = React.createRef();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.iframe.current) {
            console.log("-----------Sending message -----------")
            this.iframe.current.contentWindow.postMessage(({messageType: 'component-attributes', ...this.props.attributes}), "*")
        }
    }

    componentDidMount() {
        apiFetch({path: '/dg/v1/settings'}).then((data) => {           
            this.setState({
                react_ui_url: data["react_ui_url"] + '/' + window._page_locale,
                react_api_url: data["react_api_url"],
                apache_superset_url: data["apache_superset_url"],
                site_language: data["site_language"],
                current_language: new URLSearchParams(document.location.search).get("edit_lang")
            });
        });
    }
}


export class BlockEditWithFilters extends ComponentWithSettings {

    constructor(props) {
        super(props);
        this.state = {
            taxonomyValues: [],
            types: null,
            taxonomies: null,
            loading: true
        }
        this.onTypeChanged = this.onTypeChanged.bind(this)
        this.onTaxonomyChanged = this.onTaxonomyChanged.bind(this)
        this.getTaxonomyValues = this.getTaxonomyValues.bind(this)
        this.onCategoryChanged = this.onCategoryChanged.bind(this)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {
            setAttributes,
            attributes: {
                type,
                taxonomy,
                count
            },
        } = this.props;

        super.componentDidUpdate(prevProps, prevState, snapshot)
            if (prevProps.attributes) {
            if (type != prevProps.attributes.type) {

            }
            if (taxonomy != prevProps.attributes.taxonomy) {
                this.getTaxonomyValues()

            }
        }

    }

    componentDidMount() {
        super.componentDidMount()
        this.getTypes();
        this.getTaxonomies()

        const {
            setAttributes,
            attributes: {
                type,
                taxonomy,
                count
            },
        } = this.props;


        if (taxonomy != 'none') {
            this.getTaxonomyValues()

        }

    }

    onTypeChanged(value) {
        const {setAttributes} = this.props
        setAttributes({categories: []})
        setAttributes({taxonomy: 'none'})
        setAttributes({type: value})
    }

    onTaxonomyChanged(value) {
        const {setAttributes} = this.props
        setAttributes({categories: []})
        setAttributes({taxonomy: value})

    }

    onCategoryChanged(checked, value) {
        
        const {setAttributes, attributes: {categories}} = this.props
        if (!checked) {
            setAttributes({categories: categories.filter(i => i != value)})
        } else {
            let newCate = [...categories]
            newCate.push(value)
            setAttributes({categories: newCate})
        }

    }

    getTaxonomyValues() {
        const {
            setAttributes,
            attributes: {
                type,
                taxonomy,
                count
            },
        } = this.props;

        wp.apiFetch({
            path: '/wp/v2/' + taxonomy + '?per_page=100',
        }).then(data => {

            this.setState({taxonomyValues: data});
        });
    }

    getTaxonomies() {

        wp.apiFetch({
            path: '/wp/v2/taxonomies?per_page=100',
        }).then(data => {
            this.setState({
                taxonomies: data,
            });
        });
    }

    getTypes() {
        wp.apiFetch({
            path: '/wp/v2/types?per_page=100',
        }).then(data => {
            const types = data
            this.setState({
                types: data,
                loading: false
            });
        });
    }

    typeOptions() {
        const {
            setAttributes,
            attributes: {
                count,
                type,
                taxonomy,
                category
            },
        } = this.props;
        const {types, taxonomies, taxonomyValues} = this.state
        const typeOptions = types ? Object.keys(types)
            .filter(k => ['page', 'attachment', 'wp_block']
                .indexOf(k) == -1).map(k => ({
                slug: types[k].slug,
                label: types[k].name,
                value: types[k].rest_base
            })) : []

        return typeOptions

    }

    taxonomyOptions() {
        const {
            attributes: {
                type,
            },
        } = this.props;
        const {types, taxonomies, taxonomyValues} = this.state
        let slug;
        if (types) {
            slug = this.typeOptions().filter(t => t.value == type)[0].slug

            const taxonomyOptions = types && taxonomies ? Object.keys(taxonomies)
                .filter(i => taxonomies[i].types.indexOf(slug) > -1).map(k => ({
                    label: types[slug].name + ' -> ' + taxonomies[k].name,
                    value: taxonomies[k].rest_base
                })) : []

            return [{label: 'None', value: 'none'}, ...taxonomyOptions]
        } else {
            return []
        }
    }

    categoriesOptions() {
        const {types, taxonomies, taxonomyValues} = this.state
        const taxonomyValuesOptions = taxonomyValues && taxonomyValues.map(t => ({label: t.name, value: t.id}))
        return taxonomyValuesOptions
    }


    renderFilters() {
        const {
            attributes: {
                type,
                taxonomy,
                categories,

            }
        } = this.props
        return (<PanelBody title={__("Filter")}>
            <PanelRow>
                <SelectControl
                    label={__("Post Type")} options={this.typeOptions()}
                    value={type}
                    onChange={this.onTypeChanged}/>
            </PanelRow>
            <PanelRow>

                <SelectControl label={__("Use a taxonomy filter ")} options={this.taxonomyOptions()}
                               value={taxonomy}
                               onChange={this.onTaxonomyChanged}
                />
            </PanelRow>
            {taxonomy != 'none' && this.categoriesOptions().map(o => {
                return <PanelRow><CheckboxControl
                    label={o.label}
                    onChange={(checked) => this.onCategoryChanged(checked, o.value)}
                    checked={categories.indexOf(o.value) > -1}
                /></PanelRow>
            })}
        </PanelBody>)

    }
}


export class BlockEditWithAPIMetadata extends ComponentWithSettings {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        apiFetch({path: '/dg/v1/settings'}).then((settingsData) => {
            fetch(`/api/registry/eureka/apps`, {
                headers: {
                    'Accept': 'application/json',
                },
            })
              .then(response => response.json())
              .then(data => {

                  const apps = data.applications ? [...data.applications.application
                    .filter(a => a.instance[0].metadata.type === 'data')
                    .map(a => ({
                        label: a.name,
                        value: a.instance[0].vipAddress,
                        settings: a.instance[0]
                    })), 
                    {label: 'CSV', value: 'csv'}] : [{label: 'CSV', value: 'csv'}] 
                    
                    this.setState({
                      react_ui_url: settingsData["react_ui_url"] + '/' + window._page_locale,
                      react_api_url: settingsData["react_api_url"],
                      apache_superset_url: settingsData["apache_superset_url"],
                      site_language: settingsData["site_language"],
                      current_language: new URLSearchParams(document.location.search).get("edit_lang"),
                      apps
                  });
                  this.loadMetadata()
              })
              .catch(function (response) {

              })

        });


    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        super.componentDidUpdate(prevProps, prevState, snapshot)
        const {attributes: {app}} = this.props
        const {attributes: {app: prevAPP}} = prevProps


        if (app != prevAPP) {

            this.loadMetadata()
        }
    }

    _loadMetadata(app, datasetId) {
         if (app != "csv") {
            fetch(`/api/${app}/dimensions?datasetId=${datasetId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("HTTP status " + response.status);
                    } else {

                        return response.json()
                    }
                })
                .then(data => {

                    this.setState({
                        ...this.state,
                        dimensions: [{"label": __("None"), "value": "none"}, ...getTranslatedOptions(data)]
                    })
                })
                .catch(function (response) {
                    console.log("Error when loading dimensions")
                })


            fetch(`/api/${app}/filters?datasetId=${datasetId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("HTTP status " + response.status);
                    }
                    return response.json()
                })
                .then(data => {

                    const options = data.map(f => ({...f, value: f.param}))
                    this.setState({...this.state, filters: options})

                })
                .catch(function (response) {
                    console.log("Error when loading filters", response)
                })

            fetch(`/api/${app}/measures?datasetId=${datasetId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("HTTP status " + response.status);
                    }
                    return response.json()
                })
                .then(data => {

                    this.setState({...this.state, measures: getTranslatedOptions(data)})
                })
                .catch(function (response) {
                    console.log("Error when loading measures")
                })

            fetch(`/api/${app}/categories?datasetId=${datasetId}`)
                .then(response => {
                    console.log('loadCategories')
                    if (!response.ok) {
                        throw new Error("HTTP status " + response.status);
                    }
                    return response.json()
                })
                .then(data => {
                        this.setState({...this.state, categories: getTranslatedOptions(data)})
                    }
                )
                .catch(function (response) {
                    console.log("Error when getting categories", response)
                })
        }

        if (app == ALIVE_SUPERSET_APP) {
            this.loadDatasets(app)
        }
    }

    loadMetadata(newDatasetId) {
       const {attributes: {app}} = this.props
       this._loadMetadata(app, newDatasetId || this.props.attributes.datasetId)       
    }   

    loadDatasets(app) {
        fetch(`/api/${app}/datasets`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("HTTP status " + response.status);
                }
                return response.json()
            })
            .then(data => {
                this.setState({...this.state, datasets: data})
            })
            .catch(function (response) {
                console.log("Error when loading datasets")
            })
    }
}

export default SizeConfig

