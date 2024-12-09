import { jsx, jsxs } from "react/jsx-runtime";
import React__default, { useRef, useState, useEffect } from "react";
import { Container, Grid, Dropdown, Icon, Button } from "semantic-ui-react";
import "react-compiler-runtime";
import { b as PostContent } from "./server-build-C_g_IF5C.js";
import { saveAs } from "file-saver";
import "node:stream";
import "@react-router/node";
import "react-router";
import "isbot";
import "react-dom/server";
import "use-sync-external-store/with-selector.js";
import "react-intl";
import "prop-types";
import "react-dom/client";
import "immutable";
import "papaparse";
import "@devgateway/customizer";
import "@reduxjs/toolkit";
import "@artsy/fresnel";
import "clsx";
import "semantic-ui-react/dist/commonjs/lib/index.js";
import "query-string";
const util = newUtil();
const inliner = newInliner();
const fontFaces = newFontFaces();
const images = newImages();
const defaultOptions = {
  // Default is to fail on error, no placeholder
  imagePlaceholder: void 0,
  // Default cache bust is false, it will use the cache
  cacheBust: false
};
const domtoimage = {
  toSvg,
  toPng,
  toJpeg,
  toBlob,
  toPixelData,
  cloneNode,
  impl: {
    fontFaces,
    images,
    util,
    inliner,
    options: {}
  }
};
if (typeof module !== "undefined")
  module.exports = domtoimage;
else
  globalThis.domtoimage = domtoimage;
