import type { App } from 'vue'
import 'floating-vue/dist/style.css'
import {
  VTooltip,
} from 'floating-vue'

export function setupApp(app: App) {
  // Inject a globally available `$app` object in template
  app.config.globalProperties.$app = {
    context: '',
  }

  // Provide access to `app` in script setup with `const app = inject('app')`
  app.provide('app', app.config.globalProperties.$app)
  app.directive('tooltip', VTooltip)
}
