<template>
  <div class="container">
    <div class="text-500">{{ L('Refunded ADA') }}:</div>
    <div>
      {{ formatLovelace(event.depositRefundAda) }}
    </div>

    <div class="text-500">{{ L('Stake Address') }}:</div>
    <div class="break">
      <CopyToClipboardLink :text="event.stakeAddress" :copy-text="event.stakeAddress" break />
    </div>

    <div class="text-500">{{ L('Previous Pool Id') }}:</div>
    <div>
      <CopyToClipboardLink :text="event.previousStakePool.poolId" :copy-text="event.previousStakePool.poolId" break />
    </div>

    <div class="text-500">{{ L('Previous Pool Ticker') }}:</div>
    <div>
      {{ event.previousStakePool.details.ticker }}
    </div>

    <div class="text-500">{{ L('Epoch Active') }}:</div>
    <div>
      {{ event.activeEpoch }}
    </div>
  </div>
</template>

<script setup>
import CopyToClipboardLink from '@/components/common/CopyToClipboardLink.vue'
import { formatLovelace } from '@/utils/utils'

defineProps({
  event: Object,
})
</script>

<style></style>
