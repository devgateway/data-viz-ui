'use client';

import { useEffect } from 'react';
import { englishTranslations, frenchTranslations, afrikaansTranslations, amharicTranslations } from '@/translations';
import { updateIntl } from '@/lib';
import { store } from '@/redux';

type Locale = 'en' | 'fr' | 'am' | 'af';

const messages: Record<Locale, Record<string, string>> = {
    'en': englishTranslations,
    'fr': frenchTranslations,
    'am': amharicTranslations,
    'af': afrikaansTranslations
};

interface ClientEffectsProps {
    locale: string;
}

/**
 * Client-only effects for the layout shell.
 *
 * This component renders no DOM output (returns null) and exists solely to
 * run browser-only side effects that cannot run during SSR:
 * - Hash-based scroll-to-anchor on initial mount
 * - Locale dispatch to keep the Redux intl store in sync
 *
 * It MUST be `'use client'` because it:
 * - Accesses `window.location.hash` and `document.getElementById`
 * - Dispatches Redux actions that update the `react-intl` store state
 */
export const ClientEffects = ({ locale }: ClientEffectsProps) => {
    useEffect(() => {
        window.setTimeout(() => {
            if (window.location.hash) {
                const element = document.getElementById(window.location.hash.substring(1));
                if (element) {
                    element.scrollIntoView({ behavior: 'auto', block: 'start' });
                }
            }
        }, 2000);
    }, []);

    useEffect(() => {
        store.dispatch(updateIntl({ locale, formats: {}, messages: messages[locale as Locale ?? 'en'] }));
    }, [locale]);

    return null;
};

export default ClientEffects;
