<template>
  <div class="bg-background xl:mx-8 relative xl:rounded-sm py-f-16 md:py-f-24 min-h-[90vh]">
    <div class="xl:max-w-[1100px] 3xl:max-w-[1300px] mx-auto px-4 md:px-8 xl:px-0">
      <Transition name="fade" mode="out-in">
        <div v-if="showSelection">
          <div 
            v-if="block.title"
            v-html="block.title"
            class="[&>h1]:font-bold [&>h1]:mb-f-12 text-f-2xl font-medium max-w-4xl [&>h1]:text-f-6xl">
          </div>
          <h2 class="text-f-xl font-medium my-f-8">
            Bitte wähle deinen Standort aus:
          </h2>
          <p>
            Um die Videosprechstunde des jeweiligen Standortes zu starten, klicke bitte auf den folgenden Button. Dabei werden Daten (z. B. IP-Adresse) an den Anbieter arzt-direkt (zollsoft GmbH) übermittelt. Weitere Informationen findest du in unserer <NuxtLink to="/datenschutz">Datenschutzerklärung</NuxtLink>.
          </p>
          <ul v-if="locations.length" class="inline-flex gap-4 flex-wrap">
            <li v-for="location in locations">
              <Button @click="showVideoCall(location.videocall)">
                <span class="group-hover:-translate-x-2 duration-300 ease-in-out">
                  {{ location.title }}
                </span>
                  <MoveRight class="size-6 stroke-1 opacity-0 translate-x-[-8px] 
                    transition-all duration-300 ease-in-out 
                    group-hover:opacity-100 group-hover:translate-x-0"/>
              </Button>
            </li>
          </ul>
        </div>
        <iframe 
          v-else-if="videoURL"
          :src='videoURL'
          width="100%"
          height="600"
          frameborder="0"
          allowfullscreen>
        </iframe>
        <p 
          v-else
          class="text-lg flex flex-col space-y-4">
          <span>Keine Video-Sprechstunde hinterlegt.</span>
          <Button @click="showSelection = !showSelection">
            <span class="group-hover:-translate-x-2 duration-300 ease-in-out">
              zurück
            </span>
            <MoveRight class="size-6 stroke-1 opacity-0 translate-x-[-8px] 
              transition-all duration-300 ease-in-out 
              group-hover:opacity-100 group-hover:translate-x-0"/>
          </Button>
        </p>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { MoveRight } from 'lucide-vue-next';
  const props = defineProps({
    id: String,
    index: Number,
    collection: String
  })


  const { getItemById, getItems } = useDirectusItems();

  const videoURL = ref('')
  const showSelection = ref(true)

  function showVideoCall(url){
      videoURL.value = url
      showSelection.value = false
  }

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
                  fields: ['*.*','locations.locations_id.title','locations.locations_id.videocall']
                }
                
            })
     
    },
    {
      transform: (data) => data,
    }     
  )
  const {
    data: locations,
    pendingLocations,
    errorLocations,
  } = await useAsyncData('locations_videocall', () => {
    return getItems({      
      collection: "locations",      
      params: { 
        filter: {
          videocall_available: {
            _eq: true
          }
        },
        fields: ['videocall','videocall_available','title'],
      },    
    })
  },
  {
    transform: (data) => data
  })
</script>
<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.4s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>