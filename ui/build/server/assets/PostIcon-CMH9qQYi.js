import { c } from "react-compiler-runtime";
import "react";
import { Image } from "semantic-ui-react";
import { jsx } from "react/jsx-runtime";
const PostIcon = (props) => {
  const $ = c(3);
  const {
    media
  } = props;
  if (media && media.guid && media.guid.rendered) {
    let t0;
    if ($[0] !== media.guid.rendered || $[1] !== props) {
      t0 = /* @__PURE__ */ jsx(Image, {
        ...props,
        src: media.guid.rendered
      });
      $[0] = media.guid.rendered;
      $[1] = props;
      $[2] = t0;
    } else {
      t0 = $[2];
    }
    return t0;
  } else {
    return null;
  }
};
export {
  PostIcon as P
};
