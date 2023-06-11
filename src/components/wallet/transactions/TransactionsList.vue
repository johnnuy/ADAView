<template>
  <DataTable
    striped-rows
    :value="transactions"
    :loading="loading"
    responsive-layout="stack"
    :paginator="true"
    :rows="10"
    :lazy="true"
    :total-records="count"
    paginator-template="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    :rows-per-page-options="[10, 20, 50]"
    :current-page-report-template="L('{first} to {last} of {totalRecords}')"
    selection-mode="single"
    @page="onPage($event)"
    @row-click="onClick"
  >
    <Column field="transactionDate" :header="L('Date')"></Column>

    <Column :header="L('Details')">
      <template #body="{ data }">
        <span>{{ L(getTransactionDetails(data)) }}</span>
      </template>
    </Column>

    <Column :header="L('Funds In')">
      <template #body="{ data }">
        <!-- receipt -->
        <span v-if="data.type !== TransactionTypes.PAYMENT.id">{{ formatLovelace(data.adaValue) }}</span>
      </template>
    </Column>

    <Column :header="L('Funds Out')">
      <template #body="{ data }">
        <!-- payment -->
        <span v-if="data.type === TransactionTypes.PAYMENT.id">{{ formatLovelace(data.adaValue) }}</span>
      </template>
    </Column>

    <Column :header="L('Balance')">
      <template #body="{ data }">
        <span>{{ formatLovelace(data.adaBalance) }}</span>
      </template>
    </Column>

    <Column :header="L('Assets')">
      <template #body="{ data }">
        <!-- payment -->
        <span v-if="data.assetsReceived.length > 0">{{ data.assetsReceived.length }} Received</span>
        <span v-else-if="data.assetsSent.length > 0">{{ data.assetsSent.length }} Sent</span>
      </template>
    </Column>
  </DataTable>
</template>

<script setup>
import { onMounted } from 'vue'
import { formatLovelace, getTransactionDetails } from '@/utils/utils'
import { useFetchTransactions } from '@/composables/useFetchTransactions'
import { TransactionTypes } from '@/utils/constants'

import router from '@/router'

const props = defineProps({
  address: String,
})

const { transactions, count, loading, getTransactions } = useFetchTransactions()

const onClick = ({ data }) => {
  router.push({ name: 'TransactionDetails', params: { ...router.currentRoute.value.params, transactionId: data.id, transaction: JSON.stringify(data) } })
}

onMounted(() => {
  getTransactions(props.address, 1, 10)
})
const onPage = (event) => getTransactions(props.address, event.page + 1, event.rows)
</script>

<style></style>
