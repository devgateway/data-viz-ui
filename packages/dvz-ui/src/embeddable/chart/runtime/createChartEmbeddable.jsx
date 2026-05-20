import React from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import ChartEmbeddableRuntime from "./ChartEmbeddableRuntime";

const mapStateToProps = (state, ownProps) => {
  const { "data-app": app, "data-group": group } = ownProps;
  const injectedMeasures = state.getIn(["data", "measures", app, group]);
  const pageModuleProps = state.getIn(["data", "pageModuleProps"]);
  const runtimeProps = {};

  if (injectedMeasures && Object.keys(injectedMeasures).length > 0) {
    runtimeProps.injectedMeasures = injectedMeasures ?? {};
  }

  if (pageModuleProps) {
    runtimeProps.pageModuleProps = pageModuleProps;
  }

  return runtimeProps;
};

const mapActionCreators = {};

export default function createChartEmbeddable(defaultType = null, displayName = "ChartEmbeddable") {
  const EmbeddableChart = (props) => (
    <ChartEmbeddableRuntime {...props} forcedType={defaultType} />
  );

  EmbeddableChart.displayName = displayName;

  return connect(mapStateToProps, mapActionCreators)(injectIntl(EmbeddableChart));
}

