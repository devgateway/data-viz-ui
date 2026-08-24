import React from 'react';

const MapDataFrame = (props) => {
    const {data, measures, customMeasureLabels, children, source} = props;

    const transformedData = {
        locationsData: [],
        nationalData: {},
        measureLabelMap: {}
    }

    if (data.metadata && data.metadata.measures) {
        data.metadata.measures.forEach(m => {
            if (customMeasureLabels && customMeasureLabels[m.value] && customMeasureLabels[m.value].hasCustomLabel && customMeasureLabels[m.value].customLabel) {
                transformedData.measureLabelMap[m.value] = customMeasureLabels[m.value].customLabel;
            } else {

                transformedData.measureLabelMap[m.value] = m.label;
            }
        })
    }

    const metadataMeasureValues = (data?.metadata?.measures || [])
        .map((m) => m?.value)
        .filter(Boolean);

    const getMeasuresArray = () => {
        if (Array.isArray(measures)) {
            return measures.map((m) => ("" + m).trim()).filter(Boolean);
        }

        if (typeof measures === "string") {
            const trimmed = measures.trim();
            if (!trimmed || trimmed === "[]") {
                return metadataMeasureValues;
            }

            if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
                try {
                    const parsed = JSON.parse(trimmed);
                    if (Array.isArray(parsed)) {
                        return parsed.map((m) => ("" + m).trim()).filter(Boolean);
                    }
                } catch (error) {
                    // Ignore parse errors and fall back to CSV parsing below.
                }
            }

            return trimmed.split(",").map((m) => m.trim()).filter(Boolean);
        }

        return metadataMeasureValues;
    };

    const measuresArray = getMeasuresArray();

    const metadataTypes = data?.metadata?.types || [];
    const sourceDimension = (source || "").split("/")[0];
    const defaultType = metadataTypes.find((t) => t.dimension === sourceDimension) || metadataTypes[0];

    const getLocationLabel = (item, index) => {
        if (typeof item?.value === "string") {
            return item.value;
        }

        const itemType = metadataTypes.find((t) => t.dimension === item?.type);
        const typeToUse = itemType || defaultType;
        const metadataItem = typeToUse?.items?.[index];
        return metadataItem?.value || metadataItem?.code || item?.label || item?.value;
    };

    const getMeasureValue = (item, measure) => {
        if (item && Object.prototype.hasOwnProperty.call(item, measure)) {
            return item[measure];
        }

        // Superset responses can use "value" as both node payload and a measure id.
        if (measure === "value") {
            return item?.value;
        }

        return undefined;
    };

    if (data && data.children) {
        data.children.forEach((item, index) => {
            const locationLabel = getLocationLabel(item, index);
            measuresArray.forEach(measure => {
                const newItem = {
                    ...item,
                    label: locationLabel,
                    value: getMeasureValue(item, measure),
                    measure: measure
                }


                if (item.children) {
                    newItem.children = []
                    item.children.forEach(child => {
                        newItem.children.push({...child, label: child.value, value: getMeasureValue(child, measure)});
                    })
                }

                transformedData.locationsData.push(newItem);
            })
        })
        transformedData.measures = measuresArray.length > 1 ? measuresArray : null;
        const nationalMeasure = measuresArray.length > 0 ? measuresArray[0] : null;
        transformedData.nationalData.value = nationalMeasure ? getMeasureValue(data, nationalMeasure) : null;
    } else if (data && measuresArray.length > 0) {
        // Spring Boot APIs can return a flat aggregate object (no children/types).
        // Build a minimal dataset so maps/charts can still consume measure values.
        const fallbackLabel =
            (typeof data.value === "string" && data.value) ||
            data.label ||
            data.type ||
            "total";

        measuresArray.forEach((measure) => {
            const value = getMeasureValue(data, measure);
            if (value !== undefined) {
                transformedData.locationsData.push({
                    label: fallbackLabel,
                    value,
                    measure,
                });
            }
        });

        transformedData.measures = measuresArray.length > 1 ? measuresArray : null;
        transformedData.nationalData.value = getMeasureValue(data, measuresArray[0]);
    }

    return React.Children.map(children, child => React.cloneElement(child, {transformedData: {
        ...transformedData, types: metadataTypes
    }}))
}

export default MapDataFrame;
