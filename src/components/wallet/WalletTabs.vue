<template>
  <TabView>
    <TabPanel :header="L('Transactions')">
      <TransactionsList :address="address" />
    </TabPanel>    
    <TabPanel :header="L('Addresses')">
      <AddressesList :address="address" />
    </TabPanel>
    <TabPanel v-if="wallet.assetHoldingsCount > 0" :header="L('Asset Holdings')">     
      <AssetsGallery :address="address" />
    </TabPanel>
    <TabPanel v-if="wallet.delegationsCount > 0" :header="L('Stake Delegations')">
      <StakingList :address="address" />
    </TabPanel>
    <TabPanel v-if="wallet.ownedStakepoolsCount > 0" :header="L('Stake Pools')">
      <StakePoolsList :address="address" />
    </TabPanel>    
  </TabView>
</template>

<script setup>
import TransactionsList from '@/components/wallet/transactions/TransactionsList'
import StakingList from '@/components/wallet/StakingList'
import AssetsList from '@/components/wallet/assets/AssetsList'
import AssetsGallery from '@/components/wallet/assets/AssetsGallery'
import AddressesList from '@/components/wallet/AddressesList'
import StakePoolsList from '@/components/wallet/stakePools/StakePoolsList'
import { useFetchWallet } from '@/composables/useFetchWallet'
const { wallet } = useFetchWallet()

defineProps({
  address: {
    type: String,
    default: '',
  },
})
</script>

<style></style>
