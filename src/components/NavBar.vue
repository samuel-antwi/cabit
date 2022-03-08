<script setup>
  import IconTaxi from "./icons/IconTaxi.vue"
  import ThemeToggler from "./ThemeToggler.vue"
</script>

<template>
  <nav
    class="fixed top-0 w-full text-gray-800 shadow-md nav dark:text-gray-50"
  >
    <div
      class="flex items-center justify-between max-w-6xl px-4 mx-auto"
    >
      <router-link to="/">
        <IconTaxi />
      </router-link>

      <div class="items-center justify-between md:flex space-x-7">
        <div
          class="items-center justify-between hidden md:flex space-x-7"
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
    /* background-color: rgba(0, 0, 0, 0.7); */
    z-index: 1;
  }
</style>
