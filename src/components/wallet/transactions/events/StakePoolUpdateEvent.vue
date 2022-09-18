<template>
  <div class="container">
    <div class="text-500">{{ L('Epoch Active') }}:</div>
    <div>
      {{ event.activeEpoch }}
    </div>

    <div class="mt-3 span-2">{{ L('Current Details') }}:</div>
    <StakePoolDetails :id="event.currentStakePool.poolId" :details="event.currentStakePool.details" />

    <div class="mt-3 span-2">{{ L('Previous Details') }}:</div>
    <StakePoolDetails :id="event.previousStakePool.poolId" :details="event.previousStakePool.details" />
  </div>
</template>

<script setup>
import StakePoolDetails from './StakePoolDetails'

defineProps({
  event: Object,
})
</script>

<style>
.span-2 {
  grid-column: 1 / span 2;
}
</style>
