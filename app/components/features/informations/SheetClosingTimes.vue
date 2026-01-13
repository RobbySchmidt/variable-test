<template>
  <Sheet>
    <div>
      <SheetTrigger>
        <Button
          variant="ghost" class="relative group-hover:-translate-x-2 duration-300 ease-in-out font-medium text-base">
          <ClockAlert class="size-5 -mt-0.5"/> Schließzeiten
          <MoveRight class="size-6 stroke-1.5 opacity-0 translate-x-[-8px] 
          transition-all duration-300 ease-in-out 
          group-hover:opacity-100 group-hover:translate-x-0"/>
        </Button>
      </SheetTrigger>
    </div>
    <SheetContent>
      <SheetHeader>
      </SheetHeader>
      <div
        v-if="closingTimes"
        v-html="closingTimes" 
        class="[&>h2]:text-xl [&>h3]:text-base [&>h3]:font-bold [&>h3]:my-2 [&>ul]:list-disc [&>ul]:ml-6 [&>ul]:mb-6 font-medium [&>hr]:border-secondary [&>hr]:border-t-2 [&>hr]:my-4 px-4">
      </div>
    </SheetContent>
  </Sheet>
</template>

<script setup>
  import { MoveRight, ClockAlert } from 'lucide-vue-next';
  const props = defineProps({
    closingTimes: String,
  })
</script>

<style scoped>

</style>