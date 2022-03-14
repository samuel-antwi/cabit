<script setup>
  import { useBookingsStore } from "../../../store/useBookings"
  import { toRefs } from "vue"
  import IconClose from "~icons/mdi/close"
  import IconMapMarker from "~icons/mdi/map-marker"

  const store = useBookingsStore()
  const journeyDetails = store.journeyDetails

  const props = defineProps({
    clearAddress: Function,
    setDestinationAddress: Function,
  })

  const { clearAddress, setDestinationAddress } = toRefs(props)
</script>

<template>
  <div class="flex flex-col w-full">
    <label
      class="flex justify-between mb-1 text-sm font-semibold uppercase"
      for="pickup"
    >
      <span>DESTINATION</span>
      <button
        @click="clearAddress(journeyDetails.destinationAddress)"
        v-if="journeyDetails.destinationAddress"
        class="text-sm tracking-wide"
      >
        CLEAR
      </button>
    </label>
    <div class="relative">
      <div class="relative" v-if="journeyDetails.destinationAddress">
        <input
          @focus="clearAddress(journeyDetails.destinationAddress)"
          class="w-full py-3 dark:border-gray-500 dark:bg-at-dark-input focus:border-blue-500"
          v-model="journeyDetails.destinationAddress"
          type="text"
        />
      </div>
      <div v-else>
        <input
          class="w-full py-3 dark:bg-at-dark-input dark:border-gray-500"
          placeholder="Enter Postcode or address"
          type="text"
          v-model="journeyDetails.destinationPostcode"
        />
        <div class="absolute text-gray-500 top-[12px] right-[16px]">
          <button
            @click="journeyDetails.destinationPostcode = null"
            v-if="journeyDetails.destinationPostcode"
          >
            <icon-close class="text-lg" />
          </button>
          <icon-map-marker v-else class="text-lg" />
        </div>
      </div>

      <div
        class="absolute z-10 top-[52px]"
        v-if="
          journeyDetails.destinationAddressList?.length > 0 &&
          journeyDetails.destinationPostcode &&
          !journeyDetails.destinationAddress
        "
      >
        <div
          class="overflow-scroll border border-blue-500 rounded-md max-h-60 dark:text-gray-400 bg-gray-50 dark:bg-at-dark-primary dark:border-gray-500"
        >
          <p class="px-4 py-2 text-xs bg-gray-200 dark:bg-gray-600">
            Keep typing your address for more results.
          </p>
          <ul
            v-for="add in journeyDetails.destinationAddressList"
            :key="add.address"
          >
            <li @click="setDestinationAddress(add.address)">
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
</template>
