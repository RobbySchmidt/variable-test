<template>
    <Transition>
        <NuxtLink @click="scrollTop" role="button" v-if="scrollToTopActive" aria-label="zum Seitenanfang scrollen" ref="scrollTopButton" 
        class="fixed z-30 flex items-center justify-center w-12 h-12 text-4xl text-black transition drop-shadow-xl bg-black bottom-5 right-5 hover:drop-shadow-xl lg:cursor-pointer"><slot /></NuxtLink>
    </Transition>
</template>
<script setup lang="ts">
  const scrollTop = () => {
    window.scrollTo(0, 0)
  }

  import { useWindowScroll } from "@vueuse/core";

  const scrollToTopActive = ref(false)

  const { y } = useWindowScroll(window);
 
  watch(y, (value) => {
    if(value > 0)
    {
        scrollToTopActive.value = true
    }else{
        scrollToTopActive.value = false
    }    
  });
</script>
<style>
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease;
  }
  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
</style>
