<template>
  <div class="col-12 md:col-6 lg:col-4">
    <div class="asset-grid-item card">
      <div class="asset-grid-item-content">
        <img src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" :alt="asset.asset.name" />
        <div class="asset-name">{{ asset.asset.name }}</div>
        <div class="asset-fingerprint">
          <i class="pi pi-info-circle" v-tooltip="'Asset Fingerprint'"></i><CopyToClipboardLink :text="asset.asset.fingerprint" :copy-text="asset.fingerprint" break />
        </div>
      </div>
      <div style="text-align: right">
        <Button icon="pi pi-eye" @click="toggle" aria-haspopup="true" aria-controls="overlay_panel"></Button>
      </div>
    </div>
  </div>
  <OverlayPanel ref="assetOverlayPanel" appendTo="body" :showCloseIcon="true" id="overlay_panel" style="width: 450px" :breakpoints="{ '960px': '75vw' }">
    <div>
      <span class="text-500">Fingerprint: </span>
      <span class="font-medium">
        <CopyToClipboardLink :text="asset.asset.fingerprint" :copy-text="asset.fingerprint" break />
      </span>
    </div>
    <div>
      <span class="text-500">Policy: </span>
      <span class="font-medium">
        {{ asset.asset.policy }}
      </span>
    </div>
  </OverlayPanel>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
  asset: Object,
})

const assetOverlayPanel = ref()

const toggle = (event) => {
  assetOverlayPanel.value.toggle(event)
}
const formatCurrency = (value) => {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}
const onProductSelect = (event) => {
  assetOverlayPanel.value.hide()
}
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
</style>