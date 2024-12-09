import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { Input, Button, Message } from "semantic-ui-react";
import { e as connect_default, n as newsletterSubscription, j as setEmail } from "./server-build-C_g_IF5C.js";
import "node:stream";
import "@react-router/node";
import "react-router";
import "isbot";
import "react-dom/server";
import "use-sync-external-store/with-selector.js";
import "react-intl";
import "prop-types";
import "react-compiler-runtime";
import "react-dom/client";
import "immutable";
import "papaparse";
import "@devgateway/customizer";
import "@reduxjs/toolkit";
import "@artsy/fresnel";
import "clsx";
import "semantic-ui-react/dist/commonjs/lib/index.js";
import "query-string";
const expresion = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const Index = (props) => {
  const submit = () => {
    const { email: email2, list: list2, tag: tag2 } = props;
    props.onSubmit({ email: email2, list: list2, tag: tag2 });
  };
  const {
    status,
    editing,
    list,
    placeholder = "enter your email address",
    successmessage = "Thanks",
    failuremessage = "Something didn't go well",
    label = "Send",
    tag,
    email,
    onChange
  } = props;
  let message = "";
  if (status === "OK" || editing) {
    message = /* @__PURE__ */ jsx(Message, { success: true, children: /* @__PURE__ */ jsx("p", { children: successmessage }) });
  }
  if (status === "ERROR" || editing) {
    message = /* @__PURE__ */ jsx(Message, { negative: true, children: /* @__PURE__ */ jsx("p", { children: failuremessage }) });
  }
  const valid = expresion.test(email);
  return /* @__PURE__ */ jsxs("div", { className: "viz newsLetter", children: [
    /* @__PURE__ */ jsxs("div", { className: "viz newsLetter form", children: [
      /* @__PURE__ */ jsx(
        Input,
        {
          icon: "envelope",
          name: "email",
          value: email,
          onChange: (e, target) => onChange(target.value),
          iconPosition: "left",
          placeholder
        }
      ),
      /* @__PURE__ */ jsx(Button, { disabled: !valid, primary: true, onClick: (e) => submit(), children: label })
    ] }),
    message
  ] });
};
const mapStateToProps = (state, ownProps) => {
  return {
    status: state.getIn(["embeddable", "newsletter", "status"]),
    email: state.getIn(["embeddable", "newsletter", "email"])
  };
};
const mapActionCreators = {
  onSubmit: newsletterSubscription,
  onChange: setEmail
};
const index = connect_default(mapStateToProps, mapActionCreators)(Index);
export {
  index as default
};
