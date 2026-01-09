<template>
  <div 
    id="kontakt" 
    class="pt-f-24 pb-24 scroll-m-16 lg:scroll-m-0"
    data-aos="fade-up" 
    data-aos-delay="200">
    <div class="container p-4">
      <div class="lg:w-9/12 mx-auto space-y-f-12">
        <div
          class="text-f-xl font-medium" 
          v-if="block.title"
          v-html="block.title">
        </div>

        <form 
          @submit="onSubmit"
          class="space-y-f-8">
          <div class="grid lg:grid-cols-2 border-y border-black">
            <div class="lg:border-r border-black border-b lg:border-b-0">
              <FormField 
                v-slot="{ componentField }"
                name="lastName">
                <FormItem>
                  <FormControl>
                    <Input
                      class="border-b border-black" 
                      type="text" 
                      placeholder="Nachname"
                      aria-label="Nachname"
                      aria-describedby="lastName-error" 
                      v-bind="componentField" />
                  </FormControl>
                  <FormMessage 
                    id="lastName-error"
                    class="pt-1" />
                </FormItem>
              </FormField>
              <FormField 
                v-slot="{ componentField }"
                name="firstName">
                <FormItem>
                  <FormControl>
                    <Input
                      class="border-b border-black" 
                      type="text" 
                      placeholder="Vorname"
                      aria-label="Vorname"
                      aria-describedby="firstName-error"
                      v-bind="componentField" />
                  </FormControl>
                  <FormMessage 
                    id="firstName-error"
                    class="pt-1" />
                </FormItem>
              </FormField>
              <FormField 
                v-slot="{ componentField }"
                name="phone">
                <FormItem>
                  <FormControl>
                    <Input
                      class="border-b border-black" 
                      type="phone" 
                      placeholder="Telefonnummer (optional)"
                      aria-label="Telefonnummer" 
                      aria-describedby="phone-error"
                      v-bind="componentField" />
                  </FormControl>
                  <FormMessage 
                    id="phone-error"
                    class="pt-1"/>
                </FormItem>
              </FormField>
              <FormField 
                v-slot="{ componentField }"
                name="email">
                <FormItem>
                  <FormControl>
                    <Input
                      type="email" 
                      placeholder="E-Mail"
                      aria-label="E-Mail Adresse" 
                      aria-describedby="email-error" 
                      v-bind="componentField" />
                  </FormControl>
                  <FormMessage 
                    id="email-error"
                    class="pt-1" />
                </FormItem>
              </FormField> 
            </div>
            <div>
              <FormField 
                v-slot="{ componentField }"
                name="message">
                <FormItem>
                  <FormControl>
                    <Textarea 
                      class="!text-base"
                      type="message" 
                      placeholder="Ihre Nachricht"
                      aria-label="Nachricht" 
                      aria-describedby="message-error"
                      v-bind="componentField" />
                  </FormControl>
                  <FormMessage 
                    class="lg:pl-4 pt-1"
                    id="message-error"/>
                </FormItem>
              </FormField>
            </div>
          </div>
          <div class="grid lg:grid-cols-2">
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
                      class="text-xs text-black">
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
          <div class="relative ">
            <Button
              type="submit"
              variant="primary_inverted"
              :disabled="!form.values.dsgvo">
              absenden
            </Button>
            <transition>
              <p v-if="successMessage" class="bg-green-200 p-4 text-sm md:text-base  transition-all duration-300 ease-in-out absolute -bottom-22 mb-0">{{ successMessage }}</p>
            </transition>
            <transition>
              <p v-if="errorMessage" class="bg-red-300 p-4 text-sm md:text-base  transition-all duration-300 ease-in-out -bottom-22 mb-0">{{ errorMessage }}</p>
            </transition>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useForm } from 'vee-validate'
  import { toTypedSchema } from '@vee-validate/zod'
  import { z } from 'zod'

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

  const successMessage = ref('')
  const errorMessage = ref('')

  const formSchema = toTypedSchema(z.object({
    firstName: z.string({
      required_error: "Bitte geben Sie Ihren Vornamen ein.",
    }),
    lastName: z.string({
      required_error: "Bitte geben Sie Ihren Nachnamen ein.",
    }),
    email: z.string({
      required_error: "Bitte geben Sie Ihre E-Mail Adresse ein.",
    }).email("Bitte geben Sie eine gültige E-Mail Adresse ein."),
    phone: z.string().optional(),
    message: z.string({
      required_error: "Bitte geben Sie Ihre Nachricht ein.",
    }),
    dsgvo: z.literal(true, {
      message: 'Bitte akzeptieren sie die Datenschutzbestimmungen.'
    }),
    honeypot: z.string().optional(),
  }))

  const form = useForm({
    validationSchema: formSchema,
  })

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      const response = await $fetch('/api/send-contact', {
        method: 'POST',
        body: values,
      })
      console.log('Antwort: ', response)
      if (response.success) {
        // Felder zurücksetzen
        successMessage.value = 'Vielen Dank! Wir haben deine Anfrage erhalten und werden uns in Kürze bei dir zurückmelden.'
        form.resetForm()
        setTimeout(() => {
          successMessage.value = ''
        }, 6000);
      } else if(response.error) {

        throw new Error(response.error)
        
      } else {

        throw new Error("Beim Versuch, deine Mitteilung zu versenden, ist ein Fehler aufgetreten. Bitte versuche es später noch einmal.")

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
    -webkit-text-fill-color: #000;
    -webkit-box-shadow: 0 0 0px 100px #FFF inset;
  }
</style>