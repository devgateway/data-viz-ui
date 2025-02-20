import {
  AnglePickerControl,
  PanelBody,
  PanelRow,
  ToggleControl,
  RangeControl,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { useEffect } from "react";
import { getTranslatedOptions } from ".././commons/APIutils";

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
          min={0}
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
          min={0}
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
          min={0}
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
          min={0}
          max={500}
        />
      </PanelRow>
    </PanelBody>
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
          onChange={(newBarPadding) => setAttributes({
            mobileCustomization: {
              ...mobileCustomization,
              barPadding: newBarPadding,
            },
           })}
          step={0.05}
          min={0}
          max={1}
        />
      </PanelRow>

      <PanelRow>
        <RangeControl
          label={__("Bar Inner Padding (Space between bars in the same group)")}
          value={
            mobileCustomization?.barInnerPadding ?? barInnerPadding
          }
          initialPosition={0.75}
          onChange={(barInnerPadding) => setAttributes({
            mobileCustomization: {
              ...mobileCustomization,
              barInnerPadding: barInnerPadding,
            },
           })}
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

function extractAxisValues(csvData) {
  const lines = csvData.split("\n");
  const firstColumnValues = lines?.slice(1)?.map((row) => {
    return row.split(",")[0];
  });
  return firstColumnValues;
}

function transformDataToAppObject(data, appName, existingObject = {}) {
  if (existingObject[appName] !== undefined) {
    return existingObject;
  }
  existingObject[appName] = {};
  data.forEach((item) => {
    const key = item.value;
    existingObject[appName][key] = {
      selected: false,
      format: {
        style: "percent",
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
        currency: "USD",
      },
      hasCustomLabel: false,
      customLabel: item.label || key,
    };
  });

  return existingObject;
}

function getSelectedLabelsForApp(data, appName) {
  const appData = data[appName];
  if (!appData) {
    return [];
  }
  return Object.keys(appData)
    .filter((key) => appData[key].selected) // Filter out the selected items
    .map((key) => {
      return appData[key].hasCustomLabel
        ? appData[key].customLabel
        : appData[key].label;
    });
}

const updateMeasureLabels = (data, measures, app) => {
  transformDataToAppObject(data, app, measures);
  const apiMeasures = getTranslatedOptions(data);
  // for each api measure, find the corresponding measure in the measures array
  // and add a label property to the measure in the measures array
  apiMeasures.forEach((apiMeasure) => {
    const measure = measures[app][apiMeasure.value];
    if (measure) {
      measure.label = apiMeasure.label;
    }
  });
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
      datasetId,
      apacheSupersetUrl
    },
  } = props;

  useEffect(() => {
    if (!mobileCustomization.yAxisIntervalUserModified) {
      setAttributes({
        mobileCustomization: {
          ...mobileCustomization,
          yAxisTickValues: yAxisTickValues,
        },
      });
    }
  }, [yAxisTickValues]);

  let xAxisLabels = extractAxisValues(csv);

  if (app !== "csv") {
    if (dimension1 !== "none") {
      const storedCategories = JSON.parse(
        sessionStorage.getItem(`categories_${app}`)
      );
      
      let categories = []
      xAxisLabels = []

      if (!storedCategories) {
         fetch(`/api/${app}/categories?datasetId=${datasetId}&apacheSupersetUrl=${apacheSupersetUrl}`)
        .then((response) => response.json())
        .then((data) => {
          categories = getTranslatedOptions(data)
          xAxisLabels = categories
          .filter(
            (category) =>
              category.type?.toLowerCase() === dimension1?.toLowerCase()
          )[0]
          ?.items?.map((item) => item.value);
          
        });

      }         

    
  

      
    } else {
      const storedMeasures = JSON.parse(
        sessionStorage.getItem(`measures_${app}`)
      );
      // if measures are not present in session storage, fetch them from the API
      if (!storedMeasures) {
        fetch(`/api/${app}/measures?datasetId=${datasetId}&apacheSupersetUrl=${apacheSupersetUrl}`)
          .then((response) => response.json())
          .then((data) => {
            sessionStorage.setItem(`measures_${app}`, JSON.stringify(data));
            updateMeasureLabels(data, measures, app);
          });
      } else {
        updateMeasureLabels(storedMeasures, measures, app);
      }
      xAxisLabels = getSelectedLabelsForApp(measures, app);
    }
  }

  const onXAxisLabelChange = (label, value) => {
    const newObject = Object.assign({}, mobileCustomization);
    if (newObject && newObject.labels && newObject.labels.xAxis) {
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

  const onIntervalChange = (value) => {
    const newObject = Object.assign({}, mobileCustomization);
    if (newObject) {
      newObject.yAxisTickValues = value;
      newObject.yAxisIntervalUserModified = true;
    }
    setAttributes({ mobileCustomization: newObject });
  };

  const isBarOrLineOrPie = ["bar", "line", "pie"].includes(type);

  const isBarOrLine = ["bar", "line"].includes(type);
  return (
    <PanelBody initialOpen={false} title={__("Mobile & Tablet Customization Settings")}>
      <PanelRow>
        <ToggleControl
          label={__("Show Mobile & Tablet Customization Settings")}
          checked={mobileCustomization?.showCustomization}
          onChange={(isShowMobileCustomization) =>
            onShowMobileCustomizationChange(isShowMobileCustomization)
          }
        />
      </PanelRow>
      {isBarOrLineOrPie && mobileCustomization?.showCustomization && (
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

              <PanelRow>
                <AnglePickerControl
                  label={__("X Axis Text Rotation")}
                  value={mobileCustomization.tickRotation}
                  onChange={(value) =>
                    setAttributes({
                      mobileCustomization: {
                        ...mobileCustomization,
                        tickRotation: value,
                      },
                    })
                  }
                />
              </PanelRow>

              {/** the number of intervals should default to the value set by yAxisTickValues */}
              <PanelRow>
                <RangeControl
                  label={__("Number of Intervals")}
                  value={
                    !mobileCustomization?.yAxisIntervalUserModified
                      ? yAxisTickValues
                      : mobileCustomization.yAxisTickValues
                  }
                  onChange={(newYAxisTickValue) =>
                    onIntervalChange(newYAxisTickValue)
                  }
                  min={0}
                  max={50}
                />
              </PanelRow>

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
          <MarginSection {...props} />
          { type === "bar" && <PaddingSection {...props} /> }
        </>
      )}
    </PanelBody>
  );
};

export default MobileConfig;
