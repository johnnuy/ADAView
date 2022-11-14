<template>
  <div class="layout-menu-container">
    <ul v-if="searches" class="layout-menu">
      <li class="layout-menuitem-category" role="none">
        <div class="layout-menuitem-root-text flex flex-row align-items-center">
          {{ L('Saved Searches') }}
          <i class="pi pi-fw pi-trash ml-auto address-action" aria:haspopup="true" aria-controls="clearSearchPanel" @click="(e) => onClearSavedSearchesClicked(e)"></i>
        </div>
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
        <div class="layout-menuitem-root-text flex flex-row align-items-center">
          {{ L('Recent Searches') }}
          <i class="pi pi-fw pi-trash ml-auto address-action" aria:haspopup="true" aria-controls="clearSearchPanel" @click="(e) => onClearRecentSearchesClicked(e)"></i>
        </div>

        <ul v-if="searches">
          <li v-for="search in searches" :key="search" role="none">
            <span class="flex flex-row align-items-center">
              <router-link v-ripple :to="{ name: 'WalletHome', params: { address: search.address, network: search.network } }" class="p-ripple" exact role="menuitem">
                <i class="pi pi-fw pi-wallet"></i>
                <span class="wallet-address">&hellip; {{ search.address.slice(-8) }} ({{ search.network }})</span>
              </router-link>
              <i class="pi pi-fw pi-plus ml-auto address-action" aria:haspopup="true" aria-controls="searchNamePanel" @click="(e) => onSaveSearchClicked(e, search)"></i>
            </span>
          </li>
        </ul>
      </li>
    </ul>
  </div>

  <SearchNamePanel ref="searchNamePanelRef" :search="selectedSearch" :mode="searchNamePanelMode" @on-ok="handleSearchOk" @on-delete="handleSearchDelete" @on-close="handleSearchClose" />
  <ClearAllSearchesPanel ref="clearAllSearchesPanelRef" :type="clearSearchType" @on-ok="handleClearOk" @on-close="handleClearClose" />
</template>

<script setup>
import { ref, computed } from 'vue'
import { useSearchHistory } from '@/composables/useSearchHistory'
import SearchNamePanel from '@/components/search/SearchNamePanel'
import ClearAllSearchesPanel from '@/components/search/ClearAllSearchesPanel'

const { searches, savedSearches, saveSearch, removeSearch, clearRecentSearches, clearSavedSearches } = useSearchHistory()

const searchNamePanelRef = ref()
const searchNamePanelMode = ref()
const selectedSearch = ref()
const sortedSavedSearches = computed(() => savedSearches.value.slice().sort((s1, s2) => s1.name.localeCompare(s2.name)))

const clearAllSearchesPanelRef = ref()
const clearSearchType = ref()

const onClearSavedSearchesClicked = (event) => {
  clearSearchType.value = 'saved'
  clearAllSearchesPanelRef.value.toggle(event)
}

const onClearRecentSearchesClicked = (event) => {
  clearSearchType.value = 'recent'
  clearAllSearchesPanelRef.value.toggle(event)
}

const handleClearOk = (event) => {
  switch (clearSearchType.value) {
    case 'recent':
      clearRecentSearches()
      break
    case 'saved':
      clearSavedSearches()
      break
  }

  clearAllSearchesPanelRef.value.toggle(event)
}

const handleClearClose = (event) => {
  clearAllSearchesPanelRef.value.toggle(event)
}

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

const handleSearchOk = (event, name) => {
  saveSearch({ address: selectedSearch.value.address, name, network: selectedSearch.value.network })
  selectedSearch.value = null
  searchNamePanelRef.value.toggle(event)
}

const handleSearchDelete = (event) => {
  removeSearch({ address: selectedSearch.value.address })
  selectedSearch.value = null
  searchNamePanelRef.value.toggle(event)
}

const handleSearchClose = (event) => {
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
