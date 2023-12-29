<script setup lang="ts">
import HeaderWithButton from '../HeaderWithButton.vue'
import { useLocalData } from '~/composables/useLocalData'

defineEmits(['closeSettings'])

const localData = useLocalData()
</script>

<template>
  <div class="p-2 absolute top-0 left-0 w-100% h-100% bg-white">
    <HeaderWithButton title="Configurações" @click="$emit('closeSettings')">
      <template #icon>
        <material-symbols:close />
      </template>
    </HeaderWithButton>

    <select v-model="localData.configuration.value.selectedCurrency" @change="localData.initNewCurrency">
      <option v-for="currency in localData.availableCurrencies" :key="currency.key" :value="currency">
        {{ currency.name }}
      </option>
    </select>
  </div>
</template>
