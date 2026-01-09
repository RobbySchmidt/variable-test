<template>
  <div class="bg-second relative pt-f-24"
    :class="block.padding_bottom ? 'pb-f-24' : ''">
    <div class="container p-4">
      <div class="lg:w-9/12 mx-auto grid xl:grid-cols-2 gap-f-12 items-start">
        <div 
          v-if="block.image" 
          :class=" block.imageRight && index == 0 ? 'order-last' : block.imageRight ? 'xl:order-last' : '' "
          data-aos="fade-up" 
          :data-aos-delay="block.imageRight ? 400 : 200">
          <Picture
            v-if="block.image"
            type="column"
            :image="block.image" />
        </div>
        <div class="space-y-5"
        data-aos="fade-up" 
        :data-aos-delay="block.imageRight ? 200 : 400">
          <div class="space-y-5 [&>h3]:text-f-xl [&>h3]:font-medium [&>h3]:text-acc"
            :class="path === '/karriere' ? 'custom-content' : ''" 
            v-if="block.text"
            v-html="block.text">
          </div>
          <Button as-child
            variant="primary_inverted"
            size="sm">
            <NuxtLink
              v-if="block.buttons"
              v-for="button in block.buttons"
              :aria-label="'alle Leistungen ansehen'" 
              :to="button.url">
              {{ button.label }}
            </NuxtLink>
          </Button>
        </div>
      </div>
    </div>
    <pre>{{ store.style }}</pre>
  </div>
</template>

<script setup>
  const props = defineProps({
    id: String,
    index: Number,
    collection: String
  })

  import { useStore } from '../store/store'

  const store = useStore()

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