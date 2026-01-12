<template>  
  <li 
    v-if="!menuItem.has_children && checkPageSlug(menuItem)"
    class="lg:last:[&>a]:bg-primary lg:last:[&>a]:text-white last:[&>a]:lg:px-20 last:ml-auto text-white">
    <NuxtLink 
      :href="getUrl(menuItem)"
      :target="menuItem.open_in_new_tab ? '_blank' : '_self'" 
      @click="store.menuOpen = !store.menuOpen"
      class="block py-4 lg:py-3 lg:text-primary transition duration-300 ease-in-out border-b lg:border-b-6 border-white lg:border-transparent lg:hover:border-primary active:border-primary w-full lg:w-fit px-4 lg:px-0"
      activeClass="lg:!border-primary bg-white text-primary">

      <template v-if="menuItem.label">
        {{ menuItem.label }}
      </template>
      <template v-else>
        {{ menuItem.title }}
      </template>  
    </NuxtLink>
  </li>
  <li 
    v-else
    class="relative z-10 first:border-t border-primary md:border-none menu-item-has-children">
    <button
      type="button"
      aria-controls="submenu"
      @click="store.submenuOpen = !store.submenuOpen" 
      class="px-4 lg:px-0 box-border flex items-center justify-between w-full text-white lg:text-primary transition-all duration-300 ease-in-out py-3 border-b border-white lg:border-transparent lg:border-b-6 lg:hover:border-primary group cursor-pointer">
      
      <template v-if="menuItem.label">
        {{ menuItem.label }}
      </template>
      <template v-else>
        {{ menuItem.title }}
      </template> 
      <ChevronDown
        class="ml-1 transition duration-100 ease-in-out text-white lg:text-primary" 
        :class="{'-rotate-90 md:-rotate-0': !store.submenuOpen,' md:rotate-180': store.submenuOpen }"/>
    </button>
    <ul
      id="submenu"
      ref="submenu"
      :style="$device.isDesktop ? (store.submenuOpen ? 'max-height:'+ submenu.scrollHeight + 'px' : 'max-height:0') : ''"
      :class="{ 'translate-x-full': !store.submenuOpen, 'translate-x-0': store.submenuOpen }"
      class="absolute overflow-hidden top-0 bottom-0 h-screen md:bottom-auto left-0 md:translate-x-0 md:top-[55px] bg-white w-full md:w-[200px] transition-all duration-300 ease-[cubic-bezier(0.2,0.5,0.3,1)] shadow-lg ring-1 ring-gray-900/5">
      <li
        :style="'transition-delay:'+ ((0+0.3)*0.5)*150 + 'ms'"
        class="md:hidden duration-300 ease-[cubic-bezier(.51,1.03,.89,.94)]"
        :class="{
            'translate-x-[0] opacity-100': $device.isMobileOrTablet && store.submenuOpen,
            'translate-x-[300px] opacity-0 !delay-0': $device.isMobileOrTablet && !store.submenuOpen
          }">
        <button
          type="button"
          class="flex items-center w-full pl-2 py-4"
          @click="store.submenuOpen = false">
          <ChevronLeft/>
          <span>zurück</span>
        </button>
      </li>
      <template v-for="(submenuItem, index) in menuItem.children">                  
        <li
          v-if="checkPageSlug(submenuItem)"
          :style="'transition-delay:'+ ((index+1+0.3)*0.5)*150 + 'ms'"
          class="last:border-b border-t border-primary duration-300 ease-[cubic-bezier(.51,1.03,.89,.94)]"
          :class="{
            'translate-x-[0] opacity-100': $device.isMobileOrTablet && store.submenuOpen,
            'translate-x-[300px] opacity-0 !delay-0': $device.isMobileOrTablet && !store.submenuOpen
          }">
          <NuxtLink
            :href="getUrl(submenuItem)"
            :target="submenuItem.open_in_new_tab ? '_blank' : '_self'"
            @click="store.submenuOpen = false"
            class="block w-full p-4 transition duration-300 ease-in-out md:py-2 lg:hover:text-primary active:text-primary"
            activeClass="lg:!text-primary">
            
            <template v-if="submenuItem.label">
                {{ submenuItem.label }}
            </template>
            <template v-else>
               {{ submenuItem.title }}
            </template>            
          </NuxtLink>
        </li>
      </template>  
    </ul> 
  </li> 
</template>

<script setup>
  import { useStore } from "~~/store/store";
  import { ChevronDown, ChevronLeft } from 'lucide-vue-next';

  const store = useStore();
  const submenu = ref()
  
  const props = defineProps({
    menuItem: { type: Object }
  });

  function checkPageSlug(item){
    if (item.type === 'page' && item.page) {
      return true
    }else if(item.type === 'page' && !item.page){
      return false
    }else{
      return true
    }
  }

  function getUrl(item) {
    if (item.type === 'page') {
      return `/${item.page.slug}`
    } if (item.type === 'facilityPage') {
      return `/einrichtungen/${item.page.slug}`
    } else {
      return item.url
    } 
  }
 
</script>