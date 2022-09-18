<template>
  <OverlayPanel id="panelRef" ref="panelRef" append-to="body" style="width: 450px" :breakpoints="{ '960px': '75vw' }" @show="onShow">
    <h5>{{ L('Wallet name') }}</h5>
    <form class="formgroup-inline flex flex-row" @submit.prevent="onSubmit">
      <div class="field flex-grow-1">
        <input ref="nameTextRef" v-model="name" class="p-inputtext p-component w-full" type="text" :placeholder="L('Name your wallet...')" @keyup.escape="onClose" />
      </div>
      <Button :label="L('Ok')" type="submit" :disabled="!name" />
      <Button v-if="props.mode === 'edit'" :label="L('Delete')" class="p-button-danger ml-2" :disabled="!name" @click="onDelete" />
    </form>
  </OverlayPanel>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  search: {
    type: Object,
    default: null,
  },
  mode: {
    validator: (prop) => ['edit', 'add'].includes(prop),
    default: 'add',
    required: true,
  },
})

const name = ref()
const nameTextRef = ref(null)

const emit = defineEmits(['onOk', 'onDelete', 'onClose'])
const onSubmit = (event) => emit('onOk', event, name.value)
const onDelete = (event) => emit('onDelete', event)
const onClose = (event) => emit('onClose', event)

const panelRef = ref(null)
const toggle = (event) => {
  panelRef.value.toggle(event)
}

const onShow = () => {
  name.value = props.search?.name || ''
  nameTextRef.value?.focus()
}

defineExpose({ toggle })
</script>

<style></style>
