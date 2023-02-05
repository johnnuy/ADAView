import { ref } from 'vue'
import axios from 'axios'
import { useSettings } from '@/composables/useSettings'

const { network } = useSettings()

export const useFetchAssets = () => {
  const assets = ref(null)
  const count = ref(0)
  const loading = ref(false)
  const error = ref(null)

  const getAssets = (address, pageNumber, pageSize) => {
    loading.value = true
    error.value = null

    axios
      .get(`${network.value.url}/wallets/${address}/assets`, {
        params: { pageNumber, pageSize },
      })
      .then((result) => {
        result.data.contents
        assets.value = result.data.data.contents
        count.value = result.data.data.totalElements
      })
      .finally(() => {
        loading.value = false
      })
  }

  return {
    assets,
    count,
    loading,
    error,
    getAssets,
  }
}

export const useFetchAsset = () => {
  const { network } = useSettings()
  const asset = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const getAsset = (address, assetId) => {
    loading.value = true
    error.value = null
    asset.value = null

    axios
      .get(`${network.value.url}/wallets/${address}/assets/${assetId}`)
      .then((result) => {
        console.log(result)
        asset.value = result.data.data
      })
      .catch((err) => {
        if (err.message === 'Network Error') {
          error.value = { message: 'Network Error' }
        } else {
          error.value = err.message
        }
        loading.value = false
      })
      .finally(() => {
        loading.value = false
      })
  }

  return {
    asset,
    loading,
    error,
    getAsset,
  }
}