import { ref } from 'vue'

const networks = [
  { name: 'Mainnet', url: import.meta.env.VITE_MAINNET_API_URL, palette: '#ffffff', epochLength: 432000, main: true },
  { name: 'Testnet', url: import.meta.env.VITE_TESTNET_API_URL, palette: '#fcd34d', epochLength: 432000 },
  { name: 'Preview', url: import.meta.env.VITE_PREVIEW_API_URL, palette: '#e699ff', epochLength: 86400 },
  { name: 'Preprod', url: import.meta.env.VITE_PREPROD_API_URL, palette: '#80b3ff', epochLength: 432000 },
]

const network = ref(networks.find((n) => n.main))
const setNetwork = (newNetwork) => (network.value = newNetwork)
const setNetworkByName = (name) => setNetwork(networks.find((n) => n.name === name))

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
    networks,
    network,
    setNetwork,
    setNetworkByName,
    lang,
    setLang,
    langs: Object.keys(langs).map((key) => langs[key]),
  }
}
