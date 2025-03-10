<template>
  <div class="container">    

    <div class="text-500">{{ L('Amount') }}:</div>
    <div class="break">
      {{ formatLovelace(event.lovelace) }}
    </div>
  </div>
</template>

<script setup>
import { formatLovelace } from '@/utils/utils'

defineProps({
  event: Object,
})
</script>

<style></style>
