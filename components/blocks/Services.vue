<template>
  <div class="container py-f-16 px-4">
    <div class="lg:w-9/12 mx-auto">
      <div class="grid md:grid-cols-2 space-x-7 mx-auto space-y-f-24">
        <div
          class="custom-content [&>h3]:mb-2" 
          v-for="(service, index) in services" 
          data-aos="fade-up" 
          :data-aos-delay="index * 200"
          v-html="service.text">
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

  const { path } = useRoute()
  const { getItemById } = useDirectusItems();
  const { getItems } = useDirectusItems();
  
  /* 
  ######################
      Directus Data
  ----------------------
  text
  buttons

  ######################
  */

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
    data: services,
    pending: pendingServices,
    error: errorServices,
  } = await useAsyncData('services'+path, () => {
      return getItems({      
        collection: "services",      
        params: {             
          fields: ['*.*'],             
        },    
      })
    },
    {
      transform: (data) => data,
    }     
  )
</script>