<template>
  <div class="container h-screen grid content-center">
    <div class="lg:w-9/12 mx-auto text-center space-y-f-12">
      <div class="">
        <img 
          src="/svg/success.svg"
          class="w-20 h-20 block mx-auto" 
          alt="">
      </div>
      <div class="space-y-f-6">
        <h1 class="text-f-2xl text-prime">Deine Bewerbung wurde erfolgreich verschickt.</h1>
        <p class="text-f-lg">Wir freuen uns sehr über dein Interesse! 
          Du erhältst so schnell wie möglich eine Rückmeldung von uns.
        </p>
        <Button 
          as-child
          variant="primary_inverted"
          class="mx-auto">
          <NuxtLink to="/" >
            zurück zur Startseite
          </NuxtLink>
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
  definePageMeta({
    middleware: 'success'
  })
</script>