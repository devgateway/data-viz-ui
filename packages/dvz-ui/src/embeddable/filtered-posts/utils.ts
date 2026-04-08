import { Config } from "@/conf";
import { getYearRange } from '@devgateway/wp-react-lib';

function getStartDateAndEndDateFromYear(year: number) {
    if (!year) return { startDate: null, endDate: null };
    // Always use UTC to avoid timezone issues
    const startDate = new Date(Date.UTC(year, 0, 1, 0, 0, 0, 0));
    const endDate = new Date(Date.UTC(year, 11, 31, 23, 59, 59, 999));
    return { startDate, endDate };
}

async function getYearsToDisplay() {
    const yearRange = await getYearRange();
    return yearRange;
}

let cachedSettings: Record<string, any> | null = null;
async function fetchSiteSettings(): Promise<Record<string, any>> {
    if (cachedSettings) return cachedSettings;
    const response = await fetch(Config.REACT_APP_WP_API + '/dg/v1/settings');
    cachedSettings = await response.json();
    return cachedSettings!;
}

/**
 * Resolves the WP REST API base URL based on the configured source type.
 *
 * - internal: uses Config.REACT_APP_WP_API (default, returns null so callers use their default)
 * - landing:  fetches the landing_page_url from /dg/v1/settings and appends /wp/wp-json
 * - custom:   appends /wp-json to the user-provided URL (expected to end with /wp)
 */
async function resolveWpApiBase(
    wordpressSourceType: string | undefined,
    wordpressSource: string | undefined
): Promise<string | null> {
    if (wordpressSourceType === 'custom' && wordpressSource) {
        return wordpressSource.replace(/\/+$/, '') + '/wp-json';
    }
    if (wordpressSourceType === 'landing') {
        const settings = await fetchSiteSettings();
        const landingUrl: string = settings['landing_page_url'] || '';
        if (landingUrl) {
            return landingUrl.replace(/\/+$/, '') + '/wp/wp-json';
        }
    }
    return null;
}

export { getStartDateAndEndDateFromYear, getYearsToDisplay, resolveWpApiBase };