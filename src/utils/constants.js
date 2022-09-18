const TransactionTypes = {
  RECEIPT: { id: 1, label: 'Receipt' },
  PAYMENT: { id: 2, label: 'Payment' },
  LEADER_REWARDS: { id: 3, label: 'Leader Rewards' },
  DELEGATOR_REWARDS: { id: 4, label: 'Delegator Rewards' },
  VOTING_REWARDS: { id: 5, label: 'Voting Rewards' },
  REFUND: { id: 6, label: 'Refund' },
  OTHER: { id: 7, label: 'Other' },
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

export { TransactionTypes, TransactionTypesById, EventTypes, EventTypesById }
