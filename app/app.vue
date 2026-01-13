<template>
  <div>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<script setup>
  import { useStore } from '@/store/store'

  const store = useStore()

  onMounted(() => {
    store.getStyle()
  })
</script>

<style>
  .page-enter-active,
  .page-leave-active {
    transition: all 0.2s;
  }
  .page-enter-from,
  .page-leave-to {
    opacity: 0;
  }

  .layout-enter-active,
  .layout-leave-active {
    transition: all 0.2s;
  }
  .layout-enter-from,
  .layout-leave-to {
    opacity: 0;
  }
</style>