import { ref } from 'vue'
import axios from 'axios'
import { useSettings } from '@/composables/useSettings'

const wallet = ref(null)
const loading = ref(false)
const error = ref(null)

export const useFetchWallet = () => {
  let abortController = new AbortController()
  const { network } = useSettings()

  const fetchWallet = (address) => {
    // send an abort signal if there's already a request happening
    if (loading.value) {
      abortController.abort()
    }

    abortController = new AbortController()

    loading.value = true
    error.value = null
    wallet.value = null

    axios
      .get(`${network.value.url}/wallets/${address}`, { signal: abortController.signal })
      .then((response) => {
        wallet.value = response.data.data
        loading.value = false
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          // Request cancelled
          error.value = null
          return
        } else if (err.response.data) {
          error.value = { message: err.response.data.message + ' (' + err.response.data.network + ')' }
        } else {
          error.value = { message: err.message }
        }
        loading.value = false
      })
  }

  return {
    wallet,
    loading,
    error,
    fetchWallet,
  }
}
