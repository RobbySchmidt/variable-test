import { defineStore } from "pinia";

export const useStore = defineStore('store', {
  state: () => ({
    
    menuOpen: false,
    submenuOpen: false,
    files: [],
    style: []
   
  }),

  getters: {
    
  },

  actions: {
    toggleMenu(){
      this.menuOpen = !this.menuOpen
      this.submenuOpen = !this.menuOpen
    },

    async getStyle() {
      const { getItems } = useDirectusItems()

      const data = await getItems({
        collection: 'project_style',
        params: {
            filter: {
              title: { 
                _eq: 'Test' 
              },
            },
            fields: ['*', '*.*'],
          },
      })

      const style = data?.[0]
      if (!style) return

      this.style = style

      function normalizeCssLength(value?: string) {
        if (!value) return null

        // already has a unit
        if (/\d+(px|rem|em|%)$/.test(value)) {
          return value
        }

        // number as string → px
        if (/^\d+$/.test(value)) {
          return `${value}px`
        }

        return null
      }
      const radius = normalizeCssLength(style.radius?.rounded)

      const root = document.documentElement

      root.style.setProperty('--color-prime-500', style.primary_color?.color)
      root.style.setProperty('--color-second-500', style.secondary_color?.color)
      root.style.setProperty('--color-accent', style.accent_color?.color)
      root.style.setProperty('--radius', radius)
    },
  }
});
