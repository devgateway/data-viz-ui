import React from "react";

const Legends = ({
  filter,
  showLegends,
  chartLegends,
  legendLabel,
  legendPosition,
  legendCheckBack,
  legendLabelBack,
  legendLabelColor,
  onToggle,
  reverseLegend,
}) => {
  const legendTitle = () => {
    return (
      <>
        {showLegends && legendLabel && (
          <div className={"legend item"}>
            <label className="legend-title">{legendLabel}</label>
          </div>
        )}
      </>
    );
  };
  const legendItems = () => {
    if (reverseLegend) {
      chartLegends.reverse();
    }
    return (
      <>
        {showLegends &&
          chartLegends.map((legend) => {
            return (
              <div
                className={"legend item"}
                onClick={() => onToggle(legend.id)}
              >
                <input
                  className={"ignore"}
                  type="checkbox"
                  checked={filter.length == 0 || !filter.includes(legend.id)}
                />

                <span
                  className={
                    legendCheckBack ? "checkmark-with-bg" : "checkmark"
                  }
                  style={{
                    backgroundColor:
                      legendCheckBack == true ? legend.color : "#FFF",
                  }}
                ></span>

                <label
                  legendLabelBack={legendLabelBack}
                  style={{
                    backgroundColor:
                      legendLabelBack == true ? legend.color : "#FFF",
                    color: legendLabelColor,
                  }}
                >
                  {legend.label}
                </label>
              </div>
            );
          })}
      </>
    );
  };

  return (
    <div>
      {" "}
      {(legendPosition == "top" || legendPosition == "bottom") && (
        <div
          className={`legends container has-standard-12-font-size  ${legendPosition}`}
        >
          <div className="legend-sections">
            <div className="title-section">{legendTitle()}</div>
            <div
              className={`legends container has-standard-12-font-size items-section`}
            >
              {legendItems()}
            </div>
          </div>
        </div>
      )}
      {(legendPosition == "right" || legendPosition == "left") && (
        <div
          className={`legends container has-standard-12-font-size  ${legendPosition}`}
        >
          {legendTitle()}
          {legendItems()}
        </div>
      )}
    </div>
  );
};

export default Legends;
