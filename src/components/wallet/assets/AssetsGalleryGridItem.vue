<template>
  <div class="col-12 sm:col-12 md:col-6 lg:col-4 xl:col-3">
    <div class="asset-grid-item card">
      <div class="asset-grid-item-content">
        <img class="token-img" :src="assetImg" :alt="assetName" />
        <div class="asset-name">{{ assetName }}</div>
        <div class="asset-fingerprint">
          <i class="pi pi-info-circle" v-tooltip="'Asset Fingerprint'"></i>
          <CopyToClipboardLink :text="assetFingerprint" :copy-text="assetFingerprint" break />
        </div>
      </div>
      <div style="text-align: right">
        <Button icon="pi pi-eye" @click="toggle" aria-haspopup="true" aria-controls="overlay_panel"></Button>
      </div>
    </div>
  </div>
  <OverlayPanel ref="assetOverlayPanel" appendTo="body" :showCloseIcon="true" id="overlay_panel">
    <div>
      <span class="text-500">{{ L('Fingerprint') }}}: </span>
      <span class="font-medium">
        <CopyToClipboardLink :text="assetFingerprint" :copy-text="assetFingerprint" break />
      </span>
    </div>
    <div>
      <span class="text-500">{{ L('Policy') }}: </span>
      <span class="font-medium">
        {{ assetPolicy }}
      </span>
    </div>
    <div>
      <span class="text-500">{{ L('Quantity') }}: </span>
      <span class="font-medium">
        {{ assetQuantity }}
      </span>
    </div>
    <div>
      <span class="text-500">{{ L('Supply') }}: </span>
      <span class="font-medium">
        {{ assetSupply }}
      </span>
    </div>
    <div>
      <span class="text-500">{{ L('Metadata') }}: </span>
      <TreeTable :value="assetMetadataTree">
        <Column field="name" header="Name" :expander="true"></Column>       
        <Column field="value" header="Value"></Column>
      </TreeTable>
    </div>
  </OverlayPanel>
</template>

<script setup>
import { ref, computed } from 'vue'
import { parseAssetUrl, parseAssetMetadata } from '@/utils/assets'

const props = defineProps({
  asset: Object,
})

const assetOverlayPanel = ref()
const expandedKeys = ref({});

const toggle = (event) => {
  assetOverlayPanel.value.toggle(event)
}
const formatCurrency = (value) => {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}
const onProductSelect = (event) => {
  assetOverlayPanel.value.hide()
}

const asset = computed(() => props.asset)
const assetProperties = computed(() => asset.value?.asset)
const assetName = computed(() => assetProperties.value?.name)
const assetFingerprint = computed(() => assetProperties.value?.fingerprint)
const assetPolicy = computed(() => assetProperties.value?.policy)
const assetQuantity = computed(() => asset.value?.quantity || null)
const assetSupply = computed(() => assetProperties.value?.supply)
const assetImg = computed(() => parseAssetUrl(asset.value))
const assetMetadata = computed(() => assetProperties.value.metadata)
const assetMetadataTree = computed(() => parseAssetMetadata(assetMetadata.value))


</script>



<style lang="scss" scoped>
.asset-name {
  word-break: break-all;
  font-size: 1.5rem;
  font-weight: 700;
}

.asset-fingerprint {
  margin: 0 0 1rem 0;
}

.asset-fingerprint i {
  margin-right: 0.5rem;
}

::v-deep(.asset-grid-item) {
  margin: 0.5rem;
  border: 1px solid var(--surface-border);

  .asset-grid-item-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  img {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    margin: 2rem 0;
  }

  .asset-grid-item-content {
    text-align: center;
  }
}

.token-img {
  width: 100%;
  height: 25rem;
}
</style>