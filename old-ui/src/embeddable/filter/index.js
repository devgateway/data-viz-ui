import React, {useEffect, useRef, useState} from "react";
import {Checkbox, Container, Divider, Dropdown, Icon, Input, Label, Radio, Segment} from "semantic-ui-react";
import CategoriesConsumer from '../data/CategoriesConsumer'
import CategoriesProvider from '../data/CategoriesProvider'
import {connect} from "react-redux";
import {setFilter, setInitialFilters} from "../reducers/data";
import {injectIntl} from 'react-intl';

const FILTER_TYPE_MULTI_SELECT = 'multi-select';
const FILTER_TYPE_SINGLE_SELECT = 'single-select';


const NO_DATA = 'NO_DATA';
const DEFAULT_VALUE_INPUT = 'DEFAULT_VALUE_INPUT'
const LOWEST_VALUE = 'LOWEST_VALUE'
const HIGHEST_VALUE = 'HIGHEST_VALUE'


const booleanParameter = (val) => {
    if (val instanceof Boolean) {
        return val
    } else {
        return val == "true"
    }
}

const toOptions = (items, locale) => items ? items.sort((a, b) => a.position - b.position).map(i => {
    const text = locale && i.labels && i.labels[locale.toUpperCase()] ? i.labels[locale.toUpperCase()] : i.value
    return ({
        key: i.id,
        value: i.id,
        text: text,
        icon: i.value.toLocaleLowerCase(),
        position: i.position ? i.position : i.value,
    })
}) : []

const decode = (value) => {
    return decodeURIComponent(value)
}

const parse = (value) => {
    try {
        return JSON.parse(decode(value))
    } catch (error) {

    }

    return null
}

const mapStateToProps = (state, ownProps) => {
    const {app, group, param} = ownProps
    return {
        current: state.getIn(['data', 'filters', app, group, param]),
    }
}

const mapActionCreators = {
    onInit: setInitialFilters, onChange: setFilter
};

const FilterDropDown = (props) => {

    const {isRange, options, alphabeticalSort, ascOrder} = props
    let sortedOptions = []
    if (booleanParameter(alphabeticalSort)) {
        sortedOptions = options.sort(function (a, b) {
            const aText = a.text ? a.text.toLowerCase() : "";
            const bText = b.text ? b.text.toLowerCase() : "";
            if (booleanParameter(ascOrder)) {
                return aText < bText ? -1 : aText > bText ? 1 : 0;
            } else {
                return aText < bText ? 1 : aText > bText ? -1 : 0;
            }
        });
    } else {
        sortedOptions = options.sort(function (a, b) {
            return booleanParameter(ascOrder) ? a.position - b.position : b.position - a.position;
        });
    }

    const filterProps = {...props, options: sortedOptions}

    if (isRange) {
        return <RangeFilterDropDown  {...filterProps}/>
    } else {
        return <ListFilterDropDown {...filterProps}/>
    }

}

