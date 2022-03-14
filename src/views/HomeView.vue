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

<style lang="scss">
  /* .home {
    background: url("../assets/images/woman-on-phone.jpeg");
    background-repeat: no-repeat;
    background-position: right;
    background-size: cover;
    width: 100%;
    height: 100vh;
  } */

  label {
    color: rgb(75 85 99);
  }
</style>
