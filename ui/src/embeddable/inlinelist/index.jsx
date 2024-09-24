import React, { useEffect, useState } from "react";
import { Container, Grid, Label } from "semantic-ui-react";
import {
  MediaConsumer,
  MediaProvider,
  PostConsumer,
  PostIcon,
  PostProvider,
  utils,
} from "@devgateway/wp-react-lib";
import PostIntro from "../connected-templates/PostIntro";
import PostContent from "../connected-templates/PostContent";

const ListOfPost = (props) => {
  const {
    posts,
    showIcons,
    showContentToggle,
    contentToggleHPosition,
    locale,
  } = props;
  const [toggleState, setToggleState] = useState({});
  const postTopRef = React.createRef();
  useEffect(() => {
    window.setTimeout(() => {
      if (window.location.hash) {
        const element = document.getElementById(window.location.hash.substr(1));
        if (element) {
          element.scrollIntoView({ behavior: "auto", block: "start" });
        }
      }
    }, 0);
  }, posts);

  const hasBody = (post) => {
    const contentParts = post.content
      ? post.content.rendered.split("<!--more-->")
      : [];
    return contentParts.length > 1 && contentParts[1].trim().length > 0;
  };

  const getBody = (post) => {
    const contentParts = post.content
      ? post.content.rendered.split("<!--more-->")
      : [];
    const content = contentParts.length > 1 ? contentParts[1] : contentParts[0];
    return content ? content.trim() : "";
  };

  const getIntro = (post) => {
    const contentParts = post.content
      ? post.content.rendered.split("<!--more-->")
      : [];
    const content = contentParts.length > 1 ? contentParts[0] : null;
    return content ? content.trim() : null;
  };

  const getContentToggle = (slug) => {
    const show = toggleState[slug] || false;
    const linkText = show ? "Read less" : "Read more";

    const handleToggleClick = (event) => {
      const button = event.target;
      const show = toggleState[slug] || false;
      setToggleState({ ...toggleState, [slug]: !show });
      if (show) {
        const parentContainer = button.closest(".grid");
        if (parentContainer) {
          parentContainer.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    };

    return (
      <div
        style={{
          position: "relative",
          left: contentToggleHPosition + "%",
          width: "fit-content",
        }}
      >
        <a className="link" onClick={handleToggleClick}>
          {linkText}
        </a>
      </div>
    );
  };

  return (
    <Container fluid className="inline list">
      {posts &&
        posts.map((p) => (
          <Grid>
            {showIcons && (
              <Grid.Column textAlign={"center"} width={1}>
                <anchor id={p.slug}></anchor>
                <MediaProvider
                  id={
                    p.meta_fields && p.meta_fields.icon
                      ? p.meta_fields.icon[0]
                      : null
                  }
                >
                  <MediaConsumer>
                    <PostIcon as={Label}></PostIcon>
                  </MediaConsumer>
                </MediaProvider>
              </Grid.Column>
            )}
            <Grid.Column width={showIcons ? 15 : 16}>
              {getIntro(p) && (
                <PostIntro as={Container} fluid post={p} ref={postTopRef} />
              )}
              {!getIntro(p) && (
                <PostContent
                  post={{ content: { rendered: getBody(p) } }}
                  style={{ clear: "both", display: "block" }}
                ></PostContent>
              )}
              {hasBody(p) && (
                <Container>
                  {showContentToggle && (
                    <>
                      {!toggleState[p.slug] && getContentToggle(p.slug)}
                      <PostContent
                        post={{ content: { rendered: getBody(p) } }}
                        style={{
                          clear: "both",
                          display: toggleState[p.slug] ? "block" : "none",
                        }}
                      ></PostContent>
                      {toggleState[p.slug] && getContentToggle(p.slug)}
                    </>
                  )}
                  {!showContentToggle && (
                    <a href={utils.replaceLink(p.link)} className="link">
                      Read More
                    </a>
                  )}
                </Container>
              )}
            </Grid.Column>
          </Grid>
        ))}
    </Container>
  );
};

const Root = (props) => {
  const [random, setRandomStore] = useState(Math.random() * (99999 - 1) + 1);
  const {
    "data-width": width,
    "data-height": height,
    "data-type": type,
    "data-taxonomy": taxonomy,
    "data-categories": categories,
    "data-items": items,
    "data-color": color,
    "data-show-post-icons": showIcons,
    "data-show-content-toggle": showContentToggle,
    "data-content-toggle-h-position": contentToggleHPosition, //horizontal position
    parent,
    editing,
    component,
    unique,
  } = props;

  const locale = props.intl.locale;

  return (
    <Container fluid={true}>
      <PostProvider
        type={type}
        locale={locale}
        taxonomy={taxonomy}
        categories={categories}
        store={"inline_list_" + parent + "_" + unique}
        page={1}
        perPage={items}
      >
        <PostConsumer>
          <ListOfPost
            showIcons={showIcons === "true"}
            showContentToggle={showContentToggle === "true"}
            contentToggleHPosition={contentToggleHPosition}
          />
        </PostConsumer>
      </PostProvider>
    </Container>
  );
};

export default Root;
