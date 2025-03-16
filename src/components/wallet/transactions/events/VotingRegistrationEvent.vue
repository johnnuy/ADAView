<template>
  <div class="container">
    <div class="text-500">{{ L('Voting Key') }}:</div>
    <div class="break">      
      <p v-for="(votingKey, index) in event.votingKeys" :key="index">
        {{ votingKey.k }} [{{ votingKey.w }}%]
      </p>
    </div>

    <div class="text-500">{{ L('Stake Address') }}:</div>
    <div>
      <CopyToClipboardLink :text="event.stakeAddress" :copy-text="event.stakeAddress" break />
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
