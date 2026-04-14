import React, { useState} from "react";
import {MenuProvider, MenuConsumer} from "@devgateway/wp-react-lib";
import {injectIntl} from "react-intl";
import { Container, Menu, MenuItem } from "@devgateway/ui";
import {decode} from "../utils/index.js";

const localReplaceLink = (url, locale) => {
    if (url) {
        if (!url.substr(url.indexOf("/wp") + 3).startsWith("/" + locale)) {
            return "/" + locale + url.substr(url.indexOf("/wp") + 3)
        }
        return url.substr(url.indexOf("/wp") + 3)
    }
    return ""
}

interface MenuChildProps {
    menu: any,
    locale: string,
    match: any,
    selected: any,
    active: any,
    showIcons: boolean,
    onSetSelected: any
}

const MenuChild = injectIntl((props: any) => {

    const {menu, locale, match, selected, active, showIcons, onSetSelected} = props
    
    return <>

        {menu && menu.items.map((item, index) => (<MenuItem
            className={`divided ${item.child_items ? 'has-child-items' : ''} 
                    ${selected && selected.ID == item.ID ? 'selected' : ''}  
                    ${active == item.slug ? "active" : ""}`}>


            <span><a href={localReplaceLink(item.url,locale)}>{item.title}</a></span>

            {item.child_items && item.child_items.map((child, index) => {
                return <MenuItem key={child.ID}> </MenuItem>
            })}
        </MenuItem>))}

    </>

})


const InlineMenu = (props) => {
    const {
        intl,
        parent,
        editing = false,
        unique,
        onChange,
        "data-name": name = "main",
        "data-label": label,
        "data-icon": icon,
        "data-icon-id": iconId,
        "data-show-icons": showIcon,
        "data-show-labels": showLabel,
        locale,

    } = props

    
    const [selected, setSelected] = useState(null)

    return (<Container fluid textAlign={"right"}>
        {name && name != "" && <Menu className={"inline"} size={"small"}>
            <MenuItem>


                {icon && <img src={decode(icon)} className={"icon"}/>}
                {label && <span className={"label"}>{label}</span>}

            </MenuItem>
            <MenuProvider name={name} locale={locale}>
                <MenuConsumer>
                    <MenuChild onSetSelected={setSelected}></MenuChild>
                </MenuConsumer>
            </MenuProvider>
        </Menu>}

    </Container>)

}


export default InlineMenu