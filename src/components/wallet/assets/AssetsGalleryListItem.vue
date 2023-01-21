<template>
  <div class="col-12">
    <div class="asset-list-item">
      <img src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" alt="111" />
      <div class="asset-list-detail">
        <div class="asset-name">{{ asset.asset.name }}</div>
        <div>
          <span class="text-500">Fingerprint: </span>
          <span class="font-medium">
            <CopyToClipboardLink :text="asset.asset.fingerprint" :copy-text="asset.fingerprint" break />
          </span>
        </div>
        <div>
          <span class="text-500">Policy: </span>
          <span class="font-medium">
            {{ asset.asset.policy }}
          </span>
        </div>       
      </div>      
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
  asset: Object,
})
</script>

<style lang="scss" scoped>
.asset-name {
  word-break: break-all;
  font-size: 1.5rem;
  font-weight: 700;
}

::v-deep(.asset-list-item) {
  display: flex;
  align-items: center;
  padding: 1rem;
  width: 100%;

  img {
    width: 50px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    margin-right: 2rem;
  }

  .p-button {
    margin-bottom: 0.5rem;
  }
}


@media screen and (max-width: 576px) {
  .asset-list-item {
    flex-direction: column;
    align-items: center;

    img {
      margin: 2rem 0;
    }  
  }
}
</style>