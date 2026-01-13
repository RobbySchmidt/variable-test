<template>
  <div class="columns">
    <div class="py-f-4 space-y-f-20">
      <div class="lg:mx-auto">
        <div 
          v-if="block.title"
          v-html="block.title"
          class="font-bold text-f-4xl [&>h1]:2xl:text-f-6xl">
        </div>
      </div>
     
      <div class="mx-auto grid lg:grid-cols-2 gap-f-24 items-center">
        <div 
          v-if="block.image" 
          :class=" block.imageRight && index == 0 ? 'order-last' : block.imageRight ? 'xl:order-last' : '' "
          data-aos="fade-up" 
          :data-aos-delay="block.imageRight ? 400 : 200">
          <template v-if="block.image.type == 'image/svg+xml'">
            <img
              v-if="block.image"
              :src="getAssetUrl() + block.image.filename_disk"
              width="5267"
              height="3883"
              :alt="block.image.description || ''"
              loading="lazy"
              class="block w-full rounded overflow-hidden"/>
          </template>
          <template v-else>
            <NuxtPicture
              v-if="block.image"
              provider="directus"
              :src="block.image.id"
              format="avif,webp"
              width="1024"
              height="768"
              sizes="sm:100vw lg:50vw"
              :alt="block.image.description || ''"
              loading="lazy"
              class="block w-full rounded overflow-hidden"
            />
          </template>
        </div>
        <div class="space-y-f-12"
        data-aos="fade-up" 
        :data-aos-delay="block.imageRight ? 200 : 400">
          <div class="max-w-lg 2xl:max-w-xl text-f-lg"
            v-if="block.text"
            v-html="block.text">
          </div>
        
          <Button
            as-child>
            <NuxtLink
              v-if="block.buttons"
              v-for="button in block.buttons"
              :aria-label="'alle Leistungen ansehen'" 
              :to="button.url"
             >
               {{ button.label }}
            </NuxtLink>
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { MoveRight } from 'lucide-vue-next'
  const props = defineProps({
    id: String,
    index: Number,
    collection: String
  })

  const { getItemById } = useDirectusItems();
  const { path } = useRoute()

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
</script>