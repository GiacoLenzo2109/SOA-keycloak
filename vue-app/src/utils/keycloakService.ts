import {initOptions, type ServiceConfigType} from "@/utils/config";
import type { KeycloakService } from "./IKeycloakService";
import type Keycloak from "keycloak-js";
import type {UserStoreReturnType} from "@/stores/userStore";

export class Service implements KeycloakService {

    constructor(
        protected keycloak: Keycloak,
        protected userStore: UserStoreReturnType,
        protected conf: ServiceConfigType
    ) {
    }

    async login() : Promise<void>{
        console.log("Logging in");
        // const auth = await this.keycloak.init(initOptions)
        //if(auth){
        await this.keycloak.login()
        console.log("Login successful!");
        this.userStore.user = this.keycloak.profile!
        this.userStore.authenticated = this.keycloak.authenticated as boolean
        this.userStore.token = this.keycloak.token as string
        this.userStore.roles = this.keycloak.tokenParsed!.realm_access!.roles as string[]

        await this.refreshToken()
        // }
        // else {
        //     console.log("Login failed!");
        // }
    }
    
    async logout() {
        await this.keycloak.logout()
        console.log("Logout successful!");
        this.userStore.user = null
        this.userStore.authenticated = false
        this.userStore.token = ""
        this.userStore.roles = []
    }

    async refreshToken(): Promise<void> {
        const refreshed = await this.keycloak.updateToken(5)

        if (refreshed) {
            console.log('Token refreshed')

            this.userStore.user = this.keycloak.profile!
            this.userStore.authenticated = this.keycloak.authenticated as boolean
            this.userStore.token = this.keycloak.token as string
            this.userStore.roles = this.keycloak.tokenParsed!.realm_access!.roles as string[]
        } else {
            console.warn('Token not refreshed')
        }

        setTimeout(async () => {
            await this.refreshToken()
        }, this.conf.refreshTokenMilliseconds)
    }

    async init(): Promise<boolean> {
        const auth = await this.keycloak.init(initOptions)
        this.userStore.user = this.keycloak.profile!
        this.userStore.authenticated = this.keycloak.authenticated as boolean
        this.userStore.token = this.keycloak.token as string
        this.userStore.roles = this.keycloak.tokenParsed!.realm_access!.roles as string[]
        if (auth) {
            setTimeout(async () => {
                await this.refreshToken()
            }, this.conf.refreshTokenMilliseconds)
        }
        return auth;
    }
}