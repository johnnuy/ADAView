<template>
  <Button class="p-button-text mb-3" :label="L('Back')" icon="pi pi-angle-left" @click="onClose" />

  <ProgressBar v-if="loading" mode="indeterminate" style="height: 0.5em" />
  <Error v-if="error" :error="error" />
  <StakePoolCard v-if="stakePool" :stake-pool="stakePool.stakePool" class="mb-5" />
</template>

<script setup>
import { onMounted, watch } from 'vue'
import { useFetchStakePool } from '@/composables/useFetchStakePools'
import StakePoolCard from './StakePoolCard.vue'
import router from '@/router'
import Error from '@/components/common/Error'

const props = defineProps({
  network: String,
  address: String,
  poolId: String,
})

const { stakePool, loading, error, getStakePool } = useFetchStakePool()
onMounted(() => getStakePool(props.address, props.poolId))
watch([() => props.address, () => props.poolId], () => getStakePool(props.address, props.poolId))

const onClose = () => router.push({ name: 'WalletHome', params: { network: props.network, address: props.address } })
</script>
