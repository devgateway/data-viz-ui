'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { useEmbedRegistry } from './EmbedContext';

export interface EmbeddedGatewayProps {
    children: ReactNode;
    /** Identifies the embedded post/page; embedded components remount when this changes. */
    parent?: string | number;
    parentUnique?: string;
}

const randomSuffix = (): string => (Math.random() + 1).toString(36).substring(7);

/**
 * Walks the raw WP HTML rendered by `children` (via dangerouslySetInnerHTML,
 * further up the tree) for `.viz-component` placeholders and mounts the
 * registered component for each - client-only, since it needs the DOM that
 * SSR already produced. Never runs during SSR (useEffect doesn't), and
 * degrades to a no-op (placeholders render as static HTML) when there's no
 * EmbedProvider above it.
 *
 * Every placeholder is replaced with a brand-new element before mounting,
 * even when it's already a <div>: the original node is still "owned" by the
 * SSR-hydrated tree above it (it came from that tree's own
 * dangerouslySetInnerHTML), so calling createRoot() directly on it creates
 * two React roots fighting over the same DOM node - the new root's render
 * silently never commits. A freshly created node was never part of any
 * React tree, so there's no such conflict.
 *
 * `display: contents` on the wrapper keeps it invisible to layout/CSS while
 * still giving `querySelectorAll` a scope to search - a global
 * `document.querySelectorAll` (as in v1) would double-process elements
 * across multiple EmbeddedGateway instances on the same page.
 */
export function EmbeddedGateway({ children, parent, parentUnique }: EmbeddedGatewayProps) {
    const embed = useEmbedRegistry();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!embed || !containerRef.current) {
            return;
        }
        const { registry, wrapper } = embed;
        const roots: Root[] = [];

        const allVizComponents = containerRef.current.querySelectorAll<HTMLElement>('.viz-component');
        const elements = Array.from(allVizComponents).filter((el) => !el.closest('self-render-component'));

        elements.forEach((element, index) => {
            const componentName = element.getAttribute('data-component');

            if (!componentName) {
                return;
            }

            const Component = registry[componentName];

            const container = document.createElement('div');
            element.getAttributeNames().forEach((name) => {
                if (name !== 'data-component') {
                    container.setAttribute(name, element.getAttribute(name)!);
                }
            });
            const childContent = element.innerHTML;
            element.replaceWith(container);

            if (!Component) {
                container.innerHTML = `<h1>Data Viz Error</h1><h4>Component <i>${componentName}</i> not found</h4>`;
                return;
            }

            const props: Record<string, string> = {};
            Array.from(element.attributes).forEach((attr) => {
                if (attr.name !== 'data-component') {
                    props[attr.name] = attr.value;
                }
            });

            const root = createRoot(container);
            roots.push(root);

            const embeddedElement = (
                <Component unique={`${parentUnique ?? ''}_embeddable_${index}${randomSuffix()}`} {...props} childContent={childContent} />
            );

            root.render(wrapper ? wrapper(embeddedElement) : embeddedElement);
        });

        return () => {
            roots.forEach((root) => root.unmount());
        };
        // `embed` is referentially stable for the life of an EmbedProvider
        // instance (see EmbedContext's lazy useState init), so listing it
        // honestly here doesn't cause extra remounts in practice - it just
        // lets the linter (and React Compiler) verify the effect is correct
        // instead of taking it on faith via a suppressed rule.
    }, [embed, parent, parentUnique]);

    return (
        <div ref={containerRef} style={{ display: 'contents' }}>
            {children}
        </div>
    );
}
