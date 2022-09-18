<template>
  <Dropdown v-model="selectedLanguage" :options="langs" option-label="name" option-value="code" placeholder="Select a language" class="w-full" @change="onLanguageChange">
    <template #value="slotProps">
      <div v-if="slotProps.value" class="language-item">
        <img :src="slotProps.value.icon" class="mr-1" />
        <span>{{ slotProps.value.name }}</span>
      </div>
    </template>
    <template #option="slotProps">
      <div class="language-item">
        <img :src="slotProps.option.icon" class="mr-1" />
        <span>{{ slotProps.option.name }}</span>
      </div>
    </template>
  </Dropdown>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import { useSettings } from '@/composables/useSettings'

const { langs, lang, setLang } = useSettings()

const selectedLanguage = ref(lang)
const onLanguageChange = (e) => setLang(e.value)

onMounted(() => {
  const image = new Image()
  langs.forEach((l) => (image.src = l.icon))
})
</script>

<style>
.language-item {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
