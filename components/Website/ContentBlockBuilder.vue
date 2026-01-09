<script setup lang="ts">

  const showBlockname = false;

  // Map the page builder collection names to the components
  // https://nuxt.com/docs/guide/directory-structure/components#dynamic-components
  const map = {
    block_hero_banner: resolveComponent('LazyBlocksHeroBanner'),
    block_references: resolveComponent('LazyBlocksReferences'),
    block_banner: resolveComponent('LazyBlocksBanner'),
    block_carousel: resolveComponent('LazyBlocksCarousel'),
    block_servicesBanner: resolveComponent('LazyBlocksServicesBanner'),
    block_referencesBanner: resolveComponent('LazyBlocksReferencesBanner'),
    block_imageText: resolveComponent('LazyBlocksImageText'),
    block_team: resolveComponent('LazyBlocksTeam'),
    block_contactForm: resolveComponent('LazyBlocksForm'),
    block_projects: resolveComponent('LazyBlocksProjects'),
    block_services: resolveComponent('LazyBlocksServices'),
    block_image: resolveComponent('LazyBlocksImage'),
    block_text: resolveComponent('LazyBlocksText'),
    block_contact: resolveComponent('LazyBlocksContact'),
    block_gallery: resolveComponent('LazyBlocksGallery'),
    block_jobs: resolveComponent('LazyBlocksJobs'),
    block_video: resolveComponent('LazyBlocksVideo'),
    block_adventages: resolveComponent('LazyBlocksAdventages'),
    block_values: resolveComponent('LazyBlocksValues'),
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