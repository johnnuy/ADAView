<template>
  <div class="card">
    <h5>{{ L('Wallet Address') }}</h5>
    <form class="formgroup-inline flex flex-row" @submit.prevent="onFetchWallet()">
      <div class="field flex-grow-1">
        <InputText v-model="addr" class="w-full" type="text" />
      </div>
      <Button :label="L('Search')" type="submit" :disabled="!addr" />
    </form>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import router from '@/router'
import { useSettings } from '@/composables/useSettings'

const props = defineProps({
  address: String,
})

const { network } = useSettings()

watch(
  () => props.address,
  () => (addr.value = props.address),
)

const addr = ref(props.address)
const onFetchWallet = () => {
  addr.value = addr.value.trim()
  router.push({ name: 'WalletHome', params: { address: addr.value, network: network.value.name } })
}
</script>

<style></style>
