<template>
  <div>
    <div class="md:mx-auto space-y-6 xl:space-y-f-12 pt-f-12 pb-f-12 columns">
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
      <div class="gap-6 xl:gap-f-12 grid md:grid-cols-3">
        <article
          v-if="block.cards" 
          v-for="card in block.cards">
          <NuxtLink
            :to="card.url"
            :target="card.openInNewTab ? '_blank' : ''"
            class="p-5 lg:p-8 h-full bg-accent text-primary rounded-sm group lg:hover:bg-accent-secondary duration-300 ease-in-out flex flex-col justify-between gap-4">
            <div class=" ">
              <h2
                v-if="card.name" 
                class="text-2xl font-bold mb-2">
                {{ card.name }}
              </h2>
              <div
                v-if="card.description"
                v-html="card.description"
                class="text-lg">
              </div>
            </div>
            <CircleArrowRight class="inline-flex lg:group-hover:translate-x-3 duration-300 ease-in-out"/>
          </NuxtLink>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { CircleArrowRight, RefreshCw } from 'lucide-vue-next';

  const props = defineProps({
    id: String,
    index: Number,
    collection: String,
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
      typebot: block.value.typebot_id,
      apiHost: block.value.typebot_host,
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