import { useLocalData } from './useLocalData'
import type { Configuration, CurrencyData } from '~/types'

const parseCurrencyData = (data: any): CurrencyData => {
  return {
    ask: Number(data.ask),
    bid: Number(data.bid),
    code: data.code,
    codein: data.codein,
    create_date: new Date(data.create_date),
    high: Number(data.high),
    low: Number(data.low),
    name: data.name,
    pctChange: Number(data.pctChange),
    timestamp: Number(data.timestamp),
    varBid: Number(data.varBid),
  }
}

const formatBadgeText = (number: number) => number.toFixed(2).toString()

export const useCurrencyData = () => {
  const { currentCurrencyData } = useLocalData()
  const interval = ref()

  // API DOCS: https://docs.awesomeapi.com.br/api-de-moedas
  const getCurrencyData = async (configuration: Configuration) => {
    try {
      const response = await fetch(
        `https://economia.awesomeapi.com.br/last/${configuration.selectedCurrency.key}-BRL`,
        {
          cache: 'reload',
          redirect: 'follow',
          headers: {
            Accept: 'application/json',
          },
        },
      )

      const data = await response.json()

      currentCurrencyData.value = parseCurrencyData(data[`${configuration.selectedCurrency.key}BRL`])
      browser.action.setBadgeText({ text: formatBadgeText(currentCurrencyData.value.bid) })
    }
    catch (error) {
      console.warn('Error while getting the latest data!')
      console.warn(error)
    }
  }

  const initInterval = async (configuration: Configuration) => {
    // clear any previous interval (centralized via background)
    clearInterval(interval.value)

    // get the currency before setting the interval
    await getCurrencyData(configuration)

    // interval to get new values, 31s to avoid 30s cache imposed by the free api
    const GET_INTERVAL_MS = 31_000
    interval.value = setInterval(() => getCurrencyData(configuration), GET_INTERVAL_MS)
  }

  return { initInterval }
}
