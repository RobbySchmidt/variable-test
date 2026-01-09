<template>
  <div class="bg-white scroll-m-16 lg:scroll-m-0 relative z-50 py-f-32">
    <div class="container px-4">
      <div class="lg:w-9/12 mx-auto">

        <Select 
          v-model="selectedService">
          <SelectTrigger class="w-[280px] mx-auto mb-f-12">
            <span 
              v-if="!selectedService"
              aria-label="alle Projekt auswählen">
              Alle Projekte
            </span>
            <span 
              v-else
              :aria-label="'nach ' + selectedService + ' filtern'">
              {{ selectedService }}
            </span>
          </SelectTrigger>


          <SelectContent>
            <SelectGroup>
              <SelectItem :value="null">
                Alle Projekte
              </SelectItem>
            </SelectGroup>

            <SelectGroup>
              <SelectItem 
                class="relative"
                :class="{ 'bg-secondary text-white': selectedService === option.name }"
                v-for="(option, index) in services.filter(s => serviceCounts[s.name])"
                :key="index"
                :value="option.name">
                <span>
                  {{ option.name }}
                </span>
                <span 
                  class="absolute right-2">
                  {{ serviceCounts[option.name] }}
                </span>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

      </div>
      <div class="lg:w-9/12 grid lg:grid-cols-2 mx-auto gap-f-6">        
        <div 
          v-if="filteredReferences"
          v-for="reference in filteredReferences"
          class="overflow-hidden group relative boxes">
          <NuxtLink
            v-if="reference.slug"
            :to="'projekte' + '/' + reference.slug"
            :aria-label="'Detailseite für ' + reference.title">
            <img
              v-if="reference.image"
              :src="getAssetUrl() + reference.image + '?format=avif'" 
              class="block w-full"
              width="952"
              height="662"
              :alt="reference.image.description ? reference.image.description : reference.title">
            <span 
              class="xl:hidden absolute bottom-0 left-0 p-2 flex items-center gap-1 bg-black/80 text-white text-xs">
              zum Projekt
              <ArrowRight class="size-4"/>
            </span>
              <div class="overlay hidden xl:grid place-content-center pl-f-12">
                <span class="uppercase text-f-lg block" v-if="reference.services && reference.services.length">
                  {{ reference.services.slice(0, 2).map(s => s.services_id.name).join(' & ') }}
                </span>
                <div
                  class="font-semibold text-f-xl">
                  <h2 
                    v-if="reference.title">
                    {{ reference.title }}
                  </h2>
                  <h3 
                    v-if="reference.sub_title">
                    {{ reference.sub_title }}
                  </h3>
                </div>
              </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ArrowRight } from 'lucide-vue-next'
  import { gsap } from "gsap";

  const props = defineProps({
    id: String,
    index: Number,
    collection: String
  })

  const { getItems } = useDirectusItems();


  const {
    data: references,
    pendingReferences,
    errorReferences,
  } = await useAsyncData('referencesProjests', () => {
    return getItems({      
      collection: "references",      
        params: { 
          filter: {
            show_on_projects: {
              _eq: true
          }
        },
        fields: ['*', 'services.*', 'services.services_id.*', 'services.filteroption.*'],           
      },    
    })
  },
  {
    transform: (data) => data
  })

  const {
    data: services,
    pendingServicesFilter,
    errorServicesFilter,
  } = await useAsyncData('servicesFilter', () => {
    return getItems({      
      collection: "services",      
      params: { 
        fields: ['*'],           
      },    
    })
  },
  {
    transform: (data) => data
  })

  function closestEdge(x, y, w, h) {
    var topEdgeDist = distMetric(x, y, w / 2, 0);
    var bottomEdgeDist = distMetric(x, y, w / 2, h);
    var leftEdgeDist = distMetric(x, y, 0, h / 2);
    var rightEdgeDist = distMetric(x, y, w, h / 2);
    var min = Math.min(topEdgeDist, bottomEdgeDist, leftEdgeDist, rightEdgeDist);
    switch (min) {
      case leftEdgeDist:
        return "left";
      case rightEdgeDist:
        return "right";
      case topEdgeDist:
        return "top";
      case bottomEdgeDist:
        return "bottom";
    }
  }

  function distMetric(x, y, x2, y2) {
    var xDiff = x - x2;
    var yDiff = y - y2;
    return (xDiff * xDiff) + (yDiff * yDiff);
  }

  onMounted(() => {
    // DOM is ready
    const boxes = Array.from(document.querySelectorAll(".boxes")).filter(box =>
      box.innerHTML.trim().length > 0
    );


    for (var i = 0; i < boxes.length; i++) {
      boxes[i].onmouseenter = function (e) {
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        var edge = closestEdge(x, y, this.clientWidth, this.clientHeight);
        var overlay = this.querySelector(".overlay");
        switch (edge) {
          case "left":
            overlay.style.top = "0%";
            overlay.style.left = "-100%";
            gsap.to(overlay, { left: '0%' });
            break;
          case "right":
            overlay.style.top = "0%";
            overlay.style.left = "100%";
            gsap.to(overlay, { left: '0%' });
            break;
          case "top":
            overlay.style.top = "-100%";
            overlay.style.left = "0%";
            gsap.to(overlay, { top: '0%' });
            break;
          case "bottom":
            overlay.style.top = "100%";
            overlay.style.left = "0%";
            gsap.to(overlay, { top: '0%' });
            break;
        }
      };

      boxes[i].onmouseleave = function (e) {
        var edge = closestEdge(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, this.clientWidth, this.clientHeight);
        var overlay = this.querySelector(".overlay");

        switch (edge) {
          case "left":
            gsap.to(overlay, 0.5, { left: '-100%' });
            break;
          case "right":
            gsap.to(overlay, 0.5, { left: '100%' });
            break;
          case "top":
            gsap.to(overlay, 0.5, { top: '-100%' });
            break;
          case "bottom":
            gsap.to(overlay, 0.5, { top: '100%' });
            break;
        }
      };
    }
  });

  //Filter
  const selectedService = ref(null);

  const filteredReferences = computed(() => {
    if (!references.value) return [];
    // Alle anzeigen
    if (!selectedService.value) return references.value;
    // Nur Referenzen, die den gewählten Service beinhalten
    const result = references.value.filter((ref, index) => {
      if (!ref.services) {
        return false;
      }
      const match = ref.services.find(service => {
        return service.services_id.name === selectedService.value;
      });
      return match;
    });
    return result;
  });

  watch(filteredReferences, async () => {
  await nextTick(); // Wait for DOM update

  const boxes = Array.from(document.querySelectorAll(".boxes")).filter(box =>
    box.innerHTML.trim().length > 0
  );

  // Fade-in animation
  gsap.fromTo(
    boxes,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.05,
      ease: "power2.out"
    }
  );

  // Re-attach hover overlay events
  for (const box of boxes) {
    box.onmouseenter = function (e) {
      const x = e.pageX - this.offsetLeft;
      const y = e.pageY - this.offsetTop;
      const edge = closestEdge(x, y, this.clientWidth, this.clientHeight);
      const overlay = this.querySelector(".overlay");
      switch (edge) {
        case "left":
          overlay.style.top = "0%";
          overlay.style.left = "-100%";
          gsap.to(overlay, { left: '0%' });
          break;
        case "right":
          overlay.style.top = "0%";
          overlay.style.left = "100%";
          gsap.to(overlay, { left: '0%' });
          break;
        case "top":
          overlay.style.top = "-100%";
          overlay.style.left = "0%";
          gsap.to(overlay, { top: '0%' });
          break;
        case "bottom":
          overlay.style.top = "100%";
          overlay.style.left = "0%";
          gsap.to(overlay, { top: '0%' });
          break;
      }
    };

    box.onmouseleave = function (e) {
      const x = e.pageX - this.offsetLeft;
      const y = e.pageY - this.offsetTop;
      const edge = closestEdge(x, y, this.clientWidth, this.clientHeight);
      const overlay = this.querySelector(".overlay");
      switch (edge) {
        case "left":
          gsap.to(overlay, 0.5, { left: '-100%' });
          break;
        case "right":
          gsap.to(overlay, 0.5, { left: '100%' });
          break;
        case "top":
          gsap.to(overlay, 0.5, { top: '-100%' });
          break;
        case "bottom":
          gsap.to(overlay, 0.5, { top: '100%' });
          break;
        }
      };
    }
  });

  const serviceCounts = computed(() => {
    const counts = {};

    if (!references.value) return counts;

    for (const ref of references.value) {
      if (!ref.services) continue;

      for (const s of ref.services) {
        const name = s.services_id?.name;
        if (name) {
          counts[name] = (counts[name] || 0) + 1;
        }
      }
    }

    return counts;
  });

</script>


<style scoped>
  @media (width >= 80rem /* 1280px */) {
    .overlay{
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0%;
      left: -100%;
      color: #FFF;
      background-color: rgba(0,0,0,0.8);
      z-index: 10;
    }
  }

  /* filterbar */
  .strike-link {
    position: relative;
    display: inline-block;
    text-decoration: none;
    color: black;
    cursor: pointer;
  }

  .strike-link::after {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    height: 2px;
    background-color: black;
    width: 0;
    transform: translateY(-50%);
    transition: width 0.3s ease-in-out;
  }

  .strike-link:hover::after {
    width: 100%;
  }


  .strike-link.active::after {
    width: 100%;
  }
</style>