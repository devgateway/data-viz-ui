import { jsx } from "react/jsx-runtime";
import { Popup, Icon } from "semantic-ui-react";
const decodeContent = (content) => {
  let result;
  try {
    result = decodeURIComponent(content);
  } catch (err) {
    result = content;
    console.error("error occurred decoding content:" + content);
  }
  return result;
};
const Tooltip = ({
  "data-description": description = ""
}) => {
  return /* @__PURE__ */ jsx(Popup, { className: "title-popup", size: "mini", offset: [-10, 0], content: decodeContent(description), trigger: /* @__PURE__ */ jsx(Icon, { name: "question circle" }) });
};
export {
  Tooltip as default
};
