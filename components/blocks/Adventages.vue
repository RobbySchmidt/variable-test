<template>
  <div class="bg-secondary-400">
    <div class="container px-4 py-f-24">
      <div class="lg:w-9/12 mx-auto space-y-f-24">
        <div
          v-if="block.title"
          v-html="formatText(block.title)"
          class="text-prime text-f-xl font-medium">
        </div>

        <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-f-12 text-f-lg">
          <div 
            v-if="adventages" 
            v-for="(adv, index) in adventages"
            data-aos="fade-up" 
            :data-aos-delay="index * 200">
            <img
              v-if="adv.icon" 
              class="w-20 lg:w-24 h-20 lg:h-24 block mx-auto mb-f-6" 
              :src="getAssetUrl() + adv.icon" 
              alt="">
              <span 
                v-if="adv.title" 
                class="block w-fit mx-auto text-prime">
                {{ adv.title }}
              </span>
              <div 
                v-if="adv.description" 
                v-html="adv.description"
                class="text-center">
              </div>
          </div>
        </div>
      </div>
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

  const { path } = useRoute()

  const { getItemById } = useDirectusItems();
  const { getItems } = useDirectusItems();

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
    data: adventages,
    pendingReferences,
    errorReferences,
  } = await useAsyncData('adventages', () => {
    return getItems({      
      collection: 'adventages',      
      params: { 
        fields: ['*'],
      },    
    })
  },
  {
    transform: (data) => data
  })


</script>

<style scoped>

</style>