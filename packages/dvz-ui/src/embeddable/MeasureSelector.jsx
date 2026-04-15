import React from "react";

const MeasureSelector = ({
  label = "Measure",
  options = [],
  value = "",
  data,
  metadataMeasures,
  locale,
  onChange,
}) => {
  if (!options || options.length <= 1) {
    return null;
  }

  const resolvedMetadataMeasures = metadataMeasures || data?.metadata?.measures || [];
  const normalizedLocale = typeof locale === "string" ? locale.toUpperCase() : "";

  const humanizeValue = (rawValue = "") => {
    if (typeof rawValue !== "string" || rawValue.length === 0) {
      return rawValue;
    }

    const humanized = rawValue
      .replace(/[_-]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    if (!humanized) {
      return rawValue;
    }

    return humanized.replace(/\b\w/g, (letter) => letter.toUpperCase());
  };


  const getMetadataLabel = (optionValue) => {
    const metadataMeasure = resolvedMetadataMeasures.find(
      (measure) => measure.value === optionValue,
    );

    if (!metadataMeasure) {
      return "";
    }

    return (
      metadataMeasure.labels?.[normalizedLocale] ||
      metadataMeasure.labels?.[locale] ||
      metadataMeasure.label ||
      metadataMeasure.title ||
      metadataMeasure.name ||
      ""
    );
  };

  const getOptionLabel = (option) => {
    const metadataLabel = getMetadataLabel(option.value);

    if (option.label && option.label !== option.value) {
      return option.label;
    }

    return metadataLabel || humanizeValue(option.value);
  };

  return (
    <div
      className="measure-selector"
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: "14px",
        width: "100%",
        margin: "0 0 10px auto",
      }}
    >
      <label
        className="label"
        style={{
          margin: 0,
          fontSize: "13px",
          fontWeight: 600,
          color: "#2c3338",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </label>
      <select
        className="selector"
        value={value || options[0]?.value || ""}
        onChange={(event) => onChange?.(event.target.value)}
        style={{
          minWidth: "180px",
          maxWidth: "260px",
          height: "32px",
          padding: "0 10px",
          border: "1px solid #c3c4c7",
          borderRadius: "4px",
          backgroundColor: "#fff",
          color: "#2c3338",
          fontSize: "13px",
          lineHeight: "30px",
          boxSizing: "border-box",
        }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {getOptionLabel(option)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MeasureSelector;

