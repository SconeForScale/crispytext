import { createApp } from 'vue'
import './assets/css/main.scss'
import App from './App.vue'

import "primeflex/primeflex.css"
import "primevue/resources/themes/lara-dark-amber/theme.css"
import "primevue/resources/primevue.min.css"
import "primeicons/primeicons.css"

import PrimeVue from 'primevue/config'

import router from './router'

const app = createApp(App)
app.use(PrimeVue)
app.use(router)

app.mount('#app')
