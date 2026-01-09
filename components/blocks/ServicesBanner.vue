<template>
  <div 
    class="relative py-f-36 px-12 bg-white" ref="sectionRef">
    <div class="container">
      <div class="xl:w-9/12 mx-auto space-y-f-12">
        <div 
          class="grid md:grid-cols-2 lg:grid-cols-4 gap-f-12">
          <div
            v-if="services" 
            v-for="icon in services">
            <img
              v-if="icon.image"
              :src="getAssetUrl() + icon.image"
              class="aspect-square w-28"
              :alt="icon.name">
            <span
              v-if="icon.name" 
              class="text-f-lg font-semibold mb-3 block">
              {{ icon.name }}
            </span>
            <div
              v-if="icon.content"
              v-html="formatText(icon.content)">
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

  const { getItems } = useDirectusItems();

  const {
    data: services,
    pendingServices,
    errorServices,
  } = await useAsyncData('servicesBanner', () => {
    return getItems({      
      collection: "services",      
      params: { 
        filter: {
          show_in_banner: {
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