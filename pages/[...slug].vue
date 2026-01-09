<template>
  <div>
     <NuxtErrorBoundary>
      <!-- Render the page using the PageBuilder component -->
       <WebsiteContentBlockBuilder :blocks="page.blocks" v-if="page && page.blocks" />
      <!-- If there is an error, display it using the VAlert component -->
      <template #error="{ error }">
        <div>
          <div type="error">{{ error }}</div>
        </div>
      </template>
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
    data: page,
    pending: pendingPage,
    error: errorPage,
  } = await useAsyncData( path, () => {
      return getItems({      
          collection: "pages",      
          params: { 
            filter: {
              slug: { _eq: getSlug() },
            },
            fields: ['*', 'seo.*', 'blocks.collection' , 'blocks.item.id'],
            
          },    
        })
    },
    {
      transform: (data) => data[0],
    }
    
  )

  if (!page) {
    throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
  }

  useSeoMeta({
    title: () => (page.value && page.value.seo) ? page.value.seo.title : 'Bitte Seo hinterlegen',
    description: () => (page.value && page.value.seo)? page.value.seo.meta_description : 'Bitte Seo hinterlegen',
    ogTitle: () => (page.value && page.value.seo) ? page.value.seo.title : 'Bitte Seo hinterlegen',
    ogDescription: () =>
    (page.value && page.value.seo) ? page.value.seo.meta_description : 'Bitte Seo hinterlegen',
    // ogUrl: () => `https://directus.io/posts/${page.value.slug}`,
    // ogImage: () => (page.value.seo ? fileUrl(page.value.seo.og_image) : null),
    // twitterTitle: '[twitter:title]',
    // twitterDescription: '[twitter:description]',
    // twitterImage: '[twitter:image]',
    // twitterCard: 'summary',
    })

</script>