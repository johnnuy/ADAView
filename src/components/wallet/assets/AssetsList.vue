<template>
  <DataTable
    striped-rows
    :value="assets"
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
    <Column field="asset.name" :header="L('Name')"></Column>
    <Column field="quantity" :header="L('Quantity')"></Column>
    <Column field="asset.supply" :header="L('Supply')"></Column>      
    <Column field="asset.policy" :header="L('Policy')"></Column>
    <Column :header="L('Fingerprint')">
      <template #body="{ data }">
        <CopyToClipboardLink :text="data.asset.fingerprint" :copy-text="data.asset.fingerprint" break />
      </template>
    </Column>
  </DataTable>
</template>

<script setup>
import CopyToClipboardLink from '@/components/common/CopyToClipboardLink.vue'
import { onMounted } from 'vue'
import { useFetchAssets } from '@/composables/useFetchAssets'

const props = defineProps({
  address: String,
})

const { assets, count, loading, error, getAssets } = useFetchAssets()

onMounted(() => getAssets(props.address, 1, 10))
const onPage = (event) => getAssets(props.address, event.page + 1, event.rows)
</script>

<style></style>