const ListFilterDropDown = connect(mapStateToProps, mapActionCreators)((props) => {

    const {
        allLabel,
        noneLabel,
        placeholder,
        options,
        app,
        group,
        param,
        current,
        onChange,
        onInit,
        useSingleColumn,
        enableTextSearch,
        filterType,
        defaultValues,
        showNoDataOption,
        defaultValueCriteria,
        allNoneSameBehaviour,
        closeOnSelect,
        hiddenFilters
    } = props

    const [searchFilter, setSearchFilter] = useState("")
    const changeFilter = (value) => {
        let newValue = []
        if (filterType != FILTER_TYPE_SINGLE_SELECT && !closeOnSelect && current && current.indexOf(value) > -1) {
            newValue = current.filter(i => i !== value)
        } else if (filterType != FILTER_TYPE_SINGLE_SELECT && current && !closeOnSelect) {
            newValue = [...current, value]
        } else {
            newValue = [value]
        }

        onChange({app, group, param, value: newValue})
        if (closeOnSelect) {
            refContainer.current.close()
        }
    }
    const all = (value) => {
        const matchingItems = options.filter(o => {
            if (enableTextSearch && searchText && searchText.trim().length > 0 && o.text) {
                return o.text.toLowerCase().includes(searchText.toLowerCase())
            }
            return true;
        })

        onChange({app, group, param, value: matchingItems.map(v => v.value)})
        if (closeOnSelect) {
            refContainer.current.close()
        }

    }
    const none = () => {
        const matchingItems = options.filter(o => {
            if (enableTextSearch && searchText && searchText.trim().length > 0 && o.text) {
                return o.text.toLowerCase().includes(searchText.toLowerCase())
            }
            return true;
        })

        onChange({app, group, param, value: allNoneSameBehaviour ? matchingItems.map(v => v.value) : []})
        if (closeOnSelect) {
            refContainer.current.close()
        }
    }

    const freeTextSelect = (searchText) => {
        setSearchText(searchText)
        const matchingItems = options.filter(o => {
            if (enableTextSearch && searchText && searchText.trim().length > 0 && o.text) {
                return o.text.toLowerCase().includes(searchText.toLowerCase())
            }
            return true;
        })
        onChange({app, group, param, value: matchingItems.map(v => v.value)})
    }

    useEffect((e) => {
        if (!current) {

            const filterItems = options.map(o => o.value)
            if (filterType == FILTER_TYPE_MULTI_SELECT || filterType == "") {
                //if multiple select select all  elements
                onInit({app, group, param, value: filterItems})
            } else {
                if (app == "csv") {
                    //if single select select base on default value criteria
                    let filterValues = []
                    if (defaultValueCriteria === DEFAULT_VALUE_INPUT) {
                        filterValues = defaultValues ? defaultValues.split(',') : []
                    } else if (defaultValueCriteria == LOWEST_VALUE) {
                        filterValues = filterItems.length > 0 ? [filterItems[0]] : []
                    } else if (defaultValueCriteria == HIGHEST_VALUE) {
                        filterValues = filterItems.length > 0 ? [filterItems[filterItems.length - 1]] : []
                    }
                    onInit({app, group, param, value: filterValues})
                }else{
                    
                    onInit({app, group, param, value: [filterItems[0]]})
                }
            }
        }

    }, [])

    const getSelected = () => {
        if (filterType == FILTER_TYPE_SINGLE_SELECT) {
            const selectedItem = current && current[0] ? options.filter(v => v.value == current[0])[0] : null
            return `${placeholder} ${selectedItem ? selectedItem.text : ""}`;
        } else {
            return `${placeholder} (${current ? current.filter(v => {
                if (v == Number.MIN_SAFE_INTEGER) {
                    return false
                }

                if (hiddenFilters && hiddenFilters.length > 0) {
                    return !(hiddenFilters.indexOf(v) != -1)
                }

                return true
            }).length : 0}/${options.filter(f => {
                if (hiddenFilters && hiddenFilters.length > 0) {
                    return !(hiddenFilters.indexOf(f.id) != -1)
                }
                return true
            }).length}) `
        }
    }
    const refContainer = useRef(null);
    const [searchText, setSearchText] = useState('')

    return (
        <Dropdown
            ref={refContainer}
            fluid
            text={getSelected()}
            scrolling={false}
            button
            icon={"angle down ignore"}
            multiple={true}
            search
            floating={false}
            className={`${current && current.length > 0 ? 'applied ' : ''}`}>

            <Dropdown.Menu>
                {filterType != FILTER_TYPE_SINGLE_SELECT && <>
                    <Segment>
                        <Dropdown.Item>
                            <Label basic onClick={all}>{allLabel}</Label> | <Label basic
                                                                                   onClick={none}>{noneLabel}</Label>
                        </Dropdown.Item>
                    </Segment>
                    {enableTextSearch && <>
                        <Container>
                            <Dropdown.Item>


                                <div class="ui action input">
                                    <Input placeholder='Search...' iconPosition='right'>
                                        <input className="filter-search" value={searchText} onChange={e => {
                                            freeTextSelect(e.target.value)
                                        }}/>

                                        <Icon name='remove' link className="clear-icon ignore" onClick={e => {
                                            freeTextSelect('')
                                        }}></Icon>
                                    </Input>
                                </div>
                            </Dropdown.Item>
                        </Container>
                        <Divider/>
                    </>}

                </>}
                <br></br>
                <Container className={useSingleColumn ? "dropdown-single-column" : ""}>
                    {options.filter(o => {
                        if (enableTextSearch && searchText && searchText.trim().length > 0 && o.text) {
                            return o.text.toLowerCase().includes(searchText.toLowerCase())
                        }
                        return true;
                    }).map(({value, text}) => (
                        <Dropdown.Item className={useSingleColumn ? "dropdown-item-single-column" : ""}>
                            {filterType == FILTER_TYPE_SINGLE_SELECT && <Radio
                                checked={current && current.indexOf(value) > -1 ? true : false}
                                onChange={e => changeFilter(value)}
                                label={text}/>}
                            {filterType == FILTER_TYPE_MULTI_SELECT && <Checkbox
                                checked={(current && current.indexOf(value) > -1) && !(options.length == current.length && allNoneSameBehaviour) ? true : false}
                                onChange={e => changeFilter(value)}
                                label={text}/>}
                        </Dropdown.Item>))}
                </Container>
            </Dropdown.Menu>

        </Dropdown>
    )
})

