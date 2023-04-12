import {Container, Grid, Segment} from "semantic-ui-react";
import {PageConsumer, PageProvider, PostIntro} from "@devgateway/wp-react-lib";
import React from "react";
import {injectIntl} from "react-intl";

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
}

const HorizontalDashboardGallery = ({pages, columns}) => {
    const childPages = pages ? pages.sort((a, b) => a.menu_order - b.menu_order) : []
    const rows = parseInt(childPages.length / columns) + ((childPages.length % columns) > 0 ? 1 : 0)
    let index = -1
    return (<div>
        <Grid columns={columns}>
            {[...Array(parseInt(rows)).keys()]
                .map(r => {

                    return (<Grid.Row>
                        {[...Array(parseInt(columns)).keys()].map(c => {
                            index++
                            return (<Grid.Column>
                                <PostIntro as={"div"} post={childPages[index]}></PostIntro>
                            </Grid.Column>)
                        })}
                    </Grid.Row>)
                })}

        </Grid></div>)
}
const Root = (props) => {

    const {
        "data-height": height,
        "data-style": style,
        "data-columns": columns,
        "data-parent": parent,
        editing,
        component, unique,
        intl: {locale}
    } = props

    const options = {style, columns}
    return (<Container fluid className={`viz dashboard gallery ${style}`}>
            {parent &&
                <PageProvider locale={locale} parent={parent} store={"gallery_" + props.parent + '_' + props.unique}
                              perPage={100}>
                    <PageConsumer>

                        <HorizontalDashboardGallery {...options}/>

                    </PageConsumer>
                </PageProvider>}
            {!parent && <Segment color={"red"}>No child pages here</Segment>}
        </Container>
    )
}


export default injectIntl(Root)