import {Container, Flag, Image, Menu} from "semantic-ui-react";
import React, {useEffect, useState, useRef} from "react";
import {
    AppContextProvider,
    MediaConsumer,
    MediaProvider,
    MenuConsumer,
    MenuProvider,
    utils,
} from "@devgateway/wp-react-lib";
import { injectIntl } from 'react-intl';
import {Link, useParams} from "react-router";
//import SearchComponent from "./SearchControl";
//import LangSwitcher from "./LangSwitcher";


const getPath = (menu, params) => {
    const path = [];
    menu.items.forEach((item) => {
        if (item.child_items) {
            item.child_items.forEach((ch) => {
                if (ch.slug == params.slug) {
                    path.push(item);
                    path.push(ch);
                }
            });
        } else if (item.slug == params.slug && item.url != "/") {
            path.push(item);
        }
    });
    return path;
};

const localReplaceLink = (url, locale) => {
    if (url) {
        if (!url.substr(url.indexOf("/wp") + 3).startsWith("/" + locale)) {
            return "/" + locale + url.substr(url.indexOf("/wp") + 3);
        }
        return url.substr(url.indexOf("/wp") + 3);
    }
    return "";
};

const BreadCrumbs = ({menu, locale}) => {
    const params = useParams();
    const path = getPath(menu, params);
    return (<React.Fragment>
        {path
            .filter((i) => i.url != "#wpm-languages")
            .map((i) => !i.child_items ? (<a
                className={i.slug == params.slug ? "active" : ""}
                href={utils.replaceLink(i.url, locale)}
            >
                {" "}
                {i.post_title}
            </a>) : (<span>{i.post_title} </span>))}
    </React.Fragment>);
}

/*
Setting objects will inject customization preview
* */

const MenuLinkWithIcon = ({ href, title, thumbnail_src, thumbnail_hover_src, isActive = false }) => {
    const [hovered, setHovered] = useState(false);

    const showHoverImage = hovered || isActive;

    return (
        <Link
            to={href}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {thumbnail_src && (
                <img
                    src={showHoverImage && thumbnail_hover_src ? thumbnail_hover_src : thumbnail_src}
                    alt=""
                />
            )}
            <span>{title}</span>
        </Link>
    );
};


