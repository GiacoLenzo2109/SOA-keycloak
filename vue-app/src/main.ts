import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import { useUserStore } from './stores/userStore'
import { serviceFactory } from './utils/factory'

console.log("1. Creating App")
const app = createApp(App)

console.log("2. Creating Pinia")
app.use(createPinia())

console.log("3. Using Router")
app.use(router)

console.log("4. Mounting App")
app.mount('#app');

const userStore = useUserStore()
const keycloak = serviceFactory(userStore)

console.log("5. Initializing Keycloak")
keycloak.init()