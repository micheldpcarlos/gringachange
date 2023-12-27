<script setup lang="ts">
import { useLocalData } from '~/composables/useLocalData'
const localData = useLocalData()
</script>

<template>
  <main class="w-[300px] h-[600px] px-4 py-5 text-center text-gray-700">
    <select v-model="localData.configuration.value.selectedCurrency" @change="localData.initNewCurrency">
      <option v-for="currency in localData.availableCurrencies" :key="currency.key" :value="currency">
        {{ currency.name }}
      </option>
    </select>
  </main>
</template>
