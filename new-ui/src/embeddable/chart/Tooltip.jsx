import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import template from 'string-template';

const percentExpresion = /(\+?\%)[\(]([A-z0-9,.,-]+)\)/gi;
const numericExpresion = /(\+?\#)[\(]([A-z0-9,.,-]+)\)/gi;
const compactExpresion = /(\+?\#C)[\(]([A-z0-9,.,-]+)\)/gi;

const applyFormat = (expresion, str, style, isPercent, intl, container) => {
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
  const { color, data } = d.datum || d.point || d;
  const current =
    d.value ||
    (d.datum ? d.datum.value : null) ||
    (d.point ? d.point.data.y : null);
  if (data) {
    const vars = data.variables ? data.variables[d.id] || data.variables : data;

    const params = {
      field: d.point ? d.point.serieId : d.id,
      ...vars,
      value: current,
    };
    if (data.measureFieldName) {
      params.populationValue =
        data.variables[data.measureFieldName + "Population"];
    }
    const str = formatContent(tooltip, params, intl, tooltipEnableMarkdown);
    if (tooltipEnableMarkdown) {
      return (
        <ReactMarkdown
          children={str}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          className={"chart tooltip"}
        ></ReactMarkdown>
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
