import type Keycloak from "keycloak-js";
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useKeycloakStore = defineStore('keycloakStore', () => {
  const keycloak = ref<Keycloak>()

  return { keycloak }
})