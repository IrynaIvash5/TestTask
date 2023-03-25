import { createApp } from 'vue'
import App from './App.vue'
import axiosPlugin from './axiosPlugin'

createApp(App).use(axiosPlugin).mount('#app')
