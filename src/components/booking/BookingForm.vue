<script setup>
  import { ref, watchEffect } from "vue"
  import { useRouter } from "vue-router"
  import moment from "moment"
  import IconLocation from "../icons/IconLocation.vue"
  import Buttonview from "../Buttonview.vue"
  import { storeToRefs } from "pinia"
  import { useBookingsStore } from "../../store/useBookings"
  import FleetType from "../FleetType.vue"
  import IconClose from "../icons/IconClose.vue"
  import PortalVew from "../PortalVew.vue"

  const router = useRouter()

  let pickupPostcode = ref(null)
  let destinationPostcode = ref(null)
  let date = ref(null)
  let time = ref(null)
  let returnJourney = ref(false)

  // Get the whole store instance from useBookings store
  const store = useBookingsStore()

  const { isLoading, bookings } = storeToRefs(store)

  const toggleReturn = () => {
    returnJourney.value = !returnJourney.value
  }

  watchEffect(() => {
    if (pickupPostcode.value)
      store.getPickupAddress(pickupPostcode.value)
    if (destinationPostcode.value)
      store.getDestinationAddress(destinationPostcode.value)
  })

  store.getApiUsage()

  // Handle Booking
  const handleBookings = async () => {
    console.log(bookings.value.pickup, bookings.value.destination)

    // Cancel WatchEffect when no longer needed
    watchEffect(() => {})

    setTimeout(() => {
      router.push("/quotes")
    }, 1000)
  }

  // Clear Address Fields
  const clearAddress = (e) => {
    if (e === bookings.value.pickup) {
      bookings.value.pickup = null
    }

    if (e === bookings.value.destination) {
      bookings.value.destination = null
    }
  }
</script>

