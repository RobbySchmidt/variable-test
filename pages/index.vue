<template>  
  <div class="relative z-10">
     <template v-if="true">
     
      <WebsiteContentBlockBuilder :blocks="general.homepage.blocks" v-if="general.homepage.blocks" />
     
     </template>
     <template v-else>
       <div v-if="pendingGeneral">Lädt</div>
 
       <div v-else>
           Seite nicht vorhanden
       </div>
     
     </template>
  </div>
 </template>
 
 <script setup>

  const { getItems } = useDirectusItems();
 
   const {
       data: general,
       pending: pendingGeneral,
       error: errorGeneral,
     } = await useAsyncData('homepageConf', () => {
       return getItems({      
         collection: "general",      
         params: {
          fields: [
            '*.*',
            'homepage.*',
            'homepage.blocks.*',
            'homepage.blocks.item.*',
            'homepage.seo.*'
          ],
         
        }
  
       })
       },
       {
         transform: (data) => data,
       }
     )

     
 
     useSeoMeta({
      title: () => (general.value.homepage && general.value.homepage.seo) ? general.value.homepage.seo.title : 'Bitte Seo hinterlegen',
      description: () => (general.value.homepage && general.value.homepage.seo) ? general.value.homepage.seo.meta_description : 'Bitte Meta-description hinterlegen',
      ogTitle: () => (general.value.homepage && general.value.homepage.seo) ? general.value.homepage.seo.title : 'Bitte Seo hinterlegen',
      ogDescription: () =>
      (general.value.homepage && general.value.homepage.seo) ? general.value.homepage.seo.meta_description : 'Bitte Meta-description hinterlegen',
      // ogUrl: () => `https://directus.io/posts/${page.value.slug}`,
      // ogImage: () => (page.value.seo ? fileUrl(page.value.seo.og_image) : null),
      // twitterTitle: '[twitter:title]',
      // twitterDescription: '[twitter:description]',
      // twitterImage: '[twitter:image]',
      // twitterCard: 'summary',
     })
 </script>
 