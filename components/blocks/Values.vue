<template>
  <div class="bg-white">
    <div class="container px-4">    
      <div
        class="lg:w-9/12 mx-auto space-y-f-12 py-f-24">        
        <h2
          v-if="block.title"
          class="text-f-xl font-medium">
          {{ block.title }}
        </h2>
        <div class="grid md:grid-cols-2 2xl:grid-cols-3 gap-4">
          <div  
            v-if="block.content" 
            v-for="(value, index) in block.content"
            data-aos="fade-up" 
            :data-aos-delay="index * 200">
            <div class="bg-primary text-white p-4 space-y-36">
              <div
                v-if="value.title" 
                v-html="value.title"
                class="text-f-xl min-h-24">
  
              </div>
              <div
                v-if="value.description" 
                v-html="value.description">
  
              </div>
            </div>
          </div>
        </div>
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