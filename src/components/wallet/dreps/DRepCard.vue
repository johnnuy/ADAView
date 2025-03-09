<template>
  <div class="card-container mx-auto">

    <div class="Logo">
      <div class="flex flex-column align-items-center justify-content-center mx-2 h-full">
        <img src="https://ipfs.canadastakes.ca/ipfs/QmS5gynkFMNFTnqPGgADxbvjutYmQK4Qh4iWwkSq4BhcmJ" alt="DRep Logo" class="drep-logo mb-2" />        
        <h4 class="text-center my-0">{{ drep.details.givenName }}</h4>
      </div>
    </div>

    <div class="Stats flex align-items-center justify-content-center flex-wrap">
      <div class="flex flex-column align-items-center justify-content-center mx-2">
        <div class="text-500">{{ L('Delegators') }}</div>
        <span v-if="drep.delegatorsCount">{{ drep.delegatorsCount }}</span>
        <span v-else>N/A</span>
      </div>

      <div class="flex flex-column align-items-center justify-content-center mx-2">
        <div class="text-500">{{ L('Votes') }}</div>
        <span v-if="drep.votedCount">{{ drep.votedCount }}</span>
        <span v-else>N/A</span>
      </div>
    </div>
    
    <div class="Description align-items-center justify-content-center text-center">
      <div v-if="drep.details.objectives">
        <div class="text-500">{{ L('Objectives') }}</div>
        <span >{{ drep.details.objectives }}</span>
      </div>
      <div v-if="drep.details.motivations">
        <div class="text-500">{{ L('Motivations') }}</div>
        <span>{{ drep.details.motivations }}</span>
      </div>
      <div v-if="drep.details.qualifications">
        <div class="text-500">{{ L('Qualifications') }}</div>
        <span>{{ drep.details.qualifications }}</span>
      </div>
    </div>     
    <div v-if="drep.details.socialMedia" class="Social flex align-items-center justify-content-center">
      <a v-if="drep.details.socialMedia.facebookHandles && drep.details.socialMedia.facebookHandles[0]" :href="formatSocialMediaHandle(`https://facebook.com/`, drep.details.socialMedia.facebookHandles[0])" class="social-href">
        <i class="pi pi-facebook mx-1 social-icon" style="font-size: 1.5rem"></i>
      </a>
      <a v-if="drep.details.socialMedia.redditHandles && drep.details.socialMedia.redditHandles[0]" :href="formatSocialMediaHandle(`https://www.reddit.com/user/`, drep.details.socialMedia.redditHandles[0])" class="social-href">
        <i class="pi pi-reddit mx-1 social-icon" style="font-size: 1.5rem"></i>
      </a>
      <a v-if="drep.details.socialMedia.twitterHandles && drep.details.socialMedia.twitterHandles[0]" :href="formatSocialMediaHandle(`https://twitter.com/`, drep.details.socialMedia.twitterHandles[0])" class="social-href">
        <i class="pi pi-twitter mx-1 social-icon" style="font-size: 1.5rem"></i>
      </a>
      <a v-if="drep.details.socialMedia.discordHandles && drep.details.socialMedia.discordHandles[0]" :href="formatSocialMediaHandle(`https://discordapp.com/users/`, drep.details.socialMedia.discordHandles[0])" class="social-href">
        <i class="pi pi-discord mx-1 social-icon" style="font-size: 1.5rem"></i>
      </a>
      <a v-if="drep.details.socialMedia.githubHandles && drep.details.socialMedia.githubHandles[0]" :href="formatSocialMediaHandle(`https://github.com/`, drep.details.socialMedia.githubHandles[0])" class="social-href">
        <i class="pi pi-github mx-1 social-icon" style="font-size: 1.5rem"></i>
      </a>
      <a v-if="drep.details.socialMedia.youtubeHandles && drep.details.socialMedia.youtubeHandles[0]" :href="formatSocialMediaHandle(`https://youtube.com/c/`, drep.details.socialMedia.youtubeHandles[0])" class="social-href">
        <i class="pi pi-youtube mx-1 social-icon" style="font-size: 1.5rem"></i>
      </a>
      <!-- no primevue icon for twitch -- leave out for now -->
      <!-- <a v-if="drep.details.socialMedia.twitchHandles && drep.details.socialMedia.twitchHandles[0]" :href="formatSocialMediaHandle(`https://twitch.tv/`, drep.details.socialMedia.twitchHandles[0])" class="social-href">
        <i class="pi pi-twitch mx-1 social-icon" style="font-size: 1.5rem">Twitch</i>
      </a> -->
      <a v-if="drep.details.socialMedia.instagramHandles && drep.details.socialMedia.instagramHandles[0]" :href="formatSocialMediaHandle(`https://instagram.com/`, drep.details.socialMedia.instagramHandles[0])" class="social-href">
        <i class="pi pi-instagram mx-1 social-icon" style="font-size: 1.5rem"></i>
      </a>
      <a v-if="drep.details.socialMedia.telegramHandles && drep.details.socialMedia.telegramHandles[0]" :href="formatSocialMediaHandle(`https://t.me/`, drep.details.socialMedia.telegramHandles[0])" class="social-href">
        <i class="pi pi-telegram mx-1 social-icon" style="font-size: 1.5rem"></i>
      </a>
    </div>
  </div>
</template>

<script setup>
import DRepAddress from './DRepAddress.vue'
import WalletAddress from '../../common/WalletAddress.vue'
import { formatSocialMediaHandle } from '../../../utils/utils.js'

defineProps({
  drep: {
    type: Object,
    default: null,
  },
})

</script>

<style lang="scss" scoped>
.drep-logo {
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

@media screen and (max-width: 1600px) {
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
