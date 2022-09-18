<template>
  <div v-if="roadmap" class="card">
    <h2 :class="roadmap.description[lang.code] === '' && 'mb-0'">{{ roadmap.title[lang.code] }}</h2>
    <p>{{ roadmap.description[lang.code] }}</p>
  </div>
  <div>
    <Timeline v-if="roadmap" :value="roadmap.phases" align="alternate" class="customized-timeline my-4">
      <template #marker>
        <span class="custom-marker shadow-2">
          <i class="pi pi-bolt" style="font-size: 2rem; color: #f2d066"></i>
        </span>
      </template>
      <template #content="slotProps">
        <Card>
          <template #title>
            {{ slotProps.item.title[lang.code] }}
          </template>
          <template #subtitle>
            {{ slotProps.item.timeline[lang.code] }}
          </template>
          <template #content>
            <p>{{ slotProps.item.description[lang.code] }}</p>
            <!-- <Button label="Read more" class="p-button-text"></Button> -->
          </template>
        </Card>
      </template>
    </Timeline>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useSettings } from '@/composables/useSettings'

const { lang } = useSettings()
const roadmap = ref(null)
onMounted(async () => {
  const { default: json } = await import(`../../assets/roadmap/roadmap.json`)
  roadmap.value = json
})
</script>

<style lang="scss" scoped>
.custom-marker {
  display: flex;
  width: 2rem;
  height: 2rem;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  border-radius: 50%;
  z-index: 1;
}

::v-deep(.p-button) {
  min-width: 8em;
}

::v-deep(.p-timeline-event-content) {
  line-height: 1;
}
::v-deep(.p-timeline-event-opposite) {
  line-height: 1;
}

@media screen and (max-width: 960px) {
  ::v-deep(.customized-timeline) {
    .p-timeline-event:nth-child(even) {
      flex-direction: row !important;

      .p-timeline-event-content {
        text-align: left !important;
      }
    }
    .p-timeline-event-opposite {
      flex: 0;
    }
    .p-card {
      margin-top: 1rem;
    }
  }
}
</style>
