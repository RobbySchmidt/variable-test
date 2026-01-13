<template>
  <div class="columns mt-f-24"> 
    <div class="bg-primary py-f-12 px-f-12 text-white custom-content rounded" 
      v-if="block.content"
      v-html="block.content">
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