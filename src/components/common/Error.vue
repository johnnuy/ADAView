<template>
  <Message severity="error">
    <span class="block error-message">{{ props.error.message || L('Something went wrong...') }}</span>

    <div v-if="props.error.address || props.error.currentBlock" class="error-details">
      <div class="mb-1">
        <span class="font-bold">Address: </span>
        <span class=""><WalletAddress :address="props.error.address" /> </span>
      </div>

      <div class="mb-1">
        <span class="font-bold">Block: </span>
        <span>{{ props.error.currentBlock.blockNumber }} </span>
      </div>

      <div class="mb-1">
        <span class="font-bold">Epoch: </span>
        <span>{{ props.error.currentBlock.epochNumber }}</span>
      </div>
    </div>
  </Message>
</template>

<script setup>
import WalletAddress from './WalletAddress'
const props = defineProps({ error: Object })
</script>

<style>
.error-message {
  font-size: 1.3rem;
}

.error-details {
  margin-top: 1rem;
}
</style>
