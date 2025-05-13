import _ from 'lodash';
import {
  AnglePickerControl,
  PanelBody,
  PanelRow,
  ToggleControl,
  RangeControl,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { useEffect, useState} from "react";
import {
  extractAxisValues,
  getStoredOrSetItem,
  getSelectedItemsForApp,
  getSelectedLabelsForApp,
  updateMeasureLabels
} from "../commons/MobileConfigUtils";

const MarginSection = ({
  setAttributes,
  attributes: { mobileCustomization },
}) => {
  const { marginBottom, marginLeft, marginRight, marginTop } =
    mobileCustomization;
  return (
    <PanelBody initialOpen={false} title={__("Margins")}>
      <PanelRow>
        <RangeControl
          label={__(
            "Margin Bottom (Space between chart area and bottom border)"
          )}
          value={marginBottom}
          onChange={(marginBottom) =>
            setAttributes({
              mobileCustomization: {
                ...mobileCustomization,
                marginBottom: marginBottom,
                yAxisIntervalUserModified: true,
              },
            })
          }
          min={-500}
          max={500}
        />
      </PanelRow>

      <PanelRow>
        <RangeControl
          label={__("Margin Left (Space between chart area and left border)")}
          value={marginLeft}
          initialPosition={0}
          onChange={(marginLeft) =>
            setAttributes({
              mobileCustomization: {
                ...mobileCustomization,
                marginLeft: marginLeft,
              },
            })
          }
          step={1}
          min={-500}
          max={500}
        />
      </PanelRow>
      <PanelRow>
        <RangeControl
          label={__("Margin Right")}
          value={marginRight}
          onChange={(marginRight) =>
            setAttributes({
              mobileCustomization: {
                ...mobileCustomization,
                marginRight: marginRight,
              },
            })
          }
          min={-500}
          max={500}
        />
      </PanelRow>
      <PanelRow>
        <RangeControl
          label={__("Margin Top")}
          value={marginTop}
          onChange={(marginTop) =>
            setAttributes({
              mobileCustomization: {
                ...mobileCustomization,
                marginTop: marginTop,
              },
            })
          }
          min={-500}
          max={500}
        />
      </PanelRow>
    </PanelBody>
  );
};

const RadarMarginSection = ({
  setAttributes,
  attributes: { mobileCustomization },
}) => {
  const {
    mobileMarginBottom,
    mobileMarginLeft,
    mobileMarginRight,
    mobileMarginTop,
    tabletMarginBottom,
    tabletMarginLeft,
    tabletMarginRight,
    tabletMarginTop
  } = mobileCustomization;

  return (
    <>
      <PanelBody initialOpen={false} title={__("Mobile Margins")}>
        <PanelRow>
          <RangeControl
            label={__(
              "Mobile Margin Bottom (space between chart area and bottom border)"
            )}
            value={mobileMarginBottom}
            onChange={(marginBottom) =>
              setAttributes({
                mobileCustomization: {
                  ...mobileCustomization,
                  mobileMarginBottom: marginBottom,
                },
              })
            }
            min={-500}
            max={500}
          />
        </PanelRow>
        <PanelRow>
          <RangeControl
            label={__(
              "Mobile Margin Left (space between chart area and left border)"
            )}
            value={mobileMarginLeft}
            onChange={(marginLeft) =>
              setAttributes({
                mobileCustomization: {
                  ...mobileCustomization,
                  mobileMarginLeft: marginLeft
                },
              })
            }
            step={1}
            min={-500}
            max={500}
          />
        </PanelRow>
        <PanelRow>
          <RangeControl
            label={__("Mobile Margin Right")}
            value={mobileMarginRight}
            onChange={(marginRight) =>
              setAttributes({
                mobileCustomization: {
                  ...mobileCustomization,
                  mobileMarginRight: marginRight,
                },
              })
            }
            min={-500}
            max={500}
          />
        </PanelRow>
        <PanelRow>
          <RangeControl
            label={__("Mobile Margin Top")}
            value={mobileMarginTop}
            onChange={(marginTop) =>
              setAttributes({
                mobileCustomization: {
                  ...mobileCustomization,
                  mobileMarginTop: marginTop,
                },
              })
            }
            min={-500}
            max={500}
          />
        </PanelRow>
      </PanelBody>

      <PanelBody initialOpen={false} title={__("Tablet Margins")}>
        <PanelRow>
          <RangeControl
            label={__(
              "Tablet Margin Bottom (space between chart area and bottom border)"
            )}
            value={tabletMarginBottom}
            onChange={(marginBottom) =>
              setAttributes({
                mobileCustomization: {
                  ...mobileCustomization,
                  tabletMarginBottom: marginBottom,
                },
              })
            }
            min={-500}
            max={500}
          />
        </PanelRow>
        <PanelRow>
          <RangeControl
            label={__(
              "Tablet Margin Left (space between chart area and left border)"
            )}
            value={tabletMarginLeft}
            onChange={(marginLeft) =>
              setAttributes({
                mobileCustomization: {
                  ...mobileCustomization,
                  tabletMarginLeft: marginLeft,
                },
              })
            }
            step={1}
            min={-500}
            max={500}
          />
        </PanelRow>
        <PanelRow>
          <RangeControl
            label={__("Tablet Margin Right")}
            value={tabletMarginRight}
            onChange={(marginRight) =>
              setAttributes({
                mobileCustomization: {
                  ...mobileCustomization,
                  tabletMarginRight: marginRight,
                },
              })
            }
            min={-500}
            max={500}
          />
        </PanelRow>
        <PanelRow>
          <RangeControl
            label={__("Tablet Margin Top")}
            value={tabletMarginTop}
            onChange={(marginTop) =>
              setAttributes({
                mobileCustomization: {
                  ...mobileCustomization,
                  tabletMarginTop: marginTop,
                },
              })
            }
            min={-500}
            max={500}
          />
        </PanelRow>
      </PanelBody>
    </>
  );
};


const PaddingSection = ({
  setAttributes,
  attributes: { mobileCustomization, barPadding, barInnerPadding },
}) => {
  return (
    <PanelBody initialOpen={false} title={__("Padding")}>
      <PanelRow>
        <RangeControl
          label={__(
            "Bar Padding (Space between bars that are not in the same group)"
          )}
          value={mobileCustomization?.barPadding ?? barPadding}
          initialPosition={0.15}
          onChange={(newBarPadding) =>
            setAttributes({
              mobileCustomization: {
                ...mobileCustomization,
                barPadding: newBarPadding,
              },
            })
          }
          step={0.05}
          min={0}
          max={1}
        />
      </PanelRow>

      <PanelRow>
        <RangeControl
          label={__("Bar Inner Padding (Space between bars in the same group)")}
          value={mobileCustomization?.barInnerPadding ?? barInnerPadding}
          initialPosition={0.75}
          onChange={(barInnerPadding) =>
            setAttributes({
              mobileCustomization: {
                ...mobileCustomization,
                barInnerPadding: barInnerPadding,
              },
            })
          }
          step={0.25}
          min={0}
          max={50}
        />
      </PanelRow>
    </PanelBody>
  );
};

const TitleSection = ({
  setAttributes,
  attributes: { mobileCustomization },
}) => {
  return (
    <PanelBody initialOpen={false} title={__("Axis Titles")}>
      <PanelRow>
        <ToggleControl
          label={__("Show X Axis Title")}
          checked={mobileCustomization?.showXAxisTitle ?? true}
          onChange={(isShowXAxisTitle) =>
            setAttributes({
              mobileCustomization: {
                ...mobileCustomization,
                showXAxisTitle: isShowXAxisTitle,
              },
            })
          }
        />
      </PanelRow>
      <PanelRow>
        <ToggleControl
          label={__("Show Y Axis Title")}
          checked={mobileCustomization?.showYAxisTitle ?? true}
          onChange={(isShowYAxisTitle) =>
            setAttributes({
              mobileCustomization: {
                ...mobileCustomization,
                showYAxisTitle: isShowYAxisTitle,
              },
            })
          }
        />
      </PanelRow>

      <PanelRow>
        <ToggleControl
          label={__("Show Right Axis Title")}
          checked={mobileCustomization?.showRightAxisTitle ?? true}
          onChange={(isShowRightAxisTitle) =>
            setAttributes({
              mobileCustomization: {
                ...mobileCustomization,
                showRightAxisTitle: isShowRightAxisTitle,
              },
            })
          }
        />
      </PanelRow>
    </PanelBody>
  );
};

const IntervalsSection = ({
  setAttributes,
  attributes: { mobileCustomization, yAxisTickValues, xAxisTickValues, layout },
}) => {
  const isHorizontal =
    (layout === "horizontal" &&
      mobileCustomization.chartLayoutOverride === false) ||
    (layout === "vertical" && mobileCustomization.chartLayoutOverride === true);

  const isVertical =
    (layout === "vertical" &&
      mobileCustomization.chartLayoutOverride === false) ||
    (layout === "horizontal" &&
      mobileCustomization.chartLayoutOverride === true);

  const onIntervalChange = (value, prop, intervalProp) => {
    const newObject = Object.assign({}, mobileCustomization);
    if (newObject) {
      newObject[prop] = value;
      newObject[intervalProp] = true;
    }
    setAttributes({ mobileCustomization: newObject });
  };

  return (
    <PanelBody initialOpen={false} title={__("Intervals")}>
      {
        /**
         * the number of intervals should default to the value set by yAxisTickValues
         * this should only be displayed when the layout is vertical and the mobileCustomization.chartLayoutOverride is false
         */
        isVertical && (
          <PanelRow>
            <RangeControl
              label={__("Number of Y Axis Intervals")}
              value={
                !mobileCustomization?.yAxisIntervalUserModified
                  ? yAxisTickValues
                  : mobileCustomization.yAxisTickValues ?? yAxisTickValues
              }
              onChange={(newYAxisTickValue) =>
                onIntervalChange(
                  newYAxisTickValue,
                  "yAxisTickValues",
                  "yAxisIntervalUserModified"
                )
              }
              min={0}
              max={50}
            />
          </PanelRow>
        )
      }

      {
        /**
         * the number of intervals should default to the value set by xAxisTickValues
         * this should only be displayed when the layout is horizontal and the mobileCustomization.chartLayoutOverride is false
         * */
        isHorizontal && (
          <PanelRow>
            <RangeControl
              label={__("Number of X Axis Intervals")}
              value={
                !mobileCustomization?.xAxisIntervalUserModified
                  ? xAxisTickValues
                  : mobileCustomization.xAxisTickValues ?? xAxisTickValues
              }
              onChange={(newXAxisTickValue) =>
                onIntervalChange(
                  newXAxisTickValue,
                  "xAxisTickValues",
                  "xAxisIntervalUserModified"
                )
              }
              min={0}
              max={50}
            />
          </PanelRow>
        )
      }
    </PanelBody>
  );
};

const RadarSection = (props) => {
  const {
    setAttributes,
    attributes: { mobileCustomization },
  } = props;
  return (
    <PanelBody initialOpen={false} title={__("Radar Settings")}>
      <PanelBody initialOpen={false} title={__("Tablet")}>
        <PanelRow>
          <RangeControl
            label={__("Tablet Y Axis Line Height")}
            value={
              !mobileCustomization?.tabletYAxisLineHeight
                ? 12
                : mobileCustomization.tabletYAxisLineHeight
            }
            onChange={(value) =>
              setAttributes({
                mobileCustomization: {
                  ...mobileCustomization,
                  tabletYAxisLineHeight: value,
                },
              })
            }
            min={0}
            max={500}
          />
        </PanelRow>
        <PanelRow>
          <RangeControl
            label={__("Tablet Max Tick Word Length")}
            value={
              !mobileCustomization?.tabletMaxTickLength
                ? 25
                : mobileCustomization.tabletMaxTickLength
            }
            onChange={(value) =>
              setAttributes({
                mobileCustomization: {
                  ...mobileCustomization,
                  tabletMaxTickLength: value,
                },
              })
            }
            min={0}
            max={500}
          />
        </PanelRow>

      </PanelBody>
      <PanelBody initialOpen={false} title={__("Mobile")}>
        <PanelRow>
          <RangeControl
            label={__("Mobile Y Axis Line Height")}
            value={
              !mobileCustomization?.mobileYAxisLineHeight
                ? 12
                : mobileCustomization.mobileYAxisLineHeight
            }
            onChange={(value) =>
              setAttributes({
                mobileCustomization: {
                  ...mobileCustomization,
                  mobileYAxisLineHeight: value,
                },
              })
            }
            min={0}
            max={500}
          />
        </PanelRow>
        <PanelRow>
          <RangeControl
            label={__("Mobile Max Tick Word Length.")}
            value={
              !mobileCustomization?.mobileMaxTickLength
                ? 25
                : mobileCustomization.mobileMaxTickLength
            }
            onChange={(value) =>
              setAttributes({
                mobileCustomization: {
                  ...mobileCustomization,
                  mobileMaxTickLength: value,
                },
              })
            }
            min={0}
            max={500}
          />
        </PanelRow>
      </PanelBody>
      <PanelBody initialOpen={false} title={__("Margins")}>
        <RadarMarginSection {...props} />
      </PanelBody>
    </PanelBody>
  );
};

const MobileConfig = (props) => {
  const {
    setAttributes,
    attributes: {
      type,
      mobileCustomization,
      csv,
      app,
      measures,
      dimension1,
      yAxisTickValues,
      xAxisTickValues,
      tickRotation
    },
    allMeasures,
    allCategories,
    allDimensions,
  } = props;

  const [xAxisLabels, setXAxisLabels] = useState([]);

  const onIntervalChange = (value, prop, intervalProp, mobileCustomizationObject) => {
    const newObject = Object.assign({}, mobileCustomizationObject);
    if (newObject) {
      newObject[prop] = value;
      newObject[intervalProp] = true;
    }
    setAttributes({ mobileCustomization: newObject });
  };

  useEffect(() => {
    const updatedMobileCustomization = { ...mobileCustomization };

    if (!mobileCustomization.yAxisIntervalUserModified) {
      updatedMobileCustomization.yAxisTickValues = yAxisTickValues;
    }

    if (!mobileCustomization.xAxisIntervalUserModified) {
      updatedMobileCustomization.xAxisTickValues = xAxisTickValues;
    }

    if (!mobileCustomization.mobileXAxisTextRotationModified) {
      updatedMobileCustomization.mobileXAxisTextRotation = tickRotation;
    }

    if (!mobileCustomization.tabletXAxisTextRotationModified) {
      updatedMobileCustomization.tabletXAxisTextRotation = tickRotation;
    }

    setAttributes({ mobileCustomization: updatedMobileCustomization });
  }, [yAxisTickValues, xAxisTickValues, tickRotation]);


useEffect(() => {
  let labels = [];
  const categoryKey = `_categories_${app}`;
  if (app === "csv") {
    labels = extractAxisValues(csv);
  } else {
    if (dimension1 !== "none") {
      const dimensionKey = `_dimensions_${app}`;
      const dimensions = getStoredOrSetItem(dimensionKey, allDimensions, true);
      const categories = getStoredOrSetItem(categoryKey, allCategories, true);
      const dimType = dimensions.filter((dim) => dim.value === dimension1)?.[0]?.type;
      const matchedCategories = categories.filter((a) => a.type === dimType);
      labels = matchedCategories[0]?.items?.map((item) => item.value) || [];
    } else {
      if(allMeasures && measures) {
        updateMeasureLabels(allMeasures, measures, app);
        const selectedMeasures = getSelectedItemsForApp(measures, app);
        labels = _.isEmpty(selectedMeasures) ? [] : getSelectedLabelsForApp(selectedMeasures);
      } else {
        labels = [];
      }
    }
  }
  setXAxisLabels(labels);
}, [app, dimension1, csv, allDimensions, allCategories, allMeasures, measures]);


  const onXAxisLabelChange = (label, value) => {
    const newObject = Object.assign({}, mobileCustomization);
    if (newObject?.labels?.xAxis) {
      newObject.labels.xAxis[label] = value;
    }
    setAttributes({ mobileCustomization: newObject });
  };

  const onShowMobileCustomizationChange = (value) => {
    setAttributes({
      mobileCustomization: {
        ...mobileCustomization,
        showCustomization: value,
      },
    });
  };


  const setInitialTogle = (initialToggleState, label, axis) => {
    // initial toggle state is false
    if (!initialToggleState) {
      return mobileCustomization.labels[axis][label];
    }
    // initial toggle state is true but customization is already present
    if (mobileCustomization?.labels.hasOwnProperty(axis)) {
      if (mobileCustomization.labels[axis].hasOwnProperty(label)) {
        return mobileCustomization.labels[axis][label];
      }
      return true;
    }
    // initial toggle state is true and customization is not present
    return true;
  };

  const isBarOrLineOrPieOrRadar = ["bar", "line", "pie", "radar"].includes(type);
  const isBarOrLineOrPie = ["bar", "line", "pie"].includes(type);

  const isRadar = type === "radar";

  const isBarOrLine = ["bar", "line"].includes(type);
  return (
    <PanelBody
      initialOpen={false}
      title={__("Mobile & Tablet Customization Settings")}
    >
      <PanelRow>
        <ToggleControl
          label={__("Show Mobile & Tablet Customization Settings")}
          checked={mobileCustomization?.showCustomization}
          onChange={(isShowMobileCustomization) =>
            onShowMobileCustomizationChange(isShowMobileCustomization)
          }
        />
      </PanelRow>
      {isBarOrLineOrPieOrRadar && mobileCustomization?.showCustomization && (
        <>
          {isBarOrLine && (
            <>
              <PanelRow>
                <ToggleControl
                  label={__("Disable X Axis Labels")}
                  checked={mobileCustomization.xAxisDisabled}
                  onChange={(isXAxisEnabled) =>
                    setAttributes({
                      mobileCustomization: {
                        ...mobileCustomization,
                        xAxisDisabled: isXAxisEnabled,
                      },
                    })
                  }
                />
              </PanelRow>
              <PanelRow>
                <ToggleControl
                  label={__("Override Chart Layout")}
                  checked={mobileCustomization.chartLayoutOverride}
                  onChange={(isChartLayoutToggle) =>
                    setAttributes({
                      mobileCustomization: {
                        ...mobileCustomization,
                        chartLayoutOverride: isChartLayoutToggle,
                      },
                    })
                  }
                />
              </PanelRow>

              <PanelBody initialOpen={false} title={__("Tablet Settings")}>
                <PanelRow>
                  <RangeControl
                    label={__("Tablet Y Axis Line Height")}
                    value={
                      !mobileCustomization?.tabletYAxisLineHeight
                        ? 12
                        : mobileCustomization.tabletYAxisLineHeight
                    }
                    onChange={(value) =>
                      setAttributes({
                        mobileCustomization: {
                          ...mobileCustomization,
                          tabletYAxisLineHeight: value,
                        },
                      })
                    }
                    min={0}
                    max={500}
                  />
                </PanelRow>
                <PanelRow>
                  <RangeControl
                    label={__("Tablet Max Tick Word Length")}
                    value={
                      !mobileCustomization?.tabletMaxTickLength
                        ? 25
                        : mobileCustomization.tabletMaxTickLength
                    }
                    onChange={(value) =>
                      setAttributes({
                        mobileCustomization: {
                          ...mobileCustomization,
                          tabletMaxTickLength: value,
                        },
                      })
                    }
                    min={0}
                    max={500}
                  />
                </PanelRow>
                <PanelRow>
                  <AnglePickerControl
                    label={__("X Axis Text Rotation")}
                    value={
                      !mobileCustomization?.tabletXAxisTextRotationModified
                        ? tickRotation
                        : mobileCustomization.tabletXAxisTextRotation
                    }
                    onChange={(value) =>
                      onIntervalChange(
                        value,
                        "tabletXAxisTextRotation",
                        "tabletXAxisTextRotationModified",
                        mobileCustomization
                      )
                    }
                  />
                </PanelRow>
              </PanelBody>
              <PanelBody initialOpen={false} title={__("Mobile Settings")}>
                <PanelRow>
                  <RangeControl
                    label={__("Mobile Y Axis Line Height")}
                    value={
                      !mobileCustomization?.mobileYAxisLineHeight
                        ? 12
                        : mobileCustomization.mobileYAxisLineHeight
                    }
                    onChange={(value) =>
                      setAttributes({
                        mobileCustomization: {
                          ...mobileCustomization,
                          mobileYAxisLineHeight: value,
                        },
                      })
                    }
                    min={0}
                    max={500}
                  />
                </PanelRow>
                <PanelRow>
                  <RangeControl
                    label={__("Mobile Max Tick Word Length.")}
                    value={
                      !mobileCustomization?.mobileMaxTickLength
                        ? 25
                        : mobileCustomization.mobileMaxTickLength
                    }
                    onChange={(value) =>
                      setAttributes({
                        mobileCustomization: {
                          ...mobileCustomization,
                          mobileMaxTickLength: value,
                        },
                      })
                    }
                    min={0}
                    max={500}
                  />
                </PanelRow>
                <PanelRow>
                  <AnglePickerControl
                    label={__("X Axis Text Rotation")}
                    value={
                      !mobileCustomization?.mobileXAxisTextRotationModified
                        ? tickRotation
                        : mobileCustomization.mobileXAxisTextRotation
                    }
                    onChange={(value) =>
                      onIntervalChange(
                        value,
                        "mobileXAxisTextRotation",
                        "mobileXAxisTextRotationModified",
                        mobileCustomization
                      )
                    }
                  />
                </PanelRow>
              </PanelBody>
              <IntervalsSection {...props} />
              <PanelBody initialOpen={false} title={__("All Labels")}>
                {xAxisLabels?.map((label, index) => (
                  <PanelRow key={`____${index}${label}`}>
                    <ToggleControl
                      key={`_____${index}${label}`}
                      label={__(label)}
                      checked={setInitialTogle(true, label, "xAxis")}
                      onChange={(value) => {
                        onXAxisLabelChange(label, value);
                      }}
                    />
                  </PanelRow>
                ))}
              </PanelBody>

              <TitleSection {...props} />
            </>
          )}
          { isRadar && <RadarSection {...props} />}
          { isBarOrLineOrPie  && <MarginSection {...props} />}
          {type === "bar" && <PaddingSection {...props} />}
        </>
      )}
    </PanelBody>
  );
};

export default MobileConfig;
