import type { App } from 'vue'
import 'floating-vue/dist/style.css'
import {
  VTooltip,
} from 'floating-vue'

export function setupApp(app: App) {
  app.provide('app', app.config.globalProperties.$app)
  app.directive('tooltip', VTooltip)
}
