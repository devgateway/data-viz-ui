export const measuresMap = (data) => {

    const {metadata} = data ? data : {}
    const metadataMap = {}
    if (metadata) {
        metadata.measures.forEach(f => {
            metadataMap[f.value] = f

        })
    }
    return metadataMap
}

export const typesMap = (data) => {
    const {metadata} = data ? data : {}
    const metadataMap = {}
    if (metadata) {
        metadata.types.forEach(f => {
            metadataMap[f.dimension] = {
                dimension: f.dimension,
                category: f.category,
                items: f.items
            }
        })
    }
    return metadataMap
}

export const measureLabel = (map, field) => {
    return map[field].label
}

export const getTranslatedValue = (obj, locale) => {
    if (obj) {
        if (obj.labels && obj.labels[locale.toUpperCase()]) {
            return obj.labels[locale.toUpperCase()];
        } else {
            return obj.label ? obj.label : obj.value;
        }
    }
    return null
}


export default {measuresMap, typesMap, measureLabel, getTranslatedValue}