<template>
  <div class="bg-white" id="jobs">
    <div class="container px-4 py-f-24">
      <div class="lg:w-9/12 mx-auto space-y-f-12">
        <div
          v-if="block.title"
          v-html="formatText(block.title)"
          class="text-black text-f-xl font-medium">
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
            <div v-if="path === '/karriere'">
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
              v-if="path === '/karriere'" 
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
                    class="career text-base" 
                    v-html="formatText(job.description)">
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          
            <Button 
              variant="primary_inverted"
              size="sm"
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