import Keycloak from "keycloak-js";
import {keycloakConfig, serviceConfig} from "@/utils/config";
import type {KeycloakService} from "@/utils/IKeycloakService";
import type {UserStoreReturnType} from "@/stores/userStore";
import {Service} from "@/utils/keycloakService";

let s : KeycloakService | null = null;

export function createKeycloakInstance(): Keycloak {
    return new Keycloak(keycloakConfig)
}

export function serviceFactory(userStore: UserStoreReturnType): KeycloakService {
    if(s === null){
        s = new Service(createKeycloakInstance(), userStore, serviceConfig)
    }
    return s;
}