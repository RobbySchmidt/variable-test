<template>
  <div id="firstSection" class="scroll-mt-16 lg:scroll-mt-0 bg-white">
    <div class="container px-4">
      <div class="lg:w-9/12 mx-auto pt-f-32 bg-white">
        <img 
          v-if="block.image"
          :src="getAssetUrl() + block.image.filename_disk + '?format=avif'"
          width="1280"
          height="854"
          class="block w-full aspect-[16/10] object-cover object-bottom" 
          :alt="block.image.description ? block.image.description : block.image.title">
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