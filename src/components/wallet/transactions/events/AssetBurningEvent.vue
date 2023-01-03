<template>
  <div class="container">
    <div class="text-500">{{ L('Asset Name') }}:</div>
    <div>
      {{ event.burning.asset.name }}
    </div>

    <div class="text-500">{{ L('Policy') }}:</div>
    <div>
      {{ event.burning.asset.policy }}
    </div>

    <div class="text-500">{{ L('Fingerprint') }}:</div>
    <div>
      <CopyToClipboardLink :text="event.burning.asset.fingerprint" :copy-text="event.burning.asset.fingerprint" break />
    </div>

    <div class="text-500">{{ L('Quantity Burned') }}:</div>
    <div>
      {{ negate(event.burning.quantity) }}
    </div>

    <div class="text-500">{{ L('Remaining Supply') }}:</div>
    <div>
      {{ event.burning.asset.supply }}
    </div>
  </div>
</template>

<script setup>
import AssetDetails from './AssetDetails'
import CopyToClipboardLink from '../../../common/CopyToClipboardLink.vue'
import { negate } from '@/utils/utils'

defineProps({
  event: Object,
})
</script>

<style></style>
