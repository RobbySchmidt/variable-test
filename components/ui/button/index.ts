import { cva, type VariantProps } from 'class-variance-authority'

export { default as Button } from './Button.vue'

import { useStore } from '~/store/store'

const store = useStore()

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap overflow-hidden rounded text-xs font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*=\'size-\'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive duration-200 ease-in-out cursor-pointer duration-300 ease-in-out w-fit block',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-black rounded hover:bg-white hover:text-primary',
        destructive:
          'bg-red-500 text-white shadow-xs md:hover:bg-red-600 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border border-2 border-secondary text-secondary font-bold bg-transparent shadow-xs md:hover:bg-accent md:hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:md:hover:bg-input/50',
        secondary:
          'text-white font-bold shadow-xs md:hover:bg-secondary/80',
        ghost:
          'text-black text-base',
        link: 'text-primary underline-offset-4 md:hover:underline',
        yellow: 'bg-yellow-500 text-primary w-full',
        primary: 'text-white text-base font-normal border-1 relative before:content before:absolute before:top-0 before:left-0 before:w-0 before:h-full before:bg-white lg:hover:before:w-full z-10 before:-z-10 before:duration-300 lg:hover:text-primary duration-300 ease-in-out',
        primary_inverted: 'text-primary text-base font-normal border-1 border-primary relative before:content before:absolute before:top-0 before:left-0 before:w-0 before:h-full before:bg-primary lg:hover:before:w-full z-10 before:-z-10 before:duration-300 lg:hover:text-white duration-300 ease-in-out',
        button_red: 'bg-secondary text-white rounded-none px-6 py-2 lg:hover:bg-black',
        button_ghost: 'text-lg text-secondary',
        transparent: ''
      },
      size: {
        default: 'rounded text-lg px-6 pt-1 pb-2 has-[>svg]:px-2.5',
        sm: 'rounded px-10 pt-2 pb-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded px-6 has-[>svg]:px-4',
        transparent: 'text-xl p-0',
        none: '',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
