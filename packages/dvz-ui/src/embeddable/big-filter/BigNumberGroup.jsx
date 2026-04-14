import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Container, Grid, GridColumn, GridRow } from '@devgateway/ui';
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
        dimension1,
        dimension2,
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
        const l = data.metadata.types.filter(d => d.dimension == dimension1)
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
        onSetFilter({ app, group, param: dimension1, value: [Number.MIN_SAFE_INTEGER] }) //this is for global group the one connected to charts
        onUnSetFilter({ app, group: blockName, parent, param: dimension1 }) //this one is internal state to filter other linked big filters
    }, []);

    const items = data.children.map(d => d.value)
    const filteredValues = filteredFilters.map(d => d.value)

    useEffect(() => {
        //this is consilation script here we need to compare selected vs new items remove the non existing ones from applied filters if no longer available
        const missing = appliedFilters ? appliedFilters.filter(val => !filteredValues.includes(val)) : []//

        if (hasParentFilters && (parentAppliedFilters.length == 0)) {//remove all selected items
            console.log(blockName, "RESETING FILTER; PARENT IS EMPTY")

            onSetFilter({ app, group, param: dimension1, value: [Number.MIN_SAFE_INTEGER] })
            onUnSetFilter({ app, group: selfGroup, param: dimension1 }) //keep isolated self selected filter
            setLocalFilters([]);

        } else if (missing.length > 0) {

            const cleanedFilters = appliedFilters.filter(val => filteredValues.indexOf(val) > -1)

            if (cleanedFilters.length == 0) {
                setLocalFilters([]);
                onSetFilter({ app, group, param: dimension1, value: [Number.MIN_SAFE_INTEGER] })
                onUnSetFilter({ app, group: selfGroup, param: dimension1 }) //keep isolated self selected filter
            } else {
                onSetFilter({ app, group, param: dimension1, value: cleanedFilters })//write on global filters  group(charts)
                onSetFilter({ app, group: selfGroup, parent, param: dimension1, value: cleanedFilters }) //keep update self selected filter
            }

        } else {
            setLocalFilters(appliedFilters);
        }
    }, [data]);

    // Use localFilters for display count to reflect immediate user action
    const selected = localFilters ? localFilters.length : 0;
    const total = filteredFilters ? filteredFilters.length : 0

    // ADDED: Calculate if the component should be locked because the parent is empty
    const isParentMissing = hasParentFilters && (!parentAppliedFilters || parentAppliedFilters.length === 0);

    if (dimension1 == null) {
        return <h2>Select a dimension to start configuring the component</h2>
    } else {
        return <Container fluid={true} style={{ padding: '0px', margin: '0px', height: `${height}px` }}>
            <Grid fluid={true} celled={true} stackable columns={nColumns} style={{ border: '1px solid #EEE' }}>
                <GridRow>
                    <GridColumn width={16} textAlign='right'>Selected    {selected}/{total}</GridColumn>
                </GridRow>
                {data.children && filteredFilters.map((child, idx) => {
                    return <BigNumberItem
                        key={idx}
                        idx={idx}
                        child={child}

                        isDisabled={isParentMissing} // ADDED: Pass the locked state down to the child

                        selectedKey={selectedKey} //which measure will be shown
                        appliedFilters={localFilters} // Use overriding filters
                        dimension1={dimension1}
                        dimension2={dimension2}
                        app={app}
                        group={group}
                        parent={parent}
                        blockName={blockName}
                        hasParentFilters={hasParentFilters}
                        onSetFilter={(params) => {}}
                        handleClick={() => handleSetLocalFilter(child.value, child.type)}
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