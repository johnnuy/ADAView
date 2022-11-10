<template>
  <div>
    <ve-progress v-if="epochNumber > 0" :progress="percentageToEpoch" :size="props.size" :font-color="fontColor" @click="toggle">
      <template #default>
        <span style="font-weight: bold; font-size: 0.8rem">
          {{ epochNumber }}
        </span>
      </template>
    </ve-progress>

    <OverlayPanel id="overlay_panel" ref="op" append-to="body" :breakpoints="{ '960px': '75vw', '240px': '100vw' }" :style="{ width: '450px' }">
      <div class="grid">
        <div class="col-12 md:col-12 lg:col-12">
          <Card>
            <template #title> {{ L('Epoch') }} </template>
            <template #content>
              {{ epochNumber }}
            </template>
            <template #footer>
              <ProgressBar :value="percentageToEpoch" />
            </template>
          </Card>
        </div>

        <div class="col-12 md:col-6 lg:col-6">
          <Card class="h-full">
            <template #title> {{ L('Global Slot') }} </template>
            <template #content> {{ slotNumber }} </template>
          </Card>
        </div>
        <div class="col-12 md:col-6 lg:col-6">
          <Card class="h-full">
            <template #title> {{ L('Slot') }} </template>
            <template #content> {{ slotNumberInEpoch }} / {{ getNetworkEpochLength() }} </template>
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
const { isMainNetwork, getNetwork, getNetworkPalette, getNetworkEpochLength } = useSettings()

const incrementSlotTimeMs = import.meta.env.VUE_APP_INCREMENT_SLOT_TIMER_MS || 1000
let incrementSlotTimer = null

const props = defineProps({
  size: {
    type: Number,
    default: 50,
  },
})

const percentageToEpoch = computed(() => calculatePercentageToEpoch(tip.value?.data.slotNumberInEpoch, getNetworkEpochLength()))
const slotNumberInEpoch = computed(() => tip.value?.data.slotNumberInEpoch)
const slotNumber = computed(() => tip.value?.data.slotNumber)
const epochNumber = computed(() => tip.value?.data.epochNumber)
const fontColor = computed(() => getNetworkPalette())

onMounted(() => {
  fetchTip()
  incrementSlotTimer = setInterval(incrementAllSlotNbr, incrementSlotTimeMs)
})

onBeforeUnmount(() => {
  cancelTimer(incrementSlotTimer)
})

watch(
  () => getNetwork(),
  () => syncSlot(),
)

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
