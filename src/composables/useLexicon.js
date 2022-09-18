import { ref, watch } from 'vue'
import { useSettings } from './useSettings'

const { lang } = useSettings()

const loadDictionary = async () => {
  const { default: json } = await import(`../assets/i18n/${lang.value.code.toLocaleLowerCase()}.json`)
  dictionary.value = json
}

const dictionary = ref(null)
await loadDictionary() // await the inital load

watch(lang, () => loadDictionary())

const L = (key) => dictionary.value?.find((e) => e.key === key)?.value || `!Key '${key}' not found!`

export const useLexicon = () => {
  return {
    L,
  }
}