async function toSvg(node, options) {
  options = options || {};
  copyOptions(options);
  const node_1 = await Promise.resolve(node);
  const node_3 = await cloneNode(node_1, options.filter, true);
  const node_4 = await embedFonts(node_3);
  const clone = await inlineImages(node_4);
  const clone_1 = await applyOptions(clone);
  return await makeSvgDataUri(
    clone_1,
    options.width || util.width(node),
    options.height || util.height(node)
  );
  function applyOptions(clone2) {
    if (options.bgcolor) clone2.style.backgroundColor = options.bgcolor;
    if (options.width) clone2.style.width = options.width + "px";
    if (options.height) clone2.style.height = options.height + "px";
    if (options.style)
      Object.keys(options.style).forEach(function(property) {
        clone2.style[property] = options.style[property];
      });
    return clone2;
  }
}
async function toPixelData(node, options) {
  const canvas = await draw(node, options || {});
  if (!canvas) return null;
  return canvas.getContext("2d").getImageData(
    0,
    0,
    util.width(node),
    util.height(node)
  ).data;
}
async function toPng(node, options) {
  const canvas = await draw(node, options || {});
  if (!canvas) return null;
  return canvas.toDataURL();
}
async function toJpeg(node, options) {
  options = options || {};
  const canvas = await draw(node, options);
  if (!canvas) return null;
  return canvas.toDataURL("image/jpeg", options.quality || 1);
}
function toBlob(node, options) {
  return draw(node, options || {}).then(util.canvasToBlob);
}
function copyOptions(options) {
  if (typeof options.imagePlaceholder === "undefined") {
    domtoimage.impl.options.imagePlaceholder = defaultOptions.imagePlaceholder;
  } else {
    domtoimage.impl.options.imagePlaceholder = options.imagePlaceholder;
  }
  if (typeof options.cacheBust === "undefined") {
    domtoimage.impl.options.cacheBust = defaultOptions.cacheBust;
  } else {
    domtoimage.impl.options.cacheBust = options.cacheBust;
  }
}
function draw(domNode, options) {
  return toSvg(domNode, options).then(util.makeImage).then(util.delay(100)).then(function(image) {
    const canvas = newCanvas(domNode, options);
    const ctx = canvas.getContext("2d");
    if (!ctx) return new HTMLCanvasElement();
    ctx.drawImage(image, 0, 0);
    return canvas;
  }).catch(function(error) {
    console.error("Failed to draw canvas:", error);
  });
  function newCanvas(domNode2, options2) {
    const canvas = document.createElement("canvas");
    const rect = domNode2.getBoundingClientRect();
    const scale = window.devicePixelRatio || 1;
    canvas.width = (options2.width || rect.width) * scale;
    canvas.height = (options2.height || rect.height) * scale;
    canvas.style.width = (options2.width || rect.width) + "px";
    canvas.style.height = (options2.height || rect.height) + "px";
    const ctx = canvas.getContext("2d");
    if (!ctx) return new HTMLCanvasElement();
    ctx.scale(scale, scale);
    if (options2.bgcolor) {
      ctx.fillStyle = options2.bgcolor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    return canvas;
  }
}
async function cloneNode(node, filter, root) {
  if (!root && filter && !filter(node)) return Promise.resolve();
  const node_1 = await Promise.resolve(node);
  const clone = await makeNodeCopy(node_1);
  const clone_1 = await cloneChildren(node, clone, filter);
  return processClone(node, clone_1);
  function makeNodeCopy(node2) {
    if (node2 instanceof HTMLCanvasElement) return util.makeImage(node2.toDataURL());
    return node2.cloneNode(false);
  }
  async function cloneChildren(original, clone2, filter2) {
    const children = original.childNodes;
    if (children.length === 0) return Promise.resolve(clone2);
    await cloneChildrenInOrder(clone2, util.asArray(children), filter2);
    return clone2;
    function cloneChildrenInOrder(parent, children2, filter3) {
      let done = Promise.resolve();
      children2.forEach(function(child) {
        done = done.then(function() {
          return cloneNode(child, filter3);
        }).then(function(childClone) {
          if (childClone) parent.appendChild(childClone);
        });
      });
      return done;
    }
  }
  function processClone(original, clone2) {
    if (!(clone2 instanceof Element)) return clone2;
    return Promise.resolve().then(cloneStyle).then(clonePseudoElements).then(copyUserInput).then(fixSvg).then(function() {
      return clone2;
    });
    function cloneStyle() {
      copyStyle(window.getComputedStyle(original), clone2.style);
      function copyStyle(source, target) {
        if (source.cssText) target.cssText = source.cssText;
        else copyProperties(source, target);
        function copyProperties(source2, target2) {
          util.asArray(source2).forEach(function(name) {
            target2.setProperty(
              name,
              source2.getPropertyValue(name),
              source2.getPropertyPriority(name)
            );
          });
        }
      }
    }
    function clonePseudoElements() {
      [":before", ":after"].forEach(function(element) {
        clonePseudoElement(element);
      });
      function clonePseudoElement(element) {
        const style = window.getComputedStyle(original, element);
        const content = style.getPropertyValue("content");
        if (content === "" || content === "none") return;
        const className = util.uid();
        clone2.className = clone2.className + " " + className;
        const styleElement = document.createElement("style");
        styleElement.appendChild(formatPseudoElementStyle(className, element, style));
        clone2.appendChild(styleElement);
        function formatPseudoElementStyle(className2, element2, style2) {
          const selector = "." + className2 + ":" + element2;
          const cssText = style2.cssText ? formatCssText(style2) : formatCssProperties(style2);
          return document.createTextNode(selector + "{" + cssText + "}");
          function formatCssText(style3) {
            const content2 = style3.getPropertyValue("content");
            return style3.cssText + " content: " + content2 + ";";
          }
          function formatCssProperties(style3) {
            return util.asArray(style3).map(formatProperty).join("; ") + ";";
            function formatProperty(name) {
              return name + ": " + style3.getPropertyValue(name) + (style3.getPropertyPriority(name) ? " !important" : "");
            }
          }
        }
      }
    }
    function copyUserInput() {
      if (original instanceof HTMLTextAreaElement) clone2.innerHTML = original.value;
      if (original instanceof HTMLInputElement) clone2.setAttribute("value", original.value);
    }
    function fixSvg() {
      if (!(clone2 instanceof SVGElement)) return;
      clone2.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      if (!(clone2 instanceof SVGRectElement)) return;
      ["width", "height"].forEach(function(attribute) {
        const value = clone2.getAttribute(attribute);
        if (!value) return;
        clone2.style.setProperty(attribute, value);
      });
    }
  }
}
async function embedFonts(node) {
  const cssText = await fontFaces.resolveAll();
  const styleNode = document.createElement("style");
  node.appendChild(styleNode);
  styleNode.appendChild(document.createTextNode(cssText));
  return node;
}
function inlineImages(node) {
  return images.inlineAll(node).then(function() {
    return node;
  });
}
function makeSvgDataUri(node, width, height) {
  return Promise.resolve(node).then(function(node2) {
    node2.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
    return new XMLSerializer().serializeToString(node2);
  }).then(util.escapeXhtml).then(function(xhtml) {
    return '<foreignObject x="0" y="0" width="100%" height="100%">' + xhtml + "</foreignObject>";
  }).then(function(foreignObject) {
    return '<svg xmlns="http://www.w3.org/2000/svg" width="' + width + '" height="' + height + '">' + foreignObject + "</svg>";
  }).then(function(svg) {
    return "data:image/svg+xml;charset=utf-8," + svg;
  });
}
function newUtil() {
  return {
    escape,
    parseExtension,
    mimeType,
    dataAsUrl,
    isDataUrl,
    canvasToBlob,
    resolveUrl,
    getAndEncode,
    uid: uid(),
    delay,
    asArray,
    escapeXhtml,
    makeImage,
    width,
    height
  };
  function mimes() {
    const WOFF = "application/font-woff";
    const JPEG = "image/jpeg";
    return {
      "woff": WOFF,
      "woff2": WOFF,
      "ttf": "application/font-truetype",
      "eot": "application/vnd.ms-fontobject",
      "png": "image/png",
      "jpg": JPEG,
      "jpeg": JPEG,
      "gif": "image/gif",
      "tiff": "image/tiff",
      "svg": "image/svg+xml"
    };
  }
  function parseExtension(url) {
    const match = /\.([^\.\/]*?)$/g.exec(url);
    if (match) return match[1];
    else return "";
  }
  function mimeType(url) {
    const extension = parseExtension(url).toLowerCase();
    return mimes()[extension] || "";
  }
  function isDataUrl(url) {
    return url.search(/^(data:)/) !== -1;
  }
  function toBlob2(canvas) {
    return new Promise(function(resolve) {
      const binaryString = window.atob(canvas.toDataURL().split(",")[1]);
      const length = binaryString.length;
      const binaryArray = new Uint8Array(length);
      for (let i = 0; i < length; i++)
        binaryArray[i] = binaryString.charCodeAt(i);
      resolve(new Blob([binaryArray], {
        type: "image/png"
      }));
    });
  }
  function canvasToBlob(canvas) {
    if (canvas.toBlob)
      return new Promise(function(resolve) {
        canvas.toBlob(resolve);
      });
    return toBlob2(canvas);
  }
  function resolveUrl(url, baseUrl) {
    const doc = document.implementation.createHTMLDocument();
    const base = doc.createElement("base");
    doc.head.appendChild(base);
    const a = doc.createElement("a");
    doc.body.appendChild(a);
    base.href = baseUrl;
    a.href = url;
    return a.href;
  }
  function uid() {
    let index = 0;
    return function() {
      return "u" + fourRandomChars() + index++;
      function fourRandomChars() {
        return ("0000" + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4);
      }
    };
  }
  function makeImage(uri) {
    return new Promise(function(resolve, reject) {
      const image = new Image();
      image.onload = function() {
        resolve(image);
      };
      image.onerror = reject;
      image.src = uri;
    });
  }
  function getAndEncode(url) {
    const TIMEOUT = 3e4;
    if (domtoimage.impl.options.cacheBust) {
      url += (/\?/.test(url) ? "&" : "?") + (/* @__PURE__ */ new Date()).getTime();
    }
    return new Promise(function(resolve) {
      const request = new XMLHttpRequest();
      request.onreadystatechange = done;
      request.ontimeout = timeout;
      request.responseType = "blob";
      request.timeout = TIMEOUT;
      request.open("GET", url, true);
      request.send();
      let placeholder;
      if (domtoimage.impl.options.imagePlaceholder) {
        const split = domtoimage.impl.options.imagePlaceholder.split(/,/);
        if (split && split[1]) {
          placeholder = split[1];
        }
      }
      function done() {
        if (request.readyState !== 4) return;
        if (request.status !== 200) {
          if (placeholder) {
            resolve(placeholder);
          } else {
            fail("cannot fetch resource: " + url + ", status: " + request.status);
          }
          return;
        }
        const encoder = new FileReader();
        encoder.onloadend = function() {
          const content = encoder.result.split(/,/)[1];
          resolve(content);
        };
        encoder.readAsDataURL(request.response);
      }
      function timeout() {
        if (placeholder) {
          resolve(placeholder);
        } else {
          fail("timeout of " + TIMEOUT + "ms occured while fetching resource: " + url);
        }
      }
      function fail(message) {
        console.error(message);
        resolve("");
      }
    });
  }
  function dataAsUrl(content, type) {
    return "data:" + type + ";base64," + content;
  }
  function escape(string) {
    return string.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
  }
  function delay(ms) {
    return function(arg) {
      return new Promise(function(resolve) {
        setTimeout(function() {
          resolve(arg);
        }, ms);
      });
    };
  }
  function asArray(arrayLike) {
    const array = [];
    const length = arrayLike.length;
    for (let i = 0; i < length; i++) array.push(arrayLike[i]);
    return array;
  }
  function escapeXhtml(string) {
    return string.replace(/#/g, "%23").replace(/\n/g, "%0A");
  }
  function width(node) {
    const leftBorder = px(node, "border-left-width");
    const rightBorder = px(node, "border-right-width");
    return node.scrollWidth + leftBorder + rightBorder;
  }
  function height(node) {
    const topBorder = px(node, "border-top-width");
    const bottomBorder = px(node, "border-bottom-width");
    return node.scrollHeight + topBorder + bottomBorder;
  }
  function px(node, styleProperty) {
    const value = window.getComputedStyle(node).getPropertyValue(styleProperty);
    return parseFloat(value.replace("px", ""));
  }
}
function newInliner() {
  const URL_REGEX = /url\(['"]?([^'"]+?)['"]?\)/g;
  return {
    inlineAll,
    shouldProcess,
    impl: {
      readUrls,
      inline
    }
  };
  function shouldProcess(string) {
    return string.search(URL_REGEX) !== -1;
  }
  function readUrls(string) {
    const result = [];
    let match;
    while ((match = URL_REGEX.exec(string)) !== null) {
      result.push(match[1]);
    }
    return result.filter(function(url) {
      return !util.isDataUrl(url);
    });
  }
  function inline(string, url, baseUrl, get) {
    return Promise.resolve(url).then(function(url2) {
      return baseUrl ? util.resolveUrl(url2, baseUrl) : url2;
    }).then(get || util.getAndEncode).then(function(data) {
      return util.dataAsUrl(data, util.mimeType(url));
    }).then(function(dataUrl) {
      return string.replace(urlAsRegex(url), "$1" + dataUrl + "$3");
    });
    function urlAsRegex(url2) {
      return new RegExp(`(url\\(['"]?)(` + util.escape(url2) + `)(['"]?\\))`, "g");
    }
  }
  function inlineAll(string, baseUrl, get) {
    if (nothingToInline()) return Promise.resolve(string);
    return Promise.resolve(string).then(readUrls).then(function(urls) {
      let done = Promise.resolve(string);
      urls.forEach(function(url) {
        done = done.then(function(string2) {
          return inline(string2, url, baseUrl, get);
        });
      });
      return done;
    });
    function nothingToInline() {
      return !shouldProcess(string);
    }
  }
}
function newFontFaces() {
  return {
    resolveAll,
    impl: {
      readAll
    }
  };
  function resolveAll() {
    return readAll().then(function(webFonts) {
      return Promise.all(
        webFonts.map(function(webFont) {
          return webFont.resolve();
        })
      );
    }).then(function(cssStrings) {
      return cssStrings.join("\n");
    });
  }
  function readAll() {
    return Promise.resolve(util.asArray(document.styleSheets)).then(getCssRules).then(selectWebFontRules).then(function(rules) {
      return rules.map(newWebFont);
    });
    function selectWebFontRules(cssRules) {
      return cssRules.filter(function(rule) {
        return rule.type === CSSRule.FONT_FACE_RULE;
      }).filter(function(rule) {
        return inliner.shouldProcess(rule.style.getPropertyValue("src"));
      });
    }
    function getCssRules(styleSheets) {
      const cssRules = [];
      styleSheets.forEach(function(sheet) {
        if (Object.prototype.hasOwnProperty.call(sheet, "cssRules")) {
          try {
            util.asArray(sheet.cssRules || []).forEach(cssRules.push.bind(cssRules));
          } catch (e) {
            console.log("Error while reading CSS rules from " + sheet.href, e.toString());
          }
        }
      });
      return cssRules;
    }
    function newWebFont(webFontRule) {
      return {
        resolve: function resolve() {
          const baseUrl = (webFontRule.parentStyleSheet || {}).href;
          return inliner.inlineAll(webFontRule.cssText, baseUrl);
        },
        src: function() {
          return webFontRule.style.getPropertyValue("src");
        }
      };
    }
  }
}
function newImages() {
  return {
    inlineAll,
    impl: {
      newImage
    }
  };
  function newImage(element) {
    return {
      inline
    };
    function inline(get) {
      if (util.isDataUrl(element.src)) return Promise.resolve();
      return Promise.resolve(element.src).then(get || util.getAndEncode).then(function(data) {
        return util.dataAsUrl(data, util.mimeType(element.src));
      }).then(function(dataUrl) {
        return new Promise(function(resolve, reject) {
          element.onload = resolve;
          element.onerror = reject;
          element.src = dataUrl;
          element.srcset = "";
        });
      });
    }
  }
  function inlineAll(node) {
    if (!(node instanceof Element)) return Promise.resolve(node);
    return inlineBackground(node).then(function() {
      if (node instanceof HTMLImageElement)
        return newImage(node).inline();
      else
        return Promise.all(
          util.asArray(node.childNodes).map(function(child) {
            return inlineAll(child);
          })
        );
    });
    function inlineBackground(node2) {
      const background = node2.style.getPropertyValue("background");
      if (!background) return Promise.resolve(node2);
      return inliner.inlineAll(background).then(function(inlined) {
        node2.style.setProperty(
          "background",
          inlined,
          node2.style.getPropertyPriority("background")
        );
      }).then(function() {
        return node2;
      });
    }
  }
}
const DownloadableContent = React__default.forwardRef((props, ref) => /* @__PURE__ */ jsx("div", { ref, children: props.children }));
const DownloadComponent = (props) => {
  const componentRef = useRef();
  const {
    childContent,
    "data-height": height,
    "data-button-label": buttonLabel,
    "data-png-label": pngLabel,
    "data-jpg-label": jpgLabel,
    "data-jpg-text": jpgText,
    "data-png-text": pngText,
    "data-check-png": checkPNG = "true",
    "data-check-jpg": checkJPG = "true",
    "data-title": title,
    "data-default-format": defaultFormat = "PNG",
    "data-use-title": useTitle = "false",
    "data-style": style = "heavy",
    "data-section-title": sectionTitle = "",
    "data-download-tooltip": tooltip = "",
    "data-include-source-url": includeSourceURL = "false",
    "data-source-urlmargin-left": sourceURLMarginLeft = 70,
    "data-source-urlmargin-top": sourceURLMarginTop = 10,
    "data-source-urlfont-size": sourceURLFontSize = 18,
    parent,
    editing,
    component,
    unique
  } = props;
  const [fileType, setFileType] = useState(defaultFormat);
  const isCheckPNG = checkPNG === "true" || checkPNG === true;
  const isCheckJPG = checkJPG === "true" || checkJPG === true;
  useEffect(() => {
    setFileType(defaultFormat);
  }, [defaultFormat]);
  const handleChange = (e) => {
    setFileType(e.target.value);
  };
  function filter(node) {
    const attributes = node.attributes;
    const attributeNames = [];
    if (attributes) {
      for (let i = 0; i < attributes.length; i++) {
        attributeNames.push(attributes[i].nodeName);
      }
    }
    const customAttributes = attributeNames.filter((a) => a.startsWith("data-"));
    if (customAttributes.length > 0) {
      customAttributes.forEach((name) => {
        node.setAttribute(name, "");
      });
    }
    if (node.classList) {
      return !node.classList.contains("ignore");
    }
    return true;
  }
  const options = { filter, bgcolor: "#FFF" };
  const save = (type) => {
    domtoimage.cloneNode(componentRef.current).then(function(node) {
      const addSourceURL = includeSourceURL === "true";
      if (addSourceURL) {
        const urlNode = document.createElement("div");
        urlNode.style.marginLeft = sourceURLMarginLeft + "px";
        urlNode.style.marginTop = sourceURLMarginTop + "px";
        urlNode.style.fontSize = sourceURLFontSize + "px";
        urlNode.innerHTML = window.location.href;
        node.appendChild(urlNode);
      }
      options.height = componentRef.current.offsetHeight + 100;
      options.width = componentRef.current.offsetWidth + 100;
      node.style.padding = "20px";
      if (type == "PNG") {
        domtoimage.toPng(node, options).then(function(blob) {
          saveAs(blob, pngLabel);
        });
      }
      if (type == "JPG") {
        domtoimage.toJpeg(node, options).then(function(blob) {
          saveAs(blob, jpgLabel);
        });
      }
    });
  };
  const onClickHandler = (type) => {
    if (editing) {
      alert("Not allowed when editing please preview page");
    } else {
      save(type);
    }
  };
  return /* @__PURE__ */ jsx(
    Container,
    {
      className: `viz download ${style}  ${useTitle ? "has-title" : ""}  ${isCheckPNG || isCheckJPG ? "has-formats" : ""} ${editing ? "editing" : ""}`,
      fluid: true,
      children: /* @__PURE__ */ jsxs(DownloadableContent, { ref: componentRef, children: [
        /* @__PURE__ */ jsxs(Grid, { stackable: true, reversed: "mobile", className: "download-header", children: [
          !editing && useTitle == "true" && /* @__PURE__ */ jsx(Grid.Column, { width: 12, children: /* @__PURE__ */ jsx(
            PostContent,
            {
              parentUnique: props.unique,
              post: { content: { rendered: decodeURIComponent(sectionTitle) } }
            }
          ) }),
          /* @__PURE__ */ jsx(
            Grid.Column,
            {
              className: editing ? "editing ignore" : "ignore",
              width: editing || useTitle != "true" ? 16 : 4,
              textAlign: "right",
              children: /* @__PURE__ */ jsxs("div", { className: "wrapper", children: [
                /* @__PURE__ */ jsx(
                  Dropdown,
                  {
                    className: "download",
                    "data-tooltip": decodeURIComponent(tooltip),
                    trigger: isCheckJPG && isCheckPNG ? /* @__PURE__ */ jsx(Icon, { name: "download", className: "download-icon" }) : null,
                    children: /* @__PURE__ */ jsxs(Dropdown.Menu, { children: [
                      title,
                      isCheckPNG == "true" || isCheckPNG == true ? /* @__PURE__ */ jsxs(Dropdown.Item, { onClick: () => onClickHandler("PNG"), children: [
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "radio",
                            value: "PNG",
                            checked: fileType === "PNG",
                            onChange: handleChange
                          }
                        ),
                        /* @__PURE__ */ jsx("label", { children: pngText })
                      ] }) : null,
                      isCheckJPG == "true" || isCheckJPG == true ? /* @__PURE__ */ jsxs(Dropdown.Item, { onClick: () => onClickHandler("JPG"), children: [
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "radio",
                            value: "JPG",
                            checked: fileType === "JPG",
                            onChange: handleChange
                          }
                        ),
                        /* @__PURE__ */ jsx("label", { children: jpgText })
                      ] }) : null
                    ] })
                  }
                ),
                /* @__PURE__ */ jsxs(Button, { className: "download", onClick: () => onClickHandler(fileType), children: [
                  buttonLabel,
                  " ",
                  fileType === "PNG" ? "PNG" : "JPG"
                ] })
              ] })
            }
          )
        ] }),
        !editing && /* @__PURE__ */ jsx(Container, { fluid: true, className: "download area", children: /* @__PURE__ */ jsx(
          PostContent,
          {
            parentUnique: props.unique,
            post: { content: { rendered: childContent } }
          }
        ) })
      ] })
    }
  );
};
export {
  DownloadComponent as default
};
