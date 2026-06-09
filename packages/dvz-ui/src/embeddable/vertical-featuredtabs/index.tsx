import React, { useLayoutEffect, useEffect, useRef, useState } from "react";
import { Container, Accordion, Icon } from "semantic-ui-react";
import {
  PostConsumer,
  PostIcon,
  PostProvider,
  PostContent,
  MediaConsumer,
  MediaProvider,
} from "@devgateway/wp-react-lib";
import { connect } from "react-redux";
import PostIntro from "../connected-templates/PostIntro";

export interface VerticalFeaturedTabsProps {
  "data-height": number;
  "data-type": string;
  "data-taxonomy": string;
  "data-categories": string;
  "data-count": any;
  "data-colors": string;
  "data-cover-width"?: number;
  "data-read-more-label"?: string;
  "data-click-to-expand-label"?: string;
  "data-preview-mode"?: string;
  editing: boolean;
  parent: string;
  unique: string;
  intl: any;
  pageModuleProps: any;
}

interface AccordionContentProps {
  posts: any;
  activeItem: string;
  setActive: (slug: string) => void;
  colors: Record<string, string>;
}

interface IntroWithFeaturedImageProps {
  post: any;
  count: number;
  backgroundColor: string;
  active: boolean;
  dimensions: { width: number; height: number };
  height: number;
  coverWidth: number;
  index: number;
  editing: boolean;
  clickToExpandLabel?: string;
}

interface FeaturedTabsProps {
  editing: boolean;
  posts: any[];
  height: number;
  colors: Record<string, string>;
  coverWidth: number;
  moreLabel?: string;
}

const AccordionContent: React.FC<AccordionContentProps> = ({
  posts,
  activeItem,
  setActive,
  colors,
}) => {
  const [activeIndex, setActiveIndex] = useState(
    posts.findIndex((p) => p.slug === activeItem),
  );
  const [scrollTarget, setScrollTarget] = useState<HTMLElement | null>(null);

  const findElementAndAddStyles = (
    elementClass: string,
    containerClass: string,
    hasContainerClass: string,
  ) => {
    const elements = document.querySelectorAll(elementClass);
    elements.forEach((element) => {
      if (element.querySelector(containerClass)) {
        element.classList.add(hasContainerClass);
      }
    });
  };

  useEffect(() => {
    if (scrollTarget) {
      const offsetTop =
        scrollTarget.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }

    //  handles issues with older browsers that don't support the has() css selector
    findElementAndAddStyles(
      ".ui.fluid.container.viz.featured.tabs",
      ".accordion",
      "has-accordion",
    );
    findElementAndAddStyles(
      ".ui.fluid.container.viz.featured.tabs",
      "blockquote",
      "has-blockquote",
    );
    findElementAndAddStyles(
      ".ui.fluid.container.viz.featured.tabs",
      ".accordion .accordion-post-ft-title",
      "has-accordion-title",
    );
    findElementAndAddStyles(
      ".ui.fluid.container.viz.featured.tabs",
      ".accordion .accordion-post-vft-content",
      "has-accordion-content",
    );
    // Check if .vt-accordion-post-intro contains figure and add 'has-vt-accordion-figure' class
    findElementAndAddStyles(
      ".ui.fluid.container.viz.featured.tabs",
      ".vt-accordion-post-intro figure",
      "has-vt-accordion-figure",
    );
    // Check if .content.active.accordion-post-content contains .wp-block-columns and add 'has-wp-block-columns' class
    findElementAndAddStyles(
      ".ui.fluid.container.viz.featured.tabs",
      ".content.active.accordion-post-content .wp-block-columns",
      "has-wp-block-columns",
    );
  }, [scrollTarget]);

  useEffect(() => {
    return undefined;
  }, [activeIndex]);

  const handleClick = (e: React.MouseEvent, titleProps: { index: number }) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
    setActive(posts[index].slug);

    // Set the scroll target after updating the activeIndex
    if (newIndex !== -1) {
      setScrollTarget(e.currentTarget as HTMLElement);
    }
  };

  return (
    <Accordion fluid styled>
      {posts.map((post, index) => {
        const iconUrl = post.meta_fields?.icon
          ? post.meta_fields.icon[0]
          : null;
        return (
          <React.Fragment key={post.id}>
            <Accordion.Title
              active={activeIndex === index}
              index={index}
              onClick={(e) => handleClick(e, { index })}
              style={{ backgroundColor: colors[`color_${index}`] }}
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
                  <PostIntro post={post} className="vt-accordion-post-intro" />
                </div>
                <Icon name="chevron down" />
              </div>
            </Accordion.Title>
            <Accordion.Content
              className={"accordion-post-content accordion-post-vft-content"}
              active={activeIndex === index}
            >
              <PostContent post={post} />
            </Accordion.Content>
          </React.Fragment>
        );
      })}
    </Accordion>
  );
};

