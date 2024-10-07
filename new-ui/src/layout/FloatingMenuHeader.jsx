import {Button, Container, Flag, Grid, Header, Image, Menu, Popup} from "semantic-ui-react";
import React, {useEffect, useState} from "react";
import {MediaConsumer, MediaProvider, MenuConsumer, MenuProvider, utils} from "@devgateway/wp-react-lib";
import {injectIntl} from "react-intl";
import {withRouter} from "@/withRouter";
import SearchControl from "./SearchControl.jsx";
import LangSwitcher from "./LangSwitcher.jsx";

const getPath = (menu, match) => {
    const path = [];
    menu.items.forEach(item => {
        if (item.child_items) {
            item.child_items.forEach(ch => {
                if (ch.slug === match.params.slug) {
                    path.push(item)
                    path.push(ch)
                }
            })
        } else if (item.slug === match.params.slug && item.url !== '/') {
            path.push(item)
        }
    })
    return path
}


const localReplaceLink = (url, locale) => {
    if (url) {
        if (!url.substr(url.indexOf("/wp") + 3).startsWith("/" + locale)) {
            return "/" + locale + url.substr(url.indexOf("/wp") + 3)
        }
        return url.substr(url.indexOf("/wp") + 3)
    }
    return ""
}


const FloatingMenu = (props) => {
    const {
        settings, withIcons, active, menu, onSetSelected, selected, match, locale
    } = props;

    return menu.items.filter(i => i.url !== "#wpm-languages")
        .map((i) => {

            return (<Menu.Item
                className={`divided ${i.child_items ? 'has-child-items' : ''} ${selected && selected.ID === i.ID ? 'selected' : ''}  ${active === i.slug ? "active" : ""}`}>
                {!i.child_items &&
                    <a onClick={e => onSetSelected(i)} href={localReplaceLink(i.url, locale)}>{i.title}</a>}
                {i.child_items &&
                    <Popup position={"top center"}   className={"floating child"} positionFixed hoverable
                           trigger={<span>{i.title}</span>}>
                        {i.child_items.map(ch =>
                            <Menu.Item>
                            {ch.icon&&<img className={"child icon"} src={ch.icon.url}/>}
                           <span> <a onClick={e => onSetSelected(i)} href={localReplaceLink(ch.url, locale)}>{ch.title}</a></span>
                        </Menu.Item>)}


                    </Popup>}


            </Menu.Item>)
        })
}

const HeaderFloatingMenu = ({
                                intl: {locale}, match, settings
                            }) => {
    const [selected, setSelected] = useState()
    const {slug} = match.params

    const Logo = ({media}) => {
        return media ? <Image src={media.guid.rendered}/> :
            <img className="brand logo" size="large" src='/logo_full.png'/>
    }

    return (<MenuProvider slug={"main"} locale={locale}>
        <Menu className={"header floating branding"} text>
            <Menu.Item className={"logo"}>
                <a href={`/${locale}`}>

                    {settings.site_logo !== 0 && <MediaProvider id={settings.site_logo}>
                        <MediaConsumer>
                            <Logo></Logo>
                        </MediaConsumer>

                    </MediaProvider>}
                    {!window.isCustomizedPreview && settings.site_logo === 0 &&
                        <img className="brand logo" size="large" src='/dc-logo_01.png'/>}
                </a>
            </Menu.Item>
            <Menu.Item className={"divider"}>
                <div></div>
            </Menu.Item>
            <Menu.Item className={"site name"} fitted href="/">
                {settings.name}
            </Menu.Item>
            <Menu.Item className={"pages"}>
                <MenuConsumer>
                    <FloatingMenu settings={settings} active={slug} selected={selected}
                                  onSetSelected={setSelected} locale={locale}></FloatingMenu>
                </MenuConsumer>
            </Menu.Item>
            <Menu.Item className={"lang switcher"}>
                <MenuConsumer>
                    <LangSwitcher locale={locale}></LangSwitcher>
                </MenuConsumer>
            </Menu.Item>
            <Menu.Item fitted>
                <SearchControl></SearchControl>
            </Menu.Item>
        </Menu>
    </MenuProvider>)


}


export default injectIntl(withRouter(HeaderFloatingMenu))
