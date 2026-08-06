import React from 'react';

const MapDataFrame = (props) => {
    const {data, measures, customMeasureLabels, children, source, extraDimension} = props;

    const transformedData = {
        locationsData: [],
        nationalData: {},
        measureLabelMap: {}
    }

    // Detect which API format we're using
    const isGenericAPI = data.metadata && data.metadata.measures && Array.isArray(data.metadata.measures);
    const isSupersetAPI = data.children && data.children[0] && data.children[0].children; // Has nested children

    // Extract metadata - works for both formats
    const metadata = data.metadata || {};

    // Standard properties to exclude from variables
    const standardProps = ['value', 'count', 'type', 'children', 'label', 'measure'];

    // metadata.types carries the full dimension definitions (labels, code, descriptions) - children only carry the raw type/value pair
    const typesByCategory = {};
    if (metadata.types) {
        metadata.types.forEach(t => {
            typesByCategory[t.category] = t.items || [];
        });
    }

    const getTypeMetadata = (type, value) => {
        const items = typesByCategory[type];
        if (!items) {
            return null;
        }
        return items.find(i => i.value === value || i.id === value) || null;
    };

    // dimension3 isn't part of the query breakdown - it's a global applied filter, so resolve its value once for every row
    const appliedFilters = data.appliedFilters || {};
    let extraDimensionVariable = null;
    if (extraDimension) {
        const filterValue = appliedFilters[extraDimension] ? appliedFilters[extraDimension][0] : undefined;
        const typeMeta = getTypeMetadata(extraDimension, filterValue);
        extraDimensionVariable = typeMeta ? typeMeta.value : filterValue;
    }

    // Extract all dynamic fields as variables
    const extractVariables = (item) => {
        const variables = {};
        Object.keys(item).forEach(key => {
            if (!standardProps.includes(key)) {
                variables[key] = item[key];
            }
        });
        
        if (item.type && item.value !== undefined) {
            // Key = dimension/category name (item.type), value = its readable name from metadata.types
            const typeMeta = getTypeMetadata(item.type, item.value);
            variables[item.type] = typeMeta ? typeMeta.value : item.value;
        }
        return variables;
    };

    // Recurses into every nesting level (dimension2, dimension3, ...) so their type/value pairs reach the top-level variables
    const extractVariablesDeep = (item) => {
        let variables = extractVariables(item);
        if (item.children && Array.isArray(item.children)) {
            item.children.forEach(child => {
                variables = { ...variables, ...extractVariablesDeep(child) };
            });
        }
        return variables;
    };

    // Recursively normalizes children at every dimension depth (not just the first level)
    const buildChildren = (item, measure) => {
        if (!item.children || !Array.isArray(item.children)) {
            return undefined;
        }
        return item.children.map(child => ({
            ...child,
            label: child.value,
            value: child[measure],
            variables: extractVariablesDeep(child),
            children: buildChildren(child, measure),
        }));
    };

    // Build measure label map from metadata
    if (metadata.measures) {
        metadata.measures.forEach(m => {
            if (customMeasureLabels && customMeasureLabels[m.value] && customMeasureLabels[m.value].hasCustomLabel && customMeasureLabels[m.value].customLabel) {
                transformedData.measureLabelMap[m.value] = customMeasureLabels[m.value].customLabel;
            } else {
                transformedData.measureLabelMap[m.value] = m.label;
            }
        })
    }

    const measuresArray = measures.split(",");

    if (data && data.children) {
        data.children.forEach(item => {
            measuresArray.forEach(measure => {
                const newItem = {
                    ...item,
                    label: item.value,
                    value: item[measure],
                    measure: measure,
                    variables: extractVariablesDeep(item)  // Dynamic fields for both formats, including nested dimensions
                }

                // Surface the applied dimension3 filter value as an extra tooltip variable, not part of the query breakdown
                if (extraDimension) {
                    newItem.variables[extraDimension] = extraDimensionVariable;
                }

                // Handle nested children (Superset format), at any dimension depth
                newItem.children = buildChildren(item, measure);

                transformedData.locationsData.push(newItem);
            })
        })
        
        transformedData.measures = measuresArray.length > 1 ? measuresArray : null;
        
        // Handle national data - works for both formats
        transformedData.nationalData.value = data[measures] || data[measuresArray[0]];
    }

    return React.Children.map(children, child => React.cloneElement(child, {transformedData: {
        ...transformedData, 
        types: metadata.types ? metadata.types : []
    }}))
}

export default MapDataFrame;