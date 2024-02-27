import type { KeycloakInitOptions } from "keycloak-js"

export interface KeycloakConfigType {
    url: string
    realm: string
    clientId: string
}

export interface ServiceConfigType {
    refreshTokenMilliseconds: number
}

// export const getEnableKeycloak = () : boolean => {
//     const raw = import.meta.env.VITE_APP_KEYCLOAK_ENABLED;
//     if (raw) {
//         return JSON.parse(raw)
//     }
//     return false;
// }

export const keycloakConfig : KeycloakConfigType = {
    url: import.meta.env.VITE_KEYCLOAK_URL ?? "",
    realm: import.meta.env.VITE_KEYCLOAK_REALM ?? "",
    clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID ?? "",
}

export const initOptions: KeycloakInitOptions = {
    onLoad: 'login-required',
    redirectUri: import.meta.env.VITE_KEYCLOAK_REDIRECT_URL,
    enableLogging: true,
    checkLoginIframe: false
}

export const serviceConfig: ServiceConfigType = {
    refreshTokenMilliseconds: import.meta.env.VITE_REFRESH_TOKEN_MS ?? 50000,
}
