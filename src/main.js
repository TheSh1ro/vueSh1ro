// main.js

import './assets/main.css'
import VueScrollTo from 'vue-scrollto'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// Use VueScrollTo globalmente
app.use(VueScrollTo, {
  duration: 500, // Duração padrão do scroll (opcional)
  easing: 'ease' // Tipo de easing (opcional)
})

// Adicione um método global para fazer scroll para o topo
app.config.globalProperties.$scrollToTop = () => {
  window.scrollTo(0, 0)
}

app.use(createPinia())
app.use(router)

app.mount('#app')
