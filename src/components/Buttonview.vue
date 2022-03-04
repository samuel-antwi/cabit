<script setup>
  const props = defineProps({
    text: String,
  })
</script>

<template>
  <button
    class="py-5 rounded-full btn-1 w-full md:w-auto flex justify-center items-center px-16 md:px-32 mx-auto"
  >
    {{ props.text }}
  </button>
</template>

<style>
  .btn-1 {
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
  }
</style>
