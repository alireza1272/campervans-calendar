import {IStation} from './IStation.ts';
import {IWeekInfo} from './IWeekDayInfo';

export interface IStationsState {
    stations: IStation[] | null;
    selectedStation: IStation | null;
    stationCalendar: IWeekInfo | null;
}
