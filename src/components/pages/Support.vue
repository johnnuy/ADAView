<template>
  <div class="card">
    <h2>{{ L('SupportUs') }}</h2>
    <p>{{ L('You can support us text') }} <a :href="canadaStakesUrl" target="_blank">CanadaStakes CAN1 pool</a></p>
  </div>

  <div class="card">
    <h2>{{ L('FollowUs') }}</h2>
    <p>{{ L('You can follow us text') }} <a :href="twitterUrl" target="_blank">Twitter</a></p>
  </div>
  <div></div>
</template>

<script setup>
const canadaStakesUrl = import.meta.env.VITE_CANADA_STAKES_URL
const twitterUrl = import.meta.env.VITE_TWITTER_URL
</script>
