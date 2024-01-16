import { createApp } from 'vue'
import './style.css'
import './icon.css'
import './services/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import vue3lottie from 'vue3-lottie'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

createApp(App)
.use(router)
.use(store)
.use(vue3lottie)
.mount('#app')
