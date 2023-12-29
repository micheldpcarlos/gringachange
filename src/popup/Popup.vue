<script setup lang="ts">
import Settings from '~/components/pages/Settings.vue'
import Home from '~/components/pages/Home.vue'

const showSettings = ref(false)

// const clickTest = () => {
//   browser.runtime.sendMessage({ id: 'alert' })
// }
</script>

<template>
  <main class="w-[300px] h-[400px]">
    <!-- <button @click="clickTest">
      ALERTA
    </button> -->
    <Home @show-settings="showSettings = true" />

    <Transition>
      <Settings v-show="showSettings" @close-settings="showSettings = false" />
    </Transition>
  </main>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
