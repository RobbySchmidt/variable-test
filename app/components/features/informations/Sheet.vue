<template>
  <Sheet>
    <SheetTrigger
      class="text-sm md:text-base leading-0 flex items-center gap-3 bg-secondary p-3 rounded-bl-sm shadow-md md:rounded-sm cursor-pointer fixed right-0 md:top-[75px] md:right-2 lg:top-[100px] z-30 font-medium lg:hover:translate-x-0 duration-500 ease-in-out"
      :class="{'translate-x-[108px] md:translate-x-[128px]' : scrollToTopActive}">
      <Clock class="-mt-0.5"/> Sprechzeiten
    </SheetTrigger>
    <SheetContent class="">
      <SheetHeader class="px-4 pt-9 pb-4">
        <SheetTitle class="text-xl">Bitte wähle deinen Standort.</SheetTitle>
      </SheetHeader>
      <ul>
        <li 
          v-if="locations"
          v-for="location in locations" 
          class="text-black text-base hover:font-bold first:border-t-2 border-b-2 border-secondary duration-300 ease-in-out hover:bg-secondary">
          <Sheet>
            <SheetTrigger class="pl-4 py-4 pr-6 cursor-pointer font-medium text-base w-full text-left group flex justify-between">
              <span v-if="location.title">
                {{ location.title }}
              </span>
              <MoveRight class="size-6 opacity-0 translate-x-[-8px] 
              transition-all duration-300 ease-in-out 
              group-hover:opacity-100 group-hover:translate-x-0"/>
            </SheetTrigger>
            <SheetContent class="" :overlay="false">
              <SheetHeader class="px-4 pt-9 pb-4">
                <SheetTitle 
                  v-if="location.title" 
                  class="text-xl">Sprechzeiten in
                  {{ location.title }}
                </SheetTitle>
              </SheetHeader>
              <dl class="grid grid-cols-3 text-black font-medium text-base px-4">
                <template 
                  v-if="location.table_content" 
                  v-for="item in location.table_content">
                  <dt
                    v-if="item.day" 
                    class="col-span-1 py-4 px-2 border-b-2 border-secondary first:border-t-2">
                    {{ item.day }}
                  </dt>
                  <dd
                    v-if="item.hours" 
                    v-html="item.hours" 
                    class="col-span-2 text-right px-2 py-4 pr-8 border-b-2 border-secondary nth-[2]:border-t-2">
                  </dd>
                </template>
              </dl>
              <p class="px-8 font-medium text-black mt-2 mb-4 text-xs">
                und nach Vereinbarung
              </p>
              <div class="px-4 space-y-3 [&>button:nth-child(2)]:w-full">
                <Sheet v-if="location.show_closing_times">
                    <SheetTrigger class="py-2 rounded-sm cursor-pointer text-primary-foreground w-full px-4 bg-primary flex items-center gap-2 justify-center shadow-md font-medium">
                      <ClockAlert class="-mt-0.5"/> Schließzeiten
                    </SheetTrigger>
                  <SheetContent :overlay="false" class="">
                    <SheetHeader class="py-4.5"></SheetHeader>
                    <div
                      v-if="location.closing_times" 
                      v-html="location.closing_times" 
                      class="[&>h2]:text-xl [&>h3]:text-base [&>h3]:font-bold [&>h3]:my-2 [&>ul]:list-disc [&>ul]:ml-6 [&>ul]:mb-6 font-medium [&>hr]:border-secondary [&>hr]:border-t-2 [&>hr]:my-4 px-4">
                    </div>
                  </SheetContent>
                </Sheet>
                <WebsiteSheetImportantInfos :location="location"/>
              </div>
              <div class="px-4 space-y-4 mt-12">
                <h2 class="text-xl font-bold">
                  Kontakt
                </h2>
                <div class="font-medium">
                  <div
                    v-if="location.address" 
                    v-html="location.address" 
                    class="mb-2">
                  </div>
                  <NuxtLink 
                    v-if="location.googlemaps" 
                    :to="location.googlemaps" 
                    target="_blank" 
                    class="underline">
                    Anfahrt planen
                  </NuxtLink>
                </div>
                <div class="font-medium flex flex-col gap-0.5 mt-2 pb-9">
                  <NuxtLink
                    v-if="location.phone"
                    :to="`tel:${location.phone}`"
                    target="_blank">
                    T {{ location.phone }}
                  </NuxtLink>
                  <NuxtLink
                    v-if="location.fax"
                    :to="`tel:${location.fax}`"
                    target="_blank">
                    F {{ location.fax }}
                  </NuxtLink>
                  <NuxtLink
                    v-if="location.email"
                    :to="`mailto:${location.email}`"
                    target="_blank">
                    {{ location.email }}
                  </NuxtLink>
                </div>              
              </div>
            </SheetContent>
          </Sheet>
        </li>
      </ul>
    </SheetContent>
  </Sheet>
</template>
<script setup>
  import { MoveRight, Clock, ClockAlert } from 'lucide-vue-next'
  import { useWindowScroll } from "@vueuse/core";
  const { getItems } = useDirectusItems();

  const {
    data: locations,
    pendingLocations,
    errorLocations,
  } = await useAsyncData('locations', () => {
    return getItems({      
      collection: "locations",      
      params: { 
        fields: ['*', '*.*'],
      },    
    })
  },
  {
    transform: (data) => data
  })

  // Sheet-Trigger Animation-Trigger
  const scrollToTopActive = ref(false)

  const { y } = useWindowScroll(window);
 
  watch(y, (value) => {
    if(value > 0)
    {
        scrollToTopActive.value = true
    }else{
        scrollToTopActive.value = false
    }    
  });

</script>
<style scoped>

</style>