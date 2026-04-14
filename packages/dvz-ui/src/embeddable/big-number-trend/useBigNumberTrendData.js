import { alphaSort } from '../utils/common.js'

const useBigNumberTrendData = ({ data, app, measure, dimension1, format, percentChangeFormat, intl, noDataText }) => {
    let dataItems = []
    let dimensionField
    let measureField

    if (app === 'csv') {
        const { meta: { fields } } = data
        dimensionField = fields[0]
        measureField = fields[1]
        dataItems = data.data.map(d => ({
            value: d[dimensionField],
            [measureField]: d[measureField],
            [dimensionField]: d[dimensionField]
        }))
    } else {
        measureField = measure
        dimensionField = dimension1
        if (dimensionField == null || dimensionField === 'none') {
            const obj = {}
            obj[measureField] = data[measureField]
            dataItems = [obj]
        } else {
            dataItems = !data.children || data.children.length === 0 ? [] : data.children
            dataItems = dataItems.map(d => ({
                value: d.value,
                [measureField]: d[measureField],
                [dimensionField]: d.value
            }))
        }
    }

    let currentValue = null
    let previousValue = null
    let percentChange
    let percentChangeFormatted
    let formattedNumber

    if (dataItems.length > 0) {
        dataItems = dataItems.sort((a, b) => alphaSort(false, intl.locale, a.value, b.value))

        currentValue = dataItems[dataItems.length - 1][measureField]

        if (dataItems.length > 1) {
            previousValue = dataItems[dataItems.length - 2][measureField]
        }

        formattedNumber = intl.formatNumber(format.style === 'percent' ? currentValue / 100 : currentValue, { ...format })

        if (previousValue) {
            percentChange = (currentValue - previousValue) / previousValue
            const { prefix = '', suffix = '', ...pctIntlFormat } = percentChangeFormat
            percentChangeFormatted = `${prefix}${intl.formatNumber(percentChange, pctIntlFormat)}${suffix}`
        }
    }

    if (currentValue == null) {
        formattedNumber = noDataText
    }

    const lastItem = dataItems.length > 0 ? dataItems[dataItems.length - 1] : {}
    const currentYear = dataItems.length > 0 ? lastItem[dimensionField] : null
    const previousYear = dataItems.length > 1 ? dataItems[dataItems.length - 2][dimensionField] : null
    const currentValueFormatted = currentValue != null
        ? intl.formatNumber(format.style === 'percent' ? currentValue / 100 : currentValue, { ...format })
        : null
    const previousValueFormatted = previousValue != null
        ? intl.formatNumber(format.style === 'percent' ? previousValue / 100 : previousValue, { ...format })
        : null

    const templateContext = {
        ...lastItem,
        current_year: currentYear,
        previous_year: previousYear,
        current_value: currentValueFormatted,
        previous_value: previousValueFormatted,
        percent_change: percentChangeFormatted
    }

    return {
        dataItems,
        currentValue,
        previousValue,
        percentChange,
        percentChangeFormatted,
        formattedNumber,
        currentYear,
        previousYear,
        templateContext
    }
}

export default useBigNumberTrendData
