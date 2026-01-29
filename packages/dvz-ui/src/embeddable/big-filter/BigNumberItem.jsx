import React from 'react';
import { Grid } from "semantic-ui-react";

export const BigNumberItem = (props) => {
    const {
        child,
        selectedKey,
        appliedFilters,
        dimension,
        app,
        group,
        parent,
        blockName,
        hasParentFilters,
        onSetFilter,
        onUnSetFilter,
        intl,
        numberFontSize,
        numberColor,
        labelFontSize,
        labelColor,
        formatObject,
        decode,
        getLabel, // Received from parent
        idx
    } = props;

    const itemsOnFilters = appliedFilters && appliedFilters[dimension] ? appliedFilters[dimension] : []
    const isSelected = appliedFilters && appliedFilters[dimension] ? appliedFilters[dimension].indexOf(child.value) > -1 : false;
    const value = child[selectedKey]

    const click = () => {

        if (parent) {
            if (!hasParentFilters) return;
        }
        const newFilters = [...itemsOnFilters]
        if (isSelected) {
            newFilters.splice(newFilters.indexOf(child.value), 1)
        } else {
            newFilters.push(child.value)
        }
        if (newFilters.length == 0) {

            onSetFilter({ app, group, parent, param: child.type, value: [] })
            onUnSetFilter({ app, group: blockName, parent, param: child.type })
        } else {
            onSetFilter({ app, group, param: child.type, parent, value: [...newFilters] })
            onSetFilter({ app, group: blockName, param: child.type, parent, value: [...newFilters] })
        }
    }

    const numberStyle = (selected) => {
        return {
            cursor: 'pointer',
            color: selected ? decode(numberColor) : "#CCC",
            fontSize: numberFontSize + 'px',
            textAlign: 'center',
            paddingTop: '3%',
            paddingLeft: '1%',
            paddingRight: '1%',
            paddingBottom: '0px',
            margin: '0px'
        };
    }

    const labelStyle = (selected) => {
        return {
            cursor: 'pointer',
            color: selected ? decode(labelColor) : "#CCC",
            fontSize: labelFontSize + 'px',
            textAlign: 'center',
            padding: '0px',
            margin: '0px'
        }
    };
    const cellStyle = (selected) => {
        return {
            border: '1px solid #EEE',
            backgroundColor: selected ? '#EEE' : '#FFF',
        }
    };

    const formatNumber = (val) => intl.formatNumber(val, { ...formatObject });

    return <Grid.Column key={idx} onClick={click} style={cellStyle(isSelected)}>
        <p style={numberStyle(isSelected)} className="big-number">{formatNumber(value)}
        </p>
        <p style={labelStyle(isSelected)} className="big-number-label">{getLabel ? getLabel(child.value) : (child.label || child.value)}</p>
    </Grid.Column>
}
