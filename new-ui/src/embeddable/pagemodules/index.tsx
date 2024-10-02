import { Container, Image, Menu, Visibility } from "semantic-ui-react";
import React, { createRef, useState, useCallback } from "react";
import { MediaConsumer, MediaProvider, PageConsumer, PageProvider, PostContent } from "@devgateway/wp-react-lib";

import { injectIntl } from "react-intl";
import FloatingNavigator from './FloatingNavigator'

const decodeHtmlEntity = function (str: string) {
    if (str) {
        return str.toString().replace(/&#(\d+);/g, function (match, dec) {
            return String.fromCharCode(dec);
        });
    }

    return ''
};

interface SectionHeaderProps {
    title: string,
    subtitle: string,
    icon?: string,
    media?: any
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, icon, media }) => {
    return <Menu.Menu className="header title" text>
        <Menu.Item>
            {/*  @ts-ignore  Semantic UI React types has not updated to support React 18 */}
            <Image src={media && media.guid ? media.guid.rendered : icon} />
        </Menu.Item>
        <Menu.Header>
            <div>
                <h1 className="has-light-blue-color">{title}</h1>
                <h2 className="has-gray-color">{subtitle}</h2>
            </div>
        </Menu.Header>
    </Menu.Menu>
}

const MediaImage = (props) => <img src={props.media && props.media.guid ? props.media.guid.rendered : null} />


interface ModuleProps {
    page: any,
    locale: string,
    onVisibilityUpdate: any
}
const Module: React.FC<ModuleProps> = ({ page, locale }) => {
    return (
        <Container fluid={true} className={"section " + page.slug} id={page.id}>
            <div id={`${page.slug}`}></div>
            <MediaProvider id={page.meta_fields && page.meta_fields.icon ? page.meta_fields.icon[0] : null}>
                <MediaConsumer>
                    <SectionHeader
                        title={decodeHtmlEntity(page.title.rendered)}
                        subtitle={decodeHtmlEntity(page.meta_fields.subtitle)}
                    />
                </MediaConsumer>
            </MediaProvider>
            {page && <PostContent as={Container} fluid={true} post={page} />}
        </Container>
    );
};

interface PageIteratorProps {
    pages?: any,
    locale: string,
    editing: boolean,
    navTitle: string,
    toTopLabel: string
}

const PageIterator: React.FC<PageIteratorProps> = ({ pages, locale, editing, navTitle, toTopLabel }) => {
    const [modules, setModules] = useState<any>([]);

    const onVisibilityUpdate = useCallback((id, {
        onScreen,
        direction,
    }) => {
        const bboxScreen = document.body.getBoundingClientRect();
        const bbox = document.getElementById(id)?.getBoundingClientRect();

        let active = false;

        if (onScreen && bbox) {
            if ((direction === 'down' || direction === 'up') && bbox.y / bboxScreen.height < 0.7) {
                active = true;
            }
        }

        setModules(prevModules => {
            if (active && !prevModules.includes(id)) {
                return [...prevModules, id];
            } else if (!active) {
                return prevModules.filter(d => d !== id);
            }
            return prevModules;
        });
    }, []);

    const childPages = pages ? pages.sort((a, b) => a.menu_order - b.menu_order) : [];
    const list = childPages.map(p => ({
        active: modules.includes(p.id),
        id: p.id,
        label: p.meta_fields.label ? p.meta_fields.label : p.title.rendered,
        iconComponent: (
            <MediaProvider id={p.meta_fields && p.meta_fields.icon ? p.meta_fields.icon[0] : null}>
                <MediaConsumer>
                    <MediaImage />
                </MediaConsumer>
            </MediaProvider>
        )
    }));

    return (
        <React.Fragment>
            {!editing && <FloatingNavigator navTitle={navTitle} toTopLabel={toTopLabel} sections={list} />}

            <div className={"pages"}>
                {childPages.map(p => (
                    <Visibility
                        key={p.id}
                        onUpdate={(e, { calculations }) => onVisibilityUpdate(p.id, calculations)}
                    >
                        <Module
                            locale={locale}
                            page={p}
                            onVisibilityUpdate={onVisibilityUpdate}
                        />
                    </Visibility>
                ))}
            </div>
        </React.Fragment>
    );
};

export interface PageModuleProps {
    "data-type": string,
    "data-taxonomy": string,
    "data-categories": string,
    "data-items": string,
    "data-nav-label": string,
    "data-to-top-label": string,
    editing: string,
    parent: string,
    unique: string,
    intl: any
}


const Root = (props: PageModuleProps) => {

    const {
        "data-type": type,
        "data-taxonomy": taxonomy,
        "data-categories": categories,
        "data-items": items,
        "data-nav-label": navTitle = "Sections",
        "data-to-top-label": toTopLabel = "TO THE TOP",
        editing, parent, unique,
        intl: { locale }
    } = props


    return (<Container className="viz dashboard green" fluid={true}>

        {props.parent &&
            <PageProvider locale={locale} parent={props.parent} store={"modules_" + parent + "_" + unique} perPage={100}>
                <PageConsumer>
                    <PageIterator toTopLabel={toTopLabel} navTitle={navTitle} editing={editing === "true"}
                        locale={locale}></PageIterator>
                </PageConsumer>
            </PageProvider>}

    </Container>
    )
}


export default injectIntl(Root)
