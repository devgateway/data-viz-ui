import { c } from "react-compiler-runtime";
import "react";
import { C as Content } from "./server-build-C_g_IF5C.js";
import { jsx } from "react/jsx-runtime";
const PostIntro = (props) => {
  const $ = c(2);
  let t0;
  if ($[0] !== props) {
    t0 = /* @__PURE__ */ jsx(Content, {
      ...props,
      showIntro: true
    });
    $[0] = props;
    $[1] = t0;
  } else {
    t0 = $[1];
  }
  return t0;
};
export {
  PostIntro as P
};
