import { Config } from "@/conf";
import React, { useEffect, useRef, useState } from "react";
import { Image } from '@devgateway/ui';

const changeLanguage = (locale) => {
    window.location = window.location.origin + "/" + locale.toLowerCase() + window.location.pathname.toString().substring(3)
}

const toOptions = (languages, show, locale) => {
    return Object.keys(languages).map(k => ({
        key: k,
        text: (show === 'name' || show === 'both') ? languages[k]["name"] : k.toUpperCase(),
        value: k,
        selected: k.toUpperCase() === locale.toUpperCase(),
        icon: (show === 'flag' || show === 'both') ?
            <Image src={'/wp/wp-content/plugins/wp-multilang/flags/' + languages[k]["flag"]}/> : null
    }))
}

const Drop = (props) => {
    const {menu: {menu_item_languages_show: show}, settings: {languages}, locale} = props
    const options = toOptions(languages, show, locale)
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)

    useEffect(() => {
        const handleOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsOpen(false)
        }
        document.addEventListener('mousedown', handleOutside)
        return () => document.removeEventListener('mousedown', handleOutside)
    }, [])

    const selected = options.find(o => o.selected)

    return (
        <div ref={dropdownRef} className="icon language selector" style={{ position: 'relative', display: 'inline-block' }}>
            <button
                className="ui button labeled icon"
                onClick={() => setIsOpen(v => !v)}
            >
                <i className="world icon" />
                {selected ? selected.text : 'Language'}
            </button>
            {isOpen && (
                <div className="menu" style={{ position: 'absolute', top: '100%', left: 0, zIndex: 100, background: '#fff', border: '1px solid rgba(34,36,38,.15)', borderRadius: '.28571429rem', minWidth: '100%' }}>
                    {options.map(o => (
                        <div
                            key={o.key}
                            className={`item ${o.selected ? 'active selected' : ''}`}
                            style={{ padding: '.78571429rem 1.14285714rem', cursor: 'pointer' }}
                            onClick={() => { setIsOpen(false); changeLanguage(o.value); }}
                        >
                            {o.icon}{o.text}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

const Inline = (props) => {
    const {menu: {menu_item_languages_show: show}, settings: {languages}, locale} = props
    const options = toOptions(languages, show, locale)

    return <p className={"inline language selector"}>
        {options.map(o => <span key={o.key} className={o.selected?'selected':''}>{o.icon}<a onClick={e => changeLanguage(o.value)}>{o.text}</a>  </span>)}
    </p>
}

const Single = (props) => {
    const {menu: {menu_item_languages_show: show}, settings: {languages}, locale} = props
    const options = toOptions(languages, show, locale)

    return <p className={"single language selector"}>
        {options.map(o => <a key={o.key} className={o.selected?'selected':''} onClick={e => changeLanguage(o.value)}>{o.value}</a>)}
    </p>
}

const Toggler = (props) => {
    const { menu: { menu_item_languages_show: show }, settings: { languages }, locale } = props;
    const options = toOptions(languages, show, locale);
    const [currentLanguage, setCurrentLanguage] = useState(locale);

    const toggleLanguage = () => {
        const nextLanguage = currentLanguage === 'en' ? 'fr' : 'en';
        setCurrentLanguage(nextLanguage);
        const circle = document.querySelector('.circle');
        circle.classList.toggle('en');
        circle.classList.toggle('fr');
        setTimeout(() => {
            changeLanguage(nextLanguage);
        }, 300);
    };

    return (
        <div className="toggler language selector">
            <a className={`language-label ${currentLanguage === 'en' ? 'active' : ''}`} onClick={() => { changeLanguage('en'); setCurrentLanguage('en'); }}>EN</a>
            <button className="toggle-button" onClick={toggleLanguage}>
                <div className={`circle ${currentLanguage === 'en' ? 'en' : 'fr'}`}></div>
            </button>
            <a className={`language-label ${currentLanguage === 'fr' ? 'active' : ''}`} onClick={() => { changeLanguage('fr'); setCurrentLanguage('fr'); }}>FR</a>
        </div>
    );
}

const Selector = (props) => {
    const {locale, menu} = props
    const languages = menu.items.filter(i => i.url === "#wpm-languages");
    const hasLanguages = languages.length > 0
    const [settings, setSettings] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(
                Config.REACT_APP_WP_API + '/dg/v1/settings', {
                    headers: {
                        'Content-Type': 'application/json'
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
                    return <Drop key={l.ID} locale={locale} menu={l} settings={settings} />
                case 'inline':
                    return <Inline key={l.ID} locale={locale} menu={l} settings={settings} />
                case 'single':
                    return <Single key={l.ID} locale={locale} menu={l} settings={settings} />
                case 'toggler':
                    return <Toggler key={l.ID} locale={locale} menu={l} settings={settings} />
            }
            return null;
        })
    } else {
        return null
    }
}

export default Selector
