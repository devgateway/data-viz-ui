import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, useParams, useLoaderData, useActionData, useMatches, Meta, Links, ScrollRestoration, Scripts, Outlet, useLocation, Navigate, useNavigate, NavLink, Routes, Route } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import * as React$1 from "react";
import React__default, { createElement, useEffect, Suspense, useLayoutEffect, useState, useRef, lazy, Component } from "react";
import { useSyncExternalStoreWithSelector as useSyncExternalStoreWithSelector$1 } from "use-sync-external-store/with-selector.js";
import { IntlProvider, injectIntl } from "react-intl";
import PropTypes from "prop-types";
import { c } from "react-compiler-runtime";
import ReactDOM from "react-dom/client";
import { Container, Segment, Loader, Dimmer, Search, Dropdown, Image, Menu as Menu$1, Popup } from "semantic-ui-react";
import * as Immutable from "immutable";
import Immutable__default from "immutable";
import Papa from "papaparse";
import * as customizer from "@devgateway/customizer";
import { configureStore } from "@reduxjs/toolkit";
import { createMedia } from "@artsy/fresnel";
import clsx from "clsx";
import { getUnhandledProps, partitionHTMLProps, htmlInputAttrs } from "semantic-ui-react/dist/commonjs/lib/index.js";
import queryString from "query-string";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        ServerRouter,
        {
          context: routerContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
function withComponentProps(Component3) {
  return function Wrapped2() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      matches: useMatches()
    };
    return createElement(Component3, props);
  };
}
var define_process_env_default$9 = { VITE_PROTOCOL: "https", VITE_DOMAIN: "et.tcdi.dgstg.org", VITE_REACT_APP_TITLE: "Tobacco Control Data Initiative", VITE_REACT_APP_WP_API: "https://et.tcdi.dgstg.org/wp/wp-json", VITE_REACT_APP_WP_STYLES: "https://et.tcdi.dgstg.org/wp/wp-admin/load-styles.php?c=1&dir=ltr&load%5Bchunk_0%5D=dashicons,admin-bar,buttons,media-views,editor-buttons,wp-components,wp-block-editor,wp-nux,wp-editor,wp-block-library,wp-block-&load%5Bchunk_1%5D=library-theme,wp-edit-blocks,wp-edit-post,wp-format-library,wp-block-directory,common,forms,admin-menu,dashboard,list-tables,edi&load%5Bchunk_2%5D=t,revisions,media,themes,about,nav-menus,wp-pointer,widgets,site-icon,l10n,wp-auth-check&ver=5.5.6' id='wp-block-library-css", VITE_REACT_APP_GA_CODE: "en", VITE_REACT_APP_DEFAULT_LOCALE: "en", VITE_REACT_APP_WP_HOSTS: "https://et.tcdi.dgstg.org", VITE_REACT_APP_USE_HASH_LINKS: "false", VITE_REACT_APP_THEME: "cash", VITE_REACT_APP_WP_SEARCH_END_POINT: "/dg/v1/search", VITE_REACT_APP_API_ROOT: "https://et.tcdi.dgstg.org" };
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "UTF-8"
      }), /* @__PURE__ */ jsx("link", {
        href: "/favicon.ico",
        rel: "icon"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1.0"
      }), /* @__PURE__ */ jsx("meta", {
        name: "msapplication-TileColor",
        content: "#ffffff"
      }), /* @__PURE__ */ jsx("meta", {
        name: "msapplication-TileImage",
        content: "/ms-icon-144x144.png"
      }), /* @__PURE__ */ jsx("meta", {
        name: "theme-color",
        content: "#ffffff"
      }), /* @__PURE__ */ jsx("link", {
        href: define_process_env_default$9.VITE_REACT_APP_WP_STYLES,
        media: "all",
        rel: "stylesheet"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = withComponentProps(function Root() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Layout,
  default: root
}, Symbol.toStringTag, { value: "Module" }));
const messages_en = {
  "viz.chart.dashboard:inunits": "In units",
  "viz.chart.dashboard:inthousands": "In thousands",
  "viz.chart.dashboard:inmillions": "In millions"
};
var define_process_env_default$8 = { VITE_PROTOCOL: "https", VITE_DOMAIN: "et.tcdi.dgstg.org", VITE_REACT_APP_TITLE: "Tobacco Control Data Initiative", VITE_REACT_APP_WP_API: "https://et.tcdi.dgstg.org/wp/wp-json", VITE_REACT_APP_WP_STYLES: "https://et.tcdi.dgstg.org/wp/wp-admin/load-styles.php?c=1&dir=ltr&load%5Bchunk_0%5D=dashicons,admin-bar,buttons,media-views,editor-buttons,wp-components,wp-block-editor,wp-nux,wp-editor,wp-block-library,wp-block-&load%5Bchunk_1%5D=library-theme,wp-edit-blocks,wp-edit-post,wp-format-library,wp-block-directory,common,forms,admin-menu,dashboard,list-tables,edi&load%5Bchunk_2%5D=t,revisions,media,themes,about,nav-menus,wp-pointer,widgets,site-icon,l10n,wp-auth-check&ver=5.5.6' id='wp-block-library-css", VITE_REACT_APP_GA_CODE: "en", VITE_REACT_APP_DEFAULT_LOCALE: "en", VITE_REACT_APP_WP_HOSTS: "https://et.tcdi.dgstg.org", VITE_REACT_APP_USE_HASH_LINKS: "false", VITE_REACT_APP_THEME: "cash", VITE_REACT_APP_WP_SEARCH_END_POINT: "/dg/v1/search", VITE_REACT_APP_API_ROOT: "https://et.tcdi.dgstg.org" };
var React = (
  // prettier-ignore
  // @ts-ignore
  "default" in React$1 ? React$1["default"] : React$1
);
var ContextKey = Symbol.for(`react-redux-context`);
var gT = typeof globalThis !== "undefined" ? globalThis : (
  /* fall back to a per-module scope (pre-8.1 behaviour) if `globalThis` is not available */
  {}
);
function getContext() {
  if (!React.createContext)
    return {};
  const contextMap = gT[ContextKey] ?? (gT[ContextKey] = /* @__PURE__ */ new Map());
  let realContext = contextMap.get(React.createContext);
  if (!realContext) {
    realContext = React.createContext(
      null
    );
    if (define_process_env_default$8.NODE_ENV !== "production") {
      realContext.displayName = "ReactRedux";
    }
    contextMap.set(React.createContext, realContext);
  }
  return realContext;
}
var ReactReduxContext = /* @__PURE__ */ getContext();
var notInitialized = () => {
  throw new Error("uSES not initialized!");
};
function createReduxContextHook(context = ReactReduxContext) {
  return function useReduxContext2() {
    const contextValue = React.useContext(context);
    if (define_process_env_default$8.NODE_ENV !== "production" && !contextValue) {
      throw new Error(
        "could not find react-redux context value; please ensure the component is wrapped in a <Provider>"
      );
    }
    return contextValue;
  };
}
var useReduxContext = /* @__PURE__ */ createReduxContextHook();
var useSyncExternalStoreWithSelector = notInitialized;
var initializeUseSelector = (fn) => {
  useSyncExternalStoreWithSelector = fn;
};
var refEquality = (a, b) => a === b;
function createSelectorHook(context = ReactReduxContext) {
  const useReduxContext2 = context === ReactReduxContext ? useReduxContext : createReduxContextHook(context);
  const useSelector2 = (selector, equalityFnOrOptions = {}) => {
    const { equalityFn = refEquality, devModeChecks = {} } = typeof equalityFnOrOptions === "function" ? { equalityFn: equalityFnOrOptions } : equalityFnOrOptions;
    if (define_process_env_default$8.NODE_ENV !== "production") {
      if (!selector) {
        throw new Error(`You must pass a selector to useSelector`);
      }
      if (typeof selector !== "function") {
        throw new Error(`You must pass a function as a selector to useSelector`);
      }
      if (typeof equalityFn !== "function") {
        throw new Error(
          `You must pass a function as an equality function to useSelector`
        );
      }
    }
    const {
      store: store2,
      subscription,
      getServerState,
      stabilityCheck,
      identityFunctionCheck
    } = useReduxContext2();
    const firstRun = React.useRef(true);
    const wrappedSelector = React.useCallback(
      {
        [selector.name](state) {
          const selected = selector(state);
          if (define_process_env_default$8.NODE_ENV !== "production") {
            const {
              identityFunctionCheck: finalIdentityFunctionCheck,
              stabilityCheck: finalStabilityCheck
            } = {
              stabilityCheck,
              identityFunctionCheck,
              ...devModeChecks
            };
            if (finalStabilityCheck === "always" || finalStabilityCheck === "once" && firstRun.current) {
              const toCompare = selector(state);
              if (!equalityFn(selected, toCompare)) {
                let stack = void 0;
                try {
                  throw new Error();
                } catch (e) {
                  ({ stack } = e);
                }
                console.warn(
                  "Selector " + (selector.name || "unknown") + " returned a different result when called with the same parameters. This can lead to unnecessary rerenders.\nSelectors that return a new reference (such as an object or an array) should be memoized: https://redux.js.org/usage/deriving-data-selectors#optimizing-selectors-with-memoization",
                  {
                    state,
                    selected,
                    selected2: toCompare,
                    stack
                  }
                );
              }
            }
            if (finalIdentityFunctionCheck === "always" || finalIdentityFunctionCheck === "once" && firstRun.current) {
              if (selected === state) {
                let stack = void 0;
                try {
                  throw new Error();
                } catch (e) {
                  ({ stack } = e);
                }
                console.warn(
                  "Selector " + (selector.name || "unknown") + " returned the root state when called. This can lead to unnecessary rerenders.\nSelectors that return the entire state are almost certainly a mistake, as they will cause a rerender whenever *anything* in state changes.",
                  { stack }
                );
              }
            }
            if (firstRun.current)
              firstRun.current = false;
          }
          return selected;
        }
      }[selector.name],
      [selector, stabilityCheck, devModeChecks.stabilityCheck]
    );
    const selectedState = useSyncExternalStoreWithSelector(
      subscription.addNestedSub,
      store2.getState,
      getServerState || store2.getState,
      wrappedSelector,
      equalityFn
    );
    React.useDebugValue(selectedState);
    return selectedState;
  };
  Object.assign(useSelector2, {
    withTypes: () => useSelector2
  });
  return useSelector2;
}
var useSelector = /* @__PURE__ */ createSelectorHook();
var REACT_ELEMENT_TYPE = Symbol.for("react.element");
var REACT_PORTAL_TYPE = Symbol.for("react.portal");
var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
var REACT_PROVIDER_TYPE = Symbol.for("react.provider");
var REACT_CONTEXT_TYPE = Symbol.for("react.context");
var REACT_SERVER_CONTEXT_TYPE = Symbol.for("react.server_context");
var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
var REACT_MEMO_TYPE = Symbol.for("react.memo");
var REACT_LAZY_TYPE = Symbol.for("react.lazy");
var REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen");
var REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference");
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Memo = REACT_MEMO_TYPE;
function isValidElementType(type) {
  if (typeof type === "string" || typeof type === "function") {
    return true;
  }
  if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || type === REACT_OFFSCREEN_TYPE) {
    return true;
  }
  if (typeof type === "object" && type !== null) {
    if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
    // types supported by any Flight configuration anywhere since
    // we don't know which Flight build this will end up being used
    // with.
    type.$$typeof === REACT_CLIENT_REFERENCE || type.getModuleId !== void 0) {
      return true;
    }
  }
  return false;
}
function typeOf(object) {
  if (typeof object === "object" && object !== null) {
    const $$typeof = object.$$typeof;
    switch ($$typeof) {
      case REACT_ELEMENT_TYPE: {
        const type = object.type;
        switch (type) {
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
          case REACT_SUSPENSE_LIST_TYPE:
            return type;
          default: {
            const $$typeofType = type && type.$$typeof;
            switch ($$typeofType) {
              case REACT_SERVER_CONTEXT_TYPE:
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_LAZY_TYPE:
              case REACT_MEMO_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;
              default:
                return $$typeof;
            }
          }
        }
      }
      case REACT_PORTAL_TYPE: {
        return $$typeof;
      }
    }
  }
  return void 0;
}
function isContextConsumer(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
}
function isMemo(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
}
function warning(message) {
  if (typeof console !== "undefined" && typeof console.error === "function") {
    console.error(message);
  }
  try {
    throw new Error(message);
  } catch (e) {
  }
}
function verify(selector, methodName) {
  if (!selector) {
    throw new Error(`Unexpected value for ${methodName} in connect.`);
  } else if (methodName === "mapStateToProps" || methodName === "mapDispatchToProps") {
    if (!Object.prototype.hasOwnProperty.call(selector, "dependsOnOwnProps")) {
      warning(
        `The selector for ${methodName} of connect did not specify a value for dependsOnOwnProps.`
      );
    }
  }
}
function verifySubselectors(mapStateToProps2, mapDispatchToProps, mergeProps) {
  verify(mapStateToProps2, "mapStateToProps");
  verify(mapDispatchToProps, "mapDispatchToProps");
  verify(mergeProps, "mergeProps");
}
function pureFinalPropsSelectorFactory(mapStateToProps2, mapDispatchToProps, mergeProps, dispatch, {
  areStatesEqual,
  areOwnPropsEqual,
  areStatePropsEqual
}) {
  let hasRunAtLeastOnce = false;
  let state;
  let ownProps;
  let stateProps;
  let dispatchProps;
  let mergedProps;
  function handleFirstCall(firstState, firstOwnProps) {
    state = firstState;
    ownProps = firstOwnProps;
    stateProps = mapStateToProps2(state, ownProps);
    dispatchProps = mapDispatchToProps(dispatch, ownProps);
    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    hasRunAtLeastOnce = true;
    return mergedProps;
  }
  function handleNewPropsAndNewState() {
    stateProps = mapStateToProps2(state, ownProps);
    if (mapDispatchToProps.dependsOnOwnProps)
      dispatchProps = mapDispatchToProps(dispatch, ownProps);
    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    return mergedProps;
  }
  function handleNewProps() {
    if (mapStateToProps2.dependsOnOwnProps)
      stateProps = mapStateToProps2(state, ownProps);
    if (mapDispatchToProps.dependsOnOwnProps)
      dispatchProps = mapDispatchToProps(dispatch, ownProps);
    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    return mergedProps;
  }
  function handleNewState() {
    const nextStateProps = mapStateToProps2(state, ownProps);
    const statePropsChanged = !areStatePropsEqual(nextStateProps, stateProps);
    stateProps = nextStateProps;
    if (statePropsChanged)
      mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    return mergedProps;
  }
  function handleSubsequentCalls(nextState, nextOwnProps) {
    const propsChanged = !areOwnPropsEqual(nextOwnProps, ownProps);
    const stateChanged = !areStatesEqual(
      nextState,
      state,
      nextOwnProps,
      ownProps
    );
    state = nextState;
    ownProps = nextOwnProps;
    if (propsChanged && stateChanged)
      return handleNewPropsAndNewState();
    if (propsChanged)
      return handleNewProps();
    if (stateChanged)
      return handleNewState();
    return mergedProps;
  }
  return function pureFinalPropsSelector(nextState, nextOwnProps) {
    return hasRunAtLeastOnce ? handleSubsequentCalls(nextState, nextOwnProps) : handleFirstCall(nextState, nextOwnProps);
  };
}
function finalPropsSelectorFactory(dispatch, {
  initMapStateToProps,
  initMapDispatchToProps,
  initMergeProps,
  ...options
}) {
  const mapStateToProps2 = initMapStateToProps(dispatch, options);
  const mapDispatchToProps = initMapDispatchToProps(dispatch, options);
  const mergeProps = initMergeProps(dispatch, options);
  if (define_process_env_default$8.NODE_ENV !== "production") {
    verifySubselectors(mapStateToProps2, mapDispatchToProps, mergeProps);
  }
  return pureFinalPropsSelectorFactory(mapStateToProps2, mapDispatchToProps, mergeProps, dispatch, options);
}
function bindActionCreators(actionCreators, dispatch) {
  const boundActionCreators = {};
  for (const key in actionCreators) {
    const actionCreator = actionCreators[key];
    if (typeof actionCreator === "function") {
      boundActionCreators[key] = (...args) => dispatch(actionCreator(...args));
    }
  }
  return boundActionCreators;
}
function isPlainObject(obj) {
  if (typeof obj !== "object" || obj === null)
    return false;
  const proto = Object.getPrototypeOf(obj);
  if (proto === null)
    return true;
  let baseProto = proto;
  while (Object.getPrototypeOf(baseProto) !== null) {
    baseProto = Object.getPrototypeOf(baseProto);
  }
  return proto === baseProto;
}
function verifyPlainObject(value, displayName, methodName) {
  if (!isPlainObject(value)) {
    warning(
      `${methodName}() in ${displayName} must return a plain object. Instead received ${value}.`
    );
  }
}
function wrapMapToPropsConstant(getConstant) {
  return function initConstantSelector(dispatch) {
    const constant = getConstant(dispatch);
    function constantSelector() {
      return constant;
    }
    constantSelector.dependsOnOwnProps = false;
    return constantSelector;
  };
}
function getDependsOnOwnProps(mapToProps) {
  return mapToProps.dependsOnOwnProps ? Boolean(mapToProps.dependsOnOwnProps) : mapToProps.length !== 1;
}
function wrapMapToPropsFunc(mapToProps, methodName) {
  return function initProxySelector(dispatch, { displayName }) {
    const proxy = function mapToPropsProxy(stateOrDispatch, ownProps) {
      return proxy.dependsOnOwnProps ? proxy.mapToProps(stateOrDispatch, ownProps) : proxy.mapToProps(stateOrDispatch, void 0);
    };
    proxy.dependsOnOwnProps = true;
    proxy.mapToProps = function detectFactoryAndVerify(stateOrDispatch, ownProps) {
      proxy.mapToProps = mapToProps;
      proxy.dependsOnOwnProps = getDependsOnOwnProps(mapToProps);
      let props = proxy(stateOrDispatch, ownProps);
      if (typeof props === "function") {
        proxy.mapToProps = props;
        proxy.dependsOnOwnProps = getDependsOnOwnProps(props);
        props = proxy(stateOrDispatch, ownProps);
      }
      if (define_process_env_default$8.NODE_ENV !== "production")
        verifyPlainObject(props, displayName, methodName);
      return props;
    };
    return proxy;
  };
}
function createInvalidArgFactory(arg, name) {
  return (dispatch, options) => {
    throw new Error(
      `Invalid value of type ${typeof arg} for ${name} argument when connecting component ${options.wrappedComponentName}.`
    );
  };
}
function mapDispatchToPropsFactory(mapDispatchToProps) {
  return mapDispatchToProps && typeof mapDispatchToProps === "object" ? wrapMapToPropsConstant(
    (dispatch) => (
      // @ts-ignore
      bindActionCreators(mapDispatchToProps, dispatch)
    )
  ) : !mapDispatchToProps ? wrapMapToPropsConstant((dispatch) => ({
    dispatch
  })) : typeof mapDispatchToProps === "function" ? (
    // @ts-ignore
    wrapMapToPropsFunc(mapDispatchToProps, "mapDispatchToProps")
  ) : createInvalidArgFactory(mapDispatchToProps, "mapDispatchToProps");
}
function mapStateToPropsFactory(mapStateToProps2) {
  return !mapStateToProps2 ? wrapMapToPropsConstant(() => ({})) : typeof mapStateToProps2 === "function" ? (
    // @ts-ignore
    wrapMapToPropsFunc(mapStateToProps2, "mapStateToProps")
  ) : createInvalidArgFactory(mapStateToProps2, "mapStateToProps");
}
function defaultMergeProps(stateProps, dispatchProps, ownProps) {
  return { ...ownProps, ...stateProps, ...dispatchProps };
}
function wrapMergePropsFunc(mergeProps) {
  return function initMergePropsProxy(dispatch, { displayName, areMergedPropsEqual }) {
    let hasRunOnce = false;
    let mergedProps;
    return function mergePropsProxy(stateProps, dispatchProps, ownProps) {
      const nextMergedProps = mergeProps(stateProps, dispatchProps, ownProps);
      if (hasRunOnce) {
        if (!areMergedPropsEqual(nextMergedProps, mergedProps))
          mergedProps = nextMergedProps;
      } else {
        hasRunOnce = true;
        mergedProps = nextMergedProps;
        if (define_process_env_default$8.NODE_ENV !== "production")
          verifyPlainObject(mergedProps, displayName, "mergeProps");
      }
      return mergedProps;
    };
  };
}
function mergePropsFactory(mergeProps) {
  return !mergeProps ? () => defaultMergeProps : typeof mergeProps === "function" ? wrapMergePropsFunc(mergeProps) : createInvalidArgFactory(mergeProps, "mergeProps");
}
function defaultNoopBatch(callback) {
  callback();
}
function createListenerCollection() {
  let first = null;
  let last = null;
  return {
    clear() {
      first = null;
      last = null;
    },
    notify() {
      defaultNoopBatch(() => {
        let listener = first;
        while (listener) {
          listener.callback();
          listener = listener.next;
        }
      });
    },
    get() {
      const listeners = [];
      let listener = first;
      while (listener) {
        listeners.push(listener);
        listener = listener.next;
      }
      return listeners;
    },
    subscribe(callback) {
      let isSubscribed = true;
      const listener = last = {
        callback,
        next: null,
        prev: last
      };
      if (listener.prev) {
        listener.prev.next = listener;
      } else {
        first = listener;
      }
      return function unsubscribe() {
        if (!isSubscribed || first === null)
          return;
        isSubscribed = false;
        if (listener.next) {
          listener.next.prev = listener.prev;
        } else {
          last = listener.prev;
        }
        if (listener.prev) {
          listener.prev.next = listener.next;
        } else {
          first = listener.next;
        }
      };
    }
  };
}
var nullListeners = {
  notify() {
  },
  get: () => []
};
function createSubscription(store2, parentSub) {
  let unsubscribe;
  let listeners = nullListeners;
  let subscriptionsAmount = 0;
  let selfSubscribed = false;
  function addNestedSub(listener) {
    trySubscribe();
    const cleanupListener = listeners.subscribe(listener);
    let removed = false;
    return () => {
      if (!removed) {
        removed = true;
        cleanupListener();
        tryUnsubscribe();
      }
    };
  }
  function notifyNestedSubs() {
    listeners.notify();
  }
  function handleChangeWrapper() {
    if (subscription.onStateChange) {
      subscription.onStateChange();
    }
  }
  function isSubscribed() {
    return selfSubscribed;
  }
  function trySubscribe() {
    subscriptionsAmount++;
    if (!unsubscribe) {
      unsubscribe = parentSub ? parentSub.addNestedSub(handleChangeWrapper) : store2.subscribe(handleChangeWrapper);
      listeners = createListenerCollection();
    }
  }
  function tryUnsubscribe() {
    subscriptionsAmount--;
    if (unsubscribe && subscriptionsAmount === 0) {
      unsubscribe();
      unsubscribe = void 0;
      listeners.clear();
      listeners = nullListeners;
    }
  }
  function trySubscribeSelf() {
    if (!selfSubscribed) {
      selfSubscribed = true;
      trySubscribe();
    }
  }
  function tryUnsubscribeSelf() {
    if (selfSubscribed) {
      selfSubscribed = false;
      tryUnsubscribe();
    }
  }
  const subscription = {
    addNestedSub,
    notifyNestedSubs,
    handleChangeWrapper,
    isSubscribed,
    trySubscribe: trySubscribeSelf,
    tryUnsubscribe: tryUnsubscribeSelf,
    getListeners: () => listeners
  };
  return subscription;
}
var canUseDOM = !!(typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined");
var isReactNative = typeof navigator !== "undefined" && navigator.product === "ReactNative";
var useIsomorphicLayoutEffect = canUseDOM || isReactNative ? React.useLayoutEffect : React.useEffect;
function is(x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}
function shallowEqual(objA, objB) {
  if (is(objA, objB))
    return true;
  if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) {
    return false;
  }
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
  if (keysA.length !== keysB.length)
    return false;
  for (let i = 0; i < keysA.length; i++) {
    if (!Object.prototype.hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }
  return true;
}
var REACT_STATICS = {
  childContextTypes: true,
  contextType: true,
  contextTypes: true,
  defaultProps: true,
  displayName: true,
  getDefaultProps: true,
  getDerivedStateFromError: true,
  getDerivedStateFromProps: true,
  mixins: true,
  propTypes: true,
  type: true
};
var KNOWN_STATICS = {
  name: true,
  length: true,
  prototype: true,
  caller: true,
  callee: true,
  arguments: true,
  arity: true
};
var FORWARD_REF_STATICS = {
  $$typeof: true,
  render: true,
  defaultProps: true,
  displayName: true,
  propTypes: true
};
var MEMO_STATICS = {
  $$typeof: true,
  compare: true,
  defaultProps: true,
  displayName: true,
  propTypes: true,
  type: true
};
var TYPE_STATICS = {
  [ForwardRef]: FORWARD_REF_STATICS,
  [Memo]: MEMO_STATICS
};
function getStatics(component) {
  if (isMemo(component)) {
    return MEMO_STATICS;
  }
  return TYPE_STATICS[component["$$typeof"]] || REACT_STATICS;
}
var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = Object.prototype;
function hoistNonReactStatics(targetComponent, sourceComponent) {
  if (typeof sourceComponent !== "string") {
    if (objectPrototype) {
      const inheritedComponent = getPrototypeOf(sourceComponent);
      if (inheritedComponent && inheritedComponent !== objectPrototype) {
        hoistNonReactStatics(targetComponent, inheritedComponent);
      }
    }
    let keys = getOwnPropertyNames(sourceComponent);
    if (getOwnPropertySymbols) {
      keys = keys.concat(getOwnPropertySymbols(sourceComponent));
    }
    const targetStatics = getStatics(targetComponent);
    const sourceStatics = getStatics(sourceComponent);
    for (let i = 0; i < keys.length; ++i) {
      const key = keys[i];
      if (!KNOWN_STATICS[key] && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
        const descriptor = getOwnPropertyDescriptor(sourceComponent, key);
        try {
          defineProperty(targetComponent, key, descriptor);
        } catch (e) {
        }
      }
    }
  }
  return targetComponent;
}
var useSyncExternalStore = notInitialized;
var initializeConnect = (fn) => {
  useSyncExternalStore = fn;
};
var NO_SUBSCRIPTION_ARRAY = [null, null];
var stringifyComponent = (Comp) => {
  try {
    return JSON.stringify(Comp);
  } catch (err) {
    return String(Comp);
  }
};
function useIsomorphicLayoutEffectWithArgs(effectFunc, effectArgs, dependencies) {
  useIsomorphicLayoutEffect(() => effectFunc(...effectArgs), dependencies);
}
function captureWrapperProps(lastWrapperProps, lastChildProps, renderIsScheduled, wrapperProps, childPropsFromStoreUpdate, notifyNestedSubs) {
  lastWrapperProps.current = wrapperProps;
  renderIsScheduled.current = false;
  if (childPropsFromStoreUpdate.current) {
    childPropsFromStoreUpdate.current = null;
    notifyNestedSubs();
  }
}
function subscribeUpdates(shouldHandleStateChanges, store2, subscription, childPropsSelector, lastWrapperProps, lastChildProps, renderIsScheduled, isMounted, childPropsFromStoreUpdate, notifyNestedSubs, additionalSubscribeListener) {
  if (!shouldHandleStateChanges)
    return () => {
    };
  let didUnsubscribe = false;
  let lastThrownError = null;
  const checkForUpdates = () => {
    if (didUnsubscribe || !isMounted.current) {
      return;
    }
    const latestStoreState = store2.getState();
    let newChildProps, error;
    try {
      newChildProps = childPropsSelector(
        latestStoreState,
        lastWrapperProps.current
      );
    } catch (e) {
      error = e;
      lastThrownError = e;
    }
    if (!error) {
      lastThrownError = null;
    }
    if (newChildProps === lastChildProps.current) {
      if (!renderIsScheduled.current) {
        notifyNestedSubs();
      }
    } else {
      lastChildProps.current = newChildProps;
      childPropsFromStoreUpdate.current = newChildProps;
      renderIsScheduled.current = true;
      additionalSubscribeListener();
    }
  };
  subscription.onStateChange = checkForUpdates;
  subscription.trySubscribe();
  checkForUpdates();
  const unsubscribeWrapper = () => {
    didUnsubscribe = true;
    subscription.tryUnsubscribe();
    subscription.onStateChange = null;
    if (lastThrownError) {
      throw lastThrownError;
    }
  };
  return unsubscribeWrapper;
}
function strictEqual(a, b) {
  return a === b;
}
var hasWarnedAboutDeprecatedPureOption = false;
function connect(mapStateToProps2, mapDispatchToProps, mergeProps, {
  // The `pure` option has been removed, so TS doesn't like us destructuring this to check its existence.
  // @ts-ignore
  pure,
  areStatesEqual = strictEqual,
  areOwnPropsEqual = shallowEqual,
  areStatePropsEqual = shallowEqual,
  areMergedPropsEqual = shallowEqual,
  // use React's forwardRef to expose a ref of the wrapped component
  forwardRef = false,
  // the context consumer to use
  context = ReactReduxContext
} = {}) {
  if (define_process_env_default$8.NODE_ENV !== "production") {
    if (pure !== void 0 && !hasWarnedAboutDeprecatedPureOption) {
      hasWarnedAboutDeprecatedPureOption = true;
      warning(
        'The `pure` option has been removed. `connect` is now always a "pure/memoized" component'
      );
    }
  }
  const Context = context;
  const initMapStateToProps = mapStateToPropsFactory(mapStateToProps2);
  const initMapDispatchToProps = mapDispatchToPropsFactory(mapDispatchToProps);
  const initMergeProps = mergePropsFactory(mergeProps);
  const shouldHandleStateChanges = Boolean(mapStateToProps2);
  const wrapWithConnect = (WrappedComponent) => {
    if (define_process_env_default$8.NODE_ENV !== "production") {
      const isValid = /* @__PURE__ */ isValidElementType(WrappedComponent);
      if (!isValid)
        throw new Error(
          `You must pass a component to the function returned by connect. Instead received ${stringifyComponent(
            WrappedComponent
          )}`
        );
    }
    const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || "Component";
    const displayName = `Connect(${wrappedComponentName})`;
    const selectorFactoryOptions = {
      shouldHandleStateChanges,
      displayName,
      wrappedComponentName,
      WrappedComponent,
      // @ts-ignore
      initMapStateToProps,
      // @ts-ignore
      initMapDispatchToProps,
      initMergeProps,
      areStatesEqual,
      areStatePropsEqual,
      areOwnPropsEqual,
      areMergedPropsEqual
    };
    function ConnectFunction(props) {
      const [propsContext, reactReduxForwardedRef, wrapperProps] = React.useMemo(() => {
        const { reactReduxForwardedRef: reactReduxForwardedRef2, ...wrapperProps2 } = props;
        return [props.context, reactReduxForwardedRef2, wrapperProps2];
      }, [props]);
      const ContextToUse = React.useMemo(() => {
        let ResultContext = Context;
        if (propsContext == null ? void 0 : propsContext.Consumer) {
          if (define_process_env_default$8.NODE_ENV !== "production") {
            const isValid = /* @__PURE__ */ isContextConsumer(
              // @ts-ignore
              /* @__PURE__ */ React.createElement(propsContext.Consumer, null)
            );
            if (!isValid) {
              throw new Error(
                "You must pass a valid React context consumer as `props.context`"
              );
            }
            ResultContext = propsContext;
          }
        }
        return ResultContext;
      }, [propsContext, Context]);
      const contextValue = React.useContext(ContextToUse);
      const didStoreComeFromProps = Boolean(props.store) && Boolean(props.store.getState) && Boolean(props.store.dispatch);
      const didStoreComeFromContext = Boolean(contextValue) && Boolean(contextValue.store);
      if (define_process_env_default$8.NODE_ENV !== "production" && !didStoreComeFromProps && !didStoreComeFromContext) {
        throw new Error(
          `Could not find "store" in the context of "${displayName}". Either wrap the root component in a <Provider>, or pass a custom React context provider to <Provider> and the corresponding React context consumer to ${displayName} in connect options.`
        );
      }
      const store2 = didStoreComeFromProps ? props.store : contextValue.store;
      const getServerState = didStoreComeFromContext ? contextValue.getServerState : store2.getState;
      const childPropsSelector = React.useMemo(() => {
        return finalPropsSelectorFactory(store2.dispatch, selectorFactoryOptions);
      }, [store2]);
      const [subscription, notifyNestedSubs] = React.useMemo(() => {
        if (!shouldHandleStateChanges)
          return NO_SUBSCRIPTION_ARRAY;
        const subscription2 = createSubscription(
          store2,
          didStoreComeFromProps ? void 0 : contextValue.subscription
        );
        const notifyNestedSubs2 = subscription2.notifyNestedSubs.bind(subscription2);
        return [subscription2, notifyNestedSubs2];
      }, [store2, didStoreComeFromProps, contextValue]);
      const overriddenContextValue = React.useMemo(() => {
        if (didStoreComeFromProps) {
          return contextValue;
        }
        return {
          ...contextValue,
          subscription
        };
      }, [didStoreComeFromProps, contextValue, subscription]);
      const lastChildProps = React.useRef(void 0);
      const lastWrapperProps = React.useRef(wrapperProps);
      const childPropsFromStoreUpdate = React.useRef(void 0);
      const renderIsScheduled = React.useRef(false);
      const isMounted = React.useRef(false);
      const latestSubscriptionCallbackError = React.useRef(
        void 0
      );
      useIsomorphicLayoutEffect(() => {
        isMounted.current = true;
        return () => {
          isMounted.current = false;
        };
      }, []);
      const actualChildPropsSelector = React.useMemo(() => {
        const selector = () => {
          if (childPropsFromStoreUpdate.current && wrapperProps === lastWrapperProps.current) {
            return childPropsFromStoreUpdate.current;
          }
          return childPropsSelector(store2.getState(), wrapperProps);
        };
        return selector;
      }, [store2, wrapperProps]);
      const subscribeForReact = React.useMemo(() => {
        const subscribe2 = (reactListener) => {
          if (!subscription) {
            return () => {
            };
          }
          return subscribeUpdates(
            shouldHandleStateChanges,
            store2,
            subscription,
            // @ts-ignore
            childPropsSelector,
            lastWrapperProps,
            lastChildProps,
            renderIsScheduled,
            isMounted,
            childPropsFromStoreUpdate,
            notifyNestedSubs,
            reactListener
          );
        };
        return subscribe2;
      }, [subscription]);
      useIsomorphicLayoutEffectWithArgs(captureWrapperProps, [
        lastWrapperProps,
        lastChildProps,
        renderIsScheduled,
        wrapperProps,
        childPropsFromStoreUpdate,
        notifyNestedSubs
      ]);
      let actualChildProps;
      try {
        actualChildProps = useSyncExternalStore(
          // TODO We're passing through a big wrapper that does a bunch of extra side effects besides subscribing
          subscribeForReact,
          // TODO This is incredibly hacky. We've already processed the store update and calculated new child props,
          // TODO and we're just passing that through so it triggers a re-render for us rather than relying on `uSES`.
          actualChildPropsSelector,
          getServerState ? () => childPropsSelector(getServerState(), wrapperProps) : actualChildPropsSelector
        );
      } catch (err) {
        if (latestSubscriptionCallbackError.current) {
          err.message += `
The error may be correlated with this previous error:
${latestSubscriptionCallbackError.current.stack}

`;
        }
        throw err;
      }
      useIsomorphicLayoutEffect(() => {
        latestSubscriptionCallbackError.current = void 0;
        childPropsFromStoreUpdate.current = void 0;
        lastChildProps.current = actualChildProps;
      });
      const renderedWrappedComponent = React.useMemo(() => {
        return (
          // @ts-ignore
          /* @__PURE__ */ React.createElement(
            WrappedComponent,
            {
              ...actualChildProps,
              ref: reactReduxForwardedRef
            }
          )
        );
      }, [reactReduxForwardedRef, WrappedComponent, actualChildProps]);
      const renderedChild = React.useMemo(() => {
        if (shouldHandleStateChanges) {
          return /* @__PURE__ */ React.createElement(ContextToUse.Provider, { value: overriddenContextValue }, renderedWrappedComponent);
        }
        return renderedWrappedComponent;
      }, [ContextToUse, renderedWrappedComponent, overriddenContextValue]);
      return renderedChild;
    }
    const _Connect = React.memo(ConnectFunction);
    const Connect = _Connect;
    Connect.WrappedComponent = WrappedComponent;
    Connect.displayName = ConnectFunction.displayName = displayName;
    if (forwardRef) {
      const _forwarded = React.forwardRef(
        function forwardConnectRef(props, ref) {
          return /* @__PURE__ */ React.createElement(Connect, { ...props, reactReduxForwardedRef: ref });
        }
      );
      const forwarded = _forwarded;
      forwarded.displayName = displayName;
      forwarded.WrappedComponent = WrappedComponent;
      return /* @__PURE__ */ hoistNonReactStatics(forwarded, WrappedComponent);
    }
    return /* @__PURE__ */ hoistNonReactStatics(Connect, WrappedComponent);
  };
  return wrapWithConnect;
}
var connect_default = connect;
function Provider({
  store: store2,
  context,
  children,
  serverState,
  stabilityCheck = "once",
  identityFunctionCheck = "once"
}) {
  const contextValue = React.useMemo(() => {
    const subscription = createSubscription(store2);
    return {
      store: store2,
      subscription,
      getServerState: serverState ? () => serverState : void 0,
      stabilityCheck,
      identityFunctionCheck
    };
  }, [store2, serverState, stabilityCheck, identityFunctionCheck]);
  const previousState = React.useMemo(() => store2.getState(), [store2]);
  useIsomorphicLayoutEffect(() => {
    const { subscription } = contextValue;
    subscription.onStateChange = subscription.notifyNestedSubs;
    subscription.trySubscribe();
    if (previousState !== store2.getState()) {
      subscription.notifyNestedSubs();
    }
    return () => {
      subscription.tryUnsubscribe();
      subscription.onStateChange = void 0;
    };
  }, [contextValue, previousState]);
  const Context = context || ReactReduxContext;
  return /* @__PURE__ */ React.createElement(Context.Provider, { value: contextValue }, children);
}
var Provider_default = Provider;
function createStoreHook(context = ReactReduxContext) {
  const useReduxContext2 = context === ReactReduxContext ? useReduxContext : (
    // @ts-ignore
    createReduxContextHook(context)
  );
  const useStore2 = () => {
    const { store: store2 } = useReduxContext2();
    return store2;
  };
  Object.assign(useStore2, {
    withTypes: () => useStore2
  });
  return useStore2;
}
var useStore = /* @__PURE__ */ createStoreHook();
function createDispatchHook(context = ReactReduxContext) {
  const useStore2 = context === ReactReduxContext ? useStore : createStoreHook(context);
  const useDispatch2 = () => {
    const store2 = useStore2();
    return store2.dispatch;
  };
  Object.assign(useDispatch2, {
    withTypes: () => useDispatch2
  });
  return useDispatch2;
}
var useDispatch = /* @__PURE__ */ createDispatchHook();
initializeUseSelector(useSyncExternalStoreWithSelector$1);
initializeConnect(React$1.useSyncExternalStore);
function defaultSelector(state) {
  const { intl } = state;
  return {
    key: intl.locale,
    ...intl
  };
}
const mapStateToProps$5 = (state, { intlSelector = defaultSelector }) => intlSelector(state);
connect_default(mapStateToProps$5)(IntlProvider);
({
  children: PropTypes.element.isRequired
});
const UPDATE = "@@intl/UPDATE";
const updateIntl = ({ locale, formats, messages: messages2 }) => ({
  type: UPDATE,
  payload: { locale, formats, messages: messages2 }
});
const initialState$5 = {
  locale: "en",
  messages: {}
};
function intlReducer(state = initialState$5, action) {
  if (action.type !== UPDATE) {
    return state;
  }
  return { ...state, ...action.payload };
}
const PostContext = /* @__PURE__ */ React__default.createContext();
const PageContext = /* @__PURE__ */ React__default.createContext();
const TaxonomyContext = /* @__PURE__ */ React__default.createContext();
const SearchContext = /* @__PURE__ */ React__default.createContext();
const MenuContext = /* @__PURE__ */ React__default.createContext();
const AppContext = /* @__PURE__ */ React__default.createContext();
const SettingsContext = /* @__PURE__ */ React__default.createContext();
class EmbeddedGateway extends React__default.Component {
  constructor(props) {
    super(props);
    this.renderEmbeddedComponents = this.renderEmbeddedComponents.bind(this);
    this.wrapper = /* @__PURE__ */ React__default.createRef();
  }
  renderEmbeddedComponents() {
    const {
      locale,
      store: store2,
      getComponent
    } = this.props;
    const elements = window.document.querySelectorAll(".viz-component:not(.self-render-component > .viz-component)");
    if (!(elements == null)) {
      Array.from(elements).forEach((element, index) => {
        let container = element;
        const component = element.getAttribute("data-component");
        element.removeAttribute("data-component");
        if (element.nodeName !== "DIV") {
          const div = document.createElement("div");
          element.replaceWith(div);
          div.setAttribute("class", element.getAttribute("class"));
          div.setAttribute("id", "generated_div");
          element.getAttributeNames().forEach((a) => {
            div.setAttribute(a, element.getAttribute(a));
          });
          container = div;
        }
        if (component) {
          const props = {
            ...this.props
          };
          const attrs = element.attributes;
          for (let i = attrs.length - 1; i >= 0; i--) {
            props[attrs[i].name] = attrs[i].value;
          }
          const C = injectIntl(getComponent(component));
          if (C) {
            ReactDOM.createRoot(container).render(/* @__PURE__ */ jsx(Provider_default, {
              store: store2,
              children: /* @__PURE__ */ jsx(IntlProvider, {
                locale,
                children: /* @__PURE__ */ jsx(AppContextProvider, {
                  getComponent,
                  store: store2,
                  locale,
                  children: /* @__PURE__ */ jsx(C, {
                    unique: (this.props.parentUnique ? this.props.parentUnique : "") + "_embeddable_" + index + (Math.random() + 1).toString(36).substring(7),
                    ...props,
                    childContent: element.innerHTML
                  })
                })
              })
            }));
          } else {
            ReactDOM.createRoot(container).render(/* @__PURE__ */ jsxs("span", {
              style: {
                "color": "red"
              },
              children: [component, " not found "]
            }));
          }
        }
      });
    }
  }
  componentDidMount() {
    this.renderEmbeddedComponents();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    const {
      parent
    } = this.props;
    if (parent != prevProps.parent) {
      this.renderEmbeddedComponents();
    }
  }
  render() {
    return /* @__PURE__ */ jsx(React__default.Fragment, {
      children: this.props.children
    });
  }
}
const WithContext = (props) => {
  const $ = c(2);
  let t0;
  if ($[0] !== props) {
    t0 = /* @__PURE__ */ jsx(AppContext.Consumer, {
      children: (data2) => {
        if (data2) {
          return /* @__PURE__ */ jsx(EmbeddedGateway, {
            ...props,
            locale: data2.locale,
            store: data2.store,
            getComponent: data2.getComponent,
            children: props.children
          });
        } else {
          return /* @__PURE__ */ jsxs(React__default.Fragment, {
            children: [props.children, " "]
          });
        }
      }
    });
    $[0] = props;
    $[1] = t0;
  } else {
    t0 = $[1];
  }
  return t0;
};
var define_process_env_default$7 = { VITE_PROTOCOL: "https", VITE_DOMAIN: "et.tcdi.dgstg.org", VITE_REACT_APP_TITLE: "Tobacco Control Data Initiative", VITE_REACT_APP_WP_API: "https://et.tcdi.dgstg.org/wp/wp-json", VITE_REACT_APP_WP_STYLES: "https://et.tcdi.dgstg.org/wp/wp-admin/load-styles.php?c=1&dir=ltr&load%5Bchunk_0%5D=dashicons,admin-bar,buttons,media-views,editor-buttons,wp-components,wp-block-editor,wp-nux,wp-editor,wp-block-library,wp-block-&load%5Bchunk_1%5D=library-theme,wp-edit-blocks,wp-edit-post,wp-format-library,wp-block-directory,common,forms,admin-menu,dashboard,list-tables,edi&load%5Bchunk_2%5D=t,revisions,media,themes,about,nav-menus,wp-pointer,widgets,site-icon,l10n,wp-auth-check&ver=5.5.6' id='wp-block-library-css", VITE_REACT_APP_GA_CODE: "en", VITE_REACT_APP_DEFAULT_LOCALE: "en", VITE_REACT_APP_WP_HOSTS: "https://et.tcdi.dgstg.org", VITE_REACT_APP_USE_HASH_LINKS: "false", VITE_REACT_APP_THEME: "cash", VITE_REACT_APP_WP_SEARCH_END_POINT: "/dg/v1/search", VITE_REACT_APP_API_ROOT: "https://et.tcdi.dgstg.org" };
const replaceLink = (url, locale) => {
  const replacementTarget = define_process_env_default$7.VITE_REACT_APP_WP_HOSTS.split(",");
  let all = new RegExp("^(http|https)://(" + replacementTarget.join("|") + ")", "ig");
  if (url) {
    return url.replaceAll(all, "#" + locale);
  } else if (url) {
    return url.replaceAll(all, "/" + locale);
  }
};
const replaceHTMLinks = (html, locale) => {
  const replacementTarget = define_process_env_default$7.VITE_REACT_APP_WP_HOSTS.split(",");
  let all = new RegExp("^(http|https)://(" + replacementTarget.join("|") + ")", "ig");
  let link;
  let regex = /href\s*=\s*(['"])(https?:\/\/.+?)\1/ig;
  let newHtml = html;
  while ((link = regex.exec(html)) !== null) {
    let href = link[2];
    let newLink;
    {
      newLink = href.replace(all, "#" + locale);
    }
    newHtml = newHtml.replaceAll(link[2], newLink);
  }
  {
    let anchor = /href="#([^"]*)"/ig;
    let re2 = new RegExp(anchor, "i");
    while ((link = anchor.exec(html)) !== null) {
      let href = link[0];
      let newLink = href.replace(re2, `href="javascript:document.getElementById('` + link[1] + `').scrollIntoView({block: 'start', behavior: 'smooth'})"`);
      newHtml = newHtml.replaceAll(link[0], newLink);
    }
  }
  return newHtml;
};
const removePatternBrackets = (html) => {
  const bracketReplacement = `###${Math.random()}###`;
  const regex = new RegExp(`\\[${bracketReplacement}.*?]`, "ig");
  if (html) {
    return html.replaceAll("[:", `[${bracketReplacement}`).replaceAll(regex, "").replaceAll(`${bracketReplacement}`, "");
  } else {
    return null;
  }
};
const utils = {
  replaceHTMLinks,
  replaceLink
};
const Enhance = (props) => {
  const $ = c(7);
  const Component3 = props.as ? props.as : Container;
  let t0;
  if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
    t0 = ["post", "pageNumber", "visibility", "intl", "as"];
    $[0] = t0;
  } else {
    t0 = $[0];
  }
  const filteredProps = t0;
  let newProps;
  if ($[1] !== props) {
    newProps = {};
    Object.keys(props).filter(_temp$1).forEach((e) => {
      if (filteredProps.indexOf(e) == -1) {
        newProps[e] = props[e];
      }
    });
    $[1] = props;
    $[2] = newProps;
  } else {
    newProps = $[2];
  }
  let t1;
  if ($[3] !== Component3 || $[4] !== newProps || $[5] !== props.children) {
    t1 = /* @__PURE__ */ jsx(Component3, {
      ...newProps,
      children: props.children
    });
    $[3] = Component3;
    $[4] = newProps;
    $[5] = props.children;
    $[6] = t1;
  } else {
    t1 = $[6];
  }
  return t1;
};
const translate = function(str) {
  let locale = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "en";
  if (str == null) {
    return null;
  }
  let newStr = null;
  const matches = str.match(/\[:([a-z])+\]([\s\S]*?)\[:\]/img);
  if (matches != null) {
    matches.forEach((part) => {
      let regularExpression = new RegExp(`\\[:${locale}\\][\\s\\S]([\\s\\S]*?)\\[:`, "g");
      let tr = part.match(regularExpression);
      if (tr != null) {
        let translation = tr[0];
        newStr = str.replace(part, translation.substring(5, translation.length - 2));
      }
    });
  }
  return newStr ? newStr : str;
};
class Content extends React__default.Component {
  constructor(props) {
    super(props);
    this.state = {
      showContentEnabled: false
    };
  }
  componentDidMount() {
    if (this.props.onLoad) {
      this.props.onLoad();
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
  }
  render() {
    const {
      post: post2,
      pageNumber,
      showTitle,
      showContent,
      showIntro,
      showDate,
      showLoading,
      as,
      locale,
      messages: messages2,
      preview
    } = this.props;
    if (post2) {
      const contentParts = post2.content ? post2.content.rendered.split("<!--more-->") : [];
      const intro = contentParts.length > 1 ? contentParts[0] : null;
      const content = contentParts.length > 1 ? contentParts[1] : contentParts[0];
      const pages = content ? content.split("<!--nextpage-->") : "";
      let body = "";
      if (pageNumber != null && pages.length > 0) {
        body = pages[pageNumber];
      } else {
        body = content;
      }
      return /* @__PURE__ */ jsx(WithContext, {
        parentUnique: this.props.parentUnique,
        messages: messages2,
        parent: preview ? post2.parent : post2.id,
        children: /* @__PURE__ */ jsxs(Enhance, {
          className: "entry-content",
          ...this.props,
          children: [/* @__PURE__ */ jsx("div", {}), showDate && /* @__PURE__ */ jsx(Container, {
            fluid: true,
            className: "date",
            children: post2.date.toLocaleString()
          }), showTitle && /* @__PURE__ */ jsx("span", {
            id: post2.slug,
            className: "title",
            dangerouslySetInnerHTML: {
              __html: post2.title.rendered
            }
          }), showIntro && /* @__PURE__ */ jsx(Container, {
            fluid: true,
            className: "excerpt",
            dangerouslySetInnerHTML: {
              __html: removePatternBrackets(replaceHTMLinks(translate(intro, locale), locale))
            }
          }), showContent && /* @__PURE__ */ jsx(Container, {
            fluid: true,
            className: "content ",
            dangerouslySetInnerHTML: {
              __html: removePatternBrackets(replaceHTMLinks(translate(body, locale), locale))
            }
          })]
        })
      });
    } else {
      return showLoading ? "Loading" : false;
    }
  }
}
function _temp$1(p) {
  return p;
}
const PostContent = (props) => {
  const $ = c(2);
  let t0;
  if ($[0] !== props) {
    t0 = /* @__PURE__ */ jsx(Content, {
      ...props,
      showContent: true
    });
    $[0] = props;
    $[1] = t0;
  } else {
    t0 = $[1];
  }
  return t0;
};
const Wrapper = (props) => {
  const $ = c(8);
  const {
    posts
  } = props;
  if (posts) {
    const single = posts.length == 1;
    if (single) {
      const t0 = posts[0];
      let t1;
      if ($[0] !== props || $[1] !== t0) {
        t1 = /* @__PURE__ */ jsx(React__default.Fragment, {
          children: /* @__PURE__ */ jsx(PostContent, {
            ...props,
            post: t0
          })
        });
        $[0] = props;
        $[1] = t0;
        $[2] = t1;
      } else {
        t1 = $[2];
      }
      return t1;
    } else {
      let t0;
      if ($[3] !== posts || $[4] !== props) {
        let t1;
        if ($[6] !== props) {
          t1 = (p, idx) => /* @__PURE__ */ jsx(PostContent, {
            showTitle: true,
            showDate: true,
            ...props,
            post: p
          }, idx);
          $[6] = props;
          $[7] = t1;
        } else {
          t1 = $[7];
        }
        t0 = posts.map(t1);
        $[3] = posts;
        $[4] = props;
        $[5] = t0;
      } else {
        t0 = $[5];
      }
      return t0;
    }
  } else {
    return null;
  }
};
const Page$2 = (props) => {
  const {
    onLoad,
    pages
  } = props;
  if (pages) {
    return pages.map((page, idx) => {
      return /* @__PURE__ */ jsx(React__default.Fragment, {
        children: /* @__PURE__ */ jsx(PostContent, {
          post: page,
          ...props
        })
      }, idx);
    });
  } else {
    return null;
  }
};
const mapStateToProps$4 = (state, ownProps) => {
  return {};
};
const mapActionCreators$4 = {};
const Page$3 = connect_default(mapStateToProps$4, mapActionCreators$4)(Page$2);
const LOAD_MENU = "LOAD_WP_MENU";
const LOAD_MENU_DONE = "LOAD_WP_MENU_DONE";
const LOAD_MENU_ERROR = "LOAD_WP_MENU_ERROR";
const LOAD_TAXONOMY = "LOAD_WP_TAXONOMY";
const LOAD_TAXONOMY_DONE = "LOAD_WP_TAXONOMY_DONE";
const LOAD_TAXONOMY_ERROR = "LOAD_WP_TAXONOMY_ERROR";
const LOAD_POSTS = "LOAD_WP_POSTS";
const LOAD_POSTS_DONE = "LOAD_WP_POSTS_DONE";
const LOAD_POSTS_ERROR = "LOAD_WP_POSTS_ERROR";
const LOAD_CUSTOM_POSTS_BY_TAXONOMY = "LOAD_CUSTOM_POSTS_BY_TAXONOMY";
const LOAD_CUSTOM_POSTS_BY_TAXONOMY_DONE = "LOAD_CUSTOM_POSTS_BY_TAXONOMY_DONE";
const LOAD_CUSTOM_POSTS_BY_TAXONOMY_ERROR = "LOAD_CUSTOM_POSTS_BY_TAXONOMY_ERROR";
const LOAD_POST = "LOAD_WP_POST";
const LOAD_POST_DONE = "LOAD_WP_POST_DONE";
const LOAD_POST_ERROR = "LOAD_WP_POST_ERROR";
const LOAD_PAGE = "LOAD_WP_PAGE";
const LOAD_PAGE_DONE = "LOAD_WP_PAGE_DONE";
const LOAD_PAGE_ERROR = "LOAD_WP_PAGE_ERROR";
const LOAD_PAGES = "LOAD_PAGES";
const LOAD_PAGES_DONE = "LOAD_PAGES_DONE";
const LOAD_PAGES_ERROR = "LOAD_PAGES_ERROR";
const LOAD_MEDIA = "LOAD_MEDIA";
const LOAD_MEDIA_DONE = "LOAD_MEDIA_DONE";
const LOAD_MEDIA_ERROR = "LOAD_MEDIA_ERROR";
const LOAD_CHILD_PAGES = "LOAD_CHILD_PAGES";
const LOAD_CHILD_PAGES_DONE = "LOAD_CHILD_PAGES_DONE";
const LOAD_CHILD_PAGES_ERROR = "LOAD_CHILD_PAGES_ERROR";
const CLEAN_PAGE_DATA = "CLEAN_PAGE_DATA";
const LOAD_SEARCH = "LOAD_SEARCH";
const LOAD_SEARCH_DONE = "LOAD_SEARCH_DONE";
const LOAD_SEARCH_ERROR = "LOAD_SEARCH_ERROR";
const LOAD_SETTINGS = "LOAD_SETTINGS";
const LOAD_SETTINGS_DONE = "LOAD_SETTINGS_DONE";
const LOAD_SETTINGS_ERROR = "LOAD_SETTINGS_ERROR";
var define_process_env_default$6 = { VITE_PROTOCOL: "https", VITE_DOMAIN: "et.tcdi.dgstg.org", VITE_REACT_APP_TITLE: "Tobacco Control Data Initiative", VITE_REACT_APP_WP_API: "https://et.tcdi.dgstg.org/wp/wp-json", VITE_REACT_APP_WP_STYLES: "https://et.tcdi.dgstg.org/wp/wp-admin/load-styles.php?c=1&dir=ltr&load%5Bchunk_0%5D=dashicons,admin-bar,buttons,media-views,editor-buttons,wp-components,wp-block-editor,wp-nux,wp-editor,wp-block-library,wp-block-&load%5Bchunk_1%5D=library-theme,wp-edit-blocks,wp-edit-post,wp-format-library,wp-block-directory,common,forms,admin-menu,dashboard,list-tables,edi&load%5Bchunk_2%5D=t,revisions,media,themes,about,nav-menus,wp-pointer,widgets,site-icon,l10n,wp-auth-check&ver=5.5.6' id='wp-block-library-css", VITE_REACT_APP_GA_CODE: "en", VITE_REACT_APP_DEFAULT_LOCALE: "en", VITE_REACT_APP_WP_HOSTS: "https://et.tcdi.dgstg.org", VITE_REACT_APP_USE_HASH_LINKS: "false", VITE_REACT_APP_THEME: "cash", VITE_REACT_APP_WP_SEARCH_END_POINT: "/dg/v1/search", VITE_REACT_APP_API_ROOT: "https://et.tcdi.dgstg.org" };
const API_ROOT$2 = define_process_env_default$6.VITE_REACT_APP_WP_API;
const URL_MENU = API_ROOT$2 + "/menus/v1/menus/";
const URL_API_BASE = API_ROOT$2 + "/wp/v2/";
const URL_PAGE = API_ROOT$2 + "/wp/v2/pages";
const URL_SEARCH = API_ROOT$2 + define_process_env_default$6.VITE_REACT_APP_WP_SEARCH_END_POINT;
const URL_MEDIA = API_ROOT$2 + "/wp/v2/media";
const URL_SETTINGS = API_ROOT$2 + "/dg/v1/settings";
const get$1 = function(url) {
  return new Promise((resolve, reject) => {
    fetch(url, {
      credentials: "include"
    }).then(function(response) {
      if (response.status !== 200) {
        reject(response);
      }
      response.json().then(function(data2) {
        const meta = {};
        response.headers.forEach((header, name) => {
          meta[name] = header;
        });
        resolve({
          data: data2,
          meta
        });
      });
    }).catch(function(err) {
      reject(err);
    });
  });
};
const getTaxonomy = (name, locale) => {
  return get$1(URL_API_BASE + "" + name + "?lang=" + locale + "&per_page=100");
};
const getSettings$1 = (locale, changeUUID) => {
  return get$1(URL_SETTINGS + "?cacheBust=" + (Math.random() + 1).toString(36).substring(7) + "&lang=" + locale + (changeUUID ? "&customize_changeset_uuid=" + changeUUID : ""));
};
const getMenu$1 = (name, locale) => {
  return get$1(URL_MENU + name + "?lang=" + locale);
};
const getPosts$1 = (slug2, type, taxonomy, categories, before, perPage, page, fields, locale, previewNonce, previewId, search2) => {
  let url = URL_API_BASE + (type ? type : "posts");
  if (previewId) {
    url += "/" + previewId + "/revisions" + (previewNonce ? "?_wpnonce=" + previewNonce + "&" : "");
  } else {
    url += "?";
  }
  url += "_embed=true&lang=" + locale + (slug2 ? "&slug=" + slug2 : "");
  if (!slug2) {
    url += (categories ? (taxonomy ? "&" + taxonomy : "&categories") + "=" + (categories ? categories : "") : "") + (before ? "&before=" + before.toISOString() : "") + (perPage ? "&per_page=" + perPage : "") + (page ? "&page=" + page : "") + (fields ? "&_fields=" + fields : "") + (search2 ? "&search=" + search2 : "");
  }
  return get$1(url);
};
const getPages$1 = (before, perPage, page, fields, parent, slug2, store2, locale, previewNonce, previewId, search2, noCache) => {
  let url = URL_PAGE;
  if (previewId) {
    url += "/" + previewId + "/revisions" + (previewNonce ? "?_wpnonce=" + previewNonce + "&" : "");
  } else {
    url += "?";
  }
  url += "lang=" + locale + (slug2 ? "&slug=" + slug2 : "");
  if (!slug2) {
    url += (before ? "&before=" + before.toISOString() : "") + (perPage ? "&per_page=" + perPage : "") + (page ? "&page=" + page : "") + (fields ? "&_fields=" + fields : "") + (parent ? "&parent=" + parent : "") + (search2 ? "&search=" + search2 : "");
  }
  return get$1(url);
};
const search$1 = (context, page, perPage, search2, type, subtype, locale) => {
  let url = URL_SEARCH + "?lang=" + locale + (context ? "&context=" + context : "") + (perPage ? "&per_page=" + perPage : "") + (page ? "&page=" + page : "") + (search2 ? "&search=" + search2 : "") + (type ? "&type=" + type : "") + (subtype ? "&subtype=" + subtype : "");
  return get$1(url);
};
const getMedia$1 = (slug2, locale) => {
  return get$1(URL_MEDIA + "/" + slug2 + "?lang=" + locale);
};
const loadTaxonomy = (_ref) => {
  let {
    taxonomy,
    locale = "en"
  } = _ref;
  return (dispatch, getState) => {
    dispatch({
      type: LOAD_TAXONOMY
    });
    getTaxonomy(taxonomy, locale).then((response) => {
      const {
        data: data2,
        meta
      } = response;
      dispatch({
        type: LOAD_TAXONOMY_DONE,
        data: data2,
        meta,
        taxonomy
      });
    }).catch((error) => {
      dispatch({
        type: LOAD_TAXONOMY_ERROR,
        taxonomy
      });
    });
  };
};
const getPosts = (_ref3) => {
  let {
    slug: slug2,
    type,
    taxonomy,
    categories,
    before,
    perPage,
    page,
    fields,
    store: store2,
    locale = "en",
    previewNonce,
    previewId,
    search: search2
  } = _ref3;
  return (dispatch, getState) => {
    dispatch({
      type: LOAD_POSTS,
      slug: slug2,
      taxonomy,
      categories,
      before,
      perPage,
      page,
      fields,
      store: store2,
      locale
    });
    getPosts$1(slug2, type, taxonomy, categories, before, perPage, page, fields, locale, previewNonce, previewId, search2).then((response) => {
      const {
        data: data2,
        meta
      } = response;
      dispatch({
        type: LOAD_POSTS_DONE,
        data: data2,
        slug: slug2,
        taxonomy,
        categories,
        before,
        perPage,
        page,
        fields,
        store: store2,
        locale,
        previewNonce,
        previewId
      });
    }).catch((error) => {
      dispatch({
        type: LOAD_POSTS_ERROR,
        error,
        slug: slug2,
        taxonomy,
        categories,
        before,
        perPage,
        page,
        fields,
        store: store2,
        locale,
        previewNonce,
        previewId
      });
    });
  };
};
const clean = (params) => (dispatch, getState) => {
  dispatch({
    type: CLEAN_PAGE_DATA,
    ...params
  });
};
const search = (_ref4) => {
  let {
    context,
    page,
    perPage,
    search: search2,
    type,
    subtype,
    store: store2,
    locale
  } = _ref4;
  return (dispatch, getState) => {
    dispatch({
      type: LOAD_SEARCH,
      store: store2
    });
    search$1(context, page, perPage, search2, type, subtype, locale).then((response) => {
      const {
        data: data2,
        meta
      } = response;
      dispatch({
        type: LOAD_SEARCH_DONE,
        store: store2,
        data: data2,
        meta
      });
    }).catch((error) => {
      dispatch({
        type: LOAD_SEARCH_ERROR,
        store: store2
      });
    });
  };
};
const getPages = (_ref5) => {
  let {
    before,
    perPage,
    page,
    fields,
    parent,
    slug: slug2,
    store: store2,
    locale = "en",
    previewNonce,
    previewId,
    search: search2
  } = _ref5;
  return (dispatch, getState) => {
    dispatch({
      type: LOAD_PAGES,
      store: store2
    });
    getPages$1(before, perPage, page, fields, parent, slug2, store2, locale, previewNonce, previewId, search2).then((response) => {
      const {
        data: data2,
        meta
      } = response;
      dispatch({
        type: LOAD_PAGES_DONE,
        data: data2,
        meta,
        before,
        perPage,
        page,
        fields,
        parent,
        slug: slug2,
        store: store2,
        locale,
        previewNonce,
        previewId
      });
    }).catch((error) => {
      dispatch({
        type: LOAD_PAGES_ERROR,
        error,
        before,
        perPage,
        page,
        fields,
        parent,
        slug: slug2,
        store: store2,
        locale,
        previewNonce,
        previewId
      });
    });
  };
};
const getMenu = (_ref6) => {
  let {
    slug: slug2,
    locale = "en"
  } = _ref6;
  return (dispatch, getState) => {
    dispatch({
      type: LOAD_MENU,
      slug: slug2
    });
    getMenu$1(slug2, locale).then((response) => {
      const {
        data: data2,
        meta
      } = response;
      dispatch({
        type: LOAD_MENU_DONE,
        slug: slug2,
        data: data2,
        meta
      });
    }).catch((error) => {
      dispatch({
        type: LOAD_MENU_ERROR,
        slug: slug2,
        error
      });
    });
  };
};
const getSettings = (_ref7) => {
  let {
    locale = "en",
    changeUUID = null
  } = _ref7;
  return (dispatch, getState) => {
    dispatch({
      type: LOAD_SETTINGS
    });
    getSettings$1(locale, changeUUID).then((response) => {
      const {
        data: data2,
        meta
      } = response;
      dispatch({
        type: LOAD_SETTINGS_DONE,
        data: data2,
        meta
      });
    }).catch((error) => {
      dispatch({
        type: LOAD_SETTINGS_ERROR,
        error
      });
    });
  };
};
const getMedia = (_ref8) => {
  let {
    id,
    locale = "en"
  } = _ref8;
  return (dispatch, getState) => {
    dispatch({
      type: LOAD_MEDIA,
      id
    });
    getMedia$1(id, locale).then((response) => {
      const {
        data: data2,
        meta
      } = response;
      dispatch({
        type: LOAD_MEDIA_DONE,
        data: data2,
        meta,
        id
      });
    }).catch((error) => {
      dispatch({
        type: LOAD_MEDIA_ERROR,
        error,
        id
      });
    });
  };
};
const LocalizedProvider = (CustomProvider) => (props) => /* @__PURE__ */ jsx(AppContext.Consumer, {
  children: (_ref) => {
    let {
      locale
    } = _ref;
    return /* @__PURE__ */ jsx(CustomProvider, {
      locale,
      ...props
    });
  }
});
class TaxonomyProvider extends React__default.Component {
  componentDidMount() {
    const {
      taxonomy,
      locale
    } = this.props;
    if (this.props.taxonomies.length == 0) {
      this.props.onLoad({
        taxonomy: taxonomy ? taxonomy : "categories",
        locale
      });
    }
  }
  render() {
    const {
      taxonomies,
      locale
    } = this.props;
    if (taxonomies) {
      return /* @__PURE__ */ jsx(TaxonomyContext.Provider, {
        value: {
          taxonomies,
          locale
        },
        children: this.props.children
      });
    } else {
      return /* @__PURE__ */ jsx("h3", {
        children: "Loading"
      });
    }
  }
}
const mapStateToProps$3 = (state, ownProps) => {
  return {
    taxonomies: state.getIn(["wordpress", ownProps.taxonomy ? ownProps : "categories", "items"]) ? state.getIn(["wordpress", ownProps.taxonomy ? ownProps : "categories", "items"]).toJS() : [],
    loading: state.getIn(["wordpress", ownProps.taxonomy ? ownProps : "categories", "loading"])
  };
};
const mapActionCreators$3 = {
  onLoad: loadTaxonomy
};
const TaxonomyProvider$1 = connect_default(mapStateToProps$3, mapActionCreators$3)(LocalizedProvider(TaxonomyProvider));
const TaxonomyConsumer = (props) => {
  const $ = c(2);
  let t0;
  if ($[0] !== props.children) {
    t0 = /* @__PURE__ */ jsx(TaxonomyContext.Consumer, {
      children: (t1) => {
        const {
          taxonomies,
          locale
        } = t1;
        return taxonomies && /* @__PURE__ */ jsx(React__default.Fragment, {
          children: React__default.Children.map(props.children, (child) => /* @__PURE__ */ React__default.cloneElement(child, {
            taxonomies,
            locale
          }))
        });
      }
    });
    $[0] = props.children;
    $[1] = t0;
  } else {
    t0 = $[1];
  }
  return t0;
};
const PostConsumer = (props) => {
  const $ = c(2);
  let t0;
  if ($[0] !== props.children) {
    t0 = /* @__PURE__ */ jsx(PostContext.Consumer, {
      children: (t1) => {
        const {
          posts,
          meta,
          locale
        } = t1;
        return posts && /* @__PURE__ */ jsx(React__default.Fragment, {
          children: React__default.Children.map(props.children, (child) => /* @__PURE__ */ React__default.cloneElement(child, {
            posts,
            meta,
            locale
          }))
        });
      }
    });
    $[0] = props.children;
    $[1] = t0;
  } else {
    t0 = $[1];
  }
  return t0;
};
const CategoryDetail = (t0) => {
  const $ = c(7);
  const {
    taxonomies,
    slug: slug2
  } = t0;
  let t1;
  if ($[0] !== slug2 || $[1] !== taxonomies) {
    t1 = taxonomies ? taxonomies.filter((t) => t.slug == slug2)[0] : null;
    $[0] = slug2;
    $[1] = taxonomies;
    $[2] = t1;
  } else {
    t1 = $[2];
  }
  const category2 = t1;
  let t2;
  if ($[3] !== category2) {
    t2 = category2 && /* @__PURE__ */ jsxs(Container, {
      children: [/* @__PURE__ */ jsx("h1", {
        children: category2.name
      }), /* @__PURE__ */ jsx(Container, {
        className: "has-medium-font-size",
        color: "green",
        children: category2.description
      }), /* @__PURE__ */ jsx("h2", {
        children: "Pots"
      }), /* @__PURE__ */ jsx(PostProvider$2, {
        fields: ["title", "date", "link", "excerpt"],
        store: "posts",
        page: 1,
        perPage: 10,
        categories: [category2.id],
        children: /* @__PURE__ */ jsx("ul", {
          className: "wp post list",
          children: /* @__PURE__ */ jsx(PostConsumer, {
            children: /* @__PURE__ */ jsx(Wrapper, {
              as: "li",
              visibility: {
                title: true,
                excerpt: true,
                link: true,
                content: true
              }
            })
          })
        })
      })]
    });
    $[3] = category2;
    $[4] = t2;
  } else {
    t2 = $[4];
  }
  let t3;
  if ($[5] !== t2) {
    t3 = /* @__PURE__ */ jsx(React__default.Fragment, {
      children: t2
    });
    $[5] = t2;
    $[6] = t3;
  } else {
    t3 = $[6];
  }
  return t3;
};
const Category = (props) => {
  const $ = c(2);
  let t0;
  if ($[0] !== props.match.params.slug) {
    t0 = /* @__PURE__ */ jsx("div", {
      children: /* @__PURE__ */ jsx(TaxonomyProvider$1, {
        children: /* @__PURE__ */ jsx(TaxonomyConsumer, {
          children: /* @__PURE__ */ jsx(CategoryDetail, {
            slug: props.match.params.slug
          })
        })
      })
    });
    $[0] = props.match.params.slug;
    $[1] = t0;
  } else {
    t0 = $[1];
  }
  return t0;
};
const PostProvider$1 = (props) => {
  const $ = c(41);
  const {
    type: t0,
    taxonomy,
    categories,
    before,
    perPage,
    page,
    fields,
    slug: slug2,
    store: t1,
    locale,
    previewNonce,
    previewId,
    search: search2,
    children
  } = props;
  const type = t0 === void 0 ? "posts" : t0;
  const store2 = t1 === void 0 ? "posts" : t1;
  const dispatch = useDispatch();
  let t2;
  if ($[0] !== store2) {
    t2 = (state) => state.getIn(["wordpress", store2, "meta"]);
    $[0] = store2;
    $[1] = t2;
  } else {
    t2 = $[1];
  }
  const meta = useSelector(t2);
  let t3;
  if ($[2] !== store2) {
    t3 = (state_0) => state_0.getIn(["wordpress", store2, "items"]);
    $[2] = store2;
    $[3] = t3;
  } else {
    t3 = $[3];
  }
  const posts = useSelector(t3);
  let t4;
  if ($[4] !== store2) {
    t4 = (state_1) => state_1.getIn(["wordpress", store2, "error"]);
    $[4] = store2;
    $[5] = t4;
  } else {
    t4 = $[5];
  }
  const error = useSelector(t4);
  let t5;
  if ($[6] !== store2) {
    t5 = (state_2) => state_2.getIn(["wordpress", store2, "loading"]);
    $[6] = store2;
    $[7] = t5;
  } else {
    t5 = $[7];
  }
  const loading = useSelector(t5);
  let t6;
  if ($[8] !== before || $[9] !== categories || $[10] !== dispatch || $[11] !== fields || $[12] !== locale || $[13] !== page || $[14] !== perPage || $[15] !== previewId || $[16] !== previewNonce || $[17] !== search2 || $[18] !== slug2 || $[19] !== store2 || $[20] !== taxonomy || $[21] !== type) {
    t6 = () => {
      dispatch(getPosts({
        slug: slug2,
        type,
        taxonomy,
        categories,
        before,
        perPage,
        page,
        fields,
        store: store2,
        locale,
        previewNonce,
        previewId,
        search: search2
      }));
    };
    $[8] = before;
    $[9] = categories;
    $[10] = dispatch;
    $[11] = fields;
    $[12] = locale;
    $[13] = page;
    $[14] = perPage;
    $[15] = previewId;
    $[16] = previewNonce;
    $[17] = search2;
    $[18] = slug2;
    $[19] = store2;
    $[20] = taxonomy;
    $[21] = type;
    $[22] = t6;
  } else {
    t6 = $[22];
  }
  let t7;
  if ($[23] !== categories || $[24] !== locale || $[25] !== page || $[26] !== perPage || $[27] !== search2 || $[28] !== slug2 || $[29] !== taxonomy) {
    t7 = [categories, locale, slug2, taxonomy, page, perPage, search2];
    $[23] = categories;
    $[24] = locale;
    $[25] = page;
    $[26] = perPage;
    $[27] = search2;
    $[28] = slug2;
    $[29] = taxonomy;
    $[30] = t7;
  } else {
    t7 = $[30];
  }
  useEffect(t6, t7);
  if (posts && posts.length > 0) {
    let t8;
    if ($[31] !== locale || $[32] !== meta || $[33] !== posts) {
      t8 = {
        posts,
        locale,
        meta
      };
      $[31] = locale;
      $[32] = meta;
      $[33] = posts;
      $[34] = t8;
    } else {
      t8 = $[34];
    }
    let t9;
    if ($[35] !== children || $[36] !== t8) {
      t9 = /* @__PURE__ */ jsx(PostContext.Provider, {
        value: t8,
        children
      });
      $[35] = children;
      $[36] = t8;
      $[37] = t9;
    } else {
      t9 = $[37];
    }
    return t9;
  } else {
    if (error) {
      let t8;
      if ($[38] === Symbol.for("react.memo_cache_sentinel")) {
        t8 = /* @__PURE__ */ jsxs(Segment, {
          color: "red",
          children: [/* @__PURE__ */ jsx("h1", {
            children: "500"
          }), /* @__PURE__ */ jsx("p", {
            children: "The service is not available please try again in a few minutes"
          })]
        });
        $[38] = t8;
      } else {
        t8 = $[38];
      }
      return t8;
    } else {
      if (loading) {
        let t8;
        if ($[39] === Symbol.for("react.memo_cache_sentinel")) {
          t8 = /* @__PURE__ */ jsx(Container, {
            children: /* @__PURE__ */ jsx(Loader, {
              children: "Loading"
            })
          });
          $[39] = t8;
        } else {
          t8 = $[39];
        }
        return t8;
      } else {
        let t8;
        if ($[40] === Symbol.for("react.memo_cache_sentinel")) {
          t8 = /* @__PURE__ */ jsx(Container, {
            children: /* @__PURE__ */ jsx(Segment, {
              color: "red",
              children: /* @__PURE__ */ jsx("p", {
                children: "No entries found"
              })
            })
          });
          $[40] = t8;
        } else {
          t8 = $[40];
        }
        return t8;
      }
    }
  }
};
const PostProvider$2 = LocalizedProvider(PostProvider$1);
const PageProvider = (props) => {
  const $ = c(40);
  const {
    before,
    perPage,
    page,
    fields,
    parent,
    slug: slug2,
    store: t0,
    locale,
    previewNonce,
    previewId,
    search: search2,
    noCache,
    children,
    fallbackComponent
  } = props;
  const store2 = t0 === void 0 ? "pages" : t0;
  const dispatch = useDispatch();
  let t1;
  if ($[0] !== store2) {
    t1 = (state) => state.getIn(["wordpress", store2, "error"]);
    $[0] = store2;
    $[1] = t1;
  } else {
    t1 = $[1];
  }
  const error = useSelector(t1);
  let t2;
  if ($[2] !== store2) {
    t2 = (state_0) => state_0.getIn(["wordpress", store2, "meta"]);
    $[2] = store2;
    $[3] = t2;
  } else {
    t2 = $[3];
  }
  const meta = useSelector(t2);
  let t3;
  if ($[4] !== store2) {
    t3 = (state_1) => state_1.getIn(["wordpress", store2, "items"]);
    $[4] = store2;
    $[5] = t3;
  } else {
    t3 = $[5];
  }
  const pages = useSelector(t3);
  let t4;
  if ($[6] !== store2) {
    t4 = (state_2) => state_2.getIn(["wordpress", store2, "loading"]);
    $[6] = store2;
    $[7] = t4;
  } else {
    t4 = $[7];
  }
  const loading = useSelector(t4);
  let t5;
  if ($[8] !== before || $[9] !== dispatch || $[10] !== fields || $[11] !== locale || $[12] !== noCache || $[13] !== page || $[14] !== parent || $[15] !== perPage || $[16] !== previewId || $[17] !== previewNonce || $[18] !== search2 || $[19] !== slug2 || $[20] !== store2) {
    t5 = () => {
      dispatch(getPages({
        before,
        perPage,
        page,
        fields,
        parent,
        slug: slug2,
        store: store2,
        locale,
        previewNonce,
        previewId,
        search: search2,
        noCache
      }));
      return () => {
        dispatch(clean({
          store: store2
        }));
      };
    };
    $[8] = before;
    $[9] = dispatch;
    $[10] = fields;
    $[11] = locale;
    $[12] = noCache;
    $[13] = page;
    $[14] = parent;
    $[15] = perPage;
    $[16] = previewId;
    $[17] = previewNonce;
    $[18] = search2;
    $[19] = slug2;
    $[20] = store2;
    $[21] = t5;
  } else {
    t5 = $[21];
  }
  let t6;
  if ($[22] !== locale || $[23] !== parent || $[24] !== previewId || $[25] !== search2 || $[26] !== slug2) {
    t6 = [parent, slug2, locale, previewId, search2];
    $[22] = locale;
    $[23] = parent;
    $[24] = previewId;
    $[25] = search2;
    $[26] = slug2;
    $[27] = t6;
  } else {
    t6 = $[27];
  }
  useEffect(t5, t6);
  if (pages && pages.length > 0) {
    let t7;
    if ($[28] !== locale || $[29] !== meta || $[30] !== pages) {
      t7 = {
        pages,
        meta,
        locale
      };
      $[28] = locale;
      $[29] = meta;
      $[30] = pages;
      $[31] = t7;
    } else {
      t7 = $[31];
    }
    let t8;
    if ($[32] !== children || $[33] !== t7) {
      t8 = /* @__PURE__ */ jsx(PageContext.Provider, {
        value: t7,
        children
      });
      $[32] = children;
      $[33] = t7;
      $[34] = t8;
    } else {
      t8 = $[34];
    }
    return t8;
  } else {
    if (error) {
      let t7;
      if ($[35] === Symbol.for("react.memo_cache_sentinel")) {
        t7 = /* @__PURE__ */ jsxs(Segment, {
          color: "red",
          children: [/* @__PURE__ */ jsx("h1", {
            children: "500"
          }), /* @__PURE__ */ jsx("p", {
            children: "The service is not available please try again in a few minutes"
          })]
        });
        $[35] = t7;
      } else {
        t7 = $[35];
      }
      return t7;
    } else {
      if (loading) {
        let t7;
        if ($[36] === Symbol.for("react.memo_cache_sentinel")) {
          t7 = /* @__PURE__ */ jsx(Container, {
            children: /* @__PURE__ */ jsx(Loader, {
              inverted: true,
              content: "Loading"
            })
          });
          $[36] = t7;
        } else {
          t7 = $[36];
        }
        return t7;
      } else {
        if (loading === false) {
          if (fallbackComponent) {
            let t7;
            if ($[37] !== fallbackComponent) {
              t7 = /* @__PURE__ */ jsx(Fragment, {
                children: fallbackComponent
              });
              $[37] = fallbackComponent;
              $[38] = t7;
            } else {
              t7 = $[38];
            }
            return t7;
          } else {
            let t7;
            if ($[39] === Symbol.for("react.memo_cache_sentinel")) {
              t7 = /* @__PURE__ */ jsx(Container, {
                children: /* @__PURE__ */ jsxs(Segment, {
                  color: "red",
                  children: [/* @__PURE__ */ jsx("h1", {
                    children: "404"
                  }), /* @__PURE__ */ jsx("p", {
                    children: "Can't find this page"
                  })]
                })
              });
              $[39] = t7;
            } else {
              t7 = $[39];
            }
            return t7;
          }
        }
      }
    }
  }
  return null;
};
const PageProvider$1 = LocalizedProvider(PageProvider);
const MediaContext = /* @__PURE__ */ React__default.createContext();
class MediaProvider extends React__default.Component {
  componentDidMount() {
    const {
      onLoad,
      loading,
      id,
      locale
    } = this.props;
    if (id) {
      this.props.onLoad({
        id,
        locale
      });
    }
  }
  componentDidUpdate(prevState) {
    const {
      onLoad,
      loading,
      id,
      locale
    } = this.props;
    if (id != prevState.id) {
      this.props.onLoad({
        id,
        locale
      });
    }
  }
  render() {
    const {
      media,
      id,
      locale
    } = this.props;
    return /* @__PURE__ */ jsx(MediaContext.Provider, {
      value: {
        media,
        locale
      },
      children: this.props.children
    });
  }
}
const mapStateToProps$2 = (state, ownProps) => {
  const id = ownProps.id;
  return {
    error: state.getIn(["wordpress", "media", id, "error"]),
    media: state.getIn(["wordpress", "media", id, "content"]) ? state.getIn(["wordpress", "media", id, "content"]) : null,
    loading: state.getIn(["wordpress", "media", id, "loading"])
  };
};
const mapActionCreators$2 = {
  onLoad: getMedia
};
const MediaProvider$1 = connect_default(mapStateToProps$2, mapActionCreators$2)(LocalizedProvider(MediaProvider));
class MenuProvider extends React__default.Component {
  componentDidMount() {
    const {
      onLoad,
      loading,
      slug: slug2,
      locale
    } = this.props;
    if (slug2) {
      this.props.onLoad({
        slug: slug2,
        locale
      });
    }
  }
  componentDidUpdate(prevProps) {
    const {
      slug: slug2
    } = this.props;
    const {
      onLoad,
      loading,
      locale
    } = this.props;
    if (prevProps.slug != this.props.slug) {
      this.props.onLoad({
        slug: slug2,
        locale
      });
    }
  }
  render() {
    const {
      menu,
      locale
    } = this.props;
    return /* @__PURE__ */ jsx(MenuContext.Provider, {
      value: {
        menu,
        locale
      },
      children: this.props.children
    });
  }
}
const mapStateToProps$1 = (state, ownProps) => {
  const slug2 = ownProps.slug;
  return {
    error: state.getIn(["wordpress", "menu", slug2, "error"]),
    menu: state.getIn(["wordpress", "menu", slug2, "menu"]),
    loading: state.getIn(["wordpress", "menu", slug2, "loading"])
  };
};
const mapActionCreators$1 = {
  onLoad: getMenu
};
const MenuProvider$1 = connect_default(mapStateToProps$1, mapActionCreators$1)(LocalizedProvider(MenuProvider));
const AppContextProvider = (t0) => {
  const $ = c(10);
  const {
    locale,
    store: store2,
    getComponent,
    children
  } = t0;
  let t1;
  if ($[0] !== getComponent || $[1] !== locale || $[2] !== store2) {
    t1 = {
      store: store2,
      getComponent,
      locale
    };
    $[0] = getComponent;
    $[1] = locale;
    $[2] = store2;
    $[3] = t1;
  } else {
    t1 = $[3];
  }
  let t2;
  if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
    t2 = /* @__PURE__ */ jsx(Dimmer, {
      active: true,
      children: /* @__PURE__ */ jsx(Loader, {
        children: "Loading"
      })
    });
    $[4] = t2;
  } else {
    t2 = $[4];
  }
  let t3;
  if ($[5] !== children) {
    t3 = /* @__PURE__ */ jsx(Suspense, {
      fallback: t2,
      children
    });
    $[5] = children;
    $[6] = t3;
  } else {
    t3 = $[6];
  }
  let t4;
  if ($[7] !== t1 || $[8] !== t3) {
    t4 = /* @__PURE__ */ jsx(AppContext.Provider, {
      value: t1,
      children: t3
    });
    $[7] = t1;
    $[8] = t3;
    $[9] = t4;
  } else {
    t4 = $[9];
  }
  return t4;
};
const SettingProvider = (props) => {
  const $ = c(12);
  const {
    children,
    locale,
    changeUUID
  } = props;
  const dispatch = useDispatch();
  useSelector(_temp);
  const data2 = useSelector(_temp2);
  useSelector(_temp3);
  let t0;
  if ($[0] !== changeUUID || $[1] !== dispatch || $[2] !== locale) {
    t0 = () => {
      dispatch(getSettings({
        locale,
        changeUUID
      }));
      return _temp4;
    };
    $[0] = changeUUID;
    $[1] = dispatch;
    $[2] = locale;
    $[3] = t0;
  } else {
    t0 = $[3];
  }
  let t1;
  if ($[4] !== changeUUID || $[5] !== locale) {
    t1 = [locale, changeUUID];
    $[4] = changeUUID;
    $[5] = locale;
    $[6] = t1;
  } else {
    t1 = $[6];
  }
  useLayoutEffect(t0, t1);
  let t2;
  if ($[7] !== data2) {
    t2 = {
      data: data2
    };
    $[7] = data2;
    $[8] = t2;
  } else {
    t2 = $[8];
  }
  let t3;
  if ($[9] !== children || $[10] !== t2) {
    t3 = /* @__PURE__ */ jsx(SettingsContext.Provider, {
      value: t2,
      children
    });
    $[9] = children;
    $[10] = t2;
    $[11] = t3;
  } else {
    t3 = $[11];
  }
  return t3;
};
function _temp(state) {
  return state.getIn(["wordpress", "settings", "error"]);
}
function _temp2(state_0) {
  return state_0.getIn(["wordpress", "settings", "data"]);
}
function _temp3(state_1) {
  return state_1.getIn(["wordpress", "settings", "loading"]);
}
function _temp4() {
}
const PageConsumer$1 = (props) => {
  const $ = c(2);
  let t0;
  if ($[0] !== props.children) {
    t0 = /* @__PURE__ */ jsx(React__default.Fragment, {
      children: /* @__PURE__ */ jsx(PageContext.Consumer, {
        children: (t1) => {
          const {
            pages,
            meta,
            locale
          } = t1;
          return pages && /* @__PURE__ */ jsx(React__default.Fragment, {
            children: React__default.Children.map(props.children, (child) => /* @__PURE__ */ React__default.cloneElement(child, {
              pages,
              meta,
              locale
            }))
          });
        }
      })
    });
    $[0] = props.children;
    $[1] = t0;
  } else {
    t0 = $[1];
  }
  return t0;
};
const MediaConsumer = (props) => {
  const $ = c(2);
  let t0;
  if ($[0] !== props.children) {
    t0 = /* @__PURE__ */ jsx(MediaContext.Consumer, {
      children: (t1) => {
        const {
          media,
          locale
        } = t1;
        return media && /* @__PURE__ */ jsx(React__default.Fragment, {
          children: React__default.Children.map(props.children, (child) => /* @__PURE__ */ React__default.cloneElement(child, {
            media,
            locale
          }))
        });
      }
    });
    $[0] = props.children;
    $[1] = t0;
  } else {
    t0 = $[1];
  }
  return t0;
};
const PageConsumer = (props) => {
  const $ = c(2);
  let t0;
  if ($[0] !== props) {
    t0 = /* @__PURE__ */ jsx(React__default.Fragment, {
      children: /* @__PURE__ */ jsx(MenuContext.Consumer, {
        children: (t1) => {
          const {
            menu,
            locale
          } = t1;
          return menu && /* @__PURE__ */ jsx(React__default.Fragment, {
            children: React__default.Children.map(props.children, (child) => /* @__PURE__ */ React__default.cloneElement(child, {
              ...props,
              menu,
              locale
            }))
          });
        }
      })
    });
    $[0] = props;
    $[1] = t0;
  } else {
    t0 = $[1];
  }
  return t0;
};
const SettingsConsumer = (props) => {
  const $ = c(2);
  let t0;
  if ($[0] !== props.children) {
    t0 = /* @__PURE__ */ jsx(React__default.Fragment, {
      children: /* @__PURE__ */ jsx(SettingsContext.Consumer, {
        children: (t1) => {
          const {
            data: data2
          } = t1;
          return data2 && /* @__PURE__ */ jsx(React__default.Fragment, {
            children: React__default.Children.map(props.children, (child) => /* @__PURE__ */ React__default.cloneElement(child, {
              settings: data2
            }))
          });
        }
      })
    });
    $[0] = props.children;
    $[1] = t0;
  } else {
    t0 = $[1];
  }
  return t0;
};
const SearchConsumer = (props) => {
  const $ = c(2);
  let t0;
  if ($[0] !== props.children) {
    t0 = /* @__PURE__ */ jsx(SearchContext.Consumer, {
      children: (t1) => {
        const {
          results,
          meta,
          locale
        } = t1;
        return /* @__PURE__ */ jsx(React__default.Fragment, {
          children: React__default.Children.map(props.children, (child) => /* @__PURE__ */ React__default.cloneElement(child, {
            results,
            meta,
            locale
          }))
        });
      }
    });
    $[0] = props.children;
    $[1] = t0;
  } else {
    t0 = $[1];
  }
  return t0;
};
class PostProvider extends React__default.Component {
  componentDidMount() {
    const {
      context,
      page,
      perPage,
      search: search2,
      type,
      subtype,
      locale,
      store: store2 = "results"
    } = this.props;
    if (search2 && search2 !== "") {
      this.props.onSearch({
        context,
        page,
        perPage,
        search: search2,
        type,
        subtype,
        locale,
        store: store2
      });
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    const {
      context,
      page,
      perPage,
      search: search2,
      type,
      subtype,
      locale,
      store: store2 = "results"
    } = this.props;
    if (page != prevProps.page || search2 != prevProps.search || context != prevProps.context || type != prevProps.type || type != prevProps.subtype) {
      if (search2 && search2 !== "") {
        this.props.onSearch({
          context,
          page,
          perPage,
          search: search2,
          type,
          subtype,
          locale,
          store: store2
        });
      }
    }
  }
  render() {
    const {
      results,
      loading,
      error,
      meta,
      locale
    } = this.props;
    return /* @__PURE__ */ jsx(SearchContext.Provider, {
      value: {
        results,
        meta,
        locale
      },
      children: this.props.children
    });
  }
}
const mapStateToProps = (state, ownProps) => {
  const {
    store: store2 = "results"
  } = ownProps;
  return {
    results: state.getIn(["wordpress", store2, "items"]),
    meta: state.getIn(["wordpress", store2, "meta"]),
    error: state.getIn(["wordpress", store2, "error"]),
    loading: state.getIn(["wordpress", store2, "loading"])
  };
};
const mapActionCreators = {
  onSearch: search
};
const SearchProvider = connect_default(mapStateToProps, mapActionCreators)(LocalizedProvider(PostProvider));
const initialState$4 = Immutable__default.Map();
const wordpress = function() {
  let state = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : initialState$4;
  let action = arguments.length > 1 ? arguments[1] : void 0;
  switch (action.type) {
    case LOAD_SETTINGS: {
      return state.setIn(["settings", "loading"], true);
    }
    case LOAD_SETTINGS_DONE: {
      const {
        data: data2,
        meta
      } = action;
      return state.setIn(["settings", "loading"], false).deleteIn(["settings", "error"]).setIn(["settings", "meta"], meta).setIn(["settings", "data"], data2);
    }
    case LOAD_SETTINGS_ERROR: {
      return state.setIn(["settings", "loading"], false).setIn(["settings", "error"], action.error);
    }
    case LOAD_MENU: {
      return state.setIn(["menu", "loading"], true);
    }
    case LOAD_MENU_DONE: {
      const {
        data: data2,
        slug: slug2,
        meta
      } = action;
      return state.setIn(["menu", slug2, "loading"], false).deleteIn(["menu", slug2, "error"]).setIn(["menu", slug2, "meta"], meta).setIn(["menu", slug2, "menu"], data2);
    }
    case LOAD_MENU_ERROR: {
      const {
        data: data2,
        slug: slug2
      } = action;
      return state.setIn(["menu", slug2, "loading"], false).setIn(["menu", slug2, "error"], action.error);
    }
    case LOAD_TAXONOMY: {
      return state.setIn(["categories", "loading"], true);
    }
    case LOAD_TAXONOMY_DONE: {
      const {
        data: data2,
        name
      } = action;
      return state.setIn([name, "loading"], false).deleteIn([name, "error"]).setIn([name, "items"], Immutable__default.fromJS(data2));
    }
    case LOAD_TAXONOMY_ERROR: {
      return state.setIn(["categories", "loading"], false).setIn(["categories", "error"], action.error);
    }
    case LOAD_POSTS: {
      const {
        data: data2,
        store: store2
      } = action;
      return state.setIn([store2, "loading"], true);
    }
    case LOAD_POSTS_DONE: {
      const {
        data: data2,
        meta,
        store: store2
      } = action;
      return state.setIn([store2, "loading"], false).deleteIn([store2, "error"]).setIn([store2, "meta"], meta).setIn([store2, "items"], data2);
    }
    case LOAD_POSTS_ERROR: {
      const {
        store: store2
      } = action;
      return state.setIn([store2, "loading"], false).setIn([store2, "error"], action.error);
    }
    case LOAD_CUSTOM_POSTS_BY_TAXONOMY: {
      const {
        wpType,
        taxonomy,
        category: category2
      } = action;
      return state.setIn([wpType, taxonomy, category2, "loading"], true);
    }
    case LOAD_CUSTOM_POSTS_BY_TAXONOMY_DONE: {
      const {
        data: data2,
        wpType,
        taxonomy,
        category: category2,
        meta
      } = action;
      return state.setIn([wpType, taxonomy, category2, "loading"], false).deleteIn([wpType, taxonomy, category2, "error"]).setIn([wpType, taxonomy, category2, "meta"], meta).setIn([wpType, taxonomy, category2, "items"], data2);
    }
    case LOAD_CUSTOM_POSTS_BY_TAXONOMY_ERROR: {
      const {
        wpType,
        taxonomy,
        category: category2
      } = action;
      return state.setIn([wpType, taxonomy, category2, "loading"], false).setIn([wpType, taxonomy, category2, "error"], action.error);
    }
    case LOAD_POST: {
      const {
        slug: slug2,
        category: category2
      } = action;
      const path = ["post"];
      if (category2) {
        path.push(category2);
      }
      return state.setIn([...path, slug2, "loading"], true);
    }
    case LOAD_POST_DONE: {
      const {
        slug: slug2,
        category: category2,
        data: data2
      } = action;
      const path = ["post"];
      if (category2) {
        path.push(category2);
      }
      return state.setIn([...path, slug2, "loading"], false).deleteIn([...path, slug2, "error"]).setIn([...path, slug2, "content"], data2);
    }
    case LOAD_POST_ERROR: {
      const {
        slug: slug2,
        category: category2
      } = action;
      const path = ["post"];
      if (category2) {
        path.push(category2);
      }
      return state.setIn([...path, slug2, "loading"], false).setIn([...path, slug2, "error"], action.error);
    }
    case LOAD_PAGE: {
      const {
        slug: slug2
      } = action;
      return state.setIn(["page", slug2, "loading"], true);
    }
    case LOAD_PAGE_DONE: {
      const {
        data: data2,
        slug: slug2
      } = action;
      return state.setIn(["page", slug2, "loading"], false).deleteIn(["page", slug2, "error"]).setIn(["page", slug2, "content"], data2);
    }
    case LOAD_PAGE_ERROR: {
      const {
        slug: slug2
      } = action;
      return state.setIn(["page", slug2, "loading"], false).setIn(["page", slug2, "error"], action.error);
    }
    case LOAD_PAGES: {
      const {
        store: store2
      } = action;
      return state.setIn([store2, "loading"], true);
    }
    case LOAD_PAGES_DONE: {
      const {
        data: data2,
        store: store2,
        meta
      } = action;
      return state.setIn([store2, "loading"], false).deleteIn([store2, "error"]).setIn([store2, "meta"], meta).setIn([store2, "items"], data2);
    }
    case LOAD_PAGES_ERROR: {
      const {
        store: store2
      } = action;
      return state.setIn([store2, "loading"], false).setIn([store2, "error"], action.error);
    }
    case LOAD_SEARCH: {
      const {
        store: store2
      } = action;
      return state.setIn([store2, "loading"], true);
    }
    case LOAD_SEARCH_DONE: {
      const {
        data: data2,
        store: store2,
        meta
      } = action;
      return state.setIn([store2, "loading"], false).deleteIn([store2, "error"]).setIn([store2, "meta"], meta).setIn([store2, "items"], data2);
    }
    case LOAD_SEARCH_ERROR: {
      const {
        store: store2
      } = action;
      return state.setIn([store2, "loading"], false).setIn([store2, "error"], action.error);
    }
    case CLEAN_PAGE_DATA: {
      const {
        data: data2,
        store: store2
      } = action;
      return state.setIn([store2, "loading"], true).deleteIn([store2, "error"]).deleteIn([store2, "items"]);
    }
    case LOAD_MEDIA: {
      const {
        id
      } = action;
      return state.setIn(["media", id, "loading"], true);
    }
    case LOAD_MEDIA_DONE: {
      const {
        data: data2,
        id
      } = action;
      return state.setIn(["media", id, "loading"], false).deleteIn(["media", id, "error"]).setIn(["media", id, "content"], data2);
    }
    case LOAD_MEDIA_ERROR: {
      const {
        id
      } = action;
      return state.setIn(["media", id, "loading"], false).setIn(["media", id, "error"], action.error);
    }
    case LOAD_CHILD_PAGES: {
      const {
        parentId
      } = action;
      return state.setIn(["child", parentId, "loading"], true);
    }
    case LOAD_CHILD_PAGES_DONE: {
      const {
        data: data2,
        parentId
      } = action;
      return state.setIn(["children", parentId, "loading"], false).deleteIn(["children", parentId, "error"]).setIn(["children", parentId, "items"], data2);
    }
    case LOAD_CHILD_PAGES_ERROR: {
      const {
        parentId
      } = action;
      return state.setIn(["children", parentId, "loading"], false).setIn(["children", parentId, "error"], action.error);
    }
    default:
      return state;
  }
};
const ScrollToTopOnMount = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    window.setTimeout(() => window.scrollTo(0, 0), 200);
  }, [pathname]);
  return null;
};
const settingMappings = {
  "blogname": "name",
  "custom_logo": "site_logo"
};
const CustomizerWrapper = (props) => {
  const [customization, setCustomization] = useState(props.settings);
  const ref = useRef({});
  const setValue = (event) => {
    const data2 = event.data;
    if (data2.messageType && data2.messageType === "partial-update") {
      const partialSettings = ref.current;
      if (settingMappings[data2.property]) {
        partialSettings[settingMappings[data2.property]] = data2.value;
      } else {
        if (data2.property.indexOf("menu") > -1) {
          if (!partialSettings["menu_settings"]) {
            partialSettings["menu_settings"] = {};
          }
          partialSettings["menu_settings"][data2.property] = data2.value;
        }
      }
      ref.current = partialSettings;
      setCustomization({ ...ref.current, random: Math.random() });
    }
  };
  useEffect(() => {
    window.addEventListener("message", setValue, false);
    return () => {
      window.removeEventListener("message", setValue);
    };
  }, []);
  return React__default.Children.map(props.children, (child, index) => React__default.cloneElement(child, {
    ...props,
    settings: { ...customization },
    key: `customizer-child-${index}`
  }));
};
const getStateName = (action) => {
  return action && action.type === "@@redux/INIT" ? "initialState argument passed to createStore" : "previous state received by the reducer";
};
const getUnexpectedInvocationParameterMessage = (state, reducers2, action) => {
  const reducerNames = Object.keys(reducers2);
  if (!reducerNames.length) {
    return "Store does not have a valid reducer. Make sure the argument passed to combineReducers is an object whose values are reducers.";
  }
  const stateName = getStateName(action);
  if (Immutable__default.isImmutable ? !Immutable__default.isImmutable(state) : !Immutable__default.isCollection(state)) {
    return "The " + stateName + ' is of unexpected type. Expected argument to be an instance of Immutable.Collection or Immutable.Record with the following properties: "' + reducerNames.join('", "') + '".';
  }
  if (Immutable__default.isMap(state)) {
    const stateMap = state;
    const unexpectedStatePropertyNames = stateMap.filter(
      (_, name) => !Object.prototype.hasOwnProperty.call(reducers2, name)
    );
    if (unexpectedStatePropertyNames.size > 0) {
      return "Unexpected " + (unexpectedStatePropertyNames.size === 1 ? "property" : "properties") + ' "' + [unexpectedStatePropertyNames.keys()].join('", "') + '" found in ' + stateName + '. Expected to find one of the known reducer property names instead: "' + reducerNames.join('", "') + '". Unexpected properties will be ignored.';
    }
  }
  return null;
};
var define_process_env_default$5 = { VITE_PROTOCOL: "https", VITE_DOMAIN: "et.tcdi.dgstg.org", VITE_REACT_APP_TITLE: "Tobacco Control Data Initiative", VITE_REACT_APP_WP_API: "https://et.tcdi.dgstg.org/wp/wp-json", VITE_REACT_APP_WP_STYLES: "https://et.tcdi.dgstg.org/wp/wp-admin/load-styles.php?c=1&dir=ltr&load%5Bchunk_0%5D=dashicons,admin-bar,buttons,media-views,editor-buttons,wp-components,wp-block-editor,wp-nux,wp-editor,wp-block-library,wp-block-&load%5Bchunk_1%5D=library-theme,wp-edit-blocks,wp-edit-post,wp-format-library,wp-block-directory,common,forms,admin-menu,dashboard,list-tables,edi&load%5Bchunk_2%5D=t,revisions,media,themes,about,nav-menus,wp-pointer,widgets,site-icon,l10n,wp-auth-check&ver=5.5.6' id='wp-block-library-css", VITE_REACT_APP_GA_CODE: "en", VITE_REACT_APP_DEFAULT_LOCALE: "en", VITE_REACT_APP_WP_HOSTS: "https://et.tcdi.dgstg.org", VITE_REACT_APP_USE_HASH_LINKS: "false", VITE_REACT_APP_THEME: "cash", VITE_REACT_APP_WP_SEARCH_END_POINT: "/dg/v1/search", VITE_REACT_APP_API_ROOT: "https://et.tcdi.dgstg.org" };
const combineReducers = (reducers2, getDefaultState) => {
  const reducerKeys = Object.keys(reducers2);
  return (inputState, action) => {
    if (typeof inputState === "undefined") {
      inputState = getDefaultState();
    }
    if (define_process_env_default$5.NODE_ENV !== "production") {
      const warningMessage = getUnexpectedInvocationParameterMessage(
        inputState,
        reducers2,
        action
      );
      if (warningMessage) {
        console.error(warningMessage);
      }
    }
    return inputState.withMutations((temporaryState) => {
      reducerKeys.forEach((reducerName) => {
        const reducer = reducers2[reducerName];
        const currentDomainState = temporaryState.get(reducerName);
        const nextDomainState = reducer(currentDomainState, action);
        if (nextDomainState === void 0) {
          throw new Error(
            'Reducer "' + reducerName + '" returned undefined when handling "' + action.type + '" action. To ignore an action, you must explicitly return the previous state.'
          );
        }
        temporaryState.set(reducerName, nextDomainState);
      });
    });
  };
};
const post = (url, params, isBlob = false) => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(params)
    }).then(
      function(response) {
        if (response.status !== 200) {
          reject(response);
        }
        if (isBlob) {
          resolve(response.blob());
        }
        response.json().then(function(data2) {
          resolve(data2);
        }).catch(() => resolve(response.status));
      }
    ).catch(function(err) {
      reject(err);
    });
  });
};
const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(
      function(response) {
        if (response.status !== 200) {
          reject(response);
        }
        response.json().then(function(data2) {
          resolve(data2);
        });
      }
    ).catch(function(err) {
      reject(err);
    });
  });
};
var define_process_env_default$4 = { VITE_PROTOCOL: "https", VITE_DOMAIN: "et.tcdi.dgstg.org", VITE_REACT_APP_TITLE: "Tobacco Control Data Initiative", VITE_REACT_APP_WP_API: "https://et.tcdi.dgstg.org/wp/wp-json", VITE_REACT_APP_WP_STYLES: "https://et.tcdi.dgstg.org/wp/wp-admin/load-styles.php?c=1&dir=ltr&load%5Bchunk_0%5D=dashicons,admin-bar,buttons,media-views,editor-buttons,wp-components,wp-block-editor,wp-nux,wp-editor,wp-block-library,wp-block-&load%5Bchunk_1%5D=library-theme,wp-edit-blocks,wp-edit-post,wp-format-library,wp-block-directory,common,forms,admin-menu,dashboard,list-tables,edi&load%5Bchunk_2%5D=t,revisions,media,themes,about,nav-menus,wp-pointer,widgets,site-icon,l10n,wp-auth-check&ver=5.5.6' id='wp-block-library-css", VITE_REACT_APP_GA_CODE: "en", VITE_REACT_APP_DEFAULT_LOCALE: "en", VITE_REACT_APP_WP_HOSTS: "https://et.tcdi.dgstg.org", VITE_REACT_APP_USE_HASH_LINKS: "false", VITE_REACT_APP_THEME: "cash", VITE_REACT_APP_WP_SEARCH_END_POINT: "/dg/v1/search", VITE_REACT_APP_API_ROOT: "https://et.tcdi.dgstg.org" };
const API_ROOT$1 = define_process_env_default$4.VITE_REACT_APP_API_ROOT;
function queryParams(params) {
  return Object.keys(params).map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k])).join("&");
}
const getCategories$1 = ({ app, params }) => {
  return get(`${API_ROOT$1}/api/${app}/categories/${params ? "?" + queryParams(params) : ""}`);
};
const getData$1 = ({ source, app, params }) => {
  return get(`${API_ROOT$1}/api/${app}/stats/${source}${params ? "?" + queryParams(params) : ""}`);
};
const LOAD_DATA = "LOAD_DATA";
const LOAD_DATA_DONE = "LOAD_DATA_DONE";
const LOAD_DATA_ERROR = "LOAD_DATA_ERROR";
const LOAD_CATEGORIES = "LOAD_CATEGORIES";
const LOAD_CATEGORIES_DONE = "LOAD_CATEGORIES_DONE";
const LOAD_CATEGORIES_ERROR = "LOAD_CATEGORIES_ERROR";
const SET_FILTER = "SET_FILTER";
const SET_INITIAL_FILTER = "SET_INITIAL_FILTER";
const CLEAN_FILTER = "CLEAN_FILTER";
const initialState$3 = Immutable__default.Map({ mode: "info" });
const SET_MEASURES = "SET_MEASURES";
const CLEAN_MEASURES = "CLEAN_MEASURES";
const cleanMeasures = ({ app, group }) => (dispatch, getState) => {
  dispatch({ type: CLEAN_MEASURES, app, group });
};
const setMeasures = ({ app, group, mGroup }) => (dispatch, getState) => {
  const measures = Object.keys(mGroup.measures).filter((k) => mGroup.measures[k].selected);
  const newMgroup = { ...mGroup };
  newMgroup[app] = { measures: {} };
  measures.forEach((m) => {
    newMgroup[app].measures[m] = { ...mGroup.measures[m] };
  });
  newMgroup[app].format = mGroup.format;
  dispatch({ type: SET_MEASURES, app, group, measure: newMgroup });
};
const setFilter = ({ app, group, param, value }) => (dispatch, getState) => {
  dispatch({ type: SET_FILTER, app, group, param, value });
};
const cleanFilter = ({ app, group }) => (dispatch, getState) => {
  dispatch({ type: CLEAN_FILTER, app, group });
};
const setInitialFilters = ({ app, group, param, value }) => (dispatch, getState) => {
  dispatch({ type: SET_INITIAL_FILTER, app, group, param, value });
};
const getCategories = (props) => (dispatch, getState) => {
  const { app, params } = props;
  dispatch({ type: LOAD_CATEGORIES, params, app });
  getCategories$1({ app, params }).then((data2) => {
    data2.appliedFilters = params;
    return dispatch({ type: LOAD_CATEGORIES_DONE, app, data: data2 });
  }).catch((error) => dispatch({ type: LOAD_CATEGORIES_ERROR, app, error }));
};
const setData = ({ app, group, csv, store: store2, params }) => (dispatch, getState) => {
  const filters = getState().get("data").getIn(["filters", app, group]);
  if (filters) {
    params = { ...params, ...filters.toJS() };
  }
  const data2 = Papa.parse(csv, { header: true, dynamicTyping: true });
  const filtered = data2.data.filter((d) => {
    let filtered2 = false;
    Object.keys(params).forEach((k) => {
      const value = params[k];
      if (d[k]) {
        const filterValue = d[k].toString().trim().toLowerCase();
        filtered2 = value.filter((v) => v && v.toString().trim().toLowerCase() == filterValue).length == 0;
      }
    });
    return !filtered2;
  });
  const d2 = { ...data2, data: filtered, appliedFilters: params };
  dispatch({ type: LOAD_DATA_DONE, store: store2, data: { count: d2.data.length, itemsSize: d2.data.length, ...d2 } });
};
const getData = ({ app, group, source, store: store2, params }) => (dispatch, getState) => {
  const filters = getState().get("data").getIn(["filters", app, group]);
  if (filters) {
    params = { ...params, ...filters.toJS() };
  }
  dispatch({ type: LOAD_DATA, params, store: store2 });
  getData$1({ app, source, params }).then((data2) => {
    data2.appliedFilters = params;
    return dispatch({ type: LOAD_DATA_DONE, store: store2, data: data2 });
  }).catch((error) => dispatch({ type: LOAD_DATA_ERROR, store: store2, error }));
};
const data = (state = initialState$3, action) => {
  switch (action.type) {
    case LOAD_DATA: {
      const { store: store2 } = action;
      const time = Date.now();
      return state.deleteIn([...store2, "error"]).setIn([...store2, "loading"], true).setIn([...store2, "time"], time);
    }
    case LOAD_DATA_ERROR: {
      const { error, store: store2 } = action;
      return state.setIn([...store2, "loading"], false).setIn([...store2, "error"], error);
    }
    case LOAD_DATA_DONE: {
      const { data: data2, store: store2 } = action;
      return state.setIn([...store2, "loading"], false).deleteIn([...store2, "error"]).setIn([...store2, "data"], data2);
    }
    case LOAD_CATEGORIES: {
      const app = action.app;
      return state.setIn(["categories", app, "loading"], true).deleteIn(["categories", app, "error"]);
    }
    case LOAD_CATEGORIES_DONE: {
      const { data: data2, app } = action;
      return state.setIn(["categories", app, "loading"], false).setIn(["categories", app, "items"], Immutable__default.fromJS(data2));
    }
    case LOAD_CATEGORIES_ERROR: {
      const { app, error } = action;
      return state.setIn(["categories", app, "loading"], false).setIn(["categories", app, "error"], error);
    }
    case SET_FILTER: {
      const { app, group, param, value } = action;
      return state.setIn(["filters", app, group, param], value.length === 0 ? [Number.MIN_SAFE_INTEGER] : value);
    }
    case SET_INITIAL_FILTER: {
      const { app, group, param, value } = action;
      return state.setIn(["filters", "initial", app, group, param], value.length === 0 ? [Number.MIN_SAFE_INTEGER] : value).setIn(["filters", app, group, param], value.length === 0 ? [Number.MIN_SAFE_INTEGER] : value);
    }
    case CLEAN_FILTER: {
      const { app, group } = action;
      const initial = state.getIn(["filters", "initial", app, group]);
      return state.setIn(["filters", app, group], initial);
    }
    case SET_MEASURES: {
      const { app, group, measure } = action;
      return state.setIn(["measures", app, group], measure);
    }
    case CLEAN_MEASURES: {
      const { app, group, measure } = action;
      return state.deleteIn(["measures", app, group]);
    }
    default:
      return state;
  }
};
var define_process_env_default$3 = { VITE_PROTOCOL: "https", VITE_DOMAIN: "et.tcdi.dgstg.org", VITE_REACT_APP_TITLE: "Tobacco Control Data Initiative", VITE_REACT_APP_WP_API: "https://et.tcdi.dgstg.org/wp/wp-json", VITE_REACT_APP_WP_STYLES: "https://et.tcdi.dgstg.org/wp/wp-admin/load-styles.php?c=1&dir=ltr&load%5Bchunk_0%5D=dashicons,admin-bar,buttons,media-views,editor-buttons,wp-components,wp-block-editor,wp-nux,wp-editor,wp-block-library,wp-block-&load%5Bchunk_1%5D=library-theme,wp-edit-blocks,wp-edit-post,wp-format-library,wp-block-directory,common,forms,admin-menu,dashboard,list-tables,edi&load%5Bchunk_2%5D=t,revisions,media,themes,about,nav-menus,wp-pointer,widgets,site-icon,l10n,wp-auth-check&ver=5.5.6' id='wp-block-library-css", VITE_REACT_APP_GA_CODE: "en", VITE_REACT_APP_DEFAULT_LOCALE: "en", VITE_REACT_APP_WP_HOSTS: "https://et.tcdi.dgstg.org", VITE_REACT_APP_USE_HASH_LINKS: "false", VITE_REACT_APP_THEME: "cash", VITE_REACT_APP_WP_SEARCH_END_POINT: "/dg/v1/search", VITE_REACT_APP_API_ROOT: "https://et.tcdi.dgstg.org" };
const API_ROOT = define_process_env_default$3.VITE_REACT_APP_API_ROOT;
const sendShowCase = (params) => {
  const data2 = new FormData();
  const { files, organization, name, email, message, country, token } = params;
  files.forEach((f) => data2.append("files", f, f.name));
  data2.append("organization", organization);
  data2.append("name", name);
  data2.append("email", email);
  data2.append("country", country);
  data2.append("message", message);
  data2.append("token", token);
  return fetch(API_ROOT + "/api/utils/showCaseForm", {
    mode: "cors",
    method: "POST",
    body: data2
  });
};
const subscribe = (params) => {
  return post(API_ROOT + "/api/utils/subscribe", params);
};
const SHOW_CASE_SEND = "SEND_SHOW_CASE";
const SHOW_CASE_SEND_DONE = "SEND_SHOW_CASE_DONE";
const SHOW_CASE_SEND_FAILURE = "SEND_SHOW_CASE_FAILURE";
const SHOW_CASE_RESET = "SHOW_CASE_RESET";
const NEWS_LETTER_SUBSCRIBE = "NEWS_LETTER_SUBSCRIBE";
const NEWS_LETTER_SUBSCRIBE_DONE = "NEWS_LETTER_SUBSCRIBE_DONE";
const NEWS_LETTER_SUBSCRIBE_FAILURE = "NEWS_LETTER_SUBSCRIBE_FAILURE";
const NEWS_LETTER_SET_EMAIL = "NEWS_LETTER_SET_EMAIL";
const CONTENT_LOADED = "POST_LOADED";
const postLoaded = (params) => (dispatch, getState) => {
  dispatch({ type: CONTENT_LOADED });
};
const initialState$2 = Immutable__default.Map({});
const setEmail = (eMail) => (dispatch, getState) => {
  dispatch({ type: NEWS_LETTER_SET_EMAIL, eMail });
};
const newsletterSubscription = (params) => (dispatch, getState) => {
  dispatch({ type: NEWS_LETTER_SUBSCRIBE });
  subscribe(params).then((res) => {
    if (res.status === 500) {
      dispatch({ type: NEWS_LETTER_SUBSCRIBE_FAILURE });
    } else {
      dispatch({ type: NEWS_LETTER_SUBSCRIBE_DONE });
    }
  }).catch((err) => {
    dispatch({ type: NEWS_LETTER_SUBSCRIBE_FAILURE });
  });
};
const sendShowCaseForm = (params) => (dispatch, getState) => {
  dispatch({ type: SHOW_CASE_SEND });
  sendShowCase(params).then((res) => {
    if (res.status === 500) {
      dispatch({ type: SHOW_CASE_SEND_FAILURE });
    } else {
      dispatch({ type: SHOW_CASE_SEND_DONE });
    }
  }).catch((err) => {
    dispatch({ type: SHOW_CASE_SEND_FAILURE });
  });
};
const reset = (params) => (dispatch, getState) => {
  dispatch({ type: SHOW_CASE_RESET });
};
const embeddable$1 = (state = initialState$2, action) => {
  switch (action.type) {
    case SHOW_CASE_SEND: {
      return state.setIn(["showCase", "loading"], true).setIn(["showCase", "status"], null);
    }
    case SHOW_CASE_SEND_DONE: {
      return state.setIn(["showCase", "status"], "OK");
    }
    case SHOW_CASE_SEND_FAILURE: {
      return state.setIn(["showCase", "status"], "ERROR");
    }
    case SHOW_CASE_RESET: {
      return state.setIn(["showCase", "status"], null);
    }
    case NEWS_LETTER_SUBSCRIBE: {
      return state.setIn(["newsletter", "loading"], true).setIn(["newsletter", "status"], null);
    }
    case NEWS_LETTER_SUBSCRIBE_DONE: {
      return state.setIn(["newsletter", "status"], "OK").setIn(["newsletter", "email"], "");
    }
    case NEWS_LETTER_SUBSCRIBE_FAILURE: {
      return state.setIn(["newsletter", "status"], "ERROR");
    }
    case NEWS_LETTER_SET_EMAIL: {
      const { eMail } = action;
      return state.setIn(["newsletter", "email"], eMail);
    }
    case CONTENT_LOADED: {
      return state.setIn(["random"], Math.random());
    }
    default:
      return state;
  }
};
const PageGallery = lazy(() => import("./index-f4j4aPOl.js"));
const Download = lazy(() => import("./index-DIkFLY3Y.js"));
const PostsCarousel = lazy(() => import("./index-CI6WH_wr.js"));
const Chart = lazy(() => import("./index-BTKUNmFv.js"));
const Filter = lazy(() => import("./index-DdNTdN19.js"));
const ShowcaseForm = lazy(() => import("./index-DkEoW7r0.js"));
const NewsLetter = lazy(() => import("./index--gejpgoi.js"));
const TabbedPosts = lazy(() => import("./index-DWIrIj1p.js"));
const PageModules = lazy(() => import("./index-BPY1FVL9.js"));
const FeaturedTabs = lazy(() => import("./index-DDQSMuWo.js"));
const VerticalFeaturedTabs = lazy(() => import("./index-DK8NLUA6.js"));
const InlineList = lazy(() => import("./index-Z-CLVFWX.js"));
const DownloadPdf = lazy(() => import("./index-CGZGQ_jA.js"));
const Map$1 = lazy(() => import("./index-40NsRr72.js"));
const DataFiltersReset = lazy(() => import("./index-WlctWRMY.js"));
const Tooltip = lazy(() => import("./index-vdDBdOVL.js"));
const ReferencesList = lazy(() => import("./ReferencesList-gPvcPSqv.js"));
const Reference = lazy(() => import("./Reference-3MaCstG3.js"));
const TimeLine = lazy(() => import("./index-Q2Z58kZG.js"));
const NewTimeLine = lazy(() => import("./index-BNtIUvs4.js"));
const Measures = lazy(() => import("./index-D7Q26nWj.js"));
const Menu = lazy(() => import("./index-1T5BYeXD.js"));
const ChildPagesMenu = lazy(() => import("./index-BkD2zcU8.js"));
const NewMap = lazy(() => import("./index-CxNrawG7.js"));
const ParallaxContainer = lazy(() => import("./index-CgXite_9.js"));
const Wrapped = lazy(() => import("./index-BY_9gf45.js"));
const SankeyChart = lazy(() => import("./index-Cp6Wrl6c.js"));
const DataLabel = lazy(() => import("./index-DrBSqROj.js"));
lazy(() => import("./index-D7MCRFMe.js"));
let reducerList = { data, embeddable: embeddable$1 };
if (customizer.Reducers) {
  reducerList = { ...reducerList, ...customizer.Reducers };
}
const reducers = reducerList;
const components = {
  pageGallery: PageGallery,
  postsCarousel: PostsCarousel,
  chart: Chart,
  filter: Filter,
  showCaseForm: ShowcaseForm,
  newsLetter: NewsLetter,
  tabbedPosts: TabbedPosts,
  pageModules: PageModules,
  featuredTabs: FeaturedTabs,
  verticalTabs: VerticalFeaturedTabs,
  inlineList: InlineList,
  download: Download,
  downloadPdf: DownloadPdf,
  map: Map$1,
  dataFiltersReset: DataFiltersReset,
  tooltip: Tooltip,
  references: ReferencesList,
  reference: Reference,
  timeLine: TimeLine,
  newTimeLine: NewTimeLine,
  measures: Measures,
  menu: Menu,
  childPagesMenu: ChildPagesMenu,
  newMap: NewMap,
  parallaxContainer: ParallaxContainer,
  wrapped: Wrapped,
  sankeyChart: SankeyChart,
  dataLabel: DataLabel,
  redirect: () => null
};
const getComponentByNameIgnoreCase = (name) => {
  const k = Object.keys(components).find((value) => value.toLowerCase() === name.toLowerCase());
  if (k) {
    return injectIntl(components[k]);
  } else {
    const customComponent = customizer.getComponentByNameIgnoreCase(name);
    if (customComponent) {
      return injectIntl(customComponent);
    }
  }
};
const appReducers = {
  ...reducers,
  wordpress,
  intl: intlReducer
};
const initialState$1 = () => Immutable.Map();
const createRootReducer = () => combineReducers(appReducers, initialState$1);
const initialState = Immutable__default.Map();
const getRootReducer = () => {
  return createRootReducer();
};
const store = configureStore({
  reducer: getRootReducer(),
  preloadedState: initialState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
    immutableCheck: false
  })
});
var define_process_env_default$2 = { VITE_PROTOCOL: "https", VITE_DOMAIN: "et.tcdi.dgstg.org", VITE_REACT_APP_TITLE: "Tobacco Control Data Initiative", VITE_REACT_APP_WP_API: "https://et.tcdi.dgstg.org/wp/wp-json", VITE_REACT_APP_WP_STYLES: "https://et.tcdi.dgstg.org/wp/wp-admin/load-styles.php?c=1&dir=ltr&load%5Bchunk_0%5D=dashicons,admin-bar,buttons,media-views,editor-buttons,wp-components,wp-block-editor,wp-nux,wp-editor,wp-block-library,wp-block-&load%5Bchunk_1%5D=library-theme,wp-edit-blocks,wp-edit-post,wp-format-library,wp-block-directory,common,forms,admin-menu,dashboard,list-tables,edi&load%5Bchunk_2%5D=t,revisions,media,themes,about,nav-menus,wp-pointer,widgets,site-icon,l10n,wp-auth-check&ver=5.5.6' id='wp-block-library-css", VITE_REACT_APP_GA_CODE: "en", VITE_REACT_APP_DEFAULT_LOCALE: "en", VITE_REACT_APP_WP_HOSTS: "https://et.tcdi.dgstg.org", VITE_REACT_APP_USE_HASH_LINKS: "false", VITE_REACT_APP_THEME: "cash", VITE_REACT_APP_WP_SEARCH_END_POINT: "/dg/v1/search", VITE_REACT_APP_API_ROOT: "https://et.tcdi.dgstg.org" };
const InjectTitle$1 = injectIntl((props) => {
  var _a;
  document.title = (_a = props.settings) == null ? void 0 : _a.description;
  console.log(props);
  return /* @__PURE__ */ jsx(Fragment, {});
});
const messages$1 = {
  "en": messages_en
};
const IntlRoutes$1 = () => {
  const pathParams = useParams();
  const locale = pathParams.lan;
  console.log("locale", locale);
  useEffect(() => {
    if (define_process_env_default$2) {
      console.log("----------.env-----------");
      console.log(define_process_env_default$2);
      console.log("----------.env-----------");
    }
    window.setTimeout(() => {
      if (window.location.hash) {
        const element = document.getElementById(window.location.hash.substr(1));
        if (element) {
          element.scrollIntoView({
            behavior: "auto",
            block: "start"
          });
        }
      }
    }, 2e3);
  }, []);
  useEffect(() => {
    store.dispatch(updateIntl({
      locale,
      formats: {},
      messages: messages$1[locale ? locale : "en"]
    }));
  });
  const urlParams = new URLSearchParams(window.location.search);
  const customize_changeset_uuid = urlParams.get("customize_changeset_uuid");
  useEffect(() => {
    window.isCustomizedPreview = customize_changeset_uuid != null;
  }, [customize_changeset_uuid]);
  if (!locale) {
    return /* @__PURE__ */ jsx(Navigate, {
      to: "/en"
    });
  }
  return /* @__PURE__ */ jsx(IntlProvider, {
    locale,
    messages: messages$1[locale],
    children: /* @__PURE__ */ jsx(AppContextProvider, {
      getComponent: getComponentByNameIgnoreCase,
      store,
      locale,
      children: /* @__PURE__ */ jsxs(SettingProvider, {
        locale,
        changeUUID: customize_changeset_uuid,
        children: [/* @__PURE__ */ jsx(ScrollToTopOnMount, {}), /* @__PURE__ */ jsx(SettingsConsumer, {
          children: /* @__PURE__ */ jsx(CustomizerWrapper, {
            children: /* @__PURE__ */ jsx(InjectTitle$1, {})
          })
        }), /* @__PURE__ */ jsx(Outlet, {})]
      })
    })
  }, locale);
};
const Home$1 = () => {
  return /* @__PURE__ */ jsx(Provider_default, {
    store,
    children: /* @__PURE__ */ jsx(IntlRoutes$1, {})
  });
};
const App$1 = withComponentProps(Home$1);
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: App$1
}, Symbol.toStringTag, { value: "Module" }));
const AppMedia = createMedia({
  breakpoints: {
    mobile: 320,
    tablet: 768,
    computer: 992,
    largeScreen: 1200,
    widescreen: 1920
  }
});
AppMedia.createMediaStyle();
const { Media, MediaContextProvider } = AppMedia;
class Footer extends Component {
  componentDidMount() {
  }
  render() {
    const { children, fixed, location, intl: { locale } } = this.props;
    return /* @__PURE__ */ jsx(Container, { fluid: true, className: "viz footer", children: /* @__PURE__ */ jsx(PageProvider$1, { locale, slug: "footer", store: "footer", children: /* @__PURE__ */ jsx(PageConsumer$1, { children: /* @__PURE__ */ jsx(Page$3, {}) }) }) });
  }
}
const Footer$1 = injectIntl(Footer);
function withRouter(Component3) {
  function ComponentWithRouterProp(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    return /* @__PURE__ */ jsx(
      Component3,
      {
        ...props,
        router: { location, navigate, params }
      }
    );
  }
  return ComponentWithRouterProp;
}
const CustomSearch = (props) => {
  const { results, resultRenderer: resultRenderer2, onSearchChange, value, showNoResults, onResultSelect, loading } = props;
  const [searchClasses, setSearchClasses] = React__default.useState("");
  const [focus, setFocus] = React__default.useState(false);
  const [open, setOpen] = React__default.useState(false);
  const handleBlur = (e, data2) => {
    setFocus(false);
    if (props.onBlur) {
      props.onBlur(e, data2);
    }
  };
  const handleFocus = (e, data2) => {
    setFocus(true);
    if (props.onFocus) {
      props.onFocus(e, data2);
    }
  };
  const handleMouseDown = (e) => {
    setOpen(true);
    if (props.onMouseDown) {
      props.onMouseDown(e);
    }
  };
  const { aligned, category: category2, className, fluid, size } = props;
  const classes = clsx(
    "ui",
    open && "active visible",
    size,
    searchClasses,
    // ...category ? 'category',
    // ...focus && 'focus',
    // ...fluid && 'fluid',
    // ...loading && 'loading',
    // ...aligned && aligned,
    "search",
    className
  );
  const unhandled = getUnhandledProps(Search, props);
  partitionHTMLProps(unhandled, {
    htmlProps: htmlInputAttrs
  });
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
    Search,
    {
      className: classes,
      onBlur: handleBlur,
      onFocus: handleFocus,
      onMouseDown: handleMouseDown,
      resultRenderer: resultRenderer2,
      onSearchChange,
      results,
      value,
      showNoResults,
      onResultSelect,
      loading
    }
  ) });
};
const resultRenderer = injectIntl(({
  ID,
  title,
  slug: slug2,
  parent_title,
  parent_slug,
  parent_link,
  extract,
  type,
  link,
  terms,
  subtype,
  bread_crumbs = [],
  metadata: { redirect_url },
  intl: { locale }
}) => {
  let target = parent_link ? utils.replaceLink(parent_link, locale) + `#${slug2}` : utils.replaceLink(link, locale);
  target = redirect_url ? redirect_url + `#${slug2}` : target;
  return /* @__PURE__ */ jsxs("div", { className: "has-standard-12-font-size", onClick: (e) => document.location.href = target, children: [
    /* @__PURE__ */ jsxs("h5", { children: [
      bread_crumbs && bread_crumbs.length > 0 ? `${bread_crumbs.join(" / ")}` : "",
      " "
    ] }),
    /* @__PURE__ */ jsx("div", { className: "has-standard-14-font-size", children: /* @__PURE__ */ jsx("h4", { children: title }) }),
    /* @__PURE__ */ jsx("div", { className: "search-content", dangerouslySetInnerHTML: { __html: utils.replaceHTMLinks(extract, locale) } }),
    /* @__PURE__ */ jsx("br", {})
  ] });
});
const replaceString = (content, words) => {
  const regex = RegExp(words, "gi");
  let newHTML = content;
  const instances = [...newHTML.matchAll(regex)];
  let shift = 0;
  const lengthBeforeChange = newHTML.length;
  instances.forEach((instance) => {
    const replacement = "<b>" + newHTML.substring(instance.index + shift, instance.index + shift + words.length) + "</b>";
    newHTML = newHTML.substring(0, instance.index + shift) + replacement + newHTML.substring(instance.index + words.length + shift);
    shift = newHTML.length - lengthBeforeChange;
  });
  return newHTML;
};
const searchTextHandler = (words) => {
  document.querySelector(".results");
  const searchResultHeading = document.querySelectorAll("H5");
  const searchResult = document.querySelectorAll(".search-content");
  for (let i = 0; i < searchResult.length; i++) {
    if (searchResult[i]) {
      searchResult[i].innerHTML = replaceString(searchResult[i].textContent, words);
    }
  }
  for (let i = 0; i < searchResultHeading.length; i++) {
    if (searchResultHeading[i]) {
      searchResultHeading[i].innerHTML = replaceString(searchResultHeading[i].textContent, words);
    }
  }
};
const SearchControl = ({ onSearch, perPage, loading, results, meta, locale }) => {
  const total = meta ? meta["x-wp-total"] : 0;
  const totalPages = meta ? meta["x-wp-totalpages"] : 0;
  const placeholder = locale === "fr" ? "Recherche..." : "Search...";
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);
  useEffect(() => searchTextHandler(searchTerm), [results]);
  return /* @__PURE__ */ jsx(
    CustomSearch,
    {
      value: searchTerm,
      loading,
      placeholder,
      onResultSelect: (e, data2) => null,
      total,
      perPage,
      totalPages,
      onSearchChange: (a, b) => {
        setSearchTerm(b.value);
      },
      searchTextHandler,
      resultRenderer,
      results,
      showNoResults: false
    }
  );
};
const SearchComponent = injectIntl((props) => {
  const { intl } = props;
  const [query, setQuery] = useState("");
  return /* @__PURE__ */ jsx(SearchProvider, { search: query, perPage: 5, locale: intl.locale, children: /* @__PURE__ */ jsx(SearchConsumer, { children: /* @__PURE__ */ jsx(SearchControl, { onSearch: setQuery, perPage: 5 }) }) });
});
var define_process_env_default$1 = { VITE_PROTOCOL: "https", VITE_DOMAIN: "et.tcdi.dgstg.org", VITE_REACT_APP_TITLE: "Tobacco Control Data Initiative", VITE_REACT_APP_WP_API: "https://et.tcdi.dgstg.org/wp/wp-json", VITE_REACT_APP_WP_STYLES: "https://et.tcdi.dgstg.org/wp/wp-admin/load-styles.php?c=1&dir=ltr&load%5Bchunk_0%5D=dashicons,admin-bar,buttons,media-views,editor-buttons,wp-components,wp-block-editor,wp-nux,wp-editor,wp-block-library,wp-block-&load%5Bchunk_1%5D=library-theme,wp-edit-blocks,wp-edit-post,wp-format-library,wp-block-directory,common,forms,admin-menu,dashboard,list-tables,edi&load%5Bchunk_2%5D=t,revisions,media,themes,about,nav-menus,wp-pointer,widgets,site-icon,l10n,wp-auth-check&ver=5.5.6' id='wp-block-library-css", VITE_REACT_APP_GA_CODE: "en", VITE_REACT_APP_DEFAULT_LOCALE: "en", VITE_REACT_APP_WP_HOSTS: "https://et.tcdi.dgstg.org", VITE_REACT_APP_USE_HASH_LINKS: "false", VITE_REACT_APP_THEME: "cash", VITE_REACT_APP_WP_SEARCH_END_POINT: "/dg/v1/search", VITE_REACT_APP_API_ROOT: "https://et.tcdi.dgstg.org" };
const changeLanguage = (locale) => {
  window.location = window.location.origin + "/" + locale.toLowerCase() + window.location.pathname.toString().substring(3);
};
const toOptions = (languages, show, locale) => {
  return Object.keys(languages).map((k) => ({
    key: k,
    text: show === "name" || show === "both" ? languages[k]["name"] : k.toUpperCase(),
    value: k,
    selected: k.toUpperCase() === locale.toUpperCase(),
    icon: show === "flag" || show === "both" ? /* @__PURE__ */ jsx(Image, { src: "/wp/wp-content/plugins/wp-multilang/flags/" + languages[k]["flag"] }) : null
  }));
};
const Drop = (props) => {
  const { menu: { menu_item_languages_show: show }, settings: { languages }, locale } = props;
  const options = toOptions(languages, show, locale);
  return /* @__PURE__ */ jsx(
    Dropdown,
    {
      button: true,
      className: "icon language selector",
      floating: true,
      labeled: true,
      icon: "world",
      options,
      onChange: (e, { name, value }) => {
        changeLanguage(value);
      },
      text: "Language"
    }
  );
};
const Inline = (props) => {
  const { menu: { menu_item_languages_show: show }, settings: { languages }, locale } = props;
  const options = toOptions(languages, show, locale);
  return /* @__PURE__ */ jsx("p", { className: "inline language selector", children: options.map((o) => /* @__PURE__ */ jsxs("span", { className: o.selected ? "selected" : "", children: [
    o.icon,
    /* @__PURE__ */ jsx("a", { onClick: (e) => changeLanguage(o.value), children: o.text }),
    "  "
  ] })) });
};
const Single = (props) => {
  const { menu: { menu_item_languages_show: show }, settings: { languages }, locale } = props;
  const options = toOptions(languages, show, locale);
  return /* @__PURE__ */ jsx("p", { className: "single language selector", children: options.map((o) => /* @__PURE__ */ jsx("a", { className: o.selected ? "selected" : "", onClick: (e) => changeLanguage(o.value), children: o.value })) });
};
const Toggler = (props) => {
  const { menu: { menu_item_languages_show: show }, settings: { languages }, locale } = props;
  toOptions(languages, show, locale);
  const [currentLanguage, setCurrentLanguage] = useState(locale);
  const toggleLanguage = () => {
    const nextLanguage = currentLanguage === "en" ? "fr" : "en";
    setCurrentLanguage(nextLanguage);
    const circle = document.querySelector(".circle");
    circle.classList.toggle("en");
    circle.classList.toggle("fr");
    setTimeout(() => {
      changeLanguage(nextLanguage);
    }, 300);
  };
  return /* @__PURE__ */ jsxs("div", { className: "toggler language selector", children: [
    /* @__PURE__ */ jsx("a", { className: `language-label ${currentLanguage === "en" ? "active" : ""}`, onClick: () => {
      changeLanguage("en");
      setCurrentLanguage("en");
    }, children: "EN" }),
    /* @__PURE__ */ jsx("button", { className: "toggle-button", onClick: toggleLanguage, children: /* @__PURE__ */ jsx("div", { className: `circle ${currentLanguage === "en" ? "en" : "fr"}` }) }),
    /* @__PURE__ */ jsx("a", { className: `language-label ${currentLanguage === "fr" ? "active" : ""}`, onClick: () => {
      changeLanguage("fr");
      setCurrentLanguage("fr");
    }, children: "FR" })
  ] });
};
const Selector = (props) => {
  const { locale, menu } = props;
  const languages = menu.items.filter((i) => i.url === "#wpm-languages");
  const hasLanguages = languages.length > 0;
  const [settings, setSettings] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        define_process_env_default$1.REACT_APP_WP_API + "/dg/v1/settings",
        {
          headers: {
            "Content-Type": "application/json"
            // 'Content-Type': 'application/x-www-form-urlencoded',
          }
        }
      );
      const json = await response.json();
      setSettings(json);
    }
    fetchData();
  }, []);
  if (hasLanguages && settings) {
    return languages.map((l) => {
      const type = l.menu_item_languages_type;
      l.menu_item_languages_show;
      switch (type) {
        case "dropdown":
          return /* @__PURE__ */ jsx(Drop, { locale, menu: l, settings });
        case "inline":
          return /* @__PURE__ */ jsx(Inline, { locale, menu: l, settings });
        case "single":
          return /* @__PURE__ */ jsx(Single, { locale, menu: l, settings });
        case "toggler":
          return /* @__PURE__ */ jsx(Toggler, { locale, menu: l, settings });
      }
      return null;
    });
  } else {
    return null;
  }
};
const getPath = (menu, locationParams) => {
  const path = [];
  menu.items.forEach((item) => {
    if (item.child_items) {
      item.child_items.forEach((ch) => {
        if (ch.slug === locationParams.slug) {
          path.push(item);
          path.push(ch);
        }
      });
    } else if (item.slug === locationParams.slug && item.url !== "/") {
      path.push(item);
    }
  });
  return path;
};
const localReplaceLink$1 = (url, locale) => {
  if (url) {
    if (!url.substr(url.indexOf("/wp") + 3).startsWith("/" + locale)) {
      return "/" + locale + url.substr(url.indexOf("/wp") + 3);
    }
    return url.substr(url.indexOf("/wp") + 3);
  }
  return "";
};
const BreadCrumbs = withRouter(injectIntl(({ menu, intl }) => {
  const params = useParams();
  const path = getPath(menu, params);
  return /* @__PURE__ */ jsx(React__default.Fragment, { children: path.filter((i) => i.url !== "#wpm-languages").map((i, idx) => !i.child_items ? /* @__PURE__ */ jsxs(
    "a",
    {
      className: i.slug === params.slug ? "active" : "",
      href: utils.replaceLink(i.url, intl.locale),
      children: [
        " ",
        i.post_title
      ]
    },
    idx
  ) : /* @__PURE__ */ jsxs("span", { children: [
    i.post_title,
    " "
  ] }, idx)) });
}));
const MenuItems = injectIntl(
  ({
    settings,
    withIcons,
    active,
    menu,
    onSetSelected,
    selected,
    intl: { locale },
    isSmallScreen
  }) => {
    const params = useParams();
    useEffect(
      (e) => {
        if (!selected) {
          const pathSelected = getPath(menu, params);
          const items = pathSelected.filter((i) => i.menu_item_parent == 0);
          if (items) {
            onSetSelected(items[0]);
          }
        }
      },
      [params, menu, onSetSelected, selected]
    );
    const [mixedMenu, setMixedMenu] = useState(null);
    useEffect(() => {
      setMixedMenu(menu);
    }, [menu]);
    useEffect(() => {
      if (settings && settings.menu_settings && mixedMenu) {
        const removed = [];
        const newItems = menu.items.map((item) => {
          if (settings.menu_settings && settings.menu_settings["nav_menu_item[" + item.ID + "]"] === false) {
            removed.push(item.ID);
          }
          if (settings.menu_settings && settings.menu_settings["nav_menu_item[" + item.ID + "]"]) {
            settings.menu_settings["nav_menu_item[" + item.ID + "]"];
            return {
              ...item,
              ...settings.menu_settings["nav_menu_item[" + item.ID + "]"]
            };
          } else {
            return item;
          }
        });
        Object.keys(settings.menu_settings).map((mk) => {
          const value = settings.menu_settings[mk];
          if (value.type == "nav_menu_item") {
            const re = /(-)?[0-9]+/g;
            const results = re.exec(mk);
            const id = parseInt(results[0]);
            const exists = newItems.find((m) => m.ID == id);
            if (!exists) {
              newItems.push(value.value);
            }
          }
        });
        setMixedMenu({
          ...menu,
          items: newItems.filter((i) => removed.indexOf(i.ID) === -1)
        });
      }
    }, [settings]);
    const [isMobileResolution, setIsMobileResolution] = useState(false);
    useEffect(() => {
      const handleResize = () => {
        setIsMobileResolution(window.innerWidth <= 1024);
      };
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
    return mixedMenu && /* @__PURE__ */ jsx(React__default.Fragment, { children: mixedMenu.items.filter((i) => i.url !== "#wpm-languages").map((item, index) => /* @__PURE__ */ jsxs(React__default.Fragment, { children: [
      /* @__PURE__ */ jsxs(
        Menu$1.Item,
        {
          className: `divided ${item.child_items ? "has-child-items" : ""}
                              ${selected && selected.ID === item.ID ? "selected" : ""}
                              ${active === item.slug ? "active" : ""}`,
          children: [
            withIcons && /* @__PURE__ */ jsx("a", { href: localReplaceLink$1(item.url, locale), children: /* @__PURE__ */ jsx("div", { className: "mark", children: /* @__PURE__ */ jsx("span", { className: "sr-only", children: item.title }) }) }),
            isSmallScreen ? item.child_items ? /* @__PURE__ */ jsx(
              "span",
              {
                onClick: () => onSetSelected(selected === item ? null : item),
                children: item.title
              }
            ) : /* @__PURE__ */ jsx("a", { href: localReplaceLink$1(item.url, locale), children: item.title }) : item.child_items ? /* @__PURE__ */ jsx("span", { onMouseOver: (e) => onSetSelected(item), children: item.title }) : /* @__PURE__ */ jsx(
              "a",
              {
                onMouseOut: (e) => onSetSelected(null),
                onMouseOver: (e) => onSetSelected(item),
                href: localReplaceLink$1(item.url, locale),
                children: item.title
              }
            )
          ]
        }
      ),
      isMobileResolution && selected && selected.ID === item.ID && selected.child_items && /* @__PURE__ */ jsx(React__default.Fragment, { children: selected.child_items.map((childItem) => /* @__PURE__ */ jsxs(
        Menu$1.Item,
        {
          className: `divided child-item ${active === childItem.slug ? "active" : ""}`,
          children: [
            /* @__PURE__ */ jsx("div", { className: "mark" }),
            /* @__PURE__ */ jsx("a", { href: localReplaceLink$1(childItem.url, locale), children: childItem.title })
          ]
        },
        childItem.ID
      )) })
    ] }, item.ID)) });
  }
);
const Header$2 = ({ intl, settings }) => {
  const [selected, setSelected] = useState();
  const { slug: slug2 } = useParams();
  const Logo = ({ media }) => {
    return media ? /* @__PURE__ */ jsx(Image, { src: media.guid.rendered }) : /* @__PURE__ */ jsx("img", { className: "brand logo", size: "large", src: "/logo_full.png" });
  };
  return /* @__PURE__ */ jsx(React__default.Fragment, { children: /* @__PURE__ */ jsxs(MenuProvider$1, { slug: "main", locale: intl.locale, children: [
    /* @__PURE__ */ jsxs(Container, { fluid: true, className: "header classic", children: [
      /* @__PURE__ */ jsx(Container, { fluid: true, className: "background", children: /* @__PURE__ */ jsxs(Menu$1, { className: "branding", text: true, children: [
        /* @__PURE__ */ jsx(Menu$1.Item, { children: /* @__PURE__ */ jsxs(NavLink, { to: `/${intl.locale}`, children: [
          settings.site_logo !== 0 && /* @__PURE__ */ jsx(MediaProvider$1, { id: settings.site_logo, children: /* @__PURE__ */ jsx(MediaConsumer, { children: /* @__PURE__ */ jsx(Logo, {}) }) }),
          !window.isCustomizedPreview && settings.site_logo === 0 && /* @__PURE__ */ jsx("img", { className: "brand logo", size: "large", src: "/dc-logo_01.png" })
        ] }) }),
        /* @__PURE__ */ jsx(Menu$1.Item, { className: "divider", children: /* @__PURE__ */ jsx("div", {}) }),
        /* @__PURE__ */ jsx(Menu$1.Item, { fitted: true, href: "/", children: /* @__PURE__ */ jsx("div", { className: "site name", children: settings.name }) }),
        /* @__PURE__ */ jsx(Menu$1.Menu, { className: "pages", children: /* @__PURE__ */ jsx(PageConsumer, { children: /* @__PURE__ */ jsx(
          MenuItems,
          {
            settings,
            active: slug2,
            selected,
            onSetSelected: setSelected
          }
        ) }) }),
        /* @__PURE__ */ jsx(Menu$1.Item, { children: /* @__PURE__ */ jsx(PageConsumer, { children: /* @__PURE__ */ jsx(Selector, { locale: intl.locale }) }) }),
        /* @__PURE__ */ jsx(Menu$1.Item, { fitted: true, children: /* @__PURE__ */ jsx(SearchComponent, {}) })
      ] }) }),
      /* @__PURE__ */ jsx(Container, { fluid: true, className: "child", children: selected && selected.child_items && /* @__PURE__ */ jsx(Menu$1, { fluid: true, text: true, children: /* @__PURE__ */ jsx(
        MenuItems,
        {
          active: slug2,
          locale: intl.locale,
          withIcons: true,
          onSetSelected: (e) => null,
          menu: { items: selected.child_items }
        }
      ) }) })
    ] }),
    /* @__PURE__ */ jsx(Container, { className: "url breadcrumbs", children: /* @__PURE__ */ jsx(PageConsumer, { children: /* @__PURE__ */ jsx(BreadCrumbs, {}, slug2) }) })
  ] }) });
};
const ClassicHeader = injectIntl(withRouter(Header$2));
const localReplaceLink = (url, locale) => {
  if (url) {
    if (!url.substr(url.indexOf("/wp") + 3).startsWith("/" + locale)) {
      return "/" + locale + url.substr(url.indexOf("/wp") + 3);
    }
    return url.substr(url.indexOf("/wp") + 3);
  }
  return "";
};
const FloatingMenu = (props) => {
  const {
    settings,
    withIcons,
    active,
    menu,
    onSetSelected,
    selected,
    match,
    locale
  } = props;
  return menu.items.filter((i) => i.url !== "#wpm-languages").map((i) => {
    return /* @__PURE__ */ jsxs(
      Menu$1.Item,
      {
        className: `divided ${i.child_items ? "has-child-items" : ""} ${selected && selected.ID === i.ID ? "selected" : ""}  ${active === i.slug ? "active" : ""}`,
        children: [
          !i.child_items && /* @__PURE__ */ jsx("a", { onClick: (e) => onSetSelected(i), href: localReplaceLink(i.url, locale), children: i.title }),
          i.child_items && /* @__PURE__ */ jsx(
            Popup,
            {
              position: "top center",
              className: "floating child",
              positionFixed: true,
              hoverable: true,
              trigger: /* @__PURE__ */ jsx("span", { children: i.title }),
              children: i.child_items.map((ch) => /* @__PURE__ */ jsxs(Menu$1.Item, { children: [
                ch.icon && /* @__PURE__ */ jsx("img", { className: "child icon", src: ch.icon.url }),
                /* @__PURE__ */ jsxs("span", { children: [
                  " ",
                  /* @__PURE__ */ jsx("a", { onClick: (e) => onSetSelected(i), href: localReplaceLink(ch.url, locale), children: ch.title })
                ] })
              ] }))
            }
          )
        ]
      }
    );
  });
};
const HeaderFloatingMenu = ({
  intl: { locale },
  settings
}) => {
  const [selected, setSelected] = useState();
  const { slug: slug2 } = useParams();
  const Logo = ({ media }) => {
    return media ? /* @__PURE__ */ jsx(Image, { src: media.guid.rendered }) : /* @__PURE__ */ jsx("img", { className: "brand logo", size: "large", src: "/logo_full.png" });
  };
  return /* @__PURE__ */ jsx(MenuProvider$1, { slug: "main", locale, children: /* @__PURE__ */ jsxs(Menu$1, { className: "header floating branding", text: true, children: [
    /* @__PURE__ */ jsx(Menu$1.Item, { className: "logo", children: /* @__PURE__ */ jsxs("a", { href: `/${locale}`, children: [
      settings.site_logo !== 0 && /* @__PURE__ */ jsx(MediaProvider$1, { id: settings.site_logo, children: /* @__PURE__ */ jsx(MediaConsumer, { children: /* @__PURE__ */ jsx(Logo, {}) }) }),
      !window.isCustomizedPreview && settings.site_logo === 0 && /* @__PURE__ */ jsx("img", { className: "brand logo", size: "large", src: "/dc-logo_01.png" })
    ] }) }),
    /* @__PURE__ */ jsx(Menu$1.Item, { className: "divider", children: /* @__PURE__ */ jsx("div", {}) }),
    /* @__PURE__ */ jsx(Menu$1.Item, { className: "site name", fitted: true, href: "/", children: settings.name }),
    /* @__PURE__ */ jsx(Menu$1.Item, { className: "pages", children: /* @__PURE__ */ jsx(PageConsumer, { children: /* @__PURE__ */ jsx(
      FloatingMenu,
      {
        settings,
        active: slug2,
        selected,
        onSetSelected: setSelected,
        locale
      }
    ) }) }),
    /* @__PURE__ */ jsx(Menu$1.Item, { className: "lang switcher", children: /* @__PURE__ */ jsx(PageConsumer, { children: /* @__PURE__ */ jsx(Selector, { locale }) }) }),
    /* @__PURE__ */ jsx(Menu$1.Item, { fitted: true, children: /* @__PURE__ */ jsx(SearchComponent, {}) })
  ] }) });
};
const FloatingHeader = injectIntl(withRouter(HeaderFloatingMenu));
const Header = (props) => {
  const { settings } = props;
  const { react_menu_type } = settings;
  if (react_menu_type === "floating") {
    return /* @__PURE__ */ jsx(FloatingHeader, { ...props });
  }
  return /* @__PURE__ */ jsx(ClassicHeader, { ...props });
};
const Header$1 = injectIntl(withRouter(Header));
const TopNavigator = () => {
  useEffect(() => {
    const handleScroll = () => {
      const topNavigator = document.getElementById("top-navigator");
      if (window.pageYOffset > 150) {
        topNavigator.classList.add("visible");
      } else {
        topNavigator.classList.remove("visible");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const scrollToTop = () => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start", inline: "start" });
  };
  return /* @__PURE__ */ jsx("div", { id: "top-navigator", className: "top-navigator", children: /* @__PURE__ */ jsx(Menu$1, { children: /* @__PURE__ */ jsx(Menu$1.Item, { onClick: scrollToTop, children: "Back to the top" }) }) });
};
const DesktopContainer = ({ children, fixed }) => {
  return /* @__PURE__ */ jsxs(Container, { fluid: true, children: [
    /* @__PURE__ */ jsx(SettingsConsumer, { children: /* @__PURE__ */ jsx(CustomizerWrapper, { children: /* @__PURE__ */ jsx(Header$1, {}) }) }),
    /* @__PURE__ */ jsx(Container, { className: "desktop", children }),
    /* @__PURE__ */ jsx(TopNavigator, {})
  ] });
};
DesktopContainer.propTypes = {
  children: PropTypes.node
};
function ResponsiveContainer(props) {
  const { children, fixed, locale, pages } = props;
  const page = pages ? pages[0] : null;
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("style", { children: Media.mediaStyles }),
    /* @__PURE__ */ jsx(DesktopContainer, { fixed, children }),
    page && page.template === "noofoter.php" ? "" : /* @__PURE__ */ jsx(Footer$1, {})
  ] });
}
const Home = () => {
  const pathParams = useParams();
  const locale = pathParams.lan;
  return /* @__PURE__ */ jsx(PageProvider$1, {
    slug: "home",
    locale,
    store: "home",
    children: /* @__PURE__ */ jsx(PageConsumer$1, {
      children: /* @__PURE__ */ jsx(ResponsiveContainer, {
        children: /* @__PURE__ */ jsx(PageConsumer$1, {
          children: /* @__PURE__ */ jsx(Page$3, {})
        })
      })
    })
  });
};
const home = withComponentProps(Home);
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home
}, Symbol.toStringTag, { value: "Module" }));
const PreviewComponentParameterParser = () => {
  const urlParams = useParams();
  const location = useLocation();
  const componentRef = useRef(getComponentByNameIgnoreCase(urlParams.name ? urlParams.name : ""));
  const UIComponent = componentRef.current;
  const [params, setParams] = useState(queryString.parse(location.search));
  const readMessage = (event) => {
    console.log("-------------------------------reading message ----------------------------------------");
    const data2 = event.data;
    if (data2.messageType && data2.messageType == "component-attributes") {
      const newPrams = {
        ...params
      };
      Object.keys(data2).forEach((k) => {
        newPrams["data-" + k.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()] = typeof data2[k] == "object" ? JSON.stringify(data2[k]) : data2[k];
      });
      console.log(newPrams);
      setParams(newPrams);
    }
  };
  useEffect(() => {
    window.addEventListener("message", readMessage, false);
    if (window.parent) {
      window.parent.postMessage({
        type: "componentReady",
        value: true
      }, "*");
    }
    return () => {
      window.removeEventListener("message", readMessage);
    };
  }, []);
  return /* @__PURE__ */ jsx("div", {
    children: /* @__PURE__ */ jsx(Container, {
      fluid: true,
      className: "editing",
      children: UIComponent ? /* @__PURE__ */ jsx(UIComponent, {
        ...params,
        editing: true
      }) : /* @__PURE__ */ jsx(Segment.Group, {
        color: "red",
        textAlign: "center",
        children: /* @__PURE__ */ jsx("h1", {
          children: "Wrong Component Name"
        })
      })
    })
  });
};
const Embeddable = () => {
  return /* @__PURE__ */ jsx(SettingsConsumer, {
    children: /* @__PURE__ */ jsx(PreviewComponentParameterParser, {})
  });
};
const embeddable = withComponentProps(Embeddable);
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: embeddable
}, Symbol.toStringTag, { value: "Module" }));
const CategoryPage = () => {
  return /* @__PURE__ */ jsx(ResponsiveContainer, {
    children: /* @__PURE__ */ jsx(Category, {})
  });
};
const category = withComponentProps(CategoryPage);
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: category
}, Symbol.toStringTag, { value: "Module" }));
const PreviewPageContainer = () => {
  const location = useLocation();
  const { id } = useParams();
  const searchParams = new URLSearchParams(location.search);
  const preview = searchParams.get("preview");
  const previewNonce = searchParams.get("_wpnonce");
  return /* @__PURE__ */ jsx(ResponsiveContainer, { children: /* @__PURE__ */ jsx(
    PageProvider$1,
    {
      store: "preview",
      perPage: 1,
      view: preview,
      previewNonce,
      previewId: id,
      children: /* @__PURE__ */ jsx(PageConsumer$1, { children: /* @__PURE__ */ jsx(Page$3, { preview: true }) })
    }
  ) });
};
const Page$1 = () => {
  return /* @__PURE__ */ jsx(PreviewPageContainer, {});
};
const previewPage = withComponentProps(Page$1);
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: previewPage
}, Symbol.toStringTag, { value: "Module" }));
const Page = () => {
  return /* @__PURE__ */ jsx(PreviewPageContainer, {});
};
const previewType = withComponentProps(Page);
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: previewType
}, Symbol.toStringTag, { value: "Module" }));
const SlugContainer = () => {
  const { locale, slug: slug2 } = useParams();
  return /* @__PURE__ */ jsx(
    PageProvider$1,
    {
      locale,
      slug: slug2,
      store: slug2,
      children: /* @__PURE__ */ jsx(ResponsiveContainer, { children: /* @__PURE__ */ jsx(PageConsumer$1, { children: /* @__PURE__ */ jsx(Page$3, {}) }) })
    }
  );
};
const Slug$1 = () => {
  return /* @__PURE__ */ jsx(SlugContainer, {});
};
const slug = withComponentProps(Slug$1);
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: slug
}, Symbol.toStringTag, { value: "Module" }));
const Slug = () => {
  return /* @__PURE__ */ jsx(SlugContainer, {});
};
const parentSlug = withComponentProps(Slug);
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: parentSlug
}, Symbol.toStringTag, { value: "Module" }));
const SlugPostContainer = () => {
  const { locale, slug: slug2 } = useParams();
  return /* @__PURE__ */ jsx(ResponsiveContainer, { children: /* @__PURE__ */ jsx(
    PostProvider$2,
    {
      slug: slug2,
      store: slug2,
      locale,
      children: /* @__PURE__ */ jsx(PostConsumer, { children: /* @__PURE__ */ jsx(Wrapper, {}) })
    }
  ) });
};
const SlugPost$1 = () => {
  return /* @__PURE__ */ jsx(SlugPostContainer, {});
};
const slugPost = withComponentProps(SlugPost$1);
const route9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: slugPost
}, Symbol.toStringTag, { value: "Module" }));
const SlugPost = () => {
  return /* @__PURE__ */ jsx(SlugPostContainer, {});
};
const parentSlugPost = withComponentProps(SlugPost);
const route10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: parentSlugPost
}, Symbol.toStringTag, { value: "Module" }));
var define_process_env_default = { VITE_PROTOCOL: "https", VITE_DOMAIN: "et.tcdi.dgstg.org", VITE_REACT_APP_TITLE: "Tobacco Control Data Initiative", VITE_REACT_APP_WP_API: "https://et.tcdi.dgstg.org/wp/wp-json", VITE_REACT_APP_WP_STYLES: "https://et.tcdi.dgstg.org/wp/wp-admin/load-styles.php?c=1&dir=ltr&load%5Bchunk_0%5D=dashicons,admin-bar,buttons,media-views,editor-buttons,wp-components,wp-block-editor,wp-nux,wp-editor,wp-block-library,wp-block-&load%5Bchunk_1%5D=library-theme,wp-edit-blocks,wp-edit-post,wp-format-library,wp-block-directory,common,forms,admin-menu,dashboard,list-tables,edi&load%5Bchunk_2%5D=t,revisions,media,themes,about,nav-menus,wp-pointer,widgets,site-icon,l10n,wp-auth-check&ver=5.5.6' id='wp-block-library-css", VITE_REACT_APP_GA_CODE: "en", VITE_REACT_APP_DEFAULT_LOCALE: "en", VITE_REACT_APP_WP_HOSTS: "https://et.tcdi.dgstg.org", VITE_REACT_APP_USE_HASH_LINKS: "false", VITE_REACT_APP_THEME: "cash", VITE_REACT_APP_WP_SEARCH_END_POINT: "/dg/v1/search", VITE_REACT_APP_API_ROOT: "https://et.tcdi.dgstg.org" };
const messages = {
  "en": messages_en
};
const InjectTitle = injectIntl((props) => {
  document.title = props.settings.description;
  console.log(props);
  return /* @__PURE__ */ jsx(Fragment, {});
});
const IntlRoutes = () => {
  const pathParams = useParams();
  const locale = pathParams.lan;
  console.log("locale", locale);
  useEffect(() => {
    if (define_process_env_default) {
      console.log("----------.env-----------");
      console.log(define_process_env_default);
      console.log("----------.env-----------");
    }
    window.setTimeout(() => {
      if (window.location.hash) {
        const element = document.getElementById(window.location.hash.substr(1));
        if (element) {
          element.scrollIntoView({ behavior: "auto", block: "start" });
        }
      }
    }, 2e3);
  }, []);
  useEffect(() => {
    store.dispatch(updateIntl({ locale, formats: {}, messages: messages[locale ? locale : "en"] }));
  });
  const urlParams = new URLSearchParams(window.location.search);
  const customize_changeset_uuid = urlParams.get("customize_changeset_uuid");
  useEffect(() => {
    window.isCustomizedPreview = customize_changeset_uuid != null;
  }, [customize_changeset_uuid]);
  if (!locale) {
    return /* @__PURE__ */ jsx(Navigate, { to: "/en" });
  }
  return /* @__PURE__ */ jsx(IntlProvider, { locale, messages: messages[locale], children: /* @__PURE__ */ jsx(AppContextProvider, { getComponent: getComponentByNameIgnoreCase, store, locale, children: /* @__PURE__ */ jsxs(SettingProvider, { locale, changeUUID: customize_changeset_uuid, children: [
    /* @__PURE__ */ jsx(ScrollToTopOnMount, {}),
    /* @__PURE__ */ jsx(SettingsConsumer, { children: /* @__PURE__ */ jsx(CustomizerWrapper, { children: /* @__PURE__ */ jsx(InjectTitle, {}) }) }),
    /* @__PURE__ */ jsx(Routes, {})
  ] }) }) }, locale);
};
const WithTrackerRoutes = IntlRoutes;
const MainRoutes = (props) => {
  return (
    // <BrowserRouter>
    /* @__PURE__ */ jsxs(Routes, { children: [
      /* @__PURE__ */ jsx(Route, { path: "/:lan/*", element: /* @__PURE__ */ jsx(WithTrackerRoutes, { ...props }) }),
      /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(WithTrackerRoutes, { ...props }) })
    ] })
  );
};
const App = () => {
  return /* @__PURE__ */ jsx(Provider_default, { store, children: /* @__PURE__ */ jsx(MainRoutes, {}) });
};
const catchall = withComponentProps(function Component2() {
  return /* @__PURE__ */ jsx(App, {});
});
const route11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: catchall
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-D4Hjy_mC.js", "imports": ["/assets/chunk-7R3XDUXW-85qaCB-t.js", "/assets/client-CcYH0xgS.js"], "css": ["/assets/entry-fKpLsuHa.css"] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-ByU4W5nH.js", "imports": ["/assets/chunk-7R3XDUXW-85qaCB-t.js", "/assets/client-CcYH0xgS.js", "/assets/with-props-CSE4RsWe.js"], "css": ["/assets/entry-fKpLsuHa.css"] }, "App": { "id": "App", "parentId": "root", "path": "/:lan", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/App-oTX7_9ou.js", "imports": ["/assets/with-props-CSE4RsWe.js", "/assets/chunk-7R3XDUXW-85qaCB-t.js", "/assets/en-CIgOGTRU.js", "/assets/store-eU0DPv0P.js", "/assets/wordpress-DZPNJBHW.js", "/assets/Customizer-XCOE03xk.js", "/assets/index-JlEuLxAr.js", "/assets/index-ClSaJmOD.js", "/assets/client-CcYH0xgS.js"], "css": [] }, "pages/home": { "id": "pages/home", "parentId": "App", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/home-BR6qTiQh.js", "imports": ["/assets/with-props-CSE4RsWe.js", "/assets/chunk-7R3XDUXW-85qaCB-t.js", "/assets/wordpress-DZPNJBHW.js", "/assets/PageConsumer-DvW5y_yM.js", "/assets/ResponsiveContainer-WTCewJa8.js", "/assets/client-CcYH0xgS.js", "/assets/Segment-DyMpxGgO.js", "/assets/index-ClSaJmOD.js", "/assets/Container-D33RczEq.js", "/assets/getUnhandledProps--j4lvtul.js", "/assets/MediaConsumer-It8p4rpk.js", "/assets/MenuConsumer-C0M_VAjt.js", "/assets/_baseCreate-CaSLcuhJ.js", "/assets/isNumber-BqgcjeSx.js", "/assets/Portal-DrxL-g02.js", "/assets/useEventCallback-ihaB8OGi.js", "/assets/factories-rJoY8nog.js", "/assets/useAutoControlledValue-CauayDM9.js", "/assets/toFinite-Clt8wi9-.js", "/assets/without-B13Hs7qI.js", "/assets/Dropdown-Dw-U_Gk6.js", "/assets/includes-CDRNhx2B.js", "/assets/map-FZkdr2LM.js", "/assets/deburr-C-DddBA_.js", "/assets/index-SSrIL4Pu.js", "/assets/_arrayReduce-CrxnWFSq.js", "/assets/isUndefined-DCTLXrZ8.js", "/assets/Icon-CjSjdwlo.js", "/assets/Label-DeriV2Os.js", "/assets/Dimmer-u2VHuMMk.js", "/assets/Input-Da9C_vns.js", "/assets/Button-DGDmDQBb.js", "/assets/Menu-939_AlXw.js", "/assets/Popup-BU8Inh6C.js", "/assets/isRefObject-EYY9B_GJ.js", "/assets/Customizer-XCOE03xk.js"], "css": [] }, "pages/embeddable": { "id": "pages/embeddable", "parentId": "App", "path": "embeddable/:name", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/embeddable-Bol6OahL.js", "imports": ["/assets/with-props-CSE4RsWe.js", "/assets/chunk-7R3XDUXW-85qaCB-t.js", "/assets/index-JlEuLxAr.js", "/assets/wordpress-DZPNJBHW.js", "/assets/Container-D33RczEq.js", "/assets/Segment-APibsb9w.js", "/assets/client-CcYH0xgS.js", "/assets/getUnhandledProps--j4lvtul.js"], "css": [] }, "pages/category": { "id": "pages/category", "parentId": "App", "path": "category/:slug", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/category-D8A3mAFD.js", "imports": ["/assets/with-props-CSE4RsWe.js", "/assets/chunk-7R3XDUXW-85qaCB-t.js", "/assets/ResponsiveContainer-WTCewJa8.js", "/assets/wordpress-DZPNJBHW.js", "/assets/PostProvider-cWnQQsdC.js", "/assets/Post-BaC2eMgY.js", "/assets/index-ClSaJmOD.js", "/assets/PageConsumer-DvW5y_yM.js", "/assets/Segment-DyMpxGgO.js", "/assets/Container-D33RczEq.js", "/assets/getUnhandledProps--j4lvtul.js", "/assets/MediaConsumer-It8p4rpk.js", "/assets/MenuConsumer-C0M_VAjt.js", "/assets/_baseCreate-CaSLcuhJ.js", "/assets/isNumber-BqgcjeSx.js", "/assets/Portal-DrxL-g02.js", "/assets/useEventCallback-ihaB8OGi.js", "/assets/factories-rJoY8nog.js", "/assets/client-CcYH0xgS.js", "/assets/useAutoControlledValue-CauayDM9.js", "/assets/toFinite-Clt8wi9-.js", "/assets/without-B13Hs7qI.js", "/assets/Dropdown-Dw-U_Gk6.js", "/assets/includes-CDRNhx2B.js", "/assets/map-FZkdr2LM.js", "/assets/deburr-C-DddBA_.js", "/assets/index-SSrIL4Pu.js", "/assets/_arrayReduce-CrxnWFSq.js", "/assets/isUndefined-DCTLXrZ8.js", "/assets/Icon-CjSjdwlo.js", "/assets/Label-DeriV2Os.js", "/assets/Dimmer-u2VHuMMk.js", "/assets/Input-Da9C_vns.js", "/assets/Button-DGDmDQBb.js", "/assets/Menu-939_AlXw.js", "/assets/Popup-BU8Inh6C.js", "/assets/isRefObject-EYY9B_GJ.js", "/assets/Customizer-XCOE03xk.js"], "css": [] }, "pages/preview-page": { "id": "pages/preview-page", "parentId": "App", "path": "preview/page/:id", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/preview-page-C6R_GXR-.js", "imports": ["/assets/with-props-CSE4RsWe.js", "/assets/chunk-7R3XDUXW-85qaCB-t.js", "/assets/PreviewPageContainer-PkNIXoDm.js", "/assets/ResponsiveContainer-WTCewJa8.js", "/assets/index-ClSaJmOD.js", "/assets/wordpress-DZPNJBHW.js", "/assets/client-CcYH0xgS.js", "/assets/PageConsumer-DvW5y_yM.js", "/assets/Segment-DyMpxGgO.js", "/assets/Container-D33RczEq.js", "/assets/getUnhandledProps--j4lvtul.js", "/assets/MediaConsumer-It8p4rpk.js", "/assets/MenuConsumer-C0M_VAjt.js", "/assets/_baseCreate-CaSLcuhJ.js", "/assets/isNumber-BqgcjeSx.js", "/assets/Portal-DrxL-g02.js", "/assets/useEventCallback-ihaB8OGi.js", "/assets/factories-rJoY8nog.js", "/assets/useAutoControlledValue-CauayDM9.js", "/assets/toFinite-Clt8wi9-.js", "/assets/without-B13Hs7qI.js", "/assets/Dropdown-Dw-U_Gk6.js", "/assets/includes-CDRNhx2B.js", "/assets/map-FZkdr2LM.js", "/assets/deburr-C-DddBA_.js", "/assets/index-SSrIL4Pu.js", "/assets/_arrayReduce-CrxnWFSq.js", "/assets/isUndefined-DCTLXrZ8.js", "/assets/Icon-CjSjdwlo.js", "/assets/Label-DeriV2Os.js", "/assets/Dimmer-u2VHuMMk.js", "/assets/Input-Da9C_vns.js", "/assets/Button-DGDmDQBb.js", "/assets/Menu-939_AlXw.js", "/assets/Popup-BU8Inh6C.js", "/assets/isRefObject-EYY9B_GJ.js", "/assets/Customizer-XCOE03xk.js"], "css": [] }, "pages/preview-type": { "id": "pages/preview-type", "parentId": "App", "path": "preview/:type/:id", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/preview-type-CUaUspGF.js", "imports": ["/assets/with-props-CSE4RsWe.js", "/assets/chunk-7R3XDUXW-85qaCB-t.js", "/assets/PreviewPageContainer-PkNIXoDm.js", "/assets/ResponsiveContainer-WTCewJa8.js", "/assets/index-ClSaJmOD.js", "/assets/wordpress-DZPNJBHW.js", "/assets/client-CcYH0xgS.js", "/assets/PageConsumer-DvW5y_yM.js", "/assets/Segment-DyMpxGgO.js", "/assets/Container-D33RczEq.js", "/assets/getUnhandledProps--j4lvtul.js", "/assets/MediaConsumer-It8p4rpk.js", "/assets/MenuConsumer-C0M_VAjt.js", "/assets/_baseCreate-CaSLcuhJ.js", "/assets/isNumber-BqgcjeSx.js", "/assets/Portal-DrxL-g02.js", "/assets/useEventCallback-ihaB8OGi.js", "/assets/factories-rJoY8nog.js", "/assets/useAutoControlledValue-CauayDM9.js", "/assets/toFinite-Clt8wi9-.js", "/assets/without-B13Hs7qI.js", "/assets/Dropdown-Dw-U_Gk6.js", "/assets/includes-CDRNhx2B.js", "/assets/map-FZkdr2LM.js", "/assets/deburr-C-DddBA_.js", "/assets/index-SSrIL4Pu.js", "/assets/_arrayReduce-CrxnWFSq.js", "/assets/isUndefined-DCTLXrZ8.js", "/assets/Icon-CjSjdwlo.js", "/assets/Label-DeriV2Os.js", "/assets/Dimmer-u2VHuMMk.js", "/assets/Input-Da9C_vns.js", "/assets/Button-DGDmDQBb.js", "/assets/Menu-939_AlXw.js", "/assets/Popup-BU8Inh6C.js", "/assets/isRefObject-EYY9B_GJ.js", "/assets/Customizer-XCOE03xk.js"], "css": [] }, "pages/slug": { "id": "pages/slug", "parentId": "App", "path": ":slug", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/slug-CxEysfm8.js", "imports": ["/assets/with-props-CSE4RsWe.js", "/assets/chunk-7R3XDUXW-85qaCB-t.js", "/assets/SlugContainer-DZjaLLEL.js", "/assets/wordpress-DZPNJBHW.js", "/assets/client-CcYH0xgS.js", "/assets/PageConsumer-DvW5y_yM.js", "/assets/Segment-DyMpxGgO.js", "/assets/ResponsiveContainer-WTCewJa8.js", "/assets/index-ClSaJmOD.js", "/assets/Container-D33RczEq.js", "/assets/getUnhandledProps--j4lvtul.js", "/assets/MediaConsumer-It8p4rpk.js", "/assets/MenuConsumer-C0M_VAjt.js", "/assets/_baseCreate-CaSLcuhJ.js", "/assets/isNumber-BqgcjeSx.js", "/assets/Portal-DrxL-g02.js", "/assets/useEventCallback-ihaB8OGi.js", "/assets/factories-rJoY8nog.js", "/assets/useAutoControlledValue-CauayDM9.js", "/assets/toFinite-Clt8wi9-.js", "/assets/without-B13Hs7qI.js", "/assets/Dropdown-Dw-U_Gk6.js", "/assets/includes-CDRNhx2B.js", "/assets/map-FZkdr2LM.js", "/assets/deburr-C-DddBA_.js", "/assets/index-SSrIL4Pu.js", "/assets/_arrayReduce-CrxnWFSq.js", "/assets/isUndefined-DCTLXrZ8.js", "/assets/Icon-CjSjdwlo.js", "/assets/Label-DeriV2Os.js", "/assets/Dimmer-u2VHuMMk.js", "/assets/Input-Da9C_vns.js", "/assets/Button-DGDmDQBb.js", "/assets/Menu-939_AlXw.js", "/assets/Popup-BU8Inh6C.js", "/assets/isRefObject-EYY9B_GJ.js", "/assets/Customizer-XCOE03xk.js"], "css": [] }, "pages/parent-slug": { "id": "pages/parent-slug", "parentId": "App", "path": ":parent/:slug", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/parent-slug-CxEysfm8.js", "imports": ["/assets/with-props-CSE4RsWe.js", "/assets/chunk-7R3XDUXW-85qaCB-t.js", "/assets/SlugContainer-DZjaLLEL.js", "/assets/wordpress-DZPNJBHW.js", "/assets/client-CcYH0xgS.js", "/assets/PageConsumer-DvW5y_yM.js", "/assets/Segment-DyMpxGgO.js", "/assets/ResponsiveContainer-WTCewJa8.js", "/assets/index-ClSaJmOD.js", "/assets/Container-D33RczEq.js", "/assets/getUnhandledProps--j4lvtul.js", "/assets/MediaConsumer-It8p4rpk.js", "/assets/MenuConsumer-C0M_VAjt.js", "/assets/_baseCreate-CaSLcuhJ.js", "/assets/isNumber-BqgcjeSx.js", "/assets/Portal-DrxL-g02.js", "/assets/useEventCallback-ihaB8OGi.js", "/assets/factories-rJoY8nog.js", "/assets/useAutoControlledValue-CauayDM9.js", "/assets/toFinite-Clt8wi9-.js", "/assets/without-B13Hs7qI.js", "/assets/Dropdown-Dw-U_Gk6.js", "/assets/includes-CDRNhx2B.js", "/assets/map-FZkdr2LM.js", "/assets/deburr-C-DddBA_.js", "/assets/index-SSrIL4Pu.js", "/assets/_arrayReduce-CrxnWFSq.js", "/assets/isUndefined-DCTLXrZ8.js", "/assets/Icon-CjSjdwlo.js", "/assets/Label-DeriV2Os.js", "/assets/Dimmer-u2VHuMMk.js", "/assets/Input-Da9C_vns.js", "/assets/Button-DGDmDQBb.js", "/assets/Menu-939_AlXw.js", "/assets/Popup-BU8Inh6C.js", "/assets/isRefObject-EYY9B_GJ.js", "/assets/Customizer-XCOE03xk.js"], "css": [] }, "pages/slug-post": { "id": "pages/slug-post", "parentId": "App", "path": ":year/:month/:day/:slug", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/slug-post-CJzdgJ6U.js", "imports": ["/assets/with-props-CSE4RsWe.js", "/assets/chunk-7R3XDUXW-85qaCB-t.js", "/assets/SlugPostContainer-BzWdJdPB.js", "/assets/ResponsiveContainer-WTCewJa8.js", "/assets/index-ClSaJmOD.js", "/assets/wordpress-DZPNJBHW.js", "/assets/client-CcYH0xgS.js", "/assets/PageConsumer-DvW5y_yM.js", "/assets/Segment-DyMpxGgO.js", "/assets/Container-D33RczEq.js", "/assets/getUnhandledProps--j4lvtul.js", "/assets/MediaConsumer-It8p4rpk.js", "/assets/MenuConsumer-C0M_VAjt.js", "/assets/_baseCreate-CaSLcuhJ.js", "/assets/isNumber-BqgcjeSx.js", "/assets/Portal-DrxL-g02.js", "/assets/useEventCallback-ihaB8OGi.js", "/assets/factories-rJoY8nog.js", "/assets/useAutoControlledValue-CauayDM9.js", "/assets/toFinite-Clt8wi9-.js", "/assets/without-B13Hs7qI.js", "/assets/Dropdown-Dw-U_Gk6.js", "/assets/includes-CDRNhx2B.js", "/assets/map-FZkdr2LM.js", "/assets/deburr-C-DddBA_.js", "/assets/index-SSrIL4Pu.js", "/assets/_arrayReduce-CrxnWFSq.js", "/assets/isUndefined-DCTLXrZ8.js", "/assets/Icon-CjSjdwlo.js", "/assets/Label-DeriV2Os.js", "/assets/Dimmer-u2VHuMMk.js", "/assets/Input-Da9C_vns.js", "/assets/Button-DGDmDQBb.js", "/assets/Menu-939_AlXw.js", "/assets/Popup-BU8Inh6C.js", "/assets/isRefObject-EYY9B_GJ.js", "/assets/Customizer-XCOE03xk.js", "/assets/Post-BaC2eMgY.js", "/assets/PostProvider-cWnQQsdC.js"], "css": [] }, "pages/parent-slug-post": { "id": "pages/parent-slug-post", "parentId": "App", "path": ":parent/:year/:month/:day/:slug", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/parent-slug-post-CJzdgJ6U.js", "imports": ["/assets/with-props-CSE4RsWe.js", "/assets/chunk-7R3XDUXW-85qaCB-t.js", "/assets/SlugPostContainer-BzWdJdPB.js", "/assets/ResponsiveContainer-WTCewJa8.js", "/assets/index-ClSaJmOD.js", "/assets/wordpress-DZPNJBHW.js", "/assets/client-CcYH0xgS.js", "/assets/PageConsumer-DvW5y_yM.js", "/assets/Segment-DyMpxGgO.js", "/assets/Container-D33RczEq.js", "/assets/getUnhandledProps--j4lvtul.js", "/assets/MediaConsumer-It8p4rpk.js", "/assets/MenuConsumer-C0M_VAjt.js", "/assets/_baseCreate-CaSLcuhJ.js", "/assets/isNumber-BqgcjeSx.js", "/assets/Portal-DrxL-g02.js", "/assets/useEventCallback-ihaB8OGi.js", "/assets/factories-rJoY8nog.js", "/assets/useAutoControlledValue-CauayDM9.js", "/assets/toFinite-Clt8wi9-.js", "/assets/without-B13Hs7qI.js", "/assets/Dropdown-Dw-U_Gk6.js", "/assets/includes-CDRNhx2B.js", "/assets/map-FZkdr2LM.js", "/assets/deburr-C-DddBA_.js", "/assets/index-SSrIL4Pu.js", "/assets/_arrayReduce-CrxnWFSq.js", "/assets/isUndefined-DCTLXrZ8.js", "/assets/Icon-CjSjdwlo.js", "/assets/Label-DeriV2Os.js", "/assets/Dimmer-u2VHuMMk.js", "/assets/Input-Da9C_vns.js", "/assets/Button-DGDmDQBb.js", "/assets/Menu-939_AlXw.js", "/assets/Popup-BU8Inh6C.js", "/assets/isRefObject-EYY9B_GJ.js", "/assets/Customizer-XCOE03xk.js", "/assets/Post-BaC2eMgY.js", "/assets/PostProvider-cWnQQsdC.js"], "css": [] }, "catchall": { "id": "catchall", "parentId": "root", "path": "*?", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/catchall-DRea0T5x.js", "imports": ["/assets/with-props-CSE4RsWe.js", "/assets/chunk-7R3XDUXW-85qaCB-t.js", "/assets/wordpress-DZPNJBHW.js", "/assets/store-eU0DPv0P.js", "/assets/en-CIgOGTRU.js", "/assets/index-JlEuLxAr.js", "/assets/Customizer-XCOE03xk.js", "/assets/client-CcYH0xgS.js", "/assets/index-ClSaJmOD.js"], "css": [] } }, "url": "/assets/manifest-cf5c13a7.js", "version": "cf5c13a7" };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "unstable_optimizeDeps": true };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "App": {
    id: "App",
    parentId: "root",
    path: "/:lan",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "pages/home": {
    id: "pages/home",
    parentId: "App",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route2
  },
  "pages/embeddable": {
    id: "pages/embeddable",
    parentId: "App",
    path: "embeddable/:name",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "pages/category": {
    id: "pages/category",
    parentId: "App",
    path: "category/:slug",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "pages/preview-page": {
    id: "pages/preview-page",
    parentId: "App",
    path: "preview/page/:id",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "pages/preview-type": {
    id: "pages/preview-type",
    parentId: "App",
    path: "preview/:type/:id",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "pages/slug": {
    id: "pages/slug",
    parentId: "App",
    path: ":slug",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "pages/parent-slug": {
    id: "pages/parent-slug",
    parentId: "App",
    path: ":parent/:slug",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  },
  "pages/slug-post": {
    id: "pages/slug-post",
    parentId: "App",
    path: ":year/:month/:day/:slug",
    index: void 0,
    caseSensitive: void 0,
    module: route9
  },
  "pages/parent-slug-post": {
    id: "pages/parent-slug-post",
    parentId: "App",
    path: ":parent/:year/:month/:day/:slug",
    index: void 0,
    caseSensitive: void 0,
    module: route10
  },
  "catchall": {
    id: "catchall",
    parentId: "root",
    path: "*?",
    index: void 0,
    caseSensitive: void 0,
    module: route11
  }
};
export {
  basename as A,
  future as B,
  Content as C,
  isSpaMode as D,
  publicPath as E,
  entry as F,
  routes as G,
  serverManifest as H,
  MediaProvider$1 as M,
  PageProvider$1 as P,
  PageConsumer$1 as a,
  PostContent as b,
  PostProvider$2 as c,
  PostConsumer as d,
  connect_default as e,
  cleanFilter as f,
  getCategories as g,
  setFilter as h,
  sendShowCaseForm as i,
  setEmail as j,
  MediaConsumer as k,
  useDispatch as l,
  useSelector as m,
  newsletterSubscription as n,
  cleanMeasures as o,
  postLoaded as p,
  setMeasures as q,
  reset as r,
  setInitialFilters as s,
  MenuProvider$1 as t,
  utils as u,
  PageConsumer as v,
  setData as w,
  getData as x,
  messages_en as y,
  assetsBuildDirectory as z
};
