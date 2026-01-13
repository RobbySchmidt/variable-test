<template>
  <Sheet v-if="location.additional_informations.length > 0">
    <SheetTrigger class="col-span-1 flex items-center justify-center gap-2 bg-accent rounded-sm px-4 py-2 cursor-pointer w-fit shadow-md mb-6 font-medium text-base duration-300 ease-in-out">
       <CircleAlert class="flex-none"/> <span>Wichtige Praxis-Infos</span>
    </SheetTrigger>
    <SheetContent>
      <SheetHeader class="px-4 pt-9 pb-4">
        <SheetTitle class="text-xl flex items-center gap-2"><CircleAlert/> Wichtige Informationen</SheetTitle>
      </SheetHeader>
      <ul class="space-y-4">
        <li
          v-if="location.additional_informations"
          v-for="info in location.additional_informations"
          v-html="info.information"
          class="flex gap-2 items-start px-4 rounded-sm bg-accent/80 mx-4 py-4 font-medium">
        </li>
      </ul> 
    </SheetContent>
  </Sheet>
</template>
<script setup>
import { CircleAlert } from 'lucide-vue-next'
  const props = defineProps({
    location: Object
  })
</script>
<style scoped>

</style>