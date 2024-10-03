export interface DataFrameProps {
    children: React.ReactNode,
    data?: any,
    measures: string,
    customMeasureLabels: any,
    multipleMeasures: boolean,
    mapType: string,
    aggregationFormula: string,
}