<template>  
  <li 
    v-if="menuItem.type != 'submenu' && checkPageSlug(menuItem)"
    class="text-white lg:text-primary text-2xl lg:text-base font-medium border-b-2 first:border-t-2 border-accent lg:border-none"
    :class="{ 'lg:last:[&>a]:bg-primary lg:last:[&>a]:text-primary-foreground last:[&>a]:lg:px-20 last:ml-auto': isLastHighlighted}">
    <NuxtLink 
      :to="getUrl(menuItem)"
      :target="menuItem.open_in_new_tab ? '_blank' : '_self'" 
      @click="closeMenu()" 
      class="block py-6 duration-300 ease-in-out w-full lg:w-fit px-4 lg:px-0 after:block after:w-full after:h-0.5 after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 lg:hover:after:scale-x-100"
      :class="{
        'text-accent lg:text-primary lg:after:scale-x-100': isActiveLink(menuItem)
      }">
      {{ menuItem.title }}
    </NuxtLink>
  </li>
  <li 
    v-else
    ref="submenu-wrapper"
    class="relative z-10 border-b-2 first:border-t-2 border-accent lg:border-none menu-item-has-children">
    <button
      type="button"
      :aria-controls="'submenu-' + menuItem.id"
      @click="store.subMenuOpen = !store.subMenuOpen"
      class="relative px-4 lg:px-0 box-border flex items-center justify-between w-full text-white lg:text-primary text-2xl lg:text-base lg:border-none font-medium py-6 group cursor-pointer">
      <span 
        class="after:block after:w-full after:h-0.5 after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 lg:hover:after:scale-x-100"
        :class="{'text-accent lg:text-primary lg:after:scale-x-100' : store.subMenuOpen || $route.path.startsWith('/standorte')}">
        {{ menuItem.title }}
      </span>
      <ChevronDown
        class="ml-1 duration-300 ease-in-out text-white lg:text-primary"
        :class="{
          '-rotate-90 lg:-rotate-0': !store.subMenuOpen,
          'lg:rotate-180': store.subMenuOpen
        }"/>
    </button>
    <ul
      :id="'submenu-' + menuItem.id"
      ref="submenu"
      :style="$device.isDesktop ? (store.subMenuOpen ? 'max-height:'+ submenu.scrollHeight + 'px' : 'max-height:0') : ''"
      :class="{ 'translate-x-full': !store.subMenuOpen, 'translate-x-0': store.subMenuOpen }"
      class="absolute overflow-hidden top-0 bottom-0 h-screen lg:bottom-auto right-0 lg:translate-x-0 lg:top-[60px] lg:text-right bg-primary lg:rounded-sm text-white text-lg lg:text-white w-full lg:w-[200px] transition-all duration-300 ease-[cubic-bezier(0.2,0.5,0.3,1)] shadow-lg">
      <li
        :style="'transition-delay:'+ ((0+0.3)*0.5)*150 + 'ms'"
        class="lg:hidden duration-300 ease-[cubic-bezier(.51,1.03,.89,.94)]"
        :class="{
            'translate-x-[0] opacity-100': $device.isMobileOrTablet && store.subMenuOpen,
            'translate-x-[300px] opacity-0 !delay-0': $device.isMobileOrTablet && !store.subMenuOpen
          }">
        <button
          type="button"
          class="border-b-2 border-accent lg:border-none flex items-center w-full pl-2 py-4 font-medium"
          @click="store.subMenuOpen = false">
          <ChevronLeft />
          <span class="-mb-0.5">zurück</span>
        </button>
      </li>
      <template v-for="(submenuItem, index) in menuItem.children">                  
        <li
          v-if="checkPageSlug(submenuItem)"
          :style="'transition-delay:'+ ((index+1+0.3)*0.5)*150 + 'ms'"
          class="border-b-2 border-accent lg:border-none duration-300 ease-[cubic-bezier(.51,1.03,.89,.94)]"
          :class="{
            'translate-x-[0] opacity-100': $device.isMobileOrTablet && store.subMenuOpen,
            'translate-x-[300px] opacity-0 !delay-0': $device.isMobileOrTablet && !store.subMenuOpen
          }">
          <NuxtLink
            :to="getUrl(submenuItem)"
            :target="submenuItem.open_in_new_tab ? '_blank' : '_self'"
            @click="closeMenu"
            class="block w-full px-4 py-6 transition duration-300 ease-in-out lg:py-2 font-medium text-2xl lg:text-base lg:hover:text-accent"
            :class="{ 'text-accent': isActiveLink(submenuItem) }">
               {{ submenuItem.title }}         
          </NuxtLink>
        </li>
      </template>  
    </ul> 
  </li> 
</template>

<script setup>

  const props = defineProps({
    menuItem: { type: Object },
    isLastHighlighted: {type: Boolean}
  });
  
  import { useStore } from "~/store/store";
  import { ChevronDown, ChevronLeft } from 'lucide-vue-next';
  import { onClickOutside } from '@vueuse/core'
  import { useTemplateRef } from 'vue'

  const store = useStore();
  	
  function closeMenu() {
    store.menuOpen = false
    store.subMenuOpen = false
  }
  
  const submenu = ref()
  const submenuWrapper = useTemplateRef('submenu-wrapper')
  
  onClickOutside(submenuWrapper, event => { store.subMenuOpen = false })

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

  const route = useRoute()

  function isActiveLink(item) {
    const target = getUrl(item)
    // Check if the current route starts with the menu URL
    return route.path.startsWith(target)
  }
</script>