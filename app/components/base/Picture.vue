<template>
  <!-- HeroBanner -->
  <picture v-if="type == 'herobanner' && image">
    <source 
      media="(min-width: 2000px)" 
      width="1920" 
      height="400"
      :srcset="getAssetUrl() + image.filename_disk + '?fit=cover&width=1920&height=450&format=auto'">
    
    <source 
      media="(min-width: 1536px)" 
      width="1920" 
      height="600"
      :srcset="getAssetUrl() + image.filename_disk + '?fit=cover&width=1920&height=600&format=auto'">

    <source 
      media="(min-width: 1024px)" 
      width="1600" 
      height="500"
      :srcset="getAssetUrl() + image.filename_disk + '?fit=cover&width=1600&height=500&format=auto'">

    <source 
      media="(min-width: 768px)" 
      width="960" 
      height="480"
      :srcset="getAssetUrl() + image.filename_disk + '?fit=cover&width=1920&height=960&format=auto 2x, ' +
               getAssetUrl() + image.filename_disk + '?fit=cover&width=960&height=480&format=auto' ">

    <source 
      media="(min-width: 640px)" 
      width="700" 
      height="350"
      :srcset="getAssetUrl() + image.filename_disk + '?fit=cover&width=1400&height=700&format=auto 2x, ' +
               getAssetUrl() + image.filename_disk + '?fit=cover&width=700&height=350&format=auto' ">

    <source 
      width="360" 
      height="360"
      :srcset="getAssetUrl() + image.filename_disk + '?fit=cover&width=720&height=720&format=auto 2x, ' +
               getAssetUrl() + image.filename_disk + '?fit=cover&width=360&height=360&format=auto' ">

    <img 
      class="block object-cover w-full h-full rellax"
      data-rellax-speed="-4"
      width="1920"
      height="600"
      :loading="loading"
      :alt="image.description ? image.description : image.title "      
      :src="getAssetUrl() + image.filename_disk + '?fit=cover&1920&height=600&format=auto'">
  </picture>

  <!-- Herobanner Column -->
  <picture v-if="type == 'herobanner-col' && image">
    <source 
      media="(min-width: 2000px)" 
      width="1280" 
      height="720"
      :srcset="getAssetUrl() + image.filename_disk + '?fit=cover&width=1280&height=720&format=auto'">
    
    <source 
      media="(min-width:1024px)" 
      width="960" 
      height="540"
      :srcset="getAssetUrl() + image.filename_disk + '?fit=cover&width=1920&height=1080&format=auto 2x, ' +
               getAssetUrl() + image.filename_disk + '?fit=cover&width=960&height=540&format=auto' ">

    <source 
      media="(min-width: 768px)" 
      width="960" 
      height="650"
      :srcset="getAssetUrl() + image.filename_disk + '?fit=cover&width=1920&height=1300&format=auto 2x, ' +
               getAssetUrl() + image.filename_disk + '?fit=cover&width=960&height=650&format=auto' ">

    <source 
      media="(min-width: 640px)" 
      width="700" 
      height="350"
      :srcset="getAssetUrl() + image.filename_disk + '?fit=cover&width=1400&height=700&format=auto 2x, ' +
               getAssetUrl() + image.filename_disk + '?fit=cover&width=700&height=350&format=auto' ">

    <source 
      width="360" 
      height="360"
      :srcset="getAssetUrl() + image.filename_disk + '?fit=cover&width=720&height=400&format=auto 2x, ' +
               getAssetUrl() + image.filename_disk + '?fit=cover&width=360&height=360&format=auto' ">

    <img 
      class="block object-cover h-full w-full"
      width="960"
      height="720"
      :loading="loading"
      :alt="image.description ? image.description : image.title "      
      :src="getAssetUrl() + image.filename_disk + '?fit=cover&1920&height=600&format=auto'">
  </picture>

  <!-- column -->
  <picture 
    v-if="type == 'column' && image"
  >
    <source
      media="(min-width: 1280px)"
      width="600" 
      height="440"
      :srcset="getAssetUrl() + image.filename_disk + '?fit=cover&width=600&height=440&format=auto'">

    <source
      media="(min-width: 768px)"
      width="800" 
      height="500"
      :srcset="getAssetUrl() + image.filename_disk + '?fit=cover&width=1600&height=1000&format=auto 2x, ' +
      getAssetUrl() + image.filename_disk + '?fit=cover&width=800&height=500&format=auto' ">

    
    <source 
      media="(min-width: 640px)" 
      width="640" 
      height="420"
      :srcset="getAssetUrl() + image.filename_disk + '?fit=cover&width=1280&height=840&format=auto 2x, ' +
      getAssetUrl() + image.filename_disk + '?fit=cover&width=640&height=420&format=auto' ">

    <source 
      width="360" 
      height="220"
      :srcset="getAssetUrl() + image.filename_disk + '?fit=cover&width=720&height=440&format=auto 2x, ' +
      getAssetUrl() + image.filename_disk + '?fit=cover&width=360&height=220&format=auto' ">

    <img 
      class="block w-full" 
      width="600"
      height="440"
      :loading="loading"
      :fetchpriority="priority"
      :alt="image.description ? image.description : image.title "      
      :src="getAssetUrl() + image.filename_disk + '?fit=cover&width=600&height=440&format=auto'"
    >
  </picture>

  <!-- column-low-->
  <picture 
    v-if="type == 'column-low' && image"
  >
    <source
      media="(min-width: 1280px)"
      width="600" 
      height="400"
      :srcset="getAssetUrl() + image.filename_disk + '?fit=cover&width=600&height=400&format=auto'">

    <source
      media="(min-width: 768px)"
      width="800" 
      height="400"
      :srcset="getAssetUrl() + image.filename_disk + '?fit=cover&width=1600&height=800&format=auto 2x, ' +
      getAssetUrl() + image.filename_disk + '?fit=cover&width=800&height=400&format=auto' ">

    
    <source 
      media="(min-width: 640px)" 
      width="640" 
      height="320"
      :srcset="getAssetUrl() + image.filename_disk + '?fit=cover&width=1280&height=640&format=auto 2x, ' +
      getAssetUrl() + image.filename_disk + '?fit=cover&width=640&height=320&format=auto' ">

    <source 
      width="360" 
      height="200"
      :srcset="getAssetUrl() + image.filename_disk + '?fit=cover&width=720&height=400&format=auto 2x, ' +
      getAssetUrl() + image.filename_disk + '?fit=cover&width=360&height=200&format=auto' ">

    <img 
      class="block w-full" 
      width="600"
      height="400"
      :loading="loading"
      :fetchpriority="priority"
      :alt="image.description ? image.description : image.title "      
      :src="getAssetUrl() + image.filename_disk + '?fit=cover&width=600&height=400&format=auto'"
    >
  </picture>

  <!-- gallery -->
  <picture 
    v-if="type == 'gallery' && image"
  >
    <source
      media="(min-width: 1280px)"
      width="1240" 
      height="668"
      :srcset="getAssetUrl() + image + '?fit=cover&width=1240&format=auto'">

    <source
      media="(min-width: 640px)"
      width="740" 
      height="400"
      :srcset="getAssetUrl() + image.filename_disk + '?fit=cover&width=1480&format=auto 2x, ' +
      getAssetUrl() + image.filename_disk + '?fit=cover&width=740&format=auto' ">
    
    <source 
      width="360" 
      height="200"
      :srcset="getAssetUrl() + image.filename_disk + '?fit=cover&width=720&format=auto 2x, ' +
      getAssetUrl() + image.filename_disk + '?fit=cover&width=360&format=auto' ">

    <img 
      class="block w-full" 
      width="1240"
      height="668"
      :loading="loading"
      :fetchpriority="priority"
      :alt="image.description ? image.description : image.title "      
      :src="getAssetUrl() + image.filename_disk + '?fit=cover&width=1240&format=auto'"
    >
  </picture>
      
</template>
<script setup>
  const props = defineProps({
    image: Object,
    type: { type: String, default: 'column' },
    loading: { type: String, default: 'eager' },
    priority: { type: String, default: 'auto' },
  });
</script>