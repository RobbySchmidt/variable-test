<template>  
  <div class="relative z-10">
     <template v-if="true">
     
      <ContentBlockBuilder :blocks="general.homepage.blocks" v-if="general.homepage.blocks" />
     
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

  const { getItems } = useDirectusItems()
  const { public: pub}  = useRuntimeConfig()
 
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
      title: () => general.value.homepage?.seo?.title ?? pub.siteName,
      description: () => general.value.homepage?.seo?.meta_description ?? pub.siteName,
      ogTitle: () => general.value.homepage?.seo?.title ?? pub.siteName,
      ogDescription: () => general.value.homepage?.seo?.meta_description ?? pub.siteName,
      ogUrl: () => pub.siteUrl,
      robots: () => {
        if(!general.value.homepage?.seo) return 'noindex, nofollow'
        const {no_index, no_follow } = general.value.homepage.seo
        return `${no_index ? 'noindex' : 'index'}, ${no_follow ? 'nofollow' : 'follow'}`
      }
    })
 </script>
 