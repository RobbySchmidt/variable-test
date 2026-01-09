<template>
  <div 
    class="container px-4"
    data-aos="fade-up" 
    data-aos-delay="200">
    <div class="mx-auto lg:w-9/12">
      <h3
        v-if="block.title" 
        class="text-f-xl font-medium mb-5">
        {{ block.title }}
        </h3>
        <Carousel 
          class="relative w-full"
          :opts="{
            align: 'start',
            loop: true,
          }"
          @init-api="setApi">
          <CarouselContent>
            <CarouselItem v-for="image in block.images" :key="index">
              <div>
                <Picture
                  v-if="image"
                  type="gallery"
                  :image="image.directus_files_id" />
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
        <div class="flex justify-center gap-2 py-f-12">
          <button 
            v-for="(image, index) in block.images" 
            @click="PagiScroll(index)" 
            :aria-label="'Bild ' + index + 1"
            class="cursor-pointer">
            <span v-if="index == selectedIndexPag">
              <span class="bg-prime ring ring-prime  w-4 h-4 block rounded-full"></span>
            </span>
            <span v-else>
              <span class="ring ring-prime w-4 h-4 block rounded-full"></span>
            </span>
          </button>
        </div>
          <Button
            variant="primary_inverted"
            class="mx-auto"
            as-child>
            <NuxtLink to="/referenzen">
              zur Übersicht
            </NuxtLink>
          </Button> 
      </div>  
    </div> 
</template>



<script setup lang="ts">   
  import type { CarouselApi } from '@/components/ui/carousel'
  const props = defineProps({
      id: String,
      index: Number,
      collection: String
  })

  const { params, path } = useRoute()
  const { getItems, getItemById } = useDirectusItems();

  /* 
  ######################
      Directus Data
  ----------------------
  text
  buttons

  ######################
  */
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
        fields: ['*.*','images','images.directus_files_id.*']
        }            
      })        
    },
    {
    transform: (data) => data,
    }     
  )

  const {
    data: references,
    pending: pendingReferences,
    error: errorReferences,
  } = await useAsyncData('references'+path, () => {
    return getItems({      
      collection: "references",  
        params: { 
          filter: {
            slug: {
              _eq: params.slug[0]
            }
          },      
          fields: ['*.*', 'blocks.item.*', 'blocks.item.images.*', 'blocks.item.images.directus_files_id.*'],
        },   
      })
    },
    {
      transform: (data) => data[0],
    }
  )

  const api = ref<CarouselApi>()

  function setApi(val: CarouselApi) {
    api.value = val
  }

  const selectedIndex = ref(0)
  const dialogOpen = ref(false)

  const selectedIndexPag = ref(0)

  const PagiScroll = (index: Any) => {
   api.value?.scrollTo(index);
  }

  function logSlidesInView(emblaApi) {
    selectedIndexPag.value = emblaApi.selectedScrollSnap();
    
  }

  onMounted(() => {
    if (api.value) 
    api.value.on('select', logSlidesInView)
  })

</script>