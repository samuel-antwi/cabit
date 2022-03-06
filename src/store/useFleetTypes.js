import { defineStore } from "pinia"
import supabase from "../lib/supabase.js"
import useModal from "../composables/useModal.js"
const { toggleModal } = useModal()

export const useTaxiStore = defineStore("taxis", {
  state: () => ({
    fleets: [],
    fleet: null,
    isLoading: false,
    errorMsg: null,
  }),

  getters: {},

  actions: {
    async getFleets() {
      try {
        this.isLoading = true
        let { data: fleets, error } = await supabase
          .from("fleets")
          .select("*")
        this.fleets = fleets
        this.isLoading = false
        if (error) throw error
      } catch (error) {
        this.errorMsg = error.message
        console.log(error.message)
      }
    },

    async getFleetById(id) {
      try {
        this.isLoading = true
        const { data: fleet, error } = await supabase
          .from("fleets")
          .select("*")
          .eq("id", id)
        if (error) throw error
        this.fleet = fleet[0]
        await toggleModal()
        this.isLoading = false
      } catch (error) {
        this.errorMsg = error.message
        console.log(error.message)
      }
    },
  },
})
