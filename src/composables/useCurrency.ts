const availableCurrencies = [
  { key: 'USD-BRL', name: 'Dólar Americano', icon: 'openmoji:flag-united-states' },
  { key: 'EUR-BRL', name: 'Euro', icon: 'openmoji:flag-european-union' },
  { key: 'CAD-BRL', name: 'Dólar Canadense', icon: 'openmoji:flag-canada' },
  { key: 'GBP-BRL', name: 'Libra Esterlina', icon: 'openmoji:flag-united-kingdom' },
  { key: 'ARS-BRL', name: 'Peso Argentino', icon: 'openmoji:flag-argentina' },
  { key: 'JPY-BRL', name: 'Iene Japonês', icon: 'openmoji:flag-japan' },
  { key: 'CHF-BRL', name: 'Franco Suíço', icon: 'openmoji:flag-switzerland' },
  { key: 'AUD-BRL', name: 'Dólar Australiano', icon: 'openmoji:flag-australia' },
  { key: 'CNY-BRL', name: 'Yuan Chinês', icon: 'openmoji:flag-china' },
]

// const getSelectedCurrency

export const useCurrency = () => {
  return { availableCurrencies }
}
