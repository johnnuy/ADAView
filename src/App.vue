<template>
  <div :class="containerClass" @click="onWrapperClick">
    <AppTopBar @menu-toggle="onMenuToggle" />
    <div class="layout-sidebar" @click="onSidebarClick">
      <SiteNav />
      <HistoryPanel />
    </div>

    <div class="layout-main-container">
      <div class="layout-main">
        <router-view />
      </div>
      <AppFooter />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import AppTopBar from './AppTopbar.vue'
import SiteNav from './SiteNav.vue'
import HistoryPanel from './HistoryPanel.vue'
import AppFooter from './AppFooter.vue'

const staticMenuInactive = ref(false)
const mobileMenuActive = ref(false)
const menuClick = ref(false)
const containerClass = computed(() => [
  'layout-wrapper',
  'layout-static',
  {
    'layout-static-sidebar-inactive': staticMenuInactive.value,
    'layout-mobile-sidebar-active': mobileMenuActive.value,
  },
])

const isDesktop = () => window.innerWidth >= 992

const onMenuToggle = () => {
  menuClick.value = true

  if (isDesktop()) {
    staticMenuInactive.value = !staticMenuInactive.value
  } else {
    mobileMenuActive.value = !mobileMenuActive.value
  }
}

const onSidebarClick = () => (menuClick.value = true)

const onWrapperClick = () => {
  if (!menuClick.value) {
    mobileMenuActive.value = false
  }
  menuClick.value = false
}
</script>
