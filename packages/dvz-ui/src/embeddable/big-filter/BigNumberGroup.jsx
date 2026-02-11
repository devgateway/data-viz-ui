import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Container, Grid } from "semantic-ui-react";
import { BigNumberItem } from './BigNumberItem';
import { decode } from '../utils/parseUtils';
import _ from 'lodash';

const BigNumberGroup = (props) => {
    const {
        group,
        app,
        parent,

        nColumns,
        height,
        blockName,
        measures,
        dimension,
        data,
        numberFontSize,
        backgroundColor,
        numberColor,
        labelColor,
        unselectedBackgroundColor,
        unselectedNumberColor,
        unselectedLabelColor,
        labelFontSize,
        intl,
        onUnSetFilter,
        onSetFilter,
        appliedFilters, ///self applied filters
        hasParentFilters, //util flag
        effectiveFilter, //all filter toghether
        parentAppliedFilters, //parent applied filter
        sort,
        order,
        showZeroValues
    } = props;

    const selectedKey = measures[app] ? Object.keys(measures[app]).find(key => measures[app][key].selected) : null
    const readGroup = parent ? parent : blockName + Math.random(0, 1) //were to read my linked filters, if parent we need to use parent filters parameters to load the data
    const selfGroup = blockName //where to store my  state


    const [localFilters, setLocalFilters] = useState([]);

    console.log("localFilters", blockName, localFilters)
    console.log("effectiveFilter", effectiveFilter)
    const formatObject = measures[app] && measures[app].format ? measures[app].format : {
        style: "percent",
        minimumFractionDigits: 1,
        maximumFractionDigits: 1
    }

    const sortFunc = (a, b) => {
        const valueA = a[selectedKey]
        const valueB = b[selectedKey]
        const direction = order === 'asc' ? 1 : -1

        if (sort === 'alpha') {
            // Alphabetical sorting based on the label
            const labelA = getLabel(a.value) || ''
            const labelB = getLabel(b.value) || ''
            return direction * labelA.localeCompare(labelB)
        } else {
            // Numerical sorting based on the selected measure value
            const numA = parseFloat(valueA) || 0
            const numB = parseFloat(valueB) || 0
            return direction * (numA - numB)
        }
    }

    const getLabel = (type) => {
        if (!data || !data.metadata || !data.metadata.types) return null;
        const l = data.metadata.types.filter(d => d.dimension == dimension)
        return l && l.length > 0 ? l[0].items.filter(i => i.code == type)[0]?.value : null;
    }




    const debouncedApplyFilter = useRef(
        _.debounce((newFilters, type) => {
            if (newFilters.length == 0) {

                onSetFilter({ app, group, parent, param: type, value: [] });
                onUnSetFilter({ app, group: blockName, parent, param: type });
            } else {
                onSetFilter({ app, group, param: type, parent, value: [...newFilters] });
                onSetFilter({ app, group: blockName, param: type, parent, value: [...newFilters] });
            }
        }, 400) // 400ms delay
    ).current;


    // Handler called by BigNumberItem
    const handleSetLocalFilter = (childValue, type) => {
        if (hasParentFilters && (!parentAppliedFilters || parentAppliedFilters.length === 0)) return;
        let newFilters = [...localFilters];

        if (newFilters.includes(childValue)) {
            newFilters = newFilters.filter(f => f !== childValue);
        } else {
            newFilters.push(childValue);
        }

        // 1. Update local state immediately for UI responsiveness
        setLocalFilters(newFilters);
        // 2. Trigger the debounced server update
        debouncedApplyFilter(newFilters, type);

    };

    // -------------------------------------------------------------------------

    const filteredFilters = data.children.filter(d => {
        if (showZeroValues === "true") {
            return d[selectedKey] !== null && d[selectedKey] !== undefined;
        } else {
            return d[selectedKey] && d[selectedKey] > 0;
        }
    }).sort(sortFunc)


    useEffect(() => {
        onSetFilter({ app, group, param: dimension, value: [Number.MIN_SAFE_INTEGER] }) //this is for global group the one connected to charts
        onUnSetFilter({ app, group: blockName, parent, param: dimension }) //this one is internal state to filter other linked big filters

    }, []);


    const items = data.children.map(d => d.value)
    const filteredValues = filteredFilters.map(d => d.value)

    useEffect(() => {
        //this is consilation script here we need to compare selected vs new items remove the non existing ones from applied filters if no longer available

        const missing = appliedFilters ? appliedFilters.filter(val => !filteredValues.includes(val)) : []//
        if (blockName == "ds")


            if (hasParentFilters && (parentAppliedFilters.length == 0)) {//remove all selected items
                console.log(blockName, "RESETING FILTER; PARENT IS EMPTY")

                onSetFilter({ app, group, param: dimension, value: [Number.MIN_SAFE_INTEGER] })
                onUnSetFilter({ app, group: selfGroup, param: dimension }) //keep isolated self selected filter
                setLocalFilters([]);

            } else if (missing.length > 0) {

                if (blockName == "ds") {
                    debugger
                }
                const cleanedFilters = appliedFilters.filter(val => filteredValues.indexOf(val) > -1)

                if (cleanedFilters.length == 0) {
                    setLocalFilters([]);
                    onSetFilter({ app, group, param: dimension, value: [Number.MIN_SAFE_INTEGER] })
                    onUnSetFilter({ app, group: selfGroup, param: dimension }) //keep isolated self selected filter

                } else {

                    onSetFilter({ app, group, param: dimension, value: cleanedFilters })//write on global filters  group(charts)
                    onSetFilter({ app, group: selfGroup, parent, param: dimension, value: cleanedFilters }) //keep update self selected filter

                }

            } else {
                setLocalFilters(appliedFilters);
            }
    }, [data]);

    // Use localFilters for display count to reflect immediate user action
    const selected = localFilters ? localFilters.length : 0;
    const total = filteredFilters ? filteredFilters.length : 0




    if (dimension == null) {
        return <h2>Select a dimensiosn to start configuring the component</h2>
    } else {
        return <Container fluid={true} style={{ padding: '0px', margin: '0px', height: `${height}px` }}>
            <Grid fluid={true} celled={true} stackable columns={nColumns} style={{ border: '1px solid #EEE' }}>
                <Grid.Row>
                    <Grid.Column width={16} textAlign='right'>Selected    {selected}/{total}</Grid.Column>
                </Grid.Row>
                {data.children && filteredFilters.map((child, idx) => {
                    // We override the appliedFilters prop passed to item to use our localFilters
                    // This ensures the item looks selected immediately
                    return <BigNumberItem
                        key={idx}
                        idx={idx}
                        child={child}
                        selectedKey={selectedKey} //which measure will be shown
                        appliedFilters={localFilters} // Use overriding filters
                        dimension={dimension}
                        app={app}
                        group={group}
                        parent={parent}
                        blockName={blockName}
                        hasParentFilters={hasParentFilters}
                        onSetFilter={(params) => {
                            // Intercept the call from BigNumberItem
                            // Note: BigNumberItem calls onSetFilter with complex object, 
                            // but we essentially just need to know which item was clicked.
                            // However, since we are rewriting the logic here, we can just pass
                            // our simple handler if we modify BigNumberItem or keep the signature compatible.
                            //
                            // Wait! BigNumberItem implements its own toggle logic inside 'click'. 
                            // We should probably pass a custom handler instead of onSetFilter
                            // OR modify BigNumberItem to accept a simple 'onClick' handler.
                            //
                            // Let's pass a special prop `customClickHandler` and check for it in BigNumberItem
                            // OR just pass our handler as `onSetFilter` but that might break strict prop types if checked.
                            // The cleanest way without modifying BigNumberItem heavily is to pass this new handler
                            // as a prop, but BigNumberItem needs to be updated to use it.
                        }}
                        // We will pass our new handler as a specific prop to intercept logic
                        handleClick={() => handleSetLocalFilter(child.value, child.type)}

                        // We pass the original handlers too just in case, but they won't be used for the click
                        // if we update BigNumberItem to prefer handleClick
                        onUnSetFilter={onUnSetFilter}

                        intl={intl}
                        numberFontSize={numberFontSize}
                        labelFontSize={labelFontSize}
                        backgroundColor={backgroundColor}
                        numberColor={numberColor}
                        labelColor={labelColor}
                        unselectedBackgroundColor={unselectedBackgroundColor}
                        unselectedNumberColor={unselectedNumberColor}
                        unselectedLabelColor={unselectedLabelColor}
                        formatObject={formatObject}
                        decode={decode}
                        getLabel={getLabel}
                    />
                })}
            </Grid>

        </Container>
    }
}

export default BigNumberGroup;
