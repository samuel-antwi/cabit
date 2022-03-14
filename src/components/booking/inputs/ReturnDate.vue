<script setup>
  import { useBookingsStore } from "../../../store/useBookings"
  const store = useBookingsStore()
  const journeyDetails = store.journeyDetails
</script>

<template>
  <div
    v-if="journeyDetails.returnjourney"
    class="flex flex-col w-full"
  >
    <label class="mb-1 text-sm font-semibold uppercase" for="date"
      >Return Date</label
    >
    <div class="relative">
      <input
        v-model="journeyDetails.returnDate"
        class="w-full py-3 dark:bg-at-dark-input dark:border-gray-500"
        type="date"
      />
    </div>
  </div>
</template>
