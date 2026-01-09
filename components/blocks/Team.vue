<template>
  <div class="bg-white">
    <div class="container px-4 py-f-24 space-y-f-16">
      <div 
        class="lg:w-9/12 mx-auto text-f-xl font-medium" 
        v-html="block.title">
      </div>
      <div class="lg:w-9/12 mx-auto gap-f-12 grid md:grid-cols-2">
        <div
          v-if="team" 
          v-for="(person, index) in team"
          data-aos="fade-up" 
          :data-aos-delay="index * 200">
            <Picture
              v-if="person.image"
              type="column"
              :image="person.image" />
            <div 
              v-if="person.text" 
              v-html="person.text"
              class="mt-2">
            </div>
        </div>
      </div>  
    </div>  
  </div>
</template>

<script setup>
  const { getItems } = useDirectusItems();

  const props = defineProps({
    id: String,
    index: Number,
    collection: String,
  })
  
  const {
    data: team,
    pendingTeam,
    errorTeam,
    } = await useAsyncData('team' + props.id, () => {
      return getItems({      
        collection: "team",      
          params: { 
            
          fields: ['*', 'image.*'],           
        },    
      })
    },
  {
    transform: (data) => data
  })

  const { getItemById } = useDirectusItems()
  const {
    data: block,
    pending: pendingBlock,
    error: errorBlock,
  } = await useAsyncData(
    'block' + props.collection + props.id,
    () => {
      return getItemById({
        collection: props.collection,
        id: props.id,
        params: {
          fields: ['*.*'],
        },
      })
    },
    {
      transform: (data) => data,
    }
  )
</script>