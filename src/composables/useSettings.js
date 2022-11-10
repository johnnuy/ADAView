const mainnetApiRoot = import.meta.env.VITE_MAINNET_API_URL
const testnetApiRoot = import.meta.env.VITE_TESTNET_API_URL
const previewApiRoot = import.meta.env.VITE_PREVIEW_API_URL
const preprodApiRoot = import.meta.env.VITE_PREPROD_API_URL

import { ref } from 'vue'

export const networks = Object.freeze({
  MAIN: 'Mainnet',
  TEST: 'Testnet',
  PREV: 'Preview',
  PREP: 'Preprod'
})

const network = ref(networks.MAIN)
const setNetwork = (newNetwork) => (network.value = newNetwork)
const getNetwork = () => network.value
const isMainNetwork = () => network.value === networks.MAIN

const getApiUrl = () => {
  if (network.value === networks.TEST) {
    return testnetApiRoot;
  }
  else if (network.value === networks.PREP) {
    return preprodApiRoot;
  }
  else if (network.value == networks.PREV) {
    return previewApiRoot;
  }
  else {
    return mainnetApiRoot;
  }
}

const getNetworkPalette = () => {
  if (network.value === networks.TEST) {
    return '#fcd34d';
  }
  else if (network.value === networks.PREP) {
    return '#80b3ff';
  }
  else if (network.value === networks.PREV) {
    return '#e699ff';
  }
  else {
    return '#ffffff';
  }
}

const getNetworkEpochLength = () => {
  if (network.value === networks.TEST) {
    return 432000;
  }
  else if (network.value === networks.PREP) {
    return 432000;
  }
  else if (network.value === networks.PREV) {
    return 86400;
  }
  else {
    return 432000;
  }
}

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
    getNetwork,
    setNetwork,
    network,
    lang,
    setLang,
    langs: Object.keys(langs).map((key) => langs[key]),
    getApiUrl,
    getNetworkPalette,
    getNetworkEpochLength
  }
}
