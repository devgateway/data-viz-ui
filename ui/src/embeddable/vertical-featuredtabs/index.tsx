import React, {useLayoutEffect, useEffect, useRef, useState, LegacyRef} from 'react'
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

export interface VerticalFeaturedTabsProps {
    "data-height": number;
    "data-type": string;
    "data-taxonomy": string;
    "data-categories": string;
    "data-count": number;
    "data-colors": string;
    "data-cover-width"?: number;
    "data-read-more-label"?: string;
    editing: boolean;
    parent: string;
    unique: string;
    intl: any;
}



const AccordionContent = ({ posts, activeItem, setActive, colors }) => {
    const [activeIndex, setActiveIndex] = useState(posts.findIndex(p => p.slug === activeItem));
    const [scrollTarget, setScrollTarget] = useState<any>(null);

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

    const targetRef = useRef<HTMLDivElement>();
    const [dimensions, setDimensions] = useState({width: 0, height: 0});


    const toggleAnimation = (k) => {
        setActive(k)
    }
    useLayoutEffect(() => {
        if (targetRef.current && targetRef.current.parentElement) {
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
                    ref={targetRef as LegacyRef<HTMLDivElement>}
                    onClick={e => toggleAnimation(post.slug)}
                    className={isActive ? "item expanded" : "item collapsed"}
                    style={{"minHeight": height + 'px', "minWidth": `${coverWidth}px`}}>
                    <a id={post.slug}></a>
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
  const dataCategories = categories ? categories : "[]";

  // Determine screen width and conditionally render components
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1440);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1250);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
    >
      <PostProvider
        type={type}
        locale={locale}
        taxonomy={taxonomy}
        categories={parse(dataCategories)}
        store={"vertical_tabs" + parent + "_" + unique}
        page={1}
        perPage={items}
      >
        <PostConsumer>
          {isMobile ? (
            <AccordionContent
              posts={items}
              activeItem={items?.[0]?.slug}
              colors={parse(colors)}
              setActive={() => {}}
            />
          ):  (
            <FeaturedTabs
              editing={editing}
              coverWidth={coverWidth}
              // @ts-ignore
              moreLabel={moreLabel as any}
              colors={colors ? parse(colors): null}
              height={height}
            ></FeaturedTabs>
          )}
        </PostConsumer>
      </PostProvider>
    </Container>
  );
};


export default Wrapper
