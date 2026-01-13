<template>
  <div class="md:mx-auto xl:max-w-[1100px] 3xl:max-w-[1300px] px-4 md:px-8 xl:px-0 space-y-f-12 py-f-20">
    <h2 
      v-if="block.title"
      class="font-bold text-f-4xl 2xl:text-f-5xl">
      {{ block.title }}
    </h2>

    <nav aria-label="Standortnavigation">
      <ul class="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        <li
          v-if="locations"
          v-for="location in locations" 
          :key="location.slug"
          >
          <NuxtLink
            :to="'/standorte/' + location.slug"
            class="space-y-4 ">
            <DirectionAwareHover
              :location="location"
              class="shadow-lg ring-1 ring-gray-200 dark:ring-gray-800 relative">
            </DirectionAwareHover>
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
  
  const props = defineProps({
    id: String,
    index: Number,
    collection: String
  })

  const { getItems, getItemById } = useDirectusItems();

  const {
    data: block,
    pending: pendingBlock,
    error: errorBlock,
  } = await useAsyncData(
    'block'+ props.collection + props.id,
    () => {
      return getItemById({      
        collection: props.collection,      
        id: props.id,
        params: {   
          fields: ['*.*']
        }
      })
    },
    {
      transform: (data) => data,
    }     
  ) 

  const {
    data: locations,
    pendingLocations,
    errorLocations,
  } = await useAsyncData('locations', () => {
    return getItems({      
      collection: "locations",      
      params: { 
        fields: ['*', '*.*'],
      },    
    })
  },
  {
    transform: (data) => data
  })
</script>

<style scoped>

</style>