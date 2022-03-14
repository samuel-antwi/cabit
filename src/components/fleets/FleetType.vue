<script setup>
  import { storeToRefs } from "pinia"
  import { onMounted } from "vue"
  import { useTaxiStore } from "../../store/useFleetTypes"

  const taxiStore = useTaxiStore()
  const { fleets } = storeToRefs(taxiStore)

  onMounted(() => {
    taxiStore.getFleets()
  })
</script>

<template>
  <div
    v-if="fleets?.length > 0"
    class="grid grid-cols-2 gap-4 md:grid-cols-4"
  >
    <button
      @click="taxiStore.getFleetById(fleet.id)"
      v-for="fleet in fleets"
      :key="fleet.id"
      class="flex items-center justify-center rounded-md car-type"
    >
      <div class="flex flex-col">
        <img class="w-20 mb-1" :src="fleet.image" :alt="fleet.name" />
        <p class="font-semibold capitalize">
          {{ fleet.type }}
        </p>
      </div>
    </button>
  </div>
</template>

<style lang="scss">
  span {
    text-transform: uppercase;
    font-weight: 700;
    text-align: center;
    font-size: 14px;
  }

  .car-type {
    height: 90px;

    img {
      transition: all 0.2s ease-in-out;
    }

    &:hover img {
      transform: scale(1.2);
    }
  }
</style>
