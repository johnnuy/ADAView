<template>
  <div class="container">
    <div class="text-500">{{ L('DRep Id') }}:</div>
    <div>
      <CopyToClipboardLink :text="event.drep.drepId" :copy-text="event.drep.drepId" break />
    </div>
    
  </div>
</template>

<script setup>

defineProps({
  event: Object,
})
</script>

<style></style>
