<template>
  <div>
    <ve-progress v-if="tip && tip.data.epochNumber > 0" :progress="percentageToEpoch" :size="props.size"
      :font-color="network.palette" @click="toggle">
      <template #default>
        <span style="font-weight: bold; font-size: 0.8rem">
          {{ tip.data.epochNumber }}
        </span>
      </template>
    </ve-progress>

    <OverlayPanel id="overlay_panel" ref="op" append-to="body" :breakpoints="{ '960px': '75vw', '240px': '100vw' }"
      :style="{ width: '450px' }">
      <div class="grid">
        <div class="col-12 md:col-12 lg:col-12">
          <Card>
            <template #title> {{ L('Epoch') }} {{ tip.data.epochNumber }}</template>
            <template #content>
              <ProgressBar :value="percentageToEpoch" />
            </template>
          </Card>
        </div>

        <div class="col-12 md:col-6 lg:col-6">
          <Card class="h-full">
            <template #title> {{ L('Global Slot') }} </template>
            <template #content> {{ tip.data.slotNumber }} </template>
          </Card>
        </div>
        <div class="col-12 md:col-6 lg:col-6">
          <Card class="h-full">
            <template #title> {{ L('Slot') }} </template>
            <template #content> {{ tip.data.slotNumberInEpoch }} / {{ network.epochLength }} </template>
          </Card>
        </div>
      </div>
    </OverlayPanel>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue'
import { calculatePercentageToEpoch } from '@/utils/utils'
import { useFetchTip } from '@/composables/useFetchTip'
import { useSettings } from '@/composables/useSettings'
const { tip, incrementAllSlotNbr, fetchTip } = useFetchTip()
const { network } = useSettings()

const incrementSlotTimeMs = import.meta.env.VUE_APP_INCREMENT_SLOT_TIMER_MS || 1000
let incrementSlotTimer = null

const props = defineProps({
  size: {
    type: Number,
    default: 50,
  },
})

const percentageToEpoch = ref(0)
watch(tip, () => (percentageToEpoch.value = calculatePercentageToEpoch(tip.value?.data.slotNumberInEpoch, network.value.epochLength)))

onMounted(() => {
  fetchTip()
  incrementSlotTimer = setInterval(incrementAllSlotNbr, incrementSlotTimeMs)
})

onBeforeUnmount(() => {
  cancelTimer(incrementSlotTimer)
})

watch(network, () => syncSlot())

const cancelTimer = (timer) => {
  clearInterval(timer)
}

const syncSlot = () => {
  cancelTimer(incrementSlotTimer)
  fetchTip()
  incrementSlotTimer = setInterval(incrementAllSlotNbr, incrementSlotTimeMs)
}

const op = ref()
const toggle = (event) => {
  op.value.toggle(event)
}
</script>

<style lang="scss" scoped>
.ep-container {
  cursor: pointer;
}
</style>
