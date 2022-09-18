<template>
  <a v-tooltip.top="L('Click to copy')" :class="props.break ? 'break' : ''" @click="copyToClipboard(props.copyText)">{{ props.text }}</a>
</template>

<script setup>
const props = defineProps({
  text: String,
  copyText: String,
  break: Boolean,
})
const copyToClipboard = (address) => navigator.clipboard.writeText(address)
</script>

<style scoped>
a {
  cursor: pointer;
}

.break {
  word-break: break-all;
}
</style>
