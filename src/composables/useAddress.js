const apiKey = import.meta.env.VITE_POSTCODE_API_KEY

export const getDistnace = async (add1, add2) => {
  try {
    const distance = await fetch(
      `https://api.getAddress.io/distance/${add1}/${add2}?api-key=${apiKey} `
    )
    return distance
  } catch (error) {
    console.log(error)
  }
}
