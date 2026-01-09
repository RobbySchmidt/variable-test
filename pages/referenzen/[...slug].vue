<template>
  <div>
     <NuxtErrorBoundary>       
      <WebsiteHeroBanner :image="reference.banner_image" :title="reference.title" />
      <div class="container px-4 pt-f-32 pb-f-12">
        <div class="lg:w-9/12 mx-auto">
          <div class="border-b border-prime">  
            <NuxtLink 
              class="flex items-center gap-2 group mb-2" 
              to="/referenzen">          
              <svg class="mt-1" width="31" height="6" viewBox="0 0 31 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.66313 5.77444L0.117546 3.22886C-0.0386636 3.07265 -0.0386636 2.81938 0.117546 2.66317L2.66313 0.117588C2.81934 -0.0386224 3.07261 -0.0386224 3.22882 0.117588C3.38503 0.273798 3.38503 0.527063 3.22882 0.683273L1.36607 2.54601L30.4004 2.54602L30.4004 3.34602L1.36607 3.34601L3.22882 5.20876C3.38503 5.36497 3.38503 5.61823 3.22882 5.77444C3.07261 5.93065 2.81934 5.93065 2.66313 5.77444Z" fill="#F9423A"/>
              </svg>
              <span 
                class="w-fit text-prime group-hover:duration-300 group-hover:text-grey-500">
                zurück zur Übersicht
              </span> 
            </NuxtLink>   
          </div>    
        </div>  
        <div class="lg:w-9/12 grid md:grid-cols-2 gap-f-12 mx-auto">
          <div>
            <div 
              class="references"
              data-aos="fade-up" 
              data-aos-delay="200" 
              v-if="reference.text_left" 
              v-html="reference.text_left">
            </div>
          </div>
          <div 
            class="space-y-6 pr-7"
            data-aos="fade-up" 
            data-aos-delay="400">
            <div 
              class="references" 
              v-if="reference.text_right" 
              v-html="reference.text_right">
            </div>               
          </div>
        </div>
      </div>
    <template #error="{ error }">
      <div>
        <div type="error">{{ error }}</div>
      </div>
    </template>
    <WebsiteContentBlockBuilder :blocks="reference.blocks" v-if="reference.blocks" />
    </NuxtErrorBoundary>
  </div>
</template>

<script setup>
  const { getItems } = useDirectusItems();
  const { params, path } = useRoute()

  function getSlug() {
    if (path == '/') {
      return 'home'
    } else return params.slug[0]
  }

  const {
    data: reference,
    pending: pendingReference,
    error: errorReference,
  } = await useAsyncData( path, () => {
      return getItems({      
          collection: "references",      
          params: { 
            filter: {
              slug: { _eq: getSlug() },
            },
            fields: ['*.*', 'seo.*', 'blocks.collection' , 'blocks.item.id'],
             
          },    
        })
    },
    {
      transform: (data) => data[0],
    }
     
  )

  useSeoMeta({
    title: () => reference.value.meta_title ? reference.value.meta_title : reference.value.title,
    ogTitle: () => reference.value.meta_title ? reference.value.meta_title : reference.value.title,
    description: () => reference.value.meta_description ? reference.value.meta_description : 'Bitte Seo hinterlegen',
    ogDescription: () => reference.value.meta_description ? reference.value.meta_description : 'Bitte Seo hinterlegen',
    ogUrl: () => `https://directus.io/posts/${reference.value.slug}`,
    /*
    ogImage: () => (reference.value.seo ? fileUrl(reference.value.seo.og_image) : null),
    twitterTitle: '[twitter:title]',
    twitterDescription: '[twitter:description]',
    twitterImage: '[twitter:image]',
    twitterCard: 'summary',*/
  })

</script>