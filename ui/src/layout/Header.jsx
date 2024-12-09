import React from "react";

import ClassicHeader from "./ClassicHeader.jsx";
import FloatingHeader from "./FloatingMenuHeader.jsx";
import {injectIntl} from "react-intl";
import {withRouter} from "@/withRouter";

const Header = (props) => {
    const {settings} = props;
    const {react_menu_type} = settings;
    if (react_menu_type === 'floating') {
        return <FloatingHeader {...props}/>
    }

    return <ClassicHeader {...props}/>

}


export default injectIntl(withRouter(Header))

