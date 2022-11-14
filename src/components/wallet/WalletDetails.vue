<template>
  <div>
    <div v-if="loading">
      <div class="card flex-grow-1">
        <ProgressBar v-if="loading" mode="indeterminate" style="height: 0.5em" />
      </div>
    </div>

    <ErrorComp v-if="error" :error="error" />

    <div v-if="wallet">
      <div class="card h-full">
        <Button class="p-button-text" :label="L('Refresh')" icon="pi pi-refresh" @click="() => fetchWallet(props.address)" />
      </div>
      <div class="grid">
        <div class="col-12" :class="isStakingWallet ? 'md:col-3' : 'md:col-6'">
          <div class="card h-full">
            <div class="flex flex-column justify-content-center h-full">
              <div class="flex flex-column align-items-center">
                <img :src="wallet.avatar.image" class="avatar" />
                <span class="block text-500 font-medium">{{ wallet.avatar.name }} </span>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12" :class="isStakingWallet ? 'md:col-3' : 'md:col-6'">
          <div class="card h-full">
            <div class="flex flex-column justify-content-between h-full">
              <div class="mb-3">
                <span class="block text-500 font-medium mb-3">{{ L('Balance') }}</span>
                <div class="text-900 font-medium text-xl">{{ formatLovelace(wallet.balance) }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- only show this is the wallet supports staking, that is, if wallet.stake is defined -->
        <div v-if="isStakingWallet" class="col-12 md:col-6">
          <div class="card h-full my-0">
            <div v-if="wallet.currentDelegation?.stakePool">
              <div>
                <span class="block text-500 font-medium mb-3">{{ L('Delegation') }}</span>
              </div>
              <StakePoolCard :stake-pool="wallet.currentDelegation.stakePool" class="my-0" />
            </div>

            <div v-else class="flex flex-column justify-content-between mb-3">
              <div class="mb-3">
                <span class="block text-500 font-medium mb-3">{{ L('Delegation') }}</span>
                <div class="text-900 font-medium text-xl">{{ L('No Active Delegations') }}</div>
              </div>
            </div>
            <hr />
            <div v-if="wallet.currentDelegation?.epochActive">
              <span class="text-500">{{ L('Since Epoch') }}: </span>
              <span class="font-medium">{{ wallet.currentDelegation?.epochActive }} </span>
            </div>
            <div>
              <span class="text-500">{{ L('Staking Address') }}: </span>
              <span class="font-medium">
                <WalletAddress :address="wallet.stake.address" />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="card mt-2">
          <router-view v-slot="{ Component }">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, watch, computed } from 'vue'
import { useFetchWallet } from '@/composables/useFetchWallet'
import router from '@/router'
import WalletAddress from '@/components/common/WalletAddress'
import { formatLovelace } from '@/utils/utils'
import ErrorComp from '@/components/common/Error'
import { useLexicon } from '@/composables/useLexicon'
import StakePoolCard from '@/components/wallet/stakePools/StakePoolCard'
import { useSearchHistory } from '@/composables/useSearchHistory'

const { L } = useLexicon()

const props = defineProps({
  address: String,
  network: String,
})

const { wallet, loading, error, fetchWallet } = useFetchWallet()
const { addSearch } = useSearchHistory()

onMounted(() => fetchWallet(props.address))
watch([() => props.address, () => props.network], () => fetchWallet(props.address))

// bugfix for: https://github.com/johnnuy/ADAView/issues/9
watch(wallet, () => {
  if (!wallet.value) return

  const stakingAddress = wallet?.value?.stake?.address
  if (stakingAddress && router.currentRoute.value.params.address !== stakingAddress) {
    // if the user searched for a wallet by something other than it's staking address
    // update the route's parameters to use that staking address (provided there is one)
    router.replace({
      name: router.currentRoute.value.name,
      params: { address: stakingAddress, network: router.currentRoute.value.params.network },
    })
  }

  // finally, add the wallet using the appropriate address
  addSearch({ address: stakingAddress || props.address, name: wallet.value.avatar?.name, network: props.network })
})

const isStakingWallet = computed(() => !!wallet.value.stake)
</script>

<style lang="scss" scoped>
pre {
  overflow-x: auto;
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  word-wrap: break-word;
}

.no-wrap {
  white-space: nowrap;
}

.transaction-item-content {
  border: 1px solid var(--surface-d);
  border-radius: 3px;
  margin: 0.3rem;
  text-align: center;
  padding: 2rem 0;
}
</style>

<style>
.p-tabview-ink-bar {
  display: none !important;
}

.avatar {
  width: 100px;
  height: 100px;
  margin: 0 0 1rem 0;
}

.wallet-menu {
  background-color: var(--surface-card);
  border: none;
}

/* .container {
  display: grid;
  grid-template-columns: auto;
  column-gap: 10px;
  row-gap: 5px;
} */
</style>
