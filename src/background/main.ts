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

browser.runtime.onMessage.addListener(async ({ id, data }) => {
  if (id === 'currency-changed')
    currencyData.initInterval(data)

  if (id === 'alert') {
    const id = await browser.notifications.create(
      'Example',
      {
        type: 'basic',
        iconUrl: browser.runtime.getURL('./assets/icon-512.png'),
        title: 'titleee',
        message: 'Message nice!',
      },
    )

    setTimeout(() => {
      browser.notifications.clear(id)
    }, 5000)
  }
})
