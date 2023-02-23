<template>
  <div class="col-12">
    <div class="asset-list-item">
      <img :src="assetImg" alt="111" />
      <div class="asset-list-detail">
        <div class="asset-name underline" @click="viewAsset">{{ assetName }}</div>       
        <div>
          <span class="text-500">{{ L('Fingerprint') }}: </span>
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
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { parseAssetUrl } from '@/utils/assets'
import router from '@/router'

const props = defineProps({
  asset: Object,
})

const asset = computed(() => props.asset)
const assetProperties = computed(() => props.asset?.asset)
const assetName = computed(() => assetProperties.value?.name)
const assetFingerprint = computed(() => assetProperties.value?.fingerprint)
const assetPolicy = computed(() => assetProperties.value?.policy)
const assetQuantity = computed(() => asset.value?.quantity || null)
const assetSupply = computed(() => assetProperties.value?.supply)
const assetImg = computed(() => parseAssetUrl(assetProperties.value))
const assetMetadata = computed(() => assetProperties.value?.metadata)

const viewAsset = () => {
  router.push({ name: 'AssetDetails', params: { ...router.currentRoute.value.params, assetId: assetFingerprint.value, asset: JSON.stringify(props.asset) } })
};
</script>

<style lang="scss" scoped>
.asset-name {
  cursor: pointer;
  color: var(--primary-color);
  padding-bottom: 5px;
  word-break: break-all;
  font-size: 1.5rem;
  font-weight: 700;
}

::v-deep(.asset-list-item) {
  display: flex;
  align-items: center;
  padding: 1rem;
  width: 100%;

  img {
    width: 50px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    margin-right: 2rem;
  }

  .p-button {
    margin-bottom: 0.5rem;
  }
}


@media screen and (max-width: 576px) {
  .asset-list-item {
    flex-direction: column;
    align-items: center;

    img {
      margin: 2rem 0;
    }
  }
}
</style>