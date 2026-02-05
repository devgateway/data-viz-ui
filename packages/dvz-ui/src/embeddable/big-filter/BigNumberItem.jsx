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
        labelFontSize,
        backgroundColor,
        numberColor,
        labelColor,
        unselectedBackgroundColor,
        unselectedNumberColor,
        unselectedLabelColor,
        formatObject,
        decode,
        getLabel, // Received from parent
        idx
    } = props;


    const isSelected = appliedFilters.indexOf(child.value) > -1;
    const value = child[selectedKey]

    const click = () => {

        if (props.handleClick) {
            props.handleClick();
        }


    }

    const numberStyle = (selected) => {
        return {
            cursor: 'pointer',
            color: selected ? decode(numberColor) : decode(unselectedNumberColor),
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
            color: selected ? decode(labelColor) : decode(unselectedLabelColor),
            fontSize: labelFontSize + 'px',
            textAlign: 'center',
            padding: '0px',
            margin: '0px'
        }
    };
    const cellStyle = (selected) => {

        return {
            border: '1px solid #EEE',
            backgroundColor: selected ? decode(backgroundColor) : decode(unselectedBackgroundColor),

        }
    };



    const formatNumber = (val) => {

        const numberFormat = {
            style: (formatObject.style === 'compacted') ? 'decimal' : formatObject.style,
            notation: (formatObject.style === 'compacted') ? 'compact' : "standard",
            currency: formatObject.currency,
            minimumFractionDigits: parseInt(formatObject.minimumFractionDigits),
            maximumFractionDigits: parseInt(formatObject.maximumFractionDigits)
        }

        return intl.formatNumber(val, { ...numberFormat })
    };




    return (<Grid.Column className={` big filter item ${isSelected ? "selected" : "unselected"}`} key={idx} onClick={click} style={cellStyle(isSelected)} >
        <p style={numberStyle(isSelected)} className="big-number">{formatNumber(value)}</p>
        <p style={labelStyle(isSelected)} className="big-number-label">{getLabel ? getLabel(child.value) : (child.label || child.value)}</p>
    </Grid.Column >
    )
}
