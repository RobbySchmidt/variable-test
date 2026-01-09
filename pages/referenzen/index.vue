<template>  
 <div>
    <template v-if="referencesSettings">    
      <WebsiteContentBlockBuilder :blocks="referencesSettings.blocks" v-if="referencesSettings.blocks" />
      <div 
        class="container px-4 py-f-24" 
        v-if="references"
        data-aos="fade-up" 
        data-aos-delay="200">
        <div
          v-for="reference in references"
          class="lg:w-9/12 grid md:grid-cols-2 gap-7 mx-auto border-y border-black py-f-12">
          <Picture
            v-if="reference.image"
            type="column"
            :image="reference.image" />
          <div>
            <h2 
              v-if="reference.title" 
              class="font-medium text-f-xl">
              {{reference.title}}
            </h2>
            <div 
              v-if="reference.text" 
              class="custom-content py-f-6" 
              v-html="reference.text">    
            </div>
            <Button
              as-child 
              variant="primary_inverted"
              size="sm">
              <NuxtLink
                v-if="reference.slug" 
                :to="path+'/'+ reference.slug">
                Referenz ansehen
              </NuxtLink>
            </Button>    
          </div>
        </div>
      </div>
      <WebsiteContentBlockBuilder :blocks="referencesSettings.blocks_secondary" v-if="referencesSettings.blocks_secondary" />
    </template>
    <template v-else>
      <div v-if="pendingReferencesSettings">Lädt</div>

      <div v-else>
          Seite nicht vorhanden
      </div>
    
    </template>
 </div>
</template>

<script setup>
  const { getItems } = useDirectusItems();
  const { params, path } = useRoute()

  const {
      data: referencesSettings,
      pending: pendingReferencesSettings,
      error: errorReferencesSettings,
    } = await useAsyncData('referencesSettings', () => {
      return getItems({      
        collection: "references_settings",      
        params: {
        fields: [
          '*.*',
          'blocks.*',
          'blocks.collection', 
          'blocks.item.id',
          'blocks_secondary.*',
          'blocks_secondary.collection', 
          'blocks_secondary.item.id'
        ],
        
      }

      })
      },
      {
        transform: (data) => data,
      }
    )

  const {
    data: references,
    pending: pendingReferences,
    error: errorReferences,
  } = await useAsyncData('references' + path, () => {
    return getItems({      
      collection: "references",  
        params: {  
          fields: ['*.*'],
        },   
      })
    },
    {
      transform: (data) => data,
    }
  )

  useSeoMeta({
    title: () => (referencesSettings.value && referencesSettings.value.seo) ? referencesSettings.value.seo.title : 'Bitte Seo hinterlegen',
    ogTitle: () => (referencesSettings.value && referencesSettings.value.seo) ? referencesSettings.value.seo.title : null,
    description: () => referencesSettings.value ? referencesSettings.value.seo.meta_description : null,
    ogDescription: () =>
    referencesSettings.value ? referencesSettings.value.seo.meta_description : null,
  /*  ogUrl: () => `https://directus.io/posts/${page.value.slug}`,
    ogImage: () => (page.value.seo ? fileUrl(page.value.seo.og_image) : null),
    twitterTitle: '[twitter:title]',
    twitterDescription: '[twitter:description]',
    twitterImage: '[twitter:image]',
    twitterCard: 'summary',*/
  })
    
</script>
