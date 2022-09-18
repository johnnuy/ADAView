<template>
  <div class="container">
    <div class="text-500">{{ L('Retiring Epoch') }}:</div>
    <div>
      {{ event.retiringEpoch }}
    </div>

    <StakePoolDetails :id="event.stakePool.poolId" :details="event.stakePool.details" />
  </div>
</template>

<script setup>
import StakePoolDetails from './StakePoolDetails'

defineProps({
  event: Object,
})
</script>

<style></style>
