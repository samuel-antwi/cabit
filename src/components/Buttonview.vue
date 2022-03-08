<script setup>
  const props = defineProps({
    text: String,
  })
</script>

<template>
  <button class="btn-1">
    {{ props.text }}
  </button>
</template>

<style></style>
