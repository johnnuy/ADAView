import { ref } from 'vue'

const searches = ref([])

// if no network set, default to Mainnet
const savedSearches = ref(JSON.parse(localStorage.getItem('searches'))?.map((s) => ({ ...s, network: s.network || 'Mainnet' })) || [])

const addSearch = ({ address, name, network }) => {
  if (!searches.value.find((s) => s.address === address) && !savedSearches.value.find((s) => s.address === address)) {
    searches.value.unshift({ address, name, network })
  }
}
const saveSearch = ({ address, name, network }) => {
  // add to saved searches and save to localstorage
  const existing = savedSearches.value.find((s) => s.address === address)
  if (existing) {
    // address already saved, update the name
    existing.name = name
  } else {
    // new item
    savedSearches.value.unshift({ address, name, network })
  }
  localStorage.setItem('searches', JSON.stringify(savedSearches.value))

  // either way, remove from recent searches
  searches.value.splice(
    searches.value.findIndex((s) => s.address === address),
    1,
  )
}

const removeSearch = ({ address }) => {
  // remove from saved searches and save to localstorage
  savedSearches.value.splice(
    savedSearches.value.findIndex((s) => s.address === address),
    1,
  )
  localStorage.setItem('searches', JSON.stringify(savedSearches.value))
}

const clearRecentSearches = () => {
  searches.value = []
}

const clearSavedSearches = () => {
  savedSearches.value = []
  localStorage.removeItem('searches')
}

export const useSearchHistory = () => {
  return {
    searches,
    savedSearches,
    addSearch,
    saveSearch,
    removeSearch,
    clearRecentSearches,
    clearSavedSearches,
  }
}
