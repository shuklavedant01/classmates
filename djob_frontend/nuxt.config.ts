// https://nuxt.com/docs/api/configuration/nuxt-config// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
  compatibilityDate: '2024-11-01',
  target: 'static',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      apiURL: process.env.NUXT_API_URL || 'http://localhost:8000'
    }
  }
})

