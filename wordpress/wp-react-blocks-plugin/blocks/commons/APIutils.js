export const getTranslatedOptions = (options) => {

    const currentLocale = (window._user_locale ? window._user_locale : '').toUpperCase()
    if (options) {
        return options.map(o => {
            let {label, value, labels} = o

            if (labels && labels[currentLocale]) {
                label = labels[currentLocale]
            }
            return {...o, label, value}
        })
    }
    return []

}

export const getTranslation = (translatable) => {
    const currentLocale = (window._user_locale ? window._user_locale : '').toUpperCase()
    let {label, labels, value} = translatable
    if (labels && labels[currentLocale]) {
        label = labels[currentLocale]
    }
    return label || value || translatable
}

export default getTranslatedOptions