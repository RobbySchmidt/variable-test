<template>
  <div class="mx-4 md:mx-8 xl:mx-auto rounded-sm my-f-12 bg-background xl:max-w-[1100px] 3xl:max-w-[1300px] py-f-20 px-4 md:px-8 xl:px-f-24">
    <h2 
      v-if="block.title"
      class="font-bold text-f-5xl">
      {{ block.title }}
    </h2>

    <div 
      v-if="medicalFields" 
      v-for="field in medicalFields" 
      :key="field.id">
      <div v-if="field.downloads && field.downloads.length > 0">
        <h3 
          v-if="field.field"
          class="font-bold text-f-2xl mb-6 mt-12">
          {{ field.field }}
        </h3>

        <div class="grid md:grid-cols-2 gap-12">
          <div 
            v-for="(group, gIndex) in chunkDownloads(field.downloads, 3)" 
            :key="gIndex">
            <ul class="border-b-2 border-accent-secondary">
              <li v-for="(file, index) in group" 
                  :key="index"
                  class="border-t-2 border-accent-secondary">
                <NuxtLink 
                  v-if="file.directus_files_id"
                  target="_blank"
                  :href="getAssetUrl() + file.directus_files_id.filename_disk"
                  class="px-2 py-3 flex justify-between items-center font-medium">
                  {{ file.directus_files_id.title }}
                  <Download/>                                                  
                </NuxtLink> 
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { Download } from 'lucide-vue-next'
  const props = defineProps({
    id: String,
    index: Number,
    collection: String
  })

  const { getItemById, getItems } = useDirectusItems();
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

  const {
    data: medicalFields,
    pendingReferences,
    errorReferences,
  } = await useAsyncData('medicalFieldsDownloads', () => {
    return getItems({      
      collection: "medicalFields",      
      params: { 
        fields: ['*', '*.*', 'downloads.directus_files_id.*'],
      },    
    })
  },
  {
    transform: (data) => data
  })

  const chunkDownloads = (arr, size) => {
    const result = []
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size))
    }
    return result
  }
</script>