<template>
  <div>
    <div class="md:mx-auto xl:max-w-[1100px] 3xl:max-w-[1300px] px-4 md:px-8 xl:px-0 space-y-6 xl:space-y-f-12 py-f-24">
      <div class="bg-background rounded overflow-hidden relative">
        <div v-if="loadBot" class="flex items-center gap-2 w-fit mx-auto h-[300px]">
          <div class="w-4 h-4 rounded-full bg-primary animate-bounce [animation-delay:.7s]"></div>
          <div class="w-4 h-4 rounded-full bg-primary animate-bounce [animation-delay:.3s]"></div>
          <div class="w-4 h-4 rounded-full bg-primary animate-bounce [animation-delay:.7s]"></div>
        </div>
        <client-only>
          <typebot-standard ref="typebotEl" style="width: 100%;" class="h-[72vh] lg:h-[82vh] xl:h-[78vh] 3xl:h-[55vh] 4xl:h-[60vh]" />
          <RefreshCw 
            @click="reloadBot()"
            class="absolute top-6 md:top-10 2xl:top-2 right-2 z-40 cursor-pointer"
            :class="{ 'animate-spin' : animate }"/>
        </client-only>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { RefreshCw } from 'lucide-vue-next';

  const props = defineProps({
    id: String,
    index: Number,
    collection: String
  })

  const loadBot = ref(true)
  const typebotEl = ref(null)

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

  let TypebotModule = null
  
  onMounted(async () => {
    await nextTick()
    if (!typebotEl.value) return

    const { default: Typebot } = await import(
      'https://cdn.jsdelivr.net/npm/@typebot.io/js@0/dist/web.js'
    )
    TypebotModule = Typebot

    TypebotModule.initStandard({
      typebot: "my-typebot-uq2pfwy",
    })

    loadBot.value = false
  })

  const animate = ref(false)

  function reloadBot() {
    if (!TypebotModule) return
    // Clear session/state (if relevant)
    TypebotModule.reset()
    // Then fully reload the bot instance
    TypebotModule.reload()

    animate.value = true

    setTimeout(() => {
      animate.value = false
    }, 500)
  }

</script>