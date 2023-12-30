<script setup lang="ts">
import CurrencyChart from '../CurrencyChart.vue'
import HeaderWithButton from '../HeaderWithButton.vue'
import PageModeToggle from '../PageModeToggle.vue'
import { useLocalData } from '~/composables/useLocalData'
defineEmits(['showSettings'])

const { configuration, currentCurrencyData, bidValueAfterTaxes } = useLocalData()
</script>

<template>
  <div class="p-2 h-100%">
    <HeaderWithButton title="GringaChange" @click="$emit('showSettings')">
      <template #icon>
        <mdi:cog-outline />
      </template>
    </HeaderWithButton>
    <div class="mt-4">
      <div class="w-full mb-6">
        <div class="text-small text-gray-600">
          1 {{ configuration.selectedCurrency.name }} igual a
        </div>
        <div class="text-5xl font-bold text-left  text-gray-700">
          R$ {{ currentCurrencyData.bid }}
        </div>
        <div class="text-xs text-gray-500">
          R$ <span class="font-bold">{{ bidValueAfterTaxes.toFixed(4) }}</span> depois das taxas
          <material-symbols:info-outline
            v-tooltip.top="'Você pode definir as taxas em configurações'"
            class="inline-block select-none"
          />
        </div>
      </div>
      <PageModeToggle v-model="configuration.pageMode" />
      <CurrencyChart v-if="configuration.pageMode === 'chart'" :configuration="configuration" />
    </div>
  </div>
</template>
