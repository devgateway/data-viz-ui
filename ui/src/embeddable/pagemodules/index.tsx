import { Container, Image, Menu } from "semantic-ui-react";
import { InView } from "react-intersection-observer";
import React, { useState, useCallback } from "react";
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
    return <Menu className="header title" text>
        <Menu.Item>

            <Image src={media && media.guid ? media.guid.rendered : icon}
                alt={media && media.alt_text ? media.alt_text : ""}
            />
        </Menu.Item>
        <Menu.Header>
            <div>
                <h2 className="page-module-title">
                    {title}
                    <span style={{ display: 'block' }} className="page-module-subtitle">{subtitle}</span>
                </h2>
            </div>
        </Menu.Header>
    </Menu>
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
                    <SectionHeader title={decodeHtmlEntity(page.title.rendered)} subtitle={decodeHtmlEntity(page.meta_fields.subtitle)} />
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
        direction,
        onScreen,
    }) => {
        let active = false;
        const bboxScreen = document.body.getBoundingClientRect();
        const bbox = document.getElementById(id)?.getBoundingClientRect();

        if (onScreen && bbox) {
            if (direction === 'down') {
                if (bbox.y / bboxScreen.height < 0.7) {
                    active = true;
                }
            }
            if (direction == 'up' && bbox.y / bboxScreen.height < .7) {
                active = true;
            }
        }

        setModules(prevModules => {
            let modules = prevModules.slice();
            if (active) {
                if (modules.indexOf(id) == -1) {
                    modules.push(id);
                }
            } else {
                modules = modules.filter(d => d != id);
            }
            return modules;
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
                    <InView
                        as="div"
                        key={p.id}
                        onChange={(inView, entry) => onVisibilityUpdate(p.id, {
                            onScreen: inView,
                            direction: entry.boundingClientRect.top < 0 ? 'up' : 'down',
                        })}
                    >
                        <Module
                            locale={locale}
                            page={p}
                            onVisibilityUpdate={onVisibilityUpdate}
                        />
                    </InView>
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

    </Container>)
}


export default injectIntl(Root)
