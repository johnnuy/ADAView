import { ref } from 'vue'
import axios from 'axios'
import { useSettings } from '@/composables/useSettings'

const { getApiUrl } = useSettings()

export const useFetchDelegations = () => {
  const delegations = ref(null)
  const count = ref(0)
  const loading = ref(false)
  const error = ref(null)

  const getDelegations = (address, pageNumber, pageSize) => {
    loading.value = true
    error.value = null

    axios
      .get(`${getApiUrl()}/wallets/${address}/delegations`, {
        params: { pageNumber, pageSize },
      })
      .then((result) => {
        result.data.data.contents
        delegations.value = result.data.data.contents
        count.value = result.data.data.totalElements
      })
      .finally(() => {
        loading.value = false
      })
  }

  return {
    delegations,
    count,
    loading,
    error,
    getDelegations,
  }
}
