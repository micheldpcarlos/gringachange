import { onMessage, sendMessage } from 'webext-bridge/background'
import type { Tabs } from 'webextension-polyfill'
import { useStorageLocal } from '~/composables/useStorageLocal'

// only on dev mode
if (import.meta.hot) {
  // @ts-expect-error for background HMR
  import('/@vite/client')
  // load latest content script
  import('./contentScriptHMR')
}

browser.runtime.onInstalled.addListener((): void => {
  // eslint-disable-next-line no-console
  console.log('Extension installed')
})

let previousTabId = 0

// communication example: send previous tab title from background page
// see shim.d.ts for type declaration
browser.tabs.onActivated.addListener(async ({ tabId }) => {
  if (!previousTabId) {
    previousTabId = tabId
    return
  }

  let tab: Tabs.Tab

  try {
    tab = await browser.tabs.get(previousTabId)
    previousTabId = tabId
  }
  catch {
    return
  }

  // eslint-disable-next-line no-console
  console.log('previous tab', tab)
  sendMessage('tab-prev', { title: tab.title }, { context: 'content-script', tabId })
})

const startBackgroundAPI = async () => {
  const storage = await useStorageLocal('gringa-prix', { item: 'meu item' })
  const storage2 = await useStorageLocal('gringa-prix', { item: 'meu NEW' })
  // eslint-disable-next-line no-console
  console.log(storage, storage2)

  // await fetch(
  //   `https://economia.awesomeapi.com.br/last/USD-BRL?ts=${Date.now()}`,
  //   {
  //     cache: 'reload',
  //   },
  // ).then(response =>
  //   response.json().then((data) => {
  //     const bidValue = data.USDBRL.bid
  //     browser.action.setBadgeBackgroundColor({ color: 'blue' })
  //     browser.action.setBadgeText({ text: bidValue })
  //   }),
  // )
}

/**
 *  Add initial listeners for both scenarios:
 *  - user installed
 *  - user opened chrome already installed
 */
browser.runtime.onStartup.addListener(() => {
  startBackgroundAPI()
})

browser.runtime.onInstalled.addListener(() => {
  startBackgroundAPI()
})

onMessage('update-currency', async () => {
  // eslint-disable-next-line no-console
  console.log('AAA')
})
