import {defineStore} from 'pinia';
import {IStationsState} from '../types/IStationsState.ts';
import {IBookingsEntity, IStation} from '../types/IStation.ts';
import {useFetchAPI} from '../composables/useFetchAPI.ts';
import {watch} from 'vue';
import {IWeekDayInfo, IWeekInfo} from '../types/IWeekDayInfo';
import {compareTwoDates, getWeekOrMonthName} from '../utils/calendatUtil';
import {BOOKING_TYPE} from '../utils/constants';

export const useStationsStore = defineStore('stationsStore', {
    state: (): IStationsState => ({
        stations: null,
        selectedStation: null,
        stationCalendar: null,
    }),
    getters: {},
    actions: {
        setStations(stations: IStation[] | null) {
            this.stations = stations;
        },
        setSelectedStation(station: IStation | null) {
            this.selectedStation = station;
            if (this.selectedStation && this.selectedStation.bookings?.length) {
                this.selectedStation.bookings = this.selectedStation.bookings.map((eachBooking: IBookingsEntity) => ({
                    ...eachBooking,
                    startDate: new Date(eachBooking.startDate),
                    endDate: new Date(eachBooking.endDate),
                }));
                this.selectedStation.bookings.sort((a, b) => {
                    return (b.endDate as Date).getTime() - (a.endDate as Date).getTime();
                });
            }
        },
        setStationCalendar(to?: 'prev' | 'next') {
            let weekInfo: IWeekInfo | null = null;
            if (this.selectedStation?.bookings?.length) {
                const weekDaysInfo: IWeekDayInfo[] = []
                const desiredDate: Date = this.selectedStation.bookings[0].endDate;
                /**
                 * Here to get the Date of first day of the week
                 * And then set other week days' Dates based on that.
                 */
                let startOfWeek = null;
                if (to == 'next') {
                    startOfWeek = this.stationCalendar?.start_date as Date;
                    startOfWeek.setDate(startOfWeek.getDate() + 7);
                } else if (to === 'prev') {
                    startOfWeek = this.stationCalendar?.start_date as Date;
                    startOfWeek.setDate(startOfWeek.getDate() - 7);
                } else {
                    startOfWeek = desiredDate;
                    startOfWeek.setDate(desiredDate.getDate() - desiredDate.getDay() + 1);
                }

                for (let i = 0; i < 7; i++) {
                    const dayDate = new Date(startOfWeek);
                    dayDate.setDate(startOfWeek.getDate() + i);
                    weekDaysInfo.push({
                        display_name: getWeekOrMonthName(dayDate, 'wd'),
                        date: dayDate,
                        date_number: dayDate.getDate(),
                        bookings: [],
                    });
                }

                this.selectedStation.bookings.forEach(booking => {
                    weekDaysInfo.forEach(day => {
                        if (compareTwoDates(booking.startDate, day.date)) {
                            day.bookings.push({...booking, booking_type: BOOKING_TYPE.PICKUP});
                        } else if (compareTwoDates(booking.endDate, day.date)) {
                            day.bookings.push({...booking, booking_type: BOOKING_TYPE.RETURN});
                        }
                    });
                });
                weekInfo = {
                    month_name: getWeekOrMonthName(startOfWeek, 'm'),
                    start_date: weekDaysInfo[0].date,
                    end_date: weekDaysInfo[weekDaysInfo.length - 1].date,
                    days: weekDaysInfo,
                };
            }
            this.stationCalendar = weekInfo;
        },
        async fetchStations(query?: string) {
            const {data, error} = useFetchAPI(`get`, `stations${query ? `?${query}` : ``}`);
            watch(data, (newData: any) => {
                if (newData) {
                    this.setStations(newData as IStation[]);
                }
            });
            watch(error, (newError: any) => {
                if (newError === '404') {
                    this.setStations([]);
                }
            });
        },
    },
});
