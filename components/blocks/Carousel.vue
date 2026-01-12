<template>
  <div class="container px-4 py-f-24">
    <div class="lg:w-9/12 mx-auto space-y-f-24">
      <h2 class="text-f-xl font-medium">{{ block.title }}</h2>
      <article class="hidden grid-cols-1 gap-12 md:grid rounded-md">
        <div
          v-if="testimonials" 
          v-for="(item, index) in testimonials"
          data-aos="fade-up" 
          :data-aos-delay="index * 200">
          <div class="flex gap-f-12 items-center xl:max-w-[80%]">

            <img
              :src="getAssetUrl() + item.image.filename_disk + '?fit=cover&width=250&height=250&format=auto'"
              :srcset="getAssetUrl() + item.image.filename_disk + '?fit=cover&width=500&height=500&format=auto 2x, ' + 
                        getAssetUrl() + item.image.filename_disk + '?fit=cover&width=250&height=250&format=auto'"
              class="block w-44 h-44 rounded-full"
              width="500"
              height="500">
              <div>
  
                <h3 class="text-primary mb-2">
                  {{ item.name }}<br>
                  {{ item.position }}
                </h3>
                <p class="text-base">
                  {{ item.quote }}
                </p>
              </div>
          </div>
        </div>
      </article>
      <Carousel
        class="w-full md:hidden"
        :opts="{
          align: 'start',
          loop: true,
        }">
        <CarouselContent>
          <CarouselItem 
            v-if="testimonials" 
            v-for="item in testimonials" 
            :key="index" 
            class="pl-1 md:basis-1/2">
            <article class="p-6">
              <img
                :src="getAssetUrl() + item.image.filename_disk + '?fit=cover&width=250&height=250&format=auto'"
                :srcset="getAssetUrl() + item.image.filename_disk + '?fit=cover&width=500&height=500&format=auto 2x, ' + 
                         getAssetUrl() + item.image.filename_disk + '?fit=cover&width=250&height=250&format=auto'"
                class="block w-56 h-56 rounded-full mx-auto"
                width="500"
                height="500">
                <h3 class="text-primary mt-12 mb-2">
                  {{ item.name }}<br>
                  {{ item.position }}
                </h3>
                <p class="text-base">
                  {{ item.quote }}
                </p>
            </article>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious class="text-black"/>
        <CarouselNext class="text-black"/>
      </Carousel>
    </div>
  </div>
</template>

<script setup>
  const { getItems } = useDirectusItems();
  const props = defineProps({
    id: String,
    index: Number,
    collection: String,
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

  const {
    data: testimonials,
    pending: pendingTestimonials,
    error: errorTestimonials,
  } = await useAsyncData('testimonials', () => {
    return getItems({      
      collection: "testimonials",  
        params: {  
          filter: {
            status: {
              _eq: 'published'
            }
          },
          fields: ['*.*'],
        },   
      })
    },
    {
      transform: (data) => data,
    }
  )
</script>