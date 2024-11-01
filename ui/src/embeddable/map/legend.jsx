import React from "react";

export default class Legend extends React.Component {
  constructor(props) {
    super(props);
  }

  formatNumber(value) {
    const { intl, format } = this.props;
    return intl.formatNumber(format.style === "percent" ? value / 100 : value, {
      style: format.style,
      notation: format.notation,
      maximumFractionDigits: format.maximumFractionDigits,
      minimuFractionDigits: 0,
      currency: format.currency,
    });
  }

  render() {
    const {
      filteredBreaks,
      formattedLegendTitle,
      showLegendLabels,
      symbols,
      legendFontSize,
      legendFontWeight,
      autoGenerateBreaks,
      intl,
      numberFormat,
      mapNoDataColor,
      showNoDataLegendItem,
      noDataText,
    } = this.props;
    const legendStyle = {
      fontSize: legendFontSize + "px",
      fontWeight: legendFontWeight,
    };

    return (
      <div className="legend-container">
        <div className="legend-title-container">
          <span className="legend-title">
            {filteredBreaks && filteredBreaks.length > 0
              ? formattedLegendTitle
              : ""}
          </span>
          {filteredBreaks.length > 0 && (
            <span className="vertical-spacer">|</span>
          )}
        </div>
        <div className="legend">
          <ul className="legend-items-container">
            {filteredBreaks &&
              filteredBreaks.map((range, i) => {
                return (
                  <li key={"lg" + i} className="legend-item">
                    <span
                      className="symbol"
                      style={{ backgroundColor: range.color }}
                    ></span>
                    {showLegendLabels && !autoGenerateBreaks && (
                      <span className="legend-label" style={legendStyle}>
                        {range.label}
                      </span>
                    )}
                    {(!showLegendLabels || autoGenerateBreaks) &&
                      range.min != null &&
                      range.max != null && (
                        <span className="legend-label" style={legendStyle}>
                          {this.formatNumber(range.min)} -{" "}
                          {this.formatNumber(range.max)}
                        </span>
                      )}

                    {(!showLegendLabels || autoGenerateBreaks) &&
                      range.min == null &&
                      range.max != null && (
                        <span className="legend-label" style={legendStyle}>
                          {" "}
                          &lt; {this.formatNumber(range.max)}
                        </span>
                      )}

                    {(!showLegendLabels || autoGenerateBreaks) &&
                      range.min != null &&
                      range.max == null && (
                        <span className="legend-label" style={legendStyle}>
                          {" "}
                          &gt; {this.formatNumber(range.min)}{" "}
                        </span>
                      )}
                  </li>
                );
              })}

            {console.log("showNoDataLegendItem", showNoDataLegendItem)}
            {showNoDataLegendItem && (
              <li className="legend-item">
                <span
                  className="symbol"
                  style={{ backgroundColor: mapNoDataColor }}
                ></span>
                <span className="legend-label" style={legendStyle}>
                  {noDataText}
                </span>
              </li>
            )}

            {console.log("symbols", symbols)}
            {symbols &&
              symbols.map((symbol, i) => {
                return (
                  <li key={"k" + i} className="legend-item">
                    <span className="vertical-spacer">|</span>
                    {symbol.image && (
                      <img
                        style={{
                          width: "40px",
                          height: "40px",
                          marginTop: "-8px",
                          marginRight: "-4px",
                        }}
                        src={"/" + symbol.image}
                      ></img>
                    )}
                    <span className="legend-label" style={legendStyle}>
                      {symbol.label ? symbol.label : ""}
                    </span>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    );
  }
}