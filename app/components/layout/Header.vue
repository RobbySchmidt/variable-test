<template>  
  <header 
    id="siteHeader" 
    class="sticky top-0 z-40 w-full bg-white"
    :class="{'lg:pr-0' : navigation?.isLastMenuItemHighlighted}">

    <div :class="{'columns' : !navigation?.isLastMenuItemHighlighted}">
      <div 
        class="flex items-center justify-between">
         <ClientOnly>
           <NuxtLink
             to="/"
             @click="closeMenu"
             class="flex-none relative z-50"
             aria-label="zurück zur Startseite">
             <svg class="w-[140px] md:w-[180px] 2xl:w-[192px] h-auto" version="1.1" id="Ebene_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 300 42.6" xml:space="preserve">
               <g>
                 <polygon :class="$device.isMobileOrTablet && store.menuOpen ? 'fill-accent' : 'fill-primary'" points="25.7,1.1 25.7,16.4 9.9,16.4 9.9,1.1 0,1.1 0,41.4 9.9,41.4 9.9,24.6 25.7,24.6 25.7,41.4 35.7,41.4 
                   35.7,1.1 	"/>
                 <rect x="159.9" y="1.1" :class="$device.isMobileOrTablet && store.menuOpen ? 'fill-accent' : 'fill-primary'" width="9.9" height="40.4"/>
                 <polygon :class="$device.isMobileOrTablet && store.menuOpen ? 'fill-accent' : 'fill-primary'" points="197.8,24.5 216.5,24.5 216.5,17.3 197.8,17.3 197.8,9.2 218,9.2 218,1.1 188.1,1.1 188.1,41.4 
                   218.6,41.4 218.6,33.3 197.8,33.3 	"/>
                 <rect x="235.5" y="1.1" :class="$device.isMobileOrTablet && store.menuOpen ? 'fill-accent' : 'fill-primary'" width="9.9" height="40.4"/>
                 <path :class="$device.isMobileOrTablet && store.menuOpen ? 'fill-accent' : 'fill-primary'" d="M279.5,9.7L279.5,9.7l5.7,17.2h-11.5L279.5,9.7z M272.6,1.1L259.1,41l-0.2,0.5H269l2.5-7.1h16l2.5,7.1H300
                   L286.5,1.3l-0.1-0.2H272.6z"/>
                 <g>
                   <path :class="$device.isMobileOrTablet && store.menuOpen ? 'fill-accent' : 'fill-primary'" d="M76.8,13.4c0,5.4-3.3,9.1-8.1,9.1c-4.8,0-8.2-3.8-8.2-9.1V0.9h-9.9v12.6c0,8.5,5,14.9,13.1,16.7v11.1h9.9
                     V30.3c8.1-1.9,13.1-8.2,13.1-16.7V0.9h-9.9V13.4z"/>
                   <path :class="$device.isMobileOrTablet && store.menuOpen ? 'fill-accent' : 'fill-primary'" d="M142.7,18.2h-25.4v7.3H133c-0.7,5-5.5,8.7-11.3,8.7c-7.3,0-12.6-5.5-12.6-13c0-7.5,5.1-12.8,12.3-12.8
                     c4.6,0,8.7,2.5,9.9,6l9.1-2.1C138.4,5.1,130.6,0,121.4,0c-13.1,0-22.2,8.7-22.2,21.2c0,12.4,9.4,21.4,22.2,21.4
                     c6.5,0,12.2-2.3,16.1-6.6c4-4.4,5.8-10.6,5.2-17.5L142.7,18.2z"/>
                 </g>
               </g>
             </svg>
           </NuxtLink>
         </ClientOnly>
        
        <MainMenu v-if="navigation" :navigation="navigation" />

        <ClientOnly>
          <button
            @click="store.menuOpen = !store.menuOpen"
            aria-controls="main-menu"
            aria-label="Navigation öffnen"            
            class="focus:outline-none relative w-7 h-14 lg:hidden z-50"
          >
              <span  class="block absolute h-0.5 w-7 transform transition duration-300 ease-in-out" :class="store.menuOpen ? 'rotate-45 bg-white': ' -translate-y-1.5 bg-primary'"></span>
              <span  class="block absolute  h-0.5 w-5 transform transition duration-300 ease-in-out" :class="store.menuOpen ? 'opacity-0 bg-white' : ' bg-primary'"></span>
              <span  class="block absolute  h-0.5 w-7 transform  transition duration-300 ease-in-out" :class="store.menuOpen ? '-rotate-45 bg-white': 'translate-y-1.5 bg-primary'"></span>
          </button>
        </ClientOnly>
            
      </div>
    </div>
  </header>  
</template>

<script setup>   
  import { useStore } from "~/store/store";
  const { getItems } = useDirectusItems();
  
  const route = useRoute()
  const store = useStore();
 	
  function closeMenu() {
    store.menuOpen = false
    store.subMenuOpen = false
  }

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
          fields: ['items.*', 'items.page.slug', 'items.children.page.slug', 'items.children.*', 'isLastMenuItemHighlighted'],
        },    
      })
    
  },
  {
    transform: (data) => data[0]
  });

  const loaded = ref(false)
  // onMounted(() => {
  //     setTimeout(function() {
  //       loaded.value = true

  //       const firstPartOfPath = route.path.split('/')[1];      

  //       if (navigation && navigation.value.items && navigation.value.items.length > 0) {
  //       const matchingItem = navigation.value.items.find(item => {
  //         const firstPartOfUrl = item.url ? item.url.split('/')[1] : null;
  //         return item.url && firstPartOfUrl === firstPartOfPath;
  //       });
  //       if (matchingItem && matchingItem.children && matchingItem.children.length > 0) {
  //         subNavi.value = true;          
  //       } else {
  //         subNavi.value = false;
  //       }
  //     } else {
  //       subNavi.value = false;
  //     }

  //     }, 10);
  // })



  // watch(
  //   () => [route.path, navigation],
  //   ([currentPath, navigationData]) => {
  //     const firstPartOfPath = route.path.split('/')[1];
  //     if (navigationData && navigationData.value.items && navigationData.value.items.length > 0) {
  //       const matchingItem = navigationData.value.items.find(item => {
  //         const firstPartOfUrl = item.url ? item.url.split('/')[1] : null;
  //         return item.url && firstPartOfUrl === firstPartOfPath;
  //       });
  //       if (matchingItem && matchingItem.children && matchingItem.children.length > 0) {
  //         subNavi.value = true;          
  //       } else {
  //         subNavi.value = false;
  //       }
  //     } else {
  //       subNavi.value = false;
  //     }

  //   }
  // );

  // watch(
  //   () => store.menuOpen,
  //   (newValue) => {
  //     if (newValue) {
  //       document.body.classList.add('overflow-hidden', 'lg:overflow-auto');
  //     } else {
  //       document.body.classList.remove('overflow-hidden', 'lg:overflow-auto');
  //     }
  //   },
  // );
  
</script> 
