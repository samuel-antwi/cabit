/* eslint-disable vue/no-mutating-props */

<script setup>
  import IconLocation from "../icons/IconLocation.vue"

  const props = defineProps({
    postcode1: String,
    pickup: String,
    pickupAddress: Array,
  })
</script>

<template>
  <div class="flex flex-col w-full">
    <label
      class="uppercase flex justify-between font-semibold text-sm"
      for="pickup"
    >
      <span>Pickup</span>
      <button v-if="pickup" class="text-sm tracking-wide">
        CLEAR
      </button>
    </label>
    <div class="relative">
      <div class="relative" v-if="pickup">
        <input
          class="py-4 w-full focus:border-blue-500"
          v-model="pickup"
          type="text"
        />
      </div>
      <div v-else>
        <input
          class="py-3 w-full dark:bg-at-dark-input dark:border-gray-500 input input-bordered"
          placeholder="Enter destination postcode"
          type="text"
          v-model="postcode1"
        />
        <IconLocation class="absolute top-[12px] right-[16px]" />
      </div>

      <div
        class="absolute z-10 top-[52px]"
        v-if="pickupAddress?.length > 0 && postcode1 && !pickup"
      >
        <div
          class="h-60 dark:text-gray-300 bg-gray-50 dark:bg-[#36333A] border dark:border-gray-500 border-blue-500 overflow-scroll rounded-md"
        >
          <p class="px-4 text-xs bg-gray-200 py-2 dark:bg-gray-600">
            Keep typing your address for more results.
          </p>
          <ul v-for="add in pickupAddress" :key="add.address">
            <li>
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
</template>
