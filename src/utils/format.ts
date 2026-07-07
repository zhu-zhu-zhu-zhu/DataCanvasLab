export function formatNumber(value: number): string {
  return new Intl.NumberFormat('zh-CN').format(Math.round(value))
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function randomDelta(base: number, ratio = 0.05): number {
  const delta = base * ratio * (Math.random() * 2 - 1)
  return Math.max(0, Math.round(base + delta))
}
