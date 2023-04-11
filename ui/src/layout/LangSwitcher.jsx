import React, {useEffect, useState} from "react";
import {Dropdown, Image} from 'semantic-ui-react'

const changeLanguage = (locale) => {
    window.location = window.location.origin + "/" + locale.toLowerCase() + window.location.pathname.toString().substring(3)
}


const toOptions = (languages, show, locale) => {
    return Object.keys(languages).map(k => ({
        key: k,
        text: (show == 'name' || show == 'both') ? languages[k]["name"] : k.toUpperCase(),
        value: k,
        selected: k.toUpperCase() == locale.toUpperCase(),
        icon: (show == 'flag' || show == 'both') ?
            <Image src={'/wp/wp-content/plugins/wp-multilang/flags/' + languages[k]["flag"]}/> : null
    }))
}

const Drop = (props) => {

    const {menu: {menu_item_languages_show: show}, settings: {languages}, locale} = props
    const options = toOptions(languages, show, locale)

    return (<Dropdown
        button
        className='icon language selector'
        floating
        labeled
        icon={'world'}
        options={options}
        onChange={(e, {name, value}) => {
            
            changeLanguage(value)
        }
        }
        text='Language'
    />)

}
const Inline = (props) => {
    const {menu: {menu_item_languages_show: show}, settings: {languages}, locale} = props
    const options = toOptions(languages, show, locale)

    return <p className={"inline language selector"}>
        {options.map(o => <span className={o.selected?'selected':''} >{o.icon}<a onClick={e => changeLanguage(o.value)}>{o.text}</a>  </span>)}
    </p>
}
const Single = (props) => {
    const {menu: {menu_item_languages_show: show}, settings: {languages}, locale} = props
    const options = toOptions(languages, show, locale)

    return <p className={"single language selector"}>
        {options.map(o => <a className={o.selected?'selected':''} onClick={e => changeLanguage(o.value)}>{o.value}</a> )}
    </p>
}


const Selector = (props) => {
    const {locale, menu} = props
    const languages = menu.items.filter(i => i.url === "#wpm-languages");
    const hasLanguages = languages.length > 0
    const [settings, setSettings] = useState(null);


    useEffect(async () => {
        async function fetchData() {
            const response = await fetch(
                process.env.REACT_APP_WP_API + '/dg/v1/settings', {
                    headers: {
                        'Content-Type': 'application/json'
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    }
                }
            );

            const json = await response.json()
            setSettings(json);
        }

        fetchData()
    }, []);

    if (hasLanguages && settings) {

        return languages.map(l => {
            const type = l.menu_item_languages_type
            const show = l.menu_item_languages_show

            switch (type) {
                case 'dropdown':
                    return <Drop locale={locale} menu={l} settings={settings}></Drop>
                case 'inline':
                    return <Inline locale={locale} menu={l} settings={settings}></Inline>
                case 'single':
                    return <Single locale={locale} menu={l} settings={settings}></Single>
            }
            return null;
        })
        //
    } else {
        return null
    }
}

export default Selector