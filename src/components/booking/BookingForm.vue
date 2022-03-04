<script setup>
  import { ref, watchEffect } from "vue"
  import { useRouter } from "vue-router"
  import moment from "moment"
  import CarType from "../CarType.vue"
  import IconLocation from "../icons/IconLocation.vue"
  import Buttonview from "../Buttonview.vue"
  import IconTelephone from "../icons/IconTelephone.vue"
  import IconCalendar from "../icons/IconCalendar.vue"
  import { storeToRefs } from "pinia"
  import { useBookingsStore } from "../../store/useBookings"

  const router = useRouter()

  let postcode1 = ref(null)
  let postcode2 = ref(null)

  const store = useBookingsStore()

  const { isLoading, bookings } = storeToRefs(store)
  console.log(bookings.value)

  watchEffect(() => {
    if (postcode1.value) store.getPickupAddress(postcode1.value)
    if (postcode2.value) store.getDestinationAddress(postcode2.value)
  })

  // Handle Booking
  const handleBookings = async () => {
    console.log(bookings.value.pickup, bookings.value.destination)

    // Cancel WatchEffect when no longer needed
    watchEffect(() => {
      console.log("WatchEffect is stopped")
    })

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
        class="max-w-2xl dark:bg-at-dark-bg shadow-md dark:text-gray-100 bg-gray-50 rounded-md p-10"
      >
        <div class="text-center mb-10">
          <h1
            class="text-4xl mb-2 text-gray-700 dark:text-gray-100 uppercase font-bold"
          >
            Book Online
          </h1>
          <p>
            Your options are endless. Choose from our varieties of
            fleets
          </p>
        </div>

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
                    class="py-4 dark:border-gray-500 w-full input dark:bg-at-dark-input input-bordered"
                    v-model="bookings.pickup"
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
                    class="absolute hidden md:block top-[12px] right-[16px]"
                  />
                </div>

                <div
                  class="absolute z-10 top-[52px]"
                  v-if="
                    bookings.pickupAddress?.length > 0 &&
                    postcode1 &&
                    !bookings.pickup
                  "
                >
                  <div
                    class="max-h-60 dark:text-gray-300 bg-gray-50 dark:bg-[#36333A] border dark:border-gray-500 border-blue-500 overflow-scroll rounded-md"
                  >
                    <p
                      class="px-4 text-xs bg-gray-200 py-2 dark:bg-gray-600"
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
                    class="py-4 w-full dark:border-gray-500 input dark:bg-at-dark-input input-bordered focus:border-blue-500"
                    v-model="bookings.destination"
                    type="text"
                  />
                </div>
                <div v-else>
                  <input
                    class="py-3 w-full dark:bg-at-dark-input dark:border-gray-500 input input-bordered"
                    placeholder="Enter destination postcode or address"
                    type="text"
                    v-model="postcode2"
                  />
                  <IconLocation
                    class="absolute hidden md:block top-[12px] right-[16px]"
                  />
                </div>

                <div
                  class="absolute z-10 top-[52px]"
                  v-if="
                    bookings.destinationAddress?.length > 0 &&
                    postcode2 &&
                    !bookings.destination
                  "
                >
                  <div
                    class="max-h-60 dark:text-gray-300 bg-gray-50 dark:bg-[#36333A] border dark:border-gray-500 border-blue-500 overflow-scroll rounded-md"
                  >
                    <p
                      class="px-4 text-xs bg-gray-200 py-2 dark:bg-gray-600"
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
