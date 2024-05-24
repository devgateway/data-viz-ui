import React, { useState } from "react";

import { PostProvider, PostConsumer, Post } from "@devgateway/wp-react-lib";
import { MediaConsumer, MediaProvider } from "@devgateway/wp-react-lib";
import { Button, Modal } from "semantic-ui-react";

const Component = (props) => {
  const {
    "data-post-type": type,
    "data-download-style": style,
    "data-post-slug": slug,
    "data-post-id": id,
    "data-media-id": mediaId,
    "data-text": text,
    "data-agree": acceptText = "Agree",
    "data-cancel": cancelText = "Cancel",
    intl: { locale },
  } = props;

  const [open, setOpen] = useState(false);
  let enabled = false;

  const TheDownload = ({ media }) => {
    return (
      <>
        {slug && (
          <PostProvider locale={locale} type={type} slug={slug}>
            <Modal
              onClose={() => setOpen(false)}
              onOpen={() => setOpen(true)}
              open={open}
              trigger={
                <span>
                  {style == "link" ? (
                    <a className={"agree-and-download link"}> {text} </a>
                  ) : (
                    <Button className={"agree-and-download button"}>
                      {text}
                    </Button>
                  )}
                </span>
              }
            >
              <Modal.Header className={"agreement-header"}>
                <PostConsumer>
                  <svg
                    width="97"
                    height="97"
                    viewBox="0 0 97 97"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M48.6761 26L70.1999 47.5588C70.3676 47.7162 70.5012 47.9062 70.5925 48.1172C70.6839 48.3283 70.731 48.5558 70.731 48.7857C70.731 49.0157 70.6839 49.2432 70.5925 49.4542C70.5012 49.6652 70.3676 49.8553 70.1999 50.0126L48.6761 71.5714"
                      stroke="white"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M31.2041 26L52.7629 47.5588C53.084 47.8864 53.2639 48.3269 53.2639 48.7857C53.2639 49.2445 53.084 49.685 52.7629 50.0126L31.2041 71.5714"
                      stroke="white"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <circle cx="48.5" cy="48.5" r="48" stroke="white" />
                  </svg>
                  <Post showContent={false} showTitle={true} />
                </PostConsumer>
              </Modal.Header>
              <Modal.Content className="agreement-body">
                <PostConsumer>
                  <Post preview={true} showIntro={true} />
                </PostConsumer>
              </Modal.Content>

              <Modal.Actions className="agreement-footer">
                <Button
                  className="modal-cancel-button"
                  onClick={() => setOpen(false)}
                >
                  {cancelText}
                </Button>

                <Button
                  className="modal-agree-button"
                  content={acceptText}
                  onClick={() => {
                    setOpen(false);
                    const a = document.createElement("a");
                    a.href = media.guid.rendered + "?accepted=YES";
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                  }}
                  positive
                />
              </Modal.Actions>
            </Modal>
          </PostProvider>
        )}
      </>
    );
  };
  return (
    <span className="">
      <MediaProvider id={mediaId}>
        <MediaConsumer>
          <TheDownload></TheDownload>
        </MediaConsumer>
      </MediaProvider>
    </span>
  );
};

export default Component;
