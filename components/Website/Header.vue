<template>  
  <header 
    id="siteHeader" 
    class="sticky top-0 z-40 w-full bg-white border-b border-primary flex items-center justify-between px-4 md:pl-8 lg:pr-0"
  >    
    <NuxtLink href="/">
      <!-- <img
        :src="getAssetUrl() + general?.logo_header" 
        :alt="general?.title" 
        width="66" 
        height="40" 
        class="w-[50px] md:w-[66px] h-auto block"> -->
        Logo
    </NuxtLink>
    
    <WebsiteMainMenu v-if="navigation" :navigation="navigation" />
        
    <button
      @click="toggleMenu"
      aria-controls="main-menu"
      aria-label="Navigation öffnen"            
      class="focus:outline-none relative w-7 h-14 lg:hidden"
    >
        <span  class="block absolute h-0.5 w-7 bg-primary transform transition duration-300 ease-in-out" :class="{'rotate-45': store.menuOpen,' -translate-y-1.5': !store.menuOpen }"></span>
        <span  class="block absolute  h-0.5 w-5 bg-primary transform transition duration-300 ease-in-out" :class="{'opacity-0': store.menuOpen } "></span>
        <span  class="block absolute  h-0.5 w-7 bg-primary transform  transition duration-300 ease-in-out" :class="{'-rotate-45': store.menuOpen, ' translate-y-1.5': !store.menuOpen}"></span>
    </button>
  </header>  
</template>

<script setup>   
  import { useStore } from "~~/store/store";
  const { getItems } = useDirectusItems();
  
  const route = useRoute()
  const store = useStore();
  const { toggleMenu } = store;

  const subNavi = ref(false)

  const {
      data: general,
      pendingConfig,
      errorConfig,
    } = await useAsyncData('generalConfig', () => {
      return getItems({      
        collection: "general",      
        params: { 
          fields: ['logo_header', 'title'],           
        },    
      })
  },
  {
    transform: (data) => data
  })

  const config = useRuntimeConfig();
  

  const {
    data: navigation,
    pending,
    error,
  } = await useAsyncData('mainNavigation', () => {
    return getItems({      
        collection: "navigation",      
        params: { 
          filter: {   
           title: {
              _eq: "Main"
            }
          },
          fields: ['items.*', 'items.page.slug', 'items.children.page.*', 'items.children.*', 'items.category.*', 'items.categoryFacilitie.*'],
        },    
      })
    
  },
  {
    transform: (data) => data[0]
  });


  const loaded = ref(false)
  onMounted(() => {
      setTimeout(function() {
        loaded.value = true

        const firstPartOfPath = route.path.split('/')[1];      

        if (navigation && navigation.value.items && navigation.value.items.length > 0) {
        const matchingItem = navigation.value.items.find(item => {
          const firstPartOfUrl = item.url ? item.url.split('/')[1] : null;
          return item.url && firstPartOfUrl === firstPartOfPath;
        });
        if (matchingItem && matchingItem.children && matchingItem.children.length > 0) {
          subNavi.value = true;          
        } else {
          subNavi.value = false;
        }
      } else {
        subNavi.value = false;
      }

      }, 10);
  })



  watch(
    () => [route.path, navigation],
    ([currentPath, navigationData]) => {
      const firstPartOfPath = route.path.split('/')[1];
      if (navigationData && navigationData.value.items && navigationData.value.items.length > 0) {
        const matchingItem = navigationData.value.items.find(item => {
          const firstPartOfUrl = item.url ? item.url.split('/')[1] : null;
          return item.url && firstPartOfUrl === firstPartOfPath;
        });
        if (matchingItem && matchingItem.children && matchingItem.children.length > 0) {
          subNavi.value = true;          
        } else {
          subNavi.value = false;
        }
      } else {
        subNavi.value = false;
      }

    }
  );
  
</script> 
