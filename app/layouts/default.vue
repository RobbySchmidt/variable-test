<template>
  <div class="min-h-screen transition duration-150 focus:outline-2 focus:outline-primary">
    <Header/>
    <main> <slot /></main>
    <ScrollToTop><ArrowUp class="text-white text-f-lg"/></ScrollToTop>  
    <Footer/>
    <DevOnly>
      <DevToolbar/>
    </DevOnly>
  </div>
</template>
<script setup>
  import { ArrowUp } from 'lucide-vue-next'
</script>
