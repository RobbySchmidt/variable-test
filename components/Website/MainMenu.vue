<template>
  <div 
    id="menu-holder"
    class="z-40 mt-[57px] lg:mt-0 transition-transform fixed top-0 w-full lg:translate-x-0 lg:relative lg:w-8/12"
    :class="{
      'left-0 right-0': store.menuOpen,
      'translate-x-full': !store.menuOpen
    }"
  >
    <nav id="main-menu" class="h-screen lg:h-full bg-prime lg:bg-transparent">          
      <ul
        v-if="navigation.items"
        class="lg:space-x-8 lg:flex lg:items-center"
      >
        <template v-for="(navigationItem, index) in navigation.items">
          <template v-if="$device.isDesktop">
            <WebsiteMenuItem :menuItem="navigationItem"/>
          </template>
          <template v-else>
            <WebsiteMenuItem 
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
  import { useStore } from "~~/store/store";
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