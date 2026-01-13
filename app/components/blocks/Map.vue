<template>
  <div class="bg-primary md:mx-8 md:rounded-sm">
    <div class="md:mx-auto xl:max-w-[1100px] 3xl:max-w-[1300px] px-4 md:px-8 xl:px-0 grid lg:grid-cols-2 gap-6 py-f-24 relative">
      <div class="space-y-f-12">
        <div
          class="text-accent font-bold text-f-5xl" 
          v-if="block.title"
          v-html="block.title">
        </div>
  
        <div
          class="text-white text-f-xl max-w-xl"
          v-if="block.text"
          v-html="block.text">
        </div>
      </div>

      <div>
        <img
          v-if="block.image" 
          :src="getAssetUrl() + block.image.id" 
          :alt="block.image.description || ''"
          width="923"
          height="650"
          loading="lazy"
          class="block lg:w-1/2 xl:w-2/3 lg:absolute lg:bottom-1/2 xl:-bottom-12 2xl:-bottom-26 lg:right-4 xl:-right-30 2xl:-right-76">
      </div>
    </div>
  </div>
</template>


<script setup>
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
</script>

<style scoped>

</style>