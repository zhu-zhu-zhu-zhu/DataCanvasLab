import { onMounted, onUnmounted, ref } from 'vue'

export function usePolling(callback: () => void | Promise<void>, intervalMs = 30000) {
  const timer = ref<number | null>(null)

  onMounted(() => {
    void callback()
    timer.value = window.setInterval(() => void callback(), intervalMs)
  })

  onUnmounted(() => {
    if (timer.value !== null) {
      clearInterval(timer.value)
    }
  })
}
