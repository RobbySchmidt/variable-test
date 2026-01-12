<template>
  <footer class="relative z-20">
    <div 
      v-if="route.path === '/karriere' || route.path.startsWith('/jobs/')"
      class="bg-secondary-400 relative py-f-24">
      <div class="container p-4">
        <div class="lg:w-9/12 mx-auto grid xl:grid-cols-2 gap-f-12 items-center">
          <div 
            data-aos="fade-up" 
            data-aos-delay="200">
            <Picture
              v-if="general.contact_image"
              type="column"
              :image="general.contact_image" />
          </div>

            <div class="space-y-3"
              data-aos="fade-up" 
              data-aos-delay="400">
              <h3 
                class="text-f-xl font-medium">
                Hast du Fragen? Melde dich gern.
              </h3>

              <address class="border-y border-black not-italic">
                <span
                  class="border-b border-black py-3 block" 
                  v-if="general.contact_name">
                  {{ general.contact_name }}
                </span>
                <span
                  class="border-b border-black py-3 block" 
                  v-if="general.office_times">
                  {{ general.office_times }}
                </span>

                <NuxtLink
                  v-if="general.phone"
                  :href="'tel:' + general.phone"
                  class="no-underline block pt-3">
                  T {{ general.phone }}
                </NuxtLink>

                <NuxtLink
                  v-if="general.email"
                  :href="'mailto:' + general.email"
                  class="no-underline block pb-3 border-b border-black">
                  {{ general.email }}
                </NuxtLink>
                <span 
                  class="pt-3 block" 
                  v-if="general.company_name">
                  {{ general.company_name }}</span>
                <div
                  class="pb-3 [&>p]:mb-0"
                  v-if="general.company_address" 
                  v-html="formatText(general.company_address)">
                </div>
              </address>
            </div>
        </div>
      </div>
    </div>
    <div class="text-primary bg-white border-y border-primary"
      :class="route.path === '/kontakt' ? 'hidden' : ''">
      <div class="container">
        <div class="lg:w-9/12 mx-auto grid md:grid-cols-2 text-f-lg">
          <div class="border-b md:border-b-0 md:border-r border-primary py-f-16 px-4">
            <span 
              v-if="general.company_name">
              {{ general.company_name }}
            </span>           
            <div 
              v-if="general.company_address"
              v-html="general.company_address">
            </div>
          </div>
      
          <div class="py-f-16 px-4 md:pl-f-24">
            <NuxtLink
              v-if="general.phone"
              :href="'tel:' + general.phone"
              class="no-underline block w-fit">
              T {{ general.phone }}
            </NuxtLink>

            <NuxtLink
              v-if="general.email"
              :href="'mailto:' + general.email"
              class="no-underline block w-fit hover:text-secondary duration-300 ease-in-out">
              {{ general.email }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <div 
      class="text-primary bg-white border-b border-primary"
      :class="route.path === '/kontakt' ? 'border-t' : ''">
      <div class="container">
        <div class="lg:w-9/12 mx-auto grid md:grid-cols-2 text-xs">           
          <div 
            v-if="general.additional_field_left"
            class="border-b md:border-b-0 md:border-r border-primary py-3 px-4"
            v-html="general.additional_field_left">
          </div>
      
          <div 
            v-if="general.additional_field_right"
            class="py-3 px-4 md:pl-f-24"
            v-html="general.additional_field_right">
          </div>
        </div>
      </div>
    </div>
    <div class="text-primary bg-white">
      <div class="container">
        <div class="lg:w-9/12 mx-auto grid md:grid-cols-2 gap-f-12 text-xs px-4">
          <ul>
            <li class="flex gap-4 justify-start flex-wrap py-3">
              <NuxtLink 
                v-if="navigation"
                v-for="link in navigation.items"
                :to="link.page.slug"
                :target="link.open_in_new_tab ? '_blank' : ''"
                class="hover:text-primary-gray-300 duration-300 ease-in-out"
                >{{ link.title }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>  
</template>

<script setup>
  const route = useRoute()
  const { getItems } = useDirectusItems();
  const {
      data: general,
      pending: pendingGeneral,
      error: errorGeneral,
    } = await useAsyncData('footerConf', () => {
      return getItems({      
        collection: "general",      
        params: {
        fields: [
          '*',
          'contact_image.*'
        ],
        
      }

      })
      },
      {
        transform: (data) => data,
      }
    )
  
      
  const {
    data: navigation,
    pending,
    error,
  } = await useAsyncData('footerNavigation', () => {
    return getItems({      
        collection: "navigation",      
        params: { 
          filter: {   
           title: {
              _eq: "Footer"
            }
          },
          fields: ['items.*', 'items.page.slug', 'items.children.page.*', 'items.children.*', 'items.category.*', 'items.categoryFacilitie.*'],
        },    
      })
    
  },
  {
    transform: (data) => data[0]
  });

</script>
