<script setup>
  import { useBookingsStore } from "../../../store/useBookings"
  const store = useBookingsStore()
  const journeyDetails = store.journeyDetails
</script>

<template>
  <div class="flex flex-col w-full">
    <label class="mb-1 text-sm font-semibold uppercase" for="time"
      >Time</label
    >
    <div>
      <input
        v-model="journeyDetails.time"
        class="z-0 w-full py-3 dark:bg-at-dark-input dark:border-gray-500"
        type="time"
        id="time"
      />
    </div>
  </div>
</template>
