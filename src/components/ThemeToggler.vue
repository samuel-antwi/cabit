<script setup>
  import { themeProvider } from "../composables/useTheme"
  import IconSunLight from "./icons/IconSunLight.vue"
  import IconMoonLight from "./icons/IconMoonLight.vue"

  const store = themeProvider()

  const isDark = store.isDark
  const toggleDark = store.toggleDark
</script>

<template>
  <button
    @click="toggleDark"
    class="transition duration-300 ease-in-out"
  >
    <div class="flex items-center justify-center">
      <IconSunLight v-if="isDark" />
      <IconMoonLight v-else />
    </div>
  </button>
</template>
