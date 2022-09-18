<template>
  <div class="text-500">{{ L('Pool Id') }}:</div>
  <div>
    <CopyToClipboardLink :text="id" :copy-text="id" break />
  </div>

  <div class="text-500">{{ L('Pledge') }}:</div>
  <div>
    {{ formatLovelace(details.pledgeAda) }}
  </div>

  <div class="text-500">{{ L('Fixed Cost') }}:</div>
  <div>
    {{ formatLovelace(details.fixedCostAda) }}
  </div>

  <div class="text-500">{{ L('Margin Cost') }}:</div>
  <div>
    {{ formatLovelace(details.marginCostAda) }}
  </div>

  <div class="text-500">{{ L('Name') }}:</div>
  <div>
    {{ details.name }}
  </div>

  <div class="text-500">{{ L('Ticker') }}:</div>
  <div>
    {{ details.ticker }}
  </div>

  <div class="text-500">{{ L('Homepage') }}:</div>
  <div class="break">
    <a :href="details.homepage">{{ details.homepage }}</a>
  </div>

  <div class="text-500">{{ L('Description') }}:</div>
  <div>
    {{ details.description }}
  </div>

  <div class="text-500">{{ L('Rewards Address') }}:</div>
  <div class="break">
    <CopyToClipboardLink :text="details.rewardsAddress" :copy-text="details.rewardsAddress" break />
  </div>

  <div class="text-500">{{ L('Metadata URL') }}:</div>
  <div class="break">
    <a :href="details.metadataUrl">{{ details.metadataUrl }}</a>
  </div>
</template>

<script setup>
import CopyToClipboardLink from '@/components/common/CopyToClipboardLink.vue'
import { formatLovelace } from '@/utils/utils'

defineProps({
  id: String,
  details: Object,
})
</script>

<style></style>

<style></style>
