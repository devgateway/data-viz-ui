import { jsx } from "react/jsx-runtime";
import { e as connect_default, b as PostContent$1, p as postLoaded } from "./server-build-C_g_IF5C.js";
import "react";
import "react-compiler-runtime";
const Connected = (props) => {
  return /* @__PURE__ */ jsx(PostContent$1, { onLoad: props.onLoad, ...props });
};
const mapStateToProps = (state, ownProps) => {
  return {};
};
const mapActionCreators = {
  onLoad: postLoaded
};
const PostContent = connect_default(mapStateToProps, mapActionCreators)(Connected);
export {
  PostContent as P
};
