const mainnetApiRoot = import.meta.env.VITE_MAINNET_API_URL
const testnetApiRoot = import.meta.env.VITE_TESTNET_API_URL

import { ref } from 'vue'

export const networks = Object.freeze({
  MAIN: 'Mainnet',
  TEST: 'Testnet',
})

const network = ref(networks.MAIN)
const setNetwork = (newNetwork) => (network.value = newNetwork)
const isMainNetwork = () => network.value === networks.MAIN
const getApiUrl = () => (isMainNetwork() ? mainnetApiRoot : testnetApiRoot)

const langs = Object.freeze([
  { code: 'en', name: 'English', icon: '/images/en.png' },
  { code: 'fr', name: 'Français', icon: '/images/fr.png' },
])

const lang = ref(langs.find((l) => l.code === (localStorage.getItem('lang') || 'en')))

const setLang = (newLang) => {
  lang.value = langs.find((l) => l.code === newLang)
  localStorage.setItem('lang', lang.value.code)
}

export const useSettings = () => {
  return {
    isMainNetwork,
    setNetwork,
    network,
    lang,
    setLang,
    langs: Object.keys(langs).map((key) => langs[key]),
    getApiUrl,
  }
}
