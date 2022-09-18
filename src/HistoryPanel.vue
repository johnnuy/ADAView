<template>
  <div class="layout-menu-container">
    <ul v-if="searches" class="layout-menu">
      <li class="layout-menuitem-category" role="none">
        <div class="layout-menuitem-root-text">{{ L('Saved Searches') }}</div>
        <ul v-if="savedSearches">
          <li v-for="search in sortedSavedSearches" :key="search" class="active-menuitem" role="none">
            <span class="flex flex-row align-items-center">
              <router-link v-ripple :to="{ name: 'WalletHome', params: { address: search.address, network: search.network } }" class="p-ripple w-full" exact role="menuitem">
                <i class="pi pi-fw pi-wallet"></i>
                <span class="wallet-address">{{ search.name + ` (${search.network})` }}</span>
              </router-link>
              <i class="pi pi-fw pi-pencil ml-auto address-action" @click="(e) => onEditSearchClicked(e, search)"></i>
            </span>
          </li>
        </ul>
      </li>

      <li class="layout-menuitem-category" role="none">
        <div class="layout-menuitem-root-text">{{ L('Recent Searches') }}</div>
        <ul v-if="searches">
          <li v-for="search in searches" :key="search" role="none">
            <span class="flex flex-row align-items-center">
              <router-link v-ripple :to="{ name: 'WalletHome', params: { address: search.address, network: search.network } }" class="p-ripple" exact role="menuitem">
                <i class="pi pi-fw pi-wallet"></i>
                <span class="wallet-address">{{ search.address }}</span>
              </router-link>
              <i class="pi pi-fw pi-plus ml-auto address-action" aria:haspopup="true" aria-controls="searchNamePanel" @click="(e) => onSaveSearchClicked(e, search)"></i>
            </span>
          </li>
        </ul>
      </li>
    </ul>
  </div>

  <SearchNamePanel ref="searchNamePanelRef" :search="selectedSearch" :mode="searchNamePanelMode" @on-ok="handleOk" @on-delete="handleDelete" @on-close="handleClose" />
</template>

<script setup>
import { ref, computed } from 'vue'
import { useSearchHistory } from '@/composables/useSearchHistory'
import SearchNamePanel from '@/components/search/SearchNamePanel'

const { searches, savedSearches, saveSearch, removeSearch } = useSearchHistory()

const searchNamePanelRef = ref()
const searchNamePanelMode = ref()
const selectedSearch = ref()
const sortedSavedSearches = computed(() => savedSearches.value.slice().sort((s1, s2) => s1.name.localeCompare(s2.name)))

const onSaveSearchClicked = (event, search) => {
  searchNamePanelMode.value = 'add'
  selectedSearch.value = search
  searchNamePanelRef.value.toggle(event)
}

const onEditSearchClicked = (event, search) => {
  searchNamePanelMode.value = 'edit'
  selectedSearch.value = search
  searchNamePanelRef.value.toggle(event)
}

const handleOk = (event, name) => {
  saveSearch({ address: selectedSearch.value.address, name, network: selectedSearch.value.network })
  selectedSearch.value = null
  searchNamePanelRef.value.toggle(event)
}

const handleDelete = (event) => {
  removeSearch({ address: selectedSearch.value.address })
  selectedSearch.value = null
  searchNamePanelRef.value.toggle(event)
}

const handleClose = (event) => {
  selectedSearch.value = null
  searchNamePanelRef.value.toggle(event)
}
</script>

<style scoped>
.wallet-address {
  word-break: break-word;
}

.address-action {
  cursor: pointer;
}
</style>
