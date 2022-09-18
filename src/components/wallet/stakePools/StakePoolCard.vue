<template>
  <div class="card-container mx-auto">
    <div class="Logo">
      <div class="flex flex-column align-items-center justify-content-center mx-2 h-full">
        <img :src="stakePool.details.logoUrl" alt="Stake Pool Logo" class="stake-pool-logo mb-2" />
        <h3 class="text-center my-0">{{ stakePool.details.ticker }}</h3>
        <h4 class="text-center my-0">{{ stakePool.details.name }}</h4>
      </div>
    </div>
    <div class="Stats flex align-items-center justify-content-center flex-wrap">
      <div class="flex flex-column align-items-center justify-content-center mx-2">
        <div class="text-500">{{ L('Pledge') }}</div>
        <div>
          {{ formatLovelace(stakePool.details.pledgeAda) }}
        </div>
      </div>

      <div class="flex flex-column align-items-center justify-content-center mx-2">
        <div class="text-500">{{ L('Fixed Cost') }}</div>
        <span>{{ formatLovelace(stakePool.details.fixedCostAda) }}</span>
      </div>

      <div class="flex flex-column align-items-center justify-content-center mx-2">
        <div class="text-500">{{ L('Margin Cost') }}</div>
        <div>{{ stakePool.details.marginCost }}%</div>
      </div>
    </div>
    <div class="Description align-items-center justify-content-center text-center">
      {{ stakePool.details.description }}
    </div>
    <div class="Social flex align-items-center justify-content-center">
      <a v-if="stakePool.details.socialMedia.facebookHandles[0]" :href="`https://facebook.com/${stakePool.details.socialMedia.facebookHandles[0]}`" class="social-href">
        <i class="pi pi-facebook mx-1 social-icon" style="font-size: 1.5rem"></i>
      </a>
      <a v-if="stakePool.details.socialMedia.redditHandles[0]" :href="`https://www.reddit.com/user/${stakePool.details.socialMedia.redditHandles[0]}`" class="social-href">
        <i class="pi pi-reddit mx-1 social-icon" style="font-size: 1.5rem"></i>
      </a>
      <a v-if="stakePool.details.socialMedia.twitterHandles[0]" :href="`https://twitter.com/${stakePool.details.socialMedia.twitterHandles[0]}`" class="social-href">
        <i class="pi pi-twitter mx-1 social-icon" style="font-size: 1.5rem"></i>
      </a>
      <a v-if="stakePool.details.socialMedia.discordHandles[0]" :href="`https://discordapp.com/users/${stakePool.details.socialMedia.discordHandles[0]}`" class="social-href">
        <i class="pi pi-discord mx-1 social-icon" style="font-size: 1.5rem"></i>
      </a>
      <a v-if="stakePool.details.socialMedia.githubHandles[0]" :href="`https://github.com/${stakePool.details.socialMedia.githubHandles[0]}`" class="social-href">
        <i class="pi pi-github mx-1 social-icon" style="font-size: 1.5rem"></i>
      </a>
      <a v-if="stakePool.details.socialMedia.youtubeHandles[0]" :href="`https://youtube.com/c/${stakePool.details.socialMedia.youtubeHandles[0]}`" class="social-href">
        <i class="pi pi-youtube mx-1 social-icon" style="font-size: 1.5rem"></i>
      </a>
      <!-- no primevue icon for twitch -- leave out for now -->
      <!-- <a v-if="stakePool.details.socialMedia.twitchHandles[0]" :href="`https://twitch.tv/${stakePool.details.socialMedia.twitchHandles[0]}`" class="social-href">
        <i class="pi pi-twitch mx-1 social-icon" style="font-size: 1.5rem">Twitch</i>
      </a> -->
      <a v-if="stakePool.details.socialMedia.instagramHandles[0]" :href="`https://instagram.com/${stakePool.details.socialMedia.instagramHandles[0]}`" class="social-href">
        <i class="pi pi-instagram mx-1 social-icon" style="font-size: 1.5rem"></i>
      </a>
      <a v-if="stakePool.details.socialMedia.telegramHandles[0]" :href="`https://t.me/${stakePool.details.socialMedia.telegramHandles[0]}`" class="social-href">
        <i class="pi pi-telegram mx-1 social-icon" style="font-size: 1.5rem"></i>
      </a>
    </div>
  </div>
</template>

<script setup>
import { formatLovelace } from '@/utils/utils'

defineProps({
  stakePool: {
    type: Object,
    default: null,
  },
})
</script>

<style lang="scss" scoped>
.stake-pool-logo {
  max-width: 100px;
  border: 2px solid var(--surface-500);
  border-radius: 15px;
}

.social-icon {
  cursor: pointer;
  transition: transform 0.25s ease 0s;
}

.social-icon:hover {
  transform: scale(1.35);
}

.social-href {
  color: var(--text-color);
}

.card-container {
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto auto auto;
  gap: 0px 0px;
  grid-template-areas:
    'Logo Stats Stats Stats'
    'Logo Description Description Description'
    'Logo Social Social Social';
  max-width: 600px;
}

.Logo {
  grid-area: Logo;
  justify-self: stretch;
}

.Stats {
  grid-area: Stats;
}
.Description {
  grid-area: Description;
}
.Social {
  grid-area: Social;
}

@media screen and (max-width: 1200px) {
  .card-container {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto auto;
    gap: 15px 0px;
    grid-template-areas:
      'Logo'
      'Stats'
      'Description'
      'Social';
  }
}
</style>
