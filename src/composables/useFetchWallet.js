import { ref } from 'vue'
import axios from 'axios'
import { useSettings } from '@/composables/useSettings'
import { useSearchHistory } from '@/composables/useSearchHistory'
const { addSearch } = useSearchHistory()

const wallet = ref(null)
const loading = ref(false)
const error = ref(null)

export const useFetchWallet = () => {
  let abortController = new AbortController()
  const { getApiUrl, network } = useSettings()

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
      .get(`${getApiUrl()}/wallets/${address}`, { signal: abortController.signal })
      .then((response) => {
        wallet.value = response.data
        loading.value = false
        addSearch({ address, name: wallet.value.data.avatar.name, network: wallet.value.network })
      })
      .catch((err) => {
        axios.isAxiosError
        if (axios.isCancel(err)) {
          // Request cancelled
          error.value = null
          return
        } else if (err.message === 'Network Error') {
          error.value = { message: 'Network Error' }
        } else {
          error.value = err.message
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
