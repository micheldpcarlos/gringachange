import { useCurrencyData } from '~/composables/useCurrencyData'
import { useLocalData } from '~/composables/useLocalData'

// only on dev mode
if (import.meta.hot) {
  // @ts-expect-error for background HMR
  import('/@vite/client')
  // load latest content script
  import('./contentScriptHMR')
}

const currencyData = useCurrencyData()
const localData = useLocalData()

/**
 *  Add initial listeners for both scenarios:
 *  - user installed
 *  - user opened chrome already installed
*/
browser.runtime.onStartup.addListener(() => currencyData.initInterval(localData.configuration.value))
browser.runtime.onInstalled.addListener(() => currencyData.initInterval(localData.configuration.value))

browser.runtime.onMessage.addListener(({ id, data }) => {
  if (id === 'currency-changed')
    currencyData.initInterval(data)
})
