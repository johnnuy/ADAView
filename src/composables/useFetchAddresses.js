import { ref } from 'vue'
import axios from 'axios'
import { useSettings } from '@/composables/useSettings'

const { network } = useSettings()

export const useFetchAddresses = () => {
  const addresses = ref(null)
  const count = ref(0)
  const loading = ref(false)
  const error = ref(null)

  const getAddresses = (address, pageNumber, pageSize) => {
    loading.value = true
    error.value = null

    axios
      .get(`${network.value.url}/wallets/${address}/addresses`, {
        params: { pageNumber, pageSize },
      })
      .then((result) => {
        result.data.contents
        addresses.value = result.data.data.contents
        count.value = result.data.data.totalElements
      })
      .finally(() => {
        loading.value = false
      })
  }

  return {
    addresses,
    count,
    loading,
    error,
    getAddresses,
  }
}
