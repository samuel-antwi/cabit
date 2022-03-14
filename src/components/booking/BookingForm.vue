<script setup>
  import { watchEffect } from "vue"
  import Buttonview from "../Buttonview.vue"
  import { storeToRefs } from "pinia"
  import { useBookingsStore } from "../../store/useBookings"
  import FleetType from "../fleets/FleetType.vue"
  import PickupInput from "./inputs/PickupInput.vue"
  import DestinationInput from "./inputs/DestinationInput.vue"
  import PickupDate from "./inputs/PickupDate.vue"
  import PickupTime from "./inputs/PickupTime.vue"
  import ReturnDate from "./inputs/ReturnDate.vue"
  import ReturnTime from "./inputs/ReturnTime.vue"
  import ReturnJourney from "./inputs/ReturnJourney.vue"
  import BookingHeader from "./BookingHeader.vue"

  // Get the whole store instance from useBookings store
  const store = useBookingsStore()

  const { isLoading } = storeToRefs(store)

  // Get journey details object from store
  const journeyDetails = store.journeyDetails

  const toggleReturn = () => {
    journeyDetails.returnjourney = !journeyDetails.returnjourney
  }

  // Fire address search when a user start typing
  // This will only fire when character length are 3 or more
  watchEffect(() => {
    if (journeyDetails.pickupPostcode?.length >= 3)
      store.getPickupAddress()
    if (journeyDetails.destinationPostcode?.length >= 3)
      store.getDestinationAddress()
  })

  // Handle Booking
  const handleBookings = async () => {
    console.log(journeyDetails)

    // Cancel WatchEffect when no longer needed
    watchEffect(() => {})
  }

  // Clear Address Fields
  const clearAddress = (e) => {
    if (e === journeyDetails.pickupAddress) {
      journeyDetails.pickupAddress = null
      journeyDetails.pickupPostcode = null
    }

    if (e === journeyDetails.destinationAddress) {
      journeyDetails.destinationAddress = null
      journeyDetails.destinationPostcode = null
    }
  }

  // Set pickup address
  const setPickUpAddress = (v) => {
    journeyDetails.pickupAddress = v
  }

  // Set destination address
  const setDestinationAddress = (v) => {
    journeyDetails.destinationAddress = v
  }
</script>

<template>
  <main class="flex flex-col justify-center">
    <div v-if="isLoading"></div>
    <div v-else>
      <div
        class="max-w-2xl p-10 rounded-md shadow-md dark:bg-at-dark-secondary bg-gray-50"
      >
        <BookingHeader />
        <FleetType />
        <form @submit.prevent="handleBookings">
          <div class="grid grid-cols-1 gap-5 pt-8 md:grid-cols-2">
            <PickupInput
              :setPickUpAddress="setPickUpAddress"
              :clearAddress="clearAddress"
            />
            <DestinationInput
              :setDestinationAddress="setDestinationAddress"
              :clearAddress="clearAddress"
            />
            <PickupDate />
            <PickupTime />
            <ReturnJourney :toggleReturn="toggleReturn" />
            <div></div>
            <ReturnDate />
            <ReturnTime />
          </div>
          <Buttonview class="mt-8" text="Get quote" />
        </form>
      </div>
    </div>
  </main>
</template>

<style lang="scss"></style>
