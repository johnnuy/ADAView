<template>
  <div class="container">
    <div class="text-500">{{ L('Committee Id') }}:</div>
    <div class="break">
      <CopyToClipboardLink :text="event.committeeId" :copy-text="event.committeeId" break />
    </div>

    <div class="text-500">{{ L('Governance Action Id') }}:</div>
    <div class="break">
      <CopyToClipboardLink :text="event.govActionId" :copy-text="event.commgovActionIditteeId" break />
    </div>

    <div class="text-500">{{ L('Vote') }}:</div>
    <div>
      {{ event.vote }}
    </div>
  </div>
</template>

<script setup>
import CopyToClipboardLink from '@/components/common/CopyToClipboardLink.vue'

defineProps({
  event: Object,
})
</script>

<style></style>
