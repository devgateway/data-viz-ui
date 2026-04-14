import React, { useEffect, useState } from 'react'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent as AccordionPanel, Container, Grid, GridColumn, GridRow, Icon, Badge, Segment, type ColSpan } from '@devgateway/ui'
import {
    MediaConsumer,
    MediaProvider,
    PostConsumer,
    PostIcon,
    PostProvider,
    PostTitle,
    PostContent,
    Media,
    MediaContext
} from "@devgateway/wp-react-lib";
import PostIntro from "../connected-templates/PostIntro";
import { useWindowDimensionsAndDevice } from '@/lib/hooks/window-dimensions';
import { connect } from 'react-redux';


interface FeaturedTabsProps {
    posts?: any[],
    width: number,
    height: number,
    color: string,
    moreLabel: string,
    closeLabel?: string
}

export interface FeatureTabsProps {
    "data-width": number,
    "data-height": number,
    "data-type": string,
    "data-taxonomy": string,
    "data-categories": string,
    "data-items": any,
    "data-color": string,
    "data-read-more-label": string,
    "data-close-label": string,
    "data-use-scrolls": string,
    "data-preview-mode": string,
    pageModuleProps: any,
    editing: boolean,
    parent: number,
    unique: number,
    intl: any
}

interface FeaturedPostProps {
    post: any;
    onClick: () => void;
    active?: boolean;
    moreLabel: string;
    mediaData: Media | null;
}

interface GetFigureFromPostProps {
    post: any;
}

interface AccordionContentProps {
    posts: any[];
    activeItem: string;
    setActive: (slug: string) => void;
    color: string;
}

// Desktop FeaturedPost Component
const FeaturedPost: React.FC<FeaturedPostProps> = ({ post, onClick, active, moreLabel, mediaData }) => {
    const media = post['_embedded'] ? post['_embedded']["wp:featuredmedia"] : null;
    const mediaUrl = mediaData ? mediaData.source_url : (media && media.length > 0 ? media[0].source_url : null);

    return (
        <div className="cover" style={{ "backgroundImage": `url(${mediaUrl ? mediaUrl : ''})` }}>
            <PostIntro post={post} />
            {!active ?
                <Badge onClick={onClick}><Icon name='search' size="large" /> {moreLabel}</Badge> :
                <Badge onClick={onClick}><Icon name='arrow-left-circle' size="large" /> Back </Badge>}
        </div>
    );
};

const GetFigureFromPost: React.FC<GetFigureFromPostProps> = ({ post }) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(post.content.rendered, 'text/html');
    const figureElement = doc.querySelector('figure');
    if (!figureElement) {
        return null;
    }
    return (
        <div style={{
            flex: '0 0 40px'
        }} dangerouslySetInnerHTML={{ __html: figureElement.outerHTML }} />
    );
};

