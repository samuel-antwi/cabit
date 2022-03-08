<script setup>
  import { RouterView } from "vue-router"
  import LayoutDefault from "./layouts/LayoutDefault.vue"
  import { useFavicon } from "@vueuse/core"

  const icon = useFavicon()
  icon.value = "../images/taxi-variants/taxi.png"
</script>

<template>
  <div class="min-h-screen">
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
