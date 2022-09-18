<template>
  <CopyToClipboardLink class="wallet-address" :text="props.address" :copy-text="props.address" break />
</template>

<script setup>
import CopyToClipboardLink from './CopyToClipboardLink.vue'
const props = defineProps({
  address: String,
})
</script>
