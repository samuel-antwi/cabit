<script setup>
  import { computed, onMounted, ref, watch, reactive } from "vue"
  import { postCodeApiKey } from "../../utils/api"
  import moment from "moment"
  import CarType from "../CarType.vue"
  import IconLocation from "../icons/IconLocation.vue"
  import Buttonview from "../Buttonview.vue"
  import IconTelephone from "../icons/IconTelephone.vue"
  import IconCalendar from "../icons/IconCalendar.vue"
  import { storeToRefs } from "pinia"
  import { useStorage } from "@vueuse/core"

  import { useMainStore } from "../../store/main"
  import { useBookings } from "../../store/bookings"
  import PickupInput from "./PickupInput.vue"
  import DestinationInput from "./DestinationInput.vue"
  import PhoneNumberInput from "./PhoneNumberInput.vue"
  import DateInputField from "./DateInputField.vue"

  let date = ref(null)
  let postcode1 = ref(null)
  let postcode2 = ref(null)
  let pickupAddress = ref(null)
  let destinationAddress = ref(null)
  let pickup = ref(null)
  let destination = ref(null)

  const bookingsStore = useBookings()

  bookingsStore.getDistance(postcode1.value, postcode2.value)

  const miles = computed(() => {
    return bookingsStore.getDistanceInMiles.toFixed(0)
  })

  useStorage("distance", miles)

  const { distance, isLoading } = storeToRefs(useBookings())

  // Get Pickup address
  const getPickupAddress = async () => {
    if (postcode1.value?.length >= 3) {
      try {
        const res = await fetch(
          `https://api.getAddress.io/autocomplete/${postcode1.value}
          ?api-key=2UTs6FCo40u-v_duUZkkDA34369 `
        )
        const add = await res.json()
        console.log(add)
        pickupAddress = add.suggestions
      } catch (error) {
        console.log(error)
      }
    }
  }

  // Get destination address
  const getDestinationAddress = async () => {
    if (postcode2.value?.length >= 3) {
      try {
        const res = await fetch(
          `https://api.getAddress.io/autocomplete/${postcode2.value}
          ?api-key=2UTs6FCo40u-v_duUZkkDA34369 `
        )
        const add = await res.json()
        console.log(add)
        destinationAddress = add.suggestions
      } catch (error) {
        console.log(error)
      }
    }
  }

  watch(postcode1, () => {
    getPickupAddress()
  })

  watch(postcode2, () => {
    getDestinationAddress()
  })

  const handleBookings = async () => {
    console.log(postcode1.value)
    console.log(postcode2.value)
  }
</script>

<template>
  <main class="flex flex-col justify-center pt-40">
    <div v-if="isLoading"></div>
    <div v-else>
      <div
        class="max-w-2xl dark:bg-at-dark-bg shadow-md dark:text-gray-100 bg-gray-50 rounded-md p-10"
      >
        <h1
          class="text-center text-4xl text-gray-700 dark:text-gray-100 mb-10 uppercase font-bold"
        >
          Book Online
        </h1>
        <CarType />
        <form @submit.prevent="handleBookings">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5 pt-8">
            <PickupInput
              :postcode1="postcode1"
              :pickup="pickup"
              :pickupAddress="pickupAddress"
            />
            <DestinationInput
              :destination="destination"
              :postcode2="postcode2"
              :destinationAddress="destinationAddress"
            />
            <PhoneNumberInput />
            <DateInputField />
          </div>
          <Buttonview
            class="bg-at-primary dark:border dark:border-gray-100 dark:bg-[#242424] mt-8"
            text="Get taxi"
          />
        </form>
      </div>
    </div>
  </main>
</template>

<style lang="scss"></style>
