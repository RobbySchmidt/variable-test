<script lang="ts" setup>
import { ErrorMessage } from 'vee-validate'
import { type HTMLAttributes, toValue } from 'vue'
import { cn } from '@/lib/utils'
import { useFormField } from './useFormField'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const { name, formMessageId } = useFormField()
</script>

<template>
  <Transition>
    <ErrorMessage
      :id="formMessageId"
      data-slot="form-message"
      as="p"
      :name="toValue(name)"
      :class="cn('text-destructive absolute text-xs pt-0.5  transition-all duration-300', props.class)"
    />
  </Transition>
</template>
