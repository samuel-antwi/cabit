<script setup>
  import FleetDetails from "./booking/FleetDetails.vue"
  import IconClose from "./icons/IconClose.vue"
  import { useModal } from "../composables/useModal"

  const { showModal, toggleModal } = useModal()
</script>

<template>
  <div @click.self="toggleModal" v-if="showModal" class="backdrop">
    <div
      class="bg-white dark:bg-at-dark-secondary dark:text-gray-400 rounded-xl modal-content"
    >
      <div class="relative">
        <button
          @click="toggleModal"
          class="absolute flex items-center justify-center w-8 h-8 p-1 transition duration-300 ease-in-out rounded-full dark:hover:bg-at-dark-primary hover:bg-gray-300 top-3 right-3"
        >
          <IconClose
            class="dark:hidden"
            width="30pt"
            height="30pt"
            fill="#000001"
          />
          <IconClose
            class="hidden dark:block"
            width="30pt"
            height="30pt"
            fill="#ffffff"
          />
        </button>
      </div>
      <FleetDetails :toggleModal="toggleModal" />
    </div>
  </div>
</template>

<style scoped lang="scss">
  .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100%;
    background: rgba(0, 0, 0, 0.45);
  }

  .modal-content {
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: fadeIn 1s, slideIn 0.8s linear;
  }

  @media (max-width: 480px) {
    .modal-content {
      width: 90%;
    }
  }
</style>
