<script setup>
  import { themeProvider } from "../composables/useTheme"
  import IconMoon from "~icons/mdi/weather-night"
  import IconSun from "~icons/mdi/white-balance-sunny"

  const store = themeProvider()

  const { isDark, toggleDark } = store
</script>

<template>
  <button
    @click="toggleDark"
    class="transition duration-300 ease-in-out"
  >
    <div class="flex items-center justify-center">
      <icon-sun v-if="isDark" />
      <icon-moon v-else />
    </div>
  </button>
</template>
