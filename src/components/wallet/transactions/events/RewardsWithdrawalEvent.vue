<template>
  <div class="container">    

    <div class="text-500">{{ L('Rewards Address') }}:</div>
    <div>
      <CopyToClipboardLink :text="event.address" :copy-text="event.address" break />
    </div>

    <div class="text-500">{{ L('Amount') }}:</div>
    <div class="break">
      {{ formatLovelace(event.lovelace) }}
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
