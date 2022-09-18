<template>
  <div class="container">
    <div class="text-500">{{ L('Deposit') }}:</div>
    <div>
      {{ formatLovelace(event.depositAda) }}
    </div>

    <div class="text-500">{{ L('Stake Address') }}:</div>
    <div class="break">
      <CopyToClipboardLink :text="event.stakeAddress" :copy-text="event.stakeAddress" break />
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
