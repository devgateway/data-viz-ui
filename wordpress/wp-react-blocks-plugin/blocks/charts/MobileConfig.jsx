import {
  AnglePickerControl,
  PanelBody,
  PanelRow,
  ToggleControl,
  RangeControl,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { useState } from "react";
import { getTranslatedOptions } from ".././commons/APIutils";

function extractAxisValues(csvData) {
  const lines = csvData.split("\n");
  const firstColumnValues = lines?.slice(1)?.map((row) => {
    return row.split(",")[0];
  });
  return firstColumnValues;
}

function getSelectedLabelsForApp(data, appName) {
  const appData = data[appName];
  if (!appData) {
    return [];
  }
  return Object.keys(appData)
    .filter((key) => appData[key].selected) // Filter out the selected items
    .map((key) =>
      appData[key].hasCustomLabel ? appData[key].customLabel : key
    );
}

const MobileConfig = (props) => {
  const {
    setAttributes,
    attributes: { type, mobileCustomization, csv, app, measures, dimension1 },
  } = props;
  let xAxisLabels = extractAxisValues(csv);
  if (app !== "csv") {
    if (dimension1 !== "none") {
      const storedCategories = JSON.parse(sessionStorage.getItem("categories"));
      const categories =
        storedCategories ??
        fetch(`/api/${app}/categories`)
          .then((response) => response.json())
          .then((data) => getTranslatedOptions(data));
      xAxisLabels = categories
        .filter(
          (category) =>
            category.type?.toLowerCase() === dimension1?.toLowerCase()
        )[0]
        .items?.map((item) => item.value);
    } else {
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

  const isBarOrLine = ["bar", "line"].includes(type);

  return (
    <PanelBody initialOpen={false} title={__("Mobile Customization Settings")}>
      {isBarOrLine && (
        <>
          <PanelRow>
            <ToggleControl
              label={__("Disable X Axis Label")}
              checked={mobileCustomization.xAxisEnabled === true}
              onChange={(isXAxisEnabled) =>
                setAttributes({
                  mobileCustomization: {
                    ...mobileCustomization,
                    xAxisEnabled: isXAxisEnabled,
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

          <PanelBody initialOpen={false} title={__("All Labels")}>
            {xAxisLabels.map((label, index) => (
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

          <PanelRow>
            <RangeControl
              label={__("Number of Intervals")}
              value={mobileCustomization.yAxisTickValues || 10}
              onChange={(yAxisTickValues) =>
                setAttributes({
                  mobileCustomization: {
                    ...mobileCustomization,
                    yAxisTickValues: yAxisTickValues,
                  },
                })
              }
              min={0}
              max={50}
            />
          </PanelRow>
        </>
      )}
    </PanelBody>
  );
};
export default MobileConfig;
