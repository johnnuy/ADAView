<template>
  <div class="container">
    <AssetDetails :details="event.burning" />
  </div>
</template>

<script setup>
import AssetDetails from './AssetDetails'

defineProps({
  event: Object,
})
</script>

<style></style>
