<script setup lang="ts">
const openOptionsPage = async () => {
  // browser.runtime.openOptionsPage()
  browser.action.setBadgeBackgroundColor({ color: 'purple' })
  browser.action.setBadgeText({ text: 'AI PAI' })
}
</script>

<template>
  <main class="w-[300px] px-4 py-5 text-center text-gray-700">
    <a class="btn icon-btn" @click="openOptionsPage"> BADGE </a>
  </main>
</template>
