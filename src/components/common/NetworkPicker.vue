<template>
  <Dropdown v-model="selectedNetwork" :options="networks" option-label="name" option-value="name" placeholder="Select a network" class="w-full" @change="onNetworkChange" />
</template>

<script setup>
import { ref, watch } from 'vue'

import { useSettings } from '@/composables/useSettings'

const { networks, network, setNetworkByName } = useSettings()

const onNetworkChange = (e) => setNetworkByName(e.value)
const selectedNetwork = ref(network.value.name)

watch(network, () => {
  selectedNetwork.value = network.value.name
})
</script>

<style>
.language-item {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
