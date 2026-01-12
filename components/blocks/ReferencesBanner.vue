<template>
  <div 
    class="relative py-f-24 px-12 bg-primary-400">
    <div class="container">
      <div class="xl:w-9/12 mx-auto space-y-f-12">
        <h2
          class="text-f-xl text-primary-gray"
          v-if="block.title">
          {{ block.title }}
        </h2>
        <div 
          class="grid grid-cols-2 lg:grid-cols-4 gap-f-12">
          <div
            v-if="references" 
            v-for="icon in references">
            <img
              v-if="icon.icon"
              crossorigin 
              :src="getAssetUrl() + icon.icon"
              class="aspect-video w-full"
              :alt="icon.customer ? icon.customer : icon.title">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import References from './References.vue';

  const props = defineProps({
    id: String,
    index: Number,
    collection: String
  })

  const { getItems } = useDirectusItems();
  const { getItemById } = useDirectusItems()
    const {
      data: block,
      pending: pendingBlock,
      error: errorBlock,
    } = await useAsyncData(
      'block' + props.collection + props.id,
      () => {
        return getItemById({
          collection: props.collection,
          id: props.id,
          params: {
            fields: ['*.*'],
          },
        })
      },
      {
        transform: (data) => data,
      }
    )

  const {
    data: references,
    pendingReferences,
    errorReferences,
  } = await useAsyncData('referencesBanner', () => {
    return getItems({      
      collection: "references",      
      params: { 
        filter: {
          show_icon_in_banner: {
            _eq: true
        }
      },    
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