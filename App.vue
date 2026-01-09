<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
  useSeoMeta({
    // title: 'Ingenieurbüro Gleisplan – Wir gestalten Zukunft.',
    // ogTitle: 'Ingenieurbüro Gleisplan – Wir gestalten Zukunft.',
    // description: 'Mit Fokus auf Eisenbahninfrastruktur verbinden wir Menschen und gestalten Zukunft. Kompetent, zuverlässig, respektvoll. – Wir sind Gleisplan.',
    // ogDescription: 'Mit Fokus auf Eisenbahninfrastruktur verbinden wir Menschen und gestalten Zukunft. Kompetent, zuverlässig, respektvoll. – Wir sind Gleisplan.',
    ogImage: '/open-graph.png',
    ogUrl: 'https://gleisplan-leipzig.de/',
    ogType: 'website'
  })
</script>

<style>
  .page-enter-active,
  .page-leave-active {
    transition: all 0.2s;
  }
  .page-enter-from,
  .page-leave-to {
    opacity: 0;
  }
</style>