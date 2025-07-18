import { Config } from "@/conf";
import { getYearRange } from '@devgateway/wp-react-lib';
function getStartDateAndEndDateFromYear(year: number) {
    // Always use UTC to avoid timezone issues
    const startDate = new Date(Date.UTC(year, 0, 1, 0, 0, 0, 0));
    const endDate = new Date(Date.UTC(year, 11, 31, 23, 59, 59, 999));
    return { startDate, endDate };
}

async function getYearsToDisplay() {
    const yearRange = await getYearRange();
    return yearRange;
}

export { getStartDateAndEndDateFromYear, getYearsToDisplay };