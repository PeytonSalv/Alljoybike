import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#EA903C',
          blue: '#29B0C2',
        },
      },
    },
  },
  plugins: [],
}

export default config;
