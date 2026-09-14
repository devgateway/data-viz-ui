// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';
import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { EmbedProvider } from './EmbedContext';
import { EmbeddedGateway } from './EmbeddedGateway';

function mount(ui: React.ReactElement) {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);
    act(() => {
        root.render(ui);
    });
    return { root, container };
}

function Widget({ label }: { label?: string }) {
    return <span data-testid="widget">Widget: {label}</span>;
}

describe('EmbeddedGateway', () => {
    it('mounts a registered component into a .viz-component placeholder', () => {
        const { container } = mount(
            <EmbedProvider registry={{ Widget }}>
                <EmbeddedGateway>
                    <div dangerouslySetInnerHTML={{ __html: '<div class="viz-component" data-component="Widget" label="hi"></div>' }} />
                </EmbeddedGateway>
            </EmbedProvider>
        );

        expect(container.querySelector('[data-testid="widget"]')?.textContent).toBe('Widget: hi');
    });

    it('renders an error placeholder for an unregistered component name', () => {
        const { container } = mount(
            <EmbedProvider registry={{}}>
                <EmbeddedGateway>
                    <div dangerouslySetInnerHTML={{ __html: '<div class="viz-component" data-component="Missing"></div>' }} />
                </EmbeddedGateway>
            </EmbedProvider>
        );

        expect(container.textContent).toContain('not found');
    });

    it('skips placeholders nested inside a self-render-component', () => {
        const { container } = mount(
            <EmbedProvider registry={{ Widget }}>
                <EmbeddedGateway>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: '<self-render-component><div class="viz-component" data-component="Widget"></div></self-render-component>',
                        }}
                    />
                </EmbeddedGateway>
            </EmbedProvider>
        );

        expect(container.querySelector('[data-testid="widget"]')).toBeNull();
    });

    it('re-establishes context via `wrapper` for the separately-mounted root', () => {
        function ReadsMarker() {
            return <span data-testid="marker">from-wrapper</span>;
        }

        const { container } = mount(
            <EmbedProvider registry={{ Widget: ReadsMarker }} wrapper={(children) => <div className="rewrapped">{children}</div>}>
                <EmbeddedGateway>
                    <div dangerouslySetInnerHTML={{ __html: '<div class="viz-component" data-component="Widget"></div>' }} />
                </EmbeddedGateway>
            </EmbedProvider>
        );

        expect(container.querySelector('.rewrapped [data-testid="marker"]')).not.toBeNull();
    });

    it('degrades to a no-op (static HTML stays as-is) when there is no EmbedProvider', () => {
        expect(() =>
            mount(
                <EmbeddedGateway>
                    <div dangerouslySetInnerHTML={{ __html: '<div class="viz-component" data-component="Widget"></div>' }} />
                </EmbeddedGateway>
            )
        ).not.toThrow();
    });
});
