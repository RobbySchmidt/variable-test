<template>
  <div 
    id="menu-holder"
    class="z-20 pt-[57px] bg-primary lg:pt-0 transition-transform fixed top-0 w-full lg:w-fit lg:translate-x-0 lg:relative"
    :class="{
      'left-0 right-0': store.menuOpen,
      'translate-x-full': !store.menuOpen
    }"
  >
    <nav id="main-menu" class="h-screen lg:h-full bg-primary lg:bg-white">          
      <ul
        v-if="navigation.items"
        class="lg:space-x-f-16 lg:flex lg:items-center"
      >
        <template v-for="(navigationItem, index) in navigation.items">
          <template v-if="$device.isDesktop">
            <MenuItem :menuItem="navigationItem" :isLastHighlighted="navigation.isLastMenuItemHighlighted"/>
          </template>
          <template v-else>
            <MenuItem 
              :menuItem="navigationItem"
              :style="'transition-delay:'+ ((index+0.3)*0.5)*150 + 'ms'"
              class="duration-300 ease-[cubic-bezier(.51,1.03,.89,.94)]"
              :class="{
                  'translate-x-[0] opacity-100': store.menuOpen,
                  'translate-x-[300px] opacity-0 !delay-0': !store.menuOpen
              }"/>
          </template>            
        </template>
      </ul>
    </nav>
  </div>
</template>

<script setup>
  import { useStore } from "~/store/store";
  const store = useStore();

  const props = defineProps({
    navigation: { type: Object }
  });

  const loaded = ref(false) 

  onMounted(() => {
    setTimeout(function() {
      loaded.value = true

    }, 10);
  })
 
  watch(
    () => store.menuOpen,
    (newValue) => {
      if (newValue) {
        document.body.classList.add('overflow-hidden', 'lg:overflow-auto');
      } else {
        document.body.classList.remove('overflow-hidden', 'lg:overflow-auto');
      }
    },
  );

</script>