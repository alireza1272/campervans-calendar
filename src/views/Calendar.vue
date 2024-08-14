<script lang="ts" setup>
import AutoComplete from '../components/AutoComplete.vue';
import {useStationsStore} from '../stores/stationsStore';
import {IBookingsEntity, IStation} from '../types/IStation';
import {BOOKING_TYPE} from '../utils/constants';
import {ref} from 'vue';

const showStationSearch = ref<boolean>(true);
const stationsStore = useStationsStore();

const chooseSelection = (station: IStation) => {
  showStationSearch.value = false;
  stationsStore.setSelectedStation(station);
  if (stationsStore.selectedStation?.bookings?.length) {
    stationsStore.setStationCalendar();
  }
}

const bookingClass = (booking: IBookingsEntity) => {
  return booking.booking_type === BOOKING_TYPE.RETURN ? 'bg-red-700' : 'bg-green-700';
}


const date = ref(new Date());
const showDatePicker = ref(false);
const selectDate = (modelData: Date) => {
  date.value = modelData;
  showDatePicker.value = false;
  stationsStore.setStationCalendar('selected', modelData);
}
</script>

<template>
  <div
      class="bg-primary-green h-auto w-full p-4 lg:max-w-[80%] lg:mx-auto lg:mt-8 lg:rounded-lg"
      :class="{
            'fixed top-1/2 transform -translate-y-1/2 lg:left-1/2 lg:transform lg:-translate-x-1/2': !stationsStore.stationCalendar,
        }">
    <div class="flex gap-2 items-center">
      <span>
        <svg fill="white" height="40px" viewBox="0 -960 960 960" width="40px"
             xmlns="http://www.w3.org/2000/svg"><path
            d="M480-80q-106 0-173-31.83-67-31.84-67-81.5 0-25.34 20.17-47.84 20.16-22.5 55.5-37.5l51 47.67q-16.34 4.67-32.5 15.33Q318-205 306.67-193.33q15.66 18.66 67 32.66 51.33 14 106.33 14t106.83-14q51.84-14 67.5-32.66-11.66-12.67-29.33-23-17.67-10.34-34.33-15l51.33-48q37.33 15.33 57.67 37.83Q720-219 720-193.33q0 49.66-67 81.5Q586-80 480-80Zm1-203.33q105.67-78.34 159-158.17 53.33-79.83 53.33-152.5 0-108.67-69-164T480-813.33q-74.67 0-144 55.33t-69.33 164q0 71 53 147.83 53 76.84 161.33 162.84ZM480-200Q339.67-304 269.83-402 200-500 200-594q0-71 25.5-124.5t65.83-89.5q40.34-36 90-54Q431-880 480-880t99 18q50 18 90 54t65.5 89.5Q760-665 760-594q0 94-69.5 192T480-200Zm0-320q33 0 56.5-23.5T560-600q0-33-23.5-56.5T480-680q-33 0-56.5 23.5T400-600q0 33 23.5 56.5T480-520Zm0-80Z"/></svg>
      </span>
      <h2 class="text-2xl font-bold text-white lg:text-3xl">
        {{ stationsStore.selectedStation?.name ?? 'Select Station' }}
      </h2>
    </div>
    <div
        class="w-full h-[56px] flex items-center justify-between relative border-t border-solid border-white pt-4 mt-4">
      <div v-if="stationsStore.stationCalendar?.month_name" class="flex gap-2 items-center relative">
        <span @click="showDatePicker=!showDatePicker">
          <svg fill="white" height="24px" viewBox="0 -960 960 960" width="24px" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z"/>
        </svg>
        </span>
        <h3 class="text-lg font-bold text-white rounded lg:text-xl">
          {{ stationsStore.stationCalendar?.month_name }}
        </h3>
        <div v-show="showDatePicker" class="absolute top-[10px]">
          <VueDatePicker v-model="stationsStore.stationCalendar.start_date" @update:model-value="selectDate" inline
                         auto-apply>
          </VueDatePicker>
        </div>
      </div>
      <div class="justify-self-end ml-auto flex gap-4 items-center">
        <span @click="stationsStore.setStationCalendar('prev')">
          <svg fill="white" height="24px" viewBox="0 -960 960 960" width="24px" xmlns="http://www.w3.org/2000/svg"><path
              d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/></svg>
        </span>
        <span @click="stationsStore.setStationCalendar('next')">
          <svg fill="white" height="24px" viewBox="0 -960 960 960" width="24px" xmlns="http://www.w3.org/2000/svg"><path
              d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>
        </span>
        <span @click="showStationSearch=!showStationSearch">
          <svg fill="white" height="24px" viewBox="0 -960 960 960" width="24px" xmlns="http://www.w3.org/2000/svg"><path
              d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
        </span>
      </div>
      <div
          v-show="showStationSearch"
          class="bg-primary-green absolute top-0 right-0 w-full h-full z-1 flex gap-2 items-center justify-between
          lg:w-full lg:h-auto lg:rounded-lg lg:p-4">
        <AutoComplete :suggestions="stationsStore?.stations" @selectStation="chooseSelection($event)"></AutoComplete>
        <span @click="showStationSearch=false">
          <svg fill="white" height="24px" viewBox="0 -960 960 960" width="24px" xmlns="http://www.w3.org/2000/svg">
          <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
        </svg>
        </span>
      </div>
    </div>
  </div>

  <div v-if="stationsStore.stationCalendar"
       class="grid grid-cols-7 gap-0.5 mt-4 h-[calc(100vh-176px)]">
    <div v-for="weekDay of stationsStore.stationCalendar.days"
         :key="weekDay.display_name"
         class="flex flex-col items-center bg-white shadow-md rounded-lg p-1 border border-gray-200">
      <div class="flex flex-col items-center w-full p-1 border-b border-gray-300">
        <div class="text-sm font-medium text-gray-600 lg:text-base">
          {{ weekDay.display_name }}
        </div>
        <div class="text-lg font-semibold text-gray-900 lg:text-xlZ">
          {{ weekDay.date_number }}
        </div>
      </div>
      <div v-if="weekDay.bookings?.length" class="w-full mt-2">
        <router-link v-for="booking of weekDay.bookings"
                     :key="booking.id"
                     :class="bookingClass(booking)" :to="`/booking/${stationsStore.selectedStation?.id}/${booking.id}`"
                     class="w-full max-w-full flex justify-center items-center rounded-lg p-1 mb-1 text-sm font-medium
                     text-white lg:p-2 lg:mb-2">
          <span class="max-w-full h-auto text-white font-medium overflow-hidden">
            {{ booking.customerName }}
          </span>
        </router-link>
      </div>
    </div>
  </div>
  <div v-else
       class="h-[100px] w-full text-primary-green font-bold text-3xl text-center bg-primary-green flex justify-center">
    <img src="https://roadsurfer.com/wp-content/themes/roadsurfer/_/img/logo/logo.svg" alt="roadsurfer"
         class="max-w-[70%] lg:max-w-[30%]">
  </div>
</template>

<style scoped>
</style>
