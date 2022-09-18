import { ref } from 'vue'
import axios from 'axios'
import { useSettings } from '@/composables/useSettings'

const { getApiUrl } = useSettings()

export const useStakePools = () => {
  const stakePools = ref(null)
  const count = ref(0)
  const loading = ref(false)
  const error = ref(null)

  const getStakePools = (address, pageNumber, pageSize) => {
    loading.value = true
    error.value = null

    axios
      .get(`${getApiUrl()}/wallets/${address}/stakepools`, {
        params: { pageNumber, pageSize },
      })
      .then((result) => {
        stakePools.value = result.data.data.contents
        count.value = result.data.data.totalElements
      })
      .catch((err) => {
        if (err.toJSON().message === 'Network Error') {
          error.value = { message: 'Network Error' }
        } else {
          error.value = err.response.data
        }
        loading.value = false
      })
      .finally(() => {
        loading.value = false
      })
  }

  return {
    stakePools,
    count,
    loading,
    error,
    getStakePools,
  }
}

export const useStakePool = () => {
  const stakePool = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const getStakePool = (address, poolId) => {
    loading.value = true
    error.value = null
    stakePool.value = null
    axios
      .get(`${getApiUrl()}/wallets/${address}/stakepools/${poolId}`)
      .then((result) => {
        stakePool.value = result.data.data
      })
      .catch((err) => {
        if (err.toJSON().message === 'Network Error') {
          error.value = { message: 'Network Error' }
        } else {
          error.value = err.response.data
        }
        loading.value = false
      })
      .finally(() => {
        loading.value = false
      })
  }

  return {
    stakePool,
    loading,
    error,
    getStakePool,
  }
}
