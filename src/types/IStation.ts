import {BOOKING_TYPE} from '../utils/constants';

export interface IStation {
    bookings: IBookingsEntity[] | null;
    id: string;
    name: string;
}
export interface IBookingsEntity {
    customerName: string;
    id: string;
    pickupReturnStationId: string;
    endDate: Date;
    startDate: Date;
    booking_type?: BOOKING_TYPE.PICKUP | BOOKING_TYPE.RETURN;
}
