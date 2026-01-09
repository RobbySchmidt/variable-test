<template>
   <section class="overflow-hidden relative"> 
    <Picture
      v-if="image"
      type="herobanner"
      :image="image"/>
    <div 
      class="container absolute inset-0 flex items-center rellax px-4" 
      data-rellax-speed="-4">                     
        <h1 class="lg:w-9/12 text-f-4xl text-white lg:mx-auto font-[Neue-Machina]">
          {{ title }}             
        </h1>
    </div>
  </section>
</template>
<script setup>
  import Rellax from 'rellax'

  const props = defineProps({
      image: String,
      title: String,
  })

  onMounted(() => {
    new Rellax('.rellax');
  });
</script>   