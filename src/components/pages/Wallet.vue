<template>
  <div>
    <WalletSearch :address="address" />
    <router-view></router-view>
  </div>
</template>

<script setup>
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

import WalletSearch from '@/components/wallet/WalletSearch'
</script>
