import {
  AnglePickerControl,
  PanelBody,
  PanelRow,
  ToggleControl,
  RangeControl,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { useState } from "react";

function extractAxisValues(csvData) {
  const lines = csvData.split("\n");
  const firstColumnValues = lines?.slice(1)?.map((row) => {
    return row.split(",")[0];
  });
  return firstColumnValues;
}

const MobileConfig = (props) => {
  const {
    setAttributes,
    attributes: { type, mobileCustomization, csv },
  } = props;
  const xAxisLabels = extractAxisValues(csv);
  const [initialToggleStateXAxisLabels, setInitialToggleStateXAxisLabel] =
    useState(true);

  const onXAxisLabelChange = (label, value) => {
    const newObject = Object.assign({}, mobileCustomization);
    if (newObject && newObject.labels && newObject.labels.xAxis) {
      newObject.labels.xAxis[label] = value;
    }
    setInitialToggleStateXAxisLabel(false);
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
                  label={__(label)}
                  checked={setInitialTogle(
                    initialToggleStateXAxisLabels,
                    label,
                    "xAxis"
                  )}
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
