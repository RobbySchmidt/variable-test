<template>
  <div class="bg-background relative xl:rounded-sm xl:mx-8">
    <div class="md:mx-auto xl:max-w-[1100px] 3xl:max-w-[1300px] px-4 md:px-8 xl:px-0 space-y-f-24 py-f-24">
      <div 
        v-if="block.title"
        v-html="block.title"
        class="font-bold text-f-6xl">
      </div>

      <div>
        <video
          ref="video"
          v-if="block.video"
          :src="getAssetUrl() + block.video.filename_disk"
          :aria-label="block.video.title"
          loop
          controls
          playsinline
          class="aspect-video w-full">
        </video>

        <div 
          v-else
          class="bg-gray-500 aspect-video rounded-sm grid place-items-center">
          <img 
            src="/svg/play-circle.svg" 
            alt="play video"
            class="">
        </div>
      </div>

      <div
        v-if="block.content"
        class="font-medium text-f-2xl max-w-4xl"
        v-html="block.content">
        
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