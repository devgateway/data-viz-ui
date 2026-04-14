import { Container, Grid, GridColumn, GridRow, Segment, type ColSpan } from "@devgateway/ui";
import { PageConsumer, PageProvider, PostIntro } from "@devgateway/wp-react-lib";
import React from "react";
import { injectIntl } from "react-intl";

const VerticalDashboardGallery = ({ pages, width }) => {
    const childPages = pages ? pages.sort((a, b) => a.menu_order - b.menu_order) : []
    return (
        <Grid columns={3} stackable={true}>
            {childPages.map(p =>
                <GridColumn className={"item"}>
                    <Container fluid={true} className={"preview"}>
                        <PostIntro as={"div"} post={p}></PostIntro>
                    </Container>
                </GridColumn>
            )}
        </Grid>
    )
}

interface HorizontalDashboardGalleryProps {
    pages?: any[],
    columns: string
}

const HorizontalDashboardGallery: React.FC<HorizontalDashboardGalleryProps> = ({pages, columns}) => {
    const childPages = pages ? pages.sort((a, b) => a.menu_order - b.menu_order) : []
    const rows = childPages.length / parseInt(columns) + ((childPages.length % parseInt(columns)) > 0 ? 1 : 0)
    let index = -1

    return (<div>
        <Grid columns={columns as unknown as ColSpan}>
            {/* @ts-ignore */}
            {[...Array(parseInt(rows)).keys()]
                .map((r, idx) => {


                    return (<GridRow key={idx}>
                        {[...Array(parseInt(columns)).keys()].map((c, _) => {
                            index++
                            return (<GridColumn key={_}>
                                <PostIntro as={"div"} post={childPages[index]}></PostIntro>
                            </GridColumn>)
                        })}
                    </GridRow>)
                })}

        </Grid></div>)
}

export interface PageGalleryProps {
    "data-height": number,
    "data-style": string,
    "data-columns": string,
    "data-parent": number,
    editing: boolean,
    component: string,
    unique: string
    intl: any
    parent?: string
}

const Root = (props: PageGalleryProps) => {

    const {
        "data-height": height,
        "data-style": style,
        "data-columns": columns,
        "data-parent": parent,
        editing,
        component, unique,
        intl: { locale }
    } = props

    const options = { style, columns }
    return (<Container fluid className={`viz dashboard gallery ${style}`}>
        {parent &&
            <PageProvider locale={locale} parent={parent} store={"gallery_" + props.parent + '_' + props.unique}
                perPage={100}>
                <PageConsumer>

                    <HorizontalDashboardGallery {...options} />

                </PageConsumer>
            </PageProvider>}
        {!parent && <Segment color={"red"}>No child pages here</Segment>}
    </Container>
    )
}


export default injectIntl(Root)