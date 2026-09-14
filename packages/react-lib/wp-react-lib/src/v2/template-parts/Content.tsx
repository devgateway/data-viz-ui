import { useEffect, useRef, type ElementType, type ReactNode } from 'react';
import type { Post } from '../../post-type';
import { EmbeddedGateway } from '../embed/EmbeddedGateway';
import { removePatternBrackets, replaceHTMLinks, translate } from '../util/content';

// Everything Content/ContentProps knows about, so only genuine pass-through
// DOM props (className, id, ...) or consumer-defined extras reach `as`.
const FILTERED_PROPS = new Set([
    'post',
    'pageNumber',
    'visibility',
    'as',
    'children',
    'showTitle',
    'showContent',
    'showIntro',
    'showDate',
    'showLoading',
    'locale',
    'preview',
    'parentUnique',
    'onLoad',
]);

export interface EnhanceProps {
    as?: ElementType;
    children?: ReactNode;
    className?: string;
    [key: string]: unknown;
}

/** Renders `props.as` (default `"div"`) with all but the content-specific props forwarded. */
export const Enhance = ({ as, children, ...props }: EnhanceProps) => {
    const Component = (as ?? 'div') as ElementType;
    const forwarded: Record<string, unknown> = {};
    Object.keys(props).forEach((key) => {
        if (!FILTERED_PROPS.has(key)) {
            forwarded[key] = props[key];
        }
    });
    return <Component {...forwarded}>{children}</Component>;
};

export interface ContentProps {
    post: Post | null | undefined;
    pageNumber?: number;
    showTitle?: boolean;
    showContent?: boolean;
    showIntro?: boolean;
    showDate?: boolean;
    showLoading?: boolean;
    as?: ElementType;
    locale?: string;
    preview?: boolean;
    parentUnique?: string;
    onLoad?: () => void;
    className?: string;
}

export function Content(props: ContentProps) {
    const { post, pageNumber, showTitle, showContent, showIntro, showDate, showLoading, locale, preview, parentUnique, onLoad } = props;

    // Keep the latest callback without mutating a ref during render.
    const onLoadRef = useRef(onLoad);

    useEffect(() => {
        onLoadRef.current = onLoad;
    }, [onLoad]);

    useEffect(() => {
        onLoadRef.current?.();
    }, []);

    if (!post) {
        return showLoading ? 'Loading' : null;
    }

    const contentParts = post.content ? post.content.rendered.split('<!--more-->') : [];
    const intro = contentParts.length > 1 ? contentParts[0] : null;
    const content = contentParts.length > 1 ? contentParts[1] : contentParts[0];
    const pages = content ? content.split('<!--nextpage-->') : [];

    const body = pageNumber != null && pages.length > 0 ? pages[pageNumber] : content;

    return (
        <EmbeddedGateway parentUnique={parentUnique} parent={preview ? post.parent : post.id}>
            <Enhance className="entry-content" {...props}>
                <div />
                {showDate && (
                    <div className="date">{new Date(post.date).toLocaleString()}</div>
                )}
                {showTitle && (
                    <span id={post.slug} className="title" dangerouslySetInnerHTML={{ __html: post.title.rendered }} key="title" />
                )}
                {showIntro && (
                    <div
                        className="excerpt"
                        dangerouslySetInnerHTML={{ __html: removePatternBrackets(replaceHTMLinks(translate(intro, locale) ?? '', locale)) ?? '' }}
                        key="intro"
                    />
                )}
                {showContent && (
                    <div
                        className="content"
                        dangerouslySetInnerHTML={{ __html: removePatternBrackets(replaceHTMLinks(translate(body, locale) ?? '', locale)) ?? '' }}
                        key="content"
                    />
                )}
            </Enhance>
        </EmbeddedGateway>
    );
}
