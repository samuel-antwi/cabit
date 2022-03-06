import { defineStore } from "pinia"

export const useMainStore = defineStore("main", {
  state: () => ({
    modalShown: true,
  }),

  getters: {},

  actions: {
    toggleModalShown() {
      this.modalShown = !this.modalShown
    },
  },
})
