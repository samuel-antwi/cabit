<script setup>
  import { useBookingsStore } from "../../../store/useBookings"

  const store = useBookingsStore()
  const journeyDetails = store.journeyDetails
</script>

<template>
  <div class="flex flex-col w-full">
    <label class="mb-1 text-sm font-semibold uppercase" for="date"
      >Date</label
    >
    <div class="relative">
      <input
        v-model="journeyDetails.date"
        class="w-full py-3 dark:bg-at-dark-input dark:border-gray-500"
        type="date"
      />
    </div>
  </div>
</template>
