<script setup>
  import { storeToRefs } from "pinia"
  import { useTaxiStore } from "../store/taxis"

  const taxiStore = useTaxiStore()
  taxiStore.getFleets()
  const { fleets, fleet } = storeToRefs(taxiStore)

  const getImg = (src) => {
    return `../../images/taxi-variants/${src}`
  }
</script>

<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
    <button
      @click="taxiStore.getFleetById(fleet.id)"
      v-for="fleet in fleets"
      :key="fleet.id"
      class="car-type hover:bg-at-primary dark:bg-[#242424] flex justify-center items-center rounded-md"
    >
      <div class="flex flex-col">
        <img
          class="w-20 mb-1"
          :src="getImg(fleet.image)"
          :alt="fleet.name"
        />
        <p class="capitalize font-semibold">{{ fleet.type }}</p>
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
