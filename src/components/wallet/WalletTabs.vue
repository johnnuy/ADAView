<template>
  <TabView>
    <TabPanel :header="L('Transactions')">
      <TransactionsList :address="wallet.__identifier__" />
    </TabPanel>
    <TabPanel :header="L('Addresses')">
      <AddressesList :address="wallet.__identifier__" />
    </TabPanel>
    <TabPanel v-if="wallet.assetHoldingsCount > 0" :header="L('Asset Holdings')">
      <AssetsList :address="wallet.__identifier__" />
    </TabPanel>
    <TabPanel v-if="wallet.delegationsCount > 0" :header="L('Stake Delegations')">
      <StakingList :address="wallet.__identifier__" />
    </TabPanel>
    <TabPanel v-if="wallet.ownedStakepoolsCount > 0" :header="L('Stake Pools')">
      <StakePoolsList :address="wallet.__identifier__" />
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
</script>

<style></style>
