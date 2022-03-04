<script setup>
  import { RouterView } from "vue-router"
  import LayoutDefault from "./layouts/LayoutDefault.vue"
  import { useMainStore } from "./store/main"

  import { useStorage, useSessionStorage } from "@vueuse/core"

  const mainStore = useMainStore()

  useSessionStorage("mainStore", mainStore)
</script>

<template>
  <div
    class="dark:bg-[#121212] bg-gray-200 min-h-screen transition duration-500 ease-in-out"
  >
    <LayoutDefault>
      <RouterView />
    </LayoutDefault>
  </div>
</template>

<style>
  span {
    text-transform: none !important;
  }
</style>
