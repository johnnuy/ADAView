<template>
  <div class="container">
    <div class="text-500">{{ L('Quantity') }}:</div>
    <div>
      {{ details.quantity }}
    </div>

    <div class="text-500">{{ L('Fingerprint') }}:</div>
    <div>
      <CopyToClipboardLink :text="details.asset.fingerprint" :copy-text="details.asset.fingerprint" break />
    </div>

    <div class="text-500">{{ L('Policy') }}:</div>
    <div>
      <CopyToClipboardLink :text="details.asset.policy" :copy-text="details.asset.policy" break />
    </div>

    <div class="text-500">{{ L('Name') }}:</div>
    <div>
      {{ details.asset.name }}
    </div>

    <div class="text-500">{{ L('Supply') }}:</div>
    <div>
      {{ details.asset.supply }}
    </div>

    <div class="text-500">{{ L('Metadata') }}:</div>
    <div class="break">
      {{ details.asset.metadata }}
    </div>
  </div>
</template>

<script setup>
import CopyToClipboardLink from '@/components/common/CopyToClipboardLink.vue'

defineProps({
  details: Object,
})
</script>

<style></style>
