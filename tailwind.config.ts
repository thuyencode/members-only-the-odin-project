import daisyui from 'daisyui'
import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      container: {
        center: true
      }
    }
  },
  plugins: [daisyui]
} satisfies Config
