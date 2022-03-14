<script setup>
  import IconContactless from "../icons/IconContactless.vue"
  import IconLuggage from "../icons/IconLuggage.vue"
  import IconWifi from "../icons/IconWifi.vue"
  import IconPassengers from "../icons/IconPassengers.vue"

  const props = defineProps(["fleet"])
</script>

<template>
  <div class="dark:text-gray-900">
    <h1
      class="py-3 text-lg font-semibold tracking-wide dark:text-gray-300"
    >
      Features
    </h1>
    <div class="flex items-center space-x-4">
      <div
        class="flex items-center space-x-3 py-1 bg-[#E4E4E4] px-3 rounded-full"
      >
        <IconPassengers width="20pt" height="20pt" fill="#333" />

        <p>{{ props.fleet?.capacity }}</p>
      </div>
      <div
        v-if="props.fleet?.wifi"
        class="py-1 bg-[#E4E4E4] px-3 rounded-full"
      >
        <IconWifi width="20pt" height="20pt" fill="#333" />
      </div>
      <div
        v-if="props.fleet?.contactlessPayment"
        class="py-1 bg-[#E4E4E4] px-3 rounded-full"
      >
        <IconContactless width="20pt" height="20pt" fill="#333" />
      </div>
      <div
        class="flex items-center space-x-3 py-1 bg-[#E4E4E4] px-3 rounded-full"
      >
        <IconLuggage width="20pt" height="20pt" fill="#333" />
        <p>{{ props.fleet?.luggages }}</p>
      </div>
    </div>
  </div>
</template>
