<template>
  <div class="container">
    <div class="text-500">{{ L('Quantity') }}:</div>
    <div>
      {{ details.quantity }}
    </div>

    <div class="text-500">{{ L('Supply') }}:</div>
    <div>
      {{ details.asset.supply }}
    </div>

    <AssetCard :asset="details.asset" />
  </div>
</template>

<script setup>
  import CopyToClipboardLink from '@/components/common/CopyToClipboardLink.vue'
  import AssetCard from '../../assets/AssetCard.vue';

  defineProps({
    details: Object,
  })
</script>

<style></style>
