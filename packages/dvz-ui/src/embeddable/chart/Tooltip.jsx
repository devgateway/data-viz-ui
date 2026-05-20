import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import template from 'string-template';

const percentExpresion = /(\+?\%)[\(]([A-z0-9,.,-]+)\)/gi;
const numericExpresion = /(\+?\#)[\(]([A-z0-9,.,-]+)\)/gi;
const compactExpresion = /(\+?\#C)[\(]([A-z0-9,.,-]+)\)/gi;

const applyFormat = (expresion, str, style, isPercent, intl, container) => {
  // If intl is not available (e.g., during SSR), use a simple fallback formatter
  if (!intl || !intl.formatNumber) {
    // Return string as-is if intl is not available
    return str;
  }

  let result;
  let str1 = str;
  while ((result = expresion.exec(str)) !== null) {
    const arg = result[2];
    const numFormat = result[1];
    const format = (n, d = 2) => {
      return intl.formatNumber(isPercent ? n / 100 : n, {
        maximumFractionDigits: d,
        ...style,
        signDisplay: numFormat && numFormat.startsWith("+") ? "never" : "auto",
      });
    };
    const formatted = format.apply(this, arg.split(","));
    str1 = str1.replaceAll(result[0], formatted);
  }
  return str1;
};

export const formatContent = (
  tooltip,
  variables,
  intl,
  tooltipEnableMarkdown
) => {
  // Guard against undefined/null values
  if (!tooltip || !variables) {
    return "";
  }

  // if variables have a property called "field" and another property with the value being _${field},
  // add _value to the variables object with the value of the _${field} property
  if (variables.field && variables[`_${variables.field}`] != null) {
    variables._value = variables[`_${variables.field}`];
  }
  //if there is a category prop in the variables and field is not defined, set field to category
  if (!variables.field && variables.category) {
    variables.field = variables.category;
  }
  let str = tooltipEnableMarkdown
    ? template(tooltip, variables)
    : template(tooltip, variables).replace(/(?:\r\n|\r|\n)/g, "<br>");
  str = applyFormat(percentExpresion, str, { style: "percent" }, true, intl);
  str = applyFormat(numericExpresion, str, { style: "decimal" }, false, intl);
  str = applyFormat(
    compactExpresion,
    str,
    { notation: "compact" },
    false,
    intl
  );
  return str;
};

const Tooltip = ({ tooltip, d, intl, tooltipEnableMarkdown }) => {
  // Guard against undefined/null values during SSR
  if (!d || !tooltip) {
    return <div></div>;
  }

  const datum = d.datum || d.point || d;
  const { color, data } = datum || {};
  const current =
    d.value ??
    (d.datum ? d.datum.value : null) ??
    (d.point ? d.point.data.y : null);

  if (data) {
    let vars;
    if (data.variables) {
      vars = typeof data.variables[d.id] === 'object'
        ? data.variables[d.id]
        : data.variables;
    } else {
      vars = data;
    }

    const params = {
      field: d.point ? d.point.serieId : (d.id || ''),
      ...vars,
      value: current,
    };

    if (data.measureFieldName && data.variables) {
      params.populationValue =
        data.variables[data.measureFieldName + "Population"];
    }

    const str = formatContent(tooltip, params, intl, tooltipEnableMarkdown);

    if (!str) {
      return <div></div>;
    }

    if (tooltipEnableMarkdown) {
      return (
        <div className={"chart tooltip"}>
          <ReactMarkdown
            children={str}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          ></ReactMarkdown>
        </div>
      );
    } else {
      return (
        <div className={"chart tooltip"}>
          <div dangerouslySetInnerHTML={{ __html: str }}></div>
        </div>
      );
    }
  } else {
    return <div></div>;
  }
};

export default Tooltip;
