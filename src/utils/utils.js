import { TransactionTypes, TransactionTypesById, EventTypes } from '@/utils/constants'

export const formatWithPrecision = (amount, precision = 6) => {
  if (amount === 0) return 0
  const absAmount = Math.abs(amount) + ''

  //Validate precision is valid (Is Number and > 0)
  const precisionNbr = Number(precision);
  if (!Number.isInteger(precisionNbr) || precisionNbr < 0) precision = 6

  let formatted = ''
  if (absAmount >= 1000000) formatted = Math.abs(absAmount.slice(0, absAmount.length - precision)) + '.' + absAmount.slice(absAmount.length - precision)
  else formatted = '0.' + absAmount.padStart(precision, '0')

  // parseFloat will remove trailing 0s after the period
  return (
    Number.parseFloat(formatted).toLocaleString('en', {
      minimumFractionDigits: 0,
      maximumFractionDigits: precision,
    })
  )
}

export const formatLovelace = (amount) => {
  return formatWithPrecision(amount, 6) + 'ADA'  
}

export const formatPercent = (value) => {
  return value * 100.0;
}

export const negate = (value) => {
  return (value * -1);
}

export const formatTransaction = (transaction) => {
  var utc = new Date(transaction.timeUTC)
  const transactionDate = utc.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) + ' ' + utc.toLocaleTimeString('en-US')

  return {
    ...transaction,
    transactionDate,
  }
}

export const calculatePercentageToEpoch = (slotNumber, slotsInAnEpoch) => {
  if (slotNumber == null || slotNumber < 0) return 0
  return parseFloat(((slotNumber / slotsInAnEpoch) * 100).toFixed(2))
}

export const getTransactionDetails = (transaction) => {
  /* if we have a payment transaction, check if there are any events associated with it */
  if (transaction.type === TransactionTypes.PAYMENT.id) {
    /* stake delegation takes precedence over stake registration */
    if (transaction.events.some((e) => e.eventType === EventTypes.STAKE_DELEGATION.id)) {
      return EventTypes.STAKE_DELEGATION.label
    } else if (transaction.events.some((e) => e.eventType === EventTypes.STAKE_REGISTRATION.id)) {
      return EventTypes.STAKE_REGISTRATION.label
    } else if (transaction.events.some((e) => e.eventType === EventTypes.STAKE_DEREGISTRATION.id)) {
      return EventTypes.STAKE_DEREGISTRATION.label
    } else if (transaction.events.some((e) => e.eventType === EventTypes.STAKE_POOL_REGISTRATION.id)) {
      return EventTypes.STAKE_POOL_REGISTRATION.label
    } else if (transaction.events.some((e) => e.eventType === EventTypes.STAKE_POOL_UPDATE.id)) {
      return EventTypes.STAKE_POOL_UPDATE.label
    } else if (transaction.events.some((e) => e.eventType === EventTypes.STAKE_POOL_RETIRE.id)) {
      return EventTypes.STAKE_POOL_RETIRE.label
    } else if (transaction.events.some((e) => e.eventType === EventTypes.ASSET_MINTING.id)) {
      return EventTypes.ASSET_MINTING.label
    } else if (transaction.events.some((e) => e.eventType === EventTypes.ASSET_BURNING.id)) {
      return EventTypes.ASSET_BURNING.label
    } else if (transaction.events.some((e) => e.eventType === EventTypes.VOTING_REGISTRATION.id)) {
      return EventTypes.VOTING_REGISTRATION.label
    }
  }
  return TransactionTypesById[transaction.type]
}
