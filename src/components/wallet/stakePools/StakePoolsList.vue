<template>
  <DataTable
    striped-rows
    :value="stakePools"
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
    <Column :header="L('Pool Id')">
      <template #body="{ data }">
        <CopyToClipboardLink :text="data.stakePool?.poolId" :copy-text="data.stakePool?.poolId" break />
      </template>
    </Column>

    <Column :header="L('Ticker')">
      <template #body="{ data }">
        <span v-if="data.stakePool.details">{{ data.stakePool.details.ticker }}</span>        
      </template>
    </Column>

    <Column :header="L('Name')">
      <template #body="{ data }">
        <span v-if="data.stakePool.details">{{ data.stakePool.details.name }}</span>
      </template>
    </Column>

    <Column :header="L('Pledge')">
      <template #body="{ data }">
        <span v-if="data.stakePool.details">{{ formatLovelace(data.stakePool.details.pledgeAda) }}</span>
      </template>
    </Column>

    <Column :header="L('Fixed Cost')">
      <template #body="{ data }">
        <span v-if="data.stakePool.details">{{ formatLovelace(data.stakePool.details.fixedCostAda) }}</span>
      </template>
    </Column>

    <Column :header="L('Margin Cost')">
      <template #body="{ data }"> 
        <span v-if="data.stakePool.details">{{ data.stakePool.details.marginCost }}% </span>
      </template>
    </Column>
  </DataTable>
</template>

<script setup>
import { onMounted } from 'vue'
import { formatLovelace } from '@/utils/utils'
import { useStakePools } from '@/composables/useStakePools'
import CopyToClipboardLink from '@/components/common/CopyToClipboardLink'
import router from '@/router'

const props = defineProps({
  address: String,
})

const { stakePools, count, loading, getStakePools } = useStakePools()

const onClick = ({ data }) => {
  router.push({ name: 'StakePoolDetails', params: { ...router.currentRoute.value.params, poolId: data.stakePool.poolId } })
}

onMounted(() => getStakePools(props.address, 1, 10))

const onPage = (event) => getStakePools(props.address, event.page + 1, event.rows)
</script>

<style></style>
