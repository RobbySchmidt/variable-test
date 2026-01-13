<template>
  <section class="bg-primary  mx-4 md:mx-8 rounded-sm xl:mx-auto xl:max-w-[1100px] 3xl:max-w-[1300px] py-f-20 px-4 md:px-8 xl:px-f-24 space-y-12">
    <h2 
      v-if="block.title"
      class="font-bold text-f-5xl text-white">
      {{ block.title }}
    </h2>
    <ul class="border-b-2 border-secondary max-w-[1100px]">
      <li 
        v-if="block" 
        v-for="video in block.external_videos"
        class="px-2 py-3 border-t-2 border-secondary text-white text-f-lg">
          <span>{{ video.title }}</span> |
        <NuxtLink 
          v-if="video.url"
          target="_blank"
          :href="video.url"
          class="underline">
          zum Video
        </NuxtLink> 
      </li>
    </ul>
    <div class="grid md:grid-cols-2 gap-12 text-white">
      <div
        v-if="block.videos"
        v-for="video in block.videos" class="space-y-f-6">
        <video
          ref="video"
          v-if="video.directus_files_id"
          :src="getAssetUrl() + video.directus_files_id.filename_disk"
          :aria-label="video.directus_files_id.title"
          loop
          controls
          playsinline
          class="aspect-video w-full">
        </video>
        <h3
          v-if="video.directus_files_id.title"
          class="text-f-2xl font-bold">
          {{ video.directus_files_id.title }}
        </h3>
        <p v-if="video.directus_files_id.description">
          {{ video.directus_files_id.description }}
        </p>
      
      </div>
    </div>
  </section>
</template>

<script setup>
  import { MoveRight } from 'lucide-vue-next'
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
          fields: ['*.*', 'videos.directus_files_id.*']
        }
      })
    },
    {
      transform: (data) => data,
    }     
  )
</script>

<style scoped>

</style>