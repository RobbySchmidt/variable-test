<template>
  <article class="bg-background rounded-sm flex flex-col justify-between h-full px-4 md:px-8 py-8">
    <div class="mb-10">
      <h3 
        v-if="title" 
        class="font-bold text-f-3xl max-w-xl mb-10">
        {{ title }}
        <span class="text-base font-normal block mt-2">(m/w/d)</span>
      </h3>
      <ul class="inline-flex flex-wrap border-y-2 border-accent-secondary py-2 px-1.5 w-full" aria-label="Standorte">
        <li 
          v-if="locations" 
          v-for="(location, index) in locations">
            {{ location.locations_id.title }}
            <template v-if="index+1 < locations.length">,&nbsp;</template>
        </li>
      </ul>
    </div>
    <Button
      as-child>
      <NuxtLink
        :aria-label="'alle Leistungen ansehen'" 
        :to="`karriere/${slug}`"
        >
        <span class="group-hover:-translate-x-2 duration-300 ease-in-out">
          Stelle ansehen
        </span>
        <MoveRight class="size-6 stroke-1 opacity-0 -translate-x-2 
          transition-all duration-300 ease-in-out 
          group-hover:opacity-100 group-hover:translate-x-0"/>
      </NuxtLink>
    </Button>
  </article>
</template>

<script setup>
  import { MoveRight } from 'lucide-vue-next'

  const props = defineProps({
    title: String,
    slug: String,
    locations: Array,
    keyfacts: Object
  })
</script>