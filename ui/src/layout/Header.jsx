import {Container, Flag, Image, Menu} from "semantic-ui-react";
import React, {useEffect, useState} from "react";
import {MediaConsumer, MediaProvider, MenuConsumer, MenuProvider, utils} from "@devgateway/wp-react-lib";
import {injectIntl} from "react-intl";
import {withRouter} from "react-router";
import SearchControl from "./SearchControl";
import LangSwitcher from "./LangSwitcher";


const getPath = (menu, match) => {
    let path = [];
    menu.items.forEach(item => {
        if (item.child_items) {
            item.child_items.forEach(ch => {
                if (ch.slug == match.params.slug) {
                    path.push(item)
                    path.push(ch)
                }
            })
        } else if (item.slug == match.params.slug && item.url != '/') {
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

const BreadCrumbs = withRouter(injectIntl(({menu, match, intl}) => {

    let path = getPath(menu, match)
    return <React.Fragment>

        {path.filter(i => i.url != "#wpm-languages").map(i => !i.child_items ?
            <a className={i.slug == match.params.slug ? 'active' : ''}
               href={utils.replaceLink(i.url, intl.locale)}> {i.post_title}</a> :
            <span>{i.post_title} </span>)}
    </React.Fragment>

}))

/*
Setting objects will inject customization preview
* */
const MenuItems = injectIntl(withRouter(({
                                             settings,
                                             withIcons,
                                             active,
                                             menu,
                                             onSetSelected,
                                             selected,
                                             match,
                                             intl: {locale}
                                         }) => {

    useEffect((e) => {
        if (!selected) {
            const pathSelected = getPath(menu, match)
            const items = pathSelected.filter(i => i.menu_item_parent == 0)
            if (items) {
                onSetSelected(items[0])
            }
        }

    }, [match, menu, onSetSelected, selected])

    /*Original menu mixed with customization changes*/
    const [mixedMenu, setMixedMenu] = useState(null)
    //const [removedItems, setRemoved] = useState(null)

    useEffect(() => {
        setMixedMenu(menu)
    }, [menu])


    useEffect(() => {
        if (settings && settings.menu_settings && mixedMenu) {

            const removed = []
            const newItems = menu.items.map(item => {

                //if menu exists in partial settgins
                //if item  deleted
                if (settings.menu_settings && settings.menu_settings["nav_menu_item[" + item.ID + "]"] === false) {
                    removed.push(item.ID)
                }
                //if item  removed
                if (settings.menu_settings && settings.menu_settings["nav_menu_item[" + item.ID + "]"]) {
                    const updatedItem = settings.menu_settings["nav_menu_item[" + item.ID + "]"];
                    return {...item, ...settings.menu_settings["nav_menu_item[" + item.ID + "]"]}

                } else {
                    return item;
                }
            })
            //if item is new
            Object.keys(settings.menu_settings).map((mk) => {
                const value = settings.menu_settings[mk];
                if (value.type == 'nav_menu_item') {
                    const re = /(-)?[0-9]+/g;
                    const results = re.exec(mk)
                    const id = parseInt(results[0])
                    const exists = newItems.find(m => m.ID == id)
                    if (!exists) {
                        newItems.push(value.value)
                    }

                }


            })
            setMixedMenu({...menu, items: newItems.filter((i) => removed.indexOf(i.ID) === -1)})

            /*
            const items = menu.items.map(item => {
                if (settings.menu_settings && settings.menu_settings["nav_menu_item[" + item.ID + "]"]) {
                    return {...item, ...settings.menu_settings["nav_menu_item[" + item.ID + "]"]}
                } else {
                    return item;
                }
            })*/

            //  setMixedMenu({...menu, items:newItems})
        }

    }, [settings])


    return mixedMenu && <React.Fragment>

        {mixedMenu.items.filter(i => i.url != "#wpm-languages").map(i => {
            return (<Menu.Item
                className={`divided ${i.child_items ? 'has-child-items' : ''} ${selected && selected.ID == i.ID ? 'selected' : ''}  ${active == i.slug ? "active" : ""}`}>


                {withIcons && <a href={localReplaceLink(i.url, locale)}>
                    <div className={"mark"}><span className="sr-only">{i.title}</span></div>
                </a>}



                {i.child_items ?

                    <span onClick={e => onSetSelected(i)}>{i.title}</span> :

                    <a onClick={e => onSetSelected(i)} href={localReplaceLink(i.url, locale)}>{i.title}</a>}


            </Menu.Item>)

        })}

    </React.Fragment>
}))

const Header = ({intl, match, settings}) => {

    const [selected, setSelected] = useState()
    const {slug} = match.params


    const Logo = ({media}) => {
        return media ? <Image src={media.guid.rendered}/> :
            <img className="brand logo" size="large" src='/logo_full.png'/>
    }
    return <React.Fragment>


        <MenuProvider slug={"main"} locale={intl.locale}>
            <Container fluid={true} className="header">
                <Container fluid={true} className={"background"}>

                    <Menu className={"branding"} text>
                        <Menu.Item>
                            <a href="/">

                                {settings.site_logo != 0 && <MediaProvider id={settings.site_logo}>
                                    <MediaConsumer>
                                        <Logo></Logo>
                                    </MediaConsumer>

                                </MediaProvider>}
                                {!window.isCustomizedPreview && settings.site_logo == 0 &&
                                    <img className="brand logo" size="large" src='/dc-logo_01.png'/>}
                            </a>
                        </Menu.Item>

                        <Menu.Item className={"divider"}>
                            <div></div>
                        </Menu.Item>

                        <Menu.Item fitted href="/">
                            <Flag name="za"/>
                            <div className={"site name"}>{settings.name}</div>
                        </Menu.Item>

                        <Menu.Menu className={"pages"}>
                            <MenuConsumer>
                                <MenuItems settings={settings} active={slug} selected={selected}
                                           onSetSelected={setSelected}></MenuItems>
                            </MenuConsumer>
                        </Menu.Menu>

                        <Menu.Item>
                            <MenuConsumer>
                                <LangSwitcher locale={intl.locale}></LangSwitcher>
                            </MenuConsumer>
                        </Menu.Item>
                        <Menu.Item fitted>
                            <SearchControl></SearchControl>
                        </Menu.Item>
                    </Menu>

                </Container>

                <Container fluid={true} className={"child"}>
                    {selected && selected.child_items &&
                        <Menu fluid text>
                            <MenuItems
                                active={slug} locale={intl.locale}
                                withIcons onSetSelected={e => null}
                                menu={{items: selected.child_items}}/>

                        </Menu>}
                </Container>
            </Container>


            <Container className={"url breadcrumbs"}>
                <MenuConsumer>
                    <BreadCrumbs></BreadCrumbs>
                </MenuConsumer>

            </Container>
        </MenuProvider>
    </React.Fragment>

}


export default injectIntl(withRouter(Header))
