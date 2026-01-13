// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  app: {
    head: {
      htmlAttrs: {
        lang: "de",
      },
      link: [
        {rel:"apple-touch-icon", sizes:"180x180", href:"/apple-touch-icon.png"},
        {rel:"icon", type:"image/png", sizes:"96x96", href:"/favicon-96x96.png"},
        {rel:"icon", type:"image/svg+xml",  href:"/favicon.svg"},
        {rel:"shortcut icon",  href:"/favicon.ico"},
        {rel:"manifest", href:"/site.webmanifest"},
      ],
      meta: [
        {name:"apple-mobile-web-app-title", content:"Ingenieurbüro Gleisplan – Wir gestalten Zukunft."},

      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },

  aos: {
    // Global settings:
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
    initClassName: 'aos-init', // class applied after initialization
    animatedClassName: 'aos-animate', // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 120, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 600, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: true, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
  },

  // nuxt.config.ts
  components: [
    { path: '~/components', pathPrefix: false, ignore: ['ui/**'] },
    { path: '~/components/ui', pathPrefix: true }
  ],


  css: ['~/assets/css/tailwind.css'],
  
  directus: {      
    url: process.env.DIRECTUS_URL,
    autoFetch: false,
  },

  image: {
    directus: {
      baseURL: process.env.DIRECTUS_URL + '/assets/'
    }
  },

  modules: [
    'shadcn-nuxt',
    '@nuxt/image',
    'nuxt-directus',
    '@nuxtjs/device',
    '@nuxtjs/sitemap',
    '@pinia/nuxt',
    'nuxt-aos',
  ],

 
  runtimeConfig: {
    public: {
      siteName: process.env.SITE_NAME,
      siteUrl: process.env.SITE_URL,
      directusUrl: process.env.DIRECTUS_URL
    },
    nodemailerConfig: {
      host: process.env.EMAIL_HOST,
      emailTo: process.env.EMAIL_TO,
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_SECRET,
      },
      tls: { rejectUnauthorized: true },
      connectionTimeout: 15000,
      greetingTimeout: 15000,
      socketTimeout: 30000,
    },
    redirects: false,
  },
  
  shadcn: {
    /**
     * Prefix for all the imported component.
     * @default "Ui"
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * Will respect the Nuxt aliases.
     * @link https://nuxt.com/docs/api/nuxt-config#alias
     * @default "@/components/ui"
     */
    componentDir: '@/components/ui'
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})