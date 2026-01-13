<template>
  <div class="md:mx-auto xl:max-w-[1100px] 3xl:max-w-[1300px] px-4 md:px-8 xl:px-0 space-y-f-16 py-f-24" id="jobs">
    <div 
      v-if="block.title"
      v-html="block.title"
      class="font-bold text-f-5xl text-primary">
    </div>

    <div class="grid md:grid-cols-2 gap-6">
      <WebsiteCardJob v-for="job in jobs" :title="job.title" :slug="job.slug" :locations="job.locations" :keyfacts="job.job_key_facts"/>
    </div>  
  </div>
</template>

<script setup>
  const props = defineProps({
    id: String,
    index: Number,
    collection: String
  })

  const { getItemById, getItems } = useDirectusItems();
  const { path } = useRoute()

  const {
    data: block,
    pending: pendingBlock,
    error: errorBlock,
  } = await useAsyncData(
    'block'+ props.collection + props.id,
    () => {
      return getItemById({      
                collection: props.collection,      
                id: props.id,
                params: {   
                  fields: ['*.*']
                }
                
            })
     
    },
    {
      transform: (data) => data,
    }     
  ) 

  const {
    data: jobs,
    pendingJobs,
    errorJobs,
  } = await useAsyncData('jobs', () => {
    return getItems({      
      collection: "jobs",      
      params: {
        filter: {
          status: {
            _eq: 'published'
          }
        },
        fields: ['*', '*.*', 'locations.locations_id.*', 'job_key_facts.key_facts_id.fact'],
      },    
    })
  },
  {
    transform: (data) => data
  })
</script>