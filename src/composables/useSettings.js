import { ref } from 'vue'

const setupNetworks = () => {
  const networks = [
    { name: 'Mainnet', url: import.meta.env.VITE_MAINNET_API_URL, palette: '#ffffff', epochLength: 432000, main: true },    
    { name: 'Preview', url: import.meta.env.VITE_PREVIEW_API_URL, palette: '#e699ff', epochLength: 86400 },
    { name: 'Preprod', url: import.meta.env.VITE_PREPROD_API_URL, palette: '#80b3ff', epochLength: 432000 },
  ]

  // default network
  const network = ref(networks.find((n) => n.main))

  const setNetwork = (newNetwork) => (network.value = newNetwork)
  const setNetworkByName = (name) => {
    var network = networks.find((n) => n.name === name);
    /* if a network was asked for that no longer exists, just default to main */
    if (network == null) {
      network = networks.find((n) => n.main);
    }
    setNetwork(network);
  }

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
