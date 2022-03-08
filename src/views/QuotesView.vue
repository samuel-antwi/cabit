<script setup>
  import { storeToRefs } from "pinia"
  import { useBookingsStore } from "../store/useBookings"

  const bookingsStore = useBookingsStore()

  const { bookings } = storeToRefs(bookingsStore)
</script>

<template>
  <div class="min-h-screen pt-40">
    <div class="max-w-5xl px-4 mx-auto">
      <h1>Quotes</h1>
      <p>Pick up Address: {{ bookings.pickup }}</p>
      <p>Destination Address: {{ bookings.destination }}</p>
    </div>
  </div>
</template>

<style></style>
