<template>
  <div>
    <Tree :value="nodes" selection-mode="single" :expanded-keys="expandedKeys" @node-select="onNodeSelect">
      <template #wallet="slotProps">
        <div class="wallet-node">{{ slotProps.node.label }}</div>
      </template>
      <template #address="slotProps">
        <CopyToClipboardLink :text="slotProps.node.label" :copy-text="slotProps.node.label" break />
      </template>
    </Tree>
  </div>
</template>

<script setup>
import CopyToClipboardLink from '@/components/common/CopyToClipboardLink'
import { ref, computed } from '@vue/reactivity'
import { useLexicon } from '@/composables/useLexicon'

const props = defineProps({
  transaction: Object,
})

const { L } = useLexicon()

// toggle expansion state
const expandedKeys = ref({})
const onNodeSelect = (node) => (expandedKeys.value[node.key] = !expandedKeys.value[node.key])

const nodes = computed(() => {
  var nodes = []
  if (props.transaction.externalSources.length > 0) {
    var sendingWallets = {
      key: '0',
      label: L('Source Wallets'),
      icon: 'pi pi-fw pi-sign-in',
      children: [],
    }
    props.transaction.externalSources.forEach((externalSource, sourceIndex) => {
      var sendingWallet = {
        key: '0-' + sourceIndex,
        label: externalSource.id,
        icon: 'pi pi-fw pi-wallet',
        type: 'wallet',
        children: [],
      }
      externalSource.addrs.forEach((paymentAddress, paymentIndex) => {
        var address = {
          key: '0-' + sourceIndex + '-' + paymentIndex,
          label: paymentAddress,
          icon: 'pi pi-fw pi-key',
          type: 'address',
        }
        sendingWallet.children.push(address)
      })
      sendingWallets.children.push(sendingWallet)
    })
    nodes.push(sendingWallets)
  }
  if (props.transaction.externalDestinations.length > 0) {
    var receivingWallets = {
      key: '1',
      label: L('Destination Wallets'),
      icon: 'pi pi-fw pi-sign-in',
      children: [],
    }
    props.transaction.externalDestinations.forEach((externalDestination, destinationIndex) => {
      var receivingWallet = {
        key: '1-' + destinationIndex,
        label: externalDestination.id,
        icon: 'pi pi-fw pi-wallet',
        type: 'wallet',
        children: [],
      }
      externalDestination.addrs.forEach((receiptAddress, receiptIndex) => {
        var address = {
          key: '1-' + destinationIndex + '-' + receiptIndex,
          label: receiptAddress,
          icon: 'pi pi-fw pi-wallet pi-key',
          type: 'address',
        }
        receivingWallet.children.push(address)
      })
      receivingWallets.children.push(receivingWallet)
    })
    nodes.push(receivingWallets)
  }
  return nodes
})
</script>

<style>
.p-tree {
  border: 0px;
  padding: 0%;
}

.wallet-node {
  word-break: break-all;
}
</style>
