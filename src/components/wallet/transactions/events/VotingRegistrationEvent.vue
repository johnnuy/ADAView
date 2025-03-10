<template>
  <div class="container">
    <div class="text-500">{{ L('Voting Key') }}:</div>
    <div class="break">
      <ul>
        <li v-for="(votingKey, index) in votingKeys" :key="index">
          {{ votingKey.key }} [{{ votingKey.weight }}]
        </li>
      </ul>
    </div>

    <div class="text-500">{{ L('Rewards Address') }}:</div>
    <div>
      <CopyToClipboardLink :text="event.rewardAddress" :copy-text="event.rewardAddress" break />
    </div>
  </div>
</template>

<script setup>
import CopyToClipboardLink from '@/components/common/CopyToClipboardLink.vue'

defineProps({
  event: Object,
})
</script>

<style></style>
