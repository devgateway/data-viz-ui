import {Container, Grid, Image, Label, Menu, Segment} from "semantic-ui-react";
import {PageConsumer, PageProvider, PostIntro} from "@devgateway/wp-react-lib";
import React, {useEffect, useState} from "react";
import {injectIntl} from "react-intl";
import {MediaConsumer, MediaProvider, Page} from "@devgateway/wp-react-lib";
import PostContent from "../connected-templates/PostContent";

const VerticalDashboardGallery = ({pages, width}) => {
    const childPages = pages ? pages.sort((a, b) => a.menu_order - b.menu_order) : []
    return (<Grid columns={3} stackable={true}>
        {childPages.map(p =>
            <Grid.Column className={"item"}>
                <Container fluid={true} className={"preview"}>
                    <PostIntro as={"div"} post={p}></PostIntro>
                </Container>
            </Grid.Column>
        )}
    </Grid>)
    const MediaImage = (props) => <img src={props.media && props.media.guid ? props.media.guid.rendered : null}/>

}

const MediaImage = (props) => <img src={props.media && props.media.guid ? props.media.guid.rendered : null}/>
const decodeHtmlEntity = function (str) {
    if (str) {
        return str.toString().replace(/&#(\d+);/g, function (match, dec) {
            return String.fromCharCode(dec);
        });
    }

    return ''
};
const ChildNavigator = ({pages, title, selected, onPageSelected}) => {
    debugger;
    const childPages = pages ? pages.sort((a, b) => a.menu_order - b.menu_order) : []

    const [selectedGroup, setSelectedGroup] = useState({id: -1})


    useEffect(() => {
        setSelectedGroup(childPages[0])
    }, [pages])


    const list = childPages.map(p => {
        return {
            page: p,
            id: p.id,
            label: p.meta_fields.label ? p.meta_fields.label : p.title.rendered,
            iconComponent: <MediaProvider id={p.meta_fields && p.meta_fields.icon ? p.meta_fields.icon[0] : null}>
                <MediaConsumer>
                    <MediaImage/>
                </MediaConsumer>
            </MediaProvider>
        }
    })
    const [defaultPage, setDefaultPage] = useState(null)
    useEffect(() => {
        onPageSelected(defaultPage)
    }, [defaultPage])

    const SubPagesSubPages = ({pages,selected, expanded}) => {
        if (!defaultPage && expanded) {
            setDefaultPage(pages[0])
        }
        return pages.map(page => <Menu.Item key={page.id}
                                            className={`${selected&&page.id == selected.id ? 'selected' : ''}`}
                                            onClick={e => onPageSelected(page)}>{page.title.rendered}</Menu.Item>)

    }


    return <Container fluid={true}>
        <Menu vertical text size={"mini"}>
            <Menu.Item header>{title}</Menu.Item>
            {list.map(s =>
                <Menu.Item
                    className={"group"}
                    key={s.label}
                    onClick={e => setSelectedGroup(s)}>
                    {s.iconComponent ? s.iconComponent : <Image src={s.icon}/>}<span>{decodeHtmlEntity(s.label)}</span>

                    <Menu.Menu className={`${s.id == selectedGroup.id ? 'expanded' : 'collapsed'}`}>
                        <PageProvider locale={"en"}
                                      parent={s.id}
                                      store={"child_menu" + s.id}
                                      perPage={100}>
                            <PageConsumer>
                                <SubPagesSubPages  selected={selected} expanded={s.id == selectedGroup.id}></SubPagesSubPages>
                            </PageConsumer>
                        </PageProvider>
                    </Menu.Menu>

                </Menu.Item>)}
        </Menu>
    </Container>
}

const ContentArea = ({page}) => {
    debugger;
    return <Container><PostContent post={page}></PostContent></Container>
}

const Root = (props) => {

    const {
        "data-height": height,
        "data-style": style,
        "data-columns": columns,
        "data-parent": parent,
        "data-title": title = 'Menu',
        editing,
        component, unique,
        intl: {locale}
    } = props

    debugger
    const [page, setPage] = useState(null)
    const styles = editing ? {padding: '4px', margin: '0px'} : {}
    return (<Container style={styles} fluid className={`viz child page navigator`}>
            {parent &&
                <PageProvider locale={locale}
                              parent={parent} store={"child_menu" + props.parent + '_' + props.unique}
                              perPage={100}>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column className={"navigator"} width={2}>
                                <PageConsumer>
                                    <ChildNavigator selected={page} title={title}
                                                    onPageSelected={setPage}></ChildNavigator>
                                </PageConsumer>
                            </Grid.Column>
                            <Grid.Column width={14} className={"content"}>


                                {page && <ContentArea page={page}></ContentArea>}

                            </Grid.Column>

                        </Grid.Row>
                    </Grid>
                </PageProvider>}
            {!parent && <Segment color={"red"}>No child pages here</Segment>}
        </Container>
    )
}


export default injectIntl(Root)