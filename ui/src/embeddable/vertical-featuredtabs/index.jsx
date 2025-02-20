import React, {useLayoutEffect, useEffect, useRef, useState} from 'react'
import {Container, Accordion, Icon} from 'semantic-ui-react'
import {
    PostConsumer,
    PostIcon,
    PostProvider,
    PostContent,
    MediaConsumer,
    MediaProvider
} from "@devgateway/wp-react-lib";
import PostIntro from "../connected-templates/PostIntro";

const AccordionContent = ({ posts, activeItem, setActive, colors }) => {
    const [activeIndex, setActiveIndex] = useState(posts.findIndex(p => p.slug === activeItem));
    const [scrollTarget, setScrollTarget] = useState(null);


    const findElementAndAddStyles = (elementClass, containerClass, hasContainerClass) => {
        const elements = document.querySelectorAll(elementClass);
        elements.forEach((element) => {
            if(element.querySelector(containerClass)) {
                element.classList.add(hasContainerClass);
            }
        });
    }

    useEffect(() => {
        if (scrollTarget) {
            const offsetTop = scrollTarget.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth',
            });
        }

        //  handles issues with older browsers that don't support the has() css selector
        findElementAndAddStyles('.ui.fluid.container.viz.featured.tabs', '.accordion', 'has-accordion');
        findElementAndAddStyles('.ui.fluid.container.viz.featured.tabs', 'blockquote', 'has-blockquote');
        findElementAndAddStyles('.ui.fluid.container.viz.featured.tabs', '.accordion .accordion-post-ft-title', 'has-accordion-title');
        findElementAndAddStyles('.ui.fluid.container.viz.featured.tabs', '.accordion .accordion-post-vft-content', 'has-accordion-content');
        // Check if .vt-accordion-post-intro contains figure and add 'has-vt-accordion-figure' class
        findElementAndAddStyles('.ui.fluid.container.viz.featured.tabs', '.vt-accordion-post-intro figure', 'has-vt-accordion-figure');

        // Check if .content.active.accordion-post-content contains .wp-block-columns and add 'has-wp-block-columns' class
        findElementAndAddStyles('.ui.fluid.container.viz.featured.tabs', '.content.active.accordion-post-content .wp-block-columns', 'has-wp-block-columns');

    }, [scrollTarget]);

    useEffect(() => {
      let timeoutId;
      let observers = []; // Store MutationObservers for each accordion

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
            const dataSourceMarginTop = parseFloat(dataSourceStyles.marginTop) || 0;
            const legendsMarginBottom = parseFloat(legendsStyles.marginBottom) || 0;

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

              const wpColumnAfterChartMarginTop = parseFloat(wpColumnAfterChartStyles.marginTop) || 0;
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
              const chartContainerMarginBottom = parseFloat(chartContainerStyles.marginBottom) || 0;
              const adjustedChartContainerBottom = chartContainerRect.bottom + chartContainerMarginBottom;

              const legendsMarginTop = parseFloat(legendsStyles.marginTop) || 0;
              const adjustedLegendsTop = legendsRect.top - legendsMarginTop;

              if (adjustedLegendsTop < adjustedChartContainerBottom) {
                const overlap = adjustedChartContainerBottom - adjustedLegendsTop;
                legendsContainer.style.marginTop = `${overlap + 20}px`; // Extra padding
              }
            }
          }
        }, 10); // Delay helps WebKit render layout properly
      };

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
    }, [activeIndex]);


    const handleClick = (e, titleProps) => {
        const { index } = titleProps;
        const newIndex = activeIndex === index ? -1 : index;
        setActiveIndex(newIndex);
        setActive(posts[index].slug);

        // Set the scroll target after updating the activeIndex
        if (newIndex !== -1) {
            setScrollTarget(e.currentTarget);
        }
    };

    return (
        <Accordion fluid styled>
            {posts.map((post, index) => {
                const iconUrl = post.meta_fields && post.meta_fields.icon ? post.meta_fields.icon[0] : null;

                return (
                    <React.Fragment key={post.id}>
                        <Accordion.Title
                            active={activeIndex === index}
                            index={index}
                            onClick={handleClick}
                            style={{ backgroundColor: colors[`color_${index}`]  }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    {iconUrl && (
                                        <MediaProvider id={iconUrl}>
                                            <MediaConsumer>
                                                <PostIcon className="icon" />
                                            </MediaConsumer>
                                        </MediaProvider>
                                    )}
                                    <PostIntro post={post} className="vt-accordion-post-intro"/>
                                </div>
                                <Icon name="chevron down" />
                            </div>
                        </Accordion.Title>
                        <Accordion.Content className={"accordion-post-content accordion-post-vft-content"} active={activeIndex === index}>
                            <PostContent post={post} />
                        </Accordion.Content>
                    </React.Fragment>
                );
            })}
        </Accordion>
    );
};

