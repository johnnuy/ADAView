<template>
  <div class="container">
    <div class="text-500">{{ L('Asset Name') }}:</div>
    <div>
      {{ event.minting.asset.name }}
    </div>

    <div class="text-500">{{ L('Policy') }}:</div>
    <div>
      {{ event.minting.asset.policy }}
    </div>

    <div class="text-500">{{ L('Fingerprint') }}:</div>
    <div>
      <CopyToClipboardLink :text="event.minting.asset.fingerprint" :copy-text="event.minting.asset.fingerprint" break />
    </div>

    <div class="text-500">{{ L('Quantity Minted') }}:</div>
    <div>
      {{ event.minting.quantity }}
    </div>

    <div class="text-500">{{ L('Total Supply') }}:</div>
    <div>
      {{ event.minting.asset.supply }}
    </div>
  </div>
  <!--<AssetCard :asset="event.minting.asset" />-->
</template>

<script setup>
  import AssetCard from '../../assets/AssetCard.vue';
  import CopyToClipboardLink from '../../../common/CopyToClipboardLink.vue'

  defineProps({
    event: Object,
  })
</script>

<style></style>
