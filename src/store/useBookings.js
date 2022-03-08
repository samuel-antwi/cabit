import { ref } from "vue"

import { defineStore } from "pinia"

const apiKey = import.meta.env.VITE_POSTCODE_API_KEY

export const useBookingsStore = defineStore("booking", () => {
  let isLoading = ref(false)
  let errorMsg = ref(null)
  let usage = ref(null)
  let bookings = ref({
    distance: null,
    address: null,
    date: null,
    pickUpPostcode: null,
    destinationPostcode: null,
    pickupAddress: [],
    destinationAddress: [],
    pickup: null,
    destination: null,
  })

  const getPickupAddress = async (postcode) => {
    if (postcode?.length >= 3) {
      try {
        const res = await fetch(
          `https://api.getAddress.io/autocomplete/${postcode}
          ?api-key=${apiKey}&all=true`
        )
        const add = await res.json()
        console.log(add)
        bookings.value.pickupAddress = add.suggestions
      } catch (error) {
        console.log(error.message)
      }
    }
  }

  const getDestinationAddress = async (postcode) => {
    if (postcode.length >= 3) {
      try {
        const res = await fetch(
          `https://api.getAddress.io/autocomplete/${postcode}
          ?api-key=${apiKey}&all=true`
        )
        const add = await res.json()
        console.log(add)
        bookings.value.destinationAddress = add.suggestions
      } catch (error) {
        console.log(error.message)
      }
    }
  }

  const getDistance = async (postcode1, postcode2) => {
    try {
      this.isLoading = true
      const res = await fetch(
        `https://api.getAddress.io/distance/${postcode1}/${postcode2}
          ?api-key=${apiKey} `
      )
      const dist = await res.json()
      bookings.value.distance = dist.metres
      isLoading.value = false
    } catch (error) {
      errorMsg.value = error
      console.log(error.message)
    } finally {
      isLoading.value = false
    }
  }

  // Get Api usage
  const getApiUsage = async () => {
    try {
      const res = await fetch(
        `https://api.getAddress.io/usage?api-key=${apiKey}`
      )
      usage.value = await res.json()
      console.log(usage.value)
    } catch (error) {
      console.log(error)
    }
  }

  const setPickUpAddress = (v) => {
    bookings.value.pickup = v
  }

  const setDestinationAddress = (v) => {
    bookings.value.destination = v
  }

  return {
    isLoading,
    errorMsg,
    getPickupAddress,
    getDestinationAddress,
    setPickUpAddress,
    setDestinationAddress,
    bookings,
    getApiUsage,
    getDistance,
    usage,
  }
})
