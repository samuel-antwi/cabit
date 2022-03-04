import { defineStore } from "pinia"
import supabase from "../lib/supabase.js"
import { useSessionStorage } from "@vueuse/core"

export const useTaxiStore = defineStore("taxis", {
  state: () => ({
    fleets: useSessionStorage("fleets", []),
    fleet: useSessionStorage("fleet", null),
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

        let { data: fleet, error } = await supabase
          .from("fleets")
          .select("*")
          .eq("id", id)
        this.fleet = fleet[0]
        if (error) throw error
        console.log(fleet)
        this.isLoading = false
      } catch (error) {
        this.errorMsg = error.message
        console.log(error.message)
      }
    },
  },
})
