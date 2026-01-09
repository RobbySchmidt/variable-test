<template>
  <div class="bg-white"
    data-aos="fade-up" 
    data-aos-delay="200">
    <div class="container px-4 pt-f-24"
      :class="{ 'pb-f-24': block.paddingBottom }">
      <div class="lg:w-9/12 mx-auto space-y-f-6 text-f-lg font-medium text-black"
        :class="path === '/impressum' || path === '/datenschutz' ? 'legal-pages' : ''">
        <div
          v-if="block.text"
          v-html="formatText(block.text)">
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
  const { path } = useRoute()
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