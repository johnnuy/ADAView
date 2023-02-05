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
        <Button icon="pi pi-eye" @click="viewAsset"></Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { parseAssetUrl } from '@/utils/assets'
import router from '@/router'

const props = defineProps({
  asset: Object,
})

const assetProperties = computed(() => props.asset?.asset)
const assetName = computed(() => assetProperties.value?.name)
const assetImg = computed(() => parseAssetUrl(props.asset))
const assetFingerprint = computed(() => assetProperties.value?.fingerprint)

const viewAsset = () => {
  router.push({ name: 'AssetDetails', params: { ...router.currentRoute.value.params, assetId: assetFingerprint.value, asset: JSON.stringify(props.asset) } })
};
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