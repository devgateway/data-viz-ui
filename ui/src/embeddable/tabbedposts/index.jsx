import React, { useEffect, useRef, useState } from 'react';
import { Button, Container, Grid, Label, Menu, Accordion, Icon } from 'semantic-ui-react';
import { MediaConsumer, MediaProvider, PostConsumer, PostIcon, PostLabel, PostProvider } from "@devgateway/wp-react-lib";
import { injectIntl } from "react-intl";
import PostIntro from "../connected-templates/PostIntro";
import getDeviceType from '../../utils/deviceType';

const ItemMenu = ({ posts, activeItem, setActive, showLabels }) => {
    return posts ? posts.map(post => (
        <Menu.Item key={post.id} onClick={() => setActive(post.slug)} className={post.slug === activeItem ? 'active' : ''}>
            {showLabels ? <PostLabel post={post} /> : <Label><span dangerouslySetInnerHTML={{ __html: post.title.rendered }} /></Label>}
        </Menu.Item>
    )) : null;
};

const GriNavigator = ({ posts, activeItem, setActive, showIcons, showLabels }) => {
    const count = posts.length;
    return posts ? posts.map(post => {
        const iconUrl = post['_embedded'] && post['_embedded']["wp:featuredmedia"] ? post['_embedded']["wp:featuredmedia"][0].source_url : null;
        return (
            <Grid.Column key={post.id} className={(post.slug === activeItem ? 'active' : '') + (showIcons ? ' has-icon' : '')}>
                <Button onClick={() => setActive(post.slug)} className={`nav  ${count === 1 ? 'one' : ''}`}>
                    {showIcons && (
                        <MediaProvider id={post.meta_fields && post.meta_fields.icon ? post.meta_fields.icon[0] : null}>
                            <MediaConsumer>
                                <PostIcon className={"icon"} />
                            </MediaConsumer>
                        </MediaProvider>
                    )}
                    {showLabels ? <PostLabel post={post} /> : <Label><span dangerouslySetInnerHTML={{ __html: post.title.rendered }} /></Label>}
                </Button>
            </Grid.Column>
        );
    }) : null;
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
    const [activeIndex, setActiveIndex] = useState(
        posts.findIndex((p) => p.slug === activeItem)
    );
    const [scrollTarget, setScrollTarget] = useState(null);
    const ref = useRef(null);
    const isMobileOrTablet =
        getDeviceType() === "mobile" ||
        getDeviceType() === "tablet" ||
        getDeviceType() === "midTablet";

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

    useEffect(() => {
        let timeoutId;
        let observers = []; // Array to store observers for each accordion

        const adjustDataSourceMargin = (ref) => {
            requestAnimationFrame(() => {
                // Find all legend containers
                const legendsContainers = ref.querySelectorAll(
                    ".accordion .legends.container.has-standard-12-font-size.bottom, .legends.container.items-section"
                );

                if (legendsContainers.length === 0) {
                    return;
                }

                for (const legendsContainer of legendsContainers) {
                    const container = legendsContainer.closest(
                        ".ui.fluid.container.content"
                    );
                    const dataSourceParagraph = container
                        ? container.querySelector(".data-source")
                        : null;

                    if (!dataSourceParagraph) {
                        continue;
                    }

                    // Check if the elements have dimensions and are visible
                    if (
                        legendsContainer.offsetParent === null ||
                        dataSourceParagraph.offsetParent === null
                    ) {
                        continue;
                    }

                    // Get bounding rectangles
                    const dataSourceRect = dataSourceParagraph.getBoundingClientRect();
                    const legendsRect = legendsContainer.getBoundingClientRect();

                    // Get computed styles to include margins in the calculation
                    const dataSourceStyles = window.getComputedStyle(dataSourceParagraph);
                    const legendsStyles = window.getComputedStyle(legendsContainer);

                    // Get the margins (parse as float to get numeric values)
                    const dataSourceMarginTop =
                        parseFloat(dataSourceStyles.marginTop) || 0;
                    const legendsMarginBottom =
                        parseFloat(legendsStyles.marginBottom) || 0;

                    // Adjust margins if there's an overlap
                    const adjustedLegendsBottom =
                        legendsRect.bottom + legendsMarginBottom; // Including margin-bottom of legends

                    const legendsMarginTop = parseFloat(legendsStyles.marginTop) || 0;
                    const adjustedLegendsTop = legendsRect.top - legendsMarginTop; // Adjusted top of legends container


                    const adjustedDataSourceTop =
                        dataSourceRect.top - dataSourceMarginTop; // Including margin-top of data-source

                    if (adjustedLegendsBottom > adjustedDataSourceTop) {
                        const overlap = adjustedLegendsBottom - adjustedDataSourceTop;
                        dataSourceParagraph.style.marginTop = `${overlap + 20}px`; // Add some extra padding
                    }


                    // check for overlap with the next wp-block-column
                    const wpColumnAfterChart = legendsContainer.closest(
                        ".wp-block-column.is-layout-flow.wp-block-column-is-layout-flow"
                    )?.nextElementSibling;

                    if (wpColumnAfterChart) {
                        // check for overlap with legend container
                        const wpColumnAfterChartRect =
                            wpColumnAfterChart.getBoundingClientRect();
                        const wpColumnAfterChartStyles =
                            window.getComputedStyle(wpColumnAfterChart);

                        const wpColumnAfterChartMarginTop =
                            parseFloat(wpColumnAfterChartStyles.marginTop) || 0;
                        const legendsMarginBottom =
                            parseFloat(legendsStyles.marginBottom) || 0;

                        const adjustedWpColumnAfterChartTop =
                            wpColumnAfterChartRect.top - wpColumnAfterChartMarginTop;
                        const adjustedLegendsBottom =
                            legendsRect.bottom + legendsMarginBottom;

                        if (adjustedLegendsBottom > adjustedWpColumnAfterChartTop) {
                            const overlap =
                                adjustedLegendsBottom - adjustedWpColumnAfterChartTop;
                            wpColumnAfterChart.style.marginTop = `${overlap + 20}px`; // Add some extra padding
                        }
                    }

                    // check for overlap with the chart container above it
                    const chartContainer = legendsContainer.closest(
                        ".chart.container"
                    );

                    if (chartContainer) {
                        const chartContainerRect = chartContainer.getBoundingClientRect();
                        const chartContainerStyles = window.getComputedStyle(chartContainer);
                        const chartContainerMarginBottom = parseFloat(chartContainerStyles.marginBottom) || 0;
                        const adjustedChartContainerBottom = chartContainerRect.bottom + chartContainerMarginBottom; // Adjusted bottom of chart container

                        // Check for overlap and adjust margin-bottom of chartContainer if necessary
                        if (adjustedLegendsTop < adjustedChartContainerBottom) {
                            const overlap = adjustedChartContainerBottom - adjustedLegendsTop;
                            legendsContainer.style.marginTop = `${overlap + 20}px`; // Add some extra padding
                        }
                    }
                }
            });
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
    }, [activeIndex, isMobileOrTablet]);

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
                const iconUrl =
                    post.meta_fields && post.meta_fields.icon
                        ? post.meta_fields.icon[0]
                        : null;

                return (
                    <React.Fragment key={post.id}>
                        <Accordion.Title
                            active={activeIndex === index}
                            index={index}
                            onClick={handleClick}
                        >
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
                                <Icon name="chevron down" />
                            </div>
                        </Accordion.Title>
                        <Accordion.Content
                            className={"accordion-post-content"}
                            active={activeIndex === index}
                        >
                            <div ref={ref}>
                                <PostIntro post={post} as={Container} fluid />
                            </div>
                        </Accordion.Content>
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

    useEffect(() => {
        if (activeItem) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [activeItem]);

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
                <Grid.Row style={{ height: height + "px" }}>
                    <Grid.Column width={16} className={"content"}>
                        <Container className={'content-tab'} style={{ height: `${height}px` }}>
                            <TabContent className={"content-tab"} posts={posts} activeItem={activeItem} />
                        </Container>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </React.Fragment>
    );
};

const Wrapper = (props) => {
    const {
        "data-type": type,
        "data-taxonomy": taxonomy,
        "data-categories": categories,
        "data-items": items,
        "data-theme": theme = 'light',
        "data-show-icons": showIcons,
        "data-use-scrolls": useScrolls,
        "data-show-labels": showLabels,
        "data-height": height,
        parent, editing, unique
    } = props;
    const locale = props.intl.locale;

    const scrollable = useScrolls === 'true';
    const conditionalHeight = scrollable ? height : undefined;

    // Determine screen width and conditionally render components
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1250);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1250);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <Container className={`viz tabbed posts ${editing ? 'editing' : ''} ${scrollable ? 'scrollable' : ''}`} fluid={true}>
            <PostProvider
                locale={locale}
                type={type}
                taxonomy={taxonomy}
                categories={categories}
                store={"tabbedposts_" + parent + '_' + unique} page={1}
                perPage={items}>
                <PostConsumer>
                    <PostConsumer>
                        {isMobile ? (
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

export default injectIntl(Wrapper);