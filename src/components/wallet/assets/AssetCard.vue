<template>
  <div class="card-container mx-auto">
    <div class="Logo">
      <div class="flex flex-column align-items-center justify-content-center mx-2 h-full">
        <img src="/images/adaview/adaview_lettermark_sm.png" alt="Stake Pool Logo" class="stake-pool-logo mb-2" />        
      </div>
      <h3 class="text-center my-0">{{ asset.name }}</h3>
      <h4 class="text-center my-0">{{ asset.fingerprint }}</h4>
    </div>

    <!--
    <div class="text-500">{{ L('Fingerprint') }}:</div>
    <div>
      <CopyToClipboardLink :text="asset.fingerprint" :copy-text="asset.fingerprint" break />
    </div>

    <div class="text-500">{{ L('Policy') }}:</div>
    <div>
      <CopyToClipboardLink :text="asset.policy" :copy-text="asset.policy" break />
    </div>

    <div class="text-500">{{ L('Name') }}:</div>
    <div>
      {{ asset.name }}
    </div>    
    <div class="text-500">{{ L('Metadata') }}:</div>
    
    <div class="break">
      {{ asset.metadata }}
    </div>
    -->
  </div>
</template>

<script setup>
  import CopyToClipboardLink from '@/components/common/CopyToClipboardLink.vue'

  defineProps({
    asset: {
      type: Object,
      default: null,
    },
  })
</script>

<style lang="scss" scoped>
 
.card-container {
  border: 2px solid rgb(117, 114, 114);
  border-radius: 15px;
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
</style>