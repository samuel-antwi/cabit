<script setup>
  import IconTelephone from "../icons/IconTelephone.vue"
</script>

<template>
  <div class="flex flex-col w-full">
    <label class="uppercase font-semibold text-sm" for="pickup"
      >Phone Number</label
    >
    <div class="relative">
      <input
        class="py-3 w-full dark:bg-at-dark-input dark:border-gray-500 input input-bordered"
        placeholder="Enter pickup postcode"
        type="text"
      />
      <IconTelephone class="absolute top-[12px] right-[16px]" />
    </div>
  </div>
</template>
