<script setup lang="ts">
const showTailwindBreakpoints = ref(true)
</script>
<template>
  <div v-if="showTailwindBreakpoints" class="fixed top-0 left-0 z-50 m-5">
    <!-- Tailwind Breakpoints  -->
    <div
      class="flex items-center justify-center font-mono text-xs text-white bg-gray-700 rounded-full w-7 h-7 sm:bg-pink-500 md:bg-orange-500 lg:bg-purple-500 xl:bg-red-500 2xl:bg-green-500 3xl:bg-cyan-500"
    >
      <div class="block sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden 3xl:hidden">--</div>
      <div class="hidden sm:block md:hidden lg:hidden xl:hidden 2xl:hidden 3xl:hidden">sm</div>
      <div class="hidden sm:hidden md:block lg:hidden xl:hidden 2xl:hidden 3xl:hidden">md</div>
      <div class="hidden sm:hidden md:hidden lg:block xl:hidden 2xl:hidden 3xl:hidden">lg</div>
      <div class="hidden sm:hidden md:hidden lg:hidden xl:block 2xl:hidden 3xl:hidden">xl</div>
      <div class="hidden sm:hidden md:hidden lg:hidden xl:hidden 2xl:block 3xl:hidden">2xl</div>
      <div class="hidden sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden 3xl:block">3xl</div>
    </div>
  </div>
</template>
