<template>
  <div class="card">
    <h2>{{L('SupportUs')}}</h2>
    <p>You can support us and this project by delegating to the <a :href="canadaStakesUrl" target="_blank">CanadaStakes CAN1 pool</a></p>

    
  </div>
  <div>
    
  </div>
</template>

<script setup>
const canadaStakesUrl = import.meta.env.VITE_CANADA_STAKES_URL
</script>
