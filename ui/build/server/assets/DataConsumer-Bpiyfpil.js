import { jsx, jsxs } from "react/jsx-runtime";
import React__default from "react";
import { e as connect_default, w as setData, x as getData } from "./server-build-C_g_IF5C.js";
import { injectIntl } from "react-intl";
import { D as DataContext } from "./DataContext-BNxY-bMy.js";
import { Container, Segment, Dimmer, Loader } from "semantic-ui-react";
class DataProvider extends React__default.Component {
  constructor() {
    super();
    this.state = {
      showLoading: false
    };
    this.checkLoadingTime = this.checkLoadingTime.bind(this);
  }
  componentDidMount() {
    const { app, source, store, params, csv, group, editing } = this.props;
    if (app === "csv") {
      this.props.onSetData({ app, csv, store, params, group });
    } else {
      this.setState({ showLoading: false });
      this.props.onLoadData({ app, source, store, params, group });
      setTimeout(this.checkLoadingTime, 100);
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { app, filters, source, store, params, csv, group, editing } = this.props;
    if (filters != prevProps.filters || JSON.stringify(params) != JSON.stringify(prevProps.params) || app != prevProps.app || prevProps.source != source || csv != prevProps.csv) {
      if (app === "csv") {
        this.props.onSetData({ app, csv, store, params, group });
      } else {
        if (editing) {
          params.v = (Math.random() + 1).toString(36).substring(7);
        }
        this.setState({ showLoading: false });
        this.props.onLoadData({ app, source, store, params, group });
        setTimeout(this.checkLoadingTime, 100);
      }
    }
  }
  checkLoadingTime() {
    const { data, loading, time, error } = this.props;
    const loadingTime = Date.now() - time;
    if (loading && time && loadingTime > 1e3) {
      this.setState({ showLoading: true });
    } else if (loading) {
      setTimeout(this.checkLoadingTime, 100);
    }
  }
  render() {
    const { data, style, loading, time, error, editing } = this.props;
    if (loading && this.state.showLoading && !editing) {
      return /* @__PURE__ */ jsx(Container, { style, className: "loading", children: /* @__PURE__ */ jsx(Segment, { basic: true, padded: true, textAlign: "center", style: { margin: "30px", ...style }, children: /* @__PURE__ */ jsx(Dimmer, { active: true, inverted: true, children: /* @__PURE__ */ jsx(Loader, { size: "medium" }) }) }) });
    } else if (!error) {
      return /* @__PURE__ */ jsx(DataContext.Provider, { value: data, children: this.props.children });
    } else if (error) {
      return /* @__PURE__ */ jsxs(Segment, { color: "red", children: [
        /* @__PURE__ */ jsx("h1", { children: "500" }),
        /* @__PURE__ */ jsx("p", { children: "Wasn't able to load data" })
      ] });
    } else {
      return /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs(Segment, { color: "red", children: [
        /* @__PURE__ */ jsx("h1", { children: "404" }),
        /* @__PURE__ */ jsx("p", { children: "Can't find this page" })
      ] }) });
    }
  }
}
const mapStateToProps = (state, ownProps) => {
  const { store, group, app } = ownProps;
  return {
    data: state.getIn(["data", ...store, "data"]),
    filters: state.getIn(["data", "filters", app, group]),
    error: state.getIn(["data", ...store, "error"]),
    loading: state.getIn(["data", ...store, "loading"]),
    time: state.getIn(["data", ...store, "time"])
  };
};
const mapActionCreators = {
  onSetData: setData,
  onLoadData: getData
};
const DataProvider$1 = connect_default(mapStateToProps, mapActionCreators)(injectIntl(DataProvider));
const DataConsumer = (props) => {
  return /* @__PURE__ */ jsx(DataContext.Consumer, { children: (data) => {
    return data && /* @__PURE__ */ jsx(React__default.Fragment, { children: React__default.Children.map(props.children, (child) => {
      return React__default.cloneElement(
        child,
        { data }
      );
    }) });
  } });
};
export {
  DataProvider$1 as D,
  DataConsumer as a
};
