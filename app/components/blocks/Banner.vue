<template>
  <footer class="columns z-20 py-f-44 bg-secondary">
    <div class="">
      <ul class="inline-flex gap-6 md:gap-f-12">
        <li v-if="navigation"
            v-for="item in navigation.items">
          <NuxtLink
            v-if="item.type == 'url'"
            :to="item.url"
            :target="item.open_in_new_tab ? '_blank' : ''"
            class="text-xs"
            >{{ item.title }}
          </NuxtLink>
          <NuxtLink
            v-else
            :to="'/' + item.page.slug"
            class="text-xs"
            >{{ item.title }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </footer>  
</template>

<script setup>
  const route = useRoute()
  const { getItems } = useDirectusItems();
 
      
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
          fields: ['*', '*.*', 'items.*, items.page.slug'],
        },    
      })
    
  },
  {
    transform: (data) => data[0]
  });
</script>
