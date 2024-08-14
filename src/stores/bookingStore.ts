import {defineStore} from 'pinia';
import {useFetchAPI} from '../composables/useFetchAPI';
import {IBookingsEntity} from '../types/IStation';
import {IBookingState} from '../types/IBookingState';
import {watch} from 'vue';

export const useBookingStore = defineStore('bookingDetailStore', {
    state: (): IBookingState => ({
        bookingDetail: null,
    }),
    actions: {
        setBooking(bookingDetail: IBookingsEntity | null) {
            this.bookingDetail = bookingDetail;
        },
        async fetchBookingDetail(stationId: number, bookingId: number) {
            const {data} = useFetchAPI(`get`, `stations/${stationId}/bookings/${bookingId}`);
            watch(data, (newData: any) => {
                if (newData) {
                    this.setBooking(newData as IBookingsEntity);
                }
            });
        },
    }
});
