<script setup>
  import FooterDefault from "../components/FooterDefault.vue"
  import NavBar from "../components/NavBar.vue"
</script>

<template>
  <div
    class="transition duration-500 ease-in-out bg-gray-200 dark:text-gray-400 dark:bg-at-dark-primary"
  >
    <NavBar />
    <main>
      <slot />
    </main>
    <FooterDefault />
  </div>
</template>

<style></style>
