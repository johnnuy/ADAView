<template>
  <Dropdown v-model="selectedNetwork" :options="networksList" option-label="name" option-value="code" placeholder="Select a network" class="w-full" @change="onNetworkChange" />
</template>

<script setup>
import { ref } from 'vue'

import { useSettings, networks } from '@/composables/useSettings'

const { network, setNetwork } = useSettings()

const onNetworkChange = (e) => setNetwork(e.value)
const selectedNetwork = ref(network)

const networksList = ref(
  Object.entries(networks).map((kv) => ({
    name: kv[1],
    code: kv[1],
  })),
)
</script>

<style>
.language-item {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
