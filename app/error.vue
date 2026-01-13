<template>
  <div class="min-h-screen bg-cover" :style="{ backgroundImage: `url(${getAssetUrl()}/e06eade1-45a2-4c68-a856-d0b8b2f61335?format=avif)` }">
    <div class="md:mx-auto xl:max-w-[1100px] 3xl:max-w-[1300px] px-4 md:px-8 xl:px-0 min-h-screen flex items-center">
      <div> 
        <h1 class="text-white text-xl font-medium mb-8">
          {{ error?.statusCode }} - Seite nicht gefunden
        </h1>
        <p class="text-f-xl text-white max-w-3xl">
          Leider konnten wir diese Seite nicht finden – vielleicht ist sie in Behandlung? Probiere es über unsere Startseite.
        </p>
        <Button
          @click="handleClearError"
          class="mt-12">
          <span class="group-hover:-translate-x-2 duration-300 ease-in-out">
            Zur Startseite
          </span>
          <MoveRight class="size-6 stroke-1 opacity-0 translate-x-[-8px] 
            transition-all duration-300 ease-in-out 
            group-hover:opacity-100 group-hover:translate-x-0"/>
        </Button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { NuxtError } from '#app'
import { MoveRight } from 'lucide-vue-next'

  const props = defineProps({
    error: Object as () => NuxtError
  })
  
  const handleClearError = () => clearError({ redirect: '/' })
</script>
