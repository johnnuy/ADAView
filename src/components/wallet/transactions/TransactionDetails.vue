<template>
  <Button class="p-button-text mb-3" :label="L('Back')" icon="pi pi-angle-left" @click="onClose" />

  <ProgressBar v-if="loading" mode="indeterminate" style="height: 0.5em" />
  <Error v-if="error" :error="error" />
  <div v-if="transaction">
    <Accordion :active-index="activeIndex" :multiple="true">
      <AccordionTab :header="L('Transaction Details')">
        <div class="container">
          <template v-if="TransactionFields.TYPE.display(transaction)">
            <div class="text-500">{{ L(TransactionFields.TYPE.key) }}:</div>
            <div>
              <span>{{ TransactionFields.TYPE.valueFor(transaction) }}</span>
            </div>
          </template>

          <template v-if="TransactionFields.DATE.display(transaction)">
            <div class="text-500">{{ L(TransactionFields.DATE.key) }}:</div>
            <div>
              {{ TransactionFields.DATE.valueFor(transaction) }}
            </div>
          </template>

          <template v-if="TransactionFields.BLOCK.display(transaction)">
            <div class="text-500">{{ L(TransactionFields.BLOCK.key) }}:</div>
            <div>
              {{ TransactionFields.BLOCK.valueFor(transaction) }}
            </div>
          </template>

          <template v-if="TransactionFields.EPOCH.display(transaction)">
            <div class="text-500">{{ L(TransactionFields.EPOCH.key) }}:</div>
            <div>
              {{ TransactionFields.EPOCH.valueFor(transaction) }}
            </div>
          </template>

          <template v-if="TransactionFields.HASH.display(transaction)">
            <div class="text-500">{{ L(TransactionFields.HASH.key) }}:</div>
            <div class="break">
              <span><CopyToClipboardLink :text="`${TransactionFields.HASH.valueFor(transaction)}`" :copy-text="`${TransactionFields.HASH.valueFor(transaction)}`" break /></span>
            </div>
          </template>

          <template v-if="TransactionFields.FEE.display(transaction)">
            <div class="text-500">{{ L(TransactionFields.FEE.key) }}:</div>
            <div>
              {{ TransactionFields.FEE.valueFor(transaction) }}
            </div>
          </template>

          <template v-if="TransactionFields.DEPOSIT.display(transaction)">
            <div class="text-500">{{ L(TransactionFields.DEPOSIT.key) }}:</div>
            <div>
              {{ TransactionFields.DEPOSIT.valueFor(transaction) }}
            </div>
          </template>

          <template v-if="TransactionFields.REFUND.display(transaction)">
            <div class="text-500">{{ L(TransactionFields.REFUND.key) }}:</div>
            <div>
              {{ TransactionFields.REFUND.valueFor(transaction) }}
            </div>
          </template>

          <template v-if="TransactionFields.FUNDS_IN.display(transaction)">
            <div class="text-500">{{ L(TransactionFields.FUNDS_IN.key) }}:</div>
            <div>
              {{ TransactionFields.FUNDS_IN.valueFor(transaction) }}
            </div>
          </template>

          <template v-if="TransactionFields.FUNDS_OUT.display(transaction)">
            <div class="text-500">{{ L(TransactionFields.FUNDS_OUT.key) }}:</div>
            <div>
              {{ TransactionFields.FUNDS_OUT.valueFor(transaction) }}
            </div>
          </template>

          <template v-if="TransactionFields.LEADER_REWARDS.display(transaction)">
            <div class="text-500">{{ L(TransactionFields.LEADER_REWARDS.key) }}:</div>
            <div>
              {{ TransactionFields.LEADER_REWARDS.valueFor(transaction) }}
            </div>
          </template>

          <template v-if="TransactionFields.DELEGATOR_REWARDS.display(transaction)">
            <div class="text-500">{{ L(TransactionFields.DELEGATOR_REWARDS.key) }}:</div>
            <div>
              {{ TransactionFields.DELEGATOR_REWARDS.valueFor(transaction) }}
            </div>
          </template>

          <template v-if="TransactionFields.VOTING_REWARDS.display(transaction)">
            <div class="text-500">{{ L(TransactionFields.VOTING_REWARDS.key) }}:</div>
            <div>
              {{ TransactionFields.VOTING_REWARDS.valueFor(transaction) }}
            </div>
          </template>

          <template v-if="TransactionFields.REWARD_SOURCE.display(transaction)">
            <div v-if="transaction.rewardSource" class="text-500">{{ L(TransactionFields.REWARD_SOURCE.key) }}:</div>
            <div v-if="transaction.rewardSource">
              {{ TransactionFields.REWARD_SOURCE.ValueFor(transaction) }}
            </div>
          </template>

          <template v-if="TransactionFields.BALANCE.display(transaction)">
            <div class="text-500">{{ L(TransactionFields.BALANCE.key) }}:</div>
            <div>
              {{ TransactionFields.BALANCE.valueFor(transaction) }}
            </div>
          </template>
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
import { ref, onMounted, watch } from 'vue'
import { formatLovelace } from '@/utils/utils'
import { EventTypesById, TransactionFields, TransactionTypes, EventTypes } from '@/utils/constants'
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
