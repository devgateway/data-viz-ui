import {Container, Grid, GridColumn, GridRow, Image, Menu, MenuItem, Segment} from "@devgateway/ui";
import {PageConsumer, PageProvider, PostIntro} from "@devgateway/wp-react-lib";
import React, {useEffect, useState} from "react";
import {injectIntl} from "react-intl";
import {MediaConsumer, MediaProvider} from "@devgateway/wp-react-lib";
import PostContent from "../connected-templates/PostContent";

const VerticalDashboardGallery = ({pages, width}) => {
    const childPages = pages ? pages.sort((a, b) => a.menu_order - b.menu_order) : []
    return (<Grid columns={3} stackable={true}>
        {childPages.map(p =>
            <GridColumn className={"item"}>
                <Container fluid={true} className={"preview"}>
                    <PostIntro as={"div"} post={p}></PostIntro>
                </Container>
            </GridColumn>
        )}
    </Grid>)
    const MediaImage = (props) => <img src={props.media && props.media.guid ? props.media.guid.rendered : null}/>

}

const MediaImage = (props) => <img src={props.media && props.media.guid ? props.media.guid.rendered : null} className={'svg-icon'}/>
const decodeHtmlEntity = function (str) {
    if (str) {
        return str.toString().replace(/&#(\d+);/g, function (match, dec) {
            return String.fromCharCode(dec);
        });
    }

    return ''
};

interface ChildNavigatorProps {
    pages?: any,
    title: string,
    selected: any,
    onPageSelected: any
}
const ChildNavigator = ({pages, title, selected, onPageSelected}: ChildNavigatorProps) => {

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

    interface SubPagesSubPagesProps {
        pages?: any,
        selected: any,
        expanded: boolean
    }

    const SubPagesSubPages = ({pages,selected, expanded} : SubPagesSubPagesProps) => {
        if (!defaultPage && expanded) {
            setDefaultPage(pages[0])
        }
        return pages && pages.map(page => <MenuItem key={page.id}
                                            className={`${selected&&page.id == selected.id ? 'selected' : ''}`}
                                            onClick={e => onPageSelected(page)}>{page.title.rendered}</MenuItem>)

    }


    return <Container fluid={true}>
        <Menu vertical text size={"mini"} className="navbar-menu">
            <div className="navbar-menu-header">{title}</div>
            {list.map(s =>
                <MenuItem
                    className={`group ${s.id === selectedGroup.id ? 'group-selected' : ''}`}
                    key={s.label}
                    onClick={e => {
                        setSelectedGroup(s);
                        const groupItems = document.getElementsByClassName('group');
                        for (let i = 0; i < groupItems.length; i++) {
                            groupItems[i].classList.remove('group-selected');
                        }
                        e.currentTarget.classList.add('group-selected');
                    }}
                >
                    {s.iconComponent ? s.iconComponent : <Image src={s.icon} />}
                    <span>{decodeHtmlEntity(s.label)}</span>
                    <div className="green-rectangle"></div>

                    <div className={`menu ${s.id == selectedGroup.id ? 'expanded' : 'collapsed'}`}>
                        <PageProvider locale={"en"}
                                      parent={s.id}
                                      store={"child_menu" + s.id}
                                      perPage={100}>
                            <PageConsumer>
                                <SubPagesSubPages  selected={selected} expanded={s.id == selectedGroup.id}></SubPagesSubPages>
                            </PageConsumer>
                        </PageProvider>
                    </div>

                </MenuItem>)}
        </Menu>
        <div className="navbar-footer">
            <p className="navbar-footer-text">Data and publications were made possible through support of the United States Agency for International Development (USAID).</p>
        </div>
    </Container>
}

const ContentArea = ({page}) => {

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


    const [page, setPage] = useState(null)
    const styles = editing ? {padding: '4px', margin: '0px'} : {}
    return (<Container style={styles} fluid className={`viz child page navigator`}>
            {parent &&
                <PageProvider locale={locale}
                              parent={parent}
                              noCache={true}
                              store={"child_menu" + props.parent + '_' + props.unique}
                              perPage={100}>
                    <Grid>
                        <GridRow>
                            <GridColumn className={"navigator"} width={2}>
                                <PageConsumer>
                                    <ChildNavigator selected={page} title={title}
                                                    onPageSelected={setPage}></ChildNavigator>
                                </PageConsumer>
                            </GridColumn>
                            <GridColumn width={14} className={"content"}>


                                {page && <ContentArea page={page}></ContentArea>}

                            </GridColumn>

                        </GridRow>
                    </Grid>
                </PageProvider>}
            {!parent && <Segment color={"red"}>No child pages here</Segment>}
        </Container>
    )
}


export default injectIntl(Root)