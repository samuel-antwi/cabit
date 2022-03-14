<script setup>
  import { toRefs } from "vue"

  import { useBookingsStore } from "../../../store/useBookings"
  const store = useBookingsStore()
  const journeyDetails = store.journeyDetails

  const props = defineProps({
    toggleReturn: Function,
  })

  const { toggleReturn } = toRefs(props)
</script>

<template>
  <div class="flex items-center space-x-4 md:py-2">
    <h3>Return journey ?</h3>
    <div class="form-control">
      <label class="cursor-pointer label">
        <input
          @change="toggleReturn"
          type="checkbox"
          :checked="journeyDetails.returnjourney"
          class="checkbox checkbox-primary"
        />
      </label>
    </div>
  </div>
</template>
