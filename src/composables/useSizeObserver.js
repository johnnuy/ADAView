import { ref, onMounted, onBeforeUnmount } from 'vue'

export const useSizeObserver = (elementRef) => {
  const width = ref(0)
  const resizeObserver = new ResizeObserver((entries) => {
    for (let entry of entries) {
      width.value = entry.contentRect.width
    }
  })

  onMounted(() => resizeObserver.observe(elementRef.value))
  onBeforeUnmount(() => resizeObserver.unobserve(elementRef.value))

  return { width }
}
