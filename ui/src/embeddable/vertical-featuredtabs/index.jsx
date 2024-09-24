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

    useEffect(() => {
        if (scrollTarget) {
            const offsetTop = scrollTarget.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth',
            });
        }
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
        categories={parse(categories).join(",")}
        store={"vertical_tabs" + parent + "_" + unique}
        page={1}
        perPage={items}
      >
        <PostConsumer>
          {isMobile ? (
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
