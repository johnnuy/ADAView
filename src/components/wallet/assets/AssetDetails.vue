<template>
    <Button class="p-button-text mb-3" :label="L('Back')" icon="pi pi-angle-left" @click="onClose" />
    <ProgressBar v-if="loading" mode="indeterminate" style="height: 0.5em" />
    <Error v-if="error" :error="error" />
    <div v-if="asset">
        <Accordion :active-index="activeIndex" :multiple="true">
            <AccordionTab :header="L('Asset Details')">
                <div class="container">
                    <span class="text-500">{{ L('Name') }}: </span>
                    <span class="font-medium">
                        {{ assetName }}
                    </span>
                    <span class="text-500">{{ L('Fingerprint') }}: </span>
                    <span class="font-medium">
                        <CopyToClipboardLink :text="assetFingerprint" :copy-text="assetFingerprint" break />
                    </span>
                    <span class="text-500">{{ L('Policy') }}: </span>
                    <span class="font-medium">
                        {{ assetPolicy }}
                    </span>
                    <span class="text-500">{{ L('Quantity') }}: </span>
                    <span class="font-medium">
                        {{ assetQuantity }}
                    </span>
                    <span class="text-500">{{ L('Supply') }}: </span>
                    <span class="font-medium">
                        {{ assetSupply }}
                    </span>
                </div>
            </AccordionTab>
            <AccordionTab :header="L('Metadata')">
                <TreeTable :value="assetMetadataTree" class="p-treetable-sm" style="margin-bottom: 2rem;"
                    :scrollable="true" scrollHeight="400px">
                    <Column field="name" header="Name" :expander="true"></Column>
                    <Column field="value" header="Value"></Column>
                </TreeTable>
            </AccordionTab>
        </Accordion>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { parseAssetUrl, parseAssetMetadata } from '@/utils/assets'
import { useFetchAsset } from '@/composables/useFetchAssets'
import Error from '@/components/common/Error'
import router from '@/router'

const props = defineProps({
    network: String,
    address: String,
    assetId: String,
    asset: String,
})

const { asset, loading, error, getAsset } = useFetchAsset()

const assetProperties = computed(() => asset.value?.asset)
const assetName = computed(() => assetProperties.value?.name)
const assetFingerprint = computed(() => assetProperties.value?.fingerprint)
const assetPolicy = computed(() => assetProperties.value?.policy)
const assetQuantity = computed(() => asset.value?.quantity || null)
const assetSupply = computed(() => assetProperties.value?.supply)
const assetImg = computed(() => parseAssetUrl(asset.value))
const assetMetadata = computed(() => assetProperties.value.metadata)
const assetMetadataTree = computed(() => parseAssetMetadata(assetMetadata.value))

const activeIndex = ref([0, 1])

const loadAsset = () => {
    // try to load from the assets prop first, if it isn't set then we fetch the asset from the api
    if (props.asset) {
        asset.value = JSON.parse(props.asset)
    } else {
        getAsset(props.address, props.assetId)
    }
}

onMounted(() => loadAsset())
watch([() => props.address, () => props.assetId, () => props.asset], () => loadAsset())

const onClose = () => router.push({ name: 'WalletHome', params: { network: props.network, address: props.address } })


</script>