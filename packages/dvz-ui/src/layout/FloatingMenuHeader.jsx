import { Image, Menu, MenuItem, Tooltip } from '@devgateway/ui';
import React, { useState} from "react";
import {MediaConsumer, MediaProvider, MenuConsumer, MenuProvider} from "@devgateway/wp-react-lib";
import {injectIntl} from "react-intl";
import SearchControl from "./SearchControl.jsx";
import LangSwitcher from "./LangSwitcher.jsx";
import { useParams } from "react-router";

const getPath = (menu, locationParams) => {
    const path = [];
    menu.items.forEach(item => {
        if (item.child_items) {
            item.child_items.forEach(ch => {
                if (ch.slug === locationParams.slug) {
                    path.push(item)
                    path.push(ch)
                }
            })
        } else if (item.slug === locationParams.slug && item.url !== '/') {
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
        settings, withIcons, active, menu, onSetSelected, selected, locale
    } = props;

    return menu.items.filter(i => i.url != "#wpm-languages")
        .map((i) => {

            return (<MenuItem
                className={`divided ${i.child_items ? 'has-child-items' : ''} ${selected && selected.ID == i.ID ? 'selected' : ''}  ${active == i.slug ? "active" : ""}`}>
                {!i.child_items &&
                    <a onClick={e => onSetSelected(i)} href={localReplaceLink(i.url, locale)}>{i.title}</a>}
                {i.child_items &&
                    <Tooltip position={"top center"}   className={"floating child"} positionFixed hoverable
                           trigger={<span>{i.title}</span>}>
                        {i.child_items.map(ch =>
                            <MenuItem>
                            {ch.icon&&<img className={"child icon"} src={ch.icon.url}/>}
                           <span> <a onClick={e => onSetSelected(i)} href={localReplaceLink(ch.url, locale)}>{ch.title}</a></span>
                        </MenuItem>)}


                    </Tooltip>}


            </MenuItem>)
        })
}

const HeaderFloatingMenu = ({
                                intl: {locale}, settings
                            }) => {
    const [selected, setSelected] = useState()
    const {slug} = useParams();

    const Logo = ({media}) => {
        return media ? <Image src={media.guid.rendered}/> :
            <img className="brand logo" size="large" src='/logo_full.png'/>
    }

    return (<MenuProvider name={"main"} locale={locale}>
        <Menu className={"header floating branding"} text>
            <MenuItem className={"logo"}>
                <a href={`/${locale}`}>

                    {settings.site_logo != 0 && <MediaProvider id={settings.site_logo}>
                        <MediaConsumer>
                            <Logo></Logo>
                        </MediaConsumer>

                    </MediaProvider>}
                    {!window.isCustomizedPreview && settings.site_logo == 0 &&
                        <img className="brand logo" size="large" src='/dc-logo_01.png'/>}
                </a>
            </MenuItem>
            <MenuItem className={"divider"}>
                <div></div>
            </MenuItem>
            <MenuItem className={"site name"} fitted href="/">
                {settings.name}
            </MenuItem>
            <MenuItem className={"pages"}>
                <MenuConsumer>
                    <FloatingMenu settings={settings} active={slug} selected={selected}
                                  onSetSelected={setSelected} locale={locale}></FloatingMenu>
                </MenuConsumer>
            </MenuItem>
            <MenuItem className={"lang switcher"}>
                <MenuConsumer>
                    <LangSwitcher locale={locale}></LangSwitcher>
                </MenuConsumer>
            </MenuItem>
            <MenuItem fitted>
                <SearchControl></SearchControl>
            </MenuItem>
        </Menu>
    </MenuProvider>)


}
export default injectIntl(HeaderFloatingMenu)
