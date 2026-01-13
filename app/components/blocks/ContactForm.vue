<template>
  <form @submit="onSubmit">
    <FormField 
      v-slot="{ componentField }" 
      name="name">
      <FormItem class="relative">
        <FormControl>
          <Input 
            type="text" 
            placeholder="Name"
            aria-label="Name"
            aria-describedby="name-error"  
            v-bind="componentField" 
            class="border-y-2 border-primary"/>
        </FormControl>
        <FormMessage 
          id="name-error"
          class="absolute left-3 top-9"/>
      </FormItem> 
    </FormField>

    <FormField 
      v-slot="{ componentField }" 
      name="phone">
      <FormItem>
        <FormControl>
          <Input 
            type="phone" 
            placeholder="Telefonnummer (optional)"
            aria-label="Telefonnummer"
            aria-describedby="phone-error"  
            v-bind="componentField"/>
        </FormControl>
        <FormMessage id="phone-error"/>
      </FormItem> 
    </FormField>

    <FormField 
      v-slot="{ componentField }" 
      name="email"
      >
      <FormItem class="relative">
        <FormControl>
          <Input 
            type="email" 
            placeholder="E-Mail"
            aria-label="E-Mail Adresse"
            aria-describedby="email-error"  
            v-bind="componentField" 
            class="border-y-2 border-primary"/>
        </FormControl>
        <FormMessage 
          id="email-error" 
          class="absolute left-3 top-9"/>
      </FormItem> 
    </FormField>

    <div class="flex items-center space-x-2 mt-6 mb-8 max-w-sm">
      <FormField
        v-slot="{ componentField }"
        type="checkbox"
        name="dsgvo">
        <FormItem>
          <FormControl> 
            <div class="flex gap-2 items-center">
              <Checkbox
                v-bind="componentField"
                id="datenschutz" />
              <label
                for="datenschutz"
                class="text-xs leading-4 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Ich habe die 
                <NuxtLink 
                  class="underline" 
                  to="/datenschutz"
                  target="_blank"
                  aria-label="zum Datenschutz">
                  Datenschutzbestimmungen
                </NuxtLink> 
                gelesen und akzeptiere diese.
              </label>
            </div>
          </FormControl>
        </FormItem>
      </FormField>
      <FormField 
        v-slot="{ componentField }"
        name="honeypot">
        <FormItem>
          <FormControl>
            <Input
              class="hidden"
              type="text"
              placeholder="Honeypot" 
              v-bind="componentField" />
            </FormControl>
        </FormItem>
      </FormField>
    </div>

    <div class="relative">
      <p v-if="successMessage"
        class="bg-green-500 text-white px-8 pt-2.5 pb-2 w-full xl:w-fit flex items-center gap-2">
        {{ successMessage }}
        <CircleCheck />
      </p>

      <p v-else-if="errorMessage"
        class="bg-red-500 text-white px-8 pt-2.5 pb-2 w-full xl:w-fit flex items-center gap-2">
        {{ errorMessage }}
        <CircleX />
      </p>

      <Button v-else
        type="submit" 
        class="hover:bg-background z-20" 
        :disabled="!form.values.dsgvo">
        <span class="group-hover:-translate-x-2 duration-300 ease-in-out font-normal">
          Rückmeldung anfordern
        </span>
        <MoveRight class="size-6 stroke-1 opacity-0 translate-x-[-8px] 
          transition-all duration-300 ease-in-out 
          group-hover:opacity-100 group-hover:translate-x-0"/>
      </Button>
    </div>
  </form>
</template>

<script setup>

  const props = defineProps({
    contact: String,
    job: String
  })

  import { MoveRight, CircleCheck, CircleX } from 'lucide-vue-next'
  import { toTypedSchema } from "@vee-validate/zod"
  import { useForm } from "vee-validate"
  import { h } from "vue"
  import * as z from "zod"

  const successMessage = ref('')
  const errorMessage = ref('')
  const success = ref(false)

  const formSchema = toTypedSchema(z.object({
    name: z.string().min(1, "Bitte trage deinen Namen ein.").max(50),
    email: z.string().email("Bitte trage deine E-Mail Adresse ein."),
    phone: z.string().optional(),
    dsgvo: z.literal(true, {
      message: 'Bitte akzeptieren sie die Datenschutzbestimmungen.'
    }),
    honeypot: z.string().optional(),
  }))

  const form = useForm({
    validationSchema: formSchema,
    initialValues: {
      name: '',
      email: '',
      phone: '',
      dsgvo: false,
      honeypot: ''
    }
  })

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      const response = await $fetch('/api/send-contact', {
        method: 'POST',
        body: {
        ...values,
        additionalEmailTo: props.contact,
        job: props.job
      }
      })
      if (response.success) {
        // Felder zurücksetzen
        successMessage.value = 'Anfrage erfolgreich versendet.'
        success.value = true
        form.resetForm()
        setTimeout(() => {
          successMessage.value = ''
          success.value = false
        }, 6000);
      } else if(response.error) {

        throw new Error(response.error)
        
      } else {

        throw new Error("Fehler beim versenden der Anfrage.")

      }
    } catch (error) {
      
      errorMessage.value = error?.message || String(error)
      setTimeout(() => {
        errorMessage.value = ''
      }, 6000);

    }
  })
</script>

<style scoped>
  input:-webkit-autofill,
  input:-webkit-autofill:hover, 
  input:-webkit-autofill:focus
  {
    -webkit-text-fill-color: #01233A;
    -webkit-box-shadow: 0 0 0px 100px #FF8D6A inset;
    transition: background-color 5000s ease-in-out 0s;
  }
</style>