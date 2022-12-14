<template>
  <div class="layout-topbar">
    <router-link :to="{ name: 'Home' }" class="layout-topbar-logo">
      <img alt="Logo" :src="topbarImage()" />
      <span>ADAView.live</span>
      <span v-if="!network.main" :style="{ color: network.palette }">&nbsp;{{ network.name }}</span>
    </router-link>
    <button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle">
      <i class="pi pi-bars"></i>
    </button>

    <button
      v-styleclass="{ selector: '@next', enterClass: 'hidden', enterActiveClass: 'scalein', leaveToClass: 'hidden', leaveActiveClass: 'fadeout', hideOnOutsideClick: true }"
      class="p-link layout-topbar-menu-button layout-topbar-button"
    >
      <i class="pi pi-ellipsis-v"></i>
    </button>

    <ul class="layout-topbar-menu hidden lg:flex origin-top">
      <li class="mx-1 my-1">
        <EpochTipStats :size="40" />
      </li>

      <li class="mx-1 my-1">
        <NetworkPicker />
      </li>

      <li class="mx-1 my-1">
        <LanguagePicker />
      </li>
    </ul>
  </div>
</template>

<script setup>
import EpochTipStats from '@/components/epoch/EpochTipStats'
import LanguagePicker from '@/components/common/LanguagePicker'
import NetworkPicker from '@/components/common/NetworkPicker'
import { useSettings } from '@/composables/useSettings'

const emit = defineEmits(['menu-toggle', 'topbar-menu-toggle'])

const { network } = useSettings()

const onMenuToggle = (event) => {
  emit('menu-toggle', event)
}

const topbarImage = () => {
  return 'images/adaview/adaview_lettermark_sm.png'
}
</script>

<style lang="scss" scoped>
  .layout-topbar-logo img {
    height: 4rem;
  }
</style>
