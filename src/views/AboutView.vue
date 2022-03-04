<script setup>
  import { useBookings } from "../store/bookings"
  import { storeToRefs } from "pinia"

  const { isLoading } = storeToRefs(useBookings())
  const miles = localStorage.getItem("distance")
</script>

<template>
  <div v-if="isLoading"></div>
  <div class="about max-w-4xl mx-auto px-4 pt-40">
    <h1>This is an about page</h1>
    <p>{{ miles }} miles</p>
  </div>
</template>

<style></style>