const MenuItems = ({
                       settings,
                       withIcons,
                       active,
                       menu,
                       onSetSelected,
                       selected,
                       locale,
                       isSmallScreen,
                   }) => {
    const currentPath = window.location.pathname;

    const [mixedMenu, setMixedMenu] = useState(null);

    useEffect(() => {
        setMixedMenu(menu);
    }, [menu]);

    useEffect(() => {
        if (settings && settings.menu_settings && mixedMenu) {
            const removed = [];
            const newItems = menu.items.map((item) => {
                if (settings.menu_settings["nav_menu_item[" + item.ID + "]"] === false) {
                    removed.push(item.ID);
                }
                if (settings.menu_settings["nav_menu_item[" + item.ID + "]"]) {
                    return {
                        ...item,
                        ...settings.menu_settings["nav_menu_item[" + item.ID + "]"],
                    };
                } else {
                    return item;
                }
            });

            Object.keys(settings.menu_settings).forEach((mk) => {
                const value = settings.menu_settings[mk];
                if (value.type === "nav_menu_item") {
                    const re = /(-)?[0-9]+/g;
                    const results = re.exec(mk);
                    const id = parseInt(results[0]);
                    const exists = newItems.find((m) => m.ID === id);
                    if (!exists) {
                        newItems.push(value.value);
                    }
                }
            });

            setMixedMenu({
                ...menu,
                items: newItems.filter((i) => removed.indexOf(i.ID) === -1),
            });
        }
    }, [settings]);

    const [isMobileResolution, setIsMobileResolution] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobileResolution(window.innerWidth <= 1200);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        mixedMenu && (
            <React.Fragment>
                {mixedMenu.items
                    .filter((i) => i.url !== "#wpm-languages")
                    .map((item) => {
                        const itemPath = localReplaceLink(item.url, locale);

                        const isActive =
                            (!item.child_items && itemPath === currentPath) ||
                            (item.child_items && item.child_items.some((child) => {
                                const childPath = localReplaceLink(child.url, locale);
                                return childPath === currentPath;
                            }));



                        return (
                            <React.Fragment key={item.ID}>
                                <Menu.Item
                                    onMouseEnter={() => {
                                        if (item.child_items) {
                                            onSetSelected(item);
                                        } else {
                                            onSetSelected(null);
                                        }
                                    }}
                                    className={`divided ${item.child_items ? "has-child-items" : ""} ${isActive ? "active" : ""}`}
                                >

                                    {isSmallScreen ? (
                                        item.child_items ? (
                                            <span
                                                onClick={() =>
                                                    onSetSelected(selected === item ? null : item)
                                                }
                                            >
                        {item.title}
                      </span>
                                        ) : withIcons ? (
                                            <div onMouseOver={() => onSetSelected(null)}>
                                                <MenuLinkWithIcon
                                                    href={localReplaceLink(item.url, locale)}
                                                    title={item.title}
                                                    thumbnail_src={item.thumbnail_src}
                                                    thumbnail_hover_src={item.thumbnail_hover_src}
                                                    isActive={localReplaceLink(item.url, locale) === window.location.pathname}
                                                />
                                            </div>
                                        ) : (
                                            <Link
                                                to={localReplaceLink(item.url, locale)}
                                                onMouseOver={() => onSetSelected(null)}
                                            >
                                                {item.title}
                                            </Link>
                                        )
                                    ) : item.child_items ? (
                                        <span
                                            onMouseOver={() => {
                                                onSetSelected(item);
                                            }}
                                        >
                      {item.title}
                    </span>
                                    ) : withIcons ? (
                                        <MenuLinkWithIcon
                                            href={localReplaceLink(item.url, locale)}
                                            title={item.title}
                                            thumbnail_src={item.thumbnail_src}
                                            thumbnail_hover_src={item.thumbnail_hover_src}
                                            isActive={localReplaceLink(item.url, locale) === window.location.pathname}
                                            locale={locale}
                                        />
                                    ) : (
                                        <Link to={localReplaceLink(item.url, locale)}>{item.title}</Link>
                                    )}
                                </Menu.Item>

                                {/* Render child items in mobile only */}
                                {isMobileResolution &&
                                    selected &&
                                    selected.ID === item.ID &&
                                    selected.child_items && (
                                        <React.Fragment>
                                            {selected.child_items.map((childItem) => {
                                                const childPath = localReplaceLink(childItem.url, locale);
                                                const isActive = childPath === window.location.pathname;

                                                return (
                                                    <Menu.Item
                                                        key={childItem.ID}
                                                        className={`divided child-item ${isActive ? "active" : ""}`}
                                                    >
                                                        <div className="mark"></div>
                                                        {withIcons ? (
                                                            <MenuLinkWithIcon
                                                                href={childPath}
                                                                title={childItem.title}
                                                                thumbnail_src={childItem.thumbnail_src}
                                                                thumbnail_hover_src={childItem.thumbnail_hover_src}
                                                                isActive={isActive}
                                                            />
                                                        ) : (
                                                            <a href={childPath}>{childItem.title}</a>
                                                        )}
                                                    </Menu.Item>
                                                );
                                            })}

                                        </React.Fragment>
                                    )}
                            </React.Fragment>
                        );
                    })}
            </React.Fragment>
        )
    );
};


