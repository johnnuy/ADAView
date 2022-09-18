<template>
  <div class="container">
    <div class="text-500">{{ L('Deposit') }}:</div>
    <div>
      {{ formatLovelace(event.depositAda) }}
    </div>

    <div class="text-500">{{ L('Epoch Active') }}:</div>
    <div>
      {{ event.activeEpoch }}
    </div>

    <StakePoolDetails :id="event.stakePool.poolId" :details="event.stakePool.details" />
  </div>
</template>

<script setup>
import { formatLovelace } from '@/utils/utils'
import StakePoolDetails from './StakePoolDetails'

defineProps({
  event: Object,
})
</script>

<style></style>
