import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { WordPressProvider } from '../context/WordPressContext';
import { useSettings, type UseSettingsResult } from './useSettings';
import type { DgSettings } from '../../types';

function CaptureSettings({ initialData, onRender }: { initialData?: DgSettings | null; onRender: (result: UseSettingsResult) => void }) {
    onRender(useSettings({ initialData }));
    return null;
}

describe('useSettings', () => {
    it('starts in a loading state with null data when no initialData is provided (SSR never runs the fetch effect)', () => {
        let captured: UseSettingsResult | undefined;

        renderToStaticMarkup(
            <WordPressProvider config={{ baseUrl: 'https://example.com/wp' }}>
                <CaptureSettings onRender={(r) => (captured = r)} />
            </WordPressProvider>
        );

        expect(captured?.data).toBeNull();
        expect(captured?.loading).toBe(true);
    });

    it('hydrates from server-fetched initialData without a loading flash', () => {
        const settings = { name: 'My Site' } as DgSettings;
        let captured: UseSettingsResult | undefined;

        renderToStaticMarkup(
            <WordPressProvider config={{ baseUrl: 'https://example.com/wp' }}>
                <CaptureSettings initialData={settings} onRender={(r) => (captured = r)} />
            </WordPressProvider>
        );

        expect(captured?.data).toBe(settings);
        expect(captured?.loading).toBe(false);
    });
});
