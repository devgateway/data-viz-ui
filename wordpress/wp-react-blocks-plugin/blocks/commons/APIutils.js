export const getTranslatedOptions = (options) => {    
    const currentLocale = (window._user_locale ? window._user_locale : '').toUpperCase()
    
    if (options && options instanceof Array) {
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

export const isSupersetAPI = (app, apps) => {    
    if (app == 'csv' || !apps) {
        return false
    }
    const appObj = apps.filter(a => a.value == app)[0]
    return appObj && appObj.settings && appObj.settings.metadata 
    && appObj.settings.metadata.superset == 'true';
}

export default getTranslatedOptions