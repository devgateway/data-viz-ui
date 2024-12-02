import {PanelBody, PanelRow, RangeControl, TextControl, ToggleControl} from '@wordpress/components';
import {__} from '@wordpress/i18n';
import ChartColors from "../commons/ChartColors.jsx"
import ChartLegends from '../commons/ChartLegends.jsx'
import AxisConfig from './AxisConfig.jsx'
import Labels from "./Labels.jsx"
import LineOverlay from "./LineOverlayConfig.jsx";
import ConfidenceIntervalConfig from "./ConfidenceIntervalConfig.jsx"
import Papa from 'papaparse'
import GroupTotalSetting from "./GroupTotalSetting.jsx";
import Sort from "./Sort.jsx";

const BarOptions = (props) => {
    const {
        apps,
        setAttributes,
        allDimensions,
        allMeasures,
        allCategories,
        attributes: {
            scheme,
            app,
            measures,
            dimension1,
            dimension2,
            layout,
            groupMode,
            reverse,
            colorBy,
            lineLayerEnabled,
            valueScale,
            maxValue,
            swap,
            csv,
            fixedMaxValue,
            fixedMinValue,
            barPadding,
            barLabelPosition,
            showGrid,
            includeOverall,
            overallLabel,
            barInnerPadding,
            highlightXAxisLine,
            showTickLine,
            showRightAxis,
            hiddenBars,
            format,
            showGroupTotal,
            groupTotalMeasure,
            groupTotalLabel,
            groupTotalFormat,
            groupTotalLabelOffset,
            groupTotalOffset,
            enableGridX,
            enableGridY,
            sort,
            sortReverse,
        }
    } = props;


    const getSeries = () => {
        if (allCategories) {

            let byDimension = false;
            let whichDimension = null;
            if (dimension2 == "none" && colorBy === "index" && swap) { //Multi measure colored by first dimension but  swapped (Colored by Measure)
                byDimension = true
                whichDimension = dimension1

            } else if (dimension2 == "none" && colorBy === "id" && !swap) {  //Multi Measure chart colored by second dimension (Measure)
                byDimension = false
            } else {

                byDimension = true
                whichDimension = colorBy == "index" ? dimension1 : dimension2

            }

            if (byDimension) {
                const ds = allDimensions.filter(d => d.value == whichDimension)
                if (ds.length > 0) {
                    const {type} = ds[0]
                    const cat = allCategories.filter(a => a.type === type)
                    if (cat && cat.length > 0) {
                        return cat[0].items.sort((a, b) => b.position - a.position).map(d => ({
                            value: d.value,
                            id: d.id,
                            code: d.code,
                            labels: d.labels
                        }))
                    }
                }
            } else {


                return null
            }
        }
        return null
    }

    const getCSVSeries = () => {
        const data = Papa.parse(csv, {header: true, dynamicTyping: true});
        let series;
        const nonVarFields = data.meta.fields.filter(f => !f.startsWith('_'))
        if (nonVarFields.length > 1) {
            series = []
            const categoryField = nonVarFields[0]
            data.data.forEach((item, i) => {
                if (item[categoryField]) {
                    series.push({id: item[categoryField], value: item[categoryField]})
                }
            })
        }

        return series;
    }


    let selectedMeasures = []
    if (allMeasures) {
        allMeasures.forEach(m => {
            if (measures[app] && measures[app][m.value] && measures[app][m.value].selected) {
                selectedMeasures.push(m.value)
            }
        })
    }
    const series = app == 'csv' ? getCSVSeries() : getSeries();

    return [
      <PanelBody initialOpen={false} title={__("Bar Options")}>
        <PanelBody initialOpen={false} title={__("Colors")}>
          <ChartColors {...props}></ChartColors>
        </PanelBody>
        <PanelBody initialOpen={false} title={"Layout"}>
          <PanelRow>
            <ToggleControl
              label={__("Grouped")}
              checked={groupMode === "grouped"}
              onChange={() =>
                setAttributes({
                  groupMode: groupMode === "grouped" ? "stacked" : "grouped",
                })
              }
            />
          </PanelRow>
          <PanelRow>
            <ToggleControl
              label={__("Symlog Scale")}
              checked={valueScale === "symlog"}
              onChange={() =>
                setAttributes({
                  valueScale: valueScale === "linear" ? "symlog" : "linear",
                })
              }
            />
          </PanelRow>
          <PanelRow>
            <ToggleControl
              label={__("Horizontal")}
              checked={layout === "horizontal"}
              onChange={(value) =>
                setAttributes({
                  layout: layout === "horizontal" ? "vertical" : "horizontal",
                })
              }
            />
          </PanelRow>
          <PanelRow>
            <ToggleControl
              label={__("Reverse")}
              checked={reverse}
              onChange={(value) => setAttributes({ reverse: !reverse })}
            />
          </PanelRow>

          {app !== "csv" && <Sort {...props}></Sort>}

          {app !== "csv" &&
            dimension1 != "none" &&
            dimension2 == "none" &&
            selectedMeasures.length > 0 && (
              <PanelRow>
                <ToggleControl
                  label={__("Swap Values")}
                  checked={swap}
                  onChange={(swap) => setAttributes({ swap })}
                />
              </PanelRow>
            )}
          <PanelRow>
            <ToggleControl
              label={__("Enable Y Grid Lines")}
              checked={enableGridY}
              onChange={() => setAttributes({ enableGridY: !enableGridY })}
            />
          </PanelRow>
          <PanelRow>
            <ToggleControl
              label={__("Enable X Grid Lines")}
              checked={enableGridX}
              onChange={() => setAttributes({ enableGridX: !enableGridX })}
            />
          </PanelRow>
          {app !== "csv" && (
            <>
              <PanelRow>
                <ToggleControl
                  label={__("Include Overall")}
                  checked={includeOverall}
                  onChange={(includeOverall) =>
                    setAttributes({ includeOverall })
                  }
                />
              </PanelRow>
              {includeOverall && (
                <PanelRow>
                  <TextControl
                    label={__("Overall Label")}
                    value={overallLabel}
                    onChange={(overallLabel) => setAttributes({ overallLabel })}
                  />
                </PanelRow>
              )}
            </>
          )}
          <PanelRow>
            <ToggleControl
              label={__("Display Group Total")}
              checked={showGroupTotal}
              onChange={(showGroupTotal) => {
                if (!groupTotalMeasure || groupTotalMeasure == "") {
                  setAttributes({
                    showGroupTotal,
                    groupTotalMeasure: allMeasures ? allMeasures[0].value : "",
                  });
                } else {
                  setAttributes({ showGroupTotal });
                }
              }}
            />
          </PanelRow>

          <Labels {...props}></Labels>
        </PanelBody>

        {showGroupTotal && <GroupTotalSetting {...props}></GroupTotalSetting>}

        {getSeries() && (
          <PanelBody initialOpen={false} title={__("Hidden Bars")}>
            {getSeries().map((p) => (
              <PanelRow>
                <ToggleControl
                  label={p.value}
                  checked={
                    hiddenBars.includes(p.value) ||
                    (p.labels &&
                      hiddenBars.includes(
                        p.labels[window._user_locale.toUpperCase()]
                      ))
                  }
                  onChange={() => {
                    const localeKey = window._user_locale.toUpperCase();
                    const labelByLocale = p.labels?.[localeKey]; // Safely access p.labels[localeKey]

                    let updatedBars = [...hiddenBars];

                    // If the bar is already hidden, remove it and its localized label (if applicable)
                    if (
                      hiddenBars.includes(p.value) ||
                      (labelByLocale && hiddenBars.includes(labelByLocale))
                    ) {
                      updatedBars = updatedBars.filter(
                        (item) => item !== p.value
                      );
                      if (labelByLocale) {
                        updatedBars = updatedBars.filter(
                          (item) => item !== labelByLocale
                        );
                      }
                    } else {
                      // Add the bar and its localized label (if applicable)
                      updatedBars.push(p.value);
                      if (labelByLocale) {
                        updatedBars.push(labelByLocale);
                      }
                    }

                    // Update the attributes
                    setAttributes({ hiddenBars: updatedBars });
                  }}
                />
              </PanelRow>
            ))}
          </PanelBody>
        )}
        {series && <ConfidenceIntervalConfig series={series} {...props} />}

        <AxisConfig {...props}></AxisConfig>

        <PanelBody initialOpen={false} title={__("Padding")}>
          <PanelRow>
            <RangeControl
              label={__(
                "Bar Padding (Space between bars that are not in the same group)"
              )}
              value={barPadding}
              initialPosition={0.15}
              onChange={(barPadding) => setAttributes({ barPadding })}
              step={0.05}
              min={0}
              max={1}
            />
          </PanelRow>

          <PanelRow>
            <RangeControl
              label={__(
                "Bar Inner Padding (Space between bars in the same group)"
              )}
              value={barInnerPadding}
              initialPosition={0.75}
              onChange={(barInnerPadding) => setAttributes({ barInnerPadding })}
              step={0.25}
              min={0}
              max={50}
            />
          </PanelRow>
        </PanelBody>

        <ChartLegends {...props}></ChartLegends>

        <PanelBody initialOpen={false} title={__("Line Overlay")}>
          <PanelRow>
            <ToggleControl
              label={__("Enable Overlay")}
              checked={lineLayerEnabled === true}
              onChange={(value) =>
                setAttributes({ lineLayerEnabled: !lineLayerEnabled })
              }
            />
          </PanelRow>
          {lineLayerEnabled && (
            <LineOverlay
              allMeasures={allMeasures}
              apps={apps}
              {...props}
            ></LineOverlay>
          )}
        </PanelBody>
      </PanelBody>,
    ];
}

export default BarOptions
