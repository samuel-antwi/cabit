<script setup>
  import FooterDefault from "../components/FooterDefault.vue"
  import NavBar from "../components/NavBar.vue"
</script>

<template>
  <div>
    <NavBar />
    <main>
      <slot />
    </main>
    <FooterDefault />
  </div>
</template>

<style></style>
