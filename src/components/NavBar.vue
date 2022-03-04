<script setup>
  import IconTaxiYellow from "./icons/IconTaxiYellow.vue"
  import ThemeToggler from "./ThemeToggler.vue"
</script>

<template>
  <nav class="nav fixed w-full top-0 text-gray-50">
    <div
      class="flex justify-between max-w-6xl px-4 mx-auto items-center"
    >
      <router-link to="/">
        <IconTaxiYellow />
      </router-link>

      <div class="md:flex justify-between items-center space-x-7">
        <div
          class="hidden md:flex justify-between items-center space-x-7"
        >
          <router-link to="/about">About</router-link>
          <router-link to="/about">Account</router-link>
          <router-link to="/about">Sign In</router-link>
        </div>
        <ThemeToggler />
      </div>
    </div>
  </nav>
</template>

<style lang="scss">
  .nav {
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1;
  }
</style>
