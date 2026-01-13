<template>
  <header class="bg-primary columns py-f-32">
    <div>
      <div 
        v-if="block.title"
        v-html="block.title"
        class="[&>h1]:font-medium [&>h1]:text-f-5xl md:[&>h1]:text-f-6xl [&>h1]:mb-f-12 text-f-2xl font-medium [&>h1]:text-white">
      </div>
      <div>
        <img
          v-if="block.image"
          :src="getAssetUrl() + block.image.id"
          width="1410"
          height="602"
          :alt="block.image.description || ''"
          class="block w-full"/>
      </div>
    </div>
  </header>
</template>

<script setup>
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