import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'

import Keycloak, { type KeycloakConfig, type KeycloakInitOptions } from "keycloak-js";
import { useKeycloakStore } from '@/stores/keycloakStore';

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app');

let keycloakConfig: KeycloakConfig = {
    url: import.meta.env.VITE_KEYCLOAK_URL, 
    realm: 'SOA', 
    clientId: 'front'
}

let keycloak = new Keycloak(keycloakConfig)
const keycloakStore = useKeycloakStore()
keycloakStore.keycloak = keycloak

/**
 * Configuration options for initializing Keycloak.
 * @remarks
 * `initOptions` is used to specify various settings for initializing Keycloak in the application.
 * These settings include the behavior on page load, the redirect URI, logging options, and login iframe checking.
 */
let initOptions: KeycloakInitOptions = {
    onLoad: 'check-sso',
    redirectUri: import.meta.env.VITE_KEYCLOAK_REDIRECT_URL,
    enableLogging: true,
    checkLoginIframe: false
}

keycloak.init(initOptions).then(auth => {
    if (!auth) {
        console.warn('Authentication failed')
    } else {
        console.log('Authenticated')
    }

    //Token Refresh
    setInterval(() => {
        keycloak.updateToken(70).then((refreshed) => {
            if (refreshed) {
                console.log('Token refreshed')
            } else {
                console.warn('Token not refreshed')
            }
        }).catch(() => {
            console.error('Failed to refresh token');
        });
    }, 6000)
}).catch(() => console.error("Authentication failed"))