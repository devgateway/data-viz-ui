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
            let container: HTMLElement = element;
            const componentName = element.getAttribute('data-component');
            element.removeAttribute('data-component');

            if (element.nodeName !== 'DIV') {
                const div = document.createElement('div');
                element.replaceWith(div);
                element.getAttributeNames().forEach((name) => {
                    div.setAttribute(name, element.getAttribute(name)!);
                });
                container = div;
            }

            if (!componentName) {
                return;
            }

            const Component = registry[componentName];

            if (!Component) {
                container.innerHTML = `<h1>Data Viz Error</h1><h4>Component <i>${componentName}</i> not found</h4>`;
                return;
            }

            const props: Record<string, string> = {};
            Array.from(element.attributes).forEach((attr) => {
                props[attr.name] = attr.value;
            });
            element.getAttributeNames().forEach((name) => {
                if (name.startsWith('data-')) {
                    element.removeAttribute(name);
                }
            });

            const root = createRoot(container);
            roots.push(root);

            const embeddedElement = (
                <Component unique={`${parentUnique ?? ''}_embeddable_${index}${randomSuffix()}`} {...props} childContent={element.innerHTML} />
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
