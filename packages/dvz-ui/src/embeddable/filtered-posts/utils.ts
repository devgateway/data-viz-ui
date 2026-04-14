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

async function resolveWpApiBase(
    wordpressSourceType: string | undefined,
    wordpressSource: string | undefined
): Promise<string | null> {
    if ((wordpressSourceType === 'custom' || wordpressSourceType === 'landing') && wordpressSource) {
        return wordpressSource;
    }
    return null;
}

export { getStartDateAndEndDateFromYear, getYearsToDisplay, resolveWpApiBase };