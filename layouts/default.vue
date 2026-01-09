<template>
  <div class="min-h-screen transition duration-150 focus:outline-2 focus:outline-primary">
    <WebsiteHeader />
    <div> <slot /></div>
    <ScrollToTop><ArrowUp class="text-white text-f-lg"/></ScrollToTop>  
    <WebsiteFooter />  
    <DevOnly>
      <DevToolbar />
    </DevOnly>
  </div>
</template>
<script setup>
  import { ArrowUp } from 'lucide-vue-next'
  import { useStore } from '../store/store'

  const store = useStore()

  onMounted(() => {
    store.getStyle()
  })

  console.log(store.style)
</script>
