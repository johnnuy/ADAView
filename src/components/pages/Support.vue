<template>
  <div class="card">
    <h2>{{ L('SupportUs') }}</h2>
    <p>{{ L('You can support us text') }} <a :href="canadaStakesUrl" target="_blank">CanadaStakes CAN1 pool</a></p>
  </div>

</template>

<script setup>
const canadaStakesUrl = import.meta.env.VITE_CANADA_STAKES_URL
</script>
