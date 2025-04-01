export const measuresMap = (data) => {
  const { metadata } = data ? data : {};
  const metadataMap = {};
  if (metadata) {
    metadata.measures.forEach((f) => {
      metadataMap[f.value] = f;
    });
  }
  return metadataMap;
};

export const typesMap = (data) => {
  const { metadata } = data ? data : {};
  const metadataMap = {};
  if (metadata) {
    metadata.types.forEach((f) => {
      metadataMap[f.dimension] = {
        dimension: f.dimension,
        category: f.category,
        items: f.items,
      };
    });
  }
  return metadataMap;
};

export const measureLabel = (map, field) => {
  return map[field].label;
};

export const getTranslatedValue = (obj, locale) => {

  if (obj) {
    if (obj.labels && obj.labels[locale.toUpperCase()]) {
      return obj.labels[locale.toUpperCase()];
    } else {
      return obj.label ? obj.label : obj.value;
    }
  }
  return null;
};

export const alphaSort = (reverse, locale, a, b) => {
  return new Intl.Collator(locale, {
      caseFirst: "upper",
      numeric: true,
      sensitivity: "variant",
  }).compare(reverse ? b : a, reverse ? a : b);
};

export const numericSort = (reverse, a, b) => {
  return reverse ? b - a : a - b;
};

export const dateSort = (reverse, a, b) => {
  let aDate = Date.parse(a + "");
  let bDate = Date.parse(b + "");
 
  if (!isNaN(aDate) && !isNaN(bDate)) {
      return reverse ? bDate - aDate : aDate - bDate;
  }

  return 0;
}
export default { measuresMap, typesMap, measureLabel, getTranslatedValue, alphaSort, numericSort, dateSort };
