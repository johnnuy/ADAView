import { formatLovelace, getTransactionDetails } from '@/utils/utils'
import { useLexicon } from '@/composables/useLexicon'
const { L } = useLexicon()

class TransactionField {
  /**
   * @param {string} key - i18n key
   * @param {function(Transaction): string} valueFor - callback to get the field's value
   */
  constructor(key, valueFor) {
    this.key = key
    this.valueFor = valueFor
  }

  /**
   * Looks through the transaction types and determines whether or not
   * the field should be displayed
   * @param {Transaction} transaction
   * @returns {boolean}
   */
  display(transaction) {
    return Object.entries(TransactionTypes)
      .find(([k, v]) => v.id === transaction.type)[1]
      .contains(this)
  }
}

class TransactionType {
  /**
   *
   * @param {Object} param - transaction type configuration
   * @param {number} param.id - transaction type code
   * @param {string} param.label - i18n key
   * @param {TransactionField[]} param.fields - transactions fields to display for this transaction
   */
  constructor({ id, label, fields = [] }) {
    this.id = id
    this.label = label
    this.fields = fields
  }

  contains(field) {
    return this.fields.includes(field)
  }
}

const TransactionFields = {
  TYPE: new TransactionField('Type', (t) => L(getTransactionDetails(t))), // type
  DATE: new TransactionField('Date', (t) => t.transactionDate), // date
  BLOCK: new TransactionField('Block', (t) => t.block), // block
  EPOCH: new TransactionField('Epoch', (t) => t.epoch), //epoch
  HASH: new TransactionField('Hash', (t) => t.hash), // hash
  FEE: new TransactionField('Fee', (t) => formatLovelace(t.fee)), // fee
  DEPOSIT: new TransactionField('Deposit', (t) => formatLovelace(t.adaValue)), // adaValue
  REFUND: new TransactionField('Refund', (t) => formatLovelace(t.adaValue)), // adaValue
  FUNDS_IN: new TransactionField('Funds In', (t) => formatLovelace(t.adaValue)), // adaValue
  FUNDS_OUT: new TransactionField('Funds Out', (t) => formatLovelace(t.adaValue)), // adaValue
  LEADER_REWARDS: new TransactionField('Leader Rewards', (t) => formatLovelace(t.adaValue)), // adaValue
  DELEGATOR_REWARDS: new TransactionField('Delegator Rewards', (t) => formatLovelace(t.adaValue)), // adaValue
  VOTING_REWARDS: new TransactionField('Reward Value', (t) => formatLovelace(t.adaValue)), // adaValue
  REWARD_SOURCE: new TransactionField('Reward Source', (t) => t.rewardSource), //rewardSource
  BALANCE: new TransactionField('Balance', (t) => formatLovelace(t.adaValue)), //adaBalance
}

const TransactionTypes = {
  RECEIPT: new TransactionType({
    id: 1,
    label: 'Receipt',
    fields: [TransactionFields.TYPE, TransactionFields.DATE, TransactionFields.BLOCK, TransactionFields.EPOCH, TransactionFields.HASH, TransactionFields.FUNDS_IN, TransactionFields.BALANCE],
  }),
  PAYMENT: new TransactionType({
    id: 2,
    label: 'Payment',
    fields: [TransactionFields.TYPE, TransactionFields.DATE, TransactionFields.BLOCK, TransactionFields.EPOCH, TransactionFields.HASH, TransactionFields.FUNDS_OUT, TransactionFields.BALANCE],
  }),
  LEADER_REWARDS: new TransactionType({
    id: 3,
    label: 'Leader Rewards',
    fields: [TransactionFields.TYPE, TransactionFields.DATE, TransactionFields.EPOCH, TransactionFields.LEADER_REWARDS, TransactionFields.BALANCE],
  }),
  DELEGATOR_REWARDS: new TransactionType({
    id: 4,
    label: 'Delegator Rewards',
    fields: [TransactionFields.TYPE, TransactionFields.DATE, TransactionFields.EPOCH, TransactionFields.DELEGATOR_REWARDS, TransactionFields.BALANCE],
  }),
  VOTING_REWARDS: new TransactionType({
    id: 5,
    label: 'Voting Rewards',
    fields: [TransactionFields.TYPE, TransactionFields.DATE, TransactionFields.EPOCH, TransactionFields.VOTING_REWARDS, TransactionFields.BALANCE],
  }),
  REFUND: new TransactionType({
    id: 6,
    label: 'Refund',
    fields: [TransactionFields.TYPE, TransactionFields.DATE, TransactionFields.BLOCK, TransactionFields.EPOCH, TransactionFields.REFUND, TransactionFields.BALANCE],
  }),
  OTHER: new TransactionType({
    id: 7,
    label: 'Other',
    fields: [TransactionFields.TYPE, TransactionFields.DATE, TransactionFields.BLOCK, TransactionFields.EPOCH, TransactionFields.HASH, TransactionFields.BALANCE],
  }),
}

const EventTypes = {
  STAKE_REGISTRATION: { id: 1, label: 'Stake Registration' },
  STAKE_DELEGATION: { id: 2, label: 'Stake Delegation' },
  STAKE_DEREGISTRATION: { id: 3, label: 'Stake Deregistration' },
  STAKE_POOL_REGISTRATION: { id: 4, label: 'Stake Pool Registration' },
  STAKE_POOL_UPDATE: { id: 5, label: 'Stake Pool Update' },
  STAKE_POOL_RETIRE: { id: 6, label: 'Stake Pool Retire' },
  ASSET_MINTING: { id: 7, label: 'Asset Minting' },
  ASSET_BURNING: { id: 8, label: 'Asset Burning' },
  VOTING_REGISTRATION: { id: 9, label: 'Voting Registration' },
  REWARDS_WITHDRAWAL: { id: 10, label: 'Reward Withdrawal' },
}

// object that lets you get a label quickly given that you have the id
// e.g. TransactionTypesById[1]
let TransactionTypesById = Object.keys(TransactionTypes).reduce((acc, curr) => {
  acc[TransactionTypes[curr].id] = TransactionTypes[curr].label
  return acc
}, {})

// object that lets you get a label quickly given that you have the id
// e.g. EventTypesById[1]
let EventTypesById = Object.keys(EventTypes).reduce((acc, curr) => {
  acc[EventTypes[curr].id] = EventTypes[curr].label
  return acc
}, {})

export { TransactionFields, TransactionTypes, TransactionTypesById, EventTypes, EventTypesById }
