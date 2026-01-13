<template>
  <header class="mx-auto xl:max-w-[1100px] 3xl:max-w-[1300px] xl:mt-f-12 xl:rounded-sm grid lg:gap-f-12 lg:grid-cols-12 bg-secondary items-center">
    <div 
      class="lg:col-span-5 bg-primary h-full bg-cover place-content-end xl:rounded-bl-sm xl:rounded-tl-sm xl:rounded-br-none" 
      :style="{backgroundImage: `url(${getAssetUrl() + 'f3f52fb3-d9ab-43d9-8b26-3d7c351968b2'})`}">
      <img
        v-if="block.image"
        :src="getAssetUrl() + block.image.id"
        alt=""
        with="160"
        height="150"
        class="block w-1/2 lg:w-[85%] xl:w-[75%] -mt-12 mx-auto lg:-ml-12">
    </div>
    <div class="lg:col-span-7 py-f-20 order-first lg:order-last px-4 md:px-8 lg:pl-0">
      <h1 class="text-f-5xl font-bold max-w-3xl mb-f-8">
        {{ block.title }}
      </h1>
      <div
        v-if="block.text"
        v-html="block.text"
        class="max-w-lg text-f-xl mb-0">
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