<template>
  <div class="card-container mx-auto">
    <div class="Description align-items-center justify-content-center text-center">
      <DRepAddress :address="drep.drepId"/>
    </div>
  </div>
</template>

<script setup>
import DRepAddress from './DRepAddress.vue'

defineProps({
  drep: {
    type: Object,
    default: null,
  },
})
</script>

<style lang="scss" scoped>

.card-container {
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto auto auto;
  gap: 0px 0px;
  grid-template-areas:
    'Description';
  max-width: 600px;
}

</style>
