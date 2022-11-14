<template>
  <OverlayPanel id="panelRef" ref="panelRef" append-to="body" style="width: 450px" :breakpoints="{ '960px': '75vw' }">
    <h5 v-if="type === 'saved'">{{ L('Clear all saved searches...') }}</h5>
    <h5 v-if="type === 'recent'">{{ L('Clear all recent searches...') }}</h5>

    <form class="formgroup-inline flex flex-row" @submit.prevent="onSubmit">
      <Button :label="L('Yes, remove all searches')" class="p-button-danger ml-2" type="submit" />
      <Button :label="L('Cancel')" class="p-button-secondary ml-2" @click="onClose" />
    </form>
  </OverlayPanel>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  type: {
    validator: (prop) => ['saved', 'recent'].includes(prop),
    required: true,
  },
})

const emit = defineEmits(['onOk', 'onCancel', 'onClose'])
const onSubmit = (event) => emit('onOk', event)
const onClose = (event) => emit('onClose', event)

const panelRef = ref(null)
const toggle = (event) => {
  panelRef.value.toggle(event)
}

defineExpose({ toggle })
</script>

<style></style>
