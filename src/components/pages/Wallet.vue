<template>
  <div>
    <WalletSearch :address="address" />
    <router-view></router-view>
  </div>
</template>

<script setup>
import WalletSearch from '@/components/wallet/WalletSearch'

defineProps({
  address: {
    type: String,
    default: '',
  },
  network: {
    type: String,
    default: '',
  },
})

</script>
