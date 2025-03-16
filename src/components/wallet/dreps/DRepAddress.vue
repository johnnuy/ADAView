<template>
  <CopyToClipboardLink class="drep-address" :text="props.address" :copy-text="props.address" break />
</template>

<script setup>
import CopyToClipboardLink from '../../common/CopyToClipboardLink.vue'
const props = defineProps({
  address: String,
})
</script>
