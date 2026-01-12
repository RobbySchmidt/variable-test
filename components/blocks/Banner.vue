<template>
  <div 
    v-if="block.image"
    :class="block.boxed ? '' : 'bg-primary'"
    :style="!block.boxed ? { backgroundImage: 'url(' + getAssetUrl() + block.image.filename_disk + '?format=auto)' } : {}">
    <div class="container" 
      :class="block.boxed ? 'pb-f-24' : 'px-4'">
      <div
        class="relative py-f-24 lg:w-9/12 mx-auto" 
        data-aos="fade-up" 
        data-aos-delay="200"
        :style="block.boxed ? { backgroundImage: 'url(' + getAssetUrl() + block.image.filename_disk + '?format=auto)' } : {}">
        <div class="space-y-f-12"
          :class="{ 
            'sm:mx-f-24 px-4 sm:px-0' : block.boxed,
            'grid md:grid-cols-2' : fileDownloads.value 
            }">
          <div 
            class="text-f-2xl  font-medium"
            :class="path === '/referenzen' && block.boxed ? 'text-primary' : 'text-white'" 
            v-if="block.title"
            v-html="formatText(block.title)">
          </div>
          
          <Button as-child
            :variant="path === '/referenzen' && block.boxed ? 'primary_inverted' : 'primary'"
            size="sm">
            <NuxtLink
              v-if="block.buttons"
              v-for="button in block.buttons"
              :aria-label="'alle Leistungen ansehen'" 
              :to="button.url">
              {{ button.label }}
            </NuxtLink>
          </Button>
          <div
            data-aos="fade-up" 
            data-aos-delay="200">
            <div class="text-white flex justify-between border-b border-white first:border-t py-2"
              v-if="fileDownloads.value"
              v-for="download in fileDownloads.value">
              <div class="basis-4/5">
  
                <span
                  v-if="download.title"
                  class="block text-f-xl">
                  {{ download.title }}
                </span>
                  
                <p 
                  v-if="download.description"
                  class="block">
                  {{ download.description }}
                </p> 
              </div>
              <NuxtLink 
                v-if="download.filename_disk"
                target="_blank"
                class="no-underline flex items-center gap-2" 
                :href="getAssetUrl() + download.filename_disk">
                PDF
                <ArrowDown class="h-5 w-5" />                                                        
              </NuxtLink>  
            </div> 
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { NuxtLink } from '#components';
  import { ArrowDown } from 'lucide-vue-next'
  const { path } = useRoute()
  const props = defineProps({
    id: String,
    index: Number,
    collection: String,
  })

  
  const { getItemById } = useDirectusItems();
  const { getFiles } = useDirectusFiles();

 

  let allUuids = []; 

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
  

  
  if (block.value && block.value.downloads && Array.isArray(block.value.downloads)) {
    const uuids = block.value.downloads.map(file => file.directus_files_id);
    allUuids = uuids;
  }
  
  let fileDownloads = ref([]);

  if (allUuids.length > 0) {
    const {
      data: fileDownloadsData,
      pending: pendingFileDownloads,
      error: errorFileDownloads,
    } = await useAsyncData(
      'fileDownloads'+allUuids.join(','), 
      () => {
        return getFiles({ 
          params: { 
            filter: {
              id: {
                _in: allUuids
              }
            },       
            fields: ['id', 'filename_disk', 'title', 'description'],
          },  
        })
      },
      {
        transform: (data) => data,
      }
    )
    fileDownloads.value = fileDownloadsData;
  }
</script>

<style scoped>

</style>