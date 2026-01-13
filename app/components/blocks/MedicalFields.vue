<template>
    <div class="md:mx-auto xl:max-w-[1100px] 3xl:max-w-[1300px] px-4 md:px-8 xl:px-0 grid lg:grid-cols-2 gap-f-12 pt-f-24 pb-f-12">
      <div 
        v-if="medicalFields"
        v-for="field in medicalFields"
        class="py-f-12 px-4 md:px-f-12 space-y-f-8 rounded-sm"
        :class="field.color.color === 'Primary' ? 'text-white' : 'text-primary'"
        :style="{ backgroundColor: field.color.code }">
        <h2 
          v-if="field.field"
          class="font-bold text-f-4xl">
          {{ field.field }}
        </h2>

        <div 
          v-if="field.description"
          class="text-base"
          v-html="formatText(field.description)">
        </div>

        <div class="space-y-3">
          <span 
            class="font-bold text-base block">
            An folgenden Standorten verfügbar:
          </span>

          <ul class="">
            <li class=" flex gap-3 flex-wrap pt-3">
              <NuxtLink
                class="text-base relative"
                v-if="field.locations"
                v-for="location in field.locations.sort((a, b) => a.locations_id.title.localeCompare(b.locations_id.title))"
                :to="'/standorte/' + location.locations_id.slug">
               
                <Button as-child variant="ghost" class="!px-4 duration-200 ease-in-out">
                  <span v-if="location.locations_id">
                    {{ location.locations_id.title }}
                  </span>

                  <span
                    v-if="field.private?.some(p => p.locations_id.title === location.locations_id.title)"
                    class="absolute top-1.5 right-2 z-30">
                    *
                  </span>
                </Button>
              </NuxtLink>
            </li>
          </ul>

          <span 
            v-if="field.private && field.private.length > 0"
            class="font-medium text-base">
            *nur als Privatleistung
          </span>
        </div>
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
    data: medicalFields,
    pendingMedicalFields,
    errorMedicalFields,
  } = await useAsyncData('medicalFields', () => {
    return getItems({      
      collection: "medicalFields",      
      params: { 
        fields: ['*', '*.*', 'locations.locations_id.title', 'locations.locations_id.slug', 'private.locations_id.title'],
      },    
    })
  },
  {
    transform: (data) => data
  })
</script>

<style lang="scss" scoped>

</style>