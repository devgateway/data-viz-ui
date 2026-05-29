import React, { useEffect, useRef, useState } from 'react';
import { Button, Container, Dropdown, Grid, Icon } from "semantic-ui-react";
import { PostContent } from "@devgateway/wp-react-lib";
import { domtoimage } from "./dom-to-image";
import { saveAs } from 'file-saver';
import { connect } from 'react-redux';

const DownloadableContent = React.forwardRef((props, ref) => (
  <div ref={ref}>{props.children}</div>
));

const DownloadComponent = (props) => {
  const componentRef = useRef();
  let {
    childContent,
    "data-height": height,
    "data-button-label": buttonLabel,
    "data-png-label": pngLabel,
    "data-jpg-label": jpgLabel,
    'data-jpg-text': jpgText,
    'data-png-text': pngText,
    "data-check-png": checkPNG = 'true',
    "data-check-jpg": checkJPG = 'true',
    "data-title": title,
    "data-default-format": defaultFormat = "PNG",
    "data-use-title": useTitle = "false",
    "data-style": style = "heavy",
    "data-section-title": sectionTitle = "",
    "data-download-tooltip": tooltip = "",
    "data-include-source-url": includeSourceURL = "false",
    "data-include-filters": includeFilters = "false",
    "data-source-urlmargin-left": sourceURLMarginLeft = 70,
    "data-source-urlmargin-top": sourceURLMarginTop = 10,
    "data-source-urlfont-size": sourceURLFontSize = 18,
    parent,
    editing,
    component,
    unique,
    pageModuleProps
  } = props;

  const [fileType, setFileType] = useState(defaultFormat);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const isCheckPNG = checkPNG == 'true' || checkPNG === true;
  const isCheckJPG = checkJPG == 'true' || checkJPG === true;

  useEffect(() => {
    setFileType(defaultFormat);
  }, [defaultFormat]);

  function filter(node) {
    const attributes = node.attributes;
    const attributeNames = [];
    if (attributes) {
      for (let i = 0; i < attributes.length; i++) {
        attributeNames.push(attributes[i].nodeName);
      }
    }

    const customAttributes = attributeNames.filter(a => a.startsWith('data-'));
    if (customAttributes.length > 0) {
      customAttributes.forEach(name => {
        node.setAttribute(name, "")
      });
    }

    if (node.classList) {
      // Exclude explicit "ignore" UI
      if (node.classList.contains("ignore")) return false;
      // By default, exclude filter UI from exports unless allowed
      const includeFiltersBool = includeFilters === true || includeFilters === 'true';
      if (!includeFiltersBool) {
        const excludeClasses = [
          'filter-component',
          'data-filters-reset',
          'data-filters-apply',
          'filter-search'
        ];
        for (const cls of excludeClasses) {
          if (node.classList.contains(cls)) return false;
        }
      }
      return true;
    }

    return true;
  }

  // Use a tiny transparent PNG as a safe fallback for images that fail to load
  const transparentPngDataUrl =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAoMBgQb9Z3kAAAAASUVORK5CYII=';

  const options = { filter, bgcolor: "#FFF", imagePlaceholder: transparentPngDataUrl, cacheBust: true };

  const save = (type) => {
    domtoimage.cloneNode(componentRef.current).then(function (node) {
      [...node.getElementsByTagName("input")].forEach(e => e.remove());
      [...node.querySelectorAll(".question.circle.icon")].forEach(e => e.remove());
      const addSourceURL = includeSourceURL === "true" || includeSourceURL === true;
      if (addSourceURL) {
        const urlNode = document.createElement('div');
        urlNode.style.marginLeft = sourceURLMarginLeft + "px";
        urlNode.style.marginTop = sourceURLMarginTop + "px";
        urlNode.style.fontSize = sourceURLFontSize + "px";
        urlNode.style.fontFamily = 'Roboto, sans-serif';
        urlNode.style.fontWeight = '400';
        urlNode.style.color = '#66676d';
        urlNode.style.opacity = '0.75';
        urlNode.textContent = window.location.href;
        urlNode.style.maxWidth = "90%";
        urlNode.style.wordWrap = "break-word";
        urlNode.style.overflowWrap = "break-word";
        node.appendChild(urlNode);
      }

      const PADDING = 50;
      options.height = componentRef.current.scrollHeight + PADDING * 2;
      if (addSourceURL) {
        options.height += parseInt(sourceURLMarginTop) + parseInt(sourceURLFontSize) * 2;
      }
      options.width = componentRef.current.scrollWidth + (PADDING * 2);
      node.style.padding = `${PADDING}px`;

      if (type === "PNG") {
        domtoimage.toPng(node, options)
          .then(function (dataUrl) {
            if (!dataUrl) throw new Error('PNG render returned empty result');
            return fetch(dataUrl).then(r => r.blob());
          })
          .then(function (blob) {
            saveAs(blob, pngLabel);
          })
          .catch(function (err) {
            console.error('PNG download failed:', err);
          });
      }

      if (type === "JPG") {
        domtoimage.toJpeg(node, options)
          .then(function (dataUrl) {
            if (!dataUrl) throw new Error('JPEG render returned empty result');
            return fetch(dataUrl).then(r => r.blob());
          })
          .then(function (blob) {
            saveAs(blob, jpgLabel);
          })
          .catch(function (err) {
            console.error('JPG download failed:', err);
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

  return (
    <Container
      className={`viz download ${style} ${useTitle ? 'has-title' : ''}
        ${(isCheckPNG || isCheckJPG) ? 'has-formats' : ''}
        ${(editing || pageModuleProps?.editing) ? 'editing' : ''}
        ${(isCheckPNG && isCheckJPG) ? 'multi-format' : ''}
        ${(isCheckPNG && !isCheckJPG) || (!isCheckPNG && isCheckJPG) ? 'single-format' : ''}`}
      fluid={true}
    >
      <DownloadableContent ref={componentRef}>
        <Grid stackable reversed={"mobile"} className={"download-header"}>
          {!editing && useTitle === "true" &&
            <Grid.Column width={12}>
              <PostContent parentUnique={props.unique}
                post={{ content: { rendered: decodeURIComponent(sectionTitle) } }} />
            </Grid.Column>}
          <Grid.Column className={editing ? "editing ignore" : "ignore"} width={(editing || useTitle !== "true") ? 16 : 4}
            textAlign={"right"}>
            <div className={"wrapper"}>
              <Button className={"download"} onClick={() => onClickHandler(fileType)}>
                {buttonLabel} {fileType === 'PNG' ? 'PNG' : 'JPG'}
              </Button>
              <Dropdown
                className={"download"}
                data-tooltip={decodeURIComponent(tooltip)}
                open={dropdownOpen}
                onOpen={() => setDropdownOpen(true)}
                onClose={() => setDropdownOpen(false)}
                trigger={(isCheckJPG && isCheckPNG) ?
                  <Icon name={"download"} className='download-icon'></Icon> : null}>
                <Dropdown.Menu>
                  {title}
                  {(isCheckPNG === true) && (
                    <Dropdown.Item onClick={() => {
                      setFileType('PNG');
                      onClickHandler('PNG');
                      setDropdownOpen(false);
                    }}>
                      <div className="ui radio checkbox">
                        <input type="radio" className="hidden" readOnly tabIndex={0} checked={fileType === 'PNG'} />
                        <label onClick={(e) => {
                          e.stopPropagation();
                          setFileType('PNG');
                          onClickHandler('PNG');
                          setDropdownOpen(false);
                        }}>{pngText}</label>
                      </div>
                    </Dropdown.Item>
                  )}
                  {(isCheckJPG === true) && (
                    <Dropdown.Item onClick={() => {
                      setFileType('JPG');
                      onClickHandler('JPG');
                      setDropdownOpen(false);
                    }}>
                      <div className="ui radio checkbox">
                        <input type="radio" className="hidden" readOnly tabIndex={0} checked={fileType === 'JPG'} />
                        <label onClick={(e) => {
                          e.stopPropagation();
                          setFileType('JPG');
                          onClickHandler('JPG');
                          setDropdownOpen(false);
                        }}>{jpgText}</label>
                      </div>
                    </Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Grid.Column>
        </Grid>
        {!editing &&
          <Container fluid={true} className={`download area ${editing || pageModuleProps?.editing ? 'editing' : ''}`}>
            <PostContent parentUnique={props.unique}
              post={{ content: { rendered: childContent } }} />
          </Container>
        }
      </DownloadableContent>
    </Container>
  );
};

const mapStateToProps = (state) => {
  const pageModuleProps = state.getIn(["data", "pageModuleProps"]);
  const _props = {};
  if (pageModuleProps) {
    _props.pageModuleProps = pageModuleProps;
  }
  return _props;
};

const mapActionCreators = {};

export default connect(mapStateToProps, mapActionCreators)(DownloadComponent);