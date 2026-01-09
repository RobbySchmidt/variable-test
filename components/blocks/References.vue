<template>
  <div id="firstSection" class="grid grid-cols-1 md:grid-cols-2  scroll-m-16 lg:scroll-m-0 relative z-50">
    <div 
      v-if="references"
      v-for="reference in references"
      class="overflow-hidden group relative">
      <NuxtLink
        v-if="reference.slug"
        :aria-label="'Detailseite für ' + reference.title"
        :to="'projekte' + '/' + reference.slug">
        <div>
          <img
            v-if="reference.image"
            :src="getAssetUrl() + reference.image.id + '?format=avif'" 
            class="block w-full"
            width="952"
            height="662"
            :alt="reference.image.description ? reference.image.description : reference.title">
          <span 
            class="xl:hidden absolute bottom-0 left-0 p-2 flex items-center gap-1 bg-black/80 text-white text-xs">
            zum Projekt
            <ArrowRight class="size-4"/>
          </span>
        </div>
        <div class="absolute text-white hidden xl:grid content-center top-full h-0 group-hover:top-0 group-hover:h-full duration-500 ease-in-out w-full bg-black/80 opacity-0 group-hover:opacity-100">
          <div class="absolute tranistion delay-300 top-full h-0 group-hover:top-1/3 2xl:group-hover:top-1/2 group-hover:h-full duration-500 ease-in-out opacity-0 group-hover:opacity-100 space-y-4 left-12">
            <span
              class="text-f-lg xl:text-f-xl uppercase block w-fit"
              v-if="reference.services && reference.services.length"
              >
              {{ reference.services.slice(0, 2).map(s => s.services_id.name).join(' & ') }}
            </span>
            <div
              class="font-semibold text-f-3xl">
              <h2 
                v-if="reference.title">
                {{ reference.title }}
              </h2>
              <h3 
                v-if="reference.sub_title">
                {{ reference.sub_title }}
              </h3>
            </div>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
  import { ArrowRight } from 'lucide-vue-next'

  const props = defineProps({
    id: String,
    index: Number,
    collection: String
  })

  const { getItems } = useDirectusItems();

  const {
    data: references,
    pendingReferences,
    errorReferences,
  } = await useAsyncData('references', () => {
    return getItems({      
      collection: "references",      
      params: { 
        fields: ['*','image.description', 'image.id', 'services.services_id.name'], 
          filter: {
            show_on_landingpage: {
              _eq: true
          },
        },          
        limit: 8
      },    
    })
  },
  {
    transform: (data) => data
  })

</script>

<style scoped>

</style>