<template>
  <div class="columns py-f-24">
    <div 
      v-if="block.content"
      v-html="block.content"
      class="max-w-4xl">
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

<style lang="scss" scoped>

</style>