const IntroWithFeaturedImage: React.FC<IntroWithFeaturedImageProps> = ({
  post,
  count,
  backgroundColor,
  active,
  dimensions,
  height,
  coverWidth,
  index,
  editing,
  clickToExpandLabel,
}) => {
  const media = post._embedded ? post._embedded["wp:featuredmedia"] : null;
  const [isHovered, setIsHovered] = useState(false);
  const editingMargin = editing ? count - index : 1;

  return (
    <div className={"content-area"}>
      <div
        className={"cover"}
        style={{
          width: `${coverWidth}px`,
          backgroundColor: backgroundColor,
          backgroundImage: `url(${media ? media[0].source_url : ""})`,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="rotator"
          style={{
            width: `${height}px`,
            transform: `translate(${coverWidth / 2}px, 0px) rotate(90deg)`,
          }}
        >
          <PostIntro post={post} />
        </div>
        <div className="overlay-label-container">
          <div
            className={`overlay-label ${isHovered && !active ? "visible" : ""}`}
          >
            {clickToExpandLabel || "CLICK TO EXPAND"}
          </div>
          <div className="arrow-svg" />
        </div>
      </div>
      <div
        className={`collapsable-content ${active ? "expanded" : "collapsed"}`}
        style={{
          backgroundColor: "#f9f9f9",
          width: `${dimensions.width - coverWidth * count}px`,
          marginLeft: `${coverWidth * editingMargin}px`,
        }}
      >
        <PostContent post={post} />
      </div>
    </div>
  );
};

interface FeaturedTabsProps {
  editing: boolean;
  posts: Array<any>;
  height: number;
  colors: { [key: string]: string };
  coverWidth: number;
  clickToExpandLabel?: string;
}

const FeaturedTabs: React.FC<FeaturedTabsProps> = ({
  editing,
  posts,
  height,
  colors,
  coverWidth,
  clickToExpandLabel,
}) => {
  const [active, setActive] = useState<string | null>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Only switch to a new slug; do nothing if slug === active
  const toggleAnimation = (slug: string) => {
    if (active !== slug) {
      setActive(slug);
    }
  };

  // If in editing mode and nothing is active yet, open the first post by default
  useEffect(() => {
    if (posts.length > 0 && active === null && editing) {
      setActive(posts[0].slug);
    }
  }, [posts, active, editing]);

  // Measure dimensions and force overflow style on container
  useLayoutEffect(() => {
    if (targetRef.current?.parentElement) {
      setDimensions({
        width: editing
          ? (targetRef.current.parentElement?.parentElement?.offsetWidth ?? 0)
          : (targetRef.current.parentElement?.offsetWidth ?? 0),
        height: targetRef.current.offsetHeight,
      });
    }

    if (containerRef.current) {
      containerRef.current.style.overflow = editing ? "visible" : "hidden";
    }
  }, [editing]);

  return (
    <Container
      fluid={true}
      className="vertical featured tabs"
      ref={containerRef}
    >
      {posts?.map((post, i) => {
        const isActive = active ? post.slug === active : i === 0; // fallback if active is still null

        return (
          <div
            key={post.slug}
            ref={targetRef}
            onClick={() => toggleAnimation(post.slug)}
            className={isActive ? "item expanded" : "item collapsed"}
            style={{
              minHeight: `${height}px`,
              minWidth: `${coverWidth}px`,
            }}
          >
            <a id={post.slug}></a>
            <IntroWithFeaturedImage
              editing={editing}
              coverWidth={coverWidth}
              height={height}
              backgroundColor={colors[`color_${i}`]}
              count={posts.length}
              dimensions={dimensions}
              active={isActive}
              post={post}
              index={i}
              clickToExpandLabel={clickToExpandLabel}
            />
          </div>
        );
      })}
    </Container>
  );
};

const Wrapper: React.FC<VerticalFeaturedTabsProps> = (props) => {
  let {
    "data-height": height,
    "data-type": type,
    "data-taxonomy": taxonomy,
    "data-categories": categories,
    "data-count": items,
    "data-colors": colors,
    "data-cover-width": coverWidth = 50,
    "data-read-more-label": moreLabel = "READ More",
    "data-click-to-expand-label": clickToExpandLabel = "CLICK TO EXPAND",
    "data-preview-mode": previewMode = "Desktop",
    editing,
    parent,
    unique,
    pageModuleProps,
  } = props;

  if (pageModuleProps?.previewMode && pageModuleProps?.editing) {
    previewMode = pageModuleProps.previewMode;
    editing = pageModuleProps.editing;
  }

  const locale = props.intl.locale;
  const dataCategories = categories ? categories : "[]";

  // Determine screen width and conditionally render components
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(
    (window?.visualViewport?.width || window.innerWidth) <= 1365,
  );

  const getScreenOrientation = (): string => {
    return (
      window.screen.orientation?.type ||
      ((window?.visualViewport?.width || window.innerWidth) >
      (window?.visualViewport?.height || window.innerHeight)
        ? "landscape-primary"
        : "portrait-primary")
    );
  };

  const [orientation, setOrientation] = useState(getScreenOrientation());

  const handleOrientationChange = () => {
    setTimeout(() => {
      setOrientation(getScreenOrientation());
      setIsMobileOrTablet(
        (window?.visualViewport?.width || window.innerWidth) <= 1365,
      );
    }, 100);
  };

  useEffect(() => {
    if (window.screen.orientation) {
      window.screen.orientation.addEventListener(
        "change",
        handleOrientationChange,
      );
    }
    window.addEventListener("resize", handleOrientationChange);

    return () => {
      window.removeEventListener("resize", handleOrientationChange);
      if (window.screen.orientation) {
        window.screen.orientation.removeEventListener(
          "change",
          handleOrientationChange,
        );
      }
    };
  }, []);

  const decode = (value: string): string => {
    if (editing) {
      return value;
    }
    return decodeURIComponent(value);
  };

  const parse = (value: string): any => {
    if (!value) return null;
    try {
      return JSON.parse(decode(value));
    } catch (error) {
      console.error(`error parsing value:${value}\n error:${error}`);
    }

    return null;
  };

  const isNotDesktopPreview = previewMode !== "Desktop" && editing;
  const isMobileRenderMode = isMobileOrTablet && !editing;

  return (
    <Container
      style={{ maxWidth: "100%" }}
      className={`viz featured tabs ${editing ? "editing" : ""}`}
      fluid={true}
      key={orientation + Math.random()}
    >
      <PostProvider
        type={type}
        locale={locale}
        taxonomy={taxonomy}
        categories={parse(dataCategories)}
        store={`vertical_tabs${parent}_${unique}`}
        page={1}
        perPage={items}
      >
        <PostConsumer>
          {isMobileRenderMode || isNotDesktopPreview ? (
            <AccordionContent
              posts={items}
              activeItem={items?.[0]?.slug}
              colors={parse(colors)}
              setActive={() => {}}
            />
          ) : (
            <FeaturedTabs
              editing={editing}
              coverWidth={coverWidth}
              moreLabel={moreLabel}
              clickToExpandLabel={clickToExpandLabel}
              colors={parse(colors)}
              height={height}
              posts={items}
            />
          )}
        </PostConsumer>
      </PostProvider>
    </Container>
  );
};

const mapStateToProps = (state, _ownProps) => {
  const pageModuleProps = state.getIn(["data", "pageModuleProps"]);
  const _props: { pageModuleProps?: Record<string, unknown> } = {};
  if (pageModuleProps) {
    _props.pageModuleProps = pageModuleProps as VerticalFeaturedTabsProps["pageModuleProps"];
  }
  return _props;
};
const mapActionCreators = {};
export default connect(mapStateToProps, mapActionCreators)(Wrapper);