const RangeFilterDropDown = connect(mapStateToProps, mapActionCreators)(({
                                                                             placeholder,
                                                                             startLabel,
                                                                             endLabel,
                                                                             options,
                                                                             onChange,
                                                                             app,
                                                                             group,
                                                                             param,
                                                                             current
                                                                         }) => {

    const [start, setStart] = useState(options[0].position)
    const [end, setEnd] = useState(options[options.length - 1].position)
    useEffect((e) => {

        const current = options.filter(v => (v.position > start || v.position === start) && (v.position < end || v.position === end)).map(o => o.value)
        onChange({app, group, param, value: current})
    }, [start, end])

    const refContainer = useRef(null);

    return (<Dropdown

        ref={refContainer}
        fluid
        text={`${placeholder} (${current ? current.filter(v => v != Number.MIN_SAFE_INTEGER).length : 0}/${options.length})`}
        scrolling={false}
        button
        multiple={true}
        search
        floating={false}
        icon={"angle down ignore"}
        className={`${current && current.length > 0 ? 'applied ' : ''} range`}

    >
        <Dropdown.Menu>

            <Segment>
                <Dropdown.Item> <Label basic>{startLabel}</Label></Dropdown.Item>
            </Segment>
            <Container>

                {options.map(({value, text, position}) => (<Dropdown.Item>
                    <Radio
                        disabled={position > end}
                        checked={start === position}
                        onChange={e => setStart(position)}
                        label={text}/></Dropdown.Item>))}
            </Container>
            <Segment>
                <Dropdown.Item> <Label basic>{endLabel}</Label></Dropdown.Item>
            </Segment>
            <Container>

                {options.map(({value, text, position}) => (<Dropdown.Item>
                    <Radio
                        disabled={position < start}
                        checked={end === position}
                        onChange={e => setEnd(position)}
                        label={text}/></Dropdown.Item>))}
            </Container>
        </Dropdown.Menu>
    </Dropdown>)
})


const CategoryFilter = (props) => {
    
    const {data, type, showNoDataOption} = props
    const cat = data.filter(d => d.type === type)[0]
    const filteredCategories = cat ? cat.items.filter(f => {
        if (!showNoDataOption && f.code == NO_DATA) {
            return false
        }
        if (props.hiddenFilters && props.hiddenFilters.length > 0) {
            return !(props.hiddenFilters.indexOf(f.id) != -1)
        }
        return true
    }) : []
    const options = filteredCategories ? toOptions(filteredCategories, props.locale) : []
    return (
        <Container fluid={true} className={`filter`}>
            <FilterDropDown {...props} options={options}></FilterDropDown>
        </Container>
    )
}


const BooleanFilter = connect(mapStateToProps, mapActionCreators)((props) => {
    let idx = 0
    const options = [{
        key: "Yes", value: true, text: "Yes", position: idx++,
    }, {
        key: "No", value: false, text: "No", position: idx++,
    }]
    return (<Container fluid={true} className={`filter`}>
        <FilterDropDown options={options}  {...props} > </FilterDropDown>
    </Container>)
})


const CSVFilter = (props) => {
    const {csvValue} = props
    let idx = 0
    const options = csvValue.split(',').map(o => {
        return {
            key: o, value: o, text: o, icon: o.toLocaleLowerCase(), position: idx++,
        }
    })

    return <Container fluid={true} className={`filter`}>
        <FilterDropDown options={options}  {...props} > </FilterDropDown>
    </Container>
}


