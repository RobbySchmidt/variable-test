<script setup lang="ts">

  const showBlockname = false;

  // Map the page builder collection names to the components
  // https://nuxt.com/docs/guide/directory-structure/components#dynamic-components
  const map = {
    block_banner: resolveComponent('LazyBanner'),
    block_heroBanner: resolveComponent('LazyHeroBanner'),
    block_heroBannerTwoCols: resolveComponent('LazyHeroBannerTwoCols'),
    block_imageText: resolveComponent('LazyImageText'),
    block_reception: resolveComponent('LazyReception'),
    block_text: resolveComponent('LazyText'),
    block_contact: resolveComponent('LazyContact'),
    block_video: resolveComponent('LazyVideo'),
    block_grid_locations: resolveComponent('LazyGridLocations'),
    block_downloads: resolveComponent('LazyDownloads'),
    block_medicalFields: resolveComponent('LazyMedicalFields'),
    block_values: resolveComponent('LazyValues'),
    block_informations: resolveComponent('LazyInformations'),
    block_officeInformations: resolveComponent('LazyOfficeInformations'),
    block_carousel: resolveComponent('LazySlider'),
    block_jobs: resolveComponent('LazyJobs'),
    block_videos: resolveComponent('LazyVideos'),
    block_videoconsultation: resolveComponent('LazyVideoConsultation')
  }


  const props = defineProps({
    blocks: Object
  });
  

  const loaded = ref(false)
  onMounted(() => {
      setTimeout(function() {
        loaded.value = true
      }, 10);
  })

</script>
<template>
  <div class="relative z-10 mx-auto overflow-hidden" id="content"> 
    <template v-for="(block, index) in blocks" :key="block.id">

      <!-- For debugging - shows block name  -->
      <div class="p-4 font-bold bg-yellow-300" v-if="showBlockname">
        Content Block:  {{block.collection}}
      </div>
          
      <component class="":is="map[block.collection]" v-if="block.item" :index="index" :id="block.item.id" :collection="block.collection" />

    </template>
  </div>
</template>