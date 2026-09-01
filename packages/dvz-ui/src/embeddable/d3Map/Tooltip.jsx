import React from "react";
import template from "string-template";

const percentExpresion = /(\+?\%)[\(]([A-z0-9,.,-]+)\)/gi
const numericExpresion = /(\+?\#)[\(]([A-z0-9,.,-]+)\)/gi
const compactExpresion = /(\+?\#C)[\(]([A-z0-9,.,-]+)\)/gi
const currencyExpresion = /(\$)[\(]([A-z0-9,.]+)\)/gi

const currencies = [
    {
        name: 'USD Dollar',
        code: 'USD',
        symbol: '$'
    },
    {
        name: 'Naira',
        code: 'NGN',
        symbol: '₦'
    },
    {
        name: 'South Africa Rand',
        code: 'ZAR',
        symbol: 'R'
    },
    {
        name: 'Ethiopian Birr',
        code: 'ETB',
        symbol: 'Br'
    },
    {
        name: 'Zambian Kwacha',
        code: 'ZMW',
        symbol: 'ZK'
    },
    {
        name: 'Kenyan Shilling',
        code: 'KES',
        symbol: 'KSh'
    }
]

const processStringForComparison = (str) => {
    if (str) {
        return str.trim().toLowerCase();
    }

    return str;
}

const applyCurrencySymbol = (expresion, str) => {
    let result
    let str1 = str
    while ((result = expresion.exec(str)) !== null) {
        if (result.length > 2) {
            const expression = result[0]
            const currencyNameorCode = result[2]
            const currency = currencies.find(c => processStringForComparison(c.code) == processStringForComparison(currencyNameorCode)
                || processStringForComparison(c.name) == processStringForComparison(currencyNameorCode)
                || processStringForComparison(c.symbol) == processStringForComparison(currencyNameorCode))
            if (currency) {
                str1 = str1.replaceAll(expression, currency.symbol)
            }
        }
    }

    return str1
}

const applyFormat = (expresion, str, style, isPercent, intl, container) => {
    let result;
    let str1 = str
    while ((result = expresion.exec(str)) !== null) {
        const arg = result[2]
        const numFormat = result[1]
        const format = (n, d = 2) => {
            return intl.formatNumber(isPercent ? n / 100 : n, {
                maximumFractionDigits: d,
                ...style,
                signDisplay: numFormat && numFormat.startsWith("+") ? "never" : "auto"
            })
        }
        const formatted = format.apply(this, arg.split(","))
        str1 = str1.replaceAll(result[0], formatted)

    }
    return str1
}

export const formatContent = (tooltip, variables, intl) => {
    const allVariables = {...variables, ...variables.meta};
    const normalizedVariables = {};
    Object.keys(allVariables).forEach(key => {
        normalizedVariables[key] = allVariables[key];
        // Also add underscore version so columns with spaces can be referenced
        normalizedVariables[key.replace(/\s+/g, '_')] = allVariables[key];
    });

    // Pre-process tooltip: replace {Variable Name} with {Variable_Name}
    const processedTooltip = tooltip.replace(/\{([^}]+)\}/g, (match, varName) => {
        const sanitized = varName.replace(/\s+/g, '_');
        return `{${sanitized}}`;
    });

    let str = template((processedTooltip), normalizedVariables).replace(/(?:\r\n|\r|\n)/g, '<br>');
    str = applyFormat(percentExpresion, str, {style: 'percent'}, true, intl)
    str = applyFormat(numericExpresion, str, {style: 'decimal'}, false, intl)
    str = applyFormat(compactExpresion, str, {notation: 'compact'}, false, intl)
    str = applyCurrencySymbol(currencyExpresion, str)
    return str
}

const Tooltip = ({tooltip, data, intl}) => {

    if (data) {
        const str = formatContent(tooltip, data, intl)
        return (<div dangerouslySetInnerHTML={{__html: str}}></div>)
    } else {
        return <div></div>
    }
}


export default Tooltip


