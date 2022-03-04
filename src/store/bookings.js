import { defineStore } from "pinia"
import { useLocalStorage } from "@vueuse/core"

const apiKey = import.meta.env.VITE_POSTCODE_API_KEY

export const useBookings = defineStore("bookings", {
  state: () => ({
    errorMsg: null,
    distance: null,
    address: null,
    isLoading: false,
    date: null,
    pickUpPostcode: null,
    destinationPostcode: null,
    pickupAddress: [],
    destinationAddress: [],
    pickup: useLocalStorage("pickup", null),
    destination: useLocalStorage("destination", null),
  }),

  getters: {
    getDistanceInMiles: (state) => state.distance / 1609,
  },

  actions: {
    async getAddress(postcode) {
      try {
        const res = await fetch(
          `https://api.getAddress.io/autocomplete/${postcode}
          ?api-key=${apiKey} `
        )

        const add = await res.json()
        console.log(add)
        this.address = add.suggestions
      } catch (error) {
        console.log(error)
      }
    },

    async getDistance(post1, post2) {
      try {
        this.isLoading = true
        const res = await fetch(
          `https://api.getAddress.io/distance/${post1}/${post2}
          ?api-key=${apiKey} `
        )
        const dist = await res.json()
        this.distance = dist.metres
        this.isLoading = false
      } catch (error) {
        this.errorMsg = error
        console.log(error.message)
      } finally {
        this.isLoading = false
      }
    },

    async getPickupAddress(postcode) {
      if (postcode?.length >= 3) {
        try {
          const res = await fetch(
            `https://api.getAddress.io/autocomplete/${postcode}
          ?api-key=${apiKey} `
          )
          const add = await res.json()
          console.log(add)
          this.pickupAddress = add.suggestions
        } catch (error) {
          console.log(error)
        }
      }
    },

    setPickUpAddress(v) {
      this.pickup = v
    },
  },
})
