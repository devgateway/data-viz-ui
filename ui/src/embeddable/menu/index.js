import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {MenuProvider, MenuConsumer} from "@devgateway/wp-react-lib";
import {injectIntl} from "react-intl";
import {withRouter} from "react-router";
import {Container, Grid, Menu} from "semantic-ui-react";
import {Page, PageConsumer, PageProvider} from "@devgateway/wp-react-lib";

const getPath = (menu, match) => {
    let path = [];
    menu.items.forEach(item => {
        if (item.child_items) {
            item.child_items.forEach(ch => {
                if (ch.slug == match.params.slug) {
                    path.push(item)
                    path.push(ch)
                }
            })
        } else if (item.slug == match.params.slug && item.url != '/') {
            path.push(item)
        }
    })
    return path
}
const localReplaceLink = (url, locale) => {
    if (url) {
        if (!url.substr(url.indexOf("/wp") + 3).startsWith("/" + locale)) {
            return "/" + locale + url.substr(url.indexOf("/wp") + 3)
        }
        return url.substr(url.indexOf("/wp") + 3)
    }
    return ""
}

const MenuChild = injectIntl((props) => {

    const {menu, locale, match, selected, active,showIcons,onSetSelected} = props
    debugger
    return <Container fluid>
        {menu && menu.items.map((item, index) =>
            <Menu.Item
                className={`divided ${item.child_items ? 'has-child-items' : ''} 
                ${selected && selected.ID == item.ID ? 'selected' : ''}  
                ${active == item.slug ? "active" : ""}`}>
                 <span>{item.title}</span>
                {item.child_items&& item.child_items.map((child, index) =>{
                    return <Menu.Item> <span onClick={e=>onSetSelected(child.slug)}>{child.title}</span> </Menu.Item>
                })}
        </Menu.Item>)}

    </Container>

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

    return <Container fluid style={{border:'0px solid red'}}>
        <Grid fluid vertical columns={2}>
            <Grid.Column width={3}>
                     <Menu fluid vertical text >
                    <MenuProvider slug={name} locale={"en"}>
                        <MenuConsumer>
                            <MenuChild onSetSelected={setSelected}></MenuChild>
                        </MenuConsumer>
                    </MenuProvider>
                    </Menu>
            </Grid.Column>

            <Grid.Column width={13}>
                {selected&&<Container fluid>
                    <PageProvider slug={selected}>
                        <PageConsumer>
                            <Page page={selected} locale={"en"}></Page>
                        </PageConsumer>
                    </PageProvider>
                </Container>}
            </Grid.Column>
        </Grid>
    </Container>


}


export default InlineMenu