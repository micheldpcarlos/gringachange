<script setup lang="ts">
defineProps<{
  title: string
}>()

defineEmits(['click'])
</script>

<template>
  <div class="relative">
    <button class="absolute right-0 text-gray-600 hover:text-gray-900 text-lg" @click="$emit('click')">
      <slot name="icon" />
    </button>
    <h1 class="text-xl font-bold text-left  text-gray-700">
      {{ title }}
    </h1>
  </div>
</template>

<style scoped></style>
