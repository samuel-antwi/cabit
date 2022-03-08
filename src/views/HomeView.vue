<script setup>
  import BookingForm from "../components/booking/BookingForm.vue"
  import PortalVew from "../components/PortalVew.vue"
</script>

<template>
  <main>
    <div class="min-h-screen pt-28 home">
      <div class="max-w-5xl px-4 mx-auto">
        <BookingForm />
      </div>
    </div>
    <teleport to="#portal-root">
      <PortalVew />
    </teleport>
  </main>
</template>

<style lang="scss"></style>
