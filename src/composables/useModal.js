import { ref } from "vue"

const showModal = ref(false)

const toggleModal = () => {
  showModal.value = !showModal.value
}

const useModal = () => {
  return { showModal, toggleModal }
}

export default useModal
