import { createApp } from 'vue'
import './style.css'
import './icon.css'
import './services/axios'
import VueCookies from 'vue-cookies'
import App from './App.vue'
import router from './router'
import store from './store'
import vue3lottie from 'vue3-lottie'

createApp(App)
.use(router)
.use(VueCookies)
.use(store)
.use(vue3lottie)
.mount('#app')