const Header = ({locale, settings = {}, SearchComponent = null, LangSwitcher = null}) => {
    const [selected, setSelected] = useState();
    const [isMenuVisible, setMenuVisible] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const {slug} = useParams();
    const menuRef = useRef(null);
    const hamburgerRef = useRef(null);

    const toggleMenu = () => {
        if (isMenuVisible) {
            // If menu is open, first trigger the "close" animation
            setHasInteracted(true);
            setMenuVisible(false);

            // After animation duration (300ms), reset the class
            setTimeout(() => {
                setHasInteracted(false);
            }, 300);
        } else {
            // If menu is closed, show menu and start "open" animation
            setHasInteracted(true);
            setMenuVisible(true);
        }
    };


    useEffect(() => {
        const handleClickOutside = (event) => {
            if ((menuRef.current && !menuRef.current.contains(event.target) &&
                    !hamburgerRef.current.contains(event.target)) ||
                event.target.closest(".desktop") || event.target.closest(".breadcrumbs")) {
                setMenuVisible(false);
                setHasInteracted(false);
            }
        };

        const handleEscKey = (event) => {
            if (event.key === "Escape") {
                setMenuVisible(false);
                setHasInteracted(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscKey);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscKey);
        };
    }, []);

    const isNowSmallScreen = window.innerWidth <= 1200;

    useEffect(() => {
        let resizeTimeout;

        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const width = window.innerWidth;
                const nowSmall = width <= 1200;

                setIsSmallScreen(nowSmall);

                // If returning to desktop, close the mobile menu
                if (width > 1200) {
                    setMenuVisible(false);
                    setHasInteracted(false);
                }
            }, 0);
        };

        // Call immediately to set initial state
        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const [isMediumScreen, setIsMediumScreen] = useState(false);

    useEffect(() => {
        const updateScreenSize = () => {
            setIsMediumScreen(window.innerWidth <= 1365);
        };

        updateScreenSize();
        window.addEventListener("resize", updateScreenSize);
        return () => window.removeEventListener("resize", updateScreenSize);
    }, []);

    const Logo = ({media}) => (
        media ? <Image src={media.guid.rendered}/> :
            <img className="brand logo" size="large" src="/logo_full.png"/>
    );

    const hasLandingPageSettings = settings?.landing_page_url && settings.landing_page_url !== false && settings.landing_page_url !== undefined && settings.landing_page_url !== "";
    const SITE_URL_WITH_LOCALE = hasLandingPageSettings ? settings.landing_page_url : `/${locale}`;

    return (
        <React.Fragment>
            <AppContextProvider locale={locale}>
                <MenuProvider slug={"main"} locale={locale}>
                    <Container key="header-container" fluid className="header">
                        <div
                            ref={hamburgerRef}
                            className={`hamburger-menu ${hasInteracted ? "animate" : ""} ${isMenuVisible ? "open" : "close"}`}
                            onClick={toggleMenu}
                        >
                            <div></div>
                            <div className="middle-line"></div>
                            <div></div>
                        </div>

                        {/* Shared wrapper for main menu + child menu */}
                        <div
                            className="menu-wrapper"
                            onMouseLeave={() => setSelected(null)}
                        >
                            <Container fluid className="background" ref={menuRef}>
                                <Menu className="branding" text>
                                    <Menu.Item className="branding-logo">
                                        <a
                                            href={`${SITE_URL_WITH_LOCALE}`}
                                            target={hasLandingPageSettings ? "_blank" : "_self"}
                                            rel="noopener noreferrer"
                                        >
                                            {settings && settings.site_logo !== 0 ? (
                                                <MediaProvider id={settings.site_logo}>
                                                    <MediaConsumer>
                                                        <Logo key="logo" />
                                                    </MediaConsumer>
                                                </MediaProvider>
                                            ) : (
                                                <img className="brand logo" size="large" src="/logo_full.png" />
                                            )}
                                        </a>
                                    </Menu.Item>

                                    <Menu.Item className="divider"><div></div></Menu.Item>

                                    {settings && (<Menu.Item fitted href="/"><Flag name="za"/><div className="site name">{settings.name}</div></Menu.Item>)}

                                    {/* Main menu */}
                                    {isSmallScreen && (
                                        <Menu className={`pages ${isMenuVisible ? "show" : ""}`}>
                                            <Container fluid>
                                                <MenuConsumer>
                                                    <MenuItems
                                                        key="items"
                                                        settings={settings}
                                                        active={slug}
                                                        selected={selected}
                                                        onSetSelected={setSelected}
                                                        isSmallScreen={isSmallScreen}
                                                        withIcons={true}
                                                        locale={locale}
                                                    />
                                                </MenuConsumer>
                                            </Container>
                                        </Menu>
                                    )}

                                    {!isSmallScreen && (
                                        <Menu.Menu className="pages">
                                            <MenuConsumer>
                                                <MenuItems
                                                    key="items"
                                                    settings={settings}
                                                    active={slug}
                                                    selected={selected}
                                                    onSetSelected={setSelected}
                                                    locale={locale}
                                                />
                                            </MenuConsumer>
                                        </Menu.Menu>
                                    )}


                                    {LangSwitcher && (
                                        <Menu.Item>
                                            <MenuConsumer>
                                                <LangSwitcher key="lang" locale={locale} />
                                            </MenuConsumer>
                                        </Menu.Item>
                                    )}
                                    {SearchComponent && (
                                        <Menu.Item fitted>
                                            <MenuConsumer>
                                                <SearchComponent
                                                    onSetSelected={setSelected}
                                                    selected={selected}
                                                    settings={settings}
                                                />
                                            </MenuConsumer>
                                        </Menu.Item>
                                    )}
                                </Menu>
                            </Container>

                            {/* Desktop child menu */}
                            {!isSmallScreen && selected?.child_items && (
                                <Container fluid className="child">
                                    <Menu fluid text>
                                        <MenuItems
                                            active={slug}
                                            locale={locale}
                                            withIcons
                                            onSetSelected={() => null}
                                            menu={{ items: selected.child_items }}
                                        />
                                    </Menu>
                                </Container>
                            )}
                        </div>

                        {/* Breadcrumbs */}
                        <Container className="url breadcrumbs">
                            <MenuConsumer>
                                <BreadCrumbs locale={locale} />
                            </MenuConsumer>
                        </Container>
                    </Container>
                </MenuProvider>
            </AppContextProvider>
        </React.Fragment>
    );
};

export default Header;