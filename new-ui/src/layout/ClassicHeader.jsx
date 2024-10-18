import { Container, Flag, Image, Menu } from "semantic-ui-react";
import React, { useEffect, useState } from "react";
import { MediaConsumer, MediaProvider, MenuConsumer, MenuProvider, utils } from "@devgateway/wp-react-lib";
import { injectIntl } from "react-intl";
import { withRouter } from "@/withRouter"
import SearchControl from "./SearchControl.jsx";
import LangSwitcher from "./LangSwitcher.jsx";
import { Link, NavLink, useParams } from "react-router-dom";

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

const BreadCrumbs = withRouter(injectIntl(({ menu, intl }) => {
    const params = useParams();
    const path = getPath(menu, params)
    return <React.Fragment>

        {path.filter((i) => i.url !== "#wpm-languages").map((i, idx) => !i.child_items ?
            <a key={idx} className={i.slug === params.slug ? 'active' : ''}
                href={utils.replaceLink(i.url, intl.locale)}> {i.post_title}</a> :
            <span key={idx}>{i.post_title} </span>)}
    </React.Fragment>

}))

/*
Setting objects will inject customization preview
* */
const MenuItems = injectIntl(
    ({
        settings,
        withIcons,
        active,
        menu,
        onSetSelected,
        selected,
        intl: { locale },
        isSmallScreen,
    }) => {
        const params = useParams();
        useEffect(
            (e) => {
                if (!selected) {
                    const pathSelected = getPath(menu, params);
                    const items = pathSelected.filter((i) => i.menu_item_parent == 0);
                    if (items) {
                        onSetSelected(items[0]);
                    }
                }
            },
            [params, menu, onSetSelected, selected]
        );

        /*Original menu mixed with customization changes*/
        const [mixedMenu, setMixedMenu] = useState(null);
        //const [removedItems, setRemoved] = useState(null)

        useEffect(() => {
            setMixedMenu(menu);
        }, [menu]);

        useEffect(() => {
            if (settings && settings.menu_settings && mixedMenu) {
                const removed = [];
                const newItems = menu.items.map((item) => {
                    //if menu exists in partial settings
                    //if item  deleted
                    if (
                        settings.menu_settings &&
                        settings.menu_settings["nav_menu_item[" + item.ID + "]"] === false
                    ) {
                        removed.push(item.ID);
                    }
                    //if item  removed
                    if (
                        settings.menu_settings &&
                        settings.menu_settings["nav_menu_item[" + item.ID + "]"]
                    ) {
                        const updatedItem =
                            settings.menu_settings["nav_menu_item[" + item.ID + "]"];
                        return {
                            ...item,
                            ...settings.menu_settings["nav_menu_item[" + item.ID + "]"],
                        };
                    } else {
                        return item;
                    }
                });
                //if item is new
                Object.keys(settings.menu_settings).map((mk) => {
                    const value = settings.menu_settings[mk];
                    if (value.type == "nav_menu_item") {
                        const re = /(-)?[0-9]+/g;
                        const results = re.exec(mk);
                        const id = parseInt(results[0]);
                        const exists = newItems.find((m) => m.ID == id);
                        if (!exists) {
                            newItems.push(value.value);
                        }
                    }
                });
                setMixedMenu({
                    ...menu,
                    items: newItems.filter((i) => removed.indexOf(i.ID) === -1),
                });

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
        }, [settings]);

        const [isMobileResolution, setIsMobileResolution] = useState(false);

        useEffect(() => {
            const handleResize = () => {
                setIsMobileResolution(window.innerWidth <= 1024);
            };

            // Initial check and event listener
            handleResize();
            window.addEventListener("resize", handleResize);

            // Cleanup on unmount
            return () => window.removeEventListener("resize", handleResize);
        }, []);

        return (
            mixedMenu && (
                <React.Fragment>
                    {mixedMenu.items
                        .filter((i) => i.url !== "#wpm-languages")
                        .map((item, index) => (
                            <React.Fragment key={item.ID}>
                                {/* Render parent menu item */}
                                <Menu.Item
                                    className={`divided ${item.child_items ? "has-child-items" : ""
                                        }
                              ${selected && selected.ID === item.ID
                                            ? "selected"
                                            : ""
                                        }
                              ${active === item.slug ? "active" : ""}`}
                                >
                                    {withIcons && (
                                        <a href={localReplaceLink(item.url, locale)}>
                                            <div className={"mark"}>
                                                <span className="sr-only">{item.title}</span>
                                            </div>
                                        </a>
                                    )}
                                    {isSmallScreen ? (
                                        item.child_items ? (
                                            <span
                                                onClick={() =>
                                                    onSetSelected(selected === item ? null : item)
                                                }
                                            >
                                                {item.title}
                                            </span>
                                        ) : (
                                            <a href={localReplaceLink(item.url, locale)}>
                                                {item.title}
                                            </a>
                                        )
                                    ) : item.child_items ? (
                                        <span onMouseOver={(e) => onSetSelected(item)}>
                                            {item.title}
                                        </span>
                                    ) : (
                                        <a
                                            onMouseOut={(e) => onSetSelected(null)}
                                            onMouseOver={(e) => onSetSelected(item)}
                                            href={localReplaceLink(item.url, locale)}
                                        >
                                            {item.title}
                                        </a>
                                    )}
                                </Menu.Item>
                                {/* Render child items below the parent if mobile resolution */}
                                {isMobileResolution &&
                                    selected &&
                                    selected.ID === item.ID &&
                                    selected.child_items && (
                                        <React.Fragment>
                                            {selected.child_items.map((childItem) => (
                                                <Menu.Item
                                                    key={childItem.ID}
                                                    className={`divided child-item ${active === childItem.slug ? "active" : ""
                                                        }`}
                                                >
                                                    <div className={"mark"}></div>
                                                    <a href={localReplaceLink(childItem.url, locale)}>
                                                        {childItem.title}
                                                    </a>
                                                </Menu.Item>
                                            ))}
                                        </React.Fragment>
                                    )}
                            </React.Fragment>
                        ))}
                </React.Fragment>
            )
        );
    }
);

const Header = ({ intl, settings }) => {
    const [selected, setSelected] = useState()
    const { slug } = useParams();

    const Logo = ({ media }) => {
        return media ? <Image src={media.guid.rendered} /> :
            <img className="brand logo" size="large" src='/logo_full.png' />
    }
    return <React.Fragment>


        <MenuProvider slug={"main"} locale={intl.locale}>
            <Container fluid={true} className="header classic">
                <Container fluid={true} className={"background"}>

                    <Menu className={"branding"} text>
                        <Menu.Item>
                            <NavLink to={`/${intl.locale}`}>
                                {settings.site_logo !== 0 && <MediaProvider id={settings.site_logo}>
                                    <MediaConsumer>
                                        <Logo></Logo>
                                    </MediaConsumer>

                                </MediaProvider>}
                                {!window.isCustomizedPreview && settings.site_logo === 0 &&
                                    <img className="brand logo" size="large" src='/dc-logo_01.png' />}
                            </NavLink>

                        </Menu.Item>

                        <Menu.Item className={"divider"}>
                            <div></div>
                        </Menu.Item>

                        <Menu.Item fitted href="/">
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
                                menu={{ items: selected.child_items }} />

                        </Menu>}
                </Container>
            </Container>


            <Container className={"url breadcrumbs"}>
                <MenuConsumer>
                    <BreadCrumbs key={slug}></BreadCrumbs>
                </MenuConsumer>

            </Container>
        </MenuProvider>
    </React.Fragment>

}


export default injectIntl(withRouter(Header))
