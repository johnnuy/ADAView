<template>
  <Button class="p-button-text mb-3" :label="L('Back')" icon="pi pi-angle-left" @click="onClose" />

  <ProgressBar v-if="loading" mode="indeterminate" style="height: 0.5em" />
  <Error v-if="error" :error="error" />
  <div v-if="transaction">
    <Accordion :active-index="activeIndex" :multiple="true">
      <AccordionTab :header="L('Transaction Details')">
        <div class="container">
          <template v-for="field of transactionFields" :key="field.key">
            <div class="text-500">
              <i v-if="field.helpText" v-tooltip.bottom="L(field.helpText)" class="pi pi-fw pi-question-circle ml-auto text-700"></i>
              {{ L(field.key) }}
              :
            </div>
            <div>
              <component :is="field.getComponent(transaction)"></component>
            </div>
          </template>
        </div>
      </AccordionTab>

      <AccordionTab v-for="assetReceived in transaction.assetsReceived" :key="assetReceived.id" :header="L('Asset Received')">
        <div class="container">
          <div class="text-500">{{ L('Asset Name') }}:</div>
          <div>
            {{ assetReceived.asset.name }}
          </div>

          <div class="text-500">{{ L('Policy') }}:</div>
          <div>
            {{ assetReceived.asset.policy }}
          </div>

          <div class="text-500">{{ L('Fingerprint') }}:</div>
          <div>
            <CopyToClipboardLink :text="assetReceived.asset.fingerprint" :copy-text="assetReceived.asset.fingerprint" break />
          </div>

          <div class="text-500">{{ L('Quantity') }}:</div>
          <div>
            {{ assetReceived.quantity }}
          </div>
        </div>
      </AccordionTab>

      <AccordionTab v-for="assetsSent in transaction.assetsSent" :key="assetsSent.id" :header="L('Asset Sent')">
        <div class="container">
          <div class="text-500">{{ L('Asset Name') }}:</div>
          <div>
            {{ assetsSent.asset.name }}
          </div>

          <div class="text-500">{{ L('Policy') }}:</div>
          <div>
            {{ assetsSent.asset.policy }}
          </div>

          <div class="text-500">{{ L('Fingerprint') }}:</div>
          <div>
            <CopyToClipboardLink :text="assetsSent.asset.fingerprint" :copy-text="assetsSent.asset.fingerprint" break />
          </div>

          <div class="text-500">{{ L('Quantity') }}:</div>
          <div>
            {{ assetsSent.quantity }}
          </div>
        </div>
      </AccordionTab>

      <AccordionTab v-if="transaction.messages && transaction.messages.length > 0" :header="L('Messages')">
        <div class="container">
          <template v-for="(message, index) in transaction.messages" :key="`message-${index}`">
            <div class="text-500">{{ index }}:</div>
            <div>
              <span>{{ message }}</span>
            </div>
          </template>
        </div>
      </AccordionTab>

      <AccordionTab v-if="transaction.externalSources?.length > 0 || transaction.externalDestinations?.length > 0" :header="L('External Wallets')">
        <TransactionWallets :transaction="transaction" />
      </AccordionTab>

      <AccordionTab v-for="event in transaction.events" :key="event.eventType" :header="EventTypesById[event.eventType]">
        <VotingRegistrationEvent v-if="event.eventType === EventTypes.VOTING_REGISTRATION.id" :event="event" />
        <StakeRegistrationEvent v-if="event.eventType === EventTypes.STAKE_REGISTRATION.id" :event="event" />
        <StakeDelegationEvent v-if="event.eventType === EventTypes.STAKE_DELEGATION.id" :event="event" />
        <StakeDeregistrationEvent v-if="event.eventType === EventTypes.STAKE_DEREGISTRATION.id" :event="event" />
        <StakePoolRegistrationEvent v-if="event.eventType === EventTypes.STAKE_POOL_REGISTRATION.id" :event="event" />
        <StakePoolRetiringEvent v-if="event.eventType === EventTypes.STAKE_POOL_RETIRE.id" :event="event" />
        <StakePoolUpdateEvent v-if="event.eventType === EventTypes.STAKE_POOL_UPDATE.id" :event="event" />
        <AssetMintingEvent v-if="event.eventType === EventTypes.ASSET_MINTING.id" :event="event" />
        <AssetBurningEvent v-if="event.eventType === EventTypes.ASSET_BURNING.id" :event="event" />
        <RewardsWithdrawalEvent v-if="event.eventType === EventTypes.REWARDS_WITHDRAWAL.id" :event="event" />
      </AccordionTab>
    </Accordion>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { EventTypesById, TransactionTypes, EventTypes } from '@/utils/constants'
import { useFetchTransaction } from '@/composables/useFetchTransactions'
import Error from '@/components/common/Error'
import TransactionWallets from '@/components/wallet/transactions/TransactionWallets'
import VotingRegistrationEvent from '@/components/wallet/transactions/events/VotingRegistrationEvent'
import StakeRegistrationEvent from '@/components/wallet/transactions/events/StakeRegistrationEvent'
import StakeDelegationEvent from '@/components/wallet/transactions/events/StakeDelegationEvent'
import StakeDeregistrationEvent from '@/components/wallet/transactions/events/StakeDeregistrationEvent'
import StakePoolRegistrationEvent from '@/components/wallet/transactions/events/StakePoolRegistrationEvent'
import StakePoolRetiringEvent from '@/components/wallet/transactions/events/StakePoolRetiringEvent'
import StakePoolUpdateEvent from '@/components/wallet/transactions/events/StakePoolUpdateEvent'
import AssetMintingEvent from '@/components/wallet/transactions/events/AssetMintingEvent'
import AssetBurningEvent from '@/components/wallet/transactions/events/AssetBurningEvent'
import RewardsWithdrawalEvent from '@/components/wallet/transactions/events/RewardsWithdrawalEvent'

import router from '@/router'

const props = defineProps({
  network: String,
  address: String,
  transactionId: String,
  transaction: String,
})

const { transaction, loading, error, getTransaction } = useFetchTransaction()

const loadTransaction = () => {
  // try to load from the transaction prop first, if it isn't set then we fetch the transaction from the api
  if (props.transaction) {
    transaction.value = JSON.parse(props.transaction)
  } else {
    getTransaction(props.address, props.transactionId)
  }
}

onMounted(() => loadTransaction())
watch([() => props.address, () => props.transactionId, () => props.transaction], () => loadTransaction())

const activeIndex = ref([0])
const onClose = () => router.push({ name: 'WalletHome', params: { network: props.network, address: props.address } })

const transactionFields = computed(() => {
  if (!transaction.value) return []
  return Object.entries(TransactionTypes).find(([k, v]) => v.id === transaction.value.type)[1].fields
})
</script>

<style>
.container {
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 10px;
  row-gap: 5px;
}
.address-list {
  margin: 0;
  padding-left: 20px;
}
.break {
  word-break: break-all;
}
</style>