<template>
  <main class="flex flex-col justify-center">
    <div v-if="isLoading"></div>
    <div v-else>
      <div
        class="max-w-2xl p-10 rounded-md shadow-md dark:bg-at-dark-secondary bg-gray-50"
      >
        <div class="mb-10 text-center">
          <h1
            class="mb-2 text-4xl font-bold text-gray-700 uppercase dark:text-gray-200"
          >
            Book Online
          </h1>
          <p>
            Your options are endless. Choose from our varieties of
            fleets
          </p>
        </div>
        <FleetType />
        <form @submit.prevent="handleBookings">
          <div class="grid grid-cols-1 gap-5 pt-8 md:grid-cols-2">
            <div class="flex flex-col w-full">
              <label
                class="flex justify-between mb-1 text-sm font-semibold uppercase"
                for="pickup"
              >
                <span>PICKUP</span>
                <button
                  @click="clearAddress(bookings.pickup)"
                  v-if="bookings.pickup"
                  class="text-sm tracking-wide"
                >
                  CLEAR
                </button>
              </label>
              <div class="relative">
                <div class="relative" v-if="bookings.pickup">
                  <input
                    @focus="clearAddress(bookings.pickup)"
                    class="w-full py-3 dark:border-gray-500 dark:bg-at-dark-input"
                    v-model="bookings.pickup"
                    type="text"
                  />
                </div>
                <div v-else>
                  <input
                    class="w-full py-3 dark:bg-at-dark-input dark:border-gray-500"
                    placeholder="Enter Postcode or address"
                    type="text"
                    v-model="pickupPostcode"
                  />
                  <div
                    class="absolute hidden md:block top-[12px] right-[16px]"
                  >
                    <IconClose
                      width="20pt"
                      height="20pt"
                      @click="pickupPostcode = null"
                      v-if="pickupPostcode"
                    />
                    <IconLocation v-else />
                  </div>
                </div>

                <div
                  class="absolute z-10 top-[52px]"
                  v-if="
                    bookings.pickupAddress?.length > 0 &&
                    pickupPostcode &&
                    !bookings.pickup
                  "
                >
                  <div
                    class="overflow-scroll border border-blue-500 rounded-md max-h-60 dark:text-gray-300 bg-gray-50 dark:bg-at-dark-primary dark:border-gray-500"
                  >
                    <p
                      class="px-4 py-2 text-xs bg-gray-200 dark:bg-gray-600"
                    >
                      Keep typing your address for more results.
                    </p>
                    <ul
                      v-for="add in bookings.pickupAddress"
                      :key="add.address"
                    >
                      <li
                        @click="store.setPickUpAddress(add.address)"
                      >
                        <p
                          class="px-4 py-2 border-b cursor-pointer hover:bg-gray-200 dark:border-gray-500 dark:hover:bg-gray-600"
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
                class="flex justify-between mb-1 text-sm font-semibold uppercase"
                for="pickup"
              >
                <span>DESTINATION</span>
                <button
                  @click="clearAddress(bookings.destination)"
                  v-if="bookings.destination"
                  class="text-sm tracking-wide"
                >
                  CLEAR
                </button>
              </label>
              <div class="relative">
                <div class="relative" v-if="bookings.destination">
                  <input
                    @focus="clearAddress(bookings.destination)"
                    class="w-full py-3 dark:border-gray-500 dark:bg-at-dark-input focus:border-blue-500"
                    v-model="bookings.destination"
                    type="text"
                  />
                </div>
                <div v-else>
                  <input
                    class="w-full py-3 dark:bg-at-dark-input dark:border-gray-500"
                    placeholder="Enter Postcode or address"
                    type="text"
                    v-model="destinationPostcode"
                  />
                  <div
                    class="absolute hidden md:block top-[12px] right-[16px]"
                  >
                    <IconClose
                      width="20pt"
                      height="20pt"
                      @click="destinationPostcode = null"
                      v-if="destinationPostcode"
                    />
                    <IconLocation v-else />
                  </div>
                </div>

                <div
                  class="absolute z-10 top-[52px]"
                  v-if="
                    bookings.destinationAddress?.length > 0 &&
                    destinationPostcode &&
                    !bookings.destination
                  "
                >
                  <div
                    class="overflow-scroll border border-blue-500 rounded-md max-h-60 dark:text-gray-400 bg-gray-50 dark:bg-at-dark-primary dark:border-gray-500"
                  >
                    <p
                      class="px-4 py-2 text-xs bg-gray-200 dark:bg-gray-600"
                    >
                      Keep typing your address for more results.
                    </p>
                    <ul
                      v-for="add in bookings.destinationAddress"
                      :key="add.address"
                    >
                      <li
                        @click="
                          store.setDestinationAddress(add.address)
                        "
                      >
                        <p
                          class="px-4 py-2 border-b cursor-pointer hover:bg-gray-200 dark:border-gray-500 dark:hover:bg-gray-600"
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
                class="mb-1 text-sm font-semibold uppercase"
                for="date"
                >Date</label
              >
              <div class="relative">
                <input
                  v-model="date"
                  class="w-full py-3 dark:bg-at-dark-input dark:border-gray-500"
                  type="date"
                />
              </div>
            </div>
            <!-- Time Input -->
            <div class="flex flex-col w-full">
              <label
                class="mb-1 text-sm font-semibold uppercase"
                for="time"
                >Time</label
              >
              <div>
                <input
                  v-model="time"
                  class="z-0 w-full py-3 dark:bg-at-dark-input dark:border-gray-500"
                  type="time"
                  id="time"
                />
              </div>
            </div>
            <div class="flex items-center space-x-4 md:py-2">
              <h3>Return Journey ?</h3>
              <div class="form-control">
                <label class="cursor-pointer label">
                  <input
                    @change="toggleReturn"
                    type="checkbox"
                    class="checkbox checkbox-primary"
                  />
                </label>
              </div>
            </div>
            <div></div>

            <div v-if="returnJourney" class="flex flex-col w-full">
              <label
                class="mb-1 text-sm font-semibold uppercase"
                for="date"
                >Return Date</label
              >
              <div class="relative">
                <input
                  v-model="date"
                  class="w-full py-3 dark:bg-at-dark-input dark:border-gray-500"
                  type="date"
                />
              </div>
            </div>
            <div v-if="returnJourney" class="flex flex-col w-full">
              <label
                class="mb-1 text-sm font-semibold uppercase"
                for="time"
                >Return Time</label
              >
              <div>
                <input
                  v-model="time"
                  class="z-0 w-full py-3 dark:bg-at-dark-input dark:border-gray-500"
                  type="time"
                  id="time"
                />
              </div>
            </div>
          </div>
          <Buttonview class="mt-8" text="Get quote" />
        </form>
      </div>
    </div>
  </main>
</template>

<style lang="scss"></style>
