<template>
  <div class="columns-offset">
    <div class="py-f-24 space-y-4">
      <div 
        class="text-f-xl font-medium"
        v-if="block.title"
        v-html="block.title">
  
      </div>
      <Carousel 
        class="relative w-full" 
        @init-api="setApi"
        :opts="{
          align: 'start',
          loop: true,
        }">
        <CarouselContent>
          <CarouselItem v-for="image in block.images" :key="index" class="basis-[60%]">
            <div class="p-1">
              <img :src="getAssetUrl() + image.directus_files_id" alt="">
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
  
      <div class="py-2 text-center text-sm">
        Bild {{ current }} von {{ totalCount }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { CarouselApi } from '@/components/ui/carousel'
  import { watchOnce } from '@vueuse/core'

  const props = defineProps({
    id: String,
    index: Number,
    collection: String
  })

  const { getItemById } = useDirectusItems();

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

  console.log(block.value)

  const api = ref<CarouselApi>()
  const totalCount = ref(0)
  const current = ref(0)

  function setApi(val: CarouselApi) {
    api.value = val
  }

  watchOnce(api, (api) => {
    if (!api)
      return

    totalCount.value = api.scrollSnapList().length
    current.value = api.selectedScrollSnap() + 1

    api.on('select', () => {
      current.value = api.selectedScrollSnap() + 1
    })
  })
</script>