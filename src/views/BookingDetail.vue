<template>
  <div v-if="bookingStore.bookingDetail"
       class="flex flex-col gap-6 h-screen w-full max-w-lg mx-auto shadow-lg rounded-lg lg:max-w-xl">
    <div class="flex w-full items-center gap-2 bg-primary-green p-4 lg:p-6">
      <router-link class="text-white gap-2" to='/'>
        <svg fill="currentColor" height="24px" viewBox="0 -960 960 960" width="24px" xmlns="http://www.w3.org/2000/svg"
             class="lg:h-8 lg:w-8">
          <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/>
        </svg>
      </router-link>
      <h1 class="font-medium m-0 text-white lg:text-2xl">Booking Details</h1>
    </div>

    <div class="bg-light-green p-4 rounded-lg shadow-sm flex flex-col gap-8 drop-shadow-md mr-4 ml-4 lg:p-6 lg:gap-10">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2 lg:gap-4">
          <span class="text-primary-green lg:text-2xl">
            <svg fill="currentColor" height="24px" viewBox="0 -960 960 960" width="24px"
                 xmlns="http://www.w3.org/2000/svg" class="lg:h-8 lg:w-8"><path
                d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/></svg>
          </span>
          <span class="font-medium text-gray-600 lg:text-lg">Customer</span>
        </div>
        <h2 class="text-2xl font-semibold text-gray-700 lg:text-3xl">{{ bookingStore.bookingDetail.customerName }}</h2>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2 lg:gap-4">
          <span class="text-primary-green">
            <svg fill="currentColor" height="24px" viewBox="0 -960 960 960" width="24px"
                 xmlns="http://www.w3.org/2000/svg" class="lg:h-8 lg:w-8"><path
                d="m600-120-240-84-186 72q-20 8-37-4.5T120-170v-560q0-13 7.5-23t20.5-15l212-72 240 84 186-72q20-8 37 4.5t17 33.5v560q0 13-7.5 23T812-192l-212 72Zm-40-98v-468l-160-56v468l160 56Zm80 0 120-40v-474l-120 46v468Zm-440-10 120-46v-468l-120 40v474Zm440-458v468-468Zm-320-56v468-468Z"/></svg>
          </span>
          <span class="font-medium text-gray-600">Station</span>
        </div>
        <span>
          {{ stationStore.selectedStation?.name }}
        </span>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2 lg:gap-4">
          <span class="text-primary-green">
            <svg fill="currentColor" height="24px" viewBox="0 -960 960 960" width="24px"
                 xmlns="http://www.w3.org/2000/svg" class="lg:h-8 lg:w-8"><path
                d="M580-240q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z"/></svg>
          </span>
          <span class="font-medium text-gray-600">Pickup Time</span>
        </div>
        <span>
            {{ new Date(bookingStore.bookingDetail.startDate).toLocaleDateString() }} -
            {{
            new Date(bookingStore.bookingDetail.startDate).getHours()
          }}:{{ new Date(bookingStore.bookingDetail.startDate).getMinutes().toString() }}
          </span>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2 lg:gap-4">
          <span class="text-primary-green">
            <svg fill="currentColor" height="24px" viewBox="0 -960 960 960" width="24px"
                 xmlns="http://www.w3.org/2000/svg" class="lg:h-8 lg:w-8"><path
                d="M580-240q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z"/></svg>
          </span>
          <span class="font-medium text-gray-600">Return Time</span>
        </div>
        <span>
            {{ new Date(bookingStore.bookingDetail.endDate).toLocaleDateString() }} -
            {{
            new Date(bookingStore.bookingDetail.endDate).getHours()
          }}:{{ new Date(bookingStore.bookingDetail.endDate).getMinutes() }}
          </span>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2 lg:gap-4">
          <span class="text-primary-green">
            <svg fill="currentColor" height="24px" viewBox="0 -960 960 960" width="24px"
                 xmlns="http://www.w3.org/2000/svg" class="lg:h-8 lg:w-8"><path
                d="M580-240q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z"/></svg>
          </span>
          <span class="font-medium text-gray-600">Rent Duration</span>
        </div>
        <span>
          {{
            getDateDifferenceInDays(
                new Date(bookingStore.bookingDetail.endDate),
                new Date(bookingStore.bookingDetail.startDate))
          }}
          days
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useRoute} from 'vue-router';
import {useBookingStore} from '../stores/bookingStore';
import {useStationsStore} from '../stores/stationsStore';
import {getDateDifferenceInDays} from '../utils/calendarUtils.ts';

const bookingStore = useBookingStore();
const stationStore = useStationsStore();
const route = useRoute();
const stationId = route.params.sId ? parseInt(route.params.sId as string, 10) : null;
const bookingId = route.params.bId ? parseInt(route.params.bId as string, 10) : null;

if (stationId && bookingId) {
  bookingStore.fetchBookingDetail(stationId, bookingId);
}
</script>
