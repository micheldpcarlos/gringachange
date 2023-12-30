<script setup lang="ts">
import { createChart } from 'lightweight-charts'
import type { AreaSeriesOptions, ChartOptions, DeepPartial } from 'lightweight-charts'
import { useChartData } from '~/composables/useChartData'
import type { Configuration } from '~/types'

const props = defineProps<{
  configuration: Configuration
}>()
const { getChartData, loading, chartData } = useChartData()

const chartOptions = ref<DeepPartial<ChartOptions>>({
  grid: {
    horzLines: {
      visible: false,
    },
    vertLines: {
      visible: false,
    },
  },
  layout: {
    fontSize: 10,
  },
  rightPriceScale: {
    borderVisible: false,
  },
  timeScale: {
    borderVisible: false,
    visible: true,
    timeVisible: false,
    secondsVisible: false,
    rightOffset: 0,
    fixLeftEdge: true,
    fixRightEdge: true,
  },
})

const seriesOptions = ref<Partial<AreaSeriesOptions>>({
  lineWidth: 2,
  priceFormat: {
    type: 'price',
    precision: 4,
    minMove: 0.0001,
  },
})

const chartContainer = ref()
let series: any
let chart: any

const compareByTime = (a: { value: number; time: number }, b: { value: number; time: number }) => a.time - b.time
const mappedResponse = computed(() => {
  // using map to avoid repeated timestamp (not supported by the chart)
  const dataMap = new Map()
  chartData.value?.forEach(item => dataMap.set(item.timestamp, item.bid))
  return Array.from(dataMap, ([time, value]) => ({ time, value })).sort(compareByTime)
})

// Creates the chart series and sets the data.
const addSeriesAndData = () => {
  if (chart && series)
    chart.removeSeries(series)

  series = chart.addAreaSeries()
  series.setData(mappedResponse.value)
  series.applyOptions(seriesOptions.value)
}

onMounted(() => {
  chart = createChart(chartContainer.value, chartOptions.value)
  getChartData(props.configuration)
})

onUnmounted(() => {
  if (chart) {
    chart.remove()
    chart = null
  }
})

watch(() => props.configuration.selectedCurrency, (newValue, oldValue) => {
  if (newValue.key !== oldValue.key)
    getChartData(props.configuration)
})

watch(chartData, () => {
  addSeriesAndData()
  chart.timeScale().fitContent()
})
</script>

<template>
  <div ref="chartContainer" class="h-[200px]" />
</template>
