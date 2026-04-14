import React, { useEffect, useRef, useState } from 'react';
import { Button, Container, Grid, GridColumn, GridRow, Badge, Menu, MenuItem, Accordion, AccordionItem, AccordionTrigger, AccordionContent as AccordionPanel, Icon } from '@devgateway/ui';
import { MediaConsumer, MediaProvider, PostConsumer, PostIcon, PostLabel, PostProvider } from "@devgateway/wp-react-lib";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import PostIntro from "../connected-templates/PostIntro";
import { useWindowDimensionsAndDevice } from '@/lib/hooks/window-dimensions';

const ItemMenu = ({ posts, activeItem, setActive, showLabels }) => {
  return posts
    ? posts.map((post) => (
      <MenuItem
        key={post.id}
        onClick={() => setActive(post.slug)}
        className={post.slug === activeItem ? "active" : ""}
      >
        {showLabels ? (
          <PostLabel post={post} />
        ) : (
          <Badge>
            <span dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
          </Badge>
        )}
      </MenuItem>
    ))
    : null;
};

const GriNavigator = ({
  posts,
  activeItem,
  setActive,
  showIcons,
  showLabels,
}) => {
  const count = posts.length;
  return posts
    ? posts.map((post) => {
      const iconUrl =
        post["_embedded"]?.["wp:featuredmedia"]
          ? post["_embedded"]["wp:featuredmedia"][0].source_url
          : null;
      return (
        <GridColumn
          key={post.id}
          className={
            (post.slug === activeItem ? "active" : "") +
            (showIcons ? " has-icon" : "")
          }
        >
          <Button
            onClick={() => setActive(post.slug)}
            className={`nav  ${count === 1 ? "one" : ""}`}
          >
            {showIcons && (
              <MediaProvider
                id={
                  post.meta_fields?.icon
                    ? post.meta_fields.icon[0]
                    : null
                }
              >
                <MediaConsumer>
                  <PostIcon className={"icon"} />
                </MediaConsumer>
              </MediaProvider>
            )}
            {showLabels ? (
              <PostLabel post={post} />
            ) : (
              <Badge>
                <span
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
              </Badge>
            )}
          </Button>
        </GridColumn>
      );
    })
    : null;
};

const TabContent = ({ posts, activeItem }) => {
  useEffect(() => {
    const contentContainer = document.querySelector('.ui.container.content-tab');
    if (contentContainer) {
      contentContainer.scrollTop = 0;
    }
  }, [activeItem]);

  return posts ? (
    posts.map((p) => {
      let style = {};
      if (p.slug !== activeItem) {
        style = {
          position: 'absolute',
          left: '-3000px',
          width: 'auto',
          height: '0px',
          overflow: 'hidden',
          visibility: 'hidden',
        };
      } else {
        style = {
          visibility: 'visible',
          position: 'relative',
          width: 'auto',
        };
      }
      return <PostIntro key={p.slug} as={Container} fluid post={p} style={style} />;
    })
  ) : null;
};

