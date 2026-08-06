import React from 'react';

const MapDataFrame = (props) => {
    const {data, measures, customMeasureLabels, children, source, extraDimension, allDimensions} = props;
    console.log("MapDataFrame props:", props);

    const sourceDimensions = (source || '').split('/').filter(Boolean);
    const primarySourceDimension = sourceDimensions.length > 0 ? sourceDimensions[0] : null;

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

    // allDimensions comes from /categories and contains every dimension in the dataset,
    // including dimensions not selected in the query breakdown.
    const dimensionCatalog = allDimensions && allDimensions.length > 0 ? allDimensions : (metadata.types || []);
    const typesByCategory = {};
    dimensionCatalog.forEach(t => {
        const category = t.category || t.type;
        if (category) {
            typesByCategory[category] = t.items || [];
        }
    });

    const getTypeMetadata = (type, value) => {
        const items = typesByCategory[type];
        if (!items) {
            return null;
        }
        const valueAsString = value != null ? String(value) : value;
        return items.find(i => {
            const itemValue = i.value != null ? String(i.value) : i.value;
            const itemId = i.id != null ? String(i.id) : i.id;
            const itemCode = i.code != null ? String(i.code) : i.code;
            return itemValue === valueAsString || itemId === valueAsString || itemCode === valueAsString;
        }) || null;
    };

    const getTypeDisplayValue = (type, value) => {
        const typeMeta = getTypeMetadata(type, value);
        if (!typeMeta) {
            return value;
        }
        return typeMeta.value ?? typeMeta.label ?? typeMeta.id ?? typeMeta.code ?? value;
    };

    const getAppliedFilterVariables = (filters = {}) => {
        const variables = {};
        Object.keys(filters).forEach((key) => {
            const selected = filters[key];
            if (selected == null) {
                return;
            }

            if (Array.isArray(selected)) {
                variables[key] = selected.map(v => getTypeDisplayValue(key, v)).join(' ,');
            } else {
                variables[key] = getTypeDisplayValue(key, selected);
            }
        });
        return variables;
    };

    const getSingleCatalogValue = (type) => {
        const items = typesByCategory[type] || [];
        if (items.length === 1) {
            return getTypeDisplayValue(type, items[0].value ?? items[0].id ?? items[0].code);
        }
        return null;
    };

    const isPopulatedValue = (value) => value !== undefined && value !== null && value !== '';

    const getDimensionItemRawValue = (item) => {
        if (!item) {
            return undefined;
        }
        if (isPopulatedValue(item.value)) {
            return item.value;
        }
        if (isPopulatedValue(item.id)) {
            return item.id;
        }
        return item.code;
    };

    const normalizeKey = (key) => {
        if (key === undefined || key === null) {
            return '';
        }
        return String(key)
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '_')
            .replace(/^_+|_+$/g, '');
    };

    const getValueByNormalizedKey = (obj, targetKey) => {
        if (!obj) {
            return undefined;
        }

        const normalizedTarget = normalizeKey(targetKey);
        const exact = obj[targetKey];
        if (exact !== undefined && exact !== null && exact !== '') {
            return exact;
        }

        const keys = Object.keys(obj);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (normalizeKey(key) === normalizedTarget) {
                const value = obj[key];
                if (value !== undefined && value !== null && value !== '') {
                    return value;
                }
            }
        }

        return undefined;
    };

    const findCatalogRowIndex = (rowItem, currentVariables) => {
        const dimensionAnchors = [
            primarySourceDimension,
            'country',
            rowItem.type,
        ].filter(Boolean);

        const identityCandidates = [
            getValueByNormalizedKey(currentVariables, 'country'),
            getValueByNormalizedKey(rowItem, 'country'),
            primarySourceDimension ? getValueByNormalizedKey(currentVariables, primarySourceDimension) : undefined,
            primarySourceDimension ? getValueByNormalizedKey(rowItem, primarySourceDimension) : undefined,
            rowItem.label,
            rowItem.value,
        ].filter(v => isPopulatedValue(v));

        for (let a = 0; a < dimensionAnchors.length; a++) {
            const anchor = dimensionAnchors[a];
            const items = typesByCategory[anchor] || [];
            if (!items.length) {
                continue;
            }

            for (let c = 0; c < identityCandidates.length; c++) {
                const candidate = identityCandidates[c];
                const candidateNorm = normalizeKey(candidate);
                const foundIndex = items.findIndex((item) => {
                    const itemValue = getDimensionItemRawValue(item);
                    return normalizeKey(itemValue) === candidateNorm;
                });
                if (foundIndex >= 0) {
                    return foundIndex;
                }
            }
        }

        return -1;
    };

    const getAlignedCatalogValueForRow = (type, rowItem, currentVariables) => {
        const rowIndex = findCatalogRowIndex(rowItem, currentVariables);
        if (rowIndex < 0) {
            return undefined;
        }

        const items = typesByCategory[type] || [];
        if (!items.length || rowIndex >= items.length) {
            return undefined;
        }

        const rawValue = getDimensionItemRawValue(items[rowIndex]);
        if (!isPopulatedValue(rawValue)) {
            return undefined;
        }

        return getTypeDisplayValue(type, rawValue);
    };

    const resolveDimensionValueForRow = (type, rowItem, currentVariables) => {
        const current = getValueByNormalizedKey(currentVariables, type);
        if (isPopulatedValue(current)) {
            return current;
        }

        if (isPopulatedValue(appliedFilterVariables[type])) {
            return appliedFilterVariables[type];
        }

        const rowValue = getValueByNormalizedKey(rowItem, type);
        if (isPopulatedValue(rowValue)) {
            return rowValue;
        }

        const alignedCatalogValue = getAlignedCatalogValueForRow(type, rowItem, currentVariables);
        if (isPopulatedValue(alignedCatalogValue)) {
            return alignedCatalogValue;
        }

        const singleCatalogValue = getSingleCatalogValue(type);
        if (isPopulatedValue(singleCatalogValue)) {
            return singleCatalogValue;
        }

        const rowIdentity = rowItem.value;
        const typeMeta = getTypeMetadata(type, rowIdentity);
        if (typeMeta) {
            return getTypeDisplayValue(type, rowIdentity);
        }

        return '';
    };

    // dimension3 isn't part of the query breakdown - it's a global applied filter, so resolve its value once for every row
    const appliedFilters = data.appliedFilters || {};
    let extraDimensionVariable = null;
    if (extraDimension) {
        const filterValue = appliedFilters[extraDimension] ? appliedFilters[extraDimension][0] : undefined;
        extraDimensionVariable = getTypeDisplayValue(extraDimension, filterValue);
    }

    const appliedFilterVariables = getAppliedFilterVariables(appliedFilters);

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
            variables[item.type] = getTypeDisplayValue(item.type, item.value);
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
                const variables = {
                    ...extractVariablesDeep(item),  // Dynamic fields for both formats, including nested dimensions
                    ...appliedFilterVariables,
                };

                dimensionCatalog.forEach((dimension) => {
                    const dimensionKey = dimension.category || dimension.type;
                    if (!dimensionKey) {
                        return;
                    }
                    variables[dimensionKey] = resolveDimensionValueForRow(dimensionKey, item, variables);
                });

                const newItem = {
                    ...item,
                    label: item.value,
                    value: item[measure],
                    measure: measure,
                    variables
                }

                newItem.variables.selectedDataFrameTooltipValue = item[measure];

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