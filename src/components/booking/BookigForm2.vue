<script setup>
  import { computed, reactive, ref, watchEffect } from "vue"
  import { postCodeApiKey } from "../../utils/api"
  import moment from "moment"
  import CarType from "../CarType.vue"
  import IconLocation from "../icons/IconLocation.vue"
  import Buttonview from "../Buttonview.vue"
  import IconTelephone from "../icons/IconTelephone.vue"
  import IconCalendar from "../icons/IconCalendar.vue"
  import { storeToRefs } from "pinia"
  import { useStorage, useSessionStorage } from "@vueuse/core"
  import { useMainStore } from "../../store/main"
  import { useBookings } from "../../store/bookings"

  let date = ref(null)
  let postcode1 = ref(null)
  let postcode2 = ref(null)
  let pickupAddress = ref([])
  let destinationAddress = ref([])
  let pickup = ref(null)
  let destination = ref(null)

  const bookings = reactive({
    date: null,
    postcode1: null,
    postcode2: null,
    pickupAddress: [],
    destinationAddress: [],
    pickup: null,
    destination: null,
  })

  const bookingsStore = useBookings()

  bookingsStore.getDistance(postcode1.value, postcode2.value)

  const miles = computed(() => {
    return bookingsStore.getDistanceInMiles.toFixed(0)
  })

  useStorage("pickup", pickup)

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
        pickupAddress.value = add.suggestions
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
        destinationAddress.value = add.suggestions
      } catch (error) {
        console.log(error)
      }
    }
  }

  watchEffect(() => {
    if (postcode1.value) getPickupAddress()
    if (postcode2.value) getDestinationAddress()
  })

  // Handle Booking
  const handleBookings = async () => {
    console.log(pickup.value, destination.value)

    // Cancel WatchEffect when no longer needed
    watchEffect(() => {
      console.log("WatchEffect is stopped")
    })
  }

  const setPickUpAddress = (v) => {
    pickup.value = v
  }
  const setDestinationAddress = (v) => {
    destination.value = v
  }

  // Clear Address Fields
  const clearAddress = (e) => {
    if (e === pickup.value) {
      pickup.value = null
      postcode1.value = null
    }

    if (e === destination.value) {
      destination.value = null
      postcode2.value = null
    }
  }

  // useSessionStorage("pickup", pickup)
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
            <div class="flex flex-col w-full">
              <label
                class="uppercase mb-1 flex justify-between font-semibold text-sm"
                for="pickup"
              >
                <span>Pickup</span>
                <button
                  @click="clearAddress(pickup)"
                  v-if="pickup"
                  class="text-sm tracking-wide"
                >
                  CLEAR
                </button>
              </label>
              <div class="relative">
                <div class="relative" v-if="pickup">
                  <input
                    class="py-4 dark:border-gray-500 w-full input dark:bg-at-dark-input input-bordered"
                    v-model="pickup"
                    type="text"
                  />
                </div>
                <div v-else>
                  <input
                    class="py-3 w-full dark:bg-at-dark-input dark:border-gray-500 input input-bordered"
                    placeholder="Enter pickup postcode or address"
                    type="text"
                    v-model="postcode1"
                  />
                  <IconLocation
                    class="absolute top-[12px] right-[16px]"
                  />
                </div>

                <div
                  class="absolute z-10 top-[52px]"
                  v-if="
                    pickupAddress?.length > 0 && postcode1 && !pickup
                  "
                >
                  <div
                    class="h-60 dark:text-gray-300 bg-gray-50 dark:bg-[#36333A] border dark:border-gray-500 border-blue-500 overflow-scroll rounded-md"
                  >
                    <p
                      class="px-4 text-xs bg-gray-200 py-2 dark:bg-gray-600"
                    >
                      Keep typing your address for more results.
                    </p>
                    <ul
                      v-for="add in pickupAddress"
                      :key="add.address"
                    >
                      <li @click="setPickUpAddress(add.address)">
                        <p
                          class="py-2 px-4 hover:bg-gray-200 dark:border-gray-500 dark:hover:bg-gray-600 border-b cursor-pointer"
                        >
                          {{ add.address }}
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <!-- Destination address -->
            <div class="flex flex-col w-full">
              <label
                class="uppercase flex justify-between font-semibold text-sm mb-1"
                for="pickup"
              >
                <span>Destination</span>
                <button
                  @click="clearAddress(destination)"
                  v-if="destination"
                  class="text-sm tracking-wide"
                >
                  CLEAR
                </button>
              </label>
              <div class="relative">
                <div class="relative" v-if="destination">
                  <input
                    class="py-4 w-full dark:border-gray-500 input dark:bg-at-dark-input input-bordered focus:border-blue-500"
                    v-model="destination"
                    type="text"
                  />
                </div>
                <div v-else>
                  <input
                    class="py-3 w-full dark:bg-at-dark-input dark:border-gray-500 input input-bordered"
                    placeholder="Enter destination postcode"
                    type="text"
                    v-model="postcode2"
                  />
                  <IconLocation
                    class="absolute top-[12px] right-[16px]"
                  />
                </div>

                <div
                  class="absolute z-10 top-[52px]"
                  v-if="
                    destinationAddress?.length > 0 &&
                    postcode2 &&
                    !destination
                  "
                >
                  <div
                    class="h-60 dark:text-gray-300 bg-gray-50 dark:bg-[#36333A] border dark:border-gray-500 border-blue-500 overflow-scroll rounded-md"
                  >
                    <p
                      class="px-4 text-xs bg-gray-200 py-2 dark:bg-gray-600"
                    >
                      Keep typing your address for more results.
                    </p>
                    <ul
                      v-for="add in destinationAddress"
                      :key="add.address"
                    >
                      <li @click="setDestinationAddress(add.address)">
                        <p
                          class="py-2 px-4 hover:bg-gray-200 dark:border-gray-500 dark:hover:bg-gray-600 border-b cursor-pointer"
                        >
                          {{ add.address }}
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <!-- Telephone Input -->
            <div class="flex flex-col w-full">
              <label
                class="uppercase mb-1 font-semibold text-sm"
                for="pickup"
                >Phone Number</label
              >
              <div class="relative">
                <input
                  class="py-3 w-full dark:bg-at-dark-input dark:border-gray-500 input input-bordered"
                  placeholder="Enter pickup postcode"
                  type="text"
                />
                <IconTelephone
                  class="absolute top-[12px] right-[16px]"
                />
              </div>
            </div>
            <!-- Calendar Input -->
            <div class="flex flex-col w-full">
              <label
                class="uppercase mb-1 font-semibold text-sm"
                for="pickup"
                >Date and time</label
              >
              <div class="relative">
                <input
                  class="py-3 w-full z-0 dark:bg-at-dark-input dark:border-gray-500 input input-bordered"
                  placeholder="Date and time"
                  type="date"
                />
              </div>
            </div>
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
