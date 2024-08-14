import {createPinia, setActivePinia} from 'pinia';
import {useStationsStore} from '../../stores/stationsStore.ts';

describe('Stations Store', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it('sets stations correctly', () => {
        const store = useStationsStore();
        store.setStations([{id: '1', name: 'Station 1', bookings: []}]);
        expect(store.stations).toEqual([{id: '1', name: 'Station 1', bookings: []}]);
    });
});

