<template>
  <Button class="p-button-text mb-3" :label="L('Back')" icon="pi pi-angle-left" @click="onClose" />

  <ProgressBar v-if="loading" mode="indeterminate" style="height: 0.5em" />
  <Error v-if="error" :error="error" />
  <div v-if="transaction">
    <Accordion :active-index="activeIndex" :multiple="true">
      <AccordionTab :header="L('Transaction Details')">
        <div class="container">
          <div class="text-500">{{ L('Type') }}:</div>
          <div>
            <span>{{ L(getTransactionDetails(transaction)) }}</span>
          </div>

          <div class="text-500">{{ L('Date') }}:</div>
          <div>
            {{ transaction.transactionDate }}
          </div>

          <template v-if="transaction.type !== TransactionTypes.VOTING_REWARDS.id">
            <div class="text-500">{{ L('Block') }}:</div>
            <div>
              {{ transaction.block }}
            </div>
          </template>

          <div class="text-500">{{ L('Epoch') }}:</div>
          <div>
            {{ transaction.epoch }}
          </div>

          <template v-if="transaction.type !== TransactionTypes.VOTING_REWARDS.id">
            <div class="text-500">{{ L('Hash') }}:</div>
            <div class="break">
              <span><CopyToClipboardLink :text="transaction.hash" :copy-text="transaction.hash" break /></span>
            </div>
          </template>

          <template v-if="transaction.type !== TransactionTypes.VOTING_REWARDS.id">
            <div class="text-500">{{ L('Fee') }}:</div>
            <div>
              {{ formatLovelace(transaction.fee) }}
            </div>
          </template>

          <template v-if="transaction.deposit > 0">
            <div class="text-500">{{ L('Deposit') }}:</div>
            <div>
              {{ formatLovelace(transaction.deposit) }}
            </div>
          </template>

          <template v-if="transaction.deposit < 0">
            <div class="text-500">{{ L('Refund') }}:</div>
            <div>
              {{ formatLovelace(transaction.deposit) }}
            </div>
          </template>

          <div v-if="transaction.type === TransactionTypes.RECEIPT.id" class="text-500">{{ L('Funds In') }}:</div>
          <div v-if="transaction.type === TransactionTypes.PAYMENT.id" class="text-500">{{ L('Funds Out') }}:</div>
          <div v-if="transaction.type === TransactionTypes.LEADER_REWARDS.id" class="text-500">{{ L('Leader Rewards') }}:</div>
          <div v-if="transaction.type === TransactionTypes.DELEGATOR_REWARDS.id" class="text-500">{{ L('Leader Rewards') }}:</div>
          <div v-if="transaction.type === TransactionTypes.VOTING_REWARDS.id" class="text-500">{{ L('Reward Value') }}:</div>
          <div
            v-if="
              [TransactionTypes.VOTING_REWARDS.id, TransactionTypes.DELEGATOR_REWARDS.id, TransactionTypes.LEADER_REWARDS.id, TransactionTypes.PAYMENT.id, TransactionTypes.RECEIPT.id].includes(
                transaction.type,
              )
            "
          >
            {{ formatLovelace(transaction.adaValue) }}
          </div>

          <div v-if="transaction.rewardSource" class="text-500">{{ L('Reward Source') }}:</div>
          <div v-if="transaction.rewardSource">{{ transaction.rewardSource }}</div>

          <div class="text-500">{{ L('Balance') }}:</div>
          <div>
            {{ formatLovelace(transaction.adaBalance) }}
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
      <AccordionTab v-if="transaction.externalSources.length > 0 || transaction.externalDestinations.length > 0" :header="L('External Wallets')">
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
import { formatLovelace, getTransactionDetails } from '@/utils/utils'
import { EventTypesById, TransactionTypes, EventTypes } from '@/utils/constants'
import { useFetchTransaction } from '@/composables/useFetchTransactions'
import CopyToClipboardLink from '@/components/common/CopyToClipboardLink'
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
})

const { transaction, loading, error, getTransaction } = useFetchTransaction()
onMounted(() => getTransaction(props.address, props.transactionId))
watch([() => props.address, () => props.transactionId], () => getTransaction(props.address, props.transactionId))

const transactionFields = computed(() => {
  if (transaction) {
    return Object.entries(TransactionTypes)
      .find((t) => t[1].id === transaction.value.type)[1]
      .fields.map()
  }
  return []
})

const activeIndex = ref([0])
const onClose = () => router.push({ name: 'WalletHome', params: { network: props.network, address: props.address } })
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
