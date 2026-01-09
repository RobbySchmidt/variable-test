<template>   
  <div class="text-prime bg-white border-b border-prime">
    <div class="container">
      <div class="lg:w-9/12 mx-auto grid md:grid-cols-2 text-f-lg font-medium">
        <div class="border-b md:border-b-0 md:border-r border-prime py-f-16 px-4 space-y-f-6">
          <div>
            <span 
              v-if="general.company_name">
              {{ general.company_name }}
            </span>           
            <div 
              v-if="general.company_address"
              v-html="general.company_address"
              class="">
            </div>
          </div>
          <NuxtLink
            v-if="general.direction"
            :href="general.direction"
            class="no-underline flex items-center gap-2 text-base font-normal"
            target="_blank">
            Anfahrt planen
            <svg width="31" height="6" viewBox="0 0 31 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M27.7373 0.171356L30.2828 2.71694C30.4391 2.87315 30.4391 3.12642 30.2828 3.28263L27.7373 5.82821C27.5811 5.98442 27.3278 5.98442 27.1716 5.82821C27.0154 5.672 27.0154 5.41874 27.1716 5.26253L29.0343 3.39978H0V2.59978H29.0343L27.1716 0.737042C27.0154 0.580832 27.0154 0.327566 27.1716 0.171356C27.3278 0.0151468 27.5811 0.0151468 27.7373 0.171356Z" fill="#F9423A"/>
            </svg>
          </NuxtLink>
        </div>
    
        <div class="py-f-16 px-4 md:pl-f-24 space-y-f-6">
          <div>
            <span class="block">Ihre Ansprechpartnerin:</span>
            <span 
              v-if="general.contact_name" 
              class="block">
              {{ general.contact_name }}
            </span>   
          </div>
          <div>
            <NuxtLink
              v-if="general.phone"
              :href="'tel:' + general.phone"
              class="no-underline block w-fit">
              T {{ general.phone }}
            </NuxtLink>
  
            <NuxtLink
              v-if="general.email"
              :href="'mailto:' + general.email"
              class="no-underline block w-fit">
              {{ general.email }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script setup>
  import { MoveRight } from 'lucide-vue-next'

  const { getItems } = useDirectusItems();

  // Get general options
  const {
      data: general,
      pendingConfig,
      errorConfig,
    } = await useAsyncData('footerConfig', () => {        
        return getItems({      
        collection: "general",      
        params: {       
          fields: ['company_name', 'company_address', 'phone', 'email', 'direction', 'additional_field_left', 'additional_field_right', 'contact_name'],           
        },    
      })
      },
      {
        transform: (data) => data,
      }
    )

  
  // Get navigation
  const {
  data: navigation,
  pending,
  error,
  } = await useAsyncData('footerNavigation', () => {
  return getItems({      
    collection: "navigation",      
    params: { 
      filter: { 
        _and: [ {
          title: {
            _eq: "Footer"
            },
          },
        ]          
      },
      fields: ['items.*', 'items.page.slug', 'items.children.*'],           
    },    
  })
  },
  {
    transform: (data) => data[0],
  })
</script>
