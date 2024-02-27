import { defineStore } from 'pinia'
import type {KeycloakProfile} from "keycloak-js";

export type UserStoreReturnType = ReturnType<typeof useUserStore>

export type UserStore = {
    user: KeycloakProfile | null,
    authenticated: boolean,
    token: string | null,
    roles: string[]
}

export const useUserStore = defineStore({
    id: 'user',
    state: () : UserStore => ({
        user: null,
        authenticated: false,
        token: "",
        roles: []
    }),
    getters: {
        isLoggedIn(): boolean {
            return !!this.authenticated
        },
    },
    actions: {
        addRole(role: string) : void {
            this.roles.push(role)
        },
    }
})