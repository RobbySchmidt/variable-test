<template>
  <div class="bg-white" id="jobs">
    <div class="columns py-f-12">
      <div class="space-y-f-8">
        <div
          v-if="block.title"
          v-html="block.title"
          class="text-primary text-f-xl font-medium">
        </div>

        <div class="grid md:grid-cols-2 2xl:grid-cols-3 gap-f-12 2xl:gap-4">
          <div 
            v-if="jobs" 
            v-for="(job, index) in jobs"
            data-aos="fade-up" 
            :data-aos-delay="index * 200"
            class="h-fit group">
            <img 
              v-if="job.image"
              :src="getAssetUrl() + job.image + '?format=avif'"
              height="456"
              width="608"
              :alt="job.image.description ? job.image.description : job.title">
            <h3
              v-if="job.title"
              class="text-f-lg xl:min-h-32 py-4 text-black">
              {{ job.title }}
            </h3>
            <div>
              <span 
                v-if="job.location" 
                class="border-b border-black block pb-3">
                {{ job.location }}
              </span>
              <span 
                v-if="job.start" 
                class="border-b border-black block py-3">
                {{ job.start }}
              </span>
            </div>
       
           
            <Accordion 
              type="single" 
              class="w-full mb-f-6 2xl:mb-f-12" 
              collapsible>
              <AccordionItem 
                :key="job.title" 
                :value="job.title">
                <AccordionTrigger>
                  Ihre Aufgaben
                </AccordionTrigger>
                <AccordionContent>
                  <div
                    v-if="job.description" 
                    class="custom-content text-base" 
                    v-html="job.description">
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          
            <Button
              as-child>
              <NuxtLink :to="'/jobs/' + job.slug" class="cursor-pointer">
                Jetzt bewerben
              </NuxtLink>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ArrowRight } from 'lucide-vue-next'

  const props = defineProps({
    id: String,
    index: Number,
    collection: String
  })

  const { path } = useRoute()

  const { getItemById } = useDirectusItems();
  const { getItems } = useDirectusItems();

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
    pendingReferences,
    errorReferences,
  } = await useAsyncData('jobs', () => {
    return getItems({      
      collection: "jobs",      
      params: { 
        fields: ['*'],
      },    
    })
  },
  {
    transform: (data) => data
  })


</script>

<style scoped>

</style>