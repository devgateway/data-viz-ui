import { jsxs, jsx } from "react/jsx-runtime";
import { Container, Grid, Segment, Menu, Image } from "semantic-ui-react";
import "react-compiler-runtime";
import { useState, useEffect } from "react";
import { P as PageProvider, a as PageConsumer, M as MediaProvider, k as MediaConsumer } from "./server-build-C_g_IF5C.js";
import { injectIntl } from "react-intl";
import { P as PostContent } from "./PostContent-BfHll6z5.js";
import "node:stream";
import "@react-router/node";
import "react-router";
import "isbot";
import "react-dom/server";
import "use-sync-external-store/with-selector.js";
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
const MediaImage = (props) => /* @__PURE__ */ jsx("img", { src: props.media && props.media.guid ? props.media.guid.rendered : null, className: "svg-icon" });
const decodeHtmlEntity = function(str) {
  if (str) {
    return str.toString().replace(/&#(\d+);/g, function(match, dec) {
      return String.fromCharCode(dec);
    });
  }
  return "";
};
const ChildNavigator = ({ pages, title, selected, onPageSelected }) => {
  const childPages = pages ? pages.sort((a, b) => a.menu_order - b.menu_order) : [];
  const [selectedGroup, setSelectedGroup] = useState({ id: -1 });
  useEffect(() => {
    setSelectedGroup(childPages[0]);
  }, [pages]);
  const list = childPages.map((p) => {
    return {
      page: p,
      id: p.id,
      label: p.meta_fields.label ? p.meta_fields.label : p.title.rendered,
      iconComponent: /* @__PURE__ */ jsx(MediaProvider, { id: p.meta_fields && p.meta_fields.icon ? p.meta_fields.icon[0] : null, children: /* @__PURE__ */ jsx(MediaConsumer, { children: /* @__PURE__ */ jsx(MediaImage, {}) }) })
    };
  });
  const [defaultPage, setDefaultPage] = useState(null);
  useEffect(() => {
    onPageSelected(defaultPage);
  }, [defaultPage]);
  const SubPagesSubPages = ({ pages: pages2, selected: selected2, expanded }) => {
    if (!defaultPage && expanded) {
      setDefaultPage(pages2[0]);
    }
    return pages2 && pages2.map((page) => /* @__PURE__ */ jsx(
      Menu.Item,
      {
        className: `${selected2 && page.id == selected2.id ? "selected" : ""}`,
        onClick: (e) => onPageSelected(page),
        children: page.title.rendered
      },
      page.id
    ));
  };
  return /* @__PURE__ */ jsxs(Container, { fluid: true, children: [
    /* @__PURE__ */ jsxs(Menu, { vertical: true, text: true, size: "mini", className: "navbar-menu", children: [
      /* @__PURE__ */ jsx(Menu.Item, { header: true, children: title }),
      list.map((s) => /* @__PURE__ */ jsxs(
        Menu.Item,
        {
          className: `group ${s.id === selectedGroup.id ? "group-selected" : ""}`,
          onClick: (e) => {
            setSelectedGroup(s);
            const groupItems = document.getElementsByClassName("group");
            for (let i = 0; i < groupItems.length; i++) {
              groupItems[i].classList.remove("group-selected");
            }
            e.currentTarget.classList.add("group-selected");
          },
          children: [
            s.iconComponent ? s.iconComponent : /* @__PURE__ */ jsx(Image, { src: s.icon }),
            /* @__PURE__ */ jsx("span", { children: decodeHtmlEntity(s.label) }),
            /* @__PURE__ */ jsx("div", { className: "green-rectangle" }),
            /* @__PURE__ */ jsx(Menu.Menu, { className: `${s.id == selectedGroup.id ? "expanded" : "collapsed"}`, children: /* @__PURE__ */ jsx(
              PageProvider,
              {
                locale: "en",
                parent: s.id,
                store: "child_menu" + s.id,
                perPage: 100,
                children: /* @__PURE__ */ jsx(PageConsumer, { children: /* @__PURE__ */ jsx(SubPagesSubPages, { selected, expanded: s.id == selectedGroup.id }) })
              }
            ) })
          ]
        },
        s.label
      ))
    ] }),
    /* @__PURE__ */ jsx("div", { className: "navbar-footer", children: /* @__PURE__ */ jsx("p", { className: "navbar-footer-text", children: "Data and publications were made possible through support of the United States Agency for International Development (USAID)." }) })
  ] });
};
const ContentArea = ({ page }) => {
  return /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsx(PostContent, { post: page }) });
};
const Root = (props) => {
  const {
    "data-height": height,
    "data-style": style,
    "data-columns": columns,
    "data-parent": parent,
    "data-title": title = "Menu",
    editing,
    component,
    unique,
    intl: { locale }
  } = props;
  const [page, setPage] = useState(null);
  const styles = editing ? { padding: "4px", margin: "0px" } : {};
  return /* @__PURE__ */ jsxs(Container, { style: styles, fluid: true, className: `viz child page navigator`, children: [
    parent && /* @__PURE__ */ jsx(
      PageProvider,
      {
        locale,
        parent,
        noCache: true,
        store: "child_menu" + props.parent + "_" + props.unique,
        perPage: 100,
        children: /* @__PURE__ */ jsx(Grid, { children: /* @__PURE__ */ jsxs(Grid.Row, { children: [
          /* @__PURE__ */ jsx(Grid.Column, { className: "navigator", width: 2, children: /* @__PURE__ */ jsx(PageConsumer, { children: /* @__PURE__ */ jsx(
            ChildNavigator,
            {
              selected: page,
              title,
              onPageSelected: setPage
            }
          ) }) }),
          /* @__PURE__ */ jsx(Grid.Column, { width: 14, className: "content", children: page && /* @__PURE__ */ jsx(ContentArea, { page }) })
        ] }) })
      }
    ),
    !parent && /* @__PURE__ */ jsx(Segment, { color: "red", children: "No child pages here" })
  ] });
};
const index = injectIntl(Root);
export {
  index as default
};
