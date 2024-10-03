import React from 'react';

const Legend = ({ 
  filteredBreaks, 
  formattedLegendTitle, 
  showLegendLabels, 
  symbols, 
  legendFontSize,
  legendFontWeight, 
  autoGenerateBreaks, 
  intl, 
  format,
  mapNoDataColor, 
  showNoDataLegendItem, 
  noDataText
}) => {
  const legendStyle = { fontSize: `${legendFontSize}px`, fontWeight: legendFontWeight };

  const formatNumber = (value) => {
    return intl.formatNumber(format.style === 'percent' ? value / 100 : value, {
      style: format.style,
      notation: format.notation,
      maximumFractionDigits: format.maximumFractionDigits,
      minimuFractionDigits: 0,
      currency: format.currency
    });
  };

  return (
    <div>
      <div className="legend">
        <ul>
          <li>
            <span className="legend-title">
              {filteredBreaks && filteredBreaks.length > 0 ? formattedLegendTitle : ""}
            </span>
            {filteredBreaks.length > 0 && <span className="vertical-spacer">|</span>}
          </li>
          
          {filteredBreaks && filteredBreaks.map((range, i) => (
            <li key={`lg${i}`}>
              <span className="symbol" style={{ backgroundColor: range.color }}></span>
              {showLegendLabels && !autoGenerateBreaks && (
                <span className="legend-label" style={legendStyle}>{range.label}</span>
              )}
              {(!showLegendLabels || autoGenerateBreaks) && range.min != null && range.max != null && (
                <span className="legend-label" style={legendStyle}>{formatNumber(range.min)} - {formatNumber(range.max)}</span>
              )}
              {(!showLegendLabels || autoGenerateBreaks) && range.min == null && range.max != null && (
                <span className="legend-label" style={legendStyle}> &lt; {formatNumber(range.max)}</span>
              )}
              {(!showLegendLabels || autoGenerateBreaks) && range.min != null && range.max == null && (
                <span className="legend-label" style={legendStyle}> &gt; {formatNumber(range.min)} </span>
              )}
            </li>
          ))}
          
          {showNoDataLegendItem && (
            <li>
              <span className="symbol" style={{ backgroundColor: mapNoDataColor }}></span>
              <span className="legend-label" style={legendStyle}>{noDataText}</span>
            </li>
          )}
          
          {symbols && symbols.map((symbol, i) => (
            <li key={`k${i}`}>
              <span className="vertical-spacer">|</span>
              {symbol.image && (
                <img 
                  style={{width:"40px", height:"40px", marginTop:"-8px", marginRight:"-4px"}}
                  src={`/${symbol.image}`}
                  alt=""
                />
              )}
              <span className="legend-label" style={legendStyle}>{symbol.label || ""}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Legend;
