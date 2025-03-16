import { ref } from 'vue'
import axios from 'axios'
import { useSettings } from '@/composables/useSettings'

const { network } = useSettings()

export const useFetchVoteDelegations = () => {
  const delegations = ref(null)
  const count = ref(0)
  const loading = ref(false)
  const error = ref(null)

  const getVoteDelegations = (address, pageNumber, pageSize) => {
    loading.value = true
    error.value = null

    axios
      .get(`${network.value.url}/wallets/${address}/vote-delegations`, {
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
    getVoteDelegations,
  }
}
