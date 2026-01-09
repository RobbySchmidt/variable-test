<template>
  <div class="bg-white">
    <div class="container px-4 pt-f-24"
      :class="block.padding_bottom ? 'pb-f-24' : ''">
      <div class="lg:w-9/12 mx-auto space-y-f-6 text-f-lg font-medium relative">
        <video
          ref="video"
          v-if="block.video && block.poster"
          :poster="getAssetUrl() + block.poster.filename_disk"
          :src="getAssetUrl() + block.video.filename_disk"
          :aria-label="block.video.title"
          loop
          controls
          playsinline
          class="aspect-video w-full">
        </video>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { Play, Pause } from 'lucide-vue-next'

  const props = defineProps({
    id: String,
    index: Number,
    collection: String
  })

  const { path } = useRoute()

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

  const video = ref();
  const isVideoPlaying = ref(false);

  function pauseVideo() {
    video.value.pause();
    isVideoPlaying.value = false;
  }

  if (process.client) {
    const pauseVideoOnScroll = () => {
      pauseVideo();
    };

    onMounted(() => {
      window.addEventListener('scroll', pauseVideoOnScroll);
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', pauseVideoOnScroll);
    });
  }
</script>

<style scoped>

</style>