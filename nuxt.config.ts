// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css', '@vueup/vue-quill/dist/vue-quill.snow.css'],
  modules: ['@tresjs/nuxt'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})