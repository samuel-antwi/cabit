<script setup>
  const props = defineProps({
    width: String,
    height: String,
  })
</script>

<template>
  <button type="button">
    <svg
      :width="props.width"
      :height="props.height"
      version="1.1"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path
          d="m30.141 64.523 34.371-34.371 2.2109 2.2109-34.371 34.371z"
        />
        <path
          d="m30.141 32.352 2.2109-2.2109 34.371 34.371-2.2109 2.2109z"
        />
      </g>
    </svg>
  </button>
</template>
