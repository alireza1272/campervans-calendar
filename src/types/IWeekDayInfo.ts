import {IBookingsEntity} from './IStation';

export interface IWeekInfo  {
    month_name: string,
    start_date: Date,
    end_date: Date,
    days: IWeekDayInfo[],
}

export interface IWeekDayInfo  {
    display_name: string,
    date: Date,
    date_number: number,
    bookings: IBookingsEntity[],
}
