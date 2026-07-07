import { onMounted, onUnmounted, ref } from 'vue'

const DESIGN_WIDTH = 1920
const DESIGN_HEIGHT = 1080

export function useScreenScale(containerRef: { value: HTMLElement | null }) {
  const scale = ref(1)

  function updateScale() {
    if (!containerRef.value) return
    const { clientWidth, clientHeight } = document.documentElement
    scale.value = Math.min(clientWidth / DESIGN_WIDTH, clientHeight / DESIGN_HEIGHT)
  }

  onMounted(() => {
    updateScale()
    window.addEventListener('resize', updateScale)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateScale)
  })

  return { scale, designWidth: DESIGN_WIDTH, designHeight: DESIGN_HEIGHT }
}
