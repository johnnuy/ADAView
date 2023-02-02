<template>
  <div class="card">
    <DataView :value="assets" :layout="layout" :paginator="true" :rows="12" :totalRecords="count" :lazy="true"
      paginator-template="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      :rows-per-page-options="pageSizing" :current-page-report-template="L('{first} to {last} of {totalRecords}')"
      @page="onPage($event)">
      <template #header>
        <div class="grid grid-nogutter">
          <div class="col-12" style="text-align: right">
            <DataViewLayoutOptions v-model="layout" />
          </div>
        </div>
      </template>
      <template #list="slotProps">
        <AssetsGalleryListItem :asset="slotProps.data" />
      </template>
      <template #grid="slotProps">
        <AssetsGalleryGridItem :asset="slotProps.data" />
      </template>
    </DataView>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useFetchAssets } from '@/composables/useFetchAssets'
import AssetsGalleryGridItem from '@/components/wallet/assets/AssetsGalleryGridItem.vue'
import AssetsGalleryListItem from '@/components/wallet/assets/AssetsGalleryListItem.vue'

const props = defineProps({
  address: String,
})

const perPage = ref(12)
const pageSizing = ref([12, 24, 36])
const { assets, count, loading, error, getAssets } = useFetchAssets()
const layout = ref('grid')

onMounted(() => getAssets(props.address, 1, perPage.value))
const onPage = (event) => getAssets(props.address, event.page + 1, event.rows)
</script>
