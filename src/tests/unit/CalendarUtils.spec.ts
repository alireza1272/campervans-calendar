import {compareTwoDates, getWeekOrMonthName, getDateDifferenceInDays} from '../../utils/calendarUtils';

describe('getWeekOrMonthName', () => {
    it('should return the short weekday name for "wd" mode', () => {
        const date = new Date('2024-08-14');
        expect(getWeekOrMonthName(date, 'wd')).toBe('Wed');
    });

    it('should return the short month and year for "m" mode', () => {
        const date = new Date('2024-08-14');
        expect(getWeekOrMonthName(date, 'm')).toBe('Aug 2024');
    });

    it('should respect locale parameter', () => {
        const date = new Date('2024-08-14');
        expect(getWeekOrMonthName(date, 'wd', 'fr-FR')).toBe('mer.');
        expect(getWeekOrMonthName(date, 'm', 'fr-FR')).toBe('août 2024');
    });
});

describe('compareTwoDates', () => {
    it('should return true for the same date', () => {
        const date1 = new Date('2024-08-14');
        const date2 = new Date('2024-08-14');
        expect(compareTwoDates(date1, date2)).toBe(true);
    });

    it('should return false for different dates', () => {
        const date1 = new Date('2024-08-14');
        const date2 = new Date('2024-08-15');
        expect(compareTwoDates(date1, date2)).toBe(false);
    });

    it('should return false for different years', () => {
        const date1 = new Date('2024-08-14');
        const date2 = new Date('2023-08-14');
        expect(compareTwoDates(date1, date2)).toBe(false);
    });
});

describe('getDateDifferenceInDays', () => {
    it('should return the correct difference in days', () => {
        const date1 = new Date('2024-08-14');
        const date2 = new Date('2024-08-20');
        expect(getDateDifferenceInDays(date1, date2)).toBe(6);
    });

    it('should handle negative differences', () => {
        const date1 = new Date('2024-08-20');
        const date2 = new Date('2024-08-14');
        expect(getDateDifferenceInDays(date1, date2)).toBe(6);
    });

    it('should return 0 for the same date', () => {
        const date1 = new Date('2024-08-14');
        const date2 = new Date('2024-08-14');
        expect(getDateDifferenceInDays(date1, date2)).toBe(0);
    });
});

