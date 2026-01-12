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

      this.style = style

      const root = document.documentElement

      root.style.setProperty('--primary', style.primary_color?.color)
      root.style.setProperty('--secondary', style.secondary_color?.color)
      root.style.setProperty('--accent', style.accent_color?.color)
      root.style.setProperty('--radius', `${style.radius?.value}px`)
    },
  }
});