const IntroWithFeaturedImage = ({ post, count, backgroundColor, active, dimensions, height, coverWidth }) => {
    const media = post['_embedded'] ? post['_embedded']["wp:featuredmedia"] : null;
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className={"content-area"}>
            <div
                className={"cover"}
                style={{
                    'width': `${coverWidth}px`,
                    "backgroundColor": backgroundColor,
                    "backgroundImage": 'url(' + (media ? media[0].source_url : '') + ')'
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="rotator" style={{ width: height + 'px', "transform": `translate(${coverWidth / 2}px, 0px) rotate(90deg)` }}>
                    <PostIntro post={post} />
                </div>
                <div className="overlay-label-container">
                    <div className={`overlay-label ${isHovered && !active ? 'visible' : ''}`}>CLICK TO EXPAND</div>
                    <div className="arrow-svg"></div>
                </div>
            </div>
            <div className={`collapsable-content ${active ? 'expanded' : 'collapsed'}`}
                 style={{
                     "backgroundColor": "#f9f9f9",
                     width: dimensions.width - (coverWidth * count) + 'px',
                     "marginLeft": `${coverWidth}px`
                 }}
            >
                <PostContent post={post} />
            </div>
        </div>
    );
};


const FeaturedTabs = ({editing, posts, height, colors, coverWidth}) => {

    const [active, setActive] = useState(null)

    const targetRef = useRef();
    const [dimensions, setDimensions] = useState({width: 0, height: 0});


    const toggleAnimation = (k) => {
        setActive(k)
    }
    useLayoutEffect(() => {
        if (targetRef.current) {
            setDimensions({
                width: targetRef.current.parentElement.offsetWidth,
                height: targetRef.current.offsetHeight
            });
        }
    }, []);

    return (
        <Container fluid={true} className={`vertical featured tabs ${editing ? 'editing' : ''}`}>
            {posts && posts.map((post, i) => {
                const isActive = active ? post.slug === active : i === 0
                return <div
                    key={post.slug}
                    ref={targetRef}
                    onClick={e => toggleAnimation(post.slug)}
                    className={isActive ? "item expanded" : "item collapsed"}
                    style={{"minHeight": height + 'px', "minWidth": `${coverWidth}px`}}>
                    <anchor id={post.slug}></anchor>
                    <IntroWithFeaturedImage coverWidth={coverWidth}
                                            height={height}
                                            backgroundColor={colors['color_' + i]} count={posts.length}
                                             dimensions={dimensions} active={isActive} post={post}/>
                </div>

            })}


        </Container>
    )
}


const Wrapper = (props) => {
  const {
    "data-height": height,
    "data-type": type,
    "data-taxonomy": taxonomy,
    "data-categories": categories,
    "data-count": items,
    "data-colors": colors,
    "data-cover-width": coverWidth = 50,
    "data-read-more-label": moreLabel = "READ More",
    editing,
    parent,
    unique,
  } = props;
  const locale = props.intl.locale;

  // Determine screen width and conditionally render components
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(window.innerWidth <= 1365);
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
        setIsMobileOrTablet(window.innerWidth <= 1365);
      }, 100);
    }
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

  const decode = (value) => {
    if (editing) {
      return value;
    }
    return decodeURIComponent(value);
  };
  const parse = (value) => {
    try {
      return JSON.parse(decode(value));
    } catch (error) {
      console.error("error parsing value:" + value);
    }

    return null;
  };
  return (
    <Container
      style={{ "max-width": "100%" }}
      className={`viz featured tabs ${editing ? "editing" : ""}`}
      fluid={true}
      key={orientation}
    >
      <PostProvider
        type={type}
        locale={locale}
        taxonomy={taxonomy}
        categories={parse(categories).join(",")}
        store={"vertical_tabs" + parent + "_" + unique}
        page={1}
        perPage={items}
      >
        <PostConsumer>
          {isMobileOrTablet ? (
            <AccordionContent
              posts={items}
              activeItem={items[0]?.slug}
              colors={parse(colors)}
              setActive={() => {}}
            />
          ):  (
            <FeaturedTabs
              editing={editing}
              coverWidth={coverWidth}
              moreLabel={moreLabel}
              colors={parse(colors)}
              height={height}
            ></FeaturedTabs>
          )}
        </PostConsumer>
      </PostProvider>
    </Container>
  );
};


export default Wrapper
