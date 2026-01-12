<template>
  <div class="relative py-f-24">
    <div class="container p-4">
      <div class="lg:w-9/12 mx-auto grid xl:grid-cols-2 gap-f-24 items-center">
        <div
          data-aos="fade-up" 
          data-aos-delay="200">
          <Picture
            v-if="job.image_slug"
            type="column-low"
            :image="job.image_slug" />
        </div>

        <div class="space-y-3"
          data-aos="fade-up" 
          data-aos-delay="400">
          <h1
            v-if="job.title"
            class="text-f-xl font-medium text-primary">
            {{ job.title }}
          </h1>

          <div class="text-primary text-base pb-3">
            <span
              v-if="job.location"
              class="border-b border-primary py-3 block">
              {{ job.location }}
            </span>
            <span
              class="border-b border-primary py-3 block" 
              v-if="job.start">
              {{ job.start }}
            </span>
            <span
              class="border-b border-primary py-3 block" 
              v-if="job.contract">
              {{ job.contract }}
            </span>
            <span
              class="border-b border-primary py-3 block" 
              v-if="job.hours">
              {{ job.hours }}
            </span>
          </div>
          <Button
            as-child
            class="text-base" 
            variant="primary_inverted">
            <NuxtLink to="#bewerbung">
              Jetzt bewerben
            </NuxtLink>
          </Button>
        </div>
      </div>
      
      <div class="py-f-24 lg:w-6/12 mx-auto space-y-f-12">
        <div
          v-if="job.description"
          class="space-y-2"
          data-aos="fade-up" 
          data-aos-delay="200">
          <h2 class="text-black text-f-xl font-medium">Deine Aufgaben</h2>
          <div class="jobs" v-html="job.description"></div>
        </div>
        <div
          v-if="job.requirements"
          class="space-y-2"
          data-aos="fade-up" 
          data-aos-delay="400">
          <h2 class="text-black text-f-xl font-medium">Dein Profil</h2>
          <div class="jobs" v-html="job.requirements"></div>
        </div>
        <div
          v-if="job.adventages"
          class="space-y-2"
          data-aos="fade-up" 
          data-aos-delay="600">
          <h2 class="text-black text-f-xl font-medium">Warum wir?</h2>
          <div class="jobs" v-html="job.adventages"></div>
        </div>
      </div>

      <BlocksJobForm :jobTitle="job.title"/>
    </div>
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
    data: job,
    pending: pendingJob,
    error: errorJob,
  } = await useAsyncData( path, () => {
      return getItems({      
          collection: "jobs",      
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
    title: () => job.value.meta_title ? job.value.meta_title : job.value.title,
    ogTitle: () => job.value.meta_title ? job.value.meta_title : job.value.title,
    description: () => job.value.meta_description ? job.value.meta_description : 'Bitte Seo hinterlegen',
    ogDescription: () => job.value.meta_description ? job.value.meta_description : 'Bitte Seo hinterlegen',
  /*  ogUrl: () => `https://directus.io/posts/${references.value.slug}`,
    
    ogImage: () => (references.value.seo ? fileUrl(references.value.seo.og_image) : null),
    twitterTitle: '[twitter:title]',
    twitterDescription: '[twitter:description]',
    twitterImage: '[twitter:image]',
    twitterCard: 'summary',*/
  })


  const loaded = ref(false)
  onMounted(() => {
      setTimeout(function() {
        loaded.value = true
      }, 10);
  })


</script>