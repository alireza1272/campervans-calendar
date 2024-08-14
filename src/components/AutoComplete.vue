<template>
  <div class="w-full max-w-[calc(100%-32px)]">
    <div class="flex items-center">
      <input
          type="text"
          v-model="query"
          placeholder="Type to search"
          class="w-full border-none focus:outline-none bg-transparent text-xl text-white placeholder-white"/>
      <span v-if="query" @click="clearQuery">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="white"><path
            d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
      </span>
    </div>

    <ul v-if="suggestions"
        class="absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto z-10">
      <li
          v-for="(suggestion, index) in suggestions"
          :key="index"
          @click="selectSuggestion(suggestion)"
          class="p-2 cursor-pointer">
        {{ suggestion.name }}
      </li>
      <li v-show="suggestions?.length === 0" class="p-2 text-gray-500">
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

defineProps({
  suggestions: {
    type: Array as () => IStation[],
    default: () => []
  }
});
const emit = defineEmits(['selectStation']);
const query = ref('');
const stationsStore = useStationsStore();

const fetchSuggestions = debounce((query: string) => {
  stationsStore.fetchStations(`name=${query.toLowerCase()}`);
}, 300);

watch(query, (newQuery: string) => {
  fetchSuggestions(newQuery);
});

const selectSuggestion = (suggestion: IStation) => {
  emit('selectStation', suggestion);
};

const clearQuery = () => {
  query.value = '';
};
</script>
