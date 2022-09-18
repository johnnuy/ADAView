<template>
  <DataTable
    striped-rows
    :value="addresses"
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
    <Column field="era" :header="L('Era')"></Column>
    <Column field="format" :header="L('Format')"></Column>  
    <Column :header="L('Address')">
      <template #body="{ data }">
        <WalletAddress :address="data.addressText" />
      </template>
    </Column>
  </DataTable>
</template>

<script setup>
import { onMounted } from 'vue'
import { useFetchAddresses } from '@/composables/useFetchAddresses'
import WalletAddress from '@/components/common/WalletAddress'

const props = defineProps({
  address: String,
})

const { addresses, count, loading, getAddresses } = useFetchAddresses()

onMounted(() => getAddresses(props.address, 1, 10))
const onPage = (event) => getAddresses(props.address, event.page + 1, event.rows)
</script>

<style></style>
