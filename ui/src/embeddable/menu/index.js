import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {MenuProvider, MenuConsumer} from "@devgateway/wp-react-lib";
import {injectIntl} from "react-intl";
import {withRouter} from "react-router";
import {Container, Grid, Menu} from "semantic-ui-react";
import {Page, PageConsumer, PageProvider} from "@devgateway/wp-react-lib";


const MenuChild = injectIntl((props) => {

    const {menu, locale, match, selected, active, showIcons, onSetSelected} = props
    debugger
    return <>

        {menu && menu.items.map((item, index) => (<Menu.Item
            className={`divided ${item.child_items ? 'has-child-items' : ''} 
                    ${selected && selected.ID == item.ID ? 'selected' : ''}  
                    ${active == item.slug ? "active" : ""}`}>
            <span>{item.title}</span>
            {item.child_items && item.child_items.map((child, index) => {
                return <Menu.Item> </Menu.Item>
            })}
        </Menu.Item>))}

    </>

})


const InlineMenu = (props) => {
    const {
        intl,
        parent,
        editing = false,
        unique,
        onChange,
        "data-name": name = "main",
        "data-show-icons": showIcon,
        "data-show-labels": showLabel


    } = props


    const [selected, setSelected] = useState(null)

    return (<Container fluid textAlign={"rigth"}>

        <Menu className={"inline"} size={"small"}>
            <MenuProvider slug={name} locale={"en"}>
                <MenuConsumer>
                    <MenuChild onSetSelected={setSelected}></MenuChild>
                </MenuConsumer>
            </MenuProvider>
        </Menu>
    </Container>)

}


export default InlineMenu