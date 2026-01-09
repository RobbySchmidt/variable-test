<script setup lang="ts">
import type { WithClassAsProps } from './interface'
import { cn } from '@/lib/utils'
import { Button, type ButtonVariants } from '@/components/ui/button'
import { ChevronRight } from 'lucide-vue-next'
import { useCarousel } from './useCarousel'

const props = withDefaults(defineProps<{
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
}
& WithClassAsProps>(), {
  variant: 'outline',
  size: 'icon',
})

const { orientation, canScrollNext, scrollNext } = useCarousel()
</script>

<template>
  <Button
    data-slot="carousel-next"
    variant="ghost"
    :disabled="!canScrollNext"
    :class="cn(
      'absolute size-8',
      orientation === 'horizontal'
        ? 'top-1/3 md:top-1/2 right-0 -translate-y-1/2'
        : '-bottom-12 left-0 -translate-x-1/2 rotate-90',
      props.class,
    )"
    @click="scrollNext"
  >
    <slot>
      <ChevronRight class="size-10"/>
      <span class="sr-only">Next Slide</span>
    </slot>
  </Button>
</template>
