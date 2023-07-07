import React from "react";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import ReactDom from 'react-dom'
import rehypeRaw from 'rehype-raw'


const template = require("string-template")

const percentExpresion = /(\+?\%)[\(]([A-z0-9,.,-]+)\)/gi
const numericExpresion = /(\+?\#)[\(]([A-z0-9,.,-]+)\)/gi
const compactExpresion = /(\+?\#C)[\(]([A-z0-9,.,-]+)\)/gi

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
    let str =  template((tooltip), variables).replace(/(?:\r\n|\r|\n)/g, '<br>');

    str = applyFormat(percentExpresion, str, {style: 'percent'}, true, intl)
    str = applyFormat(numericExpresion, str, {style: 'decimal'}, false, intl)
    str = applyFormat(compactExpresion, str, {notation: 'compact'}, false, intl)
    return str
}

const Tooltip = ({tooltip, data, intl}) => {
    debugger;
    if (data) {
        const str = formatContent(tooltip, data, intl)
        return (<div dangerouslySetInnerHTML={{__html: str}}></div>)
    } else {
        return <div></div>
    }
}


export default Tooltip


