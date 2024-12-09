import { jsx } from "react/jsx-runtime";
import React__default, { useRef, useState } from "react";
import "jspdf/dist/polyfills.es.js";
import { Container, Button } from "semantic-ui-react";
React__default.forwardRef((props, ref) => /* @__PURE__ */ jsx("div", { id: "divIdToPrint", ref, children: props.children }));
const DownloadPdf = (props) => {
  useRef();
  const [loading, setLoading] = useState(false);
  const {
    childContent,
    "data-height": height,
    "data-button-label": buttonLabel = "Download PDF",
    "data-file-label": fileName,
    "data-url": url,
    editing
  } = props;
  const download = () => {
    setLoading(true);
    fetch("/pdf/" + url).then((response) => response.blob()).then((blob) => {
      const url2 = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url2;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      setLoading(false);
      a.remove();
    });
  };
  return /* @__PURE__ */ jsx(Container, { className: `viz download ${editing ? "editing" : ""}`, fluid: true, children: /* @__PURE__ */ jsx(React__default.Fragment, { children: /* @__PURE__ */ jsx("div", { className: "downloadPdf", children: /* @__PURE__ */ jsx(Button, { loading, className: "download", onClick: download, children: buttonLabel }) }) }) });
};
export {
  DownloadPdf as default
};
