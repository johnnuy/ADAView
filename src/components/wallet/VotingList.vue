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
    <Column field="chainPointer.slot" :header="L('Active Slot')"></Column>
    <Column field="drep.details.givenName" :header="L('Name')"> </Column>
    <Column :header="L('DRep Id')">
      <template #body="{ data }">
        <CopyToClipboardLink :text="data.drep?.drepId" :copy-text="data.drep?.drepId" break />
      </template>
    </Column>
  </DataTable>
</template>

<script setup>
import { onMounted } from 'vue'
import { useFetchVoteDelegations } from '@/composables/useFetchVoteDelegations'
import CopyToClipboardLink from '@/components/common/CopyToClipboardLink'

const props = defineProps({
  address: {
    type: String,
    default: '',
  },
})

const { delegations, count, loading, getVoteDelegations } = useFetchVoteDelegations()

onMounted(() => getVoteDelegations(props.address, 1, 10))

const onPage = (event) => getVoteDelegations(props.address, event.page + 1, event.rows)

</script>

<style></style>
