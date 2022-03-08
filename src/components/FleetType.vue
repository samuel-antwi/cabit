<script setup>
  import { storeToRefs } from "pinia"
  import { useTaxiStore } from "../store/useFleetTypes"

  const taxiStore = useTaxiStore()
  taxiStore.getFleets()
  const { fleets } = storeToRefs(taxiStore)

  const getImageLocalPath = (src) => {
    return `../../images/taxi-variants/${src}`
  }
</script>

<template>
  <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
    <button
      @click="taxiStore.getFleetById(fleet.id)"
      v-for="fleet in fleets"
      :key="fleet.id"
      class="flex items-center justify-center rounded-md dark:hover:bg-at-dark-primary car-type hover:bg-at-secondary hover:text-gray-50"
    >
      <div class="flex flex-col">
        <img
          class="w-20 mb-1"
          :src="getImageLocalPath(fleet.image)"
          :alt="fleet.name"
        />
        <p class="font-semibold capitalize">
          {{ fleet.type }}
        </p>
      </div>
    </button>
  </div>
</template>

<style>
  span {
    text-transform: uppercase;
    font-weight: 700;
    text-align: center;
    font-size: 14px;
  }

  .car-type {
    height: 90px;
    transition: all 0.2s ease-in-out;
  }
</style>
