<script setup>
  import IconMoon from "./icons/IconMoon.vue"
  import IconSun from "./icons/IconSun.vue"
  import { themeProvider } from "../composables/useTheme"
  import IconSunLight from "./icons/IconSunLight.vue"

  const store = themeProvider()

  const isDark = store.isDark
  const toggleDark = store.toggleDark
</script>

<template>
  <button
    @click="toggleDark"
    class="w-[40px] h-[40px] px-1.5 border relative transition duration-500 ease-in-out rounded-full dark:bg-[#2F2F2F] bg-gray-50"
  >
    <div class="flex justify-center items-center">
      <div v-if="isDark">
        <IconSunLight v-if="isDark" />
        <IconSun v-else />
      </div>
      <div v-else>
        <IconMoon />
      </div>
    </div>
  </button>
</template>
