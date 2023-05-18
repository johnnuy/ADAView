import { ref } from 'vue'
import axios from 'axios'
import { useSettings } from '@/composables/useSettings'

const wallet = ref(null)
const loading = ref(false)
const error = ref(null)

export const useFetchWallet = () => {
  let abortController = new AbortController()
  const { network } = useSettings()

  const fetchWallet = async (address) => {
    // send an abort signal if there's already a request happening
    if (loading.value) {
      abortController.abort()
    }

    abortController = new AbortController()

    loading.value = true
    error.value = null
    wallet.value = null

    try {
      const urlSafeResponse = await axios.post(`${network.value.url}/wallets`, { address })
      const walletIdentifier = urlSafeResponse.data.walletIdentifier
      const response = await axios.get(`${network.value.url}/wallets/${walletIdentifier}`, { signal: abortController.signal })
      wallet.value = response.data.data
      loading.value = false
    } catch (err) {
      if (axios.isCancel(err)) {
        // Request cancelled
        error.value = null
        return
      } else if (err.response?.data) {
        error.value = { message: err.response.data.message + ' (' + err.response.data.network + ')' }
      } else {
        error.value = { message: err.message }
      }
      loading.value = false
    }
  }

  return {
    wallet,
    loading,
    error,
    fetchWallet,
  }
}
