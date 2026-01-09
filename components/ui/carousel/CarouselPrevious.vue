<script setup lang="ts">
import type { WithClassAsProps } from './interface'
import { cn } from '@/lib/utils'
import { Button, type ButtonVariants } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-vue-next'
import { useCarousel } from './useCarousel'

const props = withDefaults(defineProps<{
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
}
& WithClassAsProps>(), {
  variant: 'outline',
  size: 'icon',
})

const { orientation, canScrollPrev, scrollPrev } = useCarousel()
</script>

<template>
  <Button
    data-slot="carousel-previous"
    variant="ghost"
    :disabled="!canScrollPrev"
    :class="cn(
      'absolute size-8',
      orientation === 'horizontal'
        ? 'top-1/3 md:top-1/2 -left-4 -translate-y-1/2'
        : '-top-12 left-0 -translate-x-1/2 rotate-90',
      props.class,
    )"
    @click="scrollPrev"
  >
    <slot>
      <ChevronLeft class="size-10"/>
      <span class="sr-only">Previous Slide</span>
    </slot>
  </Button>
</template>
