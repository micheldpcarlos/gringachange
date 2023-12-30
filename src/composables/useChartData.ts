import type { Configuration, CurrencyData } from '~/types'

const parseCurrencyData = (data: any): Partial<CurrencyData> => {
  return {
    high: Number(data.high),
    low: Number(data.low),
    varBid: Number(data.varBid),
    pctChange: Number(data.pctChange),
    bid: Number(data.bid),
    ask: Number(data.ask),
    timestamp: Number(data.timestamp),
  }
}

const formatBadgeText = (number: number) => number.toFixed(2).toString()

export const useChartData = () => {
  const loading = ref(true)
  const chartData = ref<Partial<CurrencyData>[]>()

  const getChartData = async (configuration: Configuration) => {
    loading.value = true
    try {
      const response = await fetch(
        `https://economia.awesomeapi.com.br/json/daily/${configuration.selectedCurrency.key}-BRL/360`,
        {
          cache: 'reload',
          redirect: 'follow',
          headers: {
            Accept: 'application/json',
          },
        },
      )

      const data = await response.json()

      chartData.value = data.map(parseCurrencyData)
    }
    catch (error) {
      console.warn('Error while getting the latest data!')
      console.warn(error)
    }
    finally {
      loading.value = false
    }
  }

  return { getChartData, loading, chartData }
}
