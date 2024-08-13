<script setup lang="ts">
import AutoComplete from '../components/AutoComplete.vue';
import {useStationsStore} from '../stores/stationsStore';
import {IBookingsEntity, IStation} from '../types/IStation';
import {BOOKING_TYPE} from '../utils/constants';

const stationsStore = useStationsStore();
stationsStore.fetchStations();

const chooseSelection = (station: IStation) => {
  stationsStore.setSelectedStation(station);
  if (stationsStore.selectedStation?.bookings?.length) {
    stationsStore.setStationCalendar();
  }
}

const bookingClass = (booking: IBookingsEntity) => {
  return booking.booking_type === BOOKING_TYPE.RETURN ? 'bg-red-700' : 'bg-green-700';
}

</script>

<template>
  <h2 class="m-4 text-xl font-semibold text-gray-800">Calendar View</h2>
  <div class="p-4">
    <AutoComplete @selectStation="chooseSelection($event)"></AutoComplete>
  </div>
  <div class="w-full flex items-center justify-between pl-4 pr-4">
    <h3 class="text-lg font-bold text-zinc-900 rounded">
      {{ stationsStore.stationCalendar?.month_name }}
    </h3>
    <div class="justify-self-end ml-auto flex gap-4">
      <span class="w-[32px] h-[32px]" @click="stationsStore.setStationCalendar('prev')">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#405059"><path
            d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/></svg>
      </span>
      <span class="w-[32px] h-[32px]" @click="stationsStore.setStationCalendar('next')">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#405059"><path
            d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>
      </span>
    </div>
  </div>
  <div class="grid grid-cols-7 gap-0.5 mt-4 h-[calc(100vh-60px)]"
       v-if="stationsStore.stationCalendar">
    <div class="flex flex-col items-center bg-white shadow-md rounded-lg p-1 border border-gray-200"
         v-for="weekDay of stationsStore.stationCalendar.days"
         :key="weekDay.display_name">
      <div class="flex flex-col items-center w-full p-1 border-b border-gray-300">
        <div class="text-sm font-medium text-gray-600">
          {{ weekDay.display_name }}
        </div>
        <div class="text-lg font-semibold text-gray-900">
          {{ weekDay.date_number }}
        </div>
      </div>
      <div class="w-full mt-2" v-if="weekDay.bookings?.length">
        <div
            class="w-full max-w-full flex justify-center items-center rounded-lg p-1 mb-1 text-sm font-medium text-white"
            v-for="booking of weekDay.bookings" :key="booking.id"
            :class="bookingClass(booking)">
          <span class="max-w-full h-auto text-white font-medium overflow-hidden">
            {{ booking.customerName }}
          </span>
        </div>
      </div>
    </div>
  </div>
  <h4 class="mt-6 text-lg font-medium text-gray-800">{{ stationsStore.selectedStation?.name }}</h4>
</template>

<style scoped>
</style>
