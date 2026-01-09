<template>
  <div id="bewerbung" class="scroll-m-16 lg:scroll-m-0">
    <div class="lg:w-6/12 mx-auto space-y-f-12">
      <div class="space-y-3">
        <h2 class="text-f-xl font-medium">Sende Deine Bewerbung ganz einfach direkt zu uns.</h2>
        <p>Ein Anschreiben benötigen wir nicht, lediglich Deinen beruflichen Werdegang sowie Deinen Nachweis zum höchsten beruflichen Abschluss.</p>
      </div>

      <h3 class="text-f-xl font-medium">Persönliche Daten</h3>

      <form 
        @submit="onSubmit">
        <div class="grid lg:grid-cols-2 gap-f-6">
          <FormField
            v-slot="{ componentField }"
            name="title">
            <FormItem class="relative">
              <FormLabel>Titel (optional)</FormLabel>

              <Select v-bind="componentField">
                <FormControl>
                  <SelectTrigger class="border">
                    <SelectValue placeholder="Herr/ Frau/ Divers" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Herr">
                      Herr
                    </SelectItem>
                    <SelectItem value="Frau">
                      Frau
                    </SelectItem>
                    <SelectItem value="Divers">
                      Divers
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          </FormField>
          <fieldset class="col-span-full">
            <legend class="mb-2">Name</legend>
            <div class="grid md:grid-cols-2 gap-f-6">
              <FormField 
                v-slot="{ componentField }"
                name="firstname"
                >
                <FormItem class="relative">
                  <FormControl>
                    <Input
                      type="text" 
                      placeholder="Max"
                      aria-label="Vorname" 
                      v-bind="componentField"
                      class="text-black border border-black placeholder:text-black/70 w-full min-w-0 bg-transparent p-2.5 text-base transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"/>
                  </FormControl>
                  <FormMessage class="-bottom-4.5 mb-0"/>
                </FormItem>
              </FormField>
              <FormField 
                v-slot="{ componentField }"
                name="lastname"
                >
                <FormItem class="relative">
                  <FormControl>
                    <Input
                      type="text" 
                      placeholder="Mustermann"
                      aria-label="Nachname" 
                      v-bind="componentField"
                      class="text-black border border-black placeholder:text-black/70 w-full min-w-0 bg-transparent p-2.5 outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"/>
                  </FormControl>
                  <FormMessage class="-bottom-4.5 mb-0"/>
                </FormItem>
              </FormField>
            </div>
          </fieldset>
          <FormField
            v-slot="{ componentField }"
            name="phone"
            >
            <FormItem class="col-span-full relative">
              <FormLabel>Telefonnummer</FormLabel>
              <FormControl>
                <Input
                  type="phone" 
                  placeholder="+49 123 456789" 
                  v-bind="componentField"
                  class="text-black border border-black placeholder:text-black/70 w-full min-w-0 bg-transparent p-2.5 outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"/>
              </FormControl>
              <FormMessage class="-bottom-4.5 mb-0"/>
            </FormItem>
          </FormField>
          <FormField 
            v-slot="{ componentField }"
            name="email"
            >
            <FormItem class="col-span-full relative">
              <FormLabel>E-Mail-Adresse</FormLabel>
              <FormControl>
                <Input
                  type="email" 
                  placeholder="max.mustermann@example.com"
                  v-bind="componentField"
                  class="text-black border border-black placeholder:text-black/70 w-full min-w-0 bg-transparent p-2.5 outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"/>
              </FormControl>
              <FormMessage class="-bottom-4.5 mb-0"/>
            </FormItem>
          </FormField>
          <FormField 
            v-slot="{ componentField }"
            v-model="startdate"  
            name="startdate">
            <FormItem class="flex flex-col relative">
              <FormLabel>Verfügbar ab</FormLabel>
              <Popover>
                <PopoverTrigger as-child>
                  <Button
                    class="text-black font-normal relative text-base flex items-center border-black border p-2.5 w-full cursor-pointer lg:hover:text-black justify-start"
                    :class="startdate ? 'text-black' : ''"
                  >
                    <CalendarIcon class="mr-2 h-4 w-4" />
                    {{ startdate ? df.format(startdate.toDate(getLocalTimeZone())) : "Datum auswählen" }}
                  </Button>
                </PopoverTrigger>
                <PopoverContent class="w-auto p-0">
                  <Calendar v-bind="componentField" initial-focus/>
                </PopoverContent>
              </Popover>
              <FormMessage class="-bottom-4.5 mb-0"/>
            </FormItem>
          </FormField>

          <div class="col-start-1 col-span-1 mt-f-12 space-y-4">
            <h3 class="text-f-xl font-medium">Bewerbungsunterlagen</h3>
            <span>Bitte lade Deinen Lebenslauf und aktuelle Zeugnisse hoch (insgesamt max. 20 MB).</span>
          </div>

          <FormField 
            name="files"
            >
            <FormItem class="col-start-1 col-span-1 relative">
              <FormLabel>Dokumente hochladen*</FormLabel>
                <FormControl>
                  <input
                    ref="fileInput"
                    type="file"
                    accept="application/pdf"
                    multiple
                    @change="handleFileChange"
                    class="text-black border border-black placeholder:text-black/70 w-full min-w-0 bg-transparent p-2.5 outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 h-56 opacity-0 xl:cursor-pointer"/>
                    <div class="absolute top-8 right-0 bottom-0 left-0 block w-full ring-1 pointer-events-none border p-4">
                      <div v-if="files.length === 0" class="flex flex-col justify-center gap-3 items-center h-full">
                        <FileUp
                          class="size-10"/>
                        <span class="text-sm text-gray-600">
                          Klicke oder ziehe deine Dateien hierher
                        </span>
                      </div>
                      <span
                        v-for="file in files" 
                        class="flex items-center justify-between gap-1 pointer-events-auto">
                        {{ file.name }}
                        <CircleX 
                          @click="removeFile(file)" 
                          class="size-4 text-red-500 cursor-pointer"/>
                      </span>
                    </div>
                </FormControl>
              <FormMessage class="-bottom-4.5 mb-0"/>
              <Transition>
                <span
                  v-if="duplicateMessage"
                  class="text-green-500 text-xs absolute -bottom-4.5 mb-0 transition-all duration-300">
                  {{ duplicateMessage }}
                </span>
              </Transition>
              <Transition>
                <span
                  v-if="errorMessage"
                  class="text-destructive text-xs absolute -bottom-4.5 mb-0 transition-all duration-300">
                  {{ errorMessage }}
                </span>
              </Transition>
            </FormItem>
          </FormField>
        </div>
        <FormField
          v-slot="{ componentField }"
          type="checkbox"
          name="dsgvo">
          <FormItem class="relative">
            <FormControl> 
              <div class="flex items-start space-x-2 text-sm mt-8">
                <Checkbox 
                  id="terms" 
                  v-bind="componentField"/>
                <label 
                  for="terms">
                  Ich habe die 
                  <NuxtLink to="/datenschutz" 
                    class="underline">
                    Datenschutzerklärung
                  </NuxtLink> 
                    zur Kenntnis genommen. Ich stimme zu, dass meine Angaben zur Kontaktaufnahme und für Rückfragen dauerhaft gespeichert werden. Hinweis: Sie können Ihre Einwilligung jederzeit für die Zukunft per Mail an info@gleisplan-leipzig.de widerrufen.
                </label>
              </div>
            </FormControl>
            <FormMessage class="-bottom-4.5 mb-0"/>
          </FormItem>
        </FormField>
        <Button type="submit" variant="primary_inverted" class="mt-8" :disabled="!form.values.dsgvo" >
          Bewerbung senden
        </Button>
      </form>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    jobTitle: String,
  })

  import { CircleX, FileUp } from 'lucide-vue-next'
  import { DateFormatter, getLocalTimeZone, CalendarDate } from '@internationalized/date'
  import { CalendarIcon } from 'lucide-vue-next'
  import { useForm } from 'vee-validate'
  import { toTypedSchema } from '@vee-validate/zod'
  import { z } from 'zod'

  const df = new DateFormatter('de-DE', {
    dateStyle: 'long',
  })

  const fileInput = ref(null)
  const files = ref([])
  const duplicateMessage = ref('')
  const errorMessage = ref('')
  const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2MB

  function handleFileChange(event) {
    errorMessage.value = ''
    duplicateMessage.value = ''

    const newFiles = Array.from(event.target.files)
    const existingFileNames = files.value.map(file => file.name)

    const validFiles = []

    for (const file of newFiles) {
      if (existingFileNames.includes(file.name)) {
        duplicateMessage.value = `Die Datei "${file.name}" wurde bereits hinzugefügt.`

        setTimeout(() => {
          duplicateMessage.value = ''
        }, 3000)

        continue
      }

      if (file.size > MAX_FILE_SIZE) {
        errorMessage.value = `Die Datei "${file.name}" ist größer als 2MB.`

        setTimeout(() => {
          errorMessage.value = ''
        }, 3000)

        continue
      }

      validFiles.push(file)
    }

    if (validFiles.length > 0) {
      files.value.push(...validFiles)
      form.setFieldValue('files', files.value)
      form.validateField('files')
    }

    event.target.type = ''
    event.target.type = 'file'
  }

  function removeFile(file) {
    const index = files.value.findIndex(f => f.name === file.name)
    if (index !== -1) {
      files.value.splice(index, 1)
    }
  }

  const formSchema = toTypedSchema(
    z.object({
      title: z.string().optional(),
      firstname: z.string({
        required_error: "Bitte geben Sie Ihren Vornamen ein.",
      }).min(1, "Bitte geben Sie Ihren Vornamen ein."),
      lastname: z.string({
        required_error: "Bitte geben Sie Ihren Nachnamen ein.",
      }).min(1, "Bitte geben Sie Ihren Nachnamen ein."),
      email: z.string({
        required_error: "Bitte geben Sie Ihre E-Mail Adresse ein.",
      }).email("Bitte geben Sie eine gültige E-Mail Adresse ein."),
      phone: z.string({
        required_error: "Bitte geben Sie Ihre Telefonnummer ein.",
      }).min(1, "Bitte geben Sie Ihre Telefonnummer ein."),
      files: z.any()
        .refine(() => files.value.length > 0, {
          message: 'Bitte laden Sie mindestens ein Dokument hoch.',
        }),
      startdate: z.instanceof(CalendarDate, {
        message: "Bitte geben Sie ein Datum an.",
      }),
      dsgvo: z.literal(true, {
        message: 'Bitte akzeptieren sie die Datenschutzbestimmungen.'
      }),
    })
  )


  const startdate = ref(null)

  const form = useForm({
    validationSchema: formSchema,
  })

  const attachPDFFiles = async (fileList) => {
    const promises = fileList.map(file => new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve({ name: file.name, content: reader.result.split(',')[1] })
      reader.onerror = reject
      reader.readAsDataURL(file)
    }))
    return await Promise.all(promises)
  }

  const onSubmit = form.handleSubmit(async (values) => {
    const localTimeZone = getLocalTimeZone()
    const formattedDate = df.format(values.startdate.toDate(localTimeZone))
    
    const PDFFiles = await attachPDFFiles(files.value)

    const submissionData = {
      ...values,
      startdate: formattedDate,
      files: PDFFiles,
      jobTitle: props.jobTitle
    }
    
    try {
      const response = await $fetch('/api/send-application', {
        method: 'POST',
        body: submissionData,
      })
      if (response.success) {
        // Felder zurücksetzen
      
        form.resetForm()
        startdate.value = null
        files.value = []

        const successFlag = useCookie('formSuccess')
        successFlag.value = true
        navigateTo('/success')
       
      } else if(response.error) {

        throw new Error(response.error)
        
      } else {

        throw new Error("Beim Versuch, Ihre Mitteilung zu versenden, ist ein Fehler aufgetreten. Bitte versuchen Sie es später noch einmal.")

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