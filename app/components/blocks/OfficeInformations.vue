<template>
  <div class="columns py-f-24">
    <div class="grid grid-cols-2 gap-f-12">
      <div class="space-y-f-8 bg-secondary p-f-12 rounded">
        <h3 class="font-medium text-f-xl">Kontakt</h3>
        <p>
          HYGIEIA.net
          <br>
          - MVZ Chemnitz GbR
          <br>
          Augustusburger Straße 1
          <br>
          09111 Chemnitz
        </p>
        <NuxtLink class="underline block">
          Anfahrt planen
        </NuxtLink>

        <div>
          <NuxtLink class="block">
            T 0371/911996-00
          </NuxtLink>
          <NuxtLink class="block">
            F 0371/911996-99
          </NuxtLink>
          <NuxtLink class="block">
            chemnitz@hygieia.net
          </NuxtLink>
        </div>
      </div>
      <div class="space-y-f-8 bg-secondary p-f-12 rounded">
        <h3 class="font-medium text-f-xl">Sprechzeiten</h3>
        <ul class="border-t border-black">
          <li class="flex justify-between border-b border-black py-3">
            <span>Montag</span>
            <div>
              <span class="block">08:00-12:30</span>
              <span class="block">14:00-16:00</span>
            </div>
          </li>
          <li class="flex justify-between border-b border-black py-3">
            <span>Dienstag</span>
            <div>
              <span class="block">08:00-12:30</span>
              <span class="block">14:00-16:00</span>
            </div>
          </li>
          <li class="flex justify-between border-b border-black py-3">
            <span>Mittwoch</span>
            <div>
              <span class="block">08:00-12:30</span>
            </div>
          </li>
          <li class="flex justify-between border-b border-black py-3">
            <span>Donnerstag</span>
            <div>
              <span class="block">08:00-12:30</span>
              <span class="block">14:00-16:00</span>
            </div>
          </li>
          <li class="flex justify-between border-b border-black py-3">
            <span>Freitag</span>
            <div>
              <span class="block">08:00-12:30</span>
            </div>
          </li>
        </ul>
        <Button>
          zur Terminbuchung
        </Button>
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

  const { getItemById } = useDirectusItems();

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

</script>