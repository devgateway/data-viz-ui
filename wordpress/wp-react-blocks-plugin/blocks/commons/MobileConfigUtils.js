import { getTranslatedOptions } from "./APIutils";


export function extractAxisValues(csvData) {
  const lines = csvData.split("\n");
  const firstColumnValues = lines?.slice(1)?.map((row) => {
    return row.split(",")[0];
  });
  return firstColumnValues;
}

export function transformDataToAppObject(data, appName, existingObject = {}) {
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

export function getSelectedLabelsForApp(data, appName) {
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

export function updateMeasureLabels(data, measures, app) {
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
