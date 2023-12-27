import { useWebExtensionStorage } from './useWebExtensionStorage'
import type { Configuration, Currency, CurrencyData } from '~/types'

const availableCurrencies: Currency[] = [
  { key: 'USD', name: 'Dólar Americano', icon: 'openmoji:flag-united-states' },
  { key: 'EUR', name: 'Euro', icon: 'openmoji:flag-european-union' },
  { key: 'GBP', name: 'Libra Esterlina', icon: 'openmoji:flag-united-kingdom' },
  { key: 'CAD', name: 'Dólar Canadense', icon: 'openmoji:flag-canada' },
  { key: 'ARS', name: 'Peso Argentino', icon: 'openmoji:flag-argentina' },
  { key: 'JPY', name: 'Iene Japonês', icon: 'openmoji:flag-japan' },
  { key: 'CHF', name: 'Franco Suíço', icon: 'openmoji:flag-switzerland' },
  { key: 'AUD', name: 'Dólar Australiano', icon: 'openmoji:flag-australia' },
  { key: 'CNY', name: 'Yuan Chinês', icon: 'openmoji:flag-china' },
]

const LOCAL_STORAGE_KEY = 'gringa-change'
const LOCAL_STORAGE_DATA_KEY = 'gringa-change-data'

const defaultConfig: Configuration = {
  selectedCurrency: availableCurrencies[0],
}

const defaultCurrencyData: CurrencyData = {
  ask: 0,
  bid: 0,
  code: '',
  codein: '',
  create_date: new Date(),
  high: 0,
  low: 0,
  name: '',
  pctChange: 0,
  timestamp: 0,
  varBid: 0,
}

export const useLocalData = () => {
  const configuration = useWebExtensionStorage<Configuration>(LOCAL_STORAGE_KEY, defaultConfig)
  const currentCurrencyData = useWebExtensionStorage<CurrencyData>(LOCAL_STORAGE_DATA_KEY, defaultCurrencyData)

  const initNewCurrency = () => {
    browser.action.setBadgeText({ text: '  ...  ' })
    browser.runtime.sendMessage({ id: 'currency-changed', data: configuration.value })
  }

  return { configuration, currentCurrencyData, availableCurrencies, initNewCurrency }
}
