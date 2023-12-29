<script setup lang="ts">
import type { PageMode } from '~/types'

const props = defineProps<{
  modelValue: PageMode
}>()

const emit = defineEmits<{
  'update:modelValue': [mode: PageMode]
}>()

interface ModeItem { mode: PageMode; title: string }
const items: ModeItem[] = [
  { mode: 'chart', title: 'Gráfico' },
  { mode: 'simulate', title: 'Simular' },
  { mode: 'alerts', title: 'Alertas' },
  { mode: 'more', title: 'Mais' },
]

const onPageModeChange = (mode: PageMode) => {
  if (props.modelValue === mode)
    return
  emit('update:modelValue', mode)
}
</script>

<template>
  <div
    class="grid w-full grid-cols-3 h-8 items-center justify-center rounded-md bg-coolgray-100 p-1 grid w-full grid-cols-4"
  >
    <button
      v-for="item in items" :key="item.mode"
      class="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-2 py-1 text-xs font-medium transition-all"
      :class="{ 'color-coolgray-800 bg-white shadow-sm': modelValue === item.mode, 'color-coolgray-400 hover:color-coolgray-800': modelValue !== item.mode }"
      @click="onPageModeChange(item.mode)"
    >
      {{ item.title }}
    </button>
  </div>
</template>
