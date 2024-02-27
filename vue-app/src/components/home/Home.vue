<script setup lang="ts">
import Item from '../Item.vue';
import DocumentationIcon from '../icons/IconDocumentation.vue';
import ToolingIcon from '../icons/IconTooling.vue';
import CommunityIcon from '../icons/IconCommunity.vue';
import LoginIcon from '../icons/IconLogin.vue';
import Button from '../../components/Button.vue';
import { useKeycloakStore } from '@/stores/keycloakStore';
import { ref, computed, onMounted, onUpdated } from 'vue';
import { useUserStore } from '@/stores/userStore';
// import { login, logout } from '@/utils/keycloakService';
import { serviceFactory } from '@/utils/factory';

// let keycloak = useKeycloakStore().keycloak;
const userStore = useUserStore();
const keycloak = serviceFactory(userStore)
const logout = () => keycloak.logout()
const login = () => keycloak.login()

// onUpdated(() => {
//   updateIsLogged();
// });

// const isLogged = ref(userStore?.authenticated);

// const buttonText = computed(() => (userStore.authenticated ? 'Logout' : 'Login'));

// function login() {
//   keycloak?.login().then(() => {
//     console.log("Login successful!");
//     userStore.user = keycloak!.profile!
//     userStore.authenticated = keycloak!.authenticated as boolean
//     userStore.token = keycloak!.token as string
//     userStore.roles = keycloak!.tokenParsed!.realm_access!.roles as string[]
//   });
// }

// function logout() {
//   keycloak?.logout().then(() => {
//     console.log("Logout successful!");
//     userStore.user = null
//     userStore.authenticated = false
//     userStore.token = ""
//     userStore.roles = []
//     login();
//   });
// }

// function signin() {
//   userStore.authenticated ? keycloak.logout() : keycloak.login()
// }
</script>


<template>
  <item>
    <template #icon>
      <LoginIcon/>
    </template>
    <Button :buttonText="userStore.authenticated ? 'Logout' : 'Login'" @click="userStore.authenticated ? keycloak.logout() : keycloak.login()"/>
  </item>

  <Item>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Documentation</template>
    Vue's front-end for the SOA project.
  </Item>

  <Item>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>Tooling</template>

    We interact with keycloak using keycloak-js package. The keycloak's client authentication is set to public.
    <br/>
    Keycloak runs on <a href="https://localhost/auth" target="_blank">https://localhost/auth</a> inside a Docker's container.
  </Item>

  <Item>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>Authors</template>
    This project was made by:
    <br/>
    <br/>
    <b>- Camilla Gussoni 14086A</b>
    <br/>
    <b>- Giacomo Lenzini 14098A</b>
  </Item>
</template>





