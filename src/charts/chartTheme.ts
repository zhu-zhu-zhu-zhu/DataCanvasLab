import type { EChartsOption } from 'echarts'

export const chartColors = ['#00d4ff', '#3b82f6', '#fbbf24', '#a78bfa', '#34d399', '#fb7185']

export const baseChartTheme: EChartsOption = {
  backgroundColor: 'transparent',
  textStyle: {
    color: 'rgba(232, 244, 255, 0.85)',
    fontFamily: 'Rajdhani, sans-serif',
  },
  grid: {
    left: 40,
    right: 20,
    top: 40,
    bottom: 30,
    containLabel: true,
  },
  tooltip: {
    backgroundColor: 'rgba(8, 20, 48, 0.92)',
    borderColor: 'rgba(0, 212, 255, 0.35)',
    textStyle: { color: '#e8f4ff' },
  },
}

export function axisStyle() {
  return {
    axisLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.2)' } },
    axisLabel: { color: 'rgba(232, 244, 255, 0.65)', fontSize: 11 },
    splitLine: { lineStyle: { color: 'rgba(0, 212, 255, 0.08)' } },
  }
}