const Filter = ({
                    "data-group": group,
                    "data-app": app,
                    "data-param": param,
                    "data-icon": icon,
                    "data-type": type,
                    "data-place-holder": placeholder,
                    "data-is-range": isRange = "false",
                    "data-all-label": allLabel,
                    "data-none-label": noneLabel,
                    "data-start-label": startLabel,
                    "data-end-label": endLabel,
                    "data-csv-value": csvValue,
                    "data-filters": filters = [],
                    "data-use-single-column": useSingleColumn = "false",
                    "data-enable-text-search": enableTextSearch = "false",
                    "data-filter-type": filterType,
                    "data-default-values": defaultValues,
                    "data-show-no-data-option": showNoDataOption = "true",
                    "data-default-value-criteria": defaultValueCriteria = "DEFAULT_VALUE_INPUT",
                    "data-hidden-filters": hiddenFilters = '[]',
                    "data-all-none-same-behaviour": allNoneSameBehaviour = "false",
                    "data-close-on-select": closeOnSelect = "false",
                    "data-alphabetical-sort": alphabeticalSort = "true",
                    "data-asc-order": ascOrder = "true",
                    intl,
                }) => {


    let params = {}
    const ff = parse(filters) || {}

    if (ff && ff.forEach) {
        ff.forEach(f => {
            if (f.value != null && f.value.filter(v => v != null && v.toString().trim() != "").length > 0)
                params[f.param] = f.value
        })
    }

    const hiddenFiltersArr = parse(hiddenFilters)
    let defaultFilterType;
    if (filterType == null || filterType == "") {
        defaultFilterType = isRange === 'true' ? "range" : "multi-select";
    } else {
        defaultFilterType = filterType;
    }
    if (app === 'csv') {
        return <CSVFilter allLabel={allLabel} noneLabel={noneLabel}
                          isRange={isRange === 'true'}
                          csvValue={csvValue} app={app} group={group}
                          icon={icon} placeholder={placeholder}
                          startLabel={startLabel} endLabel={endLabel}
                          param={param}
                          useSingleColumn={useSingleColumn === 'true'}
                          enableTextSearch={enableTextSearch === 'true'}
                          filterType={defaultFilterType}
                          defaultValues={defaultValues}
                          defaultValueCriteria={defaultValueCriteria}
                          allNoneSameBehaviour={allNoneSameBehaviour == true || allNoneSameBehaviour == "true"}
                          closeOnSelect={closeOnSelect == true || closeOnSelect == "true"}
                          locale={intl.locale}
        />
    } else {

        if (app) {
            return (<CategoriesProvider
              params={params}
              app={app}
              hiddenFilters={hiddenFiltersArr || []}>
                <CategoriesConsumer>
                    <Container fluid={true}>
                        {type === "Boolean" &&
                            <BooleanFilter startLabel={startLabel}
                                           endLabel={endLabel}
                                           allLabel={allLabel}
                                           noneLabel={noneLabel}
                                           isRange={booleanParameter(isRange)}
                                           app={app}
                                           group={group}
                                           icon={icon}
                                           placeholder={placeholder}
                                           param={param}
                                           filterType={defaultFilterType}
                                           defaultValues={defaultValues}
                                           locale={intl.locale}>

                            </BooleanFilter>}
                        {type !== "Boolean" && <CategoriesConsumer type={type}>
                            <CategoryFilter
                                startLabel={startLabel}
                                endLabel={endLabel} allLabel={allLabel}
                                noneLabel={noneLabel}
                                isRange={booleanParameter(isRange)}
                                app={app} group={group}
                                icon={icon} placeholder={placeholder}
                                param={param}
                                alphabeticalSort={alphabeticalSort}
                                ascOrder={ascOrder}
                                useSingleColumn={booleanParameter(useSingleColumn)}
                                enableTextSearch={booleanParameter(enableTextSearch)}
                                showNoDataOption={booleanParameter(showNoDataOption)}
                                filterType={defaultFilterType}
                                defaultValues={defaultValues}
                                defaultValueCriteria={defaultValueCriteria}
                                hiddenFilters={hiddenFiltersArr || []}
                                allNoneSameBehaviour={allNoneSameBehaviour == true || allNoneSameBehaviour == "true"}
                                closeOnSelect={booleanParameter(closeOnSelect)}
                                locale={intl.locale}>

                            </CategoryFilter>
                        </CategoriesConsumer>}

                    </Container>
                </CategoriesConsumer>
            </CategoriesProvider>)
        } else {
            return null;
        }
    }
}


export default injectIntl(Filter)