<template>
  <div class="container">
    <div class="text-500">{{ L('Stake Address') }}:</div>
    <div class="break">
      <CopyToClipboardLink :text="event.stakeAddress" :copy-text="event.stakeAddress" break />
    </div>

    <template v-if="event.previousDRep">
      <div class="text-500">{{ L('Previous DRep Id') }}:</div>
      <div>
        <CopyToClipboardLink :text="event.previousDRep.drepId" :copy-text="event.previousDRep.drepId" break />
      </div>
    </template>

    <div class="text-500">{{ L('DRep Id') }}:</div>
    <div>
      <CopyToClipboardLink :text="event.currentDRep.drepId" :copy-text="event.currentDRep.drepId" break />
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