const AccordionContent = ({ posts, activeItem, setActive }) => {
  const [openItems, setOpenItems] = useState([])
  const [scrollTarget, setScrollTarget] = useState(null);
  const ref = useRef(null);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(window.innerWidth <= 1250);

  useEffect(() => {
    if (scrollTarget) {
      const offsetTop =
        scrollTarget.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  }, [scrollTarget]);

  const getScreenOrientation = () => {
    return (
      window.screen.orientation?.type ||
      (window.innerWidth > window.innerHeight
        ? "landscape-primary"
        : "portrait-primary")
    );
  }
  const [orientation, setOrientation] = useState(getScreenOrientation());

  const handleOrientationChange = () => {
    setTimeout(() => {
      setOrientation(getScreenOrientation());
      setIsMobileOrTablet(window.innerWidth <= 1250);
    }, 100);
  }

  const adjustDataSourceMargin = (ref) => {
    // Use a timeout for better WebKit compatibility
    setTimeout(() => {
      // Get all legend containers
      const legendsContainers = ref.querySelectorAll(
        ".accordion .legends.container.has-standard-12-font-size.bottom, .legends.container.items-section"
      );

      if (legendsContainers.length === 0) {
        return;
      }

      for (const legendsContainer of legendsContainers) {
        const container = legendsContainer.closest(".ui.fluid.container.content");
        const dataSourceParagraph = container
          ? container.querySelector(".data-source")
          : null;

        if (!dataSourceParagraph) {
          continue;
        }

        // Extra WebKit check: Ensure elements have dimensions
        if (
          legendsContainer.offsetParent === null ||
          dataSourceParagraph.offsetParent === null ||
          legendsContainer.offsetHeight === 0 ||
          dataSourceParagraph.offsetHeight === 0
        ) {
          continue;
        }

        // Get bounding rectangles (fallback for WebKit)
        const dataSourceRect = dataSourceParagraph.getBoundingClientRect();
        const legendsRect = legendsContainer.getBoundingClientRect();

        // Get computed styles
        const dataSourceStyles = window.getComputedStyle(dataSourceParagraph);
        const legendsStyles = window.getComputedStyle(legendsContainer);

        // Parse margins, fallback to 0 if "auto" is returned
        const dataSourceMarginTop = Number.parseFloat(dataSourceStyles.marginTop) || 0;
        const legendsMarginBottom = Number.parseFloat(legendsStyles.marginBottom) || 0;

        // Calculate adjusted positions
        const adjustedLegendsBottom = legendsRect.bottom + legendsMarginBottom;
        const adjustedDataSourceTop = dataSourceRect.top - dataSourceMarginTop;

        // Fix overlapping of legends and data source
        if (adjustedLegendsBottom > adjustedDataSourceTop) {
          const overlap = adjustedLegendsBottom - adjustedDataSourceTop;
          dataSourceParagraph.style.marginTop = `${overlap + 20}px`; // Extra padding
        }

        // Fix overlap with the next `.wp-block-column`
        const wpColumnAfterChart = legendsContainer.closest(
          ".wp-block-column.is-layout-flow.wp-block-column-is-layout-flow"
        )?.nextElementSibling;

        if (wpColumnAfterChart) {
          const wpColumnAfterChartRect = wpColumnAfterChart.getBoundingClientRect();
          const wpColumnAfterChartStyles = window.getComputedStyle(wpColumnAfterChart);

          const wpColumnAfterChartMarginTop = Number.parseFloat(wpColumnAfterChartStyles.marginTop) || 0;
          const adjustedWpColumnAfterChartTop = wpColumnAfterChartRect.top - wpColumnAfterChartMarginTop;

          if (adjustedLegendsBottom > adjustedWpColumnAfterChartTop) {
            const overlap = adjustedLegendsBottom - adjustedWpColumnAfterChartTop;
            wpColumnAfterChart.style.marginTop = `${overlap + 20}px`; // Add padding
          }
        }

        // Fix overlap with chart container above it
        const chartContainer = legendsContainer.closest(".chart.container");

        if (chartContainer) {
          const chartContainerRect = chartContainer.getBoundingClientRect();
          const chartContainerStyles = window.getComputedStyle(chartContainer);
          const chartContainerMarginBottom = Number.parseFloat(chartContainerStyles.marginBottom) || 0;
          const adjustedChartContainerBottom = chartContainerRect.bottom + chartContainerMarginBottom;

          const legendsMarginTop = Number.parseFloat(legendsStyles.marginTop) || 0;
          const adjustedLegendsTop = legendsRect.top - legendsMarginTop;

          if (adjustedLegendsTop < adjustedChartContainerBottom) {
            const overlap = adjustedChartContainerBottom - adjustedLegendsTop;
            legendsContainer.style.marginTop = `${overlap + 20}px`; // Extra padding
          }
        }
      }
    }, 10); // Delay helps WebKit render layout properly
  };
  useEffect(() => {
    if (window.screen.orientation) {
      window.screen.orientation.addEventListener(
        "change",
        handleOrientationChange
      );
    }
    window.addEventListener("resize", handleOrientationChange);

    return () => window.removeEventListener("resize", handleOrientationChange);
  }, []);

  useEffect(() => {
    let timeoutId;
    const observers = []; // Store MutationObservers for each accordion

    if (activeIndex !== -1) {
      timeoutId = setTimeout(() => {
        const accordions = document.querySelectorAll(".accordion");
        accordions.forEach((accordion) => adjustDataSourceMargin(accordion));
      }, 0);
    }

    return () => {
      clearTimeout(timeoutId);
      observers.forEach((observer) => observer.disconnect());
    };
  }, [activeIndex, isMobileOrTablet, orientation]);


  const handleItemClick = (index, e) => {
    const newOpenItems = activeIndex === index ? [] : [String(index)];
    setOpenItems(newOpenItems);
    setActive(posts[index].slug);
    if (newOpenItems.length > 0) {
      setScrollTarget(e.currentTarget);
    }
  };

  return (
    <Accordion openItems={openItems} onOpenItemsChange={setOpenItems}>
      {posts.map((post, index) => {
        const iconUrl =
          post.meta_fields?.icon
            ? post.meta_fields.icon[0]
            : null;

        return (
          <React.Fragment key={post.id}>
            <AccordionItem value={String(index)}>
            <AccordionTrigger onClick={(e) => handleItemClick(index, e)}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  {iconUrl && (
                    <MediaProvider id={iconUrl}>
                      <MediaConsumer>
                        <PostIcon className="icon" />
                      </MediaConsumer>
                    </MediaProvider>
                  )}
                  <span
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    style={{ marginLeft: iconUrl ? "10px" : "0" }}
                  />
                </div>
                <Icon name="chevron-down" />
              </div>
            </AccordionTrigger>
            <AccordionPanel className={"accordion-post-content"}>
              <div ref={ref}>
                <PostIntro post={post} as={Container} fluid />
              </div>
            </AccordionPanel>
            </AccordionItem>
          </React.Fragment>
        );
      })}
    </Accordion>
  );
};

const SingleTabbedView = ({ posts, showLabels, height }) => {
  const [activeItem, setActive] = useState(posts ? posts[0].slug : null);

  useEffect(() => {
    setTimeout(() => {
      if (window.location.hash) {
        const slug = window.location.hash.substr(1);
        const element = document.getElementById(slug);

        if (element && posts.map((p) => p.slug).indexOf(slug) > -1) {
          setActive(slug);
          element.scrollIntoView({ behavior: 'auto', block: 'start' });
        }
      }
    }, 0);
  }, [posts]);

  return (
    <React.Fragment>
      {posts.map((p) => (
        <anchor id={p.slug} key={p.slug}></anchor>
      ))}

      <Menu className="tabbed posts" text>
        <ItemMenu showLabels={showLabels} posts={posts} setActive={setActive} activeItem={activeItem} />
      </Menu>
      <Container className={'content-tab'} style={{ height: `${height}px` }}>
        <TabContent posts={posts} activeItem={activeItem} />
      </Container>
    </React.Fragment>
  );
};

const GridTabbedView = ({ posts, showLabels, showIcons, height }) => {
  const [activeItem, setActive] = useState(posts ? posts[0].slug : null);

  return (
    <React.Fragment>
      <Grid stackable className="tabbed posts" columns={posts.length} style={{ height: height + "px" }}>
        <GriNavigator showIcons={showIcons} showLabels={showLabels} posts={posts} activeItem={activeItem} setActive={setActive} />
        <GridRow style={{ height: `${height}px` }}>
          <GridColumn width={16} className={"content"}>
            <Container className={'content-tab'} style={{ height: `${height}px` }}>
              <TabContent className={"content-tab"} posts={posts} activeItem={activeItem} />
            </Container>
          </GridColumn>
        </GridRow>
      </Grid>
    </React.Fragment>
  );
};

const Wrapper = (props) => {
  let {
    "data-type": type,
    "data-taxonomy": taxonomy,
    "data-categories": categories,
    "data-items": items,
    "data-theme": theme = 'light',
    "data-show-icons": showIcons,
    "data-use-scrolls": useScrolls,
    "data-show-labels": showLabels,
    "data-height": height,
    "data-preview-mode": previewMode = 'Desktop',
    pageModuleProps,
    parent, editing, unique
  } = props;
  if (pageModuleProps?.previewMode && pageModuleProps?.editing) {
    previewMode = pageModuleProps.previewMode;
    editing = pageModuleProps.editing;
  }
  const locale = props.intl.locale;

  const scrollable = useScrolls === 'true';
  const conditionalHeight = scrollable ? height : undefined;

  const { width: deviceWidth } = useWindowDimensionsAndDevice();

  const isMobile = deviceWidth <= 1024;
  const isNotDesktopPreview = previewMode !== 'Desktop' && editing;
  const isMobileRenderMode = isMobile && !editing;

  return (
    <Container className={`viz tabbed posts ${editing ? 'editing' : ''} ${scrollable ? 'scrollable' : ''}`} fluid={true}>
      <PostProvider
        locale={locale}
        type={type}
        taxonomy={taxonomy}
        categories={categories}
        store={`tabbedposts_${parent}_${unique}`} page={1}
        perPage={items}>
        <PostConsumer>
          <PostConsumer>
            {(isMobileRenderMode || isNotDesktopPreview) ? (
              <AccordionContent posts={items} activeItem={items[0]?.slug} setActive={() => { }} />
            ) : theme === 'light' ? (
              <SingleTabbedView height={conditionalHeight} showLabels={showLabels === 'true'} />
            ) : (
              <GridTabbedView
                height={conditionalHeight}
                showLabels={showLabels === 'true'}
                showIcons={showIcons === 'true'}
              />
            )}
          </PostConsumer>
        </PostConsumer>
      </PostProvider>
    </Container>
  );
};

const mapStateToProps = (state, ownProps) => {
  const pageModuleProps = state.getIn([
    "data",
    "pageModuleProps"
  ]);
  const _props = {};
  if (pageModuleProps) {
    _props.pageModuleProps = pageModuleProps;
  }
  return _props;
};
const mapActionCreators = {};
export default connect(mapStateToProps, mapActionCreators)(injectIntl(Wrapper));
