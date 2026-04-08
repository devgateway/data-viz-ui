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

/**
 * Resolves the WP REST API base URL based on the configured source type.
 *
 * - internal: returns null (callers use Config.REACT_APP_WP_API)
 * - landing:  wordpressSource is pre-populated by the block editor with the landing URL + /wp,
 *             so we just append /wp-json
 * - custom:   same — user URL already ends with /wp, append /wp-json
 */
async function resolveWpApiBase(
    wordpressSourceType: string | undefined,
    wordpressSource: string | undefined
): Promise<string | null> {
    if ((wordpressSourceType === 'custom' || wordpressSourceType === 'landing') && wordpressSource) {
        return wordpressSource.replace(/\/+$/, '') + '/wp-json';
    }
    return null;
}

export { getStartDateAndEndDateFromYear, getYearsToDisplay, resolveWpApiBase };