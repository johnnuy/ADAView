import { ref } from 'vue'
import axios from 'axios'
import { formatTransaction } from '../utils/utils'
import { useSettings } from '@/composables/useSettings'

export const useFetchTransactions = () => {
  const { network } = useSettings()
  const transactions = ref(null)
  const count = ref(0)
  const loading = ref(false)
  const error = ref(null)

  const getTransactions = (address, pageNumber, pageSize) => {
    loading.value = true
    error.value = null

    axios
      .get(`${network.value.url}/wallets/${address}/transactions`, {
        params: { pageNumber, pageSize },
      })
      .then((result) => {
        transactions.value = result.data.data.contents.map(formatTransaction)
        count.value = result.data.data.totalElements
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
    transactions,
    count,
    loading,
    error,
    getTransactions,
  }
}

export const useFetchTransaction = () => {
  const { network } = useSettings()
  const transaction = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const getTransaction = (address, transactionId) => {
    loading.value = true
    error.value = null
    transaction.value = null

    axios
      .get(`${network.value.url}/wallets/${address}/transactions/${transactionId}`)
      .then((result) => {
        transaction.value = formatTransaction(result.data.data)
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
    transaction,
    loading,
    error,
    getTransaction,
  }
}
