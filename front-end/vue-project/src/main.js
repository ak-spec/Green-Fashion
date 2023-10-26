import './assets/main.css'
import "bootstrap/dist/css/bootstrap.css"
import 'bootstrap/dist/js/bootstrap.js';
import "axios";


import { createApp } from 'vue'
// import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vue3GeoLocation from 'vue3-geolocation'




const app = createApp(App)
app.use(router)
app.use (Vue3GeoLocation)
app.mount('#app')