// Desktop FeaturedTabs Component
const FeaturedTabs: React.FC<FeaturedTabsProps> = ({ posts, width, height, color, moreLabel, closeLabel }) => {
    const [active, setActive] = useState<string | null>(null);
    const [visible, setVisible] = useState(false);
    const [scrollPos, setScrollPos] = useState<[number, number]>([0, 0]);
    const arrayColors = color.split(',');

    const toggleAnimation = (k: string) => {
        if (!visible) {
            setActive(k);
            setVisible(true);
        } else {
            setVisible(false);
            setActive(k);
        }
    };

    useEffect(() => {
        if (active) {
            setScrollPos([window.scrollX, window.scrollY]);
        }
        if (active == null) {
            window.scrollTo(scrollPos[0], scrollPos[1]);
        }
    }, [active]);

    useEffect(() => {
        window.setTimeout(() => {
            if (window.location.hash) {
                const slug = window.location.hash.substr(1);
                const element = document.getElementById(slug);

                if (element && posts && posts.map(p => p.slug).indexOf(slug) > -1) {
                    setActive(slug);
                    element.scrollIntoView({ behavior: "auto", block: "start" });
                }
            }
        }, 0);
    }, [posts]);

    return (
        <Container fluid={true} className="featured tabs" style={{ minHeight: `${height}px` }}>
            <Grid stackable columns={active != null ? 1 : (posts?.length as ColSpan)} className="desktop">
                {posts?.map((post, i) => (
                    <React.Fragment key={post.slug}>
                        <GridColumn
                            style={active == null ? { display: 'block', visibility: 'visible', backgroundColor: arrayColors[i] } : { display: 'none', visibility: 'hidden' }}
                        >
                            <a id={post.slug} />
                            {/* @ts-ignore */}
                            <MediaProvider id={post.featured_media}>
                                <MediaContext.Consumer>
                                    {({media }) =>(
                                        <FeaturedPost post={post} mediaData={media} moreLabel={moreLabel} onClick={() => toggleAnimation(post.slug)} />
                                    )}
                                        

                            </MediaContext.Consumer>
                        </MediaProvider>
                    </GridColumn>

                        <GridColumn
                            className="expanded"
                            style={active != post.slug ? { display: 'none', visibility: 'hidden' } : { display: 'block', visibility: 'visible' }}
                        >
                            <Segment style={{ "backgroundColor": arrayColors[i] }}>
                                {post.meta_fields?.icon &&
                                    <MediaProvider id={post.meta_fields ? post.meta_fields.icon[0] : null}>
                                        <MediaConsumer>
                                            <PostIcon />
                                        </MediaConsumer>
                                    </MediaProvider>
                                }
                                <PostTitle as={"h2"} post={post} className={"has-standard-36-font-size has-white-color"} />
                                <Badge className={"closeIcon"} onClick={() => setActive(null)}><Icon name='x-circle' size="large" /></Badge>
                            </Segment>
                            <PostContent as={"div"} fluid={true} post={post} style={{ maxHeight: `calc(${height}px - 150px)` }}
                            />
                            <Badge className={"closeIconText"} style={{ backgroundColor: `${arrayColors[i]}` }} onClick={() => setActive(null)}><Icon name='x-circle' size="large" /> {closeLabel || 'Close'} </Badge>
                        </GridColumn>
                    </React.Fragment>
                ))}
            </Grid>
        </Container>
    );
};

