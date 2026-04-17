const updateItemLabels = (items) => {
  const updatedItems = items?.map((item) => {
    const groupName = item.group.label;
    debugger;
    if (item.label.includes(groupName)) return item;
    return {
      ...item,
      //label: `${groupName} - ${item.label}`,
      label: `${item.label}`,
    };
  });
  return updatedItems;
};

export const measuresMap = (data) => {
  const { metadata } = data ? data : {};
  const metadataMap = {};
  const updatedMeasures = updateItemLabels(metadata?.measures || []);
  if (metadata) {
    updatedMeasures.forEach((f) => {
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
  if (!isNaN(a) && !isNaN(b)) {
    return reverse ? Number(b) - Number(a) : Number(a) - Number(b);
  }
  return 0;
};

const parseMonthYear = (str) => {
  const [monthStr, yearStr] = str.split(" ");
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = monthNames.indexOf(monthStr);
  const year = parseInt(yearStr, 10);

  if (month === -1 || isNaN(year)) {
    console.error(`Invalid month/year format: ${str}`);
  }

  return new Date(year, month, 1);
}

export const dateSort = (reverse, a, b) => {
  let aDate = Date.parse(a);
  let bDate = Date.parse(b);

  if (isNaN(aDate)) {
    aDate = parseMonthYear(a);
  }
  if (isNaN(bDate)) {
    bDate = parseMonthYear(b);
  }

  if (!isNaN(aDate) && !isNaN(bDate)) {
    return reverse ? bDate - aDate : aDate - bDate;
  }

  return 0;
};

export default {
  measuresMap,
  typesMap,
  measureLabel,
  getTranslatedValue,
  alphaSort,
  numericSort,
  dateSort,
};
