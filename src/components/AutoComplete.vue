<template>
  <div class="relative w-full max-w-xs">
    <div class="relative">
      <input
          type="text"
          v-model="query"
          @focus="showSuggestions=true"
          placeholder="Find your station ..."
          class="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
      <span
          v-if="query"
          class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
          @click="clearQuery">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#405059">
          <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
        </svg>
      </span>
    </div>

    <ul v-if="stationsStore.stations && query?.length > 0 && showSuggestions"
        class="absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto z-10">
      <li
          v-for="(suggestion, index) in stationsStore.stations"
          :key="index"
          @click="selectSuggestion(suggestion)"
          class="p-2 cursor-pointer hover:bg-blue-500 hover:text-white">
        {{ suggestion.name }}
      </li>
      <li v-show="stationsStore.stations?.length === 0" class="p-2 text-gray-500">
        Oops! No station found.
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import {ref, watch} from 'vue';
import {useStationsStore} from '../stores/stationsStore.ts';
import {IStation} from '../types/IStation.ts';
import {debounce} from '../utils/sharedUtils';

const emit = defineEmits(['selectStation']);
const query = ref('');
const stationsStore = useStationsStore();
const showSuggestions = ref(true);

const fetchSuggestions = debounce((query: string) => {
  stationsStore.fetchStations(`name=${query.toLowerCase()}`);
}, 300);

watch(query, (newQuery: string) => {
  if (newQuery.length > 0) {
    showSuggestions.value = true;
    fetchSuggestions(newQuery);
  } else {
    stationsStore.setStations(null);
    showSuggestions.value = false;
  }
});

const selectSuggestion = (suggestion: IStation) => {
  query.value = suggestion.name;
  showSuggestions.value = false;
  emit('selectStation', suggestion);
};

const clearQuery = () => {
  query.value = '';
};
</script>