// Mobile AccordionContent Component
const AccordionContent: React.FC<AccordionContentProps> = ({ posts, activeItem, setActive, color }) => {
    const [openItems, setOpenItems] = useState<string[]>(() => {
        const idx = posts.findIndex(p => p.slug === activeItem);
        return idx >= 0 ? [String(idx)] : [];
    });
    const activeIndex = openItems.length > 0 ? parseInt(openItems[0]) : -1;
    const [scrollTarget, setScrollTarget] = useState<HTMLElement | null>(null);
    const arrayColors = color.split(',');

    const getScreenOrientation = (): string => {
        return (
            window.screen.orientation?.type ||
            (window.innerWidth > window.innerHeight
                ? "landscape-primary"
                : "portrait-primary")
        );
    };
    const [orientation, setOrientation] = useState(getScreenOrientation());

    const handleOrientationChange = () => {
        setTimeout(() => {
            setOrientation(getScreenOrientation());
        }, 100);
    };

    const findElementAndAddStyles = (elementClass: string, containerClass: string, hasContainerClass: string) => {
        const elements = document.querySelectorAll(elementClass);
        elements.forEach((element) => {
            if (element.querySelector(containerClass)) {
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
        // adds classes to the container to allow for styling
        findElementAndAddStyles('.ui.fluid.container.viz.featured.tabs', '.accordion .accordion-post-ft-title', 'has-accordion-title');
        findElementAndAddStyles('.ui.fluid.container.viz.featured.tabs', '.accordion .accordion-post-vft-content', 'has-accordion-content')
        findElementAndAddStyles('.ui.fluid.container.viz.featured.tabs', 'blockquote', 'has-blockquote');
        findElementAndAddStyles('.ui.fluid.container.viz.featured.tabs', '.vt-accordion-post-intro figure', 'has-vt-accordion-figure');
        findElementAndAddStyles('.ui.fluid.container.viz.featured.tabs', '.content.active.accordion-post-content .wp-block-columns', 'has-wp-block-columns');
    }, [scrollTarget]);

    useEffect(() => {
        if (window.screen.orientation) {
            window.screen.orientation.addEventListener(
                "change",
                handleOrientationChange
            );
        }
        window.addEventListener("resize", handleOrientationChange);
        return () => {
            window.removeEventListener("resize", handleOrientationChange);
            if (window.screen.orientation) {
                window.screen.orientation.removeEventListener(
                    "change",
                    handleOrientationChange
                );
            }
        };
    }, []);

    const handleClick = (e: React.MouseEvent, index: number) => {
        const isOpening = !openItems.includes(String(index));
        const newOpenItems = isOpening ? [String(index)] : [];
        setOpenItems(newOpenItems);
        const newIndex = isOpening ? index : -1;
        if (newIndex >= 0) {
            setActive(posts[newIndex].slug);
        }

        // Set the scroll target after updating the activeIndex
        if (isOpening) {
            setScrollTarget(e.currentTarget as HTMLElement);
        }
    };

    return (
        <Accordion fluid openItems={openItems} onOpenItemsChange={(val) => setOpenItems(Array.isArray(val) ? val : [val])}>
            {posts.map((post, index) => {
                const iconUrl = post.meta_fields?.icon ? post.meta_fields.icon[0] : null;

                return (
                    <AccordionItem key={post.id} value={String(index)}>
                        <AccordionTrigger
                            onClick={(e) => handleClick(e, index)}
                            style={{ backgroundColor: arrayColors[index] }}
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
                                    {!iconUrl && <GetFigureFromPost post={post} />}
                                    <p className='accordion-post-ft-title' dangerouslySetInnerHTML={{ __html: post.title.rendered }} style={{ marginLeft: '10px' }} />
                                </div>
                                <Icon name="chevron-down" />
                            </div>
                        </AccordionTrigger>
                        <AccordionPanel className={"accordion-post-ft-content"}>
                            <PostContent post={post} />
                        </AccordionPanel>
                    </AccordionItem>
                );
            })}
        </Accordion>
    );
};

// Wrapper Component for Handling Mobile and Desktop View
const Wrapper: React.FC<FeatureTabsProps> = (props) => {
    let {
        "data-width": width,
        "data-height": height,
        "data-type": type,
        "data-taxonomy": taxonomy,
        "data-categories": categories,
        "data-items": items,
        "data-color": color,
        "data-use-scrolls": useScrolls,
        "data-read-more-label": moreLabel = "READ More",
        "data-close-label": closeLabel = "Close",
        "data-preview-mode": previewMode = "Desktop",
        editing,
        parent,
        unique,
        pageModuleProps
    } = props;
    const locale = props.intl.locale;

    if (pageModuleProps?.editing && pageModuleProps?.previewMode) {
        editing = pageModuleProps.editing;
        previewMode = pageModuleProps.previewMode;
    }

    const scrollable = useScrolls == 'true';

    const { width: deviceWidth } = useWindowDimensionsAndDevice();

    // Determine screen width and conditionally render components
    const isMobile = deviceWidth <= 1250;
    const isNotDesktopPreview = previewMode !== 'Desktop' && editing;
    const isMobileRenderMode = isMobile && !editing;

    return (
        <Container
            className={`viz featured tabs ${editing ? 'editing' : ''} ${scrollable ? 'scrollable' : ''}`}
            fluid={true}
        >
            <PostProvider
                locale={locale}
                type={type}
                taxonomy={taxonomy}
                categories={categories}
                store={`tabbedposts_${parent}_${unique}`}
                page={1}
                perPage={items}
            >
                <PostConsumer>
                    {(isNotDesktopPreview || isMobileRenderMode) ? (
                        <AccordionContent
                            posts={items}
                            activeItem={items?.[0]?.slug}
                            color={color}
                            setActive={() => { }}
                        />
                    ) : (
                        <FeaturedTabs
                            moreLabel={moreLabel}
                            closeLabel={closeLabel}
                            color={color}
                            width={width}
                            height={height}
                        />
                    )}
                </PostConsumer>
            </PostProvider>
        </Container>
    );
};

const mapStateToProps = (state, _ownProps) => {
    const pageModuleProps = state.getIn([
        "data",
        "pageModuleProps"
    ]);
    const _props: { pageModuleProps?: Record<string, unknown> } = {};
    if (pageModuleProps) {
        _props.pageModuleProps = pageModuleProps;
    }
    return _props;
};
const mapActionCreators = {};
export default connect(mapStateToProps, mapActionCreators)(Wrapper);

