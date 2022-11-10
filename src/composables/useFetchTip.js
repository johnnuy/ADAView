import { readonly, ref } from 'vue'
import axios from 'axios'
import { useSettings } from '@/composables/useSettings'

export const useFetchTip = () => {
  const tip = ref(null)
  const loading = ref(false)
  const error = ref(null)
  let abortController = new AbortController()
  const { getApiUrl, getNetworkEpochLength } = useSettings()

  const fetchTip = () => {
    // send an abort signal if there's already a request happening
    if (loading.value) {
      abortController.abort()
    }

    abortController = new AbortController()

    loading.value = true
    error.value = null

    axios
      .get(`${getApiUrl()}/tip`, { signal: abortController.signal })
      .then((res) => {
        tip.value = res.data
        loading.value = false
      })
      .catch((err) => {
        axios.isAxiosError
        if (axios.isCancel(err)) {
          // Request cancelled
          error.value = null
          return
        } else if (err.toJSON().message === 'Network Error') {
          error.value = { message: 'Network Error' }
        } else {
          error.value = err.response.data
        }
        loading.value = false
      })
  }

  const incrementAllSlotNbr = () => {
    incrementGlobalSlotNbr()
    incrementEpochSlotNbr()
  }

  const incrementGlobalSlotNbr = () => {
    if (tip.value?.currentSlot?.slotNumber) tip.value.currentSlot.slotNumber++
  }

  const incrementEpochSlotNbr = () => {
    if (tip.value?.currentSlot?.slotNumberInEpoch >= getNetworkEpochLength()) manualEpochRollover()
    if (tip.value?.currentSlot?.slotNumberInEpoch) {
      tip.value.currentSlot.slotNumberInEpoch++
    }
  }

  const manualEpochRollover = () => {
    tip.value.currentSlot.slotNumberInEpoch = 1
    tip.value.currentSlot.epochNumber++
  }

  return {
    tip: readonly(tip),
    loading,
    error,
    fetchTip,
    incrementAllSlotNbr,
    incrementGlobalSlotNbr,
    incrementEpochSlotNbr,
  }
}
