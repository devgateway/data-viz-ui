import React from 'react';
import { Grid, GridColumn } from '@devgateway/ui';

function parseBoolean(value) {
    if (typeof value === 'boolean') return value;
    if (typeof value !== 'string') return !!value;

    switch (value.trim().toLowerCase()) {
        case "true":
        case "yes":
        case "1":
        case "on":
            return true;
        case "false":
        case "no":
        case "0":
        case "off":
            return false;
        default:
            return false;
    }
}

export const BigNumberItem = (props) => {
    const {
        isDisabled, // 1. ADDED: New prop to check if we are locked
        child,
        selectedKey,
        appliedFilters,
        dimension1,
        dimension2,

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
        getLabel,
        idx
    } = props;

    const isSelected = appliedFilters.indexOf(child.value) > -1;
    const value = child[selectedKey]

    const click = () => {
        if (isDisabled) return; // 2. ADDED: Prevent any click action if disabled

        if (props.handleClick) {
            props.handleClick();
        }
    }

    const numberStyle = (selected) => {
        return {
            cursor: isDisabled ? 'not-allowed' : 'pointer', // 3. UPDATED: Change cursor
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
            cursor: isDisabled ? 'not-allowed' : 'pointer', // 3. UPDATED: Change cursor
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
            opacity: isDisabled ? 0.4 : 1, // 4. ADDED: Dim the card to 40% if disabled
            cursor: isDisabled ? 'not-allowed' : 'pointer', // 4. ADDED: Change cursor on the whole cell
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

    let highlighted = false
    if (dimension2 !== "none") {
        highlighted = child && child.children ? child.children.map(c => parseBoolean(c.value)).reduce((a, b) => a && b, true) : false
    }

    // 5. UPDATED: Added a 'disabled' class to the Grid.Column for potential external CSS targeting
    return (
        <GridColumn
            className={`big filter item ${isSelected ? "selected" : "unselected"} ${highlighted ? `highlighted ${dimension2}` : ''} ${isDisabled ? "disabled" : ""}`}
            key={idx}
            onClick={click}
            style={cellStyle(isSelected)}
        >
            <p style={numberStyle(isSelected)} className="big-number">{formatNumber(value)}</p>

            {highlighted && <p><div className={"highlighted-pill"}>Zoonotic</div></p>}

            <p style={labelStyle(isSelected)} className="big-number-label">{getLabel ? getLabel(child.value) : (child.label || child.value)}</p>
        </GridColumn >
    )
}