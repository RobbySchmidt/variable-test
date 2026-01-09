import { defineNuxtPlugin } from '#app'
import Isotope from 'isotope-layout'
import { gsap } from 'gsap'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      isotope: Isotope,
      gsap: gsap
    }
  }
})
