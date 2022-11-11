import { ref } from 'vue'

const setupNetworks = () => {
  const networks = [
    { name: 'Mainnet', url: import.meta.env.VITE_MAINNET_API_URL, palette: '#ffffff', epochLength: 432000, main: true },
    { name: 'Testnet', url: import.meta.env.VITE_TESTNET_API_URL, palette: '#fcd34d', epochLength: 432000 },
    { name: 'Preview', url: import.meta.env.VITE_PREVIEW_API_URL, palette: '#e699ff', epochLength: 86400 },
    { name: 'Preprod', url: import.meta.env.VITE_PREPROD_API_URL, palette: '#80b3ff', epochLength: 432000 },
  ]

  // default network
  const network = ref(networks.find((n) => n.main))

  const setNetwork = (newNetwork) => (network.value = newNetwork)
  const setNetworkByName = (name) => setNetwork(networks.find((n) => n.name === name))

  return { networks, network, setNetwork, setNetworkByName }
}

const setupLanguages = () => {
  const langs = [
    { code: 'en', name: 'English', icon: '/images/en.png' },
    { code: 'fr', name: 'Français', icon: '/images/fr.png' },
  ]

  // pre-load images
  langs.forEach((lang) => {
    const img = new Image()
    img.onload = () => (lang.icon = img.src)
    img.src = lang.icon
  })

  // default language
  const lang = ref(langs.find((l) => l.code === (localStorage.getItem('lang') || 'en')))

  const setLang = (newLang) => {
    lang.value = langs.find((l) => l.code === newLang)
    localStorage.setItem('lang', lang.value.code)
  }

  return { lang, setLang, langs }
}

const networksSetup = setupNetworks()
const langsSetup = setupLanguages()

export const useSettings = () => {
  return {
    ...networksSetup,
    ...langsSetup,
  }
}
