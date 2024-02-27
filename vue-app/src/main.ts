import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'

// import Keycloak, { type KeycloakConfig, type KeycloakInitOptions } from "keycloak-js";
// import { useKeycloakStore } from '@/stores/keycloakStore';
import { useUserStore } from './stores/userStore'
import { serviceFactory } from './utils/factory'
// import { serviceFactory } from './utils/factory'
// import { initOptions } from './utils/config'
// import { login, logout } from './utils/keycloakService'

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


// let keycloakConfig: KeycloakConfig = {
//     url: import.meta.env.VITE_KEYCLOAK_URL, 
//     realm: 'SOA', 
//     clientId: 'front'
// }

// let keycloak = new Keycloak(keycloakConfig)
// const keycloakStore = useKeycloakStore()
// keycloakStore.keycloak = keycloak

// const userStore = useUserStore()

// let initOptions: KeycloakInitOptions = {
//     onLoad: 'check-sso',
//     redirectUri: import.meta.env.VITE_KEYCLOAK_REDIRECT_URL,
//     enableLogging: true,
//     checkLoginIframe: false
// }

// keycloak.init(initOptions).then(auth => {
//     if (!auth) {
//         console.warn('Authentication failed')
//     } else {
//         console.log('Authenticated')
//     }

//     //Token Refresh
//     setInterval(() => {
//         keycloak.refreshToken(70).then((refreshed) => {
//             if (refreshed) {
//                 console.log('Token refreshed')

//                 userStore.user = keycloak.profile!
//                 userStore.authenticated = keycloak.authenticated as boolean
//                 userStore.token = keycloak.token as string
//                 userStore.roles = keycloak.tokenParsed!.realm_access!.roles as string[]
//             } else {
//                 console.warn('Token not refreshed')
//             }
//         }).catch(() => {
//             console.error('Failed to refresh token');
//         });
//     }, 6000)
// }).catch(() => console.error("Authentication failed"))