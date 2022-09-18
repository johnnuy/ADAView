<template>
  <DataTable
    striped-rows
    :value="delegations"
    :loading="loading"
    responsive-layout="stack"
    :paginator="true"
    :rows="10"
    :lazy="true"
    :total-records="count"
    paginator-template="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    :rows-per-page-options="[10, 20, 50]"
    :current-page-report-template="L('{first} to {last} of {totalRecords}')"
    @page="onPage($event)"
  >
    <Column field="slot.epochNumber" :header="L('Epoch')"></Column>
    <Column field="epochActive" :header="L('Epoch Active')"></Column>
    <Column field="stakePool.details.ticker" :header="L('Ticker')"> </Column>
    <Column :header="L('Pool Id')">
      <template #body="{ data }">
        <CopyToClipboardLink :text="data.stakePool?.poolId" :copy-text="data.stakePool?.poolId" break />
      </template>
    </Column>
  </DataTable>
</template>

<script setup>
import { onMounted } from 'vue'
import { useDelegations } from '@/composables/useDelegations'
import CopyToClipboardLink from '@/components/common/CopyToClipboardLink'

const props = defineProps({
  address: {
    type: String,
    default: '',
  },
})

const { delegations, count, loading, getDelegations } = useDelegations()

onMounted(() => getDelegations(props.address, 1, 10))

const onPage = (event) => getDelegations(props.address, event.page + 1, event.rows)

const getShortenedHash = (hash) => {
  return hash && hash.substring(0, 8) + '...' + hash.substr(hash.length - 8)
}
</script>

<style></style>
