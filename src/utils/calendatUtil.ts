export function getWeekOrMonthName(date: Date, mode: 'wd' | 'm', locale: string = navigator.language): string {
    return date.toLocaleDateString(locale, mode === 'wd' ? {weekday: 'short'} :
        {month: 'short', year: 'numeric'});
}

export function compareTwoDates(date1: Date, date2: Date) {
    return date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate();
}
