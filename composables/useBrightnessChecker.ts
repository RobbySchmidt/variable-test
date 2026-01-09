export function useBrightnessChecker() {
  const nuxtApp = useNuxtApp();
  const route = useRoute();

  const isOnBrightSection = ref(false);
  const isOnBrightSectionBottom = ref(false);

  const checkBrightness = async () => {
    const header = document.getElementById('siteHeader');
    if (!header) return;

    header.style.pointerEvents = 'none';
    await nextTick();

    const logo = document.querySelector('.logo');
    if (logo) {
      const rectTop = logo.getBoundingClientRect();
      const centerX = rectTop.left + rectTop.width / 2;
      const centerY =
        window.innerWidth < 1024
          ? rectTop.top + rectTop.height / 2 + 80
          : rectTop.top + rectTop.height / 2;
      const elTop = document.elementFromPoint(centerX, centerY);
      isOnBrightSection.value = detectBrightnessFromElement(elTop);
    }

    const bottomButton = document.querySelector('.bottom-button');
    if (bottomButton) {
      const rectBottom = bottomButton.getBoundingClientRect();
      const centerX = rectBottom.left + rectBottom.width / 2;
      const centerY = rectBottom.top + rectBottom.height / 2;
      const elBottom = document.elementFromPoint(centerX, centerY);
      isOnBrightSectionBottom.value = detectBrightnessFromElement(elBottom);
    }

    header.style.pointerEvents = '';
  };

  function detectBrightnessFromElement(el: Element | null): boolean {
    if (!el) return false;
    let style = window.getComputedStyle(el);
    let bgColor = style.backgroundColor;

    if (!bgColor || bgColor === 'transparent' || bgColor === 'rgba(0, 0, 0, 0)') {
      let parent = el.parentElement;
      while (parent) {
        const parentColor = window.getComputedStyle(parent).backgroundColor;
        if (
          parentColor &&
          parentColor !== 'transparent' &&
          parentColor !== 'rgba(0, 0, 0, 0)'
        ) {
          bgColor = parentColor;
          break;
        }
        parent = parent.parentElement;
      }
    }

    const rgbMatch = bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
    if (!rgbMatch) return false;

    const [r, g, b] = rgbMatch.slice(1, 4).map(Number);
    const brightness = (r * 299 + g * 587 + b * 114) / 500;
    return brightness > 250;
  }

  const runCheckBrightnessSoon = async () => {
    await nextTick();
    setTimeout(() => {
      checkBrightness();
    }, 50);
  };

  onMounted(() => {
    runCheckBrightnessSoon();
    window.addEventListener('scroll', checkBrightness);
    window.addEventListener('touchmove', checkBrightness);
    window.addEventListener('resize', checkBrightness);
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', checkBrightness);
    window.removeEventListener('touchmove', checkBrightness);
    window.removeEventListener('resize', checkBrightness);
  });

  watch(() => route.fullPath, () => {
    runCheckBrightnessSoon();
  });

  nuxtApp.hook('page:finish', checkBrightness);
  nuxtApp.hook('page:transition:finish', checkBrightness);

  return {
    isOnBrightSection,
    isOnBrightSectionBottom
  };
}
