import { Container, Flag, Image, Menu } from "semantic-ui-react";
import React, { useEffect, useState, useRef } from "react";
import {
  MediaConsumer,
  MediaProvider,
  MenuConsumer,
  MenuProvider,
  utils,
} from "@devgateway/wp-react-lib";
import { injectIntl } from "react-intl";
import { withRouter } from "react-router";
import SearchComponent from "./SearchControl";
import LangSwitcher from "./LangSwitcher";

const SITE_URL_WITH_LOCALE = 'https://tobaccocontroldata.org'

const getPath = (menu, match) => {
  let path = [];
  menu.items.forEach((item) => {
    if (item.child_items) {
      item.child_items.forEach((ch) => {
        if (ch.slug == match.params.slug) {
          path.push(item);
          path.push(ch);
        }
      });
    } else if (item.slug == match.params.slug && item.url != "/") {
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

const BreadCrumbs = withRouter(
  injectIntl(({ menu, match, intl }) => {
    let path = getPath(menu, match);
    return (
      <React.Fragment>
        {path
          .filter((i) => i.url != "#wpm-languages")
          .map((i) =>
            !i.child_items ? (
              <a
                className={i.slug == match.params.slug ? "active" : ""}
                href={utils.replaceLink(i.url, intl.locale)}
              >
                {" "}
                {i.post_title}
              </a>
            ) : (
              <span>{i.post_title} </span>
            )
          )}
      </React.Fragment>
    );
  })
);

/*
Setting objects will inject customization preview
* */
const MenuItems = injectIntl(
  withRouter(
    ({
      settings,
      withIcons,
      active,
      menu,
      onSetSelected,
      selected,
      match,
      intl: { locale },
      isSmallScreen,
    }) => {
      useEffect(
        (e) => {
          if (!selected) {
            const pathSelected = getPath(menu, match);
            const items = pathSelected.filter((i) => i.menu_item_parent == 0);
            if (items) {
              onSetSelected(items[0]);
            }
          }
        },
        [match, menu, onSetSelected, selected]
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
          setIsMobileResolution(window.innerWidth <= 1200);
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
                    className={`divided ${
                      item.child_items ? "has-child-items" : ""
                    }
                            ${
                              selected && selected.ID === item.ID
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
                            className={`divided child-item ${
                              active === childItem.slug ? "active" : ""
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
  )
);

const Header = ({ intl, match, settings }) => {
  const [selected, setSelected] = useState();
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const menuRef = useRef(null); // Reference for the menu container
  const { slug } = match.params;

  const toggleMenu = () => {
    setHasInteracted(true);
    setMenuVisible((prevState) => !prevState);
  };

  // Close the menu when clicking outside of it or pressing Esc
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close menu if clicking outside of menuRef or directly on an element with the "desktop" class
      if (
          menuRef.current &&
          !menuRef.current.contains(event.target) ||
          event.target.closest(".desktop") ||
          event.target.closest(".breadcrumbs")
      ) {
        setMenuVisible(false);
      }
    };


    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        setMenuVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, []);

  // Debounced resize logic
  useEffect(() => {
    let resizeTimeout;

    const updateScreenSize = () => {
      const isNowSmallScreen = window.innerWidth <= 1200;

      if (isNowSmallScreen && !isSmallScreen) {
        // Reset menu visibility when switching to mobile view
        setMenuVisible(false);
      }

      setIsSmallScreen(isNowSmallScreen);
    };

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateScreenSize, 200); // Debounce the resize event
    };

    // Initial check and add event listener
    updateScreenSize();
    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [isMediumScreen, setIsMediumScreen] = useState(false); // State to track small screen

  useEffect(() => {
    // Function to update isMediumScreen state
    const updateScreenSize = () => {
      setIsMediumScreen(window.innerWidth <= 1365); // Check if width is 1365px or lower
    };

    // Initial check
    updateScreenSize();

    // Event listener for window resize
    window.addEventListener("resize", updateScreenSize);

    // Cleanup
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  const Logo = ({ media }) => {
    return media ? (
      <Image src={media.guid.rendered} />
    ) : (
      <img className="brand logo" size="large" src="/logo_full.png" />
    );
  };

  return (
    <React.Fragment>
      <MenuProvider slug={"main"} locale={intl.locale}>
        <Container key="header-container" fluid={true} className="header">
          <div
            className={`hamburger-menu ${hasInteracted ? "animate" : ""} ${
              isMenuVisible ? "open" : "close"
            }`}
            onClick={toggleMenu}
          >
            <div></div>
            <div className={"middle-line"}></div>
            <div></div>
          </div>

          <Container fluid={true} className={"background"} ref={menuRef}>
            <Menu className={"branding"} text>
              <Menu.Item>
                <a href={`${SITE_URL_WITH_LOCALE}`}>
                  {settings.site_logo !== 0 && !isMediumScreen && (
                    <MediaProvider id={settings.site_logo}>
                      <MediaConsumer>
                        <Logo key={"logo"} />
                      </MediaConsumer>
                    </MediaProvider>
                  )}
                  {settings.site_logo === 0 && !isMediumScreen && (
                    <img
                      className="brand logo"
                      size="large"
                      src="/logo_full.png"
                    />
                  )}

                  {isMediumScreen && (
                    <img
                      className="brand logo small"
                      size="small"
                      src="/TCDI-Icon-small_02.png"
                    />
                  )}
                </a>
              </Menu.Item>

              <Menu.Item className={"divider"}>
                <div></div>
              </Menu.Item>

              <Menu.Item fitted href="/">
                <Flag name="za" />
                <div className={"site name"}>{settings.name}</div>
              </Menu.Item>

              {/* Conditional Menu Rendering */}
              {isSmallScreen ? (
                <Menu className={`pages ${isMenuVisible ? "show" : ""}`}>
                  <Container fluid>
                    {/* Side Menu Content */}
                    <MenuConsumer>
                      <MenuItems
                        key="items"
                        settings={settings}
                        active={slug}
                        selected={selected}
                        onSetSelected={setSelected}
                        isSmallScreen={isSmallScreen}
                      />
                    </MenuConsumer>
                  </Container>
                </Menu>
              ) : (
                <Menu.Menu className={"pages"}>
                  {/* Original Menu Content */}
                  <MenuConsumer>
                    <MenuItems
                      key={"items"}
                      settings={settings}
                      active={slug}
                      selected={selected}
                      onSetSelected={setSelected}
                    ></MenuItems>
                  </MenuConsumer>
                </Menu.Menu>
              )}

              <Menu.Item>
                <MenuConsumer>
                  <LangSwitcher
                    key={"lang"}
                    locale={intl.locale}
                  ></LangSwitcher>
                </MenuConsumer>
              </Menu.Item>
              <Menu.Item fitted>
                <SearchComponent
                  onSetSelected={setSelected}
                  settings={settings}
                />
              </Menu.Item>
            </Menu>
          </Container>
          <Container fluid={true} className={"child"}>
            {selected && selected.child_items && (
              <Menu fluid text>
                <MenuItems
                  active={slug}
                  locale={intl.locale}
                  withIcons
                  onSetSelected={(e) => null}
                  menu={{ items: selected.child_items }}
                ></MenuItems>
              </Menu>
            )}
          </Container>
        </Container>

        <Container className={"url breadcrumbs"}>
          <MenuConsumer>
            <BreadCrumbs></BreadCrumbs>
          </MenuConsumer>
        </Container>
      </MenuProvider>
    </React.Fragment>
  );
};

export default injectIntl(withRouter(Header));
