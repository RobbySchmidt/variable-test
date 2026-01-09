<template>
  <section
    v-if="block.video"
    class="overflow-hidden grid lg:grid-cols-2">
    <div class="relative">
      <video
        ref="herovideo"
        :src="getAssetUrl() + block.video.filename_disk"
        :aria-label="block.video.title"
        autoplay
        loop
        muted
        playsinline
        class="aspect-video">
      </video>
      <button class="absolute z-10 left-2 bottom-4 text-white/80 xl:cursor-pointer" 
        @click="togglePlayPause()" 
        :aria-label="isVideoPlaying ? 'Play Button' : 'Pause Button' ">
        <div 
          v-if="isVideoPlaying"
          class="flex items-center">  
          <Pause
            class="lg:w-8 lg:h-8"/>
            <span class="ml-1">Video pausieren</span>          
        </div>
        <div 
          v-if="!isVideoPlaying"
          class="flex items-center">    
          <Play
            class="lg:w-8 lg:h-8"/>
            <span class="ml-1">Video abspielen</span>
        </div>      
      </button>  
    </div>
    <div class="relative">
      <Picture
        v-if="block.image"
        type="herobanner-col"
        :image="block.image"/>
    
      <div class="container absolute inset-0 flex items-center px-4">                  
        <div 
          v-if="block.text"
          v-html="formatText(block.text)"
          class="text-f-4xl text-white lg:px-8 font-[Neue-Machina]">
        </div>
      </div>
    </div>
  </section>
  <section
    v-else
    class="overflow-hidden relative"> 
    <Picture
      v-if="block.image"
      type="herobanner"
      :image="block.image"/>
    <div 
      class="container absolute inset-0 flex items-center rellax px-4" 
      data-rellax-speed="-4">                     
        <div 
          v-if="block.text"
          v-html="formatText(block.text)"
          class="text-f-4xl text-white lg:w-9/12 lg:mx-auto font-[Neue-Machina]">
        </div>
    </div>
  </section>
</template>

<script setup>
  import Rellax from 'rellax'
  import { Play, Pause } from 'lucide-vue-next'

  const props = defineProps({
    id: String,
    index: Number,
    collection: String,
  })

  const { getItemById } = useDirectusItems()
  const {
    data: block,
    pending: pendingBlock,
    error: errorBlock,
  } = await useAsyncData(
    'block' + props.collection + props.id,
    () => {
      return getItemById({
        collection: props.collection,
        id: props.id,
        params: {
          fields: ['*.*'],
        },
      })
    },
    {
      transform: (data) => data,
    }
  )

  // const scrollToFirstSection = () => {
  // const section = document.querySelector('#firstSection')
  //   if (section) {
  //     section.scrollIntoView({ behavior: 'smooth' })
  //   }
  // }

  const herovideo = ref();
  const isVideoPlaying = ref(true);

  function playVideo() {
    herovideo.value.play();
    isVideoPlaying.value = true;
  }

  function pauseVideo() {
    herovideo.value.pause();
    isVideoPlaying.value = false;
  }

  const togglePlayPause = () => {
    if (isVideoPlaying.value) {
      pauseVideo();
    } else {
      playVideo();
    }
  };

  if (process.client) {
    const pauseVideoOnScroll = () => {
      if (herovideo.value && window.scrollY > 100) {
        pauseVideo();
      }
    };

    onMounted(() => {
      window.addEventListener('scroll', pauseVideoOnScroll);
      new Rellax('.rellax', {
        speed: -4
      });
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', pauseVideoOnScroll);
    });
  }
</script>
