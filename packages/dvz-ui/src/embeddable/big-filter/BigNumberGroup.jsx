import React, { useEffect } from 'react';
import { Container, Grid } from "semantic-ui-react";
import { BigNumberItem } from './BigNumberItem';
import { decode } from '../utils/parseUtils';

const BigNumberGroup = (props) => {
    const {
        group,
        app,
        parent,
        hasParentFilters,
        nColumns,
        height,
        blockName,
        measures,
        dimension,
        data,
        numberColor,
        numberFontSize,
        labelColor,
        labelFontSize,
        intl,
        onUnSetFilter,
        onSetFilter,
        appliedFilters,
        sort,
        order,
        showZeroValues
    } = props;

    const selectedKey = measures[app] ? Object.keys(measures[app]).find(key => measures[app][key].selected) : null


    const readGroup = parent ? parent : blockName + Math.random(0, 1) //were to read my linked filters
    const selfGroup = blockName //where to store my  state


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

    useEffect(() => {

        onSetFilter({ app, group, param: dimension, value: [Number.MIN_SAFE_INTEGER] }) //this is for global group the one connected to charts
        onUnSetFilter({ app, group: blockName, parent, param: dimension }) //this one is internal state to filter other linked big filters

    }, []);

    useEffect(() => {
        if (parent && parent != "" && hasParentFilters === false && appliedFilters) {
            const hasAnyFilters = Object.values(appliedFilters).some(filterArray => filterArray && filterArray.length > 0);
            if (hasAnyFilters) {
                onSetFilter({ app, group, param: dimension, value: [Number.MIN_SAFE_INTEGER] })
                onUnSetFilter({ app, group: blockName, parent, param: dimension })
            }
        }
    }, [hasParentFilters]);

    useEffect(() => {

        const items = data.children.map(d => d.value)
        const hasMissing = appliedFilters && appliedFilters[dimension] ? appliedFilters[dimension].some(val => !items.includes(val)) : false;
        if (hasMissing) {
            const cleanedFilters = appliedFilters[dimension].filter(val => items.includes(val));
            if (cleanedFilters.length == 0) {
                onUnSetFilter({ app, group, param: dimension }) //write on global filters  group(charts)
                onUnSetFilter({ app, group: selfGroup, param: dimension }) //keep isolated self selected filter
            } else {
                onSetFilter({ app, group, param: dimension, value: cleanedFilters })//write on global filters  group(charts)
                onSetFilter({ app, group: selfGroup, parent, param: dimension, value: cleanedFilters }) //keep update self selected filter
            }
        }
    }, [hasParentFilters, appliedFilters, data]);

    const getLabel = (type) => {
        if (!data || !data.metadata || !data.metadata.types) return null;

        const l = data.metadata.types.filter(d => d.dimension == dimension)
        return l && l.length > 0 ? l[0].items.filter(i => i.code == type)[0]?.value : null;
    }

    if (dimension == null) {
        return <div>Top Level</div>
    } else {
        return <Container fluid={true} style={{ padding: '0px', margin: '0px', height: `${height}px` }}>



            <Grid fluid={true} celled={true} stackable columns={nColumns} style={{ border: '1px solid #EEE' }}>
                {data.children && data.children.filter(d => {
                    if (showZeroValues === "true") {
                        return d[selectedKey] !== null && d[selectedKey] !== undefined;
                    } else {
                        return d[selectedKey] && d[selectedKey] > 0;
                    }
                }).sort(sortFunc).map((child, idx) => {

                    return <BigNumberItem
                        key={idx}
                        idx={idx}
                        child={child}
                        selectedKey={selectedKey}
                        appliedFilters={appliedFilters}
                        dimension={dimension}
                        app={app}
                        group={group}
                        parent={parent}
                        blockName={blockName}
                        hasParentFilters={hasParentFilters}
                        onSetFilter={onSetFilter}
                        onUnSetFilter={onUnSetFilter}
                        intl={intl}
                        numberFontSize={numberFontSize}
                        numberColor={numberColor}
                        labelFontSize={labelFontSize}
                        labelColor={labelColor}
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
