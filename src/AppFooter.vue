<template>
  <div class="layout-footer">
    <span class="font-medium ml-2">
      {{ L('Powered by') }} <a :href="canadaStakesUrl" target="_blank">{{ L('Canada Stakes API') }}</a>
    </span>
    <Image :src="canadaStakesLogo" :alt="L('Canada Stakes API')" width="27" class="ml-2" shape="circle" />
  </div>
</template>

<script setup>
const canadaStakesUrl = import.meta.env.VITE_CANADA_STAKES_URL
const canadaStakesLogo = import.meta.env.VITE_CANADA_STAKES_LOGO
</script>